import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal/LegalDocument";
import { privacyPolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Skyluxxe Concierge Travel collects, uses, and protects personal data under UAE PDPL and GDPR.",
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      title={privacyPolicy.title}
      updated={privacyPolicy.updated}
      sections={privacyPolicy.sections}
    />
  );
}
