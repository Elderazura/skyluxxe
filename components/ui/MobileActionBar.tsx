"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { brand } from "@/content/brand";

/** Show once the reader has scrolled past the hero's own call to action. */
const REVEAL_AFTER_PX = 520;

/**
 * Phone-only bar pinned to the bottom edge, inside thumb reach: WhatsApp and
 * call as one-tap icons, enquiry as the primary action. On a phone the page's
 * calls to action are otherwise many screens apart.
 */
export function MobileActionBar() {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      setShown(window.scrollY > REVEAL_AFTER_PX);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  // The enquiry page is already the destination.
  if (pathname === "/enquiry") return null;

  const iconButton =
    "flex h-12 w-12 shrink-0 items-center justify-center border border-white/15 text-[#F5F0EB] transition-colors active:bg-white/10";

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-20 border-t border-white/[0.08] bg-[#0D1B2A]/95 px-4 pt-3 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
      // Off-screen links must not take focus or be announced.
      inert={!shown}
    >
      <nav aria-label="Contact" className="flex items-center gap-3">
        <a
          href={brand.contact.whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp the concierge desk"
          className={iconButton}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
            <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.17-1.5A9.93 9.93 0 1 0 12.04 2zm0 1.8a8.12 8.12 0 0 1 6.9 12.42 8.13 8.13 0 0 1-10.9 2.7l-.34-.2-3.07.9.92-2.98-.22-.36A8.12 8.12 0 0 1 12.04 3.8zM8.6 7.3c-.2 0-.5.07-.76.36-.26.28-1 .97-1 2.37s1.02 2.75 1.17 2.94c.14.19 2 3.2 4.95 4.36 2.45.96 2.95.77 3.48.72.53-.05 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.33-.29-.15-1.72-.85-1.98-.94-.27-.1-.46-.15-.65.14-.2.29-.75.94-.92 1.14-.17.19-.34.21-.63.07-.29-.15-1.22-.45-2.33-1.44a8.7 8.7 0 0 1-1.6-2c-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.5.15-.18.2-.3.3-.5.1-.19.05-.36-.03-.5-.07-.15-.64-1.6-.9-2.18-.22-.5-.46-.52-.66-.53l-.58-.01z" />
          </svg>
        </a>
        <a
          href={`tel:${brand.contact.phoneTel}`}
          aria-label={`Call ${brand.contact.phone}`}
          className={iconButton}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-none stroke-current"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M5 4h3.5l1.7 4.3-2.1 1.4a11.5 11.5 0 0 0 6.2 6.2l1.4-2.1L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A15.5 15.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z" />
          </svg>
        </a>
        <Link
          href="/enquiry"
          className="flex h-12 flex-1 items-center justify-center bg-[#DFA293] font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.16em] text-[#0D1B2A] transition-opacity active:opacity-85"
        >
          Begin an enquiry
        </Link>
      </nav>
    </div>
  );
}
