"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";

import {
  DURATION_MEDIUM,
  DURATION_SLOW,
  EASE_IN_OUT_CUBIC,
  EASE_OUT_EXPO,
  fadeIn,
  fadeInUp,
  lineDrawLeft,
  maskReveal,
} from "@/lib/animations";
import { brand } from "@/content/brand";
import { brandImages, videos } from "@/content/images";

const WORDMARK = "SKYLUXXE";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = prefersReducedMotion === true;
  const [videoFailed, setVideoFailed] = useState(false);
  const showPosterOnly = reduced || videoFailed;

  const eyebrowVariants = useMemo((): Variants => ({
    hidden: fadeIn.hidden,
    visible: {
      opacity: 1,
      transition: { duration: reduced ? 0 : DURATION_MEDIUM, ease: EASE_OUT_EXPO, delay: reduced ? 0 : 0.2 },
    },
  }), [reduced]);

  const lineVariants = useMemo((): Variants => ({
    hidden: lineDrawLeft.hidden,
    visible: {
      ...lineDrawLeft.visible,
      transition: { duration: reduced ? 0 : DURATION_SLOW, ease: EASE_IN_OUT_CUBIC, delay: reduced ? 0 : 0.5 },
    },
  }), [reduced]);

  const wordmarkVariants = useMemo((): Variants => {
    if (reduced) return { hidden: { opacity: 1 }, visible: { opacity: 1 } };
    return {
      hidden: maskReveal.hidden,
      visible: {
        ...maskReveal.visible,
        transition: { duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.8 },
      },
    };
  }, [reduced]);

  const taglineVariants = useMemo((): Variants => {
    if (reduced) return { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } };
    return {
      hidden: fadeInUp.hidden,
      visible: { opacity: 1, y: 0, transition: { duration: DURATION_MEDIUM, ease: EASE_OUT_EXPO, delay: 1.6 } },
    };
  }, [reduced]);

  return (
    <section
      className="relative flex min-h-[100svh] min-h-[100vh] flex-col justify-end bg-[#0D1B2A]"
      aria-label="Skyluxxe concierge travel"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        {showPosterOnly ? (
          <Image
            src={brandImages.leatherJournal}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        ) : (
          <video
            className="absolute inset-0 h-full w-full min-h-[100svh] object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={brandImages.leatherJournal}
            aria-hidden
            onError={() => setVideoFailed(true)}
          >
            <source src={videos.openingStatementBg} type="video/mp4" />
          </video>
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #0D1B2A 0%, rgba(13,27,42,0.88) 28%, rgba(13,27,42,0.45) 55%, rgba(13,27,42,0.2) 72%, transparent 100%)",
          }}
          aria-hidden
        />
      </div>

      <div className="relative z-[1] w-full min-w-0 px-[var(--gutter-x)] pb-[clamp(3rem,8vh,6rem)] pt-[60vh]">
        <motion.span
          className="mb-6 block font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.18em] text-white/60"
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={eyebrowVariants}
        >
          Concierge Travel
        </motion.span>

        <motion.span
          role="presentation"
          aria-hidden
          className="mb-8 block h-px w-[100px] max-w-full shrink-0 origin-left"
          style={{
            backgroundImage: `linear-gradient(90deg, ${brand.colors.roseGold}, transparent)`,
          }}
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={lineVariants}
        />

        <motion.div
          className="mb-8 min-w-0 overflow-visible"
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={wordmarkVariants}
        >
          <h1
            className="w-fit max-w-none font-[family-name:var(--font-display)] text-[clamp(2.5rem,11vw,10rem)] font-normal leading-[0.95] tracking-[0.08em] text-white md:tracking-[0.18em]"
            style={{ fontFeatureSettings: '"liga" 1' }}
          >
            {WORDMARK}
          </h1>
        </motion.div>

        <motion.p
          className="max-w-xl font-[family-name:var(--font-serif)] text-xl italic leading-snug text-white/75 md:text-2xl"
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={taglineVariants}
        >
          The Art of Invisible Service.
        </motion.p>
      </div>

      <div
        className="pointer-events-none absolute inset-x-[var(--gutter-x)] bottom-[clamp(1.25rem,4vh,2.75rem)] z-[1] h-px sk-m-hairline-pulse md:opacity-30"
        style={{
          backgroundImage: `linear-gradient(90deg, transparent 0%, ${brand.colors.roseGold} 40%, ${brand.colors.roseGold} 60%, transparent 100%)`,
        }}
        aria-hidden
      />
    </section>
  );
}
