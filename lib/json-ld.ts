import { brand } from "@/content/brand";
import { services } from "@/content/services";
import {
  SITE_URL,
  absoluteUrl,
  siteFaqs,
  siteSummary,
} from "@/content/site-discovery";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function getSiteJsonLdGraph(): Record<string, unknown>[] {
  const sameAs = [
    brand.social.instagram,
    brand.social.linkedin,
    brand.social.x,
    brand.social.pinterest,
  ].filter(Boolean);

  return [
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: brand.office.name,
      description: siteSummary,
      inLanguage: "en",
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "TravelAgency",
      "@id": ORG_ID,
      name: brand.office.name,
      legalName: "SKYLUXXE CONCIERGE TRAVEL - L.L.C - S.P.C",
      url: SITE_URL,
      email: brand.contact.email,
      telephone: brand.contact.phoneTel,
      taxID: brand.legal.vatTrn,
      identifier: [
        {
          "@type": "PropertyValue",
          name: "Abu Dhabi DED Trade Licence",
          value: brand.legal.dedLicense,
        },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Al Khazna Tower, Najdah Street",
        addressLocality: "Abu Dhabi",
        addressCountry: "AE",
      },
      areaServed: {
        "@type": "Place",
        name: "Worldwide",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      description: siteSummary,
      slogan: brand.heroTagline,
      sameAs,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Concierge travel services",
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: service.name,
            description: service.shortDescription,
            url: absoluteUrl(`/services/${service.slug}`),
            provider: { "@id": ORG_ID },
            areaServed: "Worldwide",
          },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: siteFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];
}

export function getSiteJsonLdScript(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": getSiteJsonLdGraph(),
  });
}
