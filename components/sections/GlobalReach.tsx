"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { MaskedText } from "@/components/ui/MaskedText";
import { EASE_OUT_EXPO, fadeInUp, staggerContainer } from "@/lib/animations";
import { brand } from "@/content/brand";
import { lifestyleImages } from "@/content/images";

const cities = [
  { name: "Abu Dhabi", highlight: true, size: "text-[clamp(2.25rem,4.5vw,4rem)]" },
  { name: "London", highlight: false, size: "text-[clamp(1.35rem,2.8vw,2.5rem)]" },
  { name: "Monaco", highlight: false, size: "text-[clamp(1.2rem,2.4vw,2.1rem)]" },
  { name: "Geneva", highlight: false, size: "text-[clamp(1.2rem,2.4vw,2.1rem)]" },
  { name: "New York", highlight: false, size: "text-[clamp(1.35rem,2.8vw,2.5rem)]" },
  { name: "Tokyo", highlight: false, size: "text-[clamp(1.05rem,2vw,1.85rem)]" },
  { name: "Maldives", highlight: false, size: "text-[clamp(1.05rem,2vw,1.85rem)]" },
  { name: "Paris", highlight: false, size: "text-[clamp(1.2rem,2.4vw,2.1rem)]" },
  { name: "Saint-Tropez", highlight: false, size: "text-[clamp(0.95rem,1.7vw,1.65rem)]" },
  { name: "Aspen", highlight: false, size: "text-[clamp(0.95rem,1.7vw,1.65rem)]" },
] as const;

const stats = [
  { value: "150+", label: "destinations" },
  { value: "15+", label: "years of expertise" },
  { value: "24/7", label: "global operations" },
] as const;

export function GlobalReach() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ backgroundColor: brand.colors.navy }}
      aria-labelledby="global-reach-heading"
    >
      {/* Hero band: image + structured overlay */}
      <div className="relative min-h-[min(88vh,920px)]">
        <Image
          src={lifestyleImages.jetStairsTarmac}
          alt="Boarding a private jet from a luxury car on the tarmac"
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(13,27,42,0.92) 0%, rgba(13,27,42,0.55) 42%, rgba(13,27,42,0.35) 72%, rgba(13,27,42,0.2) 100%)",
          }}
        />
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background: "linear-gradient(to top, #0D1B2A 0%, transparent 55%)",
          }}
        />

        <div className="absolute inset-0 z-10 flex items-end md:items-center">
          <div className="w-full px-[var(--gutter-x)] pb-14 pt-24 md:py-24">
            <div className="mx-auto grid max-w-[var(--container-max)] gap-12 lg:grid-cols-12 lg:gap-16 lg:items-end">
              {/* Left: title + supporting line */}
              <div className="lg:col-span-4 lg:pb-2">
                <MaskedText as="div">
                  <h2
                    id="global-reach-heading"
                    className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4rem)] font-normal leading-[1.05] tracking-tight text-white"
                  >
                    Global Reach
                  </h2>
                </MaskedText>
                <p className="mt-6 max-w-sm font-[family-name:var(--font-serif)] text-lg italic leading-relaxed text-white/75 md:text-xl">
                  Abu Dhabi at the centre — a single relationship, coordinated across time zones.
                </p>
                <div
                  className="mt-8 h-px w-16"
                  style={{ backgroundColor: brand.colors.roseGold, opacity: 0.5 }}
                  aria-hidden
                />
              </div>

              {/* Right: city grid — readable rhythm, not a cloud */}
              <div className="lg:col-span-8">
                <motion.div
                  className="flex flex-wrap items-baseline justify-start gap-x-6 gap-y-4 sm:gap-x-8 sm:gap-y-5 md:justify-end md:gap-x-10"
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.05, delayChildren: 0.15 },
                    },
                  }}
                >
                  {cities.map((city) => (
                    <motion.span
                      key={city.name}
                      className={`shrink-0 font-[family-name:var(--font-display)] leading-none tracking-tight ${city.size} ${
                        city.highlight ? "text-[color:var(--color-rose-gold)]" : "text-white/65"
                      }`}
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        visible: {
                          opacity: city.highlight ? 1 : 0.7,
                          y: 0,
                          transition: { duration: 0.65, ease: EASE_OUT_EXPO },
                        },
                      }}
                    >
                      {city.name}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats — horizontal band with dividers on desktop */}
      <div
        className="border-t border-white/[0.06] px-[var(--gutter-x)]"
        style={{ paddingTop: "clamp(3.5rem, 7vh, 5rem)", paddingBottom: "clamp(3.5rem, 7vh, 5rem)" }}
      >
        <motion.div
          className="mx-auto grid max-w-4xl grid-cols-1 divide-y divide-white/[0.06] md:max-w-5xl md:grid-cols-3 md:divide-x md:divide-y-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={staggerContainer}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center px-4 py-10 text-center first:pt-0 last:pb-0 md:py-8 md:first:pl-0 md:last:pr-0"
              variants={fadeInUp}
            >
              <p
                className="font-[family-name:var(--font-display)] text-4xl tabular-nums sm:text-5xl"
                style={{ color: brand.colors.offWhite }}
              >
                {stat.value}
              </p>
              <p
                className="mt-2 font-[family-name:var(--font-body)] text-sm font-light tracking-wide"
                style={{ color: brand.colors.mutedBlue }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
