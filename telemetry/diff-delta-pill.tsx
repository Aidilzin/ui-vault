import type { CSSProperties } from "react";

export type DeltaPolarity = "positive" | "negative" | "neutral";

export interface DiffDeltaPillProps {
  delta?: string;
  label?: string;
  polarity?: DeltaPolarity;
  direction?: "up" | "down" | "flat";
  className?: string;
  style?: CSSProperties;
}

/**
 * Precision trend delta badge (+14.2%, -3.8ms) with vector indicator and semantic polarity.
 */
export function DiffDeltaPill({
  delta = "+14.2%",
  label = "THROUGHPUT",
  polarity = "positive",
  direction = "up",
  className,
  style,
}: DiffDeltaPillProps) {
  const tone =
    polarity === "positive"
      ? "var(--tel-ok, var(--fui-signal-ok, #34d399))"
      : polarity === "negative"
        ? "var(--tel-danger, var(--fui-signal-fault, #f43f5e))"
        : "var(--tel-muted, var(--fui-ink-muted, currentColor))";

  return (
    <div
      className={className}
      role="status"
      aria-label={`${label} ${delta}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 9px",
        borderRadius: 3,
        border: `1px solid color-mix(in srgb, ${tone} 42%, transparent)`,
        background: `color-mix(in srgb, ${tone} 11%, transparent)`,
        color: tone,
        fontFamily: "var(--font-mono, monospace)",
        fontSize: 11,
        fontWeight: 600,
        fontVariantNumeric: "tabular-nums",
        maxWidth: "100%",
        boxSizing: "border-box",
        ...style,
      }}
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        {direction === "up" && (
          <path
            d="M2 7.5L5 2.5L8 7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {direction === "down" && (
          <path
            d="M2 2.5L5 7.5L8 2.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
        {direction === "flat" && (
          <line
            x1="1.5"
            y1="5"
            x2="8.5"
            y2="5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        )}
      </svg>
      <span>{delta}</span>
      {label && (
        <span
          style={{
            fontSize: 9.5,
            letterSpacing: "0.06em",
            opacity: 0.82,
            color: "var(--tel-muted, currentColor)",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
