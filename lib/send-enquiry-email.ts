import type { EnquiryFields } from "@/lib/enquiry-validation";

type SendResult = { ok: true } | { ok: false; error: string };

const DELIVERY_ERROR =
  "We could not deliver your enquiry. Please email concierge@skyluxxe.ae directly.";

function formatBody(fields: EnquiryFields, receivedAt: string): string {
  return [
    "New private enquiry — Skyluxxe",
    "",
    `Received: ${receivedAt}`,
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone || "—"}`,
    `Nature: ${fields.nature}`,
    "",
    "Message:",
    fields.message,
    "",
    "—",
    "Reply directly to the sender's email address.",
  ].join("\n");
}

/** `fields` must already be normalised (see `normaliseEnquiryFields`). */
export async function sendEnquiryEmail(
  fields: EnquiryFields,
  receivedAt: string,
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, error: "Email delivery is not configured." };
  }

  const to = process.env.ENQUIRY_TO_EMAIL?.trim() || "concierge@skyluxxe.ae";
  const backup = process.env.ENQUIRY_BACKUP_EMAIL?.trim();
  const configuredFrom = process.env.ENQUIRY_FROM_EMAIL?.trim();

  if (!configuredFrom) {
    /*
     * Resend's shared test sender only delivers to the Resend account owner's
     * own address, so relying on it silently drops real enquiries. Say so in
     * the logs rather than leaving it to be discovered.
     */
    console.warn(
      "[enquiry] ENQUIRY_FROM_EMAIL is not set — falling back to onboarding@resend.dev, which only delivers to the Resend account owner. Set it to an address on a verified domain.",
    );
  }
  const from = configuredFrom || "Skyluxxe Concierge <onboarding@resend.dev>";

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
        reply_to: fields.email,
        subject: `Private enquiry — ${fields.nature}`,
        text: formatBody(fields, receivedAt),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[enquiry] Resend error", res.status, detail);
      return { ok: false, error: DELIVERY_ERROR };
    }

    return { ok: true };
  } catch (err) {
    console.error("[enquiry] Resend request failed", err);
    return { ok: false, error: DELIVERY_ERROR };
  }
}
