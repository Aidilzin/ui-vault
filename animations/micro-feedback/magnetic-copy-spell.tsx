/**
 * Clean-room micro-feedback trigger inspired by Design Spells / Bencho copy interactions.
 * Features an animated SVG stroke-draw checkmark and subtle radial confirmation ring.
 */
import { useState } from "react";

const KEYFRAMES = `
@keyframes uv-copy-ring {
  0% { transform: scale(0.85); opacity: 0.7; }
  100% { transform: scale(1.22); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .uv-copy-ring-burst { animation: none !important; opacity: 0 !important; }
}
`;

export function MagneticCopySpell({ value = "npx shadcn@latest add Aidilzin/ui-vault/style-code-forge" }: { value?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(value).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <style>{KEYFRAMES}</style>
      {copied && (
        <span
          aria-hidden="true"
          className="uv-copy-ring-burst"
          style={{
            position: "absolute",
            inset: -4,
            borderRadius: 8,
            border: "1.5px solid #34d399",
            pointerEvents: "none",
            animation: "uv-copy-ring 420ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
          }}
        />
      )}
      <button
        type="button"
        onClick={handleCopy}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "9px 16px",
          borderRadius: 6,
          border: `1px solid ${copied ? "#34d399" : "rgba(255,255,255,0.18)"}`,
          background: copied ? "rgba(52,211,153,0.14)" : "#15181e",
          color: copied ? "#34d399" : "#e8ecf2",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 11,
          cursor: "pointer",
          transition: "border-color 160ms ease, background-color 160ms ease, color 160ms ease",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          {copied ? (
            <path
              d="M3 8.5L6.5 12L13 4.5"
              stroke="#34d399"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ strokeDasharray: 20, strokeDashoffset: 0 }}
            />
          ) : (
            <rect x="4" y="4" width="8" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          )}
        </svg>
        <span>{copied ? "COPIED TO CLIPBOARD" : "COPY CLI SPELL"}</span>
      </button>
    </div>
  );
}
