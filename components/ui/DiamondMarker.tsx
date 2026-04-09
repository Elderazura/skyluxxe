import { brand } from "@/content/brand";

const SIZE_PX = {
  sm: 4,
  md: 6,
  lg: 8,
} as const;

export type DiamondMarkerProps = {
  color?: "rose-gold" | "gold";
  className?: string;
  size?: keyof typeof SIZE_PX;
};

export function DiamondMarker({
  color = "rose-gold",
  className,
  size = "md",
}: DiamondMarkerProps) {
  const px = SIZE_PX[size];
  const hex = color === "gold" ? brand.colors.gold : brand.colors.roseGold;
  const glow =
    color === "gold"
      ? `0 0 10px color-mix(in srgb, ${hex} 45%, transparent)`
      : `0 0 12px color-mix(in srgb, ${hex} 45%, transparent)`;

  return (
    <span
      role="presentation"
      aria-hidden
      className={["inline-block align-middle", className].filter(Boolean).join(" ")}
      style={{
        width: px,
        height: px,
        backgroundColor: hex,
        transform: "rotate(45deg)",
        boxShadow: glow,
        verticalAlign: "middle",
      }}
    />
  );
}
