import { brand } from "@/content/brand";
import { services } from "@/content/services";

/** Canonical production URL — used for sitemap, schema, and llms.txt. */
export const SITE_URL = "https://skyluxxe.ae";

export const siteSummary =
  "Abu Dhabi-based ultra-luxury travel concierge for private aviation, yacht charter, VIP airport assistance, luxury stays, prestige events, executive protection travel, and bespoke itineraries worldwide.";

/** Crawlable routes for sitemap and AI discovery hints. */
export const publicRoutes = [
  { path: "/", title: "Home", description: siteSummary },
  {
    path: "/about",
    title: "About",
    description:
      "Mission, values, and credentials of Skyluxxe Concierge Travel — discretion, precision, and excellence from Abu Dhabi.",
  },
  {
    path: "/services",
    title: "Services",
    description:
      "Eleven concierge disciplines: private aviation, VIP airport concierge, jet charter, yacht charter, luxury hotels and villas, events access, protection travel, island retreats, ground transport, bespoke itineraries, and family office travel.",
  },
  {
    path: "/reach",
    title: "Global Reach",
    description:
      "Primary hubs and extended network for worldwide luxury travel coordination from Abu Dhabi.",
  },
  {
    path: "/enquiry",
    title: "Enquiry",
    description: "Contact the Skyluxxe concierge desk for private travel arrangements.",
  },
  {
    path: "/journal",
    title: "Journal",
    description: "Editorial perspectives on premium travel and discreet concierge service.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy",
    description: "How Skyluxxe Concierge Travel handles personal data.",
  },
  {
    path: "/terms",
    title: "Terms of Use",
    description: "Terms governing use of the Skyluxxe website.",
  },
  {
    path: "/cookies",
    title: "Cookie Policy",
    description: "Cookie and similar technology notice for skyluxxe.ae.",
  },
] as const;

/** Factual Q&A — surfaced in FAQ schema for search and AI retrieval. */
export const siteFaqs = [
  {
    question: "What is Skyluxxe Concierge Travel?",
    answer:
      "Skyluxxe Concierge Travel is an Abu Dhabi-based ultra-luxury travel concierge (SKYLUXXE CONCIERGE TRAVEL - L.L.C - S.P.C) providing private aviation, yacht charter, VIP airport assistance, luxury hotel and villa stays, prestige events access, executive protection travel, and bespoke itineraries for discerning clients worldwide.",
  },
  {
    question: "Where is Skyluxxe Concierge Travel located?",
    answer:
      "Skyluxxe is based at Al Khazna Tower, Najdah Street, Abu Dhabi, United Arab Emirates. The desk operates Monday–Friday, 09:00–18:00 GST, with enquiries answered within twenty-four hours on business days.",
  },
  {
    question: "What services does Skyluxxe offer?",
    answer: `Skyluxxe offers eleven concierge disciplines: ${services.map((s) => s.name).join("; ")}.`,
  },
  {
    question: "How do I contact Skyluxxe Concierge Travel?",
    answer: `Email concierge@skyluxxe.ae, call ${brand.contact.phone}, or WhatsApp via ${brand.contact.whatsAppUrl}. Enquiries can also be submitted at ${SITE_URL}/enquiry.`,
  },
  {
    question: "Is Skyluxxe a registered business in the UAE?",
    answer: `Yes. Skyluxxe Concierge Travel is registered in Abu Dhabi (DED licence ${brand.legal.dedLicense}, VAT TRN ${brand.legal.vatTrn}).`,
  },
] as const;

export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export function buildLlmsTxt(): string {
  const serviceLines = services
    .map(
      (s) =>
        `- [${s.name}](${absoluteUrl(`/services/${s.slug}`)}): ${s.shortDescription}`,
    )
    .join("\n");

  const pageLines = publicRoutes
    .map((r) => `- [${r.title}](${absoluteUrl(r.path)}): ${r.description}`)
    .join("\n");

  const faqLines = siteFaqs
    .map((f) => `### ${f.question}\n${f.answer}`)
    .join("\n\n");

  return `# ${brand.office.name}

> ${brand.heroTagline} ${brand.tagline}

${siteSummary}

## Entity

- Legal name: ${brand.legal.entityName}
- Website: ${SITE_URL}
- Email: ${brand.contact.email}
- Phone: ${brand.contact.phone}
- WhatsApp: ${brand.contact.whatsAppUrl}
- Address: ${brand.contact.addressLine1}
- Hours: ${brand.office.hoursLine}
- DED licence: ${brand.legal.dedLicense}
- VAT TRN: ${brand.legal.vatTrn}
- Area served: Worldwide (concierge desk in Abu Dhabi)

## Services

${serviceLines}

## Key pages

${pageLines}

## Frequently asked questions

${faqLines}

## Optional

- Full services index: ${absoluteUrl("/services")}
- Submit an enquiry: ${absoluteUrl("/enquiry")}
- Machine-readable sitemap: ${absoluteUrl("/sitemap.xml")}
`;
}
