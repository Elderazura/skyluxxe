"use client";

import { MaskedText } from "@/components/ui/MaskedText";
import { brand } from "@/content/brand";

export function ReachStatement() {
  return (
    <section
      className="bg-[#FAF7F4] px-[var(--gutter-x)] py-[clamp(6rem,12vh,10rem)]"
      aria-labelledby="reach-statement"
    >
      <div className="mx-auto max-w-[var(--container-max)] text-center">
        <MaskedText>
          <p
            id="reach-statement"
            className="mx-auto max-w-[20ch] font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] tracking-tight"
            style={{ color: brand.colors.navy }}
          >
            Wherever distinction matters, we are there.
          </p>
        </MaskedText>
      </div>
    </section>
  );
}
