/**
 * Adapted from Magic UI (`https://magicui.design/r/border-beam.json`).
 * License: MIT (Magic UI Open Registry).
 * Zero-dependency continuous conic perimeter light beam with prefers-reduced-motion fallback.
 */
import type { HTMLAttributes, ReactNode } from "react";

export interface BorderBeamProps extends HTMLAttributes<HTMLDivElement> {
  colorFrom?: string;
  colorTo?: string;
  durationSec?: number;
  borderRadius?: number;
  children: ReactNode;
}

const KEYFRAMES = `
@keyframes uv-border-beam-spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .uv-border-beam-arc { animation: none !important; opacity: 0.35; }
}
`;

export function BorderBeam({
  colorFrom = "#38bdf8",
  colorTo = "#34d399",
  durationSec = 4.5,
  borderRadius = 6,
  children,
  style,
  className,
  ...props
}: BorderBeamProps) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        borderRadius,
        padding: 1.5,
        overflow: "hidden",
        ...style,
      }}
      {...props}
    >
      <style>{KEYFRAMES}</style>
      <div
        aria-hidden="true"
        className="uv-border-beam-arc"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "220%",
          aspectRatio: "1 / 1",
          background: `conic-gradient(from 0deg, transparent 0deg, transparent 270deg, ${colorFrom} 320deg, ${colorTo} 355deg, transparent 360deg)`,
          animation: `uv-border-beam-spin ${durationSec}s linear infinite`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius: Math.max(0, borderRadius - 1.5),
          background: "#0f1115",
        }}
      >
        {children}
      </div>
    </div>
  );
}
