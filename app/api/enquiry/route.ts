import { NextResponse } from "next/server";

import { normaliseEnquiryFields, validateEnquiryFields } from "@/lib/enquiry-validation";
import { sendEnquiryEmail } from "@/lib/send-enquiry-email";

const CONTACT_FALLBACK = "Please email concierge@skyluxxe.ae directly.";

/** Generous ceiling for a JSON body holding a 5,000 character message. */
const MAX_BODY_BYTES = 32 * 1024;

/*
 * Best-effort throttle. On serverless hosting each instance keeps its own
 * counters, so this only slows down a burst that lands on one warm instance —
 * Turnstile is the real bot defence. It still stops the cheapest abuse.
 */
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function clientKey(request: Request): string {
  const h = request.headers;
  return (
    h.get("x-real-ip") ||
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(k);
    }
  }
  return false;
}

async function verifyTurnstile(secret: string, token: string, ip: string): Promise<boolean> {
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        response: token,
        ...(ip !== "unknown" ? { remoteip: ip } : {}),
      }),
      signal: AbortSignal.timeout(8_000),
    });
    const json = (await res.json()) as { success?: boolean };
    return json.success === true;
  } catch (err) {
    console.error("[enquiry] Turnstile verification failed", err);
    return false;
  }
}

export async function POST(request: Request) {
  const raw = await request.text().catch(() => "");
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Your message is too long." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  const record = body as Record<string, unknown>;

  /*
   * Honeypot: the form has a visually hidden "company" field that people never
   * see. Anything that fills it is a bot; answer as if it worked so it does not
   * learn to adapt.
   */
  if (typeof record.company === "string" && record.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const fields = normaliseEnquiryFields(record);
  const fieldErrors = validateEnquiryFields(fields);
  const firstFieldError = Object.values(fieldErrors)[0];
  if (firstFieldError) {
    return NextResponse.json({ error: firstFieldError, fields: fieldErrors }, { status: 400 });
  }

  const ip = clientKey(request);
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: `Too many enquiries from this connection. ${CONTACT_FALLBACK}` },
      { status: 429, headers: { "Retry-After": String(RATE_WINDOW_MS / 1000) } },
    );
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (turnstileSecret) {
    const token = typeof record.turnstileToken === "string" ? record.turnstileToken.trim() : "";
    if (!token) {
      return NextResponse.json(
        {
          error: "Security verification failed. Please try again.",
          fields: { turnstile: "Please complete the security check." },
        },
        { status: 400 },
      );
    }
    if (!(await verifyTurnstile(turnstileSecret, token, ip))) {
      return NextResponse.json(
        {
          error: "Security verification failed. Please try again.",
          fields: { turnstile: "Please complete the security check again." },
        },
        { status: 400 },
      );
    }
  } else if (process.env.NODE_ENV === "production") {
    console.warn("[enquiry] TURNSTILE_SECRET_KEY is not set — submissions are not bot-checked.");
  }

  const resendConfigured = Boolean(process.env.RESEND_API_KEY?.trim());
  const webhook = process.env.ENQUIRY_WEBHOOK_URL?.trim();

  if (process.env.NODE_ENV === "production" && !resendConfigured && !webhook) {
    console.error("[enquiry] No RESEND_API_KEY or ENQUIRY_WEBHOOK_URL in production");
    return NextResponse.json(
      { error: `Enquiry delivery is temporarily unavailable. ${CONTACT_FALLBACK}` },
      { status: 503 },
    );
  }

  const receivedAt = new Date().toISOString();
  const payload = {
    receivedAt,
    name: fields.name,
    email: fields.email,
    phone: fields.phone || null,
    nature: fields.nature,
    message: fields.message,
    routedTo: process.env.ENQUIRY_TO_EMAIL?.trim() || "concierge@skyluxxe.ae",
    backup: process.env.ENQUIRY_BACKUP_EMAIL?.trim() || null,
  };

  let delivered = false;

  if (resendConfigured) {
    const emailResult = await sendEnquiryEmail(fields, receivedAt);
    if (emailResult.ok) {
      delivered = true;
    } else if (!webhook) {
      return NextResponse.json({ error: emailResult.error }, { status: 502 });
    }
  }

  if (webhook) {
    try {
      const whRes = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10_000),
      });
      if (!whRes.ok) {
        throw new Error(`Webhook returned ${whRes.status}`);
      }
      delivered = true;
    } catch (err) {
      console.error("[enquiry] webhook failed", err);
    }
  }

  if (!delivered) {
    if (resendConfigured || webhook) {
      return NextResponse.json(
        { error: `We could not deliver your enquiry. ${CONTACT_FALLBACK}` },
        { status: 502 },
      );
    }
    console.info("[enquiry] dev mode — logged only", payload);
  }

  return NextResponse.json({ ok: true });
}
