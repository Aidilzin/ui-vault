/**
 * Adapted from React Bits (`https://reactbits.dev/r/StarBorder-TS-CSS.json`).
 * License: MIT (React Bits Open Registry).
 * Zero-dependency orbiting luminous border beam with prefers-reduced-motion fallback.
 */
import type { HTMLAttributes, ReactNode } from "react";

export interface StarBorderProps extends HTMLAttributes<HTMLDivElement> {
  color?: string;
  speedSec?: number;
  borderRadius?: number;
  children: ReactNode;
}

const KEYFRAMES = `
@keyframes uv-star-border-bottom {
  0% { transform: translate(0%, 0%); opacity: 1; }
  100% { transform: translate(-100%, 0%); opacity: 0; }
}
@keyframes uv-star-border-top {
  0% { transform: translate(0%, 0%); opacity: 1; }
  100% { transform: translate(100%, 0%); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .uv-star-border-glow { animation: none !important; opacity: 0.35 !important; }
}
`;

export function StarBorder({
  color = "#38bdf8",
  speedSec = 5,
  borderRadius = 6,
  children,
  style,
  className,
  ...props
}: StarBorderProps) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        padding: 1,
        borderRadius,
        overflow: "hidden",
        ...style,
      }}
      {...props}
    >
      <style>{KEYFRAMES}</style>
      <div
        aria-hidden="true"
        className="uv-star-border-glow"
        style={{
          position: "absolute",
          width: "300%",
          height: "50%",
          bottom: -10,
          right: "-250%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}, transparent 14%)`,
          animation: `uv-star-border-bottom ${speedSec}s linear infinite alternate`,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        className="uv-star-border-glow"
        style={{
          position: "absolute",
          width: "300%",
          height: "50%",
          top: -10,
          left: "-250%",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}, transparent 14%)`,
          animation: `uv-star-border-top ${speedSec}s linear infinite alternate`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius: Math.max(0, borderRadius - 1),
          background: "#0f1115",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
