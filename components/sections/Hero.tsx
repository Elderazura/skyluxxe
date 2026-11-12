"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

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

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MOBILE_QUERY = "(max-width: 767px)";

function subscribeVideoMode(onChange: () => void) {
  const mq = window.matchMedia(MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Which video file to play, or null for none. Always null on the server, so
 * the markup hydrates against the poster image and the video is added after —
 * visitors who asked for reduced motion or data saving never download it.
 */
function getVideoSrc(): string | null {
  if (window.matchMedia(MOTION_QUERY).matches) return null;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
    .connection;
  if (connection?.saveData) return null;
  return window.matchMedia(MOBILE_QUERY).matches
    ? videos.openingStatementBgMobile
    : videos.openingStatementBg;
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const reduced = prefersReducedMotion === true;
  const [videoFailed, setVideoFailed] = useState(false);
  const videoSrc = useSyncExternalStore(subscribeVideoMode, getVideoSrc, () => null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const showVideo = videoSrc !== null && !videoFailed;

  // Stop decoding once the hero has scrolled away; resume when it returns.
  useEffect(() => {
    const video = videoRef.current;
    if (!showVideo || !video) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.play().catch(() => {
          /* autoplay refused — the poster stays visible underneath */
        });
      } else {
        video.pause();
      }
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [showVideo]);

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

  const ctaVariants = useMemo((): Variants => {
    if (reduced) return { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } };
    return {
      hidden: fadeInUp.hidden,
      visible: { opacity: 1, y: 0, transition: { duration: DURATION_MEDIUM, ease: EASE_OUT_EXPO, delay: 2 } },
    };
  }, [reduced]);

  return (
    <section
      className="relative flex min-h-[100svh] flex-col justify-end bg-[#0D1B2A]"
      aria-label="Skyluxxe concierge travel"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={brandImages.heroPoster}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {showVideo ? (
          <video
            ref={videoRef}
            key={videoSrc}
            className="absolute inset-0 h-full w-full min-h-[100svh] object-cover"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
            onError={() => setVideoFailed(true)}
          />
        ) : null}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #0D1B2A 0%, rgba(13,27,42,0.88) 28%, rgba(13,27,42,0.45) 55%, rgba(13,27,42,0.2) 72%, transparent 100%)",
          }}
          aria-hidden
        />
        {/* The navigation sits over whatever the video is showing; the jet
            cabin footage is bright enough at the top that the links lost
            contrast against it. */}
        <div
          className="absolute inset-x-0 top-0 h-40"
          style={{
            background:
              "linear-gradient(to bottom, rgba(13,27,42,0.55) 0%, rgba(13,27,42,0.25) 55%, transparent 100%)",
          }}
          aria-hidden
        />
      </div>

      {/*
        The bottom inset folds in the cookie banner's measured height (see
        components/ui/CookieConsent.tsx). Without it the banner overlapped the
        wordmark and buried the tagline on a first visit at 1280x720.
      */}
      <div
        className="relative z-[1] w-full min-w-0 px-[var(--gutter-x)] pt-[clamp(4rem,18vh,10rem)]"
        style={{
          paddingBottom:
            "calc(clamp(3rem, 8vh, 6rem) + var(--consent-height, 0px))",
        }}
      >
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

        {/* The homepage previously offered no way to act until several
            viewports of scrolling had passed. */}
        <motion.div
          className="mt-8"
          initial={reduced ? false : "hidden"}
          animate="visible"
          variants={ctaVariants}
        >
          <Link
            href="/enquiry"
            className="group inline-flex min-h-[44px] items-center border border-white/30 px-7 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.16em] text-white transition-colors duration-500 hover:border-[#DFA293] hover:bg-[#DFA293] hover:text-[#0D1B2A]"
          >
            Begin an enquiry
            <span
              className="ml-3 transition-transform duration-500 group-hover:translate-x-1"
              aria-hidden
            >
              &rarr;
            </span>
          </Link>
        </motion.div>
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
