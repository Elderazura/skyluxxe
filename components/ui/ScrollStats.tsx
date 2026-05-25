"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { brand } from "@/content/brand";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export type ScrollStatItem = {
  id: string;
  /** Numeric value to count toward */
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
  durationMs?: number;
};

function useCountUp(
  target: number,
  active: boolean,
  durationMs: number,
  decimals = 0,
) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) {
      setN(0);
      return;
    }
    let frame: number;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - (1 - t) ** 3;
      const next = decimals
        ? Math.round(target * eased * 10 ** decimals) / 10 ** decimals
        : Math.round(target * eased);
      setN(next);
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, target, durationMs, decimals]);

  return n;
}

type ScrollStatsProps = {
  items: readonly ScrollStatItem[];
  className?: string;
};

export function ScrollStats({ items, className }: ScrollStatsProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      role="group"
      aria-label="Skyluxxe at a glance"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8%", amount: 0.35 }}
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
        {items.map((item) => (
          <motion.div key={item.id} variants={fadeInUp}>
            <StatCell item={item} forceActive={reduceMotion === true} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function StatCell({
  item,
  forceActive,
}: {
  item: ScrollStatItem;
  forceActive: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(forceActive);
  const duration = item.durationMs ?? 1800;
  const decimals = item.decimals ?? 0;
  const displayed = useCountUp(item.value, active, duration, decimals);

  useEffect(() => {
    if (forceActive) {
      setActive(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-8% 0px", threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [forceActive]);

  return (
    <div ref={ref} className="text-center">
      <p
        className="font-[family-name:var(--font-display)] text-4xl tabular-nums md:text-5xl"
        style={{ color: brand.colors.offWhite }}
      >
        {displayed}
        {item.suffix ?? ""}
      </p>
      <p
        className="mt-2 font-[family-name:var(--font-body)] text-sm font-light tracking-wide"
        style={{ color: brand.colors.mutedBlue }}
      >
        {item.label}
      </p>
    </div>
  );
}
