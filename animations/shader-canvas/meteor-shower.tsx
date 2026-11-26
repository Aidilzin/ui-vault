/**
 * Adapted from Velora UI (`https://velora.colorlib.com/r/meteors.json`).
 * License: MIT (Velora UI Open Registry).
 * Zero-dependency deterministic CSS meteor streaks with prefers-reduced-motion fallback.
 */
import type { CSSProperties, ReactNode } from "react";

export interface MeteorShowerProps {
  count?: number;
  color?: string;
  children?: ReactNode;
  style?: CSSProperties;
}

const KEYFRAMES = `
@keyframes uv-meteor-fall {
  0% { transform: rotate(215deg) translateX(0); opacity: 0.9; }
  70% { opacity: 0.9; }
  100% { transform: rotate(215deg) translateX(-280px); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .uv-meteor-streak { animation: none !important; opacity: 0.25 !important; }
}
`;

export function MeteorShower({
  count = 8,
  color = "#38bdf8",
  children,
  style,
}: MeteorShowerProps) {
  const streaks = Array.from({ length: count }, (_, i) => ({
    left: `${12 + ((i * 19) % 82)}%`,
    top: `${-8 + ((i * 13) % 36)}%`,
    delay: `${(i * 0.45).toFixed(2)}s`,
    duration: `${(1.8 + (i % 4) * 0.55).toFixed(2)}s`,
  }));

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#07090f",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 6,
        ...style,
      }}
    >
      <style>{KEYFRAMES}</style>
      {streaks.map((s, idx) => (
        <span
          key={idx}
          aria-hidden="true"
          className="uv-meteor-streak"
          style={{
            position: "absolute",
            left: s.left,
            top: s.top,
            width: 58,
            height: 1.5,
            borderRadius: 999,
            background: `linear-gradient(90deg, ${color}, transparent)`,
            animation: `uv-meteor-fall ${s.duration} linear ${s.delay} infinite`,
            pointerEvents: "none",
          }}
        />
      ))}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
