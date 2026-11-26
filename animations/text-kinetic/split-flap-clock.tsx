/**
 * Adapted from @8starlabs-ui (`https://ui.8starlabs.com/r/flip-clock.json`).
 * License: MIT.
 * Zero-dependency 3D perspective mid-hinged split-flap card display with reduced-motion fallback.
 */
import { useState } from "react";

const KEYFRAMES = `
@keyframes uv-split-flap-top {
  0% { transform: rotateX(0deg); }
  100% { transform: rotateX(-90deg); }
}
@media (prefers-reduced-motion: reduce) {
  .uv-split-flap-leaf { animation: none !important; }
}
`;

export function SplitFlapClock() {
  const [count, setCount] = useState(42);
  const [flipKey, setFlipKey] = useState(0);
  const digits = String(count).padStart(2, "0").split("");

  const bump = () => {
    setCount((c) => (c + 1) % 100);
    setFlipKey((k) => k + 1);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <style>{KEYFRAMES}</style>
      <div style={{ display: "flex", gap: 8, perspective: 400 }}>
        {digits.map((d, idx) => (
          <div
            key={`${idx}-${flipKey}`}
            style={{
              position: "relative",
              width: 52,
              height: 66,
              borderRadius: 6,
              background: "#15181e",
              border: "1px solid rgba(255,255,255,0.16)",
              display: "grid",
              placeItems: "center",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 32,
              fontWeight: 700,
              color: "#e8ecf2",
              overflow: "hidden",
            }}
          >
            <span>{d}</span>
            <div
              aria-hidden="true"
              className="uv-split-flap-leaf"
              style={{
                position: "absolute",
                inset: "0 0 50% 0",
                background: "rgba(255,255,255,0.06)",
                transformOrigin: "bottom center",
                animation: "uv-split-flap-top 240ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
            <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: "#090a0c" }} />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={bump}
        style={{
          padding: "4px 10px",
          borderRadius: 3,
          border: "1px solid rgba(255,255,255,0.18)",
          background: "#15181e",
          color: "#e8ecf2",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 10,
          cursor: "pointer",
        }}
      >
        FLIP NEXT (+1)
      </button>
    </div>
  );
}
