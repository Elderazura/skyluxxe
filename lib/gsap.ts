import type { gsap as GSAPNamespace } from "gsap";
import type { ScrollTrigger as ScrollTriggerPlugin } from "gsap/ScrollTrigger";

export type GSAPWithScrollTrigger = {
  gsap: typeof GSAPNamespace;
  ScrollTrigger: typeof ScrollTriggerPlugin;
};

/**
 * Client-only GSAP bootstrap for Next.js. Call from `useEffect` or client components.
 */
export async function registerGSAP(): Promise<GSAPWithScrollTrigger> {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);

  gsap.registerPlugin(ScrollTrigger);

  return { gsap, ScrollTrigger };
}
