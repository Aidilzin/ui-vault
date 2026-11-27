import { useState, type CSSProperties } from "react";

export interface QuotaSegment {
  id: string;
  label: string;
  value: number;
  tone?: "accent" | "ok" | "warn" | "danger" | "muted";
}

export interface SegmentedQuotaBarProps {
  segments?: QuotaSegment[];
  totalLabel?: string;
  unit?: string;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_SEGMENTS: QuotaSegment[] = [
  { id: "prompt", label: "Prompt", value: 42, tone: "accent" },
  { id: "context", label: "Context", value: 28, tone: "ok" },
  { id: "tools", label: "Tools", value: 16, tone: "warn" },
  { id: "free", label: "Headroom", value: 14, tone: "muted" },
];

/**
 * Multi-series proportional horizontal stack bar with 1px gaps and interactive legend highlight.
 */
export function SegmentedQuotaBar({
  segments = DEFAULT_SEGMENTS,
  totalLabel = "TOKEN BUDGET",
  unit = "k",
  className,
  style,
}: SegmentedQuotaBarProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const total = Math.max(
    1,
    segments.reduce((acc, s) => acc + Math.max(0, s.value), 0)
  );

  const toneColor = (tone: QuotaSegment["tone"]) => {
    switch (tone) {
      case "ok":
        return "var(--tel-ok, var(--fui-signal-ok, #34d399))";
      case "warn":
        return "var(--tel-warn, var(--fui-signal-warn, #f59e0b))";
      case "danger":
        return "var(--tel-danger, var(--fui-signal-fault, #f43f5e))";
      case "muted":
        return "var(--tel-border, rgba(128,128,128,0.35))";
      default:
        return "var(--tel-accent, var(--fui-signal-active, #38bdf8))";
    }
  };

  const activeSeg = segments.find((s) => s.id === activeId);

  return (
    <div
      className={className}
      role="img"
      aria-label={`${totalLabel}: ${total}${unit} total across ${segments.length} series`}
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
          {totalLabel}
        </span>
        <span style={{ fontWeight: 600 }}>
          {activeSeg
            ? `${activeSeg.label}: ${activeSeg.value}${unit} (${Math.round((activeSeg.value / total) * 100)}%)`
            : `${total}${unit} ALLOCATED`}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          gap: 2,
          height: 12,
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
        }}
        onMouseLeave={() => setActiveId(null)}
      >
        {segments.map((seg) => {
          const pct = (Math.max(0, seg.value) / total) * 100;
          const highlighted = activeId === null || activeId === seg.id;
          return (
            <button
              key={seg.id}
              type="button"
              aria-label={`${seg.label}: ${seg.value}${unit}`}
              onMouseEnter={() => setActiveId(seg.id)}
              onFocus={() => setActiveId(seg.id)}
              onBlur={() => setActiveId(null)}
              style={{
                appearance: "none",
                border: "none",
                padding: 0,
                width: `${pct}%`,
                minWidth: pct > 0 ? 4 : 0,
                background: toneColor(seg.tone),
                opacity: highlighted ? 0.95 : 0.32,
                cursor: "pointer",
                transition: "opacity 120ms ease",
              }}
            />
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
          marginTop: 7,
          fontFamily: "var(--font-mono, monospace)",
          fontSize: 9.5,
        }}
        onMouseLeave={() => setActiveId(null)}
      >
        {segments.map((seg) => (
          <button
            key={seg.id}
            type="button"
            onMouseEnter={() => setActiveId(seg.id)}
            onFocus={() => setActiveId(seg.id)}
            onBlur={() => setActiveId(null)}
            style={{
              appearance: "none",
              border: "none",
              background: "transparent",
              padding: 0,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              color:
                activeId === seg.id
                  ? "var(--tel-ink, currentColor)"
                  : "var(--tel-muted, var(--fui-ink-muted, currentColor))",
              fontFamily: "inherit",
              fontSize: "inherit",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: 1,
                background: toneColor(seg.tone),
                display: "inline-block",
              }}
            />
            <span>
              {seg.label} {seg.value}
              {unit}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
