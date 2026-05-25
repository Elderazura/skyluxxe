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

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
] as const;

const SOCIAL = [
  { href: brand.social.instagram, label: "Instagram" },
  { href: brand.social.linkedin, label: "LinkedIn" },
  { href: brand.social.x, label: "X" },
  { href: brand.social.pinterest, label: "Pinterest" },
] as const;

function SocialIcon({ label }: { label: string }) {
  const shared = "h-5 w-5 fill-current";
  switch (label) {
    case "Instagram":
      return (
        <svg className={shared} viewBox="0 0 24 24" aria-hidden>
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm11 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg className={shared} viewBox="0 0 24 24" aria-hidden>
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 8.98h4v12H3v-12zm7 0h3.8v1.64h.05c.53-1 1.84-2.06 3.8-2.06 4.06 0 4.81 2.67 4.81 6.15v6.27h-4v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.66H10V8.98z" />
        </svg>
      );
    case "X":
      return (
        <svg className={shared} viewBox="0 0 24 24" aria-hidden>
          <path d="M18.244 3H21.5l-7.18 8.21L22.5 21h-6.66l-5.22-6.84L4.74 21H1.48l7.68-8.78L1.5 3h6.82l4.72 6.23L18.244 3zm-2.33 16.2h2.02L8.56 4.96H6.43l9.48 14.24z" />
        </svg>
      );
    case "Pinterest":
      return (
        <svg className={shared} viewBox="0 0 24 24" aria-hidden>
          <path d="M12 2a10 10 0 0 0-3.46 19.4c-.05-.8-.1-2.03.02-2.9l1.22-5.2s-.31-.62-.31-1.54c0-1.44.84-2.52 1.88-2.52.89 0 1.32.67 1.32 1.47 0 .89-.57 2.23-.86 3.47-.24 1.04.52 1.88 1.54 1.88 1.85 0 3.1-2.38 3.1-5.2 0-2.15-1.45-3.76-4.08-3.76-3.01 0-4.9 2.24-4.9 4.74 0 .89.26 1.54.66 2.03.18.22.21.3.14.55l-.05.22c-.02.08-.06.1-.14.06-1.1-.41-1.78-1.7-1.78-2.74 0-2.23 1.9-4.93 5.72-4.93 3.08 0 5.1 2.2 5.1 4.56 0 3.2-1.78 5.6-4.4 5.6-.88 0-1.7-.5-1.99-1.05l-.57 2.24c-.2.8-.76 1.8-1.13 2.41A10 10 0 1 0 12 2z" />
        </svg>
      );
    default:
      return null;
  }
}

export function Footer() {
  const dedLine = brand.legal.dedRegistration
    ? `DED licence ${brand.legal.dedRegistration}`
    : `Registered in ${brand.legal.jurisdiction}`;

  return (
    <footer className="bg-[#162235]">
      <div className="sk-hairline" aria-hidden />

      <div className="mx-auto max-w-[1440px] px-[var(--gutter-x)] pt-20 pb-12 md:pt-24 md:pb-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
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
              <a href={`mailto:${brand.contact.email}`} className="hover:text-[#DFA293]">
                {brand.contact.email}
              </a>
              <br />
              <a href={`tel:${brand.contact.phone.replace(/\s/g, "")}`} className="hover:text-[#DFA293]">
                {brand.contact.phone}
              </a>
              <br />
              {brand.contact.addressLine1}
            </p>
            <p className="mt-4 font-[family-name:var(--font-body)] text-xs leading-relaxed text-[#8A9AB5]/70">
              {dedLine}
              <br />
              {brand.legal.entityName}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {SOCIAL.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm text-[#8A9AB5] transition-colors hover:text-[#DFA293]"
                  aria-label={`Skyluxxe on ${item.label}`}
                >
                  <SocialIcon label={item.label} />
                </a>
              ))}
            </div>

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
            <p className="mb-3 mt-10 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.16em] text-[#8A9AB5]/60">
              Legal
            </p>
            <ul className="flex flex-col gap-1">
              {LEGAL_LINKS.map((link) => (
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
        </div>

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
