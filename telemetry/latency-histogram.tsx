import { useState, type CSSProperties } from "react";

export interface LatencyBucket {
  rangeMs: string;
  count: number;
  percentile?: "p50" | "p95" | "p99";
}

export interface LatencyHistogramProps {
  buckets?: LatencyBucket[];
  label?: string;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_BUCKETS: LatencyBucket[] = [
  { rangeMs: "4ms", count: 14 },
  { rangeMs: "8ms", count: 38 },
  { rangeMs: "12ms", count: 64, percentile: "p50" },
  { rangeMs: "16ms", count: 52 },
  { rangeMs: "20ms", count: 31 },
  { rangeMs: "28ms", count: 19 },
  { rangeMs: "36ms", count: 12, percentile: "p95" },
  { rangeMs: "48ms", count: 7 },
  { rangeMs: "64ms", count: 4, percentile: "p99" },
  { rangeMs: "96ms", count: 2 },
];

/**
 * Distribution histogram with p50/p95/p99 markers and bounded bucket hover stats.
 */
export function LatencyHistogram({
  buckets = DEFAULT_BUCKETS,
  label = "EDGE LATENCY",
  className,
  style,
}: LatencyHistogramProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const maxCount = Math.max(1, ...buckets.map((b) => b.count));

  const vw = 240;
  const vh = 78;
  const topPad = 14;
  const botPad = 14;
  const chartH = vh - topPad - botPad;
  const barGap = 4;
  const barW = (vw - barGap * (buckets.length - 1)) / Math.max(1, buckets.length);

  const active = hoverIdx !== null ? buckets[hoverIdx] : null;
  const p99 = buckets.find((b) => b.percentile === "p99");

  return (
    <div
      className={className}
      role="img"
      aria-label={`${label} histogram, p99 ${p99?.rangeMs ?? "N/A"}`}
      style={{
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        boxSizing: "border-box",
        fontVariantNumeric: "tabular-nums",
        color: "var(--tel-ink, var(--fui-ink, currentColor))",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          marginBottom: 4,
          fontFamily: "var(--font-mono, monospace)",
          fontSize: 10,
        }}
      >
        <span style={{ color: "var(--tel-muted, var(--fui-ink-muted, currentColor))" }}>
          {label}
        </span>
        <span style={{ color: "var(--tel-accent, var(--fui-signal-active, currentColor))", fontWeight: 600 }}>
          {active
            ? `${active.rangeMs} · ${active.count} req${active.percentile ? ` (${active.percentile})` : ""}`
            : `p99 ${p99?.rangeMs ?? "64ms"}`}
        </span>
      </div>

      <svg
        viewBox={`0 0 ${vw} ${vh}`}
        width="100%"
        style={{ display: "block", width: "100%", height: "auto", maxHeight: 84 }}
        onMouseLeave={() => setHoverIdx(null)}
      >
        {buckets.map((b, idx) => {
          const h = Math.max(3, (b.count / maxCount) * chartH);
          const x = idx * (barW + barGap);
          const y = topPad + chartH - h;
          const fill =
            b.percentile === "p99"
              ? "var(--tel-danger, var(--fui-signal-fault, #f43f5e))"
              : b.percentile === "p95"
                ? "var(--tel-warn, var(--fui-signal-warn, #f59e0b))"
                : b.percentile === "p50"
                  ? "var(--tel-ok, var(--fui-signal-ok, #34d399))"
                  : "var(--tel-accent, var(--fui-signal-active, currentColor))";
          const isHovered = hoverIdx === idx;
          return (
            <g
              key={b.rangeMs}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHoverIdx(idx)}
            >
              <rect
                x={x}
                y={y}
                width={barW}
                height={h}
                rx={1.5}
                fill={fill}
                fillOpacity={hoverIdx === null || isHovered ? 0.9 : 0.38}
              />
              {b.percentile && (
                <text
                  x={x + barW / 2}
                  y={10}
                  textAnchor="middle"
                  fontSize="7.5"
                  fontFamily="var(--font-mono, monospace)"
                  fontWeight="700"
                  fill={fill}
                >
                  {b.percentile}
                </text>
              )}
              {(idx === 0 || idx === Math.floor(buckets.length / 2) || idx === buckets.length - 1) && (
                <text
                  x={x + barW / 2}
                  y={vh - 2}
                  textAnchor="middle"
                  fontSize="7"
                  fontFamily="var(--font-mono, monospace)"
                  fill="var(--tel-muted, var(--fui-ink-muted, currentColor))"
                >
                  {b.rangeMs}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
