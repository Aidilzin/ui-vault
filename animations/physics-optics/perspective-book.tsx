/**
 * Adapted from @spell (`https://spell.sh/r/perspective-book.json`).
 * License: MIT.
 * Zero-dependency 3D CSS hardcover book object with spine, page block, and cover tilt on hover.
 */
import { useState } from "react";

export interface PerspectiveBookProps {
  title?: string;
  subtitle?: string;
  coverColor?: string;
}

export function PerspectiveBook({
  title = "UI VAULT",
  subtitle = "EDITION 2026",
  coverColor = "#1e293b",
}: PerspectiveBookProps) {
  const [hovered, setHovered] = useState(false);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ perspective: 700, cursor: "pointer", padding: "8px 16px" }}
    >
      <div
        style={{
          position: "relative",
          width: 112,
          height: 142,
          transformStyle: "preserve-3d",
          transform: hovered && !reduced ? "rotateY(-24deg) translateX(4px)" : "rotateY(-6deg)",
          transition: reduced ? "none" : "transform 320ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Page block edge */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 4,
            bottom: 4,
            right: -8,
            width: 12,
            background: "repeating-linear-gradient(90deg, #e2e8f0 0px, #cbd5e1 2px, #f8fafc 3px)",
            transform: "rotateY(90deg) translateZ(-4px)",
            borderRadius: "0 2px 2px 0",
          }}
        />
        {/* Front cover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "2px 6px 6px 2px",
            background: `linear-gradient(135deg, ${coverColor} 0%, #0f172a 100%)`,
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "inset 10px 0 12px rgba(0,0,0,0.45)",
            padding: "14px 12px 12px 18px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            color: "#f8fafc",
          }}
        >
          <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 8, color: "#38bdf8" }}>{subtitle}</span>
          <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em" }}>{title}</div>
        </div>
      </div>
    </div>
  );
}
