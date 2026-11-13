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
    phone: "+971 56 766 3455",
    /** Same number for voice and WhatsApp. */
    whatsAppUrl: "https://wa.me/971567663455",
    phoneTel: "+971567663455",
    addressLine1: "Al Khazna Tower, Najdah Street, Abu Dhabi, UAE",
    addressLine2: "By appointment only",
    /** Shown where “always available” might be misread — desk hours are primary. */
    urgentLine:
      "Urgent itineraries coordinated outside desk hours by prior arrangement.",
  },
  office: {
    name: "Skyluxxe Concierge Travel",
    addressLines: [
      "Al Khazna Tower, Najdah Street",
      "Abu Dhabi, United Arab Emirates",
      "By appointment only",
    ] as const,
    hoursLine: "Monday–Friday · 09:00–18:00 GST",
    hoursNote: "Enquiries answered within twenty-four hours on business days.",
    /** Google Maps embed (query-centred). */
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Al+Khazna+Tower,+Najdah+Street,+Abu+Dhabi&z=15&hl=en&output=embed",
  },
  legal: {
    entityName: "Skyluxxe Concierge Travel — L.L.C — S.P.C",
    /* Trade licence and VAT registration numbers are deliberately not published on the site. */
    registeredAddressLines: [
      "Al Khazna Tower, Najdah Street",
      "Abu Dhabi, United Arab Emirates",
    ] as const,
    jurisdiction: "Abu Dhabi, United Arab Emirates",
  },
  social: {
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM?.trim() || "https://www.instagram.com/skyluxxeconcierge",
    linkedin:
      process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN?.trim() ||
      "https://www.linkedin.com/company/skyluxxe-conciergetravel/",
    facebook:
      process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK?.trim() ||
      "https://www.facebook.com/share/1BMZct7XZY/",
    /* No confirmed accounts yet: shown only when a URL is set in the environment. */
    x: process.env.NEXT_PUBLIC_SOCIAL_X?.trim() || "",
    pinterest: process.env.NEXT_PUBLIC_SOCIAL_PINTEREST?.trim() || "",
  },
  memberships: {
    headline: "Measured by the company we keep",
    body:
      "At Skyluxxe, our standards are measured by the company we keep. We are proud members of the world's most discerning travel, aviation, and hospitality networks — relationships that extend your reach without compromising discretion.",
  },
} as const;

export type BrandColors = typeof brand.colors;
export type BrandFonts = typeof brand.fonts;
