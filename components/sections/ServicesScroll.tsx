"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { brand } from "@/content/brand";
import { serviceImages } from "@/content/images";
import { services } from "@/content/services";
import { DURATION_FAST, EASE_OUT_EXPO, fadeInUp, staggerContainerLoose } from "@/lib/animations";
import { registerGSAP } from "@/lib/gsap";
import { RAIL_ITEM, RAIL_SCROLLER, RailProgress, useRailProgress } from "@/components/ui/SnapRail";

/*
 * Stacked cards instead of the pinned horizontal track: on phones, and for
 * anyone who has asked for reduced motion (a scroll-jacked track is exactly
 * the kind of motion that setting is for).
 */
const STACKED_QUERY = "(max-width: 767px), (prefers-reduced-motion: reduce)";

/**
 * Vertical scroll spent per pixel of horizontal travel.
 *
 * At 1:1 the eleven full-width panels demanded ~12,800px of scrolling — 55% of
 * the entire homepage — to get past one section. 0.4 keeps the same horizontal
 * choreography for well under half the wheel travel.
 */
const SCROLL_RATIO = 0.4;

/**
 * Declared at module scope on purpose. Defined inside `ServicesScroll` it would
 * be a fresh component type on every render, so React would unmount and remount
 * all eleven panels — and their images — whenever the parent re-rendered.
 */
function DesktopPanel({ service }: { service: (typeof services)[number] }) {
  const imgSrc = serviceImages[service.slug];
  return (
    <div
      className="relative flex h-screen w-screen max-w-none shrink-0 overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      {/* Left: text on navy */}
      <div
        className="relative z-10 flex w-1/2 flex-col justify-center px-12 lg:px-20 xl:px-24"
        style={{ backgroundColor: brand.colors.navy }}
      >
        <span
          className="pointer-events-none absolute left-[8%] top-1/2 -translate-y-1/2 select-none font-[family-name:var(--font-display)] text-[15vw] leading-none"
          style={{ color: brand.colors.offWhite, opacity: 0.06 }}
          aria-hidden
        >
          {service.romanNumeral}
        </span>

        <div className="relative z-10 max-w-lg">
          <span className="mb-4 block font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.22em] text-[color:var(--color-rose-gold)]">
            {service.romanNumeral}
          </span>
          <h2
            className="mb-6 font-[family-name:var(--font-display)] font-normal tracking-tight"
            style={{
              color: brand.colors.offWhite,
              fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
            }}
          >
            {service.name}
          </h2>
          <p
            className="mb-10 max-w-[380px] font-[family-name:var(--font-body)] text-base font-light leading-relaxed"
            style={{ color: brand.colors.mutedBlue }}
          >
            {service.shortDescription}
          </p>
          <Link
            href={`/services/${service.slug}`}
            aria-label={`Discover ${service.name}`}
            className="group inline-flex min-h-[44px] items-center font-[family-name:var(--font-body)] text-sm font-medium tracking-wide"
            style={{ color: brand.colors.offWhite }}
          >
            <span className="relative pb-1">
              Discover
              <span
                className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 group-hover:scale-x-100"
                style={{
                  backgroundColor: brand.colors.roseGold,
                  transition: `transform ${DURATION_FAST}s cubic-bezier(${EASE_OUT_EXPO.join(",")})`,
                }}
              />
            </span>
          </Link>
        </div>
      </div>

      {/* Right: full-visibility image */}
      <div className="relative w-1/2">
        {imgSrc && (
          <Image
            src={imgSrc}
            alt=""
            fill
            className="object-cover"
            sizes="50vw"
          />
        )}
        {/* Soft left-edge blend into navy */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to right, ${brand.colors.navy} 0%, rgba(13,27,42,0.4) 15%, transparent 40%)`,
          }}
        />
      </div>
    </div>
  );
}

/**
 * The non-pinned layout. Phones get a swipeable rail of portrait cards with a
 * position indicator — eleven services in one screen instead of eleven stacked
 * ones. Wide screens only land here under reduced motion, and get a grid.
 */
function StackedServices() {
  const { ref: railRef, index: railIndex, count: railCount } = useRailProgress<HTMLUListElement>();

  return (
    <motion.div
      className="px-[var(--gutter-x)] py-20 md:px-0 md:py-0"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: "some" }}
      variants={staggerContainerLoose}
    >
      <motion.div variants={fadeInUp} className="mb-8 flex items-end justify-between gap-6 md:hidden">
        <div>
          <p className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em] text-[#8A9AB5]">
            Our services
          </p>
          <h2
            className="mt-3 font-[family-name:var(--font-display)] text-[1.9rem] leading-[1.1] tracking-tight"
            style={{ color: brand.colors.offWhite }}
          >
            Eleven disciplines
          </h2>
        </div>
        <Link
          href="/services"
          className="inline-flex min-h-[44px] shrink-0 items-center font-[family-name:var(--font-serif)] text-sm italic text-[#DFA293]"
        >
          View all <span className="ml-1" aria-hidden>&rarr;</span>
        </Link>
      </motion.div>

      <motion.ul
        ref={railRef}
        variants={fadeInUp}
        className={`${RAIL_SCROLLER} list-none md:grid md:grid-cols-2 xl:grid-cols-3`}
      >
        {services.map((service) => {
          const imgSrc = serviceImages[service.slug];
          return (
            <li key={service.id} className={RAIL_ITEM}>
              <Link
                href={`/services/${service.slug}`}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden md:aspect-[4/3]"
                style={{ backgroundColor: brand.colors.deepNavy }}
              >
                {imgSrc && (
                  <Image
                    src={imgSrc}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 767px) 80vw, (max-width: 1279px) 50vw, 34vw"
                  />
                )}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(13,27,42,0.96) 0%, rgba(13,27,42,0.78) 34%, rgba(13,27,42,0.15) 62%, transparent 100%)",
                  }}
                  aria-hidden
                />
                <span className="absolute top-5 left-5 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.22em] text-white/80">
                  {service.romanNumeral}
                </span>
                <div className="relative z-10 p-5 md:p-8">
                  <h3
                    className="font-[family-name:var(--font-display)] text-[1.6rem] leading-[1.1] tracking-tight md:text-3xl"
                    style={{ color: brand.colors.offWhite }}
                  >
                    {service.name}
                  </h3>
                  <p className="mt-3 line-clamp-3 font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-white/75">
                    {service.shortDescription}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 font-[family-name:var(--font-serif)] text-sm italic text-[#DFA293]">
                    Discover <span aria-hidden>&rarr;</span>
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </motion.ul>

      <RailProgress index={railIndex} count={railCount} className="mt-6" />
    </motion.div>
  );
}

export function ServicesScroll() {
  const outerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(STACKED_QUERY);
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let cancelled = false;
    let ctx: { revert: () => void } | null = null;

    registerGSAP().then(({ gsap }) => {
      if (cancelled || !outerRef.current || !innerRef.current || !progressRef.current) {
        return;
      }

      const outer = outerRef.current;
      const inner = innerRef.current;
      const progressEl = progressRef.current;

      const localCtx = gsap.context(() => {
        const getTravel = () =>
          Math.max(0, inner.scrollWidth - window.innerWidth);

        gsap.set(progressEl, {
          scaleX: 0,
          transformOrigin: "left center",
          force3D: true,
        });

        const timeline = gsap
          .timeline({
            scrollTrigger: {
              trigger: outer,
              start: "top top",
              end: () => `+=${Math.round(getTravel() * SCROLL_RATIO)}`,
              pin: true,
              // Was 1s. Lenis already smooths the incoming scroll, so a long
              // scrub stacked a second lag on top of it and made the panels
              // feel like they were dragging behind the wheel.
              scrub: 0.4,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          })
          .to(inner, {
            x: () => -getTravel(),
            ease: "none",
            force3D: true,
          })
          .to(
            progressEl,
            {
              scaleX: 1,
              ease: "none",
              force3D: true,
            },
            "<",
          );

        /*
         * Keyboard users tab to "Discover" links in panels that are off to the
         * right. The browser's answer is to scroll the clipped section
         * sideways, which leaves the track out of step with the timeline.
         * Undo that and move the page to where the focused panel is on screen.
         */
        const onFocusIn = (event: FocusEvent) => {
          outer.scrollLeft = 0;
          const st = timeline.scrollTrigger;
          const panels = Array.from(inner.children);
          const index = panels.findIndex((panel) => panel.contains(event.target as Node));
          if (!st || index < 0 || panels.length < 2) return;
          const target = st.start + ((st.end - st.start) * index) / (panels.length - 1);
          window.scrollTo({ top: target, behavior: "instant" });
        };
        outer.addEventListener("focusin", onFocusIn);
        return () => outer.removeEventListener("focusin", onFocusIn);
      }, outer);

      ctx = localCtx;
      if (cancelled) {
        localCtx.revert();
      }
    });

    return () => {
      cancelled = true;
      ctx?.revert();
      ctx = null;
    };
  }, [isMobile]);

  return (
    <section
      ref={outerRef}
      className={`relative w-full ${isMobile ? "" : "h-screen overflow-hidden"}`}
      style={{ backgroundColor: brand.colors.navy }}
      aria-label="Services"
    >
      {isMobile ? (
        <StackedServices />
      ) : (
        <>
          {/*
            No `will-change: transform` here. This track is ~11 viewports wide
            (14,080 x 720 at a 1280px viewport), and will-change pins a layer
            that size for the whole life of the page — enough to stall machines
            on integrated graphics. GSAP's force3D still promotes it while the
            timeline is actually running, which is when it is needed.
          */}
          <div
            ref={innerRef}
            className="flex h-screen w-max flex-nowrap"
            style={{ backfaceVisibility: "hidden" }}
          >
            {services.map((service) => (
              <DesktopPanel key={service.id} service={service} />
            ))}
          </div>

          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 px-8 pb-8 md:px-16"
            aria-hidden
          >
            <div
              className="h-px w-full overflow-hidden rounded-full"
              style={{ backgroundColor: `${brand.colors.mutedBlue}33` }}
            >
              <div
                ref={progressRef}
                className="h-full w-full origin-left scale-x-0 will-change-transform"
                style={{
                  backgroundColor: brand.colors.roseGold,
                  transformOrigin: "left center",
                }}
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
}
