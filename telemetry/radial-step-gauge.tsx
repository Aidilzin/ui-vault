import type { CSSProperties } from "react";

export interface RadialStepGaugeProps {
  value?: number;
  max?: number;
  segments?: number;
  label?: string;
  unit?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Segmented hardware/FUI circular arc gauge with centered tabular readout.
 */
export function RadialStepGauge({
  value = 74,
  max = 100,
  segments = 24,
  label = "GPU LOAD",
  unit = "%",
  className,
  style,
}: RadialStepGaugeProps) {
  const clamped = Math.max(0, Math.min(max, value));
  const ratio = max > 0 ? clamped / max : 0;
  const activeCount = Math.round(ratio * segments);

  const cx = 64;
  const cy = 60;
  const rInner = 37;
  const rOuter = 48;
  const startDeg = 135;
  const sweepDeg = 270;

  const toneColor =
    ratio >= 0.85
      ? "var(--tel-danger, var(--fui-signal-fault, #f43f5e))"
      : ratio >= 0.65
        ? "var(--tel-warn, var(--fui-signal-warn, #f59e0b))"
        : "var(--tel-accent, var(--fui-signal-active, currentColor))";

  return (
    <div
      className={className}
      role="img"
      aria-label={`${label}: ${clamped}${unit}`}
      style={{
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        fontVariantNumeric: "tabular-nums",
        color: "var(--tel-ink, var(--fui-ink, currentColor))",
        ...style,
      }}
    >
      <svg
        viewBox="0 0 128 106"
        width="100%"
        style={{ display: "block", width: "100%", maxWidth: 148, height: "auto" }}
      >
        {Array.from({ length: segments }, (_, idx) => {
          const deg = startDeg + (idx / Math.max(1, segments - 1)) * sweepDeg;
          const rad = (deg * Math.PI) / 180;
          const x1 = cx + Math.cos(rad) * rInner;
          const y1 = cy + Math.sin(rad) * rInner;
          const x2 = cx + Math.cos(rad) * rOuter;
          const y2 = cy + Math.sin(rad) * rOuter;
          const lit = idx < activeCount;

          return (
            <line
              key={idx}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={lit ? toneColor : "var(--tel-border, rgba(128,128,128,0.28))"}
              strokeWidth={lit ? 3.2 : 2.2}
              strokeLinecap="round"
              style={{ transition: "stroke 180ms ease" }}
            />
          );
        })}

        <text
          x={cx}
          y={cy + 2}
          textAnchor="middle"
          fontSize="20"
          fontWeight="700"
          fontFamily="var(--font-mono, monospace)"
          fill="var(--tel-ink, var(--fui-ink, currentColor))"
        >
          {Math.round(clamped)}
          <tspan fontSize="10" fill="var(--tel-muted, var(--fui-ink-muted, currentColor))">
            {unit}
          </tspan>
        </text>
        <text
          x={cx}
          y={cy + 22}
          textAnchor="middle"
          fontSize="8.5"
          fontFamily="var(--font-mono, monospace)"
          letterSpacing="0.08em"
          fill="var(--tel-muted, var(--fui-ink-muted, currentColor))"
        >
          {label}
        </text>
      </svg>
    </div>
  );
}
