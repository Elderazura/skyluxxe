import { NextResponse } from "next/server";

import { ENQUIRY_NATURE_OPTIONS } from "@/content/enquiry";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type EnquiryPayload = {
  name?: string;
  email?: string;
  phone?: string;
  nature?: string;
  message?: string;
  turnstileToken?: string;
};

export async function POST(request: Request) {
  let body: EnquiryPayload;
  try {
    body = (await request.json()) as EnquiryPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const nature = body.nature?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  const allowedNature = new Set<string>(ENQUIRY_NATURE_OPTIONS);
  if (!nature || !allowedNature.has(nature)) {
    return NextResponse.json({ error: "Please select how we may help." }, { status: 400 });
  }
  if (!message || message.length < 10) {
    return NextResponse.json(
      { error: "Please share a few details so we can respond thoughtfully." },
      { status: 400 },
    );
  }

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const token = body.turnstileToken?.trim();
    if (!token) {
      return NextResponse.json({ error: "Security verification failed. Please try again." }, { status: 400 });
    }
    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: turnstileSecret, response: token }),
    });
    const verifyJson = (await verifyRes.json()) as { success?: boolean };
    if (!verifyJson.success) {
      return NextResponse.json({ error: "Security verification failed. Please try again." }, { status: 400 });
    }
  }

  const to = process.env.ENQUIRY_TO_EMAIL ?? "concierge@skyluxxe.ae";
  const backup = process.env.ENQUIRY_BACKUP_EMAIL;
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;

  const payload = {
    receivedAt: new Date().toISOString(),
    name,
    email,
    phone: phone || null,
    nature,
    message,
    routedTo: to,
    backup: backup ?? null,
  };

  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("[enquiry] webhook failed", err);
      return NextResponse.json(
        { error: "We could not deliver your enquiry. Please email us directly." },
        { status: 502 },
      );
    }
  } else {
    console.info("[enquiry] received (configure ENQUIRY_WEBHOOK_URL for delivery)", payload);
  }

  return NextResponse.json({ ok: true });
}
