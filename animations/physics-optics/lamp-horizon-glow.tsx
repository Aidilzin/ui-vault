/**
 * Adapted from Velora UI (`https://velora.colorlib.com/r/lamp.json`).
 * License: MIT (Velora UI Open Registry).
 * Zero-dependency architectural overhead conic lamp beam reveal with prefers-reduced-motion fallback.
 */
import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

export interface LampHorizonGlowProps {
  color?: string;
  children?: ReactNode;
  style?: CSSProperties;
}

export function LampHorizonGlow({
  color = "#38bdf8",
  children,
  style,
}: LampHorizonGlowProps) {
  const [lit, setLit] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLit(true);
      return;
    }
    const id = requestAnimationFrame(() => setLit(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#07090e",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 6,
        padding: "36px 20px 22px",
        textAlign: "center",
        ...style,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 10,
          left: "50%",
          width: lit ? "72%" : "22%",
          height: 2,
          transform: "translateX(-50%)",
          background: color,
          transition: "width 520ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 12,
          left: "50%",
          width: lit ? "88%" : "30%",
          height: 86,
          transform: "translateX(-50%)",
          background: `radial-gradient(ellipse at top center, ${color}55 0%, transparent 72%)`,
          opacity: lit ? 1 : 0.25,
          transition: "width 520ms cubic-bezier(0.22, 1, 0.36, 1), opacity 520ms ease",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
