"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { brandImages } from "@/content/images";
import { brand } from "@/content/brand";
import { EASE_OUT_EXPO, fadeInUp, imageReveal, staggerContainer } from "@/lib/animations";

const steps = [
  {
    n: "01",
    title: "Listen",
    body: "We begin in conversation. Your rhythms, preferences, and unspoken expectations form the foundation.",
  },
  {
    n: "02",
    title: "Design",
    body: "Every detail is composed with intention. Routes, residences, and moments are shaped around your world.",
  },
  {
    n: "03",
    title: "Orchestrate",
    body: "Logistics dissolve into seamlessness. Partners, schedules, and contingencies align without friction.",
  },
  {
    n: "04",
    title: "Anticipate",
    body: "Before the thought forms, the answer arrives. We stay three steps ahead, always.",
  },
  {
    n: "05",
    title: "Refine",
    body: "Each journey informs the next. Your experience deepens as our understanding grows.",
  },
] as const;

/**
 * Editorial interlude after step 03: a visual “breathing room” between Orchestrate and Anticipate.
 * The lounge image grounds the abstract process in a real, discreet environment — where service
 * becomes atmosphere. It is not decorative filler; it marks the shift from execution to intuition.
 */
function ExperienceInterlude() {
  const blockRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["6%", "-6%"]);

  return (
    <motion.div
      ref={blockRef}
      className="py-10 md:py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%", amount: 0.15 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.12, delayChildren: 0.05 },
        },
      }}
    >
      <motion.div
        variants={fadeInUp}
        className="mx-auto mb-8 max-w-2xl md:mb-10"
      >
        <p className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em]" style={{ color: brand.colors.roseGold }}>
          Between orchestration and anticipation
        </p>
        <p className="mt-4 font-[family-name:var(--font-serif)] text-lg italic leading-relaxed text-[#F5F0EB]/90 md:text-xl">
          This is the human layer — private lounges, unhurried arrivals, the unspoken choreography of
          discretion. Logistics end here; presence begins.
        </p>
        <motion.div
          className="mt-6 h-px max-w-[120px] origin-left"
          style={{ backgroundColor: brand.colors.roseGold, opacity: 0.45 }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.2 }}
        />
      </motion.div>

      <motion.div
        variants={imageReveal}
        className="relative aspect-[16/9] w-full overflow-hidden rounded-sm md:aspect-[21/9]"
      >
        <motion.div className="absolute inset-0 h-[115%] w-full -top-[7.5%]" style={{ y: imageY }}>
          <Image
            src={brandImages.conciergeLounge}
            alt="An intimate concierge lounge — where discreet service takes form"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(22,34,53,0.5) 0%, transparent 35%, transparent 65%, rgba(22,34,53,0.35) 100%)",
          }}
          aria-hidden
        />
      </motion.div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section
      className="overflow-hidden bg-[#162235] px-[var(--gutter-x)] py-[clamp(8rem,15vh,14rem)]"
      aria-label="The experience"
    >
      <motion.div
        className="mx-auto max-w-[var(--container-max)]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-8%", amount: 0.1 }}
        variants={staggerContainer}
      >
        {steps.map((step, index) => (
          <div key={step.n}>
            <motion.div
              variants={fadeInUp}
              className={`grid grid-cols-1 gap-6 py-14 md:grid-cols-12 md:gap-12 md:py-20 ${
                index > 0 ? "border-t border-white/[0.06]" : ""
              }`}
            >
              <div className={`md:col-span-2 ${index % 2 === 1 ? "md:order-last md:text-right" : ""}`}>
                <span
                  className="font-[family-name:var(--font-serif)] text-[clamp(3rem,5vw,4.5rem)] font-light italic leading-none"
                  style={{ color: brand.colors.roseGold, opacity: 0.4 }}
                >
                  {step.n}
                </span>
              </div>

              <div className={`md:col-span-7 ${index % 2 === 1 ? "md:order-first" : ""}`}>
                <h3 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-[#F5F0EB]">
                  {step.title}
                </h3>
                <p className="mt-5 max-w-lg font-[family-name:var(--font-body)] text-base font-light leading-relaxed text-[#F5F0EB]/80">
                  {step.body}
                </p>
              </div>
            </motion.div>

            {index === 2 ? <ExperienceInterlude /> : null}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
