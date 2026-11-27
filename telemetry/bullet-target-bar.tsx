import type { CSSProperties } from "react";

export interface BulletTargetBarProps {
  label?: string;
  value: number;
  target: number;
  max?: number;
  unit?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Stephen Few bullet bar showing actual value, vertical target marker, and 3 qualitative bands.
 */
export function BulletTargetBar({
  label = "SLA TARGET",
  value,
  target,
  max = 100,
  unit = "%",
  className,
  style,
}: BulletTargetBarProps) {
  const clamp = (v: number) => Math.max(0, Math.min(max, v));
  const valPct = (clamp(value) / max) * 100;
  const tgtPct = (clamp(target) / max) * 100;
  const meets = value >= target;

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 10 }}>
        <span style={{ color: "var(--tel-muted, #8b94a3)", letterSpacing: "0.06em" }}>
          {label}
        </span>
        <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 600, color: meets ? "var(--tel-ok, #34d399)" : "var(--tel-warn, #f59e0b)" }}>
          {value}{unit} <span style={{ color: "var(--tel-muted, #8b94a3)", fontWeight: 400 }}>/ {target}{unit}</span>
        </span>
      </div>

      <svg viewBox="0 0 240 28" width="100%" height="28" role="img" aria-label={`${label}: ${value}${unit} vs target ${target}${unit}`}>
        <rect x="0" y="5" width="240" height="18" rx="2" fill="var(--tel-border, rgba(255,255,255,0.14))" opacity="0.32" />
        <rect x="0" y="5" width="180" height="18" rx="2" fill="var(--tel-border, rgba(255,255,255,0.14))" opacity="0.45" />
        <rect x="0" y="5" width="120" height="18" rx="2" fill="var(--tel-border, rgba(255,255,255,0.14))" opacity="0.62" />
        <rect
          x="0"
          y="10"
          width={(valPct / 100) * 240}
          height="8"
          rx="1.5"
          fill="var(--tel-accent, #38bdf8)"
        />
        <line
          x1={(tgtPct / 100) * 240}
          y1="2"
          x2={(tgtPct / 100) * 240}
          y2="26"
          stroke="var(--tel-ink, #e8ecf2)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
