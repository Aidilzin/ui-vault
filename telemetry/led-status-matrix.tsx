import { useState, type CSSProperties } from "react";

export type LedState = "active" | "busy" | "warn" | "fault" | "idle";

export interface LedCell {
  id: string;
  state: LedState;
  load?: string;
}

export interface LedStatusMatrixProps {
  cells?: LedCell[];
  columns?: number;
  label?: string;
  reducedMotion?: boolean;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_CELLS: LedCell[] = Array.from({ length: 32 }, (_, idx) => {
  const states: LedState[] = [
    "active",
    "active",
    "busy",
    "active",
    "idle",
    "active",
    "warn",
    "active",
  ];
  const state: LedState = idx === 19 ? "fault" : states[idx % states.length];
  return {
    id: `POD-${String(idx + 1).padStart(2, "0")}`,
    state,
    load: state === "idle" ? "2%" : state === "fault" ? "ERR" : `${28 + ((idx * 13) % 64)}%`,
  };
});

/**
 * Dense cluster/pod/agent health LED matrix with bounded cell inspection.
 */
export function LedStatusMatrix({
  cells = DEFAULT_CELLS,
  columns = 8,
  label = "CLUSTER NODES",
  reducedMotion = false,
  className,
  style,
}: LedStatusMatrixProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const activeCell = activeIdx !== null ? cells[activeIdx] : null;
  const faultCount = cells.filter((c) => c.state === "fault").length;

  const stateColor = (state: LedState) => {
    switch (state) {
      case "active":
        return "var(--tel-ok, var(--fui-signal-ok, #34d399))";
      case "busy":
        return "var(--tel-accent, var(--fui-signal-active, #38bdf8))";
      case "warn":
        return "var(--tel-warn, var(--fui-signal-warn, #f59e0b))";
      case "fault":
        return "var(--tel-danger, var(--fui-signal-fault, #f43f5e))";
      default:
        return "var(--tel-border, rgba(128,128,128,0.35))";
    }
  };

  return (
    <div
      className={className}
      role="img"
      aria-label={`${label}: ${cells.length} nodes, ${faultCount} faults`}
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
        <span
          style={{
            color: activeCell
              ? stateColor(activeCell.state)
              : faultCount > 0
                ? "var(--tel-danger, var(--fui-signal-fault, #f43f5e))"
                : "var(--tel-ok, var(--fui-signal-ok, #34d399))",
            fontWeight: 600,
          }}
        >
          {activeCell
            ? `${activeCell.id} · ${activeCell.state.toUpperCase()} (${activeCell.load ?? ""})`
            : `${cells.length - faultCount}/${cells.length} HEALTHY`}
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gap: 5,
        }}
        onMouseLeave={() => setActiveIdx(null)}
      >
        {cells.map((cell, idx) => {
          const isHovered = activeIdx === idx;
          const color = stateColor(cell.state);
          return (
            <button
              key={cell.id}
              type="button"
              aria-label={`${cell.id}: ${cell.state}`}
              onMouseEnter={() => setActiveIdx(idx)}
              onFocus={() => setActiveIdx(idx)}
              onBlur={() => setActiveIdx(null)}
              style={{
                appearance: "none",
                border: `1px solid ${
                  isHovered
                    ? "var(--tel-ink, currentColor)"
                    : "var(--tel-border, rgba(128,128,128,0.22))"
                }`,
                borderRadius: 2,
                height: 14,
                padding: 0,
                cursor: "pointer",
                background: color,
                opacity: cell.state === "idle" ? 0.35 : isHovered ? 1 : 0.85,
                boxShadow:
                  !reducedMotion && (cell.state === "busy" || cell.state === "fault")
                    ? `0 0 6px ${color}`
                    : "none",
                transition: reducedMotion ? "none" : "opacity 120ms ease, transform 120ms ease",
                transform: isHovered && !reducedMotion ? "scale(1.08)" : "none",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
