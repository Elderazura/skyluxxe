"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { MaskedText } from "@/components/ui/MaskedText";
import { EASE_OUT_EXPO, fadeInUp, staggerContainer } from "@/lib/animations";
import { brand } from "@/content/brand";
import { lifestyleImages } from "@/content/images";

const cities = [
  { name: "Abu Dhabi", highlight: true, size: "text-[clamp(2.5rem,5vw,4.5rem)]" },
  { name: "London", highlight: false, size: "text-[clamp(1.5rem,3vw,2.75rem)]" },
  { name: "Monaco", highlight: false, size: "text-[clamp(1.25rem,2.5vw,2.25rem)]" },
  { name: "Geneva", highlight: false, size: "text-[clamp(1.25rem,2.5vw,2.25rem)]" },
  { name: "New York", highlight: false, size: "text-[clamp(1.5rem,3vw,2.75rem)]" },
  { name: "Tokyo", highlight: false, size: "text-[clamp(1.1rem,2vw,2rem)]" },
  { name: "Maldives", highlight: false, size: "text-[clamp(1.1rem,2vw,2rem)]" },
  { name: "Paris", highlight: false, size: "text-[clamp(1.25rem,2.5vw,2.25rem)]" },
  { name: "Saint-Tropez", highlight: false, size: "text-[clamp(1rem,1.8vw,1.75rem)]" },
  { name: "Aspen", highlight: false, size: "text-[clamp(1rem,1.8vw,1.75rem)]" },
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
      {/* Full-bleed background image */}
      <div className="relative" style={{ height: "clamp(50vh, 65vh, 75vh)" }}>
        <Image
          src={lifestyleImages.jetStairsTarmac}
          alt="Boarding a private jet from a luxury car on the tarmac"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #0D1B2A 0%, rgba(13,27,42,0.7) 40%, rgba(13,27,42,0.3) 70%, rgba(13,27,42,0.15) 100%)",
          }}
        />

        {/* Typographic city cloud overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-[var(--gutter-x)]">
          <MaskedText as="h2" className="inline-block" id="global-reach-heading">
            <span
              className="block font-[family-name:var(--font-display)] text-3xl tracking-tight text-white sm:text-4xl md:text-5xl"
            >
              Global Reach
            </span>
          </MaskedText>

          <motion.div
            className="mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-8 md:gap-x-12 md:gap-y-4"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.06,
                  delayChildren: 0.3,
                },
              },
            }}
          >
            {cities.map((city) => (
              <motion.span
                key={city.name}
                className={`font-[family-name:var(--font-display)] leading-none tracking-tight ${city.size} ${
                  city.highlight ? "text-[color:var(--color-rose-gold)]" : "text-white/60"
                }`}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: city.highlight ? 1 : 0.6,
                    y: 0,
                    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
                  },
                }}
              >
                {city.name}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Stats row */}
      <div className="px-[var(--gutter-x)]" style={{ paddingTop: "clamp(4rem, 8vh, 6rem)", paddingBottom: "clamp(4rem, 8vh, 6rem)" }}>
        <motion.div
          className="mx-auto grid max-w-3xl grid-cols-1 gap-12 md:grid-cols-3 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={staggerContainer}
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} className="text-center" variants={fadeInUp}>
              <p
                className="font-[family-name:var(--font-display)] text-3xl tabular-nums sm:text-4xl md:text-5xl"
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
