"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroller classes for a phone-width horizontal rail: cards snap into place,
 * the rail bleeds to the screen edges so the next card peeks in, and the
 * scrollbar is hidden (RailProgress shows position instead). Everything is
 * scoped below `md`, so the same element keeps its desktop layout.
 */
export const RAIL_SCROLLER =
  "max-md:-mx-[var(--gutter-x)] max-md:flex max-md:snap-x max-md:snap-mandatory max-md:gap-4 max-md:overflow-x-auto max-md:overscroll-x-contain max-md:scroll-px-[var(--gutter-x)] max-md:px-[var(--gutter-x)] max-md:pb-1 sk-no-scrollbar";

/** Classes for each card in a rail. */
export const RAIL_ITEM = "max-md:w-[80vw] max-md:max-w-[340px] max-md:shrink-0 max-md:snap-start";

/** Tracks which card of a horizontal rail is in view. */
export function useRailProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [state, setState] = useState({ index: 0, count: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const items = Array.from(el.children) as HTMLElement[];
      if (items.length === 0) return;
      const origin = items[0].offsetLeft;
      let index = 0;
      let best = Infinity;
      items.forEach((item, i) => {
        const distance = Math.abs(item.offsetLeft - origin - el.scrollLeft);
        if (distance < best) {
          best = distance;
          index = i;
        }
      });
      // The last card can never reach the snap line once the rail runs out of
      // scroll, so treat "scrolled to the end" as the last card.
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) index = items.length - 1;
      setState((prev) =>
        prev.index === index && prev.count === items.length
          ? prev
          : { index, count: items.length },
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, ...state };
}

/** "03 / 11" counter with a hairline progress track. Phone widths only. */
export function RailProgress({
  index,
  count,
  tone = "dark",
  className = "",
}: {
  index: number;
  count: number;
  tone?: "dark" | "light";
  className?: string;
}) {
  if (count < 2) return null;
  const pad = (n: number) => String(n).padStart(2, "0");
  const ink = tone === "dark" ? "text-[#8A9AB5]" : "text-[#0D1B2A]/55";
  const track = tone === "dark" ? "bg-white/10" : "bg-[#0D1B2A]/10";

  return (
    <div className={`flex items-center gap-4 md:hidden ${className}`} aria-hidden>
      <span
        className={`font-[family-name:var(--font-body)] text-[11px] tabular-nums tracking-[0.18em] ${ink}`}
      >
        {pad(index + 1)} / {pad(count)}
      </span>
      <span className={`relative h-px flex-1 overflow-hidden ${track}`}>
        <span
          className="absolute inset-y-0 left-0 w-full origin-left bg-[#DFA293] transition-transform duration-300 ease-out"
          style={{ transform: `scaleX(${(index + 1) / count})` }}
        />
      </span>
      <span
        className={`font-[family-name:var(--font-body)] text-[11px] uppercase tracking-[0.18em] ${ink}`}
      >
        Swipe
      </span>
    </div>
  );
}
