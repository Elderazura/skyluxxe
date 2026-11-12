"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import Link from "next/link";

import { brand } from "@/content/brand";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const buttonClass =
    "inline-flex min-h-[44px] items-center justify-center border px-8 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.14em] text-off-white transition-colors";

  return (
    <section
      role="alert"
      className="flex min-h-[100svh] flex-col items-center justify-center bg-midnight-aviation-navy px-[var(--gutter-x)] py-40 text-center"
    >
      <p className="font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.22em] text-muted-blue">
        Something went wrong
      </p>
      <h1 className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-normal leading-tight tracking-tight text-off-white">
        A momentary interruption.
      </h1>
      <p className="mt-6 max-w-md font-[family-name:var(--font-serif)] text-lg italic leading-relaxed text-off-white/80">
        This page could not be displayed. Please try again, or write to us at{" "}
        <a href={`mailto:${brand.contact.email}`} className="text-[#DFA293] underline-offset-4 hover:underline">
          {brand.contact.email}
        </a>
        .
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <button
          type="button"
          onClick={() => unstable_retry()}
          className={`${buttonClass} border-[#DFA293] hover:bg-[#DFA293] hover:text-[#0D1B2A]`}
        >
          Try again
        </button>
        <Link href="/" className={`${buttonClass} border-white/25 hover:border-[#DFA293]`}>
          Return home
        </Link>
      </div>
    </section>
  );
}
