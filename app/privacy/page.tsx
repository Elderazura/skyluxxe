import type { Metadata } from "next";

import { pageMetadata } from "@/lib/page-metadata";

import { LegalDocument } from "@/components/legal/LegalDocument";
import { privacyPolicy } from "@/content/legal";

export const metadata: Metadata = pageMetadata({
  path: "/privacy",
  title: "Privacy Policy",
  description:
    "How Skyluxxe Concierge Travel collects, uses, and protects personal data under UAE PDPL and GDPR.",
});

export default function PrivacyPage() {
  return (
    <LegalDocument
      title={privacyPolicy.title}
      updated={privacyPolicy.updated}
      sections={privacyPolicy.sections}
    />
  );
}
