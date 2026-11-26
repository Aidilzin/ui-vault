/**
 * Adapted from React Bits (`https://reactbits.dev/r/Crosshair-TS-CSS.json`).
 * License: MIT (React Bits Open Registry).
 * Zero-dependency precision FUI crosshair reticle tracking pointer inside container.
 */
import { useState } from "react";
import type { CSSProperties, MouseEvent, ReactNode } from "react";

export interface CrosshairReticleProps {
  color?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function CrosshairReticle({
  color = "rgba(56, 189, 248, 0.5)",
  children,
  className,
  style,
}: CrosshairReticleProps) {
  const [pos, setPos] = useState({ x: 0, y: 0, active: false });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
      active: true,
    });
  };

  return (
    <div
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos((p) => ({ ...p, active: false }))}
      style={{
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: pos.active ? 1 : 0,
          transition: "opacity 140ms ease",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: pos.y,
            height: 1,
            background: color,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: pos.x,
            width: 1,
            background: color,
          }}
        />
        <span
          style={{
            position: "absolute",
            left: pos.x + 8,
            top: Math.max(4, pos.y - 18),
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 10,
            fontVariantNumeric: "tabular-nums",
            color,
          }}
        >
          {pos.x},{pos.y}
        </span>
      </div>
    </div>
  );
}
