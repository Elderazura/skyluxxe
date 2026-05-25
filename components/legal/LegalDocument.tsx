import Link from "next/link";

import { HairlineRule } from "@/components/ui/HairlineRule";
import { brand } from "@/content/brand";

type LegalSection = {
  heading: string;
  body: string;
};

type LegalDocumentProps = {
  title: string;
  updated: string;
  sections: readonly LegalSection[];
};

export function LegalDocument({ title, updated, sections }: LegalDocumentProps) {
  return (
    <article
      className="px-[var(--gutter-x)] py-24 md:py-32"
      style={{ backgroundColor: brand.colors.ivoryCream }}
    >
      <div className="mx-auto max-w-3xl">
        <p
          className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em]"
          style={{ color: brand.colors.mutedBlue }}
        >
          Legal
        </p>
        <h1
          className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-tight md:text-5xl"
          style={{ color: brand.colors.navy }}
        >
          {title}
        </h1>
        <p
          className="mt-3 font-[family-name:var(--font-body)] text-sm font-light"
          style={{ color: brand.colors.mutedBlue }}
        >
          Last updated {updated}
        </p>
        <div className="mt-10">
          <HairlineRule accent="gold" />
        </div>
        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2
                className="font-[family-name:var(--font-display)] text-2xl tracking-tight"
                style={{ color: brand.colors.navy }}
              >
                {section.heading}
              </h2>
              <p
                className="mt-4 font-[family-name:var(--font-body)] text-base font-light leading-[1.85]"
                style={{ color: brand.colors.deepNavy }}
              >
                {section.body}
              </p>
            </section>
          ))}
        </div>
        <p className="mt-16 font-[family-name:var(--font-body)] text-sm font-light">
          <Link href="/enquiry" className="text-[#B76E79] underline-offset-4 hover:underline">
            Return to enquiry
          </Link>
          {" · "}
          <Link href="/" className="text-[#B76E79] underline-offset-4 hover:underline">
            Home
          </Link>
        </p>
      </div>
    </article>
  );
}
