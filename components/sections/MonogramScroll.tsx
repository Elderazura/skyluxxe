"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { brand } from "@/content/brand";

const MonogramScene = dynamic(
  () => import("@/components/ui/MonogramScene").then((mod) => ({ default: mod.MonogramScene })),
  { ssr: false },
);

export function MonogramScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.92, 1, 1, 0.95]);
  const textY = useTransform(scrollYProgress, [0, 0.35], [24, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ backgroundColor: brand.colors.deepNavy }}
      aria-labelledby="monogram-experience-heading"
    >
      <div className="relative flex flex-col items-center justify-center px-[var(--gutter-x)] py-[clamp(6rem,14vh,12rem)]">
        <motion.div
          className="relative z-10 mb-10 max-w-xl text-center md:mb-12 md:max-w-2xl"
          style={{ opacity, y: textY }}
        >
          <p
            className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.22em]"
            style={{ color: brand.colors.roseGold }}
          >
            The mark
          </p>
          <h2
            id="monogram-experience-heading"
            className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.85rem,4.5vw,3rem)] font-normal leading-[1.15] tracking-tight text-[#F5F0EB]"
          >
            Crafted to be turned — not merely seen.
          </h2>
          <p
            className="mx-auto mt-5 max-w-md font-[family-name:var(--font-serif)] text-base italic leading-relaxed md:text-lg"
            style={{ color: brand.colors.mutedBlue }}
          >
            The Skyluxxe monogram in three dimensions. Rotate it; the promise stays the same:
            invisible service, visible care.
          </p>
        </motion.div>

        <motion.div
          className="relative z-10 h-[60vw] w-[60vw] max-h-[520px] max-w-[520px] md:h-[50vh] md:w-[50vh] md:max-h-[600px] md:max-w-[600px]"
          style={{ opacity, scale }}
        >
          <MonogramScene className="h-full w-full" interactive scale={2} />
        </motion.div>

        <motion.p
          className="relative z-10 mt-8 select-none font-[family-name:var(--font-body)] text-[11px] font-normal uppercase tracking-[0.14em] md:text-xs"
          style={{ color: brand.colors.mutedBlue, opacity: 0.55 }}
        >
          Drag or swipe to rotate
        </motion.p>

        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -z-0 -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
        >
          <div
            className="h-[min(90vw,450px)] w-[min(90vw,450px)] rounded-full blur-[120px] sk-m-glow-breathe md:h-[550px] md:w-[550px]"
            style={{
              background: `radial-gradient(circle, ${brand.colors.roseGold}18, transparent 70%)`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
