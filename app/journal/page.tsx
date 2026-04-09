import type { Metadata } from "next";

import { JournalPageContent } from "@/components/journal/JournalPageContent";

export const metadata: Metadata = {
  title: "Journal",
};

export default function JournalPage() {
  return <JournalPageContent />;
}
