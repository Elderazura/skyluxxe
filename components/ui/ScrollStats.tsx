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

/*
 * Starts at the real figure, so server-rendered HTML (and anyone without JS)
 * reads "15+" rather than "0+". The count-up replays from zero only once the
 * stat scrolls into view; until then the cell is still faded out by the
 * section's reveal, so the swap is never seen.
 */
function useCountUp(
  target: number,
  run: boolean,
  durationMs: number,
  decimals = 0,
) {
  const [n, setN] = useState(target);

  useEffect(() => {
    if (!run) return;
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
  }, [run, target, durationMs, decimals]);

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
      <div className="grid grid-cols-3 gap-3 md:gap-8">
        {items.map((item) => (
          <motion.div key={item.id} variants={fadeInUp}>
            <StatCell item={item} staticValue={reduceMotion === true} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function StatCell({
  item,
  staticValue,
}: {
  item: ScrollStatItem;
  /** Reduced motion: show the figure, skip the count-up. */
  staticValue: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const duration = item.durationMs ?? 1800;
  const decimals = item.decimals ?? 0;
  const displayed = useCountUp(item.value, seen && !staticValue, duration, decimals);

  useEffect(() => {
    if (staticValue) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-8% 0px", threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [staticValue]);

  return (
    <div ref={ref} className="text-center">
      <p
        className="font-[family-name:var(--font-display)] text-[1.75rem] tabular-nums md:text-5xl"
        style={{ color: brand.colors.offWhite }}
      >
        {displayed}
        {item.suffix ?? ""}
      </p>
      <p
        className="mt-2 font-[family-name:var(--font-body)] text-[11px] font-light leading-snug tracking-wide md:text-sm"
        style={{ color: brand.colors.mutedBlue }}
      >
        {item.label}
      </p>
    </div>
  );
}
