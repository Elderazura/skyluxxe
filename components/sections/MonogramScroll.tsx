"use client";

import { useRef, useState } from "react";
import { useScroll, useTransform, motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { brand } from "@/content/brand";

const MonogramScene = dynamic(
  () => import("@/components/ui/MonogramScene").then((mod) => ({ default: mod.MonogramScene })),
  { ssr: false },
);

export function MonogramScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rotationRaw = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.9]);

  const [rotation, setRotation] = useState(0);

  rotationRaw.on("change", (v) => setRotation(v));

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: "120vh", backgroundColor: brand.colors.deepNavy }}
      aria-hidden="true"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center">
        <motion.div
          className="relative h-[60vw] w-[60vw] max-h-[520px] max-w-[520px] md:h-[50vh] md:w-[50vh] md:max-h-[600px] md:max-w-[600px]"
          style={{ opacity, scale }}
        >
          <MonogramScene
            className="h-full w-full"
            autoRotate={!!prefersReducedMotion}
            rotationSpeed={0.2}
            rotationY={prefersReducedMotion ? undefined : rotation}
            scale={2}
          />
        </motion.div>

        {/* Rose-gold glow behind the monogram */}
        <div
          className="pointer-events-none absolute h-[min(90vw,450px)] w-[min(90vw,450px)] rounded-full blur-[120px] md:h-[550px] md:w-[550px]"
          style={{
            background: `radial-gradient(circle, ${brand.colors.roseGold}15, transparent 70%)`,
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
