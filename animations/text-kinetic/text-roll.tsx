/**
 * Adapted from Motion Primitives (`https://motion-primitives.com/c/text-roll.json`).
 * License: MIT (Motion Primitives Open Registry).
 * Zero-dependency split-flap vertical character roll on hover/focus with prefers-reduced-motion fallback.
 */
import { useState } from "react";

export interface TextRollProps {
  text: string;
  staggerMs?: number;
  durationMs?: number;
  className?: string;
}

export function TextRoll({
  text,
  staggerMs = 22,
  durationMs = 280,
  className,
}: TextRollProps) {
  const [active, setActive] = useState(false);
  const chars = Array.from(text);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <span
      className={className}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      style={{ display: "inline-flex", cursor: "pointer", userSelect: "none" }}
      aria-label={text}
    >
      {chars.map((char, idx) => {
        const display = char === " " ? "\u00A0" : char;
        return (
          <span
            key={`${char}-${idx}`}
            aria-hidden="true"
            style={{
              position: "relative",
              display: "inline-block",
              overflow: "hidden",
              height: "1.15em",
              lineHeight: "1.15em",
            }}
          >
            <span
              style={{
                display: "block",
                transform:
                  active && !reduced ? "translate3d(0, -100%, 0)" : "translate3d(0, 0%, 0)",
                transition: reduced
                  ? "none"
                  : `transform ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) ${idx * staggerMs}ms`,
              }}
            >
              {display}
            </span>
            <span
              style={{
                position: "absolute",
                inset: 0,
                display: "block",
                transform:
                  active && !reduced ? "translate3d(0, 0%, 0)" : "translate3d(0, 100%, 0)",
                transition: reduced
                  ? "none"
                  : `transform ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) ${idx * staggerMs}ms`,
              }}
            >
              {display}
            </span>
          </span>
        );
      })}
    </span>
  );
}
