import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { GlimpseRail } from "@/components/sections/GlimpseRail";
import { InlineCta } from "@/components/sections/InlineCta";
import { ReachCoverageGlobe } from "@/components/sections/ReachCoverageGlobe";
import { ReachRegions, type ReachRegion } from "@/components/sections/ReachRegions";
import { ReachStatement } from "@/components/sections/ReachStatement";
import { MaskedText } from "@/components/ui/MaskedText";
import { brand } from "@/content/brand";
import { crossLinkExplore } from "@/content/crossLinks";
import { lifestyleImages, brandImages } from "@/content/images";

export const metadata: Metadata = {
  title: "Global Reach",
};

const REGIONS: readonly ReachRegion[] = [
  {
    id: "me",
    name: "Middle East & GCC",
    cities: ["Abu Dhabi", "Dubai", "Riyadh", "Doha", "Bahrain"],
    image: brandImages.receptionDesk,
  },
  {
    id: "eu",
    name: "Europe",
    cities: ["London", "Paris", "Geneva", "Monaco", "Milan", "Zurich"],
    image: lifestyleImages.parisLuggage,
  },
  {
    id: "apac",
    name: "Asia Pacific",
    cities: ["Tokyo", "Singapore", "Hong Kong", "Maldives", "Bali"],
    image: brandImages.beachsideDining,
  },
  {
    id: "americas",
    name: "Americas",
    cities: ["New York", "Los Angeles", "Miami", "Aspen", "São Paulo"],
    image: lifestyleImages.manExitingJet,
  },
  {
    id: "africa",
    name: "Africa & Indian Ocean",
    cities: ["Cape Town", "Marrakech", "Seychelles", "Mauritius"],
    image: lifestyleImages.safariDining,
  },
];

export default function ReachPage() {
  return (
    <article className="min-h-screen overflow-x-hidden">
      {/* Full-bleed hero image */}
      <header className="relative min-h-[60vh] overflow-hidden md:min-h-[70vh]">
        <Image
          src={lifestyleImages.parisLuggage}
          alt="Luggage at Place Vendôme, Paris"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, #0D1B2A 0%, rgba(13,27,42,0.7) 35%, rgba(13,27,42,0.3) 60%, transparent 100%)",
          }}
        />
        <div className="absolute inset-0 z-10 flex flex-col justify-end px-[var(--gutter-x)] pb-16 md:pb-24">
          <div className="mx-auto w-full max-w-[var(--container-max)]">
            <p className="mb-4 font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              Our Network
            </p>
            <MaskedText as="h1" className="block">
              <span
                className="block max-w-[12ch] font-[family-name:var(--font-display)] font-normal tracking-tight text-white"
                style={{ fontSize: "clamp(2.75rem, 7vw, 5.25rem)", lineHeight: 1.05 }}
              >
                Global Reach
              </span>
            </MaskedText>
            <p
              className="mt-6 max-w-md font-[family-name:var(--font-serif)] text-xl font-light italic leading-[1.45] text-white/70 md:text-2xl"
            >
              From Abu Dhabi to the world&apos;s most private destinations
            </p>
          </div>
        </div>
      </header>

      {/* Coverage — globe + narrative */}
      <section
        className="px-[var(--gutter-x)] pb-6 pt-16 md:pb-10 md:pt-24"
        style={{ backgroundColor: brand.colors.navy }}
        aria-labelledby="coverage-heading"
      >
        <div className="mx-auto max-w-[var(--container-max)]">
          <p
            className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em]"
            style={{ color: brand.colors.mutedBlue }}
          >
            Coverage
          </p>
          <h2
            id="coverage-heading"
            className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-3xl tracking-tight md:text-[2.75rem]"
            style={{ color: brand.colors.offWhite }}
          >
            One desk. Many regions.
          </h2>
          <p
            className="mt-6 max-w-2xl font-[family-name:var(--font-body)] text-base font-light leading-relaxed md:text-lg"
            style={{ color: brand.colors.mutedBlue }}
          >
            Abu Dhabi is our home — the axis from which we coordinate partners, aircraft, yachts,
            residences, and ground teams. The globe below sketches principal touchpoints; your
            programme may extend wherever your calendar demands.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/enquiry"
              className="inline-flex min-h-[44px] items-center justify-center border border-[#DFA293] px-8 py-3 font-[family-name:var(--font-body)] text-[13px] font-normal uppercase tracking-[0.14em] text-[#FAF7F4] transition-colors duration-300 hover:bg-[#DFA293] hover:text-[#0D1B2A]"
            >
              Start a conversation
            </Link>
            <Link
              href="/services"
              className="inline-flex min-h-[44px] items-center justify-center px-2 font-[family-name:var(--font-serif)] text-base italic text-[#DFA293] underline-offset-4 transition-opacity hover:opacity-85"
            >
              View all services
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-[44px] items-center justify-center px-2 font-[family-name:var(--font-serif)] text-base italic text-[#8A9AB5] underline-offset-4 transition-opacity hover:text-[#DFA293]"
            >
              Our story
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-[min(100%,1100px)] md:mt-16">
          <ReachCoverageGlobe />
        </div>
      </section>

      {/* Regions */}
      <section
        className="px-[var(--gutter-x)] py-24 md:py-32"
        style={{ backgroundColor: brand.colors.navy }}
        aria-labelledby="regions-heading"
      >
        <h2 id="regions-heading" className="sr-only">
          Regions and cities
        </h2>
        <div className="mx-auto max-w-[var(--container-max)]">
          <ReachRegions regions={REGIONS} />
        </div>
      </section>

      <ReachStatement />

      <GlimpseRail
        kicker="Discover"
        heading="Continue exploring"
        items={crossLinkExplore.filter((item) => item.href !== "/reach")}
        background="deep"
      />

      <InlineCta
        heading="Where will you go next?"
        subtext="Share timing, party size, and tone — we build the architecture around you."
        href="/enquiry"
        label="Make an enquiry"
      />
    </article>
  );
}
