"use client";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";

import { DiamondMarker } from "@/components/ui/DiamondMarker";
import { HairlineRule } from "@/components/ui/HairlineRule";
import { MaskedText } from "@/components/ui/MaskedText";
import { RevealImage } from "@/components/ui/RevealImage";
import { brandImages } from "@/content/images";
import {
  DURATION_SLOW,
  EASE_IN_OUT_CUBIC,
  fadeInUp,
  imageReveal,
  staggerContainer,
} from "@/lib/animations";

const clientTypes = [
  {
    title: "Private Principals",
    body: "Individuals and families whose lifestyles demand discretion, anticipation, and an unwavering standard of care across every journey.",
  },
  {
    title: "Executive Leadership",
    body: "C-suite leaders and board members who travel frequently, expect precision, and require a single trusted point of coordination.",
  },
  {
    title: "Protected Travel",
    body: "Principals with security considerations who need integrated, invisible protection woven seamlessly into their travel experience.",
  },
] as const;

const clienteleStagger: Variants = {
  hidden: staggerContainer.hidden,
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.12,
      ease: EASE_IN_OUT_CUBIC,
    },
  },
};

export function Clientele() {
  return (
    <section
      className="bg-[#FAF7F4] px-[var(--gutter-x)]"
      style={{
        paddingTop: "clamp(8rem, 15vh, 12rem)",
        paddingBottom: "clamp(8rem, 15vh, 12rem)",
      }}
    >
      <div className="mx-auto max-w-[var(--container-max)]">
        <header className="mb-16 md:mb-24">
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <DiamondMarker color="gold" size="sm" className="shrink-0" />
            <MaskedText
              as="div"
              className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.22em] text-[#1A1A1A]"
            >
              Our Clientele
            </MaskedText>
          </div>
          <motion.div
            className="mt-8 max-w-xs overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-12%" }}
            variants={imageReveal}
          >
            <HairlineRule className="opacity-70" />
          </motion.div>
        </header>

        {/* Asymmetric layout: image left, text right */}
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-16 lg:gap-20">
          {/* Left: editorial image — the membership card */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <RevealImage>
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm">
                  <Image
                    src={brandImages.membershipCard}
                    alt="White-gloved hand presenting a Skyluxxe membership card"
                    fill
                    className="object-cover"
                    sizes="(max-width: 767px) 100vw, 40vw"
                  />
                </div>
              </RevealImage>
              <p className="mt-4 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.2em] text-[#1A1A1A]/40">
                By Invitation
              </p>
            </div>
          </div>

          {/* Right: stacked client types */}
          <motion.div
            className="flex flex-col gap-14 md:col-span-7 md:gap-16 lg:gap-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%", amount: 0.2 }}
            variants={clienteleStagger}
          >
            {clientTypes.map((col) => (
              <motion.article
                key={col.title}
                variants={fadeInUp}
                className="flex flex-col gap-4 border-t border-[#1A1A1A]/10 pt-8 md:gap-5 md:pt-10"
                style={{ transitionDuration: `${DURATION_SLOW}s` }}
              >
                <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-[#1A1A1A] md:text-[2.25rem]">
                  {col.title}
                </h2>
                <p className="max-w-lg font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-[#1A1A1A]/80 md:text-[0.9375rem]">
                  {col.body}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
