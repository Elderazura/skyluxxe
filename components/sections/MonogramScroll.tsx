"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { brand } from "@/content/brand";
import { logos } from "@/content/images";

const MonogramScene = dynamic(
  () => import("@/components/ui/MonogramScene").then((mod) => ({ default: mod.MonogramScene })),
  { ssr: false },
);

/**
 * WebGL can be unavailable (blocked, lost context, old GPU) and the model can
 * fail to download. Either used to throw out of the canvas and take the whole
 * home page down with it; now the flat monogram stands in.
 */
class SceneBoundary extends Component<
  { fallback: ReactNode; onFail: () => void; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onFail();
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function webglAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function FlatMonogram() {
  return (
    <div className="relative h-full w-full">
      <Image
        src={logos.monogramRoseGold}
        alt="Skyluxxe monogram"
        fill
        className="object-contain p-[18%]"
        sizes="(max-width: 767px) 60vw, 520px"
      />
    </div>
  );
}

export function MonogramScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [sceneMode, setSceneMode] = useState<"pending" | "3d" | "flat">("pending");

  /*
   * This section sits roughly 19,000px down the homepage, but `dynamic()` fires
   * its import the moment the component mounts — pulling the three.js/drei
   * bundle and the 2.8MB monogram GLB during initial hydration for something
   * about twenty-six viewports away. Hold the import until the reader is
   * actually approaching it.
   */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          setSceneMode(webglAvailable() ? "3d" : "flat");
          observer.disconnect();
        }
      },
      { rootMargin: "100% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
          ref={stageRef}
          className="relative z-10 h-[60vw] w-[60vw] max-h-[520px] max-w-[520px] md:h-[50vh] md:w-[50vh] md:max-h-[600px] md:max-w-[600px]"
          style={{ opacity, scale }}
        >
          {nearViewport && sceneMode === "3d" ? (
            <SceneBoundary fallback={<FlatMonogram />} onFail={() => setSceneMode("flat")}>
              <MonogramScene className="h-full w-full" interactive scale={2} />
            </SceneBoundary>
          ) : null}
          {sceneMode === "flat" ? <FlatMonogram /> : null}
        </motion.div>

        {/* Only promise interaction when the 3D model is actually there. */}
        <p
          className="relative z-10 mt-8 min-h-[1.25rem] select-none font-[family-name:var(--font-body)] text-[11px] font-normal uppercase tracking-[0.14em] md:text-xs"
          style={{ color: brand.colors.mutedBlue, opacity: 0.55 }}
        >
          {sceneMode === "3d" ? "Drag or swipe to rotate" : ""}
        </p>

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
