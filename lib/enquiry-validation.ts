import { ENQUIRY_NATURE_OPTIONS } from "@/content/enquiry";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+()\-.\s]{5,}$/;
const allowedNature = new Set<string>(ENQUIRY_NATURE_OPTIONS);

/** Shared by the form inputs (`maxLength`) and the API route. */
export const ENQUIRY_LIMITS = {
  name: 120,
  email: 254,
  phone: 40,
  message: 5000,
} as const;

export type EnquiryFields = {
  name: string;
  email: string;
  phone: string;
  nature: string;
  message: string;
};

export type EnquiryFieldErrors = Partial<Record<keyof EnquiryFields | "turnstile", string>>;

export const ENQUIRY_FIELD_ORDER = ["name", "email", "phone", "nature", "message"] as const;

/** Collapse line breaks and control characters in single-line fields. */
export function singleLine(value: string): string {
  return value.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Coerce an untrusted JSON body into string fields. Anything that is not a
 * string becomes "", which validation then rejects with a normal field error
 * instead of the route throwing on `.trim()`.
 */
export function normaliseEnquiryFields(input: unknown): EnquiryFields {
  const src = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const str = (key: string) => (typeof src[key] === "string" ? (src[key] as string) : "");
  return {
    name: singleLine(str("name")),
    email: singleLine(str("email")),
    phone: singleLine(str("phone")),
    nature: singleLine(str("nature")),
    message: str("message").replace(/\r\n?/g, "\n").trim(),
  };
}

export function validateEnquiryFields(fields: EnquiryFields): EnquiryFieldErrors {
  const errors: EnquiryFieldErrors = {};
  const name = fields.name.trim();
  const email = fields.email.trim();
  const phone = fields.phone.trim();
  const nature = fields.nature.trim();
  const message = fields.message.trim();

  if (!name || name.length < 2) {
    errors.name = "Please enter your full name.";
  } else if (name.length > ENQUIRY_LIMITS.name) {
    errors.name = `Please keep your name under ${ENQUIRY_LIMITS.name} characters.`;
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_RE.test(email) || email.length > ENQUIRY_LIMITS.email) {
    errors.email = "Please enter a valid email address.";
  }

  if (phone && (!PHONE_RE.test(phone) || phone.length > ENQUIRY_LIMITS.phone)) {
    errors.phone = "Please enter a valid phone number, or leave this blank.";
  }

  if (!nature || !allowedNature.has(nature)) {
    errors.nature = "Please select how we may help.";
  }

  if (!message || message.length < 10) {
    errors.message = "Please share a few details so we can respond thoughtfully.";
  } else if (message.length > ENQUIRY_LIMITS.message) {
    errors.message = `Please keep your message under ${ENQUIRY_LIMITS.message.toLocaleString("en")} characters.`;
  }

  return errors;
}
