import { useMemo, useState, type CSSProperties } from "react";

export type UptimeStatus = "operational" | "degraded" | "outage";

export interface UptimeSegment {
  label: string;
  status: UptimeStatus;
  uptimePct: number;
}

export interface UptimeStripProps {
  segments?: UptimeSegment[];
  serviceName?: string;
  className?: string;
  style?: CSSProperties;
}

function buildDefaultSegments(): UptimeSegment[] {
  return Array.from({ length: 60 }, (_, idx) => {
    const day = 60 - idx;
    const status: UptimeStatus =
      idx === 19 ? "outage" : idx === 38 || idx === 47 ? "degraded" : "operational";
    const uptimePct =
      status === "outage" ? 96.4 : status === "degraded" ? 99.2 : 100;
    return {
      label: day === 1 ? "Today" : `${day}d ago`,
      status,
      uptimePct,
    };
  });
}

const DEFAULT_SEGMENTS = buildDefaultSegments();

/**
 * 60-segment operational/degraded/outage strip with bounded inline hover inspection.
 */
export function UptimeStrip({
  segments = DEFAULT_SEGMENTS,
  serviceName = "EDGE API",
  className,
  style,
}: UptimeStripProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const avgUptime = useMemo(() => {
    if (segments.length === 0) return 100;
    const sum = segments.reduce((acc, s) => acc + s.uptimePct, 0);
    return sum / segments.length;
  }, [segments]);

  const active = activeIdx !== null ? segments[activeIdx] : null;

  const statusColor = (status: UptimeStatus) => {
    if (status === "outage") return "var(--tel-danger, var(--fui-signal-fault, #f43f5e))";
    if (status === "degraded") return "var(--tel-warn, var(--fui-signal-warn, #f59e0b))";
    return "var(--tel-ok, var(--fui-signal-ok, #34d399))";
  };

  return (
    <div
      className={className}
      role="img"
      aria-label={`${serviceName} uptime ${avgUptime.toFixed(2)}% over ${segments.length} intervals`}
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
          {serviceName}
        </span>
        <span
          style={{
            color: active
              ? statusColor(active.status)
              : "var(--tel-ok, var(--fui-signal-ok, #34d399))",
            fontWeight: 600,
          }}
        >
          {active
            ? `${active.label} · ${active.status.toUpperCase()} (${active.uptimePct.toFixed(1)}%)`
            : `${avgUptime.toFixed(2)}% NOMINAL`}
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${segments.length}, minmax(0, 1fr))`,
          gap: 2,
          height: 26,
          alignItems: "stretch",
        }}
        onMouseLeave={() => setActiveIdx(null)}
      >
        {segments.map((seg, idx) => {
          const isHovered = activeIdx === idx;
          return (
            <button
              key={idx}
              type="button"
              aria-label={`${seg.label}: ${seg.status} (${seg.uptimePct}%)`}
              onMouseEnter={() => setActiveIdx(idx)}
              onFocus={() => setActiveIdx(idx)}
              onBlur={() => setActiveIdx(null)}
              style={{
                appearance: "none",
                border: "none",
                padding: 0,
                borderRadius: 1,
                cursor: "pointer",
                background: statusColor(seg.status),
                opacity: activeIdx === null || isHovered ? 0.92 : 0.42,
                transform: isHovered ? "scaleY(1.12)" : "none",
                transition: "opacity 100ms ease, transform 100ms ease",
              }}
            />
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 4,
          fontFamily: "var(--font-mono, monospace)",
          fontSize: 9,
          color: "var(--tel-muted, var(--fui-ink-muted, currentColor))",
        }}
      >
        <span>{segments[0]?.label ?? "60d ago"}</span>
        <span>{segments[segments.length - 1]?.label ?? "Today"}</span>
      </div>
    </div>
  );
}
