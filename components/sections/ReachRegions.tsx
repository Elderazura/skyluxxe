"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { RAIL_ITEM, RAIL_SCROLLER, RailProgress, useRailProgress } from "@/components/ui/SnapRail";

import { brand } from "@/content/brand";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export type ReachRegion = {
  id: string;
  name: string;
  image: string;
  primaryHubs: readonly string[];
  extendedNetwork: readonly string[];
};

type ReachRegionsProps = {
  regions: readonly ReachRegion[];
};

export function ReachRegions({ regions }: ReachRegionsProps) {
  const { ref: railRef, index: railIndex, count: railCount } = useRailProgress<HTMLDivElement>();
  const ref = railRef;
  const inView = useInView(ref, { once: true, margin: "-6%" });
  const reduceMotion = useReducedMotion();

  return (
    <>
    <motion.div
      ref={ref}
      // Phones: one card per region in a swipeable rail.
      className={`${RAIL_SCROLLER} md:block`}
      variants={staggerContainer}
      initial="hidden"
      animate={reduceMotion || inView ? "visible" : "hidden"}
    >
      {regions.map((region, index) => {
        const imageOnRight = index % 2 === 0;
        const isIvoryBand = index === 2;

        return (
          <motion.section
            key={region.id}
            variants={fadeInUp}
            aria-labelledby={`region-${region.id}`}
            className={`${RAIL_ITEM} max-md:overflow-hidden max-md:rounded-sm ${
              isIvoryBand
                ? "bg-[#FAF7F4] md:-mx-[var(--gutter-x)] md:px-[var(--gutter-x)]"
                : "max-md:bg-[#162235]"
            }`}
          >
            <div
              className={`grid grid-cols-1 items-center md:grid-cols-2 md:gap-0 ${
                index > 0 && !isIvoryBand ? "md:border-t md:border-white/[0.06]" : ""
              }`}
            >
              <div className={`relative ${imageOnRight ? "md:order-last" : "md:order-first"}`}>
                <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[3/2]">
                  <Image
                    src={region.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 767px) 80vw, 50vw"
                  />
                </div>
              </div>

              <div className={`px-5 py-6 md:px-0 md:py-20 ${imageOnRight ? "md:pr-16 lg:pr-24" : "md:pl-16 lg:pl-24"}`}>
                <h3
                  id={`region-${region.id}`}
                  className="font-[family-name:var(--font-display)] text-2xl tracking-tight md:text-[clamp(2rem,4vw,3rem)]"
                  style={{ color: isIvoryBand ? brand.colors.navy : brand.colors.offWhite }}
                >
                  {region.name}
                </h3>

                <div className="mt-4 space-y-4 md:mt-8 md:space-y-6">
                  <div>
                    <p
                      className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.16em]"
                      style={{
                        color: isIvoryBand ? brand.colors.mutedBlue : brand.colors.roseGold,
                      }}
                    >
                      Primary hubs
                    </p>
                    <p
                      className="mt-3 font-[family-name:var(--font-serif)] text-base leading-relaxed md:text-lg"
                      style={{
                        color: isIvoryBand ? brand.colors.navy : brand.colors.offWhite,
                        opacity: 0.85,
                      }}
                    >
                      {region.primaryHubs.join(" · ")}
                    </p>
                  </div>
                  <div>
                    <p
                      className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.16em]"
                      style={{
                        color: isIvoryBand ? brand.colors.mutedBlue : brand.colors.mutedBlue,
                      }}
                    >
                      Extended network
                    </p>
                    <p
                      className="mt-3 font-[family-name:var(--font-body)] text-sm font-light leading-relaxed md:text-base"
                      style={{
                        color: isIvoryBand ? brand.colors.deepNavy : brand.colors.mutedBlue,
                      }}
                    >
                      {region.extendedNetwork.join(" · ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        );
      })}
    </motion.div>
    <RailProgress index={railIndex} count={railCount} className="mt-6" />
    </>
  );
}
