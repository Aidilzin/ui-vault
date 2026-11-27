import { useState, type CSSProperties } from "react";

export interface FunnelStage {
  label: string;
  count: number;
}

export interface FunnelConversionStripProps {
  stages: FunnelStage[];
  title?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Horizontal tapered multi-stage drop-off funnel showing stage counts and conversion rate on hover.
 */
export function FunnelConversionStrip({
  stages,
  title = "PIPELINE FUNNEL",
  className,
  style,
}: FunnelConversionStripProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const top = Math.max(1, stages[0]?.count ?? 1);
  const activeIdx = hoverIdx ?? stages.length - 1;
  const active = stages[activeIdx];
  const convPct = active ? ((active.count / top) * 100).toFixed(1) : "0.0";

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
            {active.label}: {active.count.toLocaleString()} ({convPct}%)
          </span>
        )}
      </div>

      <svg viewBox="0 0 240 46" width="100%" height="46" role="img" aria-label={title} onMouseLeave={() => setHoverIdx(null)}>
        {stages.map((s, i) => {
          const segW = 240 / Math.max(1, stages.length);
          const x1 = i * segW;
          const x2 = x1 + segW - 2;
          const h1 = (s.count / top) * 34;
          const nextCount = stages[i + 1]?.count ?? s.count * 0.88;
          const h2 = (nextCount / top) * 34;
          const y1Top = (36 - h1) / 2;
          const y2Top = (36 - h2) / 2;
          const points = `${x1},${y1Top} ${x2},${y2Top} ${x2},${y2Top + h2} ${x1},${y1Top + h1}`;

          return (
            <g key={s.label} onMouseEnter={() => setHoverIdx(i)} style={{ cursor: "pointer" }}>
              <polygon
                points={points}
                fill="var(--tel-accent, #38bdf8)"
                opacity={hoverIdx === null || hoverIdx === i ? Math.max(0.32, 0.92 - i * 0.16) : 0.2}
              />
              <text
                x={x1 + segW / 2}
                y="44"
                textAnchor="middle"
                fontSize="7.5"
                fill="var(--tel-muted, #8b94a3)"
              >
                {s.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
