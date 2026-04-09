import type { Metadata } from "next";

import { AboutValuesList } from "@/components/sections/AboutValuesList";
import { InlineCta } from "@/components/sections/InlineCta";
import { StoryClosingCta } from "@/components/sections/StoryClosingCta";
import { HairlineRule } from "@/components/ui/HairlineRule";
import { MaskedText } from "@/components/ui/MaskedText";
import { RevealImage } from "@/components/ui/RevealImage";
import { ScrollStats, type ScrollStatItem } from "@/components/ui/ScrollStats";
import { brand } from "@/content/brand";
import { brandImages } from "@/content/images";

export const metadata: Metadata = {
  title: "Our Story",
};

const STORY_STATS: readonly ScrollStatItem[] = [
  {
    id: "years",
    value: 15,
    suffix: "+",
    label: "years of expertise",
    durationMs: 1800,
  },
  {
    id: "destinations",
    value: 150,
    suffix: "+",
    label: "destinations",
    durationMs: 2000,
  },
  {
    id: "ops",
    value: 24,
    suffix: "/7",
    label: "global operations",
    durationMs: 1400,
  },
] as const;

const VALUES: readonly {
  title: string;
  body: string;
}[] = [
  {
    title: "Silent Excellence",
    body:
      "We measure success by what never needs to be said—flawless execution that feels inevitable, never performed.",
  },
  {
    title: "Absolute Discretion",
    body:
      "Your movements, preferences, and presence are held in confidence with the same care we devote to the journey itself.",
  },
  {
    title: "Anticipatory Care",
    body:
      "We design for the moment before the request—reading rhythm, context, and nuance so nothing feels last-minute.",
  },
  {
    title: "Refined Warmth",
    body:
      "Luxury without coldness: precise, human, and quietly attentive—never theatrical, always sincere.",
  },
  {
    title: "Uncompromising Standards",
    body:
      "Every partner, vehicle, residence, and touchpoint is vetted to a single bar: worthy of the Skyluxxe name.",
  },
];

export default function AboutPage() {
  return (
    <article className="overflow-x-hidden">
      {/* Hero — navy */}
      <header
        className="relative px-[var(--gutter-x)] pt-32 pb-24 md:pt-40 md:pb-32"
        style={{ backgroundColor: brand.colors.navy }}
      >
        <div className="mx-auto max-w-[var(--container-max)]">
          <MaskedText>
            <p
              className="mb-6 font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em]"
              style={{ color: brand.colors.mutedBlue }}
            >
              SKYLUXXE
            </p>
          </MaskedText>
          <MaskedText as="h1" className="block" delay={0.06}>
            <span
              className="block max-w-[14ch] font-[family-name:var(--font-display)] font-normal tracking-tight"
              style={{
                color: brand.colors.offWhite,
                fontSize: "clamp(3rem, 8vw, 5.75rem)",
                lineHeight: 1.05,
              }}
            >
              Our Story
            </span>
          </MaskedText>
          <div className="mt-12 max-w-md">
            <HairlineRule accent="rose-gold" />
          </div>
        </div>
      </header>

      {/* Pull quote — deep navy */}
      <section
        aria-labelledby="pull-quote-heading"
        className="px-[var(--gutter-x)] py-20 md:py-28"
        style={{ backgroundColor: brand.colors.deepNavy }}
      >
        <div className="mx-auto max-w-[var(--container-max)]">
          <h2 id="pull-quote-heading" className="sr-only">
            Editorial statement
          </h2>
          <MaskedText>
            <blockquote
              className="mx-auto max-w-4xl text-center font-[family-name:var(--font-serif)] font-light italic leading-[1.35]"
              style={{
                color: brand.colors.offWhite,
                fontSize: "clamp(1.5rem, 3.5vw, 2.35rem)",
              }}
            >
              <span className="block text-balance">
                In a world where luxury is loudly proclaimed, Skyluxxe exists
                in the space between.
              </span>
            </blockquote>
          </MaskedText>
        </div>
      </section>

      {/* Editorial image — between statement and narrative */}
      <section
        className="px-[var(--gutter-x)] pb-12 pt-6 md:pb-16 md:pt-8"
        style={{ backgroundColor: brand.colors.deepNavy }}
      >
        <div className="mx-auto w-full max-w-[min(100%,var(--container-max))]">
          <RevealImage
            src={brandImages.inFlightUmbrella}
            alt="A refined umbrella held skyward in soft light, evoking composed travel between destinations."
            width={1600}
            height={900}
            responsive
            parallax
          />
        </div>
      </section>

      {/* Story — ivory cream for long-form reading */}
      <section
        className="px-[var(--gutter-x)] py-24 md:py-32"
        style={{ backgroundColor: brand.colors.ivoryCream }}
        aria-labelledby="brand-story-heading"
      >
        <div className="mx-auto grid max-w-[var(--container-max)] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20 lg:items-start">
          <div className="lg:pt-2">
            <MaskedText>
              <p
                className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em]"
                style={{ color: brand.colors.mutedBlue }}
              >
                The narrative
              </p>
            </MaskedText>
            <MaskedText as="h2" className="mt-4 block" delay={0.05}>
              <span
                id="brand-story-heading"
                className="block font-[family-name:var(--font-display)] text-3xl tracking-tight md:text-4xl"
                style={{ color: brand.colors.navy }}
              >
                Born in Abu Dhabi
              </span>
            </MaskedText>
            <div className="mt-8 hidden lg:block">
              <HairlineRule accent="gold" />
            </div>
          </div>
          <div className="space-y-8 font-[family-name:var(--font-body)] text-base font-light leading-[1.85] md:text-[1.0625rem] md:leading-[1.9]"
            style={{ color: brand.colors.deepNavy }}
          >
            <MaskedText>
              <p>
                Skyluxxe was founded on a conviction that true luxury is not
                announced—it is felt. From our base in Abu Dhabi, we built a
                practice around the rhythms of private travel: unhurried,
                exacting, and attuned to the smallest inflections of preference.
              </p>
            </MaskedText>
            <MaskedText delay={0.05}>
              <p>
                Our clients move between capitals and coastlines, boardrooms and
                berths. What they share is not a title but a standard: the
                expectation that every detail has already been considered, every
                door opened before it is reached.
              </p>
            </MaskedText>
            <MaskedText delay={0.1}>
              <p>
                We do not chase trends. We curate permanence—relationships with
                estates, crews, and craftspeople who understand that excellence
                is a habit, not an occasion. Skyluxxe is the quiet constant in a
                landscape of noise: the partner who remembers how you like the
                light, the temperature, and the silence.
              </p>
            </MaskedText>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-[var(--container-max)] md:mt-24">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6">
            <div className="flex justify-start">
              <RevealImage
                src={brandImages.candleStationery}
                alt="Candle glow beside fine stationery and writing tools, suggesting calm, considered correspondence."
                width={960}
                height={720}
                responsive
              />
            </div>
            <div className="flex justify-end">
              <RevealImage
                src={brandImages.luxuryLuggage}
                alt="Fine leather luggage awaiting departure — the materials of a considered life."
                width={960}
                height={720}
                responsive
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy — navy */}
      <section
        className="px-[var(--gutter-x)] py-24 md:py-32"
        style={{ backgroundColor: brand.colors.navy }}
        aria-labelledby="philosophy-heading"
      >
        <div className="mx-auto max-w-[var(--container-max)]">
          <div className="mb-16 max-w-2xl">
            <MaskedText>
              <p
                className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em]"
                style={{ color: brand.colors.mutedBlue }}
              >
                Philosophy
              </p>
            </MaskedText>
            <MaskedText as="h2" className="mt-4 block" delay={0.05}>
              <span
                id="philosophy-heading"
                className="block font-[family-name:var(--font-display)] text-3xl tracking-tight md:text-[2.75rem]"
                style={{ color: brand.colors.offWhite }}
              >
                Mission &amp; vision
              </span>
            </MaskedText>
          </div>

          <div className="grid gap-16 md:grid-cols-2 md:gap-12 lg:gap-24">
            <div className="relative md:pr-8">
              <span
                className="pointer-events-none absolute -left-4 top-0 hidden h-full w-px md:block"
                style={{
                  background: `linear-gradient(180deg, transparent, ${brand.colors.gold}35%, transparent)`,
                }}
                aria-hidden
              />
              <MaskedText>
                <h3
                  className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.18em]"
                  style={{ color: brand.colors.mutedBlue }}
                >
                  Mission
                </h3>
              </MaskedText>
              <MaskedText delay={0.06}>
                <p
                  className="mt-5 font-[family-name:var(--font-serif)] text-2xl italic leading-snug md:text-[1.75rem]"
                  style={{ color: brand.colors.offWhite }}
                >
                  To redefine luxury travel through silent excellence.
                </p>
              </MaskedText>
            </div>
            <div className="relative md:pl-4">
              <MaskedText>
                <h3
                  className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.18em]"
                  style={{ color: brand.colors.mutedBlue }}
                >
                  Vision
                </h3>
              </MaskedText>
              <MaskedText delay={0.06}>
                <p
                  className="mt-5 font-[family-name:var(--font-serif)] text-2xl italic leading-snug md:text-[1.75rem]"
                  style={{ color: brand.colors.offWhite }}
                >
                  The world&apos;s most trusted name in private travel.
                </p>
              </MaskedText>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-[var(--container-max)] md:mt-28">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6">
            <div className="flex justify-start">
              <RevealImage
                src={brandImages.coastalTote}
                alt="A handcrafted tote set beside the shore — travel as an extension of taste."
                width={960}
                height={720}
                responsive
              />
            </div>
            <div className="flex justify-end">
              <RevealImage
                src={brandImages.giftBox}
                alt="A ribboned gift box and refined packaging details, reflecting discretion and care in every gesture."
                width={960}
                height={720}
                responsive
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values — ivory cream */}
      <section
        className="px-[var(--gutter-x)] py-24 md:py-32"
        style={{ backgroundColor: brand.colors.ivoryCream }}
        aria-labelledby="values-heading"
      >
        <div className="mx-auto max-w-[var(--container-max)]">
          <div className="mb-16 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
            <div>
              <MaskedText>
                <p
                  className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em]"
                  style={{ color: brand.colors.mutedBlue }}
                >
                  What we hold sacred
                </p>
              </MaskedText>
              <MaskedText as="h2" className="mt-4 block" delay={0.05}>
                <span
                  id="values-heading"
                  className="block font-[family-name:var(--font-display)] text-3xl tracking-tight md:text-4xl"
                  style={{ color: brand.colors.navy }}
                >
                  Values
                </span>
              </MaskedText>
            </div>
            <MaskedText>
              <p
                className="max-w-sm font-[family-name:var(--font-serif)] text-lg italic leading-relaxed"
                style={{ color: brand.colors.mutedBlue }}
              >
                Five principles—lived daily, never marketed loudly.
              </p>
            </MaskedText>
          </div>

          <AboutValuesList values={VALUES} />
        </div>
      </section>

      {/* Stats — navy */}
      <section
        className="px-[var(--gutter-x)] py-24 md:py-32"
        style={{ backgroundColor: brand.colors.navy }}
        aria-labelledby="stats-heading"
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-14 text-center">
            <MaskedText>
              <h2
                id="stats-heading"
                className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em]"
                style={{ color: brand.colors.mutedBlue }}
              >
                At a glance
              </h2>
            </MaskedText>
            <MaskedText delay={0.05}>
              <p
                className="mx-auto mt-4 max-w-lg font-[family-name:var(--font-serif)] text-lg italic"
                style={{ color: brand.colors.offWhite }}
              >
                Scale without spectacle—measured in years, reach, and presence.
              </p>
            </MaskedText>
          </div>
          <ScrollStats items={STORY_STATS} />
        </div>
      </section>

      <InlineCta
        heading="Start the conversation."
        subtext="Fifteen years of quiet expertise, at your service."
        href="/enquiry"
        label="Reach Out"
        variant="ivory"
      />

      <StoryClosingCta />
    </article>
  );
}
