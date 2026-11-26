/**
 * Adapted from Eldora UI (`https://eldoraui.site/r/svg-ripple-effect.json`).
 * License: MIT (Eldora UI Open Registry).
 * Zero-dependency concentric expanding SVG radar rings with prefers-reduced-motion fallback.
 */
import type { CSSProperties } from "react";

export interface SvgRipplePulseProps {
  color?: string;
  rings?: number;
  size?: number;
  label?: string;
  style?: CSSProperties;
}

const KEYFRAMES = `
@keyframes uv-svg-ripple {
  0% { transform: scale(0.35); opacity: 0.75; }
  100% { transform: scale(1); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .uv-svg-ripple-ring { animation: none !important; opacity: 0.35 !important; transform: scale(0.75) !important; }
}
`;

export function SvgRipplePulse({
  color = "#38bdf8",
  rings = 4,
  size = 156,
  label = "PING",
  style,
}: SvgRipplePulseProps) {
  return (
    <div style={{ position: "relative", width: size, height: size, display: "grid", placeItems: "center", ...style }}>
      <style>{KEYFRAMES}</style>
      <svg viewBox="0 0 160 160" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} aria-hidden="true">
        {Array.from({ length: rings }, (_, i) => (
          <circle
            key={i}
            cx="80"
            cy="80"
            r="72"
            fill="none"
            stroke={color}
            strokeWidth="1.25"
            className="uv-svg-ripple-ring"
            style={{
              transformOrigin: "80px 80px",
              animation: `uv-svg-ripple 2.8s cubic-bezier(0.22, 1, 0.36, 1) ${(i * 0.7).toFixed(2)}s infinite`,
            }}
          />
        ))}
      </svg>
      <span
        style={{
          position: "relative",
          zIndex: 1,
          padding: "5px 10px",
          borderRadius: 999,
          background: "#0f1115",
          border: `1px solid ${color}88`,
          color,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 10,
        }}
      >
        {label}
      </span>
    </div>
  );
}
