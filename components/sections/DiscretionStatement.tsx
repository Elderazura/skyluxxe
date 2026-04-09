"use client";

import { motion } from "framer-motion";

import { fadeInUp, staggerContainerLoose } from "@/lib/animations";

export function DiscretionStatement() {
  return (
    <motion.section
      className="bg-[#FAF7F4] px-[var(--gutter-x)] py-[clamp(8rem,18vh,15rem)] md:py-[clamp(10rem,20vh,15rem)]"
      aria-labelledby="discretion-statement-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%", amount: 0.25 }}
      variants={staggerContainerLoose}
    >
      <div className="mx-auto flex w-full max-w-[min(100%,52rem)] flex-col items-center text-center">
        <motion.div variants={fadeInUp} className="mb-6 h-px w-12 bg-[#0D1B2A]/15 md:hidden" aria-hidden />
        <motion.p
          id="discretion-statement-heading"
          variants={fadeInUp}
          className="font-[family-name:var(--font-display)] text-[clamp(2rem,6vw,5rem)] font-normal leading-[1.12] text-[#0D1B2A]"
        >
          Discretion is not what we offer. It is what we are.
        </motion.p>
        <motion.div variants={fadeInUp} className="mt-8 h-px w-16 md:hidden" style={{ background: "linear-gradient(90deg, transparent, #DFA29355, transparent)" }} aria-hidden />
      </div>
    </motion.section>
  );
}
