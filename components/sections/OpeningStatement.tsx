"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { brand } from "@/content/brand";

const MonogramScene = dynamic(
  () => import("@/components/ui/MonogramScene").then((mod) => ({ default: mod.MonogramScene })),
  { ssr: false },
);

export function OpeningStatement() {
  return (
    <section
      className="relative overflow-hidden bg-rose-gold px-[var(--gutter-x)] py-[clamp(8rem,15vh,15rem)]"
      aria-labelledby="opening-statement-heading"
    >
      {/* Subtle depth on solid rose gold */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 40%, transparent 0%, rgba(13,27,42,0.06) 100%)",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center"
        aria-hidden="true"
      >
        <MonogramScene
          className="h-[min(80vw,350px)] w-[min(80vw,350px)] md:h-[500px] md:w-[500px]"
          autoRotate
          rotationSpeed={0.12}
          scale={2}
          opacity={0.08}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-stretch text-center">
        <div className="relative px-2 md:px-0">
          <div
            className="pointer-events-none absolute -left-0.5 top-1/2 block h-20 w-px -translate-y-1/2 md:hidden"
            style={{ backgroundColor: brand.colors.navy, opacity: 0.25 }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-0.5 top-1/2 block h-20 w-px -translate-y-1/2 md:hidden"
            style={{ backgroundColor: brand.colors.navy, opacity: 0.25 }}
            aria-hidden
          />
          <motion.p
            id="opening-statement-heading"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%", amount: 0.3 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-serif)] text-[clamp(1.75rem,4.5vw,3.5rem)] font-light italic leading-[1.3] text-midnight-aviation-navy [text-shadow:0_1px_0_rgba(255,255,255,0.15)]"
          >
            We do not arrange travel. We define how it is experienced.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
