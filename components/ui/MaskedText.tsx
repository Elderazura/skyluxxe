"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
  useRef,
} from "react";

import { DURATION_MEDIUM, EASE_OUT_EXPO } from "@/lib/animations";

export type MaskedTextProps<T extends ElementType = "div"> = {
  children: ReactNode;
  /** Wrapper element for the overflow mask (default: div). */
  as?: T;
  className?: string;
  /** Seconds — applied to the reveal transition. */
  delay?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

export function MaskedText<T extends ElementType = "div">({
  as,
  children,
  className,
  delay = 0,
  ...rest
}: MaskedTextProps<T>) {
  const Tag = (as ?? "div") as React.JSX.ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const prefersReducedMotion = useReducedMotion();

  const revealed = prefersReducedMotion || isInView;

  return (
    <Tag
      ref={ref}
      className={["overflow-hidden", className].filter(Boolean).join(" ")}
      {...(rest as ComponentPropsWithoutRef<T>)}
    >
      <motion.span
        className="block"
        initial={false}
        animate={revealed ? { y: "0%" } : { y: "110%" }}
        transition={{
          duration: DURATION_MEDIUM,
          ease: EASE_OUT_EXPO,
          delay: prefersReducedMotion ? 0 : delay,
        }}
        style={{ willChange: "transform" }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}
