import Image from "next/image";
import Link from "next/link";
import { logos } from "@/content/images";
import { brand } from "@/content/brand";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/reach", label: "Reach" },
  { href: "/enquiry", label: "Enquiry" },
] as const;

const CATEGORIES = [
  { href: "/services#air", label: "Air" },
  { href: "/services#sea", label: "Sea" },
  { href: "/services#stay", label: "Stay" },
  { href: "/services#lifestyle", label: "Lifestyle" },
] as const;

export function Footer() {
  return (
    <footer className="bg-[#162235]">
      <div className="sk-hairline" aria-hidden />

      <div className="mx-auto max-w-[1440px] px-[var(--gutter-x)] pt-20 pb-12 md:pt-24 md:pb-16">
        {/* Grid layout */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Left: Logo + tagline */}
          <div className="md:col-span-4">
            <Image
              src={logos.monogramRoseGold}
              alt="Skyluxxe"
              width={64}
              height={71}
              className="h-14 w-auto object-contain md:h-16"
            />
            <p className="mt-4 font-[family-name:var(--font-serif)] text-base italic text-[#8A9AB5]">
              Concierge Travel
            </p>
            <p className="mt-6 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[#8A9AB5]">
              {brand.contact.email}
              <br />
              {brand.contact.addressLine1}
            </p>

            <Link
              href="/enquiry"
              className="group mt-8 inline-flex min-h-[44px] items-center gap-2 py-2 font-[family-name:var(--font-serif)] text-[15px] italic text-[#DFA293] transition-opacity duration-300 hover:opacity-80"
            >
              <span className="relative pb-0.5">
                Let&apos;s Discuss
                <span
                  className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#DFA293] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                  aria-hidden
                />
              </span>
              <span className="inline-block text-sm transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden>&rarr;</span>
            </Link>
          </div>

          {/* Center: Navigation */}
          <div className="md:col-span-3 md:col-start-6">
            <p className="mb-4 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.16em] text-[#8A9AB5]/60">
              Navigate
            </p>
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block min-h-[44px] py-2 font-[family-name:var(--font-serif)] text-[15px] leading-relaxed text-[#F5F0EB]/80 transition-colors duration-300 hover:text-[#DFA293]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Categories */}
          <div className="md:col-span-3">
            <p className="mb-4 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.16em] text-[#8A9AB5]/60">
              The Sphere
            </p>
            <ul className="flex flex-col gap-1">
              {CATEGORIES.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="inline-block min-h-[44px] py-2 font-[family-name:var(--font-serif)] text-[15px] leading-relaxed text-[#F5F0EB]/80 transition-colors duration-300 hover:text-[#DFA293]"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-white/[0.06] pt-8 md:mt-20">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="font-[family-name:var(--font-body)] text-sm tracking-[0.06em] text-[#8A9AB5]/60">
              {brand.values.join(" · ")}
            </p>
            <p className="font-[family-name:var(--font-body)] text-sm text-[#8A9AB5]/50">
              &copy; 2026 Skyluxxe Concierge Travel
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
