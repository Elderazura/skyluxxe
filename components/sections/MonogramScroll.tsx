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

  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.9]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ backgroundColor: brand.colors.deepNavy }}
    >
      <div className="flex flex-col items-center justify-center px-[var(--gutter-x)] py-[clamp(6rem,14vh,12rem)]">
        <motion.div
          className="relative h-[60vw] w-[60vw] max-h-[520px] max-w-[520px] md:h-[50vh] md:w-[50vh] md:max-h-[600px] md:max-w-[600px]"
          style={{ opacity, scale }}
        >
          <MonogramScene
            className="h-full w-full"
            interactive
            scale={2}
          />
        </motion.div>

        <motion.p
          className="mt-6 select-none font-[family-name:var(--font-serif)] text-sm italic tracking-wide text-[#8A9AB5]/50 md:text-base"
          style={{ opacity }}
        >
          Drag to rotate
        </motion.p>

        {/* Rose-gold glow behind the monogram */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[min(90vw,450px)] w-[min(90vw,450px)] rounded-full blur-[120px] md:h-[550px] md:w-[550px]"
          style={{
            background: `radial-gradient(circle, ${brand.colors.roseGold}15, transparent 70%)`,
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
