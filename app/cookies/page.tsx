import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal/LegalDocument";
import { cookiePolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Skyluxxe uses cookies and similar technologies on skyluxxe.ae.",
};

export default function CookiesPage() {
  return (
    <LegalDocument
      title={cookiePolicy.title}
      updated={cookiePolicy.updated}
      sections={cookiePolicy.sections}
    />
  );
}
