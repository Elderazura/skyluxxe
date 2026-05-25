import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { HairlineRule } from "@/components/ui/HairlineRule";
import { InlineCta } from "@/components/sections/InlineCta";
import { MaskedText } from "@/components/ui/MaskedText";
import { RevealImage } from "@/components/ui/RevealImage";
import { GlimpseRail } from "@/components/sections/GlimpseRail";
import { ServicesShowcaseBanners } from "@/components/sections/ServicesShowcaseBanners";
import {
  services,
  serviceOverviewAnchorId,
} from "@/content/services";
import { brand } from "@/content/brand";
import { crossLinkExplore } from "@/content/crossLinks";
import { serviceImages } from "@/content/images";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Eleven disciplines of invisible service — private aviation, VIP airport concierge, yacht charter, luxury stays, events access, protection travel, and bespoke itineraries.",
};

export default function ServicesPage() {
  return (
    <div className="text-off-white">
      <section
        className="bg-[#FAF7F4] px-[var(--gutter-x)] pb-16 pt-28 md:pb-24 md:pt-36"
        aria-labelledby="services-overview-heading"
      >
        <header className="mx-auto max-w-4xl text-center">
          <MaskedText as="p" className="inline-block" delay={0}>
            <span
              className="block font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em]"
              style={{ color: brand.colors.navy, opacity: 0.5 }}
            >
              Skyluxxe
            </span>
          </MaskedText>

          <MaskedText
            as="h1"
            className="mt-5 inline-block"
            delay={0.06}
            id="services-overview-heading"
          >
            <span
              className="block font-[family-name:var(--font-display)] font-normal tracking-tight"
              style={{
                color: brand.colors.navy,
                fontSize: "clamp(2.75rem, 7vw, 4.75rem)",
                lineHeight: 1.05,
              }}
            >
              Our Services
            </span>
          </MaskedText>

          <MaskedText as="p" className="mx-auto mt-8 inline-block max-w-xl" delay={0.12}>
            <span
              className="block font-[family-name:var(--font-serif)] text-xl italic leading-snug md:text-2xl"
              style={{ color: brand.colors.navy, opacity: 0.6 }}
            >
              Eleven disciplines of invisible service
            </span>
          </MaskedText>
        </header>
      </section>

      <section
        className="bg-midnight-aviation-navy px-[var(--gutter-x)] pb-[var(--section-y-md)] pt-[var(--section-y-sm)] md:pb-[var(--section-y-lg)]"
        aria-label="Service disciplines"
      >
        <ol className="mx-auto max-w-[var(--spacing-container)] list-none">
          {services.map((service, index) => {
            const anchorId = serviceOverviewAnchorId(service);
            const imgSrc = serviceImages[service.slug];
            const imageOnRight = index % 2 === 0;

            return (
              <li
                key={service.id}
                id={anchorId}
                className="scroll-mt-28 first:pt-0 md:scroll-mt-32"
              >
                {index > 0 && (
                  <HairlineRule
                    accent="gold"
                    className="mb-20 md:mb-24 lg:mb-28"
                  />
                )}

                <MaskedText as="article" delay={0.08 + index * 0.1}>
                  <div
                    className={`grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12 lg:gap-16 ${
                      !imageOnRight ? "md:[direction:rtl]" : ""
                    }`}
                  >
                    {/* Text content */}
                    <div className="min-w-0 md:col-span-7 md:[direction:ltr]">
                      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[minmax(4.5rem,7.5rem)_minmax(0,1fr)] md:gap-x-10">
                        <p
                          className="select-none font-[family-name:var(--font-display)] text-4xl leading-none tracking-tight sm:text-5xl md:text-7xl"
                          style={{ color: brand.colors.mutedBlue, opacity: 0.22 }}
                          aria-hidden
                        >
                          {service.romanNumeral}
                        </p>

                        <div className="min-w-0 space-y-4 md:pt-1">
                          <h2 className="text-3xl leading-tight sm:text-4xl">
                            <Link
                              href={`/services/${service.slug}`}
                              className="group font-[family-name:var(--font-display)] font-normal tracking-tight outline-none transition-colors"
                              style={{ color: brand.colors.ivoryCream }}
                            >
                              <span className="relative inline-block">
                                {service.name}
                                <span
                                  className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                                  style={{ backgroundColor: brand.colors.roseGold }}
                                  aria-hidden
                                />
                              </span>
                            </Link>
                          </h2>

                          <p
                            className="max-w-xl font-[family-name:var(--font-body)] text-base font-light leading-relaxed md:text-lg"
                            style={{ color: brand.colors.mutedBlue }}
                          >
                            {service.shortDescription}
                          </p>
                          <p className="pt-6">
                            <Link
                              href="/enquiry"
                              className="group inline-flex items-center gap-2 font-[family-name:var(--font-serif)] text-base italic transition-opacity duration-300 hover:opacity-85"
                              style={{ color: brand.colors.roseGold }}
                            >
                              <span className="relative pb-0.5">
                                {service.listCta}
                                <span
                                  className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#DFA293] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                                  aria-hidden
                                />
                              </span>
                              <span
                                className="inline-block text-sm transition-transform duration-300 group-hover:translate-x-0.5"
                                aria-hidden
                              >
                                &rarr;
                              </span>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Image thumbnail */}
                    {imgSrc && (
                      <div className="md:col-span-5 md:[direction:ltr]">
                        <RevealImage>
                          <Link href={`/services/${service.slug}`} className="block">
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
                              <Image
                                src={imgSrc}
                                alt={service.name}
                                fill
                                className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
                                sizes="(max-width: 767px) 100vw, 35vw"
                              />
                            </div>
                          </Link>
                        </RevealImage>
                      </div>
                    )}
                  </div>
                </MaskedText>
              </li>
            );
          })}
        </ol>
      </section>

      <ServicesShowcaseBanners />

      <GlimpseRail
        kicker="Explore"
        heading="Elsewhere on Skyluxxe"
        items={crossLinkExplore}
        background="ivory"
      />

      <InlineCta
        heading="Tell us what you need."
        subtext="From a single flight to a year of seamless travel — we shape it around you."
        href="/enquiry"
        label="Get in Touch"
      />
    </div>
  );
}
