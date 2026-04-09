import type { Metadata } from "next";

import { EnquiryPageContent } from "@/components/enquiry/EnquiryPageContent";
import { GlimpseRail } from "@/components/sections/GlimpseRail";
import { crossLinkExplore } from "@/content/crossLinks";

export const metadata: Metadata = {
  title: "Private Enquiry",
};

export default function EnquiryPage() {
  return (
    <>
      <EnquiryPageContent />
      <GlimpseRail
        kicker="Explore"
        heading="Elsewhere on Skyluxxe"
        items={crossLinkExplore.filter((item) => item.href !== "/enquiry")}
        background="ivory"
      />
    </>
  );
}
