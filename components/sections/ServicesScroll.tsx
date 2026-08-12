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

const MOBILE_MAX = 767;

/**
 * Vertical scroll spent per pixel of horizontal travel.
 *
 * At 1:1 the eleven full-width panels demanded ~12,800px of scrolling — 55% of
 * the entire homepage — to get past one section. 0.55 keeps the same horizontal
 * choreography but asks roughly half the wheel travel of the reader.
 */
const SCROLL_RATIO = 0.55;

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
            alt={service.name}
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

export function ServicesScroll() {
  const outerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX}px)`);
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

        gsap
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
        <motion.div
          className="flex flex-col"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8%", amount: 0.08 }}
          variants={staggerContainerLoose}
        >
          {services.map((service) => {
            const imgSrc = serviceImages[service.slug];
            return (
              <motion.div
                key={service.id}
                variants={fadeInUp}
                className="relative overflow-hidden"
                style={{ backgroundColor: brand.colors.navy }}
              >
                {imgSrc && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={imgSrc}
                      alt={service.name}
                      fill
                      className="object-cover sk-m-ken-burns"
                      sizes="100vw"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(13,27,42,1) 0%, rgba(13,27,42,0.3) 60%, transparent 100%)",
                      }}
                    />
                  </div>
                )}
                <div className="relative z-10 px-[var(--gutter-x)] pb-16 pt-6">
                  <span className="mb-3 block font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.22em] text-[color:var(--color-rose-gold)]">
                    {service.romanNumeral}
                  </span>
                  <h2
                    className="mb-4 font-[family-name:var(--font-display)] font-normal tracking-tight"
                    style={{
                      color: brand.colors.offWhite,
                      fontSize: "clamp(1.75rem, 6vw, 2.5rem)",
                    }}
                  >
                    {service.name}
                  </h2>
                  <p
                    className="mb-8 max-w-[360px] font-[family-name:var(--font-body)] font-light leading-relaxed"
                    style={{ color: brand.colors.mutedBlue }}
                  >
                    {service.shortDescription}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
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
              </motion.div>
            );
          })}
        </motion.div>
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
