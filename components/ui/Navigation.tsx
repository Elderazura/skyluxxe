"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logos } from "@/content/images";
import { Menu } from "./Menu";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/reach", label: "Reach" },
  { href: "/enquiry", label: "Enquiry" },
] as const;

const SCROLL_THRESHOLD_PX = 100;

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const check = () => {
      const isScrolled = window.scrollY > SCROLL_THRESHOLD_PX;
      setScrolled(isScrolled);
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(check);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    requestAnimationFrame(() => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((o) => !o), []);

  return (
    <>
      <header
        className={[
          "fixed top-0 right-0 left-0 z-50 transition-[padding,background-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled ? "bg-[#0D1B2A]/95 py-5 backdrop-blur-md" : "bg-transparent py-8",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-[var(--gutter-x)]">
          <Link
            href="/"
            className="relative block shrink-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-80"
          >
            <Image
              src={logos.monogramRoseGold}
              alt="Skyluxxe"
              width={56}
              height={62}
              className="h-12 w-auto object-contain md:h-14"
              priority
            />
          </Link>

          <nav
            className="hidden items-center gap-10 md:flex"
            aria-label="Primary"
          >
            {NAV_LINKS.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group font-[family-name:var(--font-serif)] text-[15px] font-normal tracking-[0.06em] text-[#F5F0EB] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  <span className="relative inline-block pb-1">
                    {item.label}
                    <span
                      className={[
                        "pointer-events-none absolute right-0 bottom-0 left-0 h-px origin-left bg-[#DFA293] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      ].join(" ")}
                      aria-hidden
                    />
                  </span>
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="relative flex h-11 w-11 items-center justify-center md:hidden"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Menu"}</span>
            <span className="flex h-3 w-5 flex-col justify-between">
              <span
                className={[
                  "block h-px w-full origin-center bg-[#F5F0EB] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  menuOpen ? "translate-y-[5px] rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "block h-px w-full origin-center bg-[#F5F0EB] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  menuOpen ? "-translate-y-[5px] -rotate-45" : "",
                ].join(" ")}
              />
            </span>
          </button>
        </div>
      </header>

      <div id="mobile-menu">
        <Menu isOpen={menuOpen} onClose={closeMenu} />
      </div>
    </>
  );
}
