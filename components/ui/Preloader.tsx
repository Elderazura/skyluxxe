"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { brand } from "@/content/brand";

const MonogramScene = dynamic(
  () => import("./MonogramScene").then((mod) => ({ default: mod.MonogramScene })),
  { ssr: false },
);

const SESSION_KEY = "skyluxxe-visited";
const HOLD_MS = 3200;
const FADE_MS = 900;

export function Preloader() {
  const [phase, setPhase] = useState<"idle" | "showing" | "fading" | "done">("idle");

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        setPhase("done");
        return;
      }
    } catch {
      setPhase("done");
      return;
    }

    setPhase("showing");
    document.body.style.overflow = "hidden";

    const holdTimer = setTimeout(() => {
      setPhase("fading");
      try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}

      setTimeout(() => {
        setPhase("done");
        document.body.style.overflow = "";
      }, FADE_MS);
    }, HOLD_MS);

    return () => {
      clearTimeout(holdTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "idle" || phase === "done") return null;

  const fading = phase === "fading";

  return (
    <AnimatePresence>
      <motion.div
        key="preloader-overlay"
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        style={{ backgroundColor: brand.colors.navy }}
        initial={{ opacity: 1 }}
        animate={{ opacity: fading ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: fading ? 0.85 : 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="relative h-[min(70vw,260px)] w-[min(70vw,260px)] md:h-[320px] md:w-[320px]"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{
            opacity: fading ? 0 : 1,
            scale: fading ? 1.08 : 1,
          }}
          transition={{
            duration: fading ? 0.7 : 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <MonogramScene
            className="h-full w-full"
            autoRotate
            rotationSpeed={0.4}
            scale={1.8}
          />
        </motion.div>

        <motion.p
          className="mt-4 font-[family-name:var(--font-serif)] text-sm italic tracking-wide md:text-base"
          style={{ color: brand.colors.mutedBlue }}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: fading ? 0 : 0.6,
            y: fading ? -4 : 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: fading ? 0 : 0.8,
          }}
        >
          The Art of Invisible Service
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
