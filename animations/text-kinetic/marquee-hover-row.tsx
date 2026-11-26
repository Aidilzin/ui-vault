/**
 * Clean-room React/TypeScript implementation inspired by Codrops CSSMarqueeMenu
 * (`https://github.com/codrops/CSSMarqueeMenu`).
 * Pure CSS transform marquee reveal on hover/focus with prefers-reduced-motion fallback.
 */
import { useState } from "react";
import type { CSSProperties } from "react";

export interface MarqueeHoverRowProps {
  label: string;
  index?: string;
  separator?: string;
  durationSec?: number;
  accentBg?: string;
  accentInk?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

const KEYFRAMES_CSS = `
@keyframes uv-marquee-hover-scroll {
  0% { transform: translate3d(0%, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}
`;

export function MarqueeHoverRow({
  label,
  index,
  separator = " / ",
  durationSec = 7,
  accentBg = "#38bdf8",
  accentInk = "#090a0c",
  className,
  style,
  onClick,
}: MarqueeHoverRowProps) {
  const [hovered, setHovered] = useState(false);

  const isReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const reduced = hovered && isReducedMotion();
  const trackItems = Array.from({ length: 8 }, (_, i) => i);

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "12px 14px",
        overflow: "hidden",
        background: hovered && reduced ? accentBg : "transparent",
        color: hovered && reduced ? accentInk : "inherit",
        border: "none",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        textAlign: "left",
        cursor: "pointer",
        transition: "background-color 140ms ease, color 140ms ease",
        ...style,
      }}
    >
      <style>{KEYFRAMES_CSS}</style>

      {/* Resting static label */}
      <span
        style={{
          display: "inline-flex",
          alignItems: "baseline",
          gap: 10,
          opacity: hovered && !reduced ? 0 : 1,
          transition: "opacity 120ms ease",
          fontWeight: 600,
          letterSpacing: "-0.02em",
        }}
      >
        {index && (
          <span
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: "0.72em",
              opacity: 0.65,
            }}
          >
            {index}
          </span>
        )}
        <span>{label}</span>
      </span>

      {/* Kinetic marquee overlay */}
      {!reduced && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            background: accentBg,
            color: accentInk,
            opacity: hovered ? 1 : 0,
            pointerEvents: "none",
            transition: "opacity 160ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <span
            style={{
              display: "flex",
              width: "max-content",
              whiteSpace: "nowrap",
              willChange: "transform",
              animation: `uv-marquee-hover-scroll ${durationSec}s linear infinite`,
              animationPlayState: hovered ? "running" : "paused",
            }}
          >
            {trackItems.map((i) => (
              <span
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  paddingRight: "0.6em",
                }}
              >
                <span>{label}</span>
                <span style={{ opacity: 0.55, marginLeft: "0.6em" }}>{separator}</span>
              </span>
            ))}
          </span>
        </span>
      )}
    </button>
  );
}
