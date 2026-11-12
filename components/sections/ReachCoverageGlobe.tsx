"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { brand } from "@/content/brand";

function ReducedMotionFallback() {
  return (
    <div
      className="flex h-full min-h-[280px] flex-col justify-center rounded-sm border border-white/[0.08] p-8 md:min-h-[360px] md:p-12"
      style={{
        background: `radial-gradient(ellipse 80% 70% at 50% 40%, ${brand.colors.richNavy} 0%, ${brand.colors.navy} 55%, #0a121c 100%)`,
      }}
    >
      <p
        className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em]"
        style={{ color: brand.colors.mutedBlue }}
      >
        Coverage
      </p>
      <p
        className="mt-4 font-[family-name:var(--font-display)] text-2xl tracking-tight md:text-3xl"
        style={{ color: brand.colors.offWhite }}
      >
        Abu Dhabi · Dubai · London · Paris · New York · Tokyo · Singapore · Sydney
      </p>
      <p
        className="mt-4 max-w-md font-[family-name:var(--font-body)] text-sm font-light leading-relaxed md:text-base"
        style={{ color: brand.colors.mutedBlue }}
      >
        A single desk coordinates partners across regions — these are key touchpoints; your
        itinerary may extend far beyond.
      </p>
    </div>
  );
}

function StaticGlobeFallback() {
  return (
    <div
      className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-sm border border-white/[0.08] p-6 md:min-h-[360px] md:p-10"
      style={{
        background: `radial-gradient(ellipse 80% 70% at 50% 40%, ${brand.colors.richNavy} 0%, ${brand.colors.navy} 55%, #0a121c 100%)`,
      }}
      role="img"
      aria-label="Illustrative world map with Abu Dhabi as the primary hub and global touchpoints"
    >
      <svg
        viewBox="0 0 400 220"
        className="h-auto w-full max-w-[520px] text-white/25"
        aria-hidden
      >
        <ellipse cx="200" cy="110" rx="185" ry="95" fill="none" stroke="currentColor" strokeWidth="0.75" />
        <ellipse cx="200" cy="110" rx="120" ry="60" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
        <circle cx="248" cy="118" r="5" fill="#DFA293" />
        <circle cx="120" cy="92" r="3" fill="#8A9AB5" />
        <circle cx="95" cy="105" r="3" fill="#8A9AB5" />
        <circle cx="210" cy="88" r="3" fill="#8A9AB5" />
        <circle cx="300" cy="100" r="3" fill="#8A9AB5" />
        <circle cx="320" cy="130" r="3" fill="#8A9AB5" />
        <circle cx="175" cy="145" r="3" fill="#8A9AB5" />
      </svg>
      <p className="mt-6 text-center font-[family-name:var(--font-body)] text-[11px] font-light uppercase tracking-[0.14em] text-white/35">
        Abu Dhabi hub · illustrative coverage
      </p>
    </div>
  );
}

/*
 * three.js, fiber and drei are only fetched when the interactive globe will
 * really be shown. Imported statically, they shipped to every phone and every
 * reduced-motion visitor, who only ever see the text version.
 */
const ReachGlobeCanvas = dynamic(
  () => import("./ReachGlobeCanvas").then((mod) => ({ default: mod.ReachGlobeCanvas })),
  { ssr: false, loading: () => null },
);

type GlobeMode = "text" | "static" | "3d";

const TEXT_QUERY = "(prefers-reduced-motion: reduce), (max-width: 767px)";

function subscribeMode(onChange: () => void) {
  const mq = window.matchMedia(TEXT_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

let webglSupport: boolean | null = null;
function hasWebGL(): boolean {
  if (webglSupport === null) {
    try {
      const canvas = document.createElement("canvas");
      webglSupport = Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}

function getMode(): GlobeMode {
  if (window.matchMedia(TEXT_QUERY).matches) return "text";
  return hasWebGL() ? "3d" : "static";
}

export function ReachCoverageGlobe() {
  // Server and first client render agree on the text version; the globe is an
  // enhancement that replaces it once the device is known to suit it.
  const mode = useSyncExternalStore(subscribeMode, getMode, (): GlobeMode => "text");
  const [onScreen, setOnScreen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  // Keep the globe's render loop off while it is scrolled away.
  useEffect(() => {
    const el = stageRef.current;
    if (mode !== "3d" || !el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: "150px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mode]);

  if (mode === "text") return <ReducedMotionFallback />;
  if (mode === "static") return <StaticGlobeFallback />;

  return (
    <div
      ref={stageRef}
      className="relative h-[min(70vh,520px)] w-full md:h-[min(72vh,580px)]"
    >
      <ReachGlobeCanvas onScreen={onScreen} />
      <p className="pointer-events-none absolute bottom-4 left-1/2 max-w-[90%] -translate-x-1/2 text-center font-[family-name:var(--font-body)] text-[11px] font-light uppercase tracking-[0.14em] text-white/35 md:bottom-6">
        Abu Dhabi hub · global touchpoints · illustrative
      </p>
    </div>
  );
}
