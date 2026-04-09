"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ImageBreakProps {
  src: string;
  alt: string;
  caption?: string;
  height?: string;
}

export function ImageBreak({
  src,
  alt,
  caption,
  height = "65vh",
}: ImageBreakProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height }}
      aria-label={alt}
    >
      <motion.div
        className="absolute inset-0"
        style={{ y: prefersReducedMotion ? 0 : y }}
      >
        <div className="absolute inset-[-8%] h-[116%] w-full">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </motion.div>

      {caption && (
        <div className="absolute right-[var(--gutter-x)] bottom-6 z-10">
          <span className="font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.16em] text-white/50">
            {caption}
          </span>
        </div>
      )}
    </section>
  );
}
