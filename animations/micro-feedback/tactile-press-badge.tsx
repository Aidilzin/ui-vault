/**
 * Clean-room micro-feedback primitive distilled from Ripplix tactile detent interactions.
 * Crisp 120ms physical micro-detent press with tabular-nums counter tick.
 */
import { useState } from "react";

export interface TactilePressBadgeProps {
  label?: string;
  initialCount?: number;
  accentColor?: string;
}

export function TactilePressBadge({
  label = "ENDORSE",
  initialCount = 42,
  accentColor = "#34d399",
}: TactilePressBadgeProps) {
  const [count, setCount] = useState(initialCount);
  const [pressed, setPressed] = useState(false);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <button
      type="button"
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onClick={() => setCount((c) => c + 1)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 14px",
        background: "#15181e",
        border: `1px solid ${pressed ? accentColor : "rgba(255, 255, 255, 0.16)"}`,
        borderRadius: 4,
        color: "#e8ecf2",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: 11,
        letterSpacing: "0.06em",
        cursor: "pointer",
        transform: pressed && !reduced ? "scale(0.95) translateY(1px)" : "scale(1) translateY(0)",
        transition: reduced
          ? "none"
          : "transform 120ms cubic-bezier(0.22, 1, 0.36, 1), border-color 120ms ease",
      }}
    >
      <span>{label}</span>
      <span
        style={{
          fontVariantNumeric: "tabular-nums",
          color: accentColor,
          padding: "1px 6px",
          borderRadius: 2,
          background: "rgba(52, 211, 153, 0.12)",
        }}
      >
        {count}
      </span>
    </button>
  );
}
