import { ENQUIRY_NATURE_OPTIONS } from "@/content/enquiry";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedNature = new Set<string>(ENQUIRY_NATURE_OPTIONS);

export type EnquiryFields = {
  name: string;
  email: string;
  phone: string;
  nature: string;
  message: string;
};

export type EnquiryFieldErrors = Partial<Record<keyof EnquiryFields | "turnstile", string>>;

export function validateEnquiryFields(fields: EnquiryFields): EnquiryFieldErrors {
  const errors: EnquiryFieldErrors = {};
  const name = fields.name.trim();
  const email = fields.email.trim();
  const nature = fields.nature.trim();
  const message = fields.message.trim();

  if (!name || name.length < 2) {
    errors.name = "Please enter your full name.";
  }
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_RE.test(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!nature || !allowedNature.has(nature)) {
    errors.nature = "Please select how we may help.";
  }
  if (!message || message.length < 10) {
    errors.message = "Please share a few details so we can respond thoughtfully.";
  }

  return errors;
}

export function firstEnquiryError(errors: EnquiryFieldErrors): string | undefined {
  return (
    errors.name ??
    errors.email ??
    errors.nature ??
    errors.message ??
    errors.turnstile
  );
}

export function mapApiErrorToFields(message: string): EnquiryFieldErrors {
  const lower = message.toLowerCase();
  if (lower.includes("name")) return { name: message };
  if (lower.includes("email")) return { email: message };
  if (lower.includes("help") || lower.includes("select")) return { nature: message };
  if (lower.includes("details") || lower.includes("message")) return { message: message };
  if (lower.includes("security") || lower.includes("verification")) return { turnstile: message };
  return {};
}
