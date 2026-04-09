import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DiamondMarker } from "@/components/ui/DiamondMarker";
import { MaskedText } from "@/components/ui/MaskedText";
import {
  getServiceBySlug,
  serviceCategoryLabel,
  services,
  type Service,
} from "@/content/services";
import { brand } from "@/content/brand";
import { serviceImages, getCtaBgImage } from "@/content/images";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return { title: "Service" };
  }
  return {
    title: service.name,
    description: service.shortDescription,
  };
}

function neighborsFor(service: Service) {
  const i = services.findIndex((s) => s.id === service.id);
  return {
    prev: i > 0 ? services[i - 1] : null,
    next: i < services.length - 1 ? services[i + 1] : null,
  };
}

function editorialShellClass(service: Service): string {
  const v = service.id % 3;
  if (v === 1) return "md:ml-[clamp(0rem,4vw,3rem)] md:max-w-[38rem]";
  if (v === 2) return "md:mr-[clamp(0rem,6vw,4rem)] md:max-w-[42rem]";
  return "mx-auto max-w-3xl";
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    notFound();
  }

  const { prev, next } = neighborsFor(service);
  const category = serviceCategoryLabel(service);
  const bodyClass = editorialShellClass(service);
  const heroImage = serviceImages[service.slug];

  return (
    <article className="bg-midnight-aviation-navy text-off-white">
      {/* Split-composition hero */}
      <header
        className="relative min-h-[70vh] overflow-hidden md:min-h-[80vh]"
        style={{ backgroundColor: brand.colors.deepNavy }}
        aria-labelledby="service-hero-heading"
      >
        <div className="grid h-full min-h-[70vh] grid-cols-1 md:min-h-[80vh] md:grid-cols-12">
          {/* Left: text content */}
          <div className="relative z-10 flex flex-col justify-end px-[var(--gutter-x)] pb-16 pt-32 md:col-span-5 md:justify-center md:pb-20 md:pt-36 lg:col-span-5">
            {/* Watermark roman numeral */}
            <p
              className="pointer-events-none absolute left-[var(--gutter-x)] top-1/2 z-0 -translate-y-1/2 select-none font-[family-name:var(--font-display)] font-normal leading-none"
              style={{
                color: brand.colors.offWhite,
                opacity: 0.05,
                fontSize: "clamp(8rem, 25vw, 18rem)",
              }}
              aria-hidden
            >
              {service.romanNumeral}
            </p>

            <div className="relative z-10">
              <div className="mb-8 flex items-center gap-3">
                <DiamondMarker size="sm" />
                <p
                  className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em]"
                  style={{ color: brand.colors.mutedBlue }}
                >
                  {category}
                </p>
              </div>

              <MaskedText as="div" delay={0}>
                <h1
                  id="service-hero-heading"
                  className="max-w-lg font-[family-name:var(--font-display)] font-normal tracking-tight"
                  style={{
                    color: brand.colors.ivoryCream,
                    fontSize: "clamp(2.25rem, 5.5vw, 3.75rem)",
                    lineHeight: 1.08,
                  }}
                >
                  {service.name}
                </h1>
              </MaskedText>

              <p
                className="mt-6 max-w-md font-[family-name:var(--font-body)] text-base font-light leading-relaxed"
                style={{ color: brand.colors.mutedBlue }}
              >
                {service.shortDescription}
              </p>
            </div>
          </div>

          {/* Right: full-visibility image */}
          <div className="relative md:col-span-7 lg:col-span-7">
            {heroImage && (
              <>
                <div className="relative aspect-[4/3] w-full md:absolute md:inset-0 md:aspect-auto">
                  <Image
                    src={heroImage}
                    alt={service.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 767px) 100vw, 60vw"
                    priority
                  />
                </div>
                {/* Soft left-edge blend into navy on desktop */}
                <div
                  className="pointer-events-none absolute inset-0 hidden md:block"
                  style={{
                    background: `linear-gradient(to right, ${brand.colors.deepNavy} 0%, rgba(6,19,37,0.5) 20%, transparent 45%)`,
                  }}
                />
                {/* Bottom fade on mobile */}
                <div
                  className="pointer-events-none absolute inset-0 md:hidden"
                  style={{
                    background: `linear-gradient(to top, ${brand.colors.deepNavy} 0%, transparent 60%)`,
                  }}
                />
              </>
            )}
          </div>
        </div>
      </header>

      {/* Body content */}
      <div className="px-[var(--gutter-x)] pb-16 pt-14 md:pb-20 md:pt-20">
        <div className={bodyClass}>
          <p
            className="font-[family-name:var(--font-serif)] text-xl font-light leading-[1.75] md:text-2xl md:leading-[1.8]"
            style={{ color: brand.colors.offWhite }}
          >
            {service.longDescription}
          </p>

          <div className="mt-14 md:mt-20">
            <Link
              href="/enquiry"
              className="group inline-flex min-h-[44px] items-center gap-3 py-2 font-[family-name:var(--font-serif)] text-lg italic md:text-xl"
              style={{ color: brand.colors.roseGold }}
            >
              <span className="relative pb-0.5">
                We can arrange this
                <span
                  className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                  style={{ backgroundColor: brand.colors.roseGold }}
                  aria-hidden
                />
              </span>
              <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" aria-hidden>
                &rarr;
              </span>
            </Link>
          </div>
        </div>

        {/* Prev/Next navigation */}
        <nav
          className="mx-auto mt-20 max-w-[var(--spacing-container)] border-t border-white/10 pt-14 md:mt-24 md:pt-16"
          aria-label="Service navigation"
        >
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-12">
            <Link
              href="/services"
              className="group inline-flex min-h-[44px] shrink-0 items-center py-2 font-[family-name:var(--font-body)] text-sm font-normal tracking-wide md:text-base"
              style={{ color: brand.colors.mutedBlue }}
            >
              <span className="relative inline-block pb-0.5">
                Return to Services
                <span
                  className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                  style={{ backgroundColor: brand.colors.roseGold }}
                  aria-hidden
                />
              </span>
            </Link>

            <div className="flex flex-wrap gap-10 md:justify-end md:gap-14">
              {prev && (
                <Link
                  href={`/services/${prev.slug}`}
                  className="group block min-w-0 max-w-[min(100%,16rem)] py-2"
                >
                  <span
                    className="mb-1 block font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.18em]"
                    style={{ color: brand.colors.mutedBlue }}
                  >
                    Previous
                  </span>
                  <span className="relative inline-block font-[family-name:var(--font-display)] text-lg leading-snug" style={{ color: brand.colors.ivoryCream }}>
                    {prev.name}
                    <span
                      className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                      style={{ backgroundColor: brand.colors.roseGold }}
                      aria-hidden
                    />
                  </span>
                </Link>
              )}

              {next && (
                <Link
                  href={`/services/${next.slug}`}
                  className="group block min-w-0 max-w-[min(100%,16rem)] py-2 text-left md:text-right"
                >
                  <span
                    className="mb-1 block font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.18em]"
                    style={{ color: brand.colors.mutedBlue }}
                  >
                    Next
                  </span>
                  <span className="relative inline-block font-[family-name:var(--font-display)] text-lg leading-snug" style={{ color: brand.colors.ivoryCream }}>
                    {next.name}
                    <span
                      className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                      style={{ backgroundColor: brand.colors.roseGold }}
                      aria-hidden
                    />
                  </span>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* CTA section with atmospheric background */}
      <section
        className="relative overflow-hidden px-[var(--gutter-x)] text-center"
        style={{
          paddingTop: "clamp(5rem, 12vh, 8rem)",
          paddingBottom: "clamp(5rem, 12vh, 8rem)",
        }}
        aria-labelledby="service-enquiry-heading"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={getCtaBgImage(service.slug)}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            aria-hidden
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(13,27,42,0.95) 0%, rgba(13,27,42,0.85) 40%, rgba(13,27,42,0.75) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
          <div className="mb-5 flex justify-center">
            <DiamondMarker size="md" />
          </div>
          <p
            className="mb-5 font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em]"
            style={{ color: brand.colors.mutedBlue }}
          >
            Private Enquiry
          </p>
          <MaskedText as="h2" className="inline-block" id="service-enquiry-heading">
            <span
              className="block font-[family-name:var(--font-display)] font-normal tracking-tight"
              style={{
                color: brand.colors.offWhite,
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              }}
            >
              Discuss This Service
            </span>
          </MaskedText>
          <p
            className="mx-auto mt-6 max-w-md font-[family-name:var(--font-serif)] text-lg italic leading-relaxed md:text-xl"
            style={{ color: brand.colors.mutedBlue }}
          >
            Share your objectives in confidence — we respond with discretion and clarity.
          </p>
          <span
            role="presentation"
            className="mt-8 block h-px w-full max-w-xs md:max-w-sm"
            style={{
              backgroundImage: `linear-gradient(90deg, transparent 0%, ${brand.colors.roseGold} 45%, ${brand.colors.roseGold} 55%, transparent 100%)`,
            }}
          />
          <Link
            href="/enquiry"
            className="group relative mt-10 inline-flex min-h-[44px] items-center font-[family-name:var(--font-body)] text-base font-normal tracking-wide"
            style={{ color: brand.colors.offWhite }}
          >
            <span className="relative inline-block pb-1">Begin a Conversation</span>
            <span
              className="absolute bottom-0 left-0 h-px w-full origin-center scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
              style={{ backgroundColor: brand.colors.roseGold }}
            />
          </Link>
        </div>
      </section>
    </article>
  );
}
