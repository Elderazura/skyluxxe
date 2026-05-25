export const brand = {
  colors: {
    navy: "#0D1B2A",
    deepNavy: "#162235",
    richNavy: "#2A2D4E",
    roseGold: "#DFA293",
    gold: "#C9A96E",
    offWhite: "#F5F0EB",
    ivoryCream: "#FAF7F4",
    white: "#FFFFFF",
    nearBlack: "#1A1A1A",
    mutedBlue: "#8A9AB5",
  },
  fonts: {
    display: "Italiana",
    serif: "Cormorant Garamond",
    body: "Inter",
  },
  tagline: "Your World. Without Compromise.",
  heroTagline: "The Art of Invisible Service.",
  values: ["Discretion", "Precision", "Excellence"] as const,
  contact: {
    email: "concierge@skyluxxe.ae",
    phone: "+971 2 555 0198",
    addressLine1: "Al Maryah Island, Abu Dhabi, UAE",
    addressLine2: "By appointment only",
    /** Shown where “always available” might be misread — desk hours are primary. */
    urgentLine:
      "Urgent itineraries coordinated outside desk hours by prior arrangement.",
  },
  office: {
    name: "Skyluxxe Concierge Travel",
    addressLines: [
      "Al Maryah Island",
      "Abu Dhabi, United Arab Emirates",
      "By appointment only",
    ] as const,
    hoursLine: "Monday–Friday · 09:00–18:00 GST",
    hoursNote: "Enquiries answered within twenty-four hours on business days.",
    /** Google Maps embed (query-centred). */
    mapEmbedUrl:
      "https://maps.google.com/maps?q=24.4539,54.3773&z=11&hl=en&output=embed",
  },
  legal: {
    entityName: "Skyluxxe Concierge Travel",
    /** Set NEXT_PUBLIC_DED_LICENSE in production when issued. */
    dedRegistration:
      process.env.NEXT_PUBLIC_DED_LICENSE?.trim() || "",
    jurisdiction: "Abu Dhabi, United Arab Emirates",
  },
  social: {
    instagram: "https://www.instagram.com/skyluxxe",
    linkedin: "https://www.linkedin.com/company/skyluxxe",
    x: "https://x.com/skyluxxe",
    pinterest: "https://www.pinterest.com/skyluxxe",
  },
  memberships: {
    headline: "Measured by the company we keep",
    body:
      "At Skyluxxe, our standards are measured by the company we keep. We are proud members of the world's most discerning travel, aviation, and hospitality networks — relationships that extend your reach without compromising discretion.",
  },
} as const;

export type BrandColors = typeof brand.colors;
export type BrandFonts = typeof brand.fonts;
