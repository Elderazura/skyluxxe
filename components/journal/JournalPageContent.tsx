"use client";

import { DiamondMarker } from "@/components/ui/DiamondMarker";
import { HairlineRule } from "@/components/ui/HairlineRule";
import { MaskedText } from "@/components/ui/MaskedText";
import { brand } from "@/content/brand";

export function JournalPageContent() {
  return (
    <article
      aria-labelledby="journal-heading"
      className="px-[var(--gutter-x)] pb-[var(--section-y-lg)] pt-[clamp(7rem,12vh,10rem)]"
      style={{ backgroundColor: brand.colors.navy }}
    >
      <header className="mx-auto max-w-3xl text-center">
        <div className="mb-8 flex justify-center">
          <DiamondMarker size="md" />
        </div>

        <MaskedText as="h1" className="inline-block" id="journal-heading">
          <span className="block font-[family-name:var(--font-display)] text-[clamp(2.25rem,5vw,3.25rem)] font-normal tracking-tight text-off-white">
            The Journal
          </span>
        </MaskedText>

        <p className="mx-auto mt-8 max-w-xl font-[family-name:var(--font-serif)] text-lg italic leading-relaxed text-off-white/90 md:text-xl">
          Reflections on the art of considered travel
        </p>

        <div className="mx-auto mt-10 max-w-md">
          <HairlineRule accent="gold" />
        </div>
      </header>

      <section className="mx-auto mt-[clamp(4rem,10vh,6rem)] max-w-xl text-center">
        <div className="mx-auto mb-12 max-w-xs">
          <HairlineRule accent="rose-gold" />
        </div>

        <p className="font-[family-name:var(--font-body)] text-base font-light leading-relaxed text-muted-blue">
          Our editorial collection is being curated. Please return.
        </p>

        <div className="mx-auto mt-12 max-w-xs">
          <HairlineRule accent="gold" />
        </div>
      </section>
    </article>
  );
}
