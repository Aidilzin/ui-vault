import { useState, type CSSProperties } from "react";

export interface RadarAxis {
  label: string;
  value: number; // 0..100
}

export interface CompactRadarPolygonProps {
  axes: RadarAxis[];
  title?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Compact 6-axis SVG radar/spider polygon comparing multi-dimensional model or system scores.
 */
export function CompactRadarPolygon({
  axes,
  title = "SYSTEM PROFILE",
  className,
  style,
}: CompactRadarPolygonProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const cx = 80;
  const cy = 62;
  const r = 44;
  const n = Math.max(3, axes.length);

  const pt = (idx: number, ratio: number) => {
    const angle = (Math.PI * 2 * idx) / n - Math.PI / 2;
    return [cx + Math.cos(angle) * r * ratio, cy + Math.sin(angle) * r * ratio] as const;
  };

  const polyPoints = axes
    .map((a, i) => {
      const [x, y] = pt(i, Math.max(0, Math.min(100, a.value)) / 100);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const active = hoverIdx !== null ? axes[hoverIdx] : axes[0];

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        fontFamily: "var(--font-mono, monospace)",
        ...style,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10 }}>
        <span style={{ color: "var(--tel-muted, #8b94a3)", letterSpacing: "0.06em" }}>{title}</span>
        {active && (
          <span style={{ fontVariantNumeric: "tabular-nums", color: "var(--tel-accent, #38bdf8)", fontWeight: 600 }}>
            {active.label} {active.value}/100
          </span>
        )}
      </div>

      <svg viewBox="0 0 160 124" width="100%" height="114" role="img" aria-label={title} onMouseLeave={() => setHoverIdx(null)}>
        {[0.33, 0.66, 1].map((ring) => (
          <polygon
            key={ring}
            points={axes.map((_, i) => pt(i, ring).map((v) => v.toFixed(1)).join(",")).join(" ")}
            fill="none"
            stroke="var(--tel-border, rgba(255,255,255,0.16))"
            strokeWidth="1"
          />
        ))}
        {axes.map((a, i) => {
          const [ex, ey] = pt(i, 1);
          const [lx, ly] = pt(i, 1.22);
          return (
            <g key={a.label}>
              <line x1={cx} y1={cy} x2={ex} y2={ey} stroke="var(--tel-border, rgba(255,255,255,0.14))" strokeWidth="1" />
              <text x={lx} y={ly + 3} textAnchor="middle" fontSize="7.5" fill="var(--tel-muted, #8b94a3)">
                {a.label}
              </text>
            </g>
          );
        })}
        <polygon
          points={polyPoints}
          fill="var(--tel-accent, #38bdf8)"
          fillOpacity="0.24"
          stroke="var(--tel-accent, #38bdf8)"
          strokeWidth="1.6"
        />
        {axes.map((a, i) => {
          const [vx, vy] = pt(i, Math.max(0, Math.min(100, a.value)) / 100);
          return (
            <circle
              key={a.label}
              cx={vx}
              cy={vy}
              r={hoverIdx === i ? 4.2 : 2.8}
              fill="var(--tel-ink, #e8ecf2)"
              stroke="var(--tel-accent, #38bdf8)"
              strokeWidth="1.2"
              onMouseEnter={() => setHoverIdx(i)}
              style={{ cursor: "pointer" }}
            />
          );
        })}
      </svg>
    </div>
  );
}
