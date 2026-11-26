/**
 * Clean-room bidirectional formatted numeric spring transition inspired by NumberFlow.
 * Supports live dynamic digit-count enter/exit (e.g., $42 <-> $1,280.50 <-> $99,450.00)
 * with directional slide-up/down transitions and prefers-reduced-motion fallback.
 */
import { useState } from "react";

const PRESETS = [
  { value: 42, formatted: "$42" },
  { value: 1280.5, formatted: "$1,280.50" },
  { value: 99450, formatted: "$99,450.00" },
];

const KEYFRAMES = `
@keyframes uv-nf-up {
  0% { opacity: 0; transform: translate3d(0, 65%, 0); }
  100% { opacity: 1; transform: translate3d(0, 0%, 0); }
}
@keyframes uv-nf-down {
  0% { opacity: 0; transform: translate3d(0, -65%, 0); }
  100% { opacity: 1; transform: translate3d(0, 0%, 0); }
}
@media (prefers-reduced-motion: reduce) {
  .uv-nf-char { animation: none !important; }
}
`;

export function SpringNumberFlow() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState<"up" | "down">("up");

  const select = (nextIdx: number) => {
    if (nextIdx === idx) return;
    setDir(PRESETS[nextIdx].value > PRESETS[idx].value ? "up" : "down");
    setIdx(nextIdx);
  };

  const current = PRESETS[idx];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <style>{KEYFRAMES}</style>
      <div
        aria-live="polite"
        style={{
          display: "inline-flex",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 28,
          fontWeight: 700,
          fontVariantNumeric: "tabular-nums",
          color: "#e8ecf2",
          overflow: "hidden",
          padding: "4px 12px",
          background: "#0f1115",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 6,
        }}
      >
        {Array.from(current.formatted).map((ch, i) => (
          <span
            key={`${idx}-${i}-${ch}`}
            className="uv-nf-char"
            style={{
              display: "inline-block",
              animation: `${dir === "up" ? "uv-nf-up" : "uv-nf-down"} ${240 + i * 24}ms cubic-bezier(0.22, 1, 0.36, 1) both`,
            }}
          >
            {ch}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
        {PRESETS.map((p, i) => (
          <button
            key={p.formatted}
            type="button"
            onClick={() => select(i)}
            style={{
              padding: "4px 9px",
              borderRadius: 3,
              border: `1px solid ${i === idx ? "#38bdf8" : "rgba(255,255,255,0.14)"}`,
              background: i === idx ? "rgba(56,189,248,0.14)" : "#15181e",
              color: i === idx ? "#38bdf8" : "#8b94a3",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 10,
              cursor: "pointer",
            }}
          >
            {p.formatted}
          </button>
        ))}
      </div>
    </div>
  );
}
