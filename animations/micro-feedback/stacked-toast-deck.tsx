/**
 * Clean-room depth-stacked toast deck inspired by Sonner.
 * Collapsed stack fans out smoothly on hover and supports click-to-dismiss with reset.
 */
import { useState } from "react";

interface ToastItem {
  id: string;
  title: string;
  tag: string;
  color: string;
}

const INITIAL_TOASTS: ToastItem[] = [
  { id: "t1", title: "Registry validated (105 items)", tag: "OK", color: "#34d399" },
  { id: "t2", title: "Copied CLI add command", tag: "CLI", color: "#38bdf8" },
  { id: "t3", title: "Pages deployment queued", tag: "CI", color: "#f59e0b" },
];

export function StackedToastDeck() {
  const [toasts, setToasts] = useState<ToastItem[]>(INITIAL_TOASTS);
  const [expanded, setExpanded] = useState(false);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) {
    return (
      <button
        type="button"
        onClick={() => setToasts(INITIAL_TOASTS)}
        style={{
          padding: "6px 12px",
          borderRadius: 4,
          border: "1px solid rgba(56,189,248,0.45)",
          background: "rgba(56,189,248,0.14)",
          color: "#38bdf8",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 10,
          cursor: "pointer",
        }}
      >
        RESTORE TOAST DECK
      </button>
    );
  }

  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{ position: "relative", width: "100%", maxWidth: 310, height: 142 }}
    >
      {toasts.map((t, idx) => {
        const y = expanded ? idx * 44 : idx * 10;
        const scale = expanded ? 1 : 1 - idx * 0.05;
        return (
          <div
            key={t.id}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 4,
              zIndex: toasts.length - idx,
              padding: "9px 12px",
              borderRadius: 6,
              background: "#15181e",
              border: "1px solid rgba(255,255,255,0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              transformOrigin: "top center",
              transform: `translate3d(0, ${y}px, 0) scale(${scale.toFixed(3)})`,
              opacity: expanded ? 1 : Math.max(0.55, 1 - idx * 0.2),
              transition: reduced
                ? "none"
                : "transform 240ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 7, minWidth: 0 }}>
              <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 9, color: t.color }}>
                [{t.tag}]
              </span>
              <span style={{ fontSize: 11, color: "#e8ecf2", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {t.title}
              </span>
            </div>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label={`Dismiss ${t.title}`}
              style={{
                background: "transparent",
                border: "none",
                color: "#8b94a3",
                fontSize: 11,
                cursor: "pointer",
                padding: "0 2px",
              }}
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}
