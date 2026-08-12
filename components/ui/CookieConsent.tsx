"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { brand } from "@/content/brand";

const STORAGE_KEY = "skyluxxe-cookie-consent";

/**
 * Published to the document so full-height sections can keep their content
 * clear of the banner. The hero used to sit flush against the bottom of the
 * viewport, and on a 1280x720 laptop this bar cut through the wordmark and hid
 * the tagline entirely on a first visit.
 */
const HEIGHT_VAR = "--consent-height";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (!visible) {
      root.style.removeProperty(HEIGHT_VAR);
      return;
    }

    const el = panelRef.current;
    if (!el) return;

    const publish = () => {
      root.style.setProperty(HEIGHT_VAR, `${Math.ceil(el.getBoundingClientRect().height)}px`);
    };

    publish();

    // The banner reflows between one and three lines across breakpoints.
    const observer = new ResizeObserver(publish);
    observer.observe(el);

    return () => {
      observer.disconnect();
      root.style.removeProperty(HEIGHT_VAR);
    };
  }, [visible]);

  const accept = () => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ essential: true, acknowledgedAt: new Date().toISOString() }),
      );
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-labelledby="cookie-consent-heading"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-white/[0.08] px-[var(--gutter-x)] py-4 shadow-[0_-12px_40px_rgba(0,0,0,0.35)] md:py-5"
      style={{ backgroundColor: brand.colors.deepNavy }}
    >
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="max-w-2xl">
          <p
            id="cookie-consent-heading"
            className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.16em]"
            style={{ color: brand.colors.mutedBlue }}
          >
            Cookies &amp; privacy
          </p>
          <p
            id="cookie-consent-desc"
            className="mt-2 font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-off-white/85"
          >
            We use essential cookies to operate this site securely. Optional tools (such as form
            protection) may set additional cookies. See our{" "}
            <Link href="/cookies" className="text-[#DFA293] underline-offset-4 hover:underline">
              Cookie Policy
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-[#DFA293] underline-offset-4 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <Link
            href="/cookies"
            className="inline-flex min-h-[44px] items-center px-4 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.14em] text-muted-blue transition-colors hover:text-off-white"
          >
            Learn more
          </Link>
          <button
            type="button"
            onClick={accept}
            className="inline-flex min-h-[44px] items-center border border-[#DFA293] px-6 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.14em] text-off-white transition-colors hover:bg-[#DFA293] hover:text-[#0D1B2A]"
          >
            Accept essential cookies
          </button>
        </div>
      </div>
    </div>
  );
}
