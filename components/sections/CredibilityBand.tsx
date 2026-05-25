import { brand } from "@/content/brand";
import { HairlineRule } from "@/components/ui/HairlineRule";

const ACCREDITATION_MARKS = [
  "Virtuoso",
  "Leading Hotels",
  "Private Aviation",
  "Yacht Charter",
] as const;

export function CredibilityBand() {
  return (
    <section
      className="border-y border-white/[0.06] px-[var(--gutter-x)] py-14 md:py-16"
      style={{ backgroundColor: brand.colors.deepNavy }}
      aria-labelledby="credibility-heading"
    >
      <div className="mx-auto max-w-[var(--container-max)] text-center">
        <p
          id="credibility-heading"
          className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em]"
          style={{ color: brand.colors.mutedBlue }}
        >
          Memberships &amp; accreditations
        </p>
        <p
          className="mx-auto mt-5 max-w-2xl font-[family-name:var(--font-serif)] text-lg italic leading-relaxed md:text-xl"
          style={{ color: brand.colors.offWhite }}
        >
          {brand.memberships.body}
        </p>
        <div className="mx-auto mt-8 max-w-md">
          <HairlineRule accent="rose-gold" />
        </div>
        <ul
          className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
          aria-label="Representative networks"
        >
          {ACCREDITATION_MARKS.map((mark) => (
            <li
              key={mark}
              className="font-[family-name:var(--font-body)] text-[11px] font-light uppercase tracking-[0.22em] text-white/40"
            >
              {mark}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
