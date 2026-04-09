"use client";

import { MaskedText } from "@/components/ui/MaskedText";

export function DiscretionStatement() {
  return (
    <section
      className="bg-[#FAF7F4] px-[var(--gutter-x)] py-[clamp(8rem,18vh,15rem)] md:py-[clamp(10rem,20vh,15rem)]"
      aria-labelledby="discretion-statement-heading"
    >
      <div className="mx-auto flex w-full max-w-[min(100%,52rem)] flex-col items-center text-center">
        <MaskedText>
          <p
            id="discretion-statement-heading"
            className="font-[family-name:var(--font-display)] text-[clamp(2rem,6vw,5rem)] font-normal leading-[1.12] text-[#0D1B2A]"
          >
            Discretion is not what we offer. It is what we are.
          </p>
        </MaskedText>
      </div>
    </section>
  );
}
