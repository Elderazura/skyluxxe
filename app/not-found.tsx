import type { Metadata } from "next";
import Link from "next/link";

import { DiamondMarker } from "@/components/ui/DiamondMarker";
import { HairlineRule } from "@/components/ui/HairlineRule";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const linkClass =
  "inline-flex min-h-[44px] items-center justify-center border px-8 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.14em] transition-colors";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center bg-midnight-aviation-navy px-[var(--gutter-x)] py-40 text-center">
      <DiamondMarker size="md" />
      <p className="mt-8 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.22em] text-muted-blue">
        Error 404
      </p>
      <h1 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2.25rem,6vw,4rem)] font-normal leading-tight tracking-tight text-off-white">
        This page has departed.
      </h1>
      <p className="mt-6 max-w-md font-[family-name:var(--font-serif)] text-lg italic leading-relaxed text-off-white/80">
        The address may have changed, or the page may no longer exist. Allow us to point you
        somewhere better.
      </p>
      <div className="mt-10 w-full max-w-xs">
        <HairlineRule accent="gold" />
      </div>
      <div className="mt-10 flex w-full max-w-md flex-col gap-4 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className={`${linkClass} border-[#DFA293] text-off-white hover:bg-[#DFA293] hover:text-[#0D1B2A]`}
        >
          Return home
        </Link>
        <Link
          href="/services"
          className={`${linkClass} border-white/25 text-off-white hover:border-[#DFA293]`}
        >
          Our services
        </Link>
        <Link
          href="/enquiry"
          className={`${linkClass} border-white/25 text-off-white hover:border-[#DFA293]`}
        >
          Enquire
        </Link>
      </div>
    </section>
  );
}
