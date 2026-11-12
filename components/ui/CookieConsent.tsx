"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { brand } from "@/content/brand";

const STORAGE_KEY = "skyluxxe-cookie-consent";

/**
 * Published to the document so full-height sections can keep their content
 * clear of the banner (the hero pads its bottom edge by this amount).
 */
const HEIGHT_VAR = "--consent-height";

const subscribeNever = () => () => {};

function readAcknowledged(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    // Storage blocked: show the notice, it just will not be remembered.
    return false;
  }
}

export function CookieConsent() {
  // Treated as acknowledged on the server so the banner is never in the HTML
  // for returning visitors; first-time visitors get it right after hydration.
  const acknowledged = useSyncExternalStore(subscribeNever, readAcknowledged, () => true);
  const [dismissed, setDismissed] = useState(false);
  const visible = !acknowledged && !dismissed;
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const el = panelRef.current;
    if (!visible || !el) return;

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
    setDismissed(true);
  };

  if (!visible) return null;

  /*
   * z-30: above page content, below the header (z-50) and the mobile menu
   * (z-40). At z-100 it sat on top of the open menu and hid its last link.
   */
  return (
    <div
      ref={panelRef}
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-white/[0.08] px-[var(--gutter-x)] py-3 shadow-[0_-12px_40px_rgba(0,0,0,0.35)] md:py-5"
      style={{ backgroundColor: brand.colors.deepNavy }}
    >
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="max-w-2xl">
          <p
            className="hidden font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.16em] md:block"
            style={{ color: brand.colors.mutedBlue }}
          >
            Cookies &amp; privacy
          </p>
          <p className="font-[family-name:var(--font-body)] text-[13px] font-light leading-relaxed text-off-white/85 md:mt-2 md:text-sm">
            This site uses only essential cookies and storage — no analytics or advertising. See
            our{" "}
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
        <div className="flex shrink-0 items-center">
          <button
            type="button"
            onClick={accept}
            className="inline-flex min-h-[44px] w-full items-center justify-center border border-[#DFA293] px-6 font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.14em] text-off-white transition-colors hover:bg-[#DFA293] hover:text-[#0D1B2A] md:w-auto"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}
