"use client";

import Image from "next/image";
import Link from "next/link";

import { MaskedText } from "@/components/ui/MaskedText";
import { brand } from "@/content/brand";
import { brandImages } from "@/content/images";

export function EnquiryCta() {
  return (
    <section
      className="relative overflow-hidden px-[var(--gutter-x)] text-center"
      style={{
        paddingTop: "clamp(8rem, 15vh, 12rem)",
        paddingBottom: "clamp(8rem, 15vh, 12rem)",
      }}
      aria-labelledby="enquiry-cta-heading"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src={brandImages.cashmereBlanket}
          alt=""
          fill
          className="object-cover opacity-[0.08]"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
        <p
          className="mb-6 font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em]"
          style={{ color: brand.colors.mutedBlue }}
        >
          Private Enquiry
        </p>

        <MaskedText as="h2" className="inline-block" id="enquiry-cta-heading">
          <span
            className="block font-[family-name:var(--font-display)] font-normal tracking-tight"
            style={{
              color: brand.colors.offWhite,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
            }}
          >
            Begin a Conversation
          </span>
        </MaskedText>

        <p
          className="mx-auto mt-8 max-w-md font-[family-name:var(--font-serif)] text-lg italic leading-relaxed md:text-xl"
          style={{ color: brand.colors.mutedBlue }}
        >
          Every Skyluxxe relationship begins with a single, confidential exchange.
        </p>

        <Link
          href="/enquiry"
          className="group relative mt-12 inline-flex items-center justify-center overflow-hidden border border-rose-gold bg-transparent px-10 py-4 font-[family-name:var(--font-body)] text-[13px] font-normal uppercase tracking-[0.12em] text-off-white transition-[color] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] before:absolute before:inset-0 before:z-0 before:origin-left before:scale-x-0 before:bg-rose-gold before:transition-transform before:duration-[600ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:content-[''] hover:text-midnight-aviation-navy hover:before:scale-x-100"
        >
          <span className="relative z-10">Reach Out</span>
        </Link>
      </div>
    </section>
  );
}
