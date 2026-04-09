import { brand } from "@/content/brand";

export type HairlineRuleProps = {
  className?: string;
  /** Renders a vertical hairline instead of horizontal. */
  vertical?: boolean;
  /** Adds the ambient pulse utility from global styles. */
  breathing?: boolean;
  /** Accent metal for the gradient (default: gold). */
  accent?: "gold" | "rose-gold";
};

const horizontalGradients = {
  gold: `linear-gradient(
  90deg,
  transparent 0%,
  ${brand.colors.gold} 20%,
  ${brand.colors.gold} 50%,
  transparent 100%
)`,
  "rose-gold": `linear-gradient(
  90deg,
  transparent 0%,
  ${brand.colors.roseGold} 20%,
  ${brand.colors.roseGold} 50%,
  transparent 100%
)`,
} as const;

const verticalGradients = {
  gold: `linear-gradient(
  180deg,
  transparent 0%,
  ${brand.colors.gold} 20%,
  ${brand.colors.gold} 50%,
  transparent 100%
)`,
  "rose-gold": `linear-gradient(
  180deg,
  transparent 0%,
  ${brand.colors.roseGold} 20%,
  ${brand.colors.roseGold} 50%,
  transparent 100%
)`,
} as const;

export function HairlineRule({
  className,
  vertical = false,
  breathing = false,
  accent = "gold",
}: HairlineRuleProps) {
  const baseClasses = [
    "block shrink-0 border-0",
    breathing ? "sk-breathing-glow" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const tone = accent === "rose-gold" ? "rose-gold" : "gold";

  if (vertical) {
    return (
      <span
        role="presentation"
        className={baseClasses}
        style={{
          width: 1,
          height: "100%",
          minHeight: "3rem",
          backgroundImage: verticalGradients[tone],
        }}
      />
    );
  }

  return (
    <span
      role="presentation"
      className={[baseClasses, "h-px w-full"].filter(Boolean).join(" ")}
      style={{
        backgroundImage: horizontalGradients[tone],
      }}
    />
  );
}
