import Image from "next/image";
import Link from "next/link";

import { brand } from "@/content/brand";
import { brandImages, lifestyleImages } from "@/content/images";

const BANNERS = [
  {
    href: "/about",
    title: "The Skyluxxe standard",
    subtitle: "Discretion, precision, and warmth — read how we work.",
    imageSrc: brandImages.conciergeLounge,
    imageAlt: "Concierge lounge — calm, private service.",
  },
  {
    href: "/reach",
    title: "Everywhere distinction matters",
    subtitle: "Our network spans capitals, coasts, and retreats — anchored in Abu Dhabi.",
    imageSrc: lifestyleImages.jetSunsetAerial,
    imageAlt: "Aircraft above clouds at sunset.",
  },
] as const;

export function ServicesShowcaseBanners() {
  return (
    <section
      className="border-t border-white/[0.06] px-[var(--gutter-x)] py-[clamp(4rem,10vh,7rem)] md:py-[clamp(5rem,12vh,8.5rem)]"
      style={{ backgroundColor: brand.colors.deepNavy }}
      aria-labelledby="services-showcase-heading"
    >
      <div className="mx-auto max-w-[var(--container-max)]">
        <div className="mb-12 max-w-2xl md:mb-14">
          <p
            className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em]"
            style={{ color: brand.colors.mutedBlue }}
          >
            Skyluxxe
          </p>
          <h2
            id="services-showcase-heading"
            className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-tight md:text-[2.35rem]"
            style={{ color: brand.colors.offWhite }}
          >
            Beyond the itinerary
          </h2>
          <p
            className="mt-4 max-w-xl font-[family-name:var(--font-body)] text-base font-light leading-relaxed md:text-lg"
            style={{ color: brand.colors.mutedBlue }}
          >
            A concierge practice built for principals who move often — and expect continuity
            across air, sea, stay, and lifestyle.
          </p>
        </div>

        <ul className="flex flex-col gap-6 md:gap-8">
          {BANNERS.map((banner) => (
            <li key={banner.href}>
              <Link
                href={banner.href}
                className="group relative block min-h-[200px] overflow-hidden rounded-sm md:min-h-[260px] lg:min-h-[300px]"
              >
                <Image
                  src={banner.imageSrc}
                  alt={banner.imageAlt}
                  fill
                  className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 1023px) 100vw, min(1200px, 92vw)"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/95 via-[#0D1B2A]/55 to-transparent md:from-[#0D1B2A]/90 md:via-[#0D1B2A]/35"
                  aria-hidden
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:max-w-xl md:p-12 lg:p-14">
                  <p className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-white md:text-3xl">
                    {banner.title}
                  </p>
                  <p className="mt-3 font-[family-name:var(--font-body)] text-base font-light leading-relaxed text-white/80 md:text-lg">
                    {banner.subtitle}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 font-[family-name:var(--font-serif)] text-sm italic text-[#DFA293] transition-transform duration-300 group-hover:translate-x-1">
                    Continue
                    <span aria-hidden>&rarr;</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
