import { useState, type CSSProperties } from "react";

export interface HorizonBandSparklineProps {
  data: number[];
  label?: string;
  unit?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * 3-tier folded horizon area bands encoding high dynamic range in compact vertical height.
 */
export function HorizonBandSparkline({
  data,
  label = "HORIZON LOAD",
  unit = "%",
  className,
  style,
}: HorizonBandSparklineProps) {
  const [idx, setIdx] = useState<number | null>(null);
  const w = 240;
  const h = 42;
  const max = Math.max(1, ...data);
  const bandSize = max / 3;

  const buildBandPath = (tier: number) => {
    const pts = data.map((v, i) => {
      const x = (i / Math.max(1, data.length - 1)) * w;
      const clamped = Math.max(0, Math.min(bandSize, v - tier * bandSize));
      const y = h - (clamped / bandSize) * (h - 4);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    return `M0,${h} L${pts.join(" L")} L${w},${h} Z`;
  };

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
          {activeVal.toFixed(1)}{unit}
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
        style={{ display: "block", borderBottom: "1px solid var(--tel-border, rgba(255,255,255,0.14))" }}
      >
        <path d={buildBandPath(0)} fill="var(--tel-accent, #38bdf8)" opacity="0.22" />
        <path d={buildBandPath(1)} fill="var(--tel-accent, #38bdf8)" opacity="0.46" />
        <path d={buildBandPath(2)} fill="var(--tel-accent, #38bdf8)" opacity="0.82" />
        {idx !== null && (
          <line
            x1={(idx / Math.max(1, data.length - 1)) * w}
            y1="0"
            x2={(idx / Math.max(1, data.length - 1)) * w}
            y2={h}
            stroke="var(--tel-ink, #e8ecf2)"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
        )}
      </svg>
    </div>
  );
}
