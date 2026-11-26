/**
 * Adapted from Vercel AI Elements (`https://registry.ai-sdk.dev/tool.json`).
 * License: Apache-2.0.
 * Zero-dependency agent tool-call step row transitioning pending -> running -> success/error.
 */
import { useState } from "react";

export type ToolStatus = "pending" | "running" | "success" | "error";

export interface ToolCallStepProps {
  toolName?: string;
  argsPreview?: string;
  resultPreview?: string;
}

const STATUS_STYLE: Record<ToolStatus, { label: string; color: string }> = {
  pending: { label: "PENDING", color: "#8b94a3" },
  running: { label: "RUNNING", color: "#f59e0b" },
  success: { label: "SUCCESS", color: "#34d399" },
  error: { label: "ERROR", color: "#f43f5e" },
};

const ORDER: ToolStatus[] = ["pending", "running", "success", "error"];

export function ToolCallStep({
  toolName = "validate_registry",
  argsPreview = '{ "target": "animations/registry.json" }',
  resultPreview = '{ "valid": true, "items": 105 }',
}: ToolCallStepProps) {
  const [status, setStatus] = useState<ToolStatus>("running");
  const [expanded, setExpanded] = useState(false);

  const cycle = () => {
    setStatus((s) => ORDER[(ORDER.indexOf(s) + 1) % ORDER.length]);
  };

  const st = STATUS_STYLE[status];

  return (
    <div style={{ width: "100%", maxWidth: 330, background: "#0f1115", border: `1px solid ${st.color}44`, borderRadius: 4, overflow: "hidden", transition: "border-color 160ms ease" }}>
      <div style={{ padding: "8px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          style={{
            background: "transparent",
            border: "none",
            padding: 0,
            color: "#e8ecf2",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 11,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: st.color }} />
          <span>{toolName}()</span>
          <span style={{ color: "#586170" }}>{expanded ? "▾" : "▸"}</span>
        </button>

        <button
          type="button"
          onClick={cycle}
          style={{
            padding: "2px 7px",
            borderRadius: 2,
            border: `1px solid ${st.color}66`,
            background: `${st.color}18`,
            color: st.color,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 9,
            cursor: "pointer",
          }}
        >
          {st.label}
        </button>
      </div>

      {expanded && (
        <div style={{ padding: "8px 10px", borderTop: "1px solid rgba(255,255,255,0.08)", background: "#090a0c", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 10, color: "#8b94a3" }}>
          <div>args: {argsPreview}</div>
          <div style={{ marginTop: 4, color: status === "error" ? "#f43f5e" : "#34d399" }}>
            out: {status === "error" ? '{ "error": "Schema mismatch" }' : resultPreview}
          </div>
        </div>
      )}
    </div>
  );
}
