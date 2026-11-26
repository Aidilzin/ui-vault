/**
 * Adapted from Magic UI (`https://magicui.design/r/number-ticker.json`).
 * License: MIT (Magic UI Open Registry).
 * Zero-dependency vertical digit-wheel odometer ticker with prefers-reduced-motion fallback.
 */
import type { CSSProperties } from "react";

export interface OdometerTickerProps {
  value: number;
  padLength?: number;
  style?: CSSProperties;
}

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export function OdometerTicker({
  value,
  padLength = 4,
  style,
}: OdometerTickerProps) {
  const str = Math.max(0, Math.floor(value)).toString().padStart(padLength, "0");
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <span
      aria-label={String(value)}
      style={{
        display: "inline-flex",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontVariantNumeric: "tabular-nums",
        lineHeight: "1.2em",
        ...style,
      }}
    >
      {Array.from(str).map((ch, idx) => {
        const digit = Number(ch);
        return (
          <span
            key={idx}
            aria-hidden="true"
            style={{
              display: "inline-block",
              height: "1.2em",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                transform: `translate3d(0, -${digit * 1.2}em, 0)`,
                transition: reduced
                  ? "none"
                  : `transform ${340 + idx * 45}ms cubic-bezier(0.22, 1, 0.36, 1)`,
              }}
            >
              {DIGITS.map((d) => (
                <span key={d} style={{ height: "1.2em", display: "block" }}>
                  {d}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
