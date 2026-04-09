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
    phone: "+971 2 000 0000",
    addressLine1: "Abu Dhabi, UAE",
    addressLine2: "By appointment only",
  },
  office: {
    name: "Skyluxxe Concierge Travel",
    addressLines: ["Abu Dhabi, United Arab Emirates", "By appointment only"] as const,
    hoursLine: "Monday–Friday · 09:00–18:00 GST (by arrangement)",
    /** Google Maps embed (query-centred). */
    mapEmbedUrl:
      "https://maps.google.com/maps?q=24.4539,54.3773&z=11&hl=en&output=embed",
  },
} as const;

export type BrandColors = typeof brand.colors;
export type BrandFonts = typeof brand.fonts;
