"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { brand } from "@/content/brand";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export type ReachRegion = {
  id: string;
  name: string;
  cities: readonly string[];
  image: string;
};

type ReachRegionsProps = {
  regions: readonly ReachRegion[];
};

export function ReachRegions({ regions }: ReachRegionsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6%" });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className="space-y-20 md:space-y-0"
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
            className={`${isIvoryBand ? "bg-[#FAF7F4] -mx-[var(--gutter-x)] px-[var(--gutter-x)]" : ""}`}
          >
            <div
              className={`grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-0 ${
                index > 0 && !isIvoryBand ? "border-t border-white/[0.06]" : ""
              }`}
            >
              {/* Image */}
              <div className={`relative ${imageOnRight ? "md:order-last" : "md:order-first"}`}>
                <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[3/2]">
                  <Image
                    src={region.image}
                    alt={`${region.name} destination`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 767px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Text */}
              <div className={`py-12 md:py-20 ${imageOnRight ? "md:pr-16 lg:pr-24" : "md:pl-16 lg:pl-24"}`}>
                <h3
                  id={`region-${region.id}`}
                  className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] tracking-tight"
                  style={{ color: isIvoryBand ? brand.colors.navy : brand.colors.offWhite }}
                >
                  {region.name}
                </h3>
                <p
                  className="mt-6 font-[family-name:var(--font-serif)] text-base leading-relaxed md:text-lg"
                  style={{ color: isIvoryBand ? brand.colors.navy : brand.colors.offWhite, opacity: 0.7 }}
                >
                  {region.cities.join(" · ")}
                </p>
              </div>
            </div>
          </motion.section>
        );
      })}
    </motion.div>
  );
}
