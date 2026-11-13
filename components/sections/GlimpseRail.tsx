import Image from "next/image";
import Link from "next/link";

import { brand } from "@/content/brand";
import type { CrossLinkItem } from "@/content/crossLinks";

type GlimpseRailProps = {
  kicker?: string;
  heading: string;
  items: readonly CrossLinkItem[];
  background?: "ivory" | "navy" | "deep";
};

const bgClass: Record<NonNullable<GlimpseRailProps["background"]>, string> = {
  ivory: brand.colors.ivoryCream,
  navy: brand.colors.navy,
  deep: brand.colors.deepNavy,
};

export function GlimpseRail({
  kicker = "Explore",
  heading,
  items,
  background = "ivory",
}: GlimpseRailProps) {
  const bg = bgClass[background];
  const ringOffset =
    background === "ivory" ? "focus-visible:ring-offset-[#FAF7F4]" : "focus-visible:ring-offset-[#0D1B2A]";

  return (
    <section
      className="px-[var(--gutter-x)] py-16 md:py-[clamp(5rem,12vh,8.5rem)]"
      style={{ backgroundColor: bg }}
      aria-labelledby="glimpse-rail-heading"
    >
      <div className="mx-auto max-w-[var(--container-max)]">
        <div className="mb-8 max-w-2xl md:mb-16">
          {kicker && (
            <p
              className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em]"
              style={{ color: brand.colors.mutedBlue }}
            >
              {kicker}
            </p>
          )}
          <h2
            id="glimpse-rail-heading"
            className="mt-3 font-[family-name:var(--font-display)] text-3xl tracking-tight md:text-4xl"
            style={{
              color: background === "ivory" ? brand.colors.navy : brand.colors.offWhite,
            }}
          >
            {heading}
          </h2>
        </div>

        {/* Phones: swipeable cards with the next one peeking in. */}
        <ul className="max-sm:-mx-[var(--gutter-x)] max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:gap-4 max-sm:overflow-x-auto max-sm:scroll-px-[var(--gutter-x)] max-sm:px-[var(--gutter-x)] sk-no-scrollbar sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-5">
          {items.map((item) => (
            <li key={item.href} className="max-sm:w-[76vw] max-sm:shrink-0 max-sm:snap-start">
              <Link
                href={item.href}
                className={`group block outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#DFA293] ${ringOffset}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm sm:aspect-[4/3]">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 639px) 76vw, (max-width: 1023px) 50vw, 25vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/85 via-[#0D1B2A]/25 to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <p
                      className="font-[family-name:var(--font-display)] text-xl tracking-tight text-white md:text-[1.35rem]"
                    >
                      {item.title}
                    </p>
                    <p className="mt-2 font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-white/75">
                      {item.description}
                    </p>
                    <span
                      className="mt-3 inline-flex items-center gap-1 font-[family-name:var(--font-serif)] text-sm italic text-[#DFA293] transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      View
                      <span aria-hidden>&rarr;</span>
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
