import { useId, useState, type CSSProperties } from "react";

export interface InlineSparklineProps {
  data?: number[];
  label?: string;
  unit?: string;
  height?: number;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_DATA = [18, 22, 19, 27, 25, 31, 29, 36, 34, 41, 38, 44, 42, 49, 46];

/**
 * Crisp SVG trend sparkline with subtle gradient fill and interactive pointer scrubber.
 * Zero external dependencies; adapts to light and dark surfaces via --tel-* tokens.
 */
export function InlineSparkline({
  data = DEFAULT_DATA,
  label = "REQ/SEC",
  unit = "k",
  height = 68,
  className,
  style,
}: InlineSparklineProps) {
  const gradId = useId();
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const safeData = data.length >= 2 ? data : [0, 1];
  const min = Math.min(...safeData);
  const max = Math.max(...safeData);
  const span = max - min || 1;

  const vw = 240;
  const vh = 64;
  const padX = 4;
  const padY = 6;
  const plotW = vw - padX * 2;
  const plotH = vh - padY * 2;

  const points = safeData.map((val, idx) => {
    const x = padX + (idx / (safeData.length - 1)) * plotW;
    const y = padY + plotH - ((val - min) / span) * plotH;
    return { x, y, val };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L${points[points.length - 1].x.toFixed(1)},${vh} L${points[0].x.toFixed(1)},${vh} Z`;

  const activeIdx = hoverIdx ?? points.length - 1;
  const activePt = points[activeIdx] ?? points[points.length - 1];

  return (
    <div
      className={className}
      role="img"
      aria-label={`${label} sparkline, latest ${activePt.val}${unit}`}
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
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 8,
          marginBottom: 4,
          fontSize: 11,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: 10,
            letterSpacing: "0.06em",
            color: "var(--tel-muted, var(--fui-ink-muted, currentColor))",
          }}
        >
          {label} {hoverIdx !== null ? `· PT #${hoverIdx + 1}` : "· LIVE"}
        </span>
        <strong
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: 12,
            color: "var(--tel-accent, var(--fui-signal-active, currentColor))",
          }}
        >
          {activePt.val.toFixed(1)}
          {unit}
        </strong>
      </div>

      <svg
        viewBox={`0 0 ${vw} ${vh}`}
        width="100%"
        height={height}
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", cursor: "crosshair" }}
        onPointerMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const relX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
          setHoverIdx(Math.round(relX * (points.length - 1)));
        }}
        onPointerLeave={() => setHoverIdx(null)}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--tel-accent, var(--fui-signal-active, currentColor))"
              stopOpacity="0.28"
            />
            <stop
              offset="100%"
              stopColor="var(--tel-accent, var(--fui-signal-active, currentColor))"
              stopOpacity="0.01"
            />
          </linearGradient>
        </defs>

        <path d={areaPath} fill={`url(#${gradId})`} />
        <path
          d={linePath}
          fill="none"
          stroke="var(--tel-accent, var(--fui-signal-active, currentColor))"
          strokeWidth="1.75"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {hoverIdx !== null && (
          <line
            x1={activePt.x}
            y1={padY}
            x2={activePt.x}
            y2={vh}
            stroke="var(--tel-border, rgba(128,128,128,0.35))"
            strokeDasharray="2 2"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        )}

        <circle
          cx={activePt.x}
          cy={activePt.y}
          r="3.2"
          fill="var(--tel-accent, var(--fui-signal-active, currentColor))"
          stroke="var(--tel-surface, #0f1115)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
