"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { MaskedText } from "@/components/ui/MaskedText";
import { brand } from "@/content/brand";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export type ValueItem = {
  title: string;
  body: string;
};

type AboutValuesListProps = {
  values: readonly ValueItem[];
};

export function AboutValuesList({ values }: AboutValuesListProps) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const reduceMotion = useReducedMotion();

  return (
    <motion.ol
      ref={ref}
      className="grid list-none gap-0 md:gap-2"
      variants={staggerContainer}
      initial="hidden"
      animate={reduceMotion || inView ? "visible" : "hidden"}
    >
      {values.map((v, i) => (
        <motion.li
          key={v.title}
          variants={fadeInUp}
          className={[
            "grid gap-6 border-t py-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] md:gap-16 md:py-12",
            i === values.length - 1 ? "border-b" : "",
          ].join(" ")}
          style={{ borderColor: `${brand.colors.gold}33` }}
        >
          <MaskedText>
            <span
              className="font-[family-name:var(--font-display)] text-2xl tracking-tight md:text-[1.85rem]"
              style={{ color: brand.colors.navy }}
            >
              {String(i + 1).padStart(2, "0")}
              <span className="mx-3 inline-block opacity-35" aria-hidden>
                /
              </span>
              {v.title}
            </span>
          </MaskedText>
          <MaskedText delay={0.08}>
            <p
              className="font-[family-name:var(--font-body)] text-base font-light leading-[1.85]"
              style={{ color: brand.colors.deepNavy }}
            >
              {v.body}
            </p>
          </MaskedText>
        </motion.li>
      ))}
    </motion.ol>
  );
}
