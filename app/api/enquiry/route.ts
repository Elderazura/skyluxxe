import { NextResponse } from "next/server";

import {
  validateEnquiryFields,
  type EnquiryFields,
} from "@/lib/enquiry-validation";
import { sendEnquiryEmail } from "@/lib/send-enquiry-email";

type EnquiryPayload = EnquiryFields & {
  turnstileToken?: string;
};

function isProductionDeliveryConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() || process.env.ENQUIRY_WEBHOOK_URL?.trim(),
  );
}

export async function POST(request: Request) {
  let body: EnquiryPayload;
  try {
    body = (await request.json()) as EnquiryPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const fields: EnquiryFields = {
    name: body.name ?? "",
    email: body.email ?? "",
    phone: body.phone ?? "",
    nature: body.nature ?? "",
    message: body.message ?? "",
  };

  const fieldErrors = validateEnquiryFields(fields);
  const firstFieldError = Object.values(fieldErrors)[0];
  if (firstFieldError) {
    return NextResponse.json({ error: firstFieldError, fields: fieldErrors }, { status: 400 });
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (turnstileSecret) {
    const token = body.turnstileToken?.trim();
    if (!token) {
      return NextResponse.json(
        {
          error: "Security verification failed. Please try again.",
          fields: { turnstile: "Please complete the security check." },
        },
        { status: 400 },
      );
    }
    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: turnstileSecret, response: token }),
    });
    const verifyJson = (await verifyRes.json()) as { success?: boolean };
    if (!verifyJson.success) {
      return NextResponse.json(
        {
          error: "Security verification failed. Please try again.",
          fields: { turnstile: "Please complete the security check again." },
        },
        { status: 400 },
      );
    }
  }

  if (process.env.NODE_ENV === "production" && !isProductionDeliveryConfigured()) {
    console.error("[enquiry] No RESEND_API_KEY or ENQUIRY_WEBHOOK_URL in production");
    return NextResponse.json(
      { error: "Enquiry delivery is temporarily unavailable. Please email concierge@skyluxxe.ae." },
      { status: 503 },
    );
  }

  const receivedAt = new Date().toISOString();
  const payload = {
    receivedAt,
    name: fields.name.trim(),
    email: fields.email.trim(),
    phone: fields.phone.trim() || null,
    nature: fields.nature.trim(),
    message: fields.message.trim(),
    routedTo: process.env.ENQUIRY_TO_EMAIL?.trim() ?? "concierge@skyluxxe.ae",
    backup: process.env.ENQUIRY_BACKUP_EMAIL?.trim() ?? null,
  };

  let delivered = false;

  if (process.env.RESEND_API_KEY?.trim()) {
    const emailResult = await sendEnquiryEmail(fields, receivedAt);
    if (!emailResult.ok) {
      return NextResponse.json({ error: emailResult.error }, { status: 502 });
    }
    delivered = true;
  }

  const webhook = process.env.ENQUIRY_WEBHOOK_URL?.trim();
  if (webhook) {
    try {
      const whRes = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!whRes.ok) {
        throw new Error(`Webhook returned ${whRes.status}`);
      }
      delivered = true;
    } catch (err) {
      console.error("[enquiry] webhook failed", err);
      if (!process.env.RESEND_API_KEY?.trim()) {
        return NextResponse.json(
          { error: "We could not deliver your enquiry. Please email us directly." },
          { status: 502 },
        );
      }
    }
  }

  if (!delivered) {
    console.info("[enquiry] dev mode — logged only", payload);
  }

  return NextResponse.json({ ok: true });
}
