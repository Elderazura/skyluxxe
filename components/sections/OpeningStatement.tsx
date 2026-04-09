"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { MaskedText } from "@/components/ui/MaskedText";
import { brandImages } from "@/content/images";

const MonogramScene = dynamic(
  () => import("@/components/ui/MonogramScene").then((mod) => ({ default: mod.MonogramScene })),
  { ssr: false },
);

export function OpeningStatement() {
  return (
    <section
      className="relative overflow-hidden bg-[#0D1B2A] px-[var(--gutter-x)] py-[clamp(8rem,15vh,15rem)]"
      aria-labelledby="opening-statement-heading"
    >
      {/* Texture background */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <Image
          src={brandImages.leatherJournal}
          alt=""
          fill
          className="object-cover opacity-[0.06]"
          sizes="100vw"
        />
      </div>

      {/* Floating 3D monogram — ambient, behind text */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center"
        aria-hidden="true"
      >
        <MonogramScene
          className="h-[min(80vw,350px)] w-[min(80vw,350px)] md:h-[500px] md:w-[500px]"
          autoRotate
          rotationSpeed={0.15}
          scale={2}
          opacity={0.06}
        />
      </div>

      {/* Text content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-stretch text-center">
        <MaskedText>
          <p
            id="opening-statement-heading"
            className="font-[family-name:var(--font-serif)] text-[clamp(1.75rem,4.5vw,3.5rem)] font-light italic leading-[1.3] text-[color:var(--color-off-white)]"
          >
            We do not arrange travel. We define how it is experienced.
          </p>
        </MaskedText>
      </div>
    </section>
  );
}
