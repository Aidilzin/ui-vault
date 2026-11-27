import { useState, type CSSProperties } from "react";

export interface WhiskerRow {
  id: string;
  label: string;
  min: number;
  p50: number;
  max: number;
}

export interface LatencyWhiskerBandProps {
  rows: WhiskerRow[];
  unit?: string;
  title?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Horizontal min / p50 median / max whisker range bars comparing spread across services.
 */
export function LatencyWhiskerBand({
  rows,
  unit = "ms",
  title = "REGION SPREAD",
  className,
  style,
}: LatencyWhiskerBandProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const ceiling = Math.max(1, ...rows.map((r) => r.max));
  const active = hoverIdx !== null ? rows[hoverIdx] : rows[0];

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
        <span style={{ color: "var(--tel-muted, #8b94a3)", letterSpacing: "0.06em" }}>
          {title}
        </span>
        {active && (
          <span style={{ fontVariantNumeric: "tabular-nums", color: "var(--tel-ink, #e8ecf2)" }}>
            {active.label}: {active.min}–{active.max}{unit} (p50 {active.p50}{unit})
          </span>
        )}
      </div>

      <svg
        viewBox={`0 0 240 ${rows.length * 22 + 4}`}
        width="100%"
        role="img"
        aria-label={title}
        onMouseLeave={() => setHoverIdx(null)}
      >
        {rows.map((row, i) => {
          const y = i * 22 + 12;
          const x0 = 56;
          const span = 176;
          const xMin = x0 + (row.min / ceiling) * span;
          const xP50 = x0 + (row.p50 / ceiling) * span;
          const xMax = x0 + (row.max / ceiling) * span;
          const isHot = hoverIdx === i;

          return (
            <g
              key={row.id}
              onMouseEnter={() => setHoverIdx(i)}
              style={{ cursor: "pointer" }}
            >
              <rect x="0" y={y - 9} width="240" height="18" fill="transparent" />
              <text
                x="0"
                y={y + 3}
                fontSize="9"
                fill={isHot ? "var(--tel-accent, #38bdf8)" : "var(--tel-muted, #8b94a3)"}
              >
                {row.label}
              </text>
              <line x1={x0} y1={y} x2={x0 + span} y2={y} stroke="var(--tel-border, rgba(255,255,255,0.14))" strokeWidth="1" />
              <line x1={xMin} y1={y} x2={xMax} y2={y} stroke="var(--tel-accent, #38bdf8)" strokeWidth="2.5" opacity={isHot ? 1 : 0.78} />
              <line x1={xMin} y1={y - 4} x2={xMin} y2={y + 4} stroke="var(--tel-accent, #38bdf8)" strokeWidth="1.5" />
              <line x1={xMax} y1={y - 4} x2={xMax} y2={y + 4} stroke="var(--tel-accent, #38bdf8)" strokeWidth="1.5" />
              <circle cx={xP50} cy={y} r={isHot ? 4 : 3} fill="var(--tel-ink, #e8ecf2)" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
