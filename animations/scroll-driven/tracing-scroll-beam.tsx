/**
 * Adapted from Aceternity UI Free Core (`https://ui.aceternity.com/registry/tracing-beam.json`).
 * License: MIT.
 * Zero-dependency vertical SVG gradient beam tracing a self-contained scrollable narrative viewport.
 */
import { useEffect, useRef, useState } from "react";

const CHAPTERS = [
  { id: "01", title: "Discovery Probe", text: "Verify live JSON registries and filter SPA HTML fallbacks." },
  { id: "02", title: "License Hygiene", text: "Require MIT, Apache-2.0, ISC, or clean-room implementations." },
  { id: "03", title: "Parity Gate", text: "Check 1:1 sync across relations.json and registry manifests." },
  { id: "04", title: "Edge Deploy", text: "Build Vite playground and publish automatically to Pages." },
];

export function TracingScrollBeam() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0.2);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    const onScroll = () => {
      const max = Math.max(1, el.scrollHeight - el.clientHeight);
      setProgress(Math.max(0.08, Math.min(1, el.scrollTop / max)));
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={scrollerRef}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 330,
        height: 152,
        overflowY: "auto",
        background: "#090a0c",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 4,
        padding: "12px 12px 12px 30px",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 14,
          top: 12,
          bottom: 12,
          width: 2,
          background: "rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: `${(progress * 100).toFixed(1)}%`,
            background: "linear-gradient(180deg, #38bdf8 0%, #34d399 100%)",
            borderRadius: 2,
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {CHAPTERS.map((ch) => (
          <div key={ch.id} style={{ padding: "8px 10px", background: "#15181e", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4 }}>
            <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 10, color: "#38bdf8" }}>
              {ch.id} // {ch.title}
            </div>
            <div style={{ fontSize: 11, color: "#8b94a3", marginTop: 3 }}>{ch.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
