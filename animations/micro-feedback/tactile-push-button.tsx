/**
 * Clean-room 3D mechanical push-button primitive inspired by tactile hardware keycaps.
 * Depresses cleanly onto its physical bottom lip with prefers-reduced-motion fallback.
 */
import { useState } from "react";

export interface TactilePushButtonProps {
  label?: string;
  faceColor?: string;
  lipColor?: string;
  inkColor?: string;
  onClick?: () => void;
}

export function TactilePushButton({
  label = "DEPLOY RELEASE",
  faceColor = "#38bdf8",
  lipColor = "#0284c7",
  inkColor = "#090a0c",
  onClick,
}: TactilePushButtonProps) {
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
      onClick={onClick}
      style={{
        position: "relative",
        padding: "10px 20px",
        borderRadius: 6,
        border: "1px solid rgba(255, 255, 255, 0.25)",
        background: faceColor,
        color: inkColor,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.06em",
        cursor: "pointer",
        boxShadow: pressed ? `0 1px 0 ${lipColor}` : `0 5px 0 ${lipColor}`,
        transform: pressed && !reduced ? "translate3d(0, 4px, 0)" : "translate3d(0, 0, 0)",
        transition: reduced
          ? "none"
          : "transform 90ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 90ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {label}
    </button>
  );
}
