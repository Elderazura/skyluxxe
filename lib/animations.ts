import type { Variants } from "framer-motion";

export const EASE_OUT_EXPO: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];
export const EASE_IN_OUT_CUBIC: [number, number, number, number] = [
  0.65, 0, 0.35, 1,
];

export const DURATION_SLOW = 1.4;
export const DURATION_MEDIUM = 1.0;
export const DURATION_FAST = 0.8;

const transitionBase = {
  ease: EASE_OUT_EXPO,
} as const;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION_MEDIUM,
      ...transitionBase,
    },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_MEDIUM,
      ...transitionBase,
    },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION_MEDIUM,
      ...transitionBase,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
      ease: EASE_IN_OUT_CUBIC,
    },
  },
};

export const maskReveal: Variants = {
  hidden: {
    clipPath: "inset(100% 0 0 0)",
    opacity: 0,
  },
  visible: {
    clipPath: "inset(0 0 0 0)",
    opacity: 1,
    transition: {
      duration: DURATION_SLOW,
      ease: EASE_OUT_EXPO,
    },
  },
};

export const lineDrawLeft: Variants = {
  hidden: {
    scaleX: 0,
    transformOrigin: "left center",
  },
  visible: {
    scaleX: 1,
    transformOrigin: "left center",
    transition: {
      duration: DURATION_MEDIUM,
      ease: EASE_IN_OUT_CUBIC,
    },
  },
};

export const letterReveal: Variants = {
  hidden: {
    opacity: 0,
    y: "0.35em",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_FAST,
      ease: EASE_OUT_EXPO,
    },
  },
};

export const imageReveal: Variants = {
  hidden: {
    clipPath: "inset(0 0 100% 0)",
  },
  visible: {
    clipPath: "inset(0 0 0 0)",
    transition: {
      duration: DURATION_SLOW,
      ease: EASE_OUT_EXPO,
    },
  },
};
