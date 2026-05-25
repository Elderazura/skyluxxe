import type { Metadata } from "next";

import { JournalPageContent } from "@/components/journal/JournalPageContent";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Editorial perspectives on premium travel, private aviation, and the craft of discreet concierge service.",
};

export default function JournalPage() {
  return <JournalPageContent />;
}
