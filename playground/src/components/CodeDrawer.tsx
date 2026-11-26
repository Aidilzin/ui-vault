import { useEffect } from "react";
import { Copy, Terminal, X } from "lucide-react";
import {
  animationRawById,
  formatNodeLabel,
  getShadcnAddCommand,
  type AnimationNode,
} from "../lib/vault-data";

interface CodeDrawerProps {
  animation: AnimationNode | null;
  onClose: () => void;
  onCopy: (text: string, label: string) => void;
}

export function CodeDrawer({ animation, onClose, onCopy }: CodeDrawerProps) {
  useEffect(() => {
    if (!animation) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [animation, onClose]);

  if (!animation) return null;

  const source = animationRawById[animation.id] ?? "// Source unavailable";
  const addCmd = getShadcnAddCommand(animation.registryItem);

  return (
    <div
      className="drawer-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`${formatNodeLabel(animation.id)} source code`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="drawer-panel">
        <div className="drawer-header">
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--fui-signal-active)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {animation.path}
            </div>
            <h2 style={{ margin: "2px 0 0", fontSize: 16, fontWeight: 600 }}>
              {formatNodeLabel(animation.id)}
            </h2>
          </div>

          <button
            type="button"
            className="btn-fui"
            onClick={onClose}
            aria-label="Close code drawer"
          >
            <X size={13} />
            <span>Close</span>
          </button>
        </div>

        <div className="drawer-body">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              className="btn-fui btn-fui-primary"
              onClick={() => onCopy(addCmd, "CLI command copied")}
            >
              <Terminal size={12} />
              <span>Copy shadcn Add</span>
            </button>

            <button
              type="button"
              className="btn-fui"
              onClick={() => onCopy(source, `Copied ${animation.path}`)}
            >
              <Copy size={12} />
              <span>Copy Raw Source</span>
            </button>

            <span className="badge">{animation.mechanic}</span>
            <span className="badge">perf: {animation.perfTier}</span>
            <span className="badge">reduced: {animation.reducedMotion}</span>
          </div>

          <pre className="code-block">
            <code>{source}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
