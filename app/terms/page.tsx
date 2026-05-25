import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal/LegalDocument";
import { termsOfService } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing use of the Skyluxxe website and preliminary travel enquiries.",
};

export default function TermsPage() {
  return (
    <LegalDocument
      title={termsOfService.title}
      updated={termsOfService.updated}
      sections={termsOfService.sections}
    />
  );
}
