/**
 * Adapted from Eldora UI (`https://eldoraui.site/r/holographic-card.json`).
 * License: MIT (Eldora UI Open Registry).
 * Zero-dependency pointer-angle iridescent holographic foil card with prefers-reduced-motion fallback.
 */
import { useState } from "react";
import type { CSSProperties, MouseEvent, ReactNode } from "react";

export interface HolographicFoilCardProps {
  children: ReactNode;
  style?: CSSProperties;
}

export function HolographicFoilCard({ children, style }: HolographicFoilCardProps) {
  const [pos, setPos] = useState({ x: 50, y: 50, active: false });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  };

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={() => setPos((p) => ({ ...p, active: false }))}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 8,
        background: "#101218",
        border: "1px solid rgba(255, 255, 255, 0.16)",
        ...style,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: pos.active ? 0.55 : 0.14,
          mixBlendMode: "color-dodge",
          background: `conic-gradient(from ${(pos.x * 2.4).toFixed(0)}deg at ${pos.x.toFixed(1)}% ${pos.y.toFixed(1)}%, #38bdf8, #a855f7, #f43f5e, #f59e0b, #34d399, #38bdf8)`,
          transition: "opacity 200ms ease",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
