"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { MaskedText } from "@/components/ui/MaskedText";
import { brandImages, videos } from "@/content/images";

const MonogramScene = dynamic(
  () => import("@/components/ui/MonogramScene").then((mod) => ({ default: mod.MonogramScene })),
  { ssr: false },
);

export function OpeningStatement() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-[#0D1B2A] px-[var(--gutter-x)] py-[clamp(8rem,15vh,15rem)]"
      aria-labelledby="opening-statement-heading"
    >
      {/* Full-bleed background video (static poster when reduced motion) */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        {reduceMotion ? (
          <Image
            src={brandImages.leatherJournal}
            alt=""
            fill
            className="object-cover opacity-40"
            sizes="100vw"
            priority={false}
          />
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={brandImages.leatherJournal}
          >
            <source src={videos.openingStatementBg} type="video/mp4" />
          </video>
        )}
        {/* Readability stack: navy → vignette so type stays legible */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,27,42,0.82) 0%, rgba(13,27,42,0.55) 45%, rgba(13,27,42,0.88) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 0%, rgba(13,27,42,0.5) 100%)",
          }}
        />
      </div>

      {/* Floating 3D monogram — whisper-light, behind copy */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center"
        aria-hidden="true"
      >
        <MonogramScene
          className="h-[min(80vw,350px)] w-[min(80vw,350px)] md:h-[500px] md:w-[500px]"
          autoRotate
          rotationSpeed={0.12}
          scale={2}
          opacity={0.05}
        />
      </div>

      {/* Text content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[900px] flex-col items-stretch text-center">
        <MaskedText>
          <p
            id="opening-statement-heading"
            className="font-[family-name:var(--font-serif)] text-[clamp(1.75rem,4.5vw,3.5rem)] font-light italic leading-[1.3] text-[color:var(--color-off-white)] [text-shadow:0_2px_40px_rgba(13,27,42,0.45)]"
          >
            We do not arrange travel. We define how it is experienced.
          </p>
        </MaskedText>
      </div>
    </section>
  );
}
