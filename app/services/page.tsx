import type { Metadata } from "next";

import { pageMetadata } from "@/lib/page-metadata";
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

export const metadata: Metadata = pageMetadata({
  path: "/services",
  title: "Our Services",
  description:
    "Eleven disciplines of invisible service — private aviation, VIP airport concierge, yacht charter, luxury stays, events access, protection travel, and bespoke itineraries.",
});

const SERVICE_CATEGORY_CHIPS = [
  { href: "#air", label: "Air" },
  { href: "#sea", label: "Sea" },
  { href: "#stay", label: "Stay" },
  { href: "#lifestyle", label: "Lifestyle" },
] as const;

export default function ServicesPage() {
  return (
    <div className="text-off-white">
      <section
        className="bg-[#FAF7F4] px-[var(--gutter-x)] pb-12 pt-32 md:pb-24 md:pt-36"
        aria-labelledby="services-overview-heading"
      >
        <header className="mx-auto max-w-4xl text-center">
          <MaskedText as="p" className="block" delay={0}>
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
        className="bg-midnight-aviation-navy px-[var(--gutter-x)] pb-16 md:pt-[var(--section-y-sm)] md:pb-[var(--section-y-lg)]"
        aria-label="Service disciplines"
      >
        {/*
          Phones: a sticky row of category chips, so eleven services are a jump
          away instead of a long scroll. The anchors are the same ones the
          footer and home page link to.
        */}
        <nav
          aria-label="Service categories"
          className="sticky top-[5.5rem] z-20 -mx-[var(--gutter-x)] mb-8 flex gap-2 overflow-x-auto border-b border-white/[0.06] bg-[#0D1B2A]/95 px-[var(--gutter-x)] py-3 backdrop-blur-md sk-no-scrollbar md:hidden"
        >
          {SERVICE_CATEGORY_CHIPS.map((chip) => (
            <a
              key={chip.href}
              href={chip.href}
              className="inline-flex min-h-[40px] shrink-0 items-center border border-white/15 px-4 font-[family-name:var(--font-body)] text-[11px] uppercase tracking-[0.16em] text-off-white active:border-[#DFA293] active:text-[#DFA293]"
            >
              {chip.label}
            </a>
          ))}
        </nav>

        <ol className="mx-auto max-w-[var(--spacing-container)] list-none">
            {services.map((service, index) => {
            const anchorId = serviceOverviewAnchorId(service);
            const imgSrc = serviceImages[service.slug];
            const imageOnRight = index % 2 === 0;
              
              return (
              <li
                key={service.id}
                id={anchorId}
                className="scroll-mt-40 first:pt-0 max-md:[&:not(:first-child)]:mt-7 md:scroll-mt-32"
              >
                {index > 0 && (
                  <HairlineRule
                    accent="gold"
                    className="mb-7 md:mb-24 lg:mb-28"
                  />
                )}

                <MaskedText as="article" delay={0.08 + index * 0.1}>
                  <div
                    // Phones: thumbnail left, text right — a scannable index
                    // row rather than a full-width image per service.
                    className={`grid grid-cols-[6.5rem_minmax(0,1fr)] items-start gap-4 md:grid-cols-12 md:items-center md:gap-12 lg:gap-16 ${
                      !imageOnRight ? "md:[direction:rtl]" : ""
                    }`}
                  >
                    {/* Text content */}
                    <div className="min-w-0 md:col-span-7 md:[direction:ltr]">
                      <div className="grid grid-cols-1 items-start gap-1.5 md:grid-cols-[minmax(4.5rem,7.5rem)_minmax(0,1fr)] md:gap-x-10 md:gap-y-6">
                        <p
                          className="select-none font-[family-name:var(--font-body)] text-[11px] leading-none tracking-[0.22em] opacity-70 md:font-[family-name:var(--font-display)] md:text-7xl md:tracking-tight md:opacity-[0.22]"
                          style={{ color: brand.colors.mutedBlue }}
                          aria-hidden
                        >
                          {service.romanNumeral}
                        </p>

                        <div className="min-w-0 space-y-2 md:space-y-4 md:pt-1">
                          <h2 className="text-[1.35rem] leading-snug md:text-4xl md:leading-tight">
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
                            className="line-clamp-3 max-w-xl font-[family-name:var(--font-body)] text-sm font-light leading-relaxed md:line-clamp-none md:text-lg"
                            style={{ color: brand.colors.mutedBlue }}
                          >
                            {service.shortDescription}
                          </p>
                          <p className="md:pt-6">
                            <Link
                              href="/enquiry"
                              className="group inline-flex min-h-[40px] items-center gap-2 font-[family-name:var(--font-serif)] text-sm italic transition-opacity duration-300 hover:opacity-85 md:min-h-0 md:text-base"
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
                      <div className="order-first md:order-none md:col-span-5 md:[direction:ltr]">
                        <RevealImage>
                          <Link href={`/services/${service.slug}`} className="block">
                            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm md:aspect-[4/3]">
                        <Image
                                src={imgSrc}
                                alt={service.name}
                                fill
                                className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.03]"
                                sizes="(max-width: 767px) 104px, 35vw"
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
