import type { Metadata } from "next";

import { EnquiryPageContent } from "@/components/enquiry/EnquiryPageContent";

export const metadata: Metadata = {
  title: "Private Enquiry",
};

export default function EnquiryPage() {
  return <EnquiryPageContent />;
}
