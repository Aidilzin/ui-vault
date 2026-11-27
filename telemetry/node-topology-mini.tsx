import { useState, type CSSProperties } from "react";

export interface TopologyHop {
  id: string;
  label: string;
  status: "ok" | "warn" | "fault";
  latencyMs?: number;
}

export interface NodeTopologyMiniProps {
  hops?: TopologyHop[];
  reducedMotion?: boolean;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_HOPS: TopologyHop[] = [
  { id: "edge", label: "EDGE", status: "ok", latencyMs: 4 },
  { id: "router", label: "ROUTER", status: "ok", latencyMs: 7 },
  { id: "agent", label: "AGENT", status: "warn", latencyMs: 14 },
  { id: "store", label: "STORE", status: "ok", latencyMs: 3 },
];

/**
 * Compact SVG service/agent dependency graph with animated packet flow and per-hop latency.
 */
export function NodeTopologyMini({
  hops = DEFAULT_HOPS,
  reducedMotion = false,
  className,
  style,
}: NodeTopologyMiniProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const safeHops = hops.length >= 2 ? hops : DEFAULT_HOPS;

  const vw = 260;
  const vh = 74;
  const padX = 28;
  const stepX = (vw - padX * 2) / Math.max(1, safeHops.length - 1);
  const cy = 34;

  const statusColor = (status: TopologyHop["status"]) => {
    if (status === "fault") return "var(--tel-danger, var(--fui-signal-fault, #f43f5e))";
    if (status === "warn") return "var(--tel-warn, var(--fui-signal-warn, #f59e0b))";
    return "var(--tel-ok, var(--fui-signal-ok, #34d399))";
  };

  const activeHop = safeHops.find((h) => h.id === activeId);
  const totalMs = safeHops.reduce((acc, h) => acc + (h.latencyMs ?? 0), 0);

  return (
    <div
      className={className}
      role="img"
      aria-label={`Service topology with ${safeHops.length} nodes, ${totalMs}ms end-to-end`}
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
          marginBottom: 4,
          fontFamily: "var(--font-mono, monospace)",
          fontSize: 10,
        }}
      >
        <span style={{ color: "var(--tel-muted, var(--fui-ink-muted, currentColor))" }}>
          SERVICE TOPOLOGY
        </span>
        <span style={{ color: "var(--tel-accent, var(--fui-signal-active, currentColor))", fontWeight: 600 }}>
          {activeHop
            ? `${activeHop.label} · ${activeHop.status.toUpperCase()} (${activeHop.latencyMs ?? 0}ms)`
            : `${totalMs}ms E2E`}
        </span>
      </div>

      <svg
        viewBox={`0 0 ${vw} ${vh}`}
        width="100%"
        style={{ display: "block", width: "100%", height: "auto", maxHeight: 78 }}
        onMouseLeave={() => setActiveId(null)}
      >
        {/* Edges + Hop Latency */}
        {safeHops.slice(0, -1).map((hop, idx) => {
          const x1 = padX + idx * stepX;
          const x2 = padX + (idx + 1) * stepX;
          const nextHop = safeHops[idx + 1];
          const midX = (x1 + x2) / 2;

          return (
            <g key={`${hop.id}-${nextHop.id}`}>
              <line
                x1={x1}
                y1={cy}
                x2={x2}
                y2={cy}
                stroke="var(--tel-border, rgba(128,128,128,0.35))"
                strokeWidth="1.5"
              />
              {!reducedMotion && (
                <circle
                  r="2.4"
                  cy={cy}
                  fill="var(--tel-accent, var(--fui-signal-active, #38bdf8))"
                >
                  <animate
                    attributeName="cx"
                    values={`${x1 + 10};${x2 - 10}`}
                    dur={`${1.2 + idx * 0.25}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              <text
                x={midX}
                y={cy - 9}
                textAnchor="middle"
                fontSize="7.5"
                fontFamily="var(--font-mono, monospace)"
                fill="var(--tel-muted, var(--fui-ink-muted, currentColor))"
              >
                {nextHop.latencyMs ?? 0}ms
              </text>
            </g>
          );
        })}

        {/* Nodes */}
        {safeHops.map((hop, idx) => {
          const cx = padX + idx * stepX;
          const isHovered = activeId === hop.id;
          return (
            <g
              key={hop.id}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setActiveId(hop.id)}
            >
              <circle
                cx={cx}
                cy={cy}
                r={isHovered ? 10 : 8.5}
                fill="var(--tel-surface, #0f1115)"
                stroke={
                  isHovered
                    ? "var(--tel-accent, var(--fui-signal-active, #38bdf8))"
                    : "var(--tel-border, rgba(128,128,128,0.45))"
                }
                strokeWidth={isHovered ? 1.8 : 1.2}
              />
              <circle cx={cx} cy={cy} r="3.4" fill={statusColor(hop.status)} />
              <text
                x={cx}
                y={cy + 21}
                textAnchor="middle"
                fontSize="7.5"
                fontFamily="var(--font-mono, monospace)"
                fontWeight="600"
                fill="var(--tel-ink, var(--fui-ink, currentColor))"
              >
                {hop.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
