import { services } from "@/content/services";

/** Mirrors all service disciplines on /services plus a general option. */
export const ENQUIRY_NATURE_OPTIONS = [
  ...services.map((s) => s.name),
  "General enquiry",
] as const;

export type EnquiryNatureOption = (typeof ENQUIRY_NATURE_OPTIONS)[number];
