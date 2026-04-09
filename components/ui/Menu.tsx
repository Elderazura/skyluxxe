"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

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
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col bg-[#0D1B2A]/95"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={overlayTransition}
          aria-modal="true"
          role="dialog"
          aria-label="Site menu"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-8 right-[var(--gutter-x)] z-10 flex h-11 w-11 items-center justify-center text-[#F5F0EB] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#DFA293]"
            aria-label="Close menu"
          >
            <span className="relative block h-4 w-4">
              <span className="absolute top-1/2 left-0 block h-px w-full -translate-y-1/2 rotate-45 bg-current" />
              <span className="absolute top-1/2 left-0 block h-px w-full -translate-y-1/2 -rotate-45 bg-current" />
            </span>
          </button>

          <nav
            className="flex flex-1 flex-col items-center justify-center px-[var(--gutter-x)]"
            aria-label="Primary"
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
                      className="font-[family-name:var(--font-display)] block py-5 text-3xl tracking-[0.08em] text-[#F5F0EB] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#DFA293] sm:text-4xl"
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
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
