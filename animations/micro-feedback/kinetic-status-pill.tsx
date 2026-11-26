/**
 * Clean-room micro-feedback primitive distilled from 60fps.design live telemetry pills.
 * Morphs cleanly across idle -> syncing -> nominal states with crisp color/text transitions.
 */
import { useState } from "react";

type PillState = "idle" | "syncing" | "nominal";

const STATE_CONFIG: Record<PillState, { label: string; color: string; bg: string }> = {
  idle: { label: "IDLE // CLICK TO SYNC", color: "#8b94a3", bg: "rgba(139, 148, 163, 0.12)" },
  syncing: { label: "SYNCING TELEMETRY...", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.14)" },
  nominal: { label: "NOMINAL // 25 NODES OK", color: "#34d399", bg: "rgba(52, 211, 153, 0.14)" },
};

export function KineticStatusPill() {
  const [state, setState] = useState<PillState>("idle");

  const trigger = () => {
    if (state === "syncing") return;
    if (state === "nominal") {
      setState("idle");
      return;
    }
    setState("syncing");
    window.setTimeout(() => setState("nominal"), 750);
  };

  const cfg = STATE_CONFIG[state];

  return (
    <button
      type="button"
      onClick={trigger}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "7px 14px",
        borderRadius: 999,
        border: `1px solid ${cfg.color}66`,
        background: cfg.bg,
        color: cfg.color,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: 11,
        letterSpacing: "0.05em",
        cursor: "pointer",
        transition: "all 200ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: cfg.color,
        }}
      />
      <span>{cfg.label}</span>
    </button>
  );
}
