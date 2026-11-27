import { useState, type CSSProperties } from "react";

export interface WaterfallStep {
  label: string;
  delta: number;
  isTotal?: boolean;
}

export interface WaterfallDeltaChartProps {
  steps: WaterfallStep[];
  title?: string;
  unit?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Floating cumulative bridge bars attributing step-by-step positive/negative deltas to a final total.
 */
export function WaterfallDeltaChart({
  steps,
  title = "LATENCY BRIDGE",
  unit = "ms",
  className,
  style,
}: WaterfallDeltaChartProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  let running = 0;
  const bars = steps.map((s) => {
    if (s.isTotal) {
      return { ...s, start: 0, end: running };
    }
    const start = running;
    running += s.delta;
    return { ...s, start, end: running };
  });

  const minVal = Math.min(0, ...bars.flatMap((b) => [b.start, b.end]));
  const maxVal = Math.max(1, ...bars.flatMap((b) => [b.start, b.end]));
  const range = Math.max(1, maxVal - minVal);
  const w = 240;
  const h = 76;
  const barW = Math.max(14, Math.floor((w - 12) / Math.max(1, bars.length)) - 6);
  const toY = (v: number) => h - 16 - ((v - minVal) / range) * (h - 24);
  const active = hoverIdx !== null ? bars[hoverIdx] : bars[bars.length - 1];

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        fontFamily: "var(--font-mono, monospace)",
        ...style,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10 }}>
        <span style={{ color: "var(--tel-muted, #8b94a3)", letterSpacing: "0.06em" }}>{title}</span>
        {active && (
          <span style={{ fontVariantNumeric: "tabular-nums", color: "var(--tel-ink, #e8ecf2)" }}>
            {active.label}: {active.isTotal ? active.end : active.delta > 0 ? `+${active.delta}` : active.delta}{unit}
          </span>
        )}
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} role="img" aria-label={title} onMouseLeave={() => setHoverIdx(null)}>
        {bars.map((b, i) => {
          const x = 6 + i * ((w - 12) / bars.length);
          const yTop = Math.min(toY(b.start), toY(b.end));
          const yBot = Math.max(toY(b.start), toY(b.end));
          const fill = b.isTotal
            ? "var(--tel-accent, #38bdf8)"
            : b.delta >= 0
              ? "var(--tel-warn, #f59e0b)"
              : "var(--tel-ok, #34d399)";
          return (
            <g key={b.label} onMouseEnter={() => setHoverIdx(i)} style={{ cursor: "pointer" }}>
              <rect
                x={x}
                y={yTop}
                width={barW}
                height={Math.max(3, yBot - yTop)}
                rx="2"
                fill={fill}
                opacity={hoverIdx === null || hoverIdx === i ? 0.92 : 0.4}
              />
              <text
                x={x + barW / 2}
                y={h - 3}
                textAnchor="middle"
                fontSize="8"
                fill="var(--tel-muted, #8b94a3)"
              >
                {b.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
