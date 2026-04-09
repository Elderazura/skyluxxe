"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { brandImages } from "@/content/images";
import { brand } from "@/content/brand";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const steps = [
  {
    n: "01",
    title: "Listen",
    body: "We begin in conversation. Your rhythms, preferences, and unspoken expectations form the foundation.",
  },
  {
    n: "02",
    title: "Design",
    body: "Every detail is composed with intention. Routes, residences, and moments are shaped around your world.",
  },
  {
    n: "03",
    title: "Orchestrate",
    body: "Logistics dissolve into seamlessness. Partners, schedules, and contingencies align without friction.",
  },
  {
    n: "04",
    title: "Anticipate",
    body: "Before the thought forms, the answer arrives. We stay three steps ahead, always.",
  },
  {
    n: "05",
    title: "Refine",
    body: "Each journey informs the next. Your experience deepens as our understanding grows.",
  },
] as const;

export function Experience() {
  return (
    <section className="overflow-hidden bg-[#162235] px-[var(--gutter-x)] py-[clamp(8rem,15vh,14rem)]">
      <motion.div
        className="mx-auto max-w-[var(--container-max)]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-8%", amount: 0.1 }}
        variants={staggerContainer}
      >
        {steps.map((step, index) => (
          <div key={step.n}>
            <motion.div
              variants={fadeInUp}
              className={`grid grid-cols-1 gap-6 py-14 md:grid-cols-12 md:gap-12 md:py-20 ${
                index > 0 ? "border-t border-white/[0.06]" : ""
              }`}
            >
              {/* Number */}
              <div className={`md:col-span-2 ${index % 2 === 1 ? "md:order-last md:text-right" : ""}`}>
                <span
                  className="font-[family-name:var(--font-serif)] text-[clamp(3rem,5vw,4.5rem)] font-light italic leading-none"
                  style={{ color: brand.colors.roseGold, opacity: 0.4 }}
                >
                  {step.n}
                </span>
              </div>

              {/* Content */}
              <div className={`md:col-span-7 ${index % 2 === 1 ? "md:order-first" : ""}`}>
                <h3 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-[#F5F0EB]">
                  {step.title}
                </h3>
                <p className="mt-5 max-w-lg font-[family-name:var(--font-body)] text-base font-light leading-relaxed text-[#F5F0EB]/80">
                  {step.body}
                </p>
              </div>
            </motion.div>

            {/* Editorial image between steps 3 and 4 */}
            {index === 2 && (
              <motion.div variants={fadeInUp} className="py-8 md:py-12">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm md:aspect-[21/9]">
                  <Image
                    src={brandImages.conciergeLounge}
                    alt="An intimate concierge lounge"
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
