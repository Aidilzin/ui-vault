import { useState, type CSSProperties } from "react";

export interface ActivityHeatmapProps {
  values?: number[];
  columns?: number;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_VALUES = [
  0, 1, 2, 1, 3, 4, 2, 1, 0, 2, 3, 2, 4, 3,
  1, 2, 3, 4, 2, 1, 0, 1, 3, 4, 4, 2, 1, 2,
  0, 1, 1, 2, 3, 2, 1, 2, 4, 3, 2, 1, 0, 3,
  2, 3, 4, 3, 2, 4, 3, 1, 2, 3, 4, 4, 3, 2,
];

const LEVEL_OPACITY = [0.09, 0.28, 0.5, 0.74, 0.96];

/**
 * Compact 5-step perceptual intensity heatmap grid with bounded cell inspection.
 */
export function ActivityHeatmap({
  values = DEFAULT_VALUES,
  columns = 14,
  label = "DEPLOY CADENCE",
  className,
  style,
}: ActivityHeatmapProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const rows = Math.max(1, Math.ceil(values.length / columns));
  const cellSize = 12;
  const gap = 3;
  const vw = columns * (cellSize + gap) - gap;
  const vh = rows * (cellSize + gap) - gap;

  const total = values.reduce((acc, v) => acc + v, 0);
  const activeVal = activeIdx !== null ? values[activeIdx] : null;

  return (
    <div
      className={className}
      role="img"
      aria-label={`${label} heatmap, ${total} total events`}
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
          marginBottom: 6,
          fontFamily: "var(--font-mono, monospace)",
          fontSize: 10,
        }}
      >
        <span style={{ color: "var(--tel-muted, var(--fui-ink-muted, currentColor))" }}>
          {label}
        </span>
        <span style={{ color: "var(--tel-accent, var(--fui-signal-active, currentColor))", fontWeight: 600 }}>
          {activeIdx !== null && activeVal !== null
            ? `DAY ${activeIdx + 1} · ${activeVal * 3} EVENTS`
            : `${total * 3} EVENTS`}
        </span>
      </div>

      <svg
        viewBox={`0 0 ${vw} ${vh}`}
        width="100%"
        style={{ display: "block", width: "100%", height: "auto", maxHeight: 74 }}
        onMouseLeave={() => setActiveIdx(null)}
      >
        {values.map((raw, idx) => {
          const level = Math.max(0, Math.min(4, Math.round(raw)));
          const col = idx % columns;
          const row = Math.floor(idx / columns);
          const x = col * (cellSize + gap);
          const y = row * (cellSize + gap);
          const isHovered = activeIdx === idx;
          return (
            <rect
              key={idx}
              x={x}
              y={y}
              width={cellSize}
              height={cellSize}
              rx={2}
              fill={
                level === 0
                  ? "var(--tel-ink, currentColor)"
                  : "var(--tel-accent, var(--fui-signal-active, currentColor))"
              }
              fillOpacity={LEVEL_OPACITY[level]}
              stroke={
                isHovered
                  ? "var(--tel-ink, currentColor)"
                  : "var(--tel-border, transparent)"
              }
              strokeWidth={isHovered ? 1.2 : 0.4}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setActiveIdx(idx)}
            />
          );
        })}
      </svg>
    </div>
  );
}
