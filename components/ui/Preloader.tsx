"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { brand } from "@/content/brand";
import { logos } from "@/content/images";

const SESSION_KEY = "skyluxxe-visited";

/** Long enough not to read as a flicker if the page is already warm. */
const MIN_HOLD_MS = 500;
/** Hard ceiling, so a slow asset can never hold the site hostage. */
const MAX_HOLD_MS = 1600;
const FADE_MS = 500;

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

    const startedAt = Date.now();
    let fadeTimer: ReturnType<typeof setTimeout> | undefined;
    let doneTimer: ReturnType<typeof setTimeout> | undefined;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;

      // Honour the floor even when the page was ready immediately.
      const remaining = Math.max(0, MIN_HOLD_MS - (Date.now() - startedAt));

      fadeTimer = setTimeout(() => {
        setPhase("fading");
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          /* ignore */
        }

        doneTimer = setTimeout(() => {
          setPhase("done");
          document.body.style.overflow = "";
        }, FADE_MS);
      }, remaining);
    };

    /*
     * This used to hold for a flat 3.2s plus a 0.9s fade — 4.1 seconds of
     * covered screen on every first visit, whether the page had taken 300ms or
     * 8s to load. Now it tracks actual readiness and simply caps the wait.
     */
    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    const cap = setTimeout(finish, MAX_HOLD_MS);

    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(cap);
      if (fadeTimer) clearTimeout(fadeTimer);
      if (doneTimer) clearTimeout(doneTimer);
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
        transition={{ duration: fading ? FADE_MS / 1000 : 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="relative h-[min(60vw,200px)] w-[min(60vw,200px)] md:h-[240px] md:w-[240px]"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{
            opacity: fading ? 0 : 1,
            scale: fading ? 1.06 : 1,
          }}
          transition={{
            duration: fading ? 0.45 : 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/*
            Deliberately the flat monogram, not the 3D scene. Rendering the WebGL
            version here meant a first-time visitor downloaded the three.js
            bundle and a 2.8MB GLB *before* the site was allowed to appear — the
            intro was paying for itself with the very delay it was covering up.
            The interactive 3D monogram still lives in the MonogramScroll
            section, where it is the point rather than a curtain.
          */}
          <Image
            src={logos.monogramRoseGold}
            alt=""
            fill
            priority
            className="object-contain"
            sizes="240px"
          />
        </motion.div>

        <motion.p
          className="mt-6 font-[family-name:var(--font-serif)] text-sm italic tracking-wide md:text-base"
          style={{ color: brand.colors.mutedBlue }}
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: fading ? 0 : 0.6,
            y: fading ? -4 : 0,
          }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            delay: fading ? 0 : 0.25,
          }}
        >
          The Art of Invisible Service
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
