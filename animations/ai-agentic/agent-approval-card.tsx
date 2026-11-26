/**
 * Adapted from Vercel AI Elements (`https://registry.ai-sdk.dev/confirmation.json`).
 * License: Apache-2.0.
 * Zero-dependency human-in-the-loop agent permission card with Approve/Deny state lock.
 */
import { useState } from "react";

type Decision = "awaiting" | "approved" | "denied";

export interface AgentApprovalCardProps {
  command?: string;
  riskLabel?: string;
}

export function AgentApprovalCard({
  command = "npx shadcn@latest add Aidilzin/ui-vault/style-fui-tactical",
  riskLabel = "WRITE WORKSPACE",
}: AgentApprovalCardProps) {
  const [decision, setDecision] = useState<Decision>("awaiting");

  const borderColor =
    decision === "approved"
      ? "rgba(52, 211, 153, 0.55)"
      : decision === "denied"
        ? "rgba(244, 63, 94, 0.55)"
        : "rgba(245, 158, 11, 0.45)";

  return (
    <div style={{ width: "100%", maxWidth: 330, background: "#0f1115", border: `1px solid ${borderColor}`, borderRadius: 4, padding: 12, transition: "border-color 160ms ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 9 }}>
        <span style={{ color: "#f59e0b" }}>PERMISSION GATE</span>
        <span style={{ color: "#8b94a3" }}>{riskLabel}</span>
      </div>
      <div style={{ marginTop: 8, padding: "6px 8px", background: "#090a0c", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 3, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 10, color: "#cbd5e1", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        $ {command}
      </div>
      <div style={{ marginTop: 10, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
        {decision === "awaiting" ? (
          <>
            <button
              type="button"
              onClick={() => setDecision("approved")}
              style={{ flex: 1, padding: "5px 10px", borderRadius: 3, border: "1px solid rgba(52,211,153,0.5)", background: "rgba(52,211,153,0.14)", color: "#34d399", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 10, cursor: "pointer" }}
            >
              APPROVE
            </button>
            <button
              type="button"
              onClick={() => setDecision("denied")}
              style={{ flex: 1, padding: "5px 10px", borderRadius: 3, border: "1px solid rgba(244,63,94,0.45)", background: "rgba(244,63,94,0.1)", color: "#f43f5e", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 10, cursor: "pointer" }}
            >
              DENY
            </button>
          </>
        ) : (
          <>
            <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 10, color: decision === "approved" ? "#34d399" : "#f43f5e" }}>
              {decision === "approved" ? "✔ ACTION APPROVED" : "✖ ACTION DENIED"}
            </span>
            <button
              type="button"
              onClick={() => setDecision("awaiting")}
              style={{ padding: "3px 8px", borderRadius: 3, border: "1px solid rgba(255,255,255,0.16)", background: "#15181e", color: "#e8ecf2", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 10, cursor: "pointer" }}
            >
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
}
