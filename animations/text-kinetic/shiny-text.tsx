/**
 * Adapted from React Bits (`https://reactbits.dev/r/ShinyText-TS-CSS.json`).
 * License: MIT (React Bits Open Registry).
 * Zero-dependency metallic specular sweep across display text with prefers-reduced-motion fallback.
 */
import type { CSSProperties } from "react";

export interface ShinyTextProps {
  text: string;
  speedSec?: number;
  baseColor?: string;
  shineColor?: string;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

const KEYFRAMES = `
@keyframes uv-shiny-text-sweep {
  0% { background-position: 120% 0; }
  100% { background-position: -120% 0; }
}
@media (prefers-reduced-motion: reduce) {
  .uv-shiny-text-span { animation: none !important; }
}
`;

export function ShinyText({
  text,
  speedSec = 3.2,
  baseColor = "#7a8494",
  shineColor = "#ffffff",
  disabled = false,
  className,
  style,
}: ShinyTextProps) {
  return (
    <>
      <style>{KEYFRAMES}</style>
      <span
        className={`uv-shiny-text-span ${className ?? ""}`.trim()}
        style={{
          display: "inline-block",
          backgroundImage: `linear-gradient(120deg, ${baseColor} 38%, ${shineColor} 50%, ${baseColor} 62%)`,
          backgroundSize: "220% 100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          animation: disabled ? "none" : `uv-shiny-text-sweep ${speedSec}s linear infinite`,
          ...style,
        }}
      >
        {text}
      </span>
    </>
  );
}
