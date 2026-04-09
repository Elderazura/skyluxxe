"use client";

import Link from "next/link";

import { DiamondMarker } from "@/components/ui/DiamondMarker";
import { MaskedText } from "@/components/ui/MaskedText";
import { brand } from "@/content/brand";

/** Restrained enquiry block tailored to the Our Story narrative arc. */
export function StoryClosingCta() {
  return (
    <section
      className="relative px-6 text-center"
      style={{
        backgroundColor: brand.colors.navy,
        paddingTop: "clamp(6rem, 12vh, 9rem)",
        paddingBottom: "clamp(6rem, 12vh, 9rem)",
      }}
      aria-labelledby="story-closing-cta-heading"
    >
      <div className="mx-auto flex max-w-xl flex-col items-center">
        <div className="mb-5 flex justify-center">
          <DiamondMarker size="sm" />
        </div>

        <p
          className="mb-4 font-[family-name:var(--font-body)] text-[0.6rem] font-medium uppercase tracking-[0.38em]"
          style={{ color: brand.colors.mutedBlue }}
        >
          Next step
        </p>

        <MaskedText as="h2" className="inline-block" id="story-closing-cta-heading">
          <span
            className="block font-[family-name:var(--font-display)] font-normal tracking-tight"
            style={{
              color: brand.colors.offWhite,
              fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)",
            }}
          >
            When you are ready
          </span>
        </MaskedText>

        <p
          className="mx-auto mt-6 max-w-md font-[family-name:var(--font-serif)] text-base italic leading-relaxed md:text-lg"
          style={{ color: brand.colors.mutedBlue }}
        >
          Discretion extends to how we begin. A single conversation opens every
          journey.
        </p>

        <span
          role="presentation"
          className="mt-8 block h-px w-full max-w-[14rem]"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent 0%, ${brand.colors.gold} 42%, ${brand.colors.gold} 58%, transparent 100%)`,
          }}
        />

        <Link
          href="/enquiry"
          className="group relative mt-10 inline-block font-[family-name:var(--font-body)] text-[0.9375rem] font-light tracking-[0.14em] uppercase"
          style={{ color: brand.colors.offWhite }}
        >
          <span className="relative inline-block pb-1">Speak with us</span>
          <span
            className="absolute bottom-0 left-0 h-px w-full origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
            style={{ backgroundColor: brand.colors.roseGold }}
          />
        </Link>
      </div>
    </section>
  );
}
