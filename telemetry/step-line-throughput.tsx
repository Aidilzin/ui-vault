import { useState, type CSSProperties } from "react";

export interface StepLineThroughputProps {
  data: number[];
  label?: string;
  unit?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Orthogonal step-after SVG line visualizing discrete replica counts or queue depths.
 */
export function StepLineThroughput({
  data,
  label = "REPLICA STEP",
  unit = " pods",
  className,
  style,
}: StepLineThroughputProps) {
  const [idx, setIdx] = useState<number | null>(null);
  const w = 240;
  const h = 48;
  const max = Math.max(1, ...data);
  const min = Math.min(0, ...data);
  const range = Math.max(1, max - min);

  const coords = data.map((v, i) => ({
    x: (i / Math.max(1, data.length - 1)) * w,
    y: h - 6 - ((v - min) / range) * (h - 14),
  }));

  const stepPath = coords
    .map((c, i) => (i === 0 ? `M${c.x.toFixed(1)},${c.y.toFixed(1)}` : `H${c.x.toFixed(1)} V${c.y.toFixed(1)}`))
    .join(" ");

  const activeIdx = idx ?? data.length - 1;
  const activeVal = data[activeIdx] ?? 0;

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        fontFamily: "var(--font-mono, monospace)",
        ...style,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10 }}>
        <span style={{ color: "var(--tel-muted, #8b94a3)", letterSpacing: "0.06em" }}>{label}</span>
        <span style={{ fontVariantNumeric: "tabular-nums", color: "var(--tel-accent, #38bdf8)", fontWeight: 600 }}>
          {activeVal}{unit}
        </span>
      </div>

      <svg
        viewBox={`0 0 ${w} ${h}`}
        width="100%"
        height={h}
        role="img"
        aria-label={label}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const ratio = Math.max(0, Math.min(1, (e.clientX - r.left) / Math.max(1, r.width)));
          setIdx(Math.round(ratio * (data.length - 1)));
        }}
        onMouseLeave={() => setIdx(null)}
      >
        <path d={`${stepPath} V${h} H0 Z`} fill="var(--tel-accent, #38bdf8)" opacity="0.14" />
        <path d={stepPath} fill="none" stroke="var(--tel-accent, #38bdf8)" strokeWidth="2" />
        {coords[activeIdx] && (
          <circle cx={coords[activeIdx].x} cy={coords[activeIdx].y} r="3.2" fill="var(--tel-ink, #e8ecf2)" />
        )}
      </svg>
    </div>
  );
}
