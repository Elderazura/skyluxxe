import type { Metadata } from "next";
import Image from "next/image";

import { MaskedText } from "@/components/ui/MaskedText";
import { ReachRegions, type ReachRegion } from "@/components/sections/ReachRegions";
import { ReachStatement } from "@/components/sections/ReachStatement";
import { brand } from "@/content/brand";
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
    </article>
  );
}
