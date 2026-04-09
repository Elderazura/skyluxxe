"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { sphereImages } from "@/content/images";
import { brand } from "@/content/brand";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const categories = [
  {
    id: "air",
    label: "Air",
    description: "Charter, concierge, and advisory — above it all.",
    href: "/services#air",
  },
  {
    id: "sea",
    label: "Sea",
    description: "Yachts, islands, and coastlines — yours alone.",
    href: "/services#sea",
  },
  {
    id: "stay",
    label: "Stay",
    description: "Hotels, villas, and retreats — chosen with care.",
    href: "/services#stay",
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
    description: "Events, protection, and bespoke design — life, elevated.",
    href: "/services#lifestyle",
  },
] as const;

export function Sphere() {
  return (
    <section
      className="bg-[#0D1B2A] px-[var(--gutter-x)]"
      style={{
        paddingTop: "clamp(6rem, 12vh, 10rem)",
        paddingBottom: "clamp(8rem, 15vh, 15rem)",
      }}
    >
      <div className="mx-auto max-w-[var(--container-max)]">
        <p className="mb-12 font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em] text-[#8A9AB5] md:mb-16">
          The Sphere
        </p>

        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2 md:gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8%", amount: 0.15 }}
          variants={staggerContainer}
        >
          {categories.map((cat, index) => (
            <SphereCell
              key={cat.id}
              {...cat}
              className={cellPlacement(index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function cellPlacement(index: number): string {
  const placements = [
    "md:col-span-7 md:row-span-1 md:aspect-[16/10]",
    "md:col-span-5 md:row-span-1 md:aspect-[16/10]",
    "md:col-span-5 md:row-span-1 md:aspect-[16/10]",
    "md:col-span-7 md:row-span-1 md:aspect-[16/10]",
  ];
  return placements[index] ?? "";
}

function SphereCell({
  id,
  label,
  description,
  href,
  className,
}: {
  id: string;
  label: string;
  description: string;
  href: string;
  className?: string;
}) {
  const src = sphereImages[id];
  return (
    <motion.div
      variants={fadeInUp}
      className={["min-h-0", className].filter(Boolean).join(" ")}
    >
      <Link
        href={href}
        className="group relative flex h-full min-h-[18rem] flex-col justify-end overflow-hidden"
      >
        {src && (
          <Image
            src={src}
            alt=""
            fill
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 40vw"
          />
        )}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(13,27,42,0.88) 0%, rgba(13,27,42,0.5) 35%, rgba(13,27,42,0.1) 60%, transparent 100%)",
          }}
        />

        <div className="relative z-10 p-8 md:p-10">
          <span className="block font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
            {label}
          </span>
          <p className="mt-3 max-w-md font-[family-name:var(--font-body)] text-[15px] font-light leading-relaxed text-white/70">
            {description}
          </p>
        </div>

        <span
          className="pointer-events-none absolute inset-0 z-[5] opacity-0 transition-opacity duration-[600ms] group-hover:opacity-100"
          aria-hidden
        >
          <span
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 100%, color-mix(in srgb, ${brand.colors.roseGold} 15%, transparent), transparent 70%)`,
            }}
          />
        </span>
      </Link>
    </motion.div>
  );
}
