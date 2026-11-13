"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { brand } from "@/content/brand";
import { useLenis } from "./SmoothScroll";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/reach", label: "Reach" },
  { href: "/enquiry", label: "Enquiry" },
] as const;

export type MenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const overlayTransition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1] as const,
};

const linkVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.08,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function Menu({ isOpen, onClose }: MenuProps) {
  const lenis = useLenis();

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Lenis scrolls in JS, so `overflow: hidden` alone does not stop the wheel
    // moving the page behind the overlay.
    lenis?.stop();
    return () => {
      document.body.style.overflow = prev;
      lenis?.start();
    };
  }, [isOpen, lenis]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[#0D1B2A]/95"
          data-lenis-prevent
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={overlayTransition}
        >
          {/*
            No close button of its own: the header toggle sits above this
            overlay in the same spot and already reads "Close menu". Keyboard
            handling (Escape, focus containment, focus return) lives with that
            toggle in Navigation.tsx.
          */}
          <nav
            className="flex flex-1 flex-col items-center justify-center px-[var(--gutter-x)] pt-28 pb-8"
            aria-label="Site menu"
          >
            <ul className="flex w-full max-w-md flex-col items-stretch text-center">
              {LINKS.map((item, i) => (
                <li key={item.href}>
                  <motion.div
                    custom={i}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="font-[family-name:var(--font-display)] block py-4 text-3xl tracking-[0.08em] text-[#F5F0EB] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#DFA293] sm:text-4xl"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                  {i < LINKS.length - 1 ? (
                    <div
                      className="h-px w-full bg-[#DFA293]/40"
                      aria-hidden
                    />
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="grid grid-cols-2 gap-3 px-[var(--gutter-x)]"
            style={{ paddingBottom: "calc(2rem + env(safe-area-inset-bottom, 0px))" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <a
              href={brand.contact.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[48px] items-center justify-center border border-white/15 font-[family-name:var(--font-body)] text-[11px] uppercase tracking-[0.16em] text-[#F5F0EB] active:border-[#DFA293]"
            >
              WhatsApp
            </a>
            <a
              href={`tel:${brand.contact.phoneTel}`}
              className="flex min-h-[48px] items-center justify-center border border-white/15 font-[family-name:var(--font-body)] text-[11px] uppercase tracking-[0.16em] text-[#F5F0EB] active:border-[#DFA293]"
            >
              Call the desk
            </a>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
