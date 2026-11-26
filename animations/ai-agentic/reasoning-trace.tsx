/**
 * Adapted from Vercel AI Elements (`https://registry.ai-sdk.dev/reasoning.json`).
 * License: Apache-2.0.
 * Zero-dependency collapsible LLM reasoning trace with live thinking shimmer and duration counter.
 */
import { useEffect, useState } from "react";

export interface ReasoningTraceProps {
  thoughts?: string[];
  thinkingMs?: number;
}

const DEFAULT_THOUGHTS = [
  "Reading relations.json to verify cluster compatibility...",
  "Checking pairsWith edges and reduced-motion fallbacks...",
  "Synthesizing zero-dependency component structure."
];

const SHIMMER_CSS = `
@keyframes uv-reasoning-shimmer {
  0% { background-position: 120% 0; }
  100% { background-position: -120% 0; }
}
@media (prefers-reduced-motion: reduce) {
  .uv-reasoning-shimmer { animation: none !important; color: #38bdf8 !important; -webkit-text-fill-color: #38bdf8 !important; }
}
`;

export function ReasoningTrace({
  thoughts = DEFAULT_THOUGHTS,
  thinkingMs = 1600,
}: ReasoningTraceProps) {
  const [thinking, setThinking] = useState(true);
  const [open, setOpen] = useState(true);
  const [elapsedSec, setElapsedSec] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setThinking(false);
      setElapsedSec(Number((thinkingMs / 1000).toFixed(1)));
      return;
    }
    setThinking(true);
    const start = performance.now();
    const tick = window.setInterval(() => {
      const s = (performance.now() - start) / 1000;
      setElapsedSec(Number(s.toFixed(1)));
      if (s * 1000 >= thinkingMs) {
        setThinking(false);
        window.clearInterval(tick);
      }
    }, 100);
    return () => window.clearInterval(tick);
  }, [thinkingMs]);

  return (
    <div style={{ width: "100%", maxWidth: 330, background: "#0f1115", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden" }}>
      <style>{SHIMMER_CSS}</style>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          width: "100%",
          padding: "8px 12px",
          background: "transparent",
          border: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 11,
          color: "#8b94a3",
        }}
      >
        <span
          className={thinking ? "uv-reasoning-shimmer" : undefined}
          style={
            thinking
              ? {
                  backgroundImage: "linear-gradient(120deg, #8b94a3 35%, #ffffff 50%, #8b94a3 65%)",
                  backgroundSize: "220% 100%",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  animation: "uv-reasoning-shimmer 2s linear infinite",
                }
              : { color: "#e8ecf2" }
          }
        >
          {thinking ? "Reasoning..." : `Thought for ${elapsedSec.toFixed(1)}s`}
        </span>
        <span style={{ fontSize: 10 }}>{open ? "▾" : "▸"}</span>
      </button>
      {open && (
        <div style={{ padding: "0 12px 10px", borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: 11, color: "#8b94a3", display: "flex", flexDirection: "column", gap: 4, paddingTop: 8 }}>
          {thoughts.map((line, i) => (
            <div key={i} style={{ display: "flex", gap: 6 }}>
              <span style={{ color: "#586170", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>0{i + 1}</span>
              <span>{line}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
