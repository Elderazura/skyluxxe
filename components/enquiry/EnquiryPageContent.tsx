"use client";

import { useCallback, useId, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";

import { DiamondMarker } from "@/components/ui/DiamondMarker";
import { HairlineRule } from "@/components/ui/HairlineRule";
import { MaskedText } from "@/components/ui/MaskedText";
import { brand } from "@/content/brand";
import { lifestyleImages, brandImages, logos } from "@/content/images";

const ENQUIRY_TYPES = [
  "Private Aviation",
  "Yacht Charter",
  "Luxury Stays",
  "Events Access",
  "Executive Protection",
  "Bespoke Itinerary",
  "Family Office Travel",
  "Other",
] as const;

const fieldBase =
  "w-full border-0 border-b bg-transparent pb-3 text-base font-light text-off-white outline-none transition-[border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-0";

const fieldBorderDefault = {
  borderBottomColor: `color-mix(in srgb, ${brand.colors.gold} 20%, transparent)`,
} as const;

const labelClass =
  "mb-3 block font-[family-name:var(--font-body)] text-xs font-light uppercase tracking-[0.14em] text-muted-blue";

export function EnquiryPageContent() {
  const formId = useId();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  }, []);

  return (
    <article
      aria-labelledby={`${formId}-heading`}
      className="min-h-screen"
      style={{ backgroundColor: brand.colors.navy }}
    >
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-12">
        {/* Left: atmospheric image */}
        <div className="relative hidden md:col-span-5 md:block lg:col-span-5">
          <div className="sticky top-0 h-screen">
            <Image
              src={lifestyleImages.womanCarGolden}
              alt="Elegant arrival in golden light"
              fill
              className="object-cover"
              sizes="45vw"
              priority
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to left, ${brand.colors.navy} 0%, rgba(13,27,42,0.3) 25%, transparent 60%)`,
              }}
            />
          </div>
        </div>

        {/* Mobile: image banner */}
        <div className="relative aspect-[16/9] w-full md:hidden">
          <Image
            src={lifestyleImages.womanCarGolden}
            alt="Elegant arrival in golden light"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${brand.colors.navy} 0%, rgba(13,27,42,0.4) 50%, transparent 100%)`,
            }}
          />
        </div>

        {/* Right: office, map, banners, form */}
        <div className="flex flex-col justify-center px-[var(--gutter-x)] py-16 md:col-span-7 md:px-16 md:py-20 lg:col-span-7 lg:px-24">
          <header className="max-w-[560px]">
            <Link href="/" className="mb-8 inline-block md:mb-10">
              <Image
                src={logos.monogramRoseGold}
                alt="Skyluxxe"
                width={112}
                height={124}
                className="h-[4.5rem] w-auto object-contain sm:h-20 md:h-24"
                priority
              />
            </Link>

            <div className="mb-8 flex items-center gap-3">
              <DiamondMarker size="md" />
            </div>

            <MaskedText as="h1" className="inline-block" id={`${formId}-heading`}>
              <span className="block font-[family-name:var(--font-display)] text-[clamp(2.25rem,5vw,3.25rem)] font-normal tracking-tight text-off-white">
                Private Enquiry
              </span>
            </MaskedText>

            <p className="mt-6 max-w-md font-[family-name:var(--font-serif)] text-lg italic leading-relaxed text-off-white/90 md:text-xl">
              Every Skyluxxe relationship begins with a confidential conversation.
            </p>

            <div className="mt-8 max-w-sm">
              <HairlineRule accent="gold" />
            </div>
          </header>

          <div className="mt-12 grid max-w-[560px] grid-cols-1 gap-10 md:gap-12">
            <section aria-labelledby={`${formId}-office`}>
              <h2
                id={`${formId}-office`}
                className="font-[family-name:var(--font-body)] text-xs font-light uppercase tracking-[0.14em] text-muted-blue"
              >
                Concierge desk
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
                <div className="space-y-4 font-[family-name:var(--font-body)] text-base font-light leading-relaxed text-off-white/90">
                  <p className="font-[family-name:var(--font-display)] text-xl text-off-white">
                    {brand.office.name}
                  </p>
                  {brand.office.addressLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                  <p>
                    <a href={`tel:${brand.contact.phone.replace(/\s/g, "")}`} className="text-[#DFA293] transition-opacity hover:opacity-85">
                      {brand.contact.phone}
                    </a>
                  </p>
                  <p>
                    <a href={`mailto:${brand.contact.email}`} className="text-[#DFA293] transition-opacity hover:opacity-85">
                      {brand.contact.email}
                    </a>
                  </p>
                  <p className="text-sm text-muted-blue">{brand.office.hoursLine}</p>
                </div>
                <div className="min-h-[200px] overflow-hidden rounded-sm border border-white/[0.08] bg-[#162235]">
                  <iframe
                    title="Skyluxxe — Abu Dhabi"
                    src={brand.office.mapEmbedUrl}
                    className="h-[220px] w-full border-0 md:h-full md:min-h-[240px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </section>

            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-sm">
              <Image
                src={lifestyleImages.jetStairsTarmac}
                alt="Aircraft stairs — seamless ground-to-air handoffs."
                fill
                className="object-cover"
                sizes="(max-width: 767px) 100vw, 55vw"
              />
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/80 to-transparent"
                aria-hidden
              />
            </div>
          </div>

          <div className="mt-12 max-w-[560px]">
            {submitted ? (
              <div role="status" aria-live="polite" className="block">
                <div className="mb-8 flex">
                  <DiamondMarker size="sm" color="gold" />
                </div>
                <p className="font-[family-name:var(--font-body)] text-base font-light leading-relaxed text-off-white">
                  Thank you. Your enquiry has been received. A member of our team will respond within twenty-four hours.
                </p>
                <p className="mt-6 font-[family-name:var(--font-body)] text-sm font-light text-muted-blue">
                  All communications are held in strict confidence.
                </p>
              </div>
            ) : (
              <form
                id={`${formId}-form`}
                className="flex flex-col gap-12 md:gap-14"
                onSubmit={onSubmit}
                noValidate
              >
                <div>
                  <label className={labelClass} htmlFor={`${formId}-name`}>
                    Full Name
                  </label>
                  <input
                    id={`${formId}-name`}
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className={`${fieldBase} focus:border-rose-gold`}
                    style={fieldBorderDefault}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor={`${formId}-email`}>
                    Email Address
                  </label>
                  <input
                    id={`${formId}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    className={`${fieldBase} focus:border-rose-gold`}
                    style={fieldBorderDefault}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor={`${formId}-phone`}>
                    Phone <span className="normal-case tracking-normal text-muted-blue/70">(optional)</span>
                  </label>
                  <input
                    id={`${formId}-phone`}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={`${fieldBase} focus:border-rose-gold`}
                    style={fieldBorderDefault}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor={`${formId}-nature`}>
                    Nature of Enquiry
                  </label>
                  <div className="relative">
                    <select
                      id={`${formId}-nature`}
                      name="nature"
                      required
                      defaultValue=""
                      className={`${fieldBase} cursor-pointer appearance-none pr-10 focus:border-rose-gold`}
                      style={fieldBorderDefault}
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {ENQUIRY_TYPES.map((label) => (
                        <option key={label} value={label}>
                          {label}
                        </option>
                      ))}
                    </select>
                    <span
                      className="pointer-events-none absolute right-0 bottom-3 text-muted-blue"
                      aria-hidden
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.5 4.25L6 7.75L9.5 4.25"
                          stroke="currentColor"
                          strokeWidth="0.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor={`${formId}-message`}>
                    Message
                  </label>
                  <textarea
                    id={`${formId}-message`}
                    name="message"
                    rows={5}
                    required
                    className={`${fieldBase} min-h-[8rem] resize-y focus:border-rose-gold`}
                    style={fieldBorderDefault}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="group relative inline-flex w-full items-center justify-center overflow-hidden border border-rose-gold bg-transparent px-8 py-4 font-[family-name:var(--font-body)] text-[13px] font-normal uppercase tracking-[0.14em] text-off-white transition-[color] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] before:absolute before:inset-0 before:z-0 before:origin-left before:scale-x-0 before:bg-rose-gold before:transition-transform before:duration-[600ms] before:ease-[cubic-bezier(0.22,1,0.36,1)] before:content-[''] hover:text-midnight-aviation-navy hover:before:scale-x-100 md:w-auto md:min-w-[14rem]"
                  >
                    <span className="relative z-10">Submit Enquiry</span>
                  </button>
                </div>

                <p className="font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-muted-blue">
                  We respond within 24 hours. All communications are held in strict confidence.
                </p>
              </form>
            )}
          </div>

          <div className="relative mt-16 aspect-[16/7] w-full max-w-[560px] overflow-hidden rounded-sm md:mt-20">
            <Image
              src={brandImages.leatherJournal}
              alt="Leather journal — editorial calm and continuity."
              fill
              className="object-cover"
              sizes="(max-width: 767px) 100vw, 40vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/90 via-[#0D1B2A]/35 to-transparent"
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="font-[family-name:var(--font-display)] text-xl text-off-white md:text-2xl">
                Prefer context before you write?
              </p>
              <Link
                href="/journal"
                className="mt-3 inline-flex items-center gap-2 font-[family-name:var(--font-serif)] text-sm italic text-[#DFA293] transition-opacity hover:opacity-85"
              >
                Read the Journal
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
