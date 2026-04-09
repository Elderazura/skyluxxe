"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, type ReactNode } from "react";

import { EASE_OUT_EXPO } from "@/lib/animations";

const REVEAL_DURATION = 1.2;

export type RevealImageProps = {
  className?: string;
  parallax?: boolean;
  priority?: boolean;
  responsive?: boolean;
  children?: ReactNode;
} & (
  | { src: string; alt: string; width: number; height: number }
  | { src?: never; alt?: never; width?: never; height?: never }
);

export function RevealImage({
  src,
  alt,
  width,
  height,
  className,
  parallax = false,
  priority = false,
  responsive = false,
  children,
}: RevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const revealed = prefersReducedMotion || isInView;

  const hasImage = !!src;

  const frameStyle =
    hasImage && responsive
      ? ({ width: "100%", maxWidth: width, aspectRatio: `${width} / ${height}` } as const)
      : hasImage
        ? ({ width, height } as const)
        : undefined;

  return (
    <div
      ref={containerRef}
      className={["relative overflow-hidden", className].filter(Boolean).join(" ")}
    >
      <motion.div
        className="relative overflow-hidden"
        style={frameStyle}
        initial={false}
        animate={
          revealed
            ? { clipPath: "inset(0 0 0 0)" }
            : { clipPath: "inset(0 0 100% 0)" }
        }
        transition={{
          duration: REVEAL_DURATION,
          ease: EASE_OUT_EXPO,
        }}
      >
        <motion.div
          className="relative h-full w-full overflow-hidden"
          style={
            parallax && !prefersReducedMotion
              ? { y: parallaxY, willChange: "transform" }
              : undefined
          }
        >
          <motion.div
            className="relative h-full w-full"
            initial={false}
            animate={revealed ? { scale: 1 } : { scale: 1.05 }}
            transition={{
              duration: REVEAL_DURATION,
              ease: EASE_OUT_EXPO,
            }}
            style={{ willChange: "transform" }}
          >
            {children ??
              (hasImage &&
                (responsive ? (
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    priority={priority}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  />
                ) : (
                  <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    priority={priority}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                )))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
