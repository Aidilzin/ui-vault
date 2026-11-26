/**
 * Clean-room AI workflow primitive inspired by Kibo UI code-block & agent diff reviews.
 * Unified inline code diff with +/- gutter highlighting and Accept/Reject hunk actions.
 */
import { useState } from "react";

export interface DiffLine {
  type: "ctx" | "del" | "add";
  code: string;
}

const DEFAULT_LINES: DiffLine[] = [
  { type: "ctx", code: "  const duration = 180;" },
  { type: "del", code: "- easing: 'ease-in-out'" },
  { type: "add", code: "+ easing: 'cubic-bezier(0.22, 1, 0.36, 1)'" },
];

export function InlineCodeDiff({
  fileName = "motion.ts",
  lines = DEFAULT_LINES,
}: {
  fileName?: string;
  lines?: DiffLine[];
}) {
  const [state, setState] = useState<"open" | "accepted" | "rejected">("open");

  return (
    <div style={{ width: "100%", maxWidth: 330, background: "#090a0c", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 4, overflow: "hidden", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
      <div style={{ padding: "6px 10px", background: "#15181e", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 10 }}>
        <span style={{ color: "#e8ecf2" }}>{fileName}</span>
        {state === "open" ? (
          <div style={{ display: "flex", gap: 4 }}>
            <button type="button" onClick={() => setState("accepted")} style={{ padding: "1px 6px", borderRadius: 2, border: "1px solid rgba(52,211,153,0.45)", background: "rgba(52,211,153,0.12)", color: "#34d399", fontSize: 9, cursor: "pointer" }}>Accept</button>
            <button type="button" onClick={() => setState("rejected")} style={{ padding: "1px 6px", borderRadius: 2, border: "1px solid rgba(244,63,94,0.45)", background: "rgba(244,63,94,0.12)", color: "#f43f5e", fontSize: 9, cursor: "pointer" }}>Reject</button>
          </div>
        ) : (
          <button type="button" onClick={() => setState("open")} style={{ padding: "1px 6px", borderRadius: 2, border: "1px solid rgba(255,255,255,0.16)", background: "transparent", color: state === "accepted" ? "#34d399" : "#f43f5e", fontSize: 9, cursor: "pointer" }}>
            {state.toUpperCase()} (Undo)
          </button>
        )}
      </div>
      <div style={{ padding: "6px 0", fontSize: 10, lineHeight: 1.55, opacity: state === "rejected" ? 0.45 : 1, transition: "opacity 160ms ease" }}>
        {lines.map((l, idx) => (
          <div
            key={idx}
            style={{
              padding: "1px 10px",
              background:
                l.type === "add"
                  ? "rgba(52, 211, 153, 0.14)"
                  : l.type === "del"
                    ? "rgba(244, 63, 94, 0.14)"
                    : "transparent",
              color:
                l.type === "add" ? "#34d399" : l.type === "del" ? "#f43f5e" : "#8b94a3",
              whiteSpace: "pre",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {l.code}
          </div>
        ))}
      </div>
    </div>
  );
}
