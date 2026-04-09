"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { brand } from "@/content/brand";
import { fadeInUp, staggerContainerLoose } from "@/lib/animations";

type InlineCtaProps = {
  heading: string;
  subtext?: string;
  href: string;
  label: string;
  variant?: "navy" | "ivory";
};

export function InlineCta({
  heading,
  subtext,
  href,
  label,
  variant = "navy",
}: InlineCtaProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  const isIvory = variant === "ivory";

  return (
    <motion.section
      ref={ref}
      className="px-[var(--gutter-x)] text-center"
      style={{
        backgroundColor: isIvory ? brand.colors.ivoryCream : brand.colors.navy,
        paddingTop: "clamp(5rem, 10vh, 8rem)",
        paddingBottom: "clamp(5rem, 10vh, 8rem)",
      }}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerContainerLoose}
    >
      <div className="mx-auto max-w-xl">
        <motion.p
          variants={fadeInUp}
          className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,2.75rem)] tracking-tight"
          style={{ color: isIvory ? brand.colors.navy : brand.colors.offWhite }}
        >
          {heading}
        </motion.p>

        {subtext && (
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-5 max-w-md font-[family-name:var(--font-serif)] text-base italic leading-relaxed md:text-lg"
            style={{ color: isIvory ? brand.colors.navy : brand.colors.mutedBlue, opacity: 0.7 }}
          >
            {subtext}
          </motion.p>
        )}

        <motion.div variants={fadeInUp} className="mt-8 flex justify-center">
          <Link
            href={href}
            className="group relative inline-flex min-h-[44px] items-center justify-center overflow-hidden border bg-transparent px-9 py-3 font-[family-name:var(--font-body)] text-[13px] font-normal uppercase tracking-[0.1em] transition-[color] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] before:absolute before:inset-0 before:z-0 before:origin-left before:scale-x-0 before:transition-transform before:duration-[600ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:content-[''] hover:before:scale-x-100 md:py-3.5"
            style={{
              borderColor: brand.colors.roseGold,
              color: isIvory ? brand.colors.navy : brand.colors.offWhite,
              ["--tw-before-bg" as string]: brand.colors.roseGold,
            }}
          >
            <span className="relative z-10 transition-colors duration-[600ms] group-hover:text-[#0D1B2A]">
              {label}
            </span>
            <span
              className="absolute inset-0 z-0 origin-left scale-x-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              style={{ backgroundColor: brand.colors.roseGold }}
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
