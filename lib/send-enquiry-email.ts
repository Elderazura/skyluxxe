import type { EnquiryFields } from "@/lib/enquiry-validation";

type SendResult = { ok: true } | { ok: false; error: string };

function formatBody(fields: EnquiryFields, receivedAt: string): string {
  return [
    "New private enquiry — Skyluxxe",
    "",
    `Received: ${receivedAt}`,
    `Name: ${fields.name.trim()}`,
    `Email: ${fields.email.trim()}`,
    `Phone: ${fields.phone.trim() || "—"}`,
    `Nature: ${fields.nature.trim()}`,
    "",
    "Message:",
    fields.message.trim(),
    "",
    "—",
    "Reply directly to the sender's email address.",
  ].join("\n");
}

export async function sendEnquiryEmail(
  fields: EnquiryFields,
  receivedAt: string,
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, error: "Email delivery is not configured." };
  }

  const to = process.env.ENQUIRY_TO_EMAIL?.trim() ?? "concierge@skyluxxe.ae";
  const backup = process.env.ENQUIRY_BACKUP_EMAIL?.trim();
  const from =
    process.env.ENQUIRY_FROM_EMAIL?.trim() ??
    "Skyluxxe Concierge <onboarding@resend.dev>";

  const subject = `Private enquiry — ${fields.nature.trim()}`;
  const text = formatBody(fields, receivedAt);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        ...(backup ? { cc: [backup] } : {}),
        reply_to: fields.email.trim(),
        subject,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[enquiry] Resend error", res.status, detail);
      return { ok: false, error: "We could not deliver your enquiry. Please email us directly." };
    }

    return { ok: true };
  } catch (err) {
    console.error("[enquiry] Resend request failed", err);
    return { ok: false, error: "We could not deliver your enquiry. Please email us directly." };
  }
}
