"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { brand } from "@/content/brand";
import { logos } from "@/content/images";

export const PRELOADER_SESSION_KEY = "skyluxxe-visited";

/**
 * Runs before first paint (see app/layout.tsx). Returning visitors get
 * `data-visited` on <html>, and globals.css hides the overlay for them, so it
 * never flashes while React is still hydrating.
 */
export const PRELOADER_BOOT_SCRIPT = `try{if(sessionStorage.getItem(${JSON.stringify(
  PRELOADER_SESSION_KEY,
)}))document.documentElement.setAttribute("data-visited","")}catch(e){document.documentElement.setAttribute("data-visited","")}`;

/** Long enough not to read as a flicker if the page is already warm. */
const MIN_HOLD_MS = 500;
/** Hard ceiling, so a slow asset can never hold the site hostage. */
const MAX_HOLD_MS = 1600;
const FADE_MS = 500;

/*
 * Whether this tab had already seen the intro when the page loaded. Read once
 * and cached: the key is written during the fade, and re-reading it then would
 * cut the fade short.
 */
let visitedAtLoad: boolean | null = null;
function getVisitedAtLoad(): boolean {
  if (visitedAtLoad === null) {
    try {
      visitedAtLoad = sessionStorage.getItem(PRELOADER_SESSION_KEY) !== null;
    } catch {
      visitedAtLoad = true;
    }
  }
  return visitedAtLoad;
}
const subscribeNever = () => () => {};

export function Preloader() {
  const visited = useSyncExternalStore(subscribeNever, getVisitedAtLoad, () => false);
  const [phase, setPhase] = useState<"showing" | "fading" | "done">("showing");

  useEffect(() => {
    if (visited) return;

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
          sessionStorage.setItem(PRELOADER_SESSION_KEY, "1");
        } catch {
          /* ignore */
        }

        doneTimer = setTimeout(() => {
          setPhase("done");
          document.body.style.overflow = "";
        }, FADE_MS);
      }, remaining);
    };

    // Track actual readiness and simply cap the wait.
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
  }, [visited]);

  if (visited || phase === "done") return null;

  const fading = phase === "fading";

  /*
   * Rendered on the server too, so a first-time visitor sees the intro from the
   * first paint instead of the page appearing and then being covered once
   * React hydrates. `sk-preloader` is hidden by CSS for returning visitors and
   * by a <noscript> rule when JS is off (it could never be dismissed there).
   */
  return (
    <motion.div
      className="sk-preloader fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ backgroundColor: brand.colors.navy }}
      aria-hidden
      initial={false}
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: fading ? FADE_MS / 1000 : 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="relative h-[min(60vw,200px)] w-[min(60vw,200px)] md:h-[240px] md:w-[240px]"
        initial={false}
        animate={{
          opacity: fading ? 0 : 1,
          scale: fading ? 1.06 : 1,
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/*
          Deliberately the flat monogram, not the 3D scene: the WebGL version
          made first-time visitors download three.js and a 2.8MB model before
          the site was allowed to appear.
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
        initial={false}
        animate={{
          opacity: fading ? 0 : 0.6,
          y: fading ? -4 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        The Art of Invisible Service
      </motion.p>
    </motion.div>
  );
}
