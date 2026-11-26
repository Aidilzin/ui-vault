import { useState } from "react";
import { ArrowDownUp, Layers } from "lucide-react";
import { FlipCard } from "@vault/animations/layout-morph/flip-card";
import { VelocitySkew } from "@vault/animations/layout-morph/velocity-skew";
import type { DemoMap, DemoProps } from "./types";

function FlipCardDemo() {
  const [flipExpanded, setFlipExpanded] = useState(false);
  const [flipOrder, setFlipOrder] = useState<string[]>(["A1", "B2", "C3"]);

  return (
    <div style={{ width: "100%", maxWidth: 340, display: "flex", flexDirection: "column", gap: 10 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: flipExpanded ? "1fr" : "repeat(3, 1fr)",
          gap: 8,
        }}
      >
        {flipOrder.map((code) => (
          <FlipCard
            key={code}
            layoutKey={`${flipExpanded}-${flipOrder.join(",")}`}
            durationMs={280}
            style={{
              padding: flipExpanded ? "10px 14px" : "14px 10px",
              background: "#15181e",
              border: "1px solid rgba(56, 189, 248, 0.28)",
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
            }}
          >
            <span style={{ color: "var(--fui-signal-active)" }}>MOD-{code}</span>
            {flipExpanded && (
              <span style={{ color: "var(--fui-ink-muted)", fontSize: 10 }}>
                WAAPI FLIP ACTIVE
              </span>
            )}
          </FlipCard>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
        <button
          type="button"
          className="btn-fui"
          onClick={() => setFlipExpanded((v) => !v)}
        >
          <Layers size={11} />
          <span>{flipExpanded ? "Grid 3-Col" : "Expand Rows"}</span>
        </button>
        <button
          type="button"
          className="btn-fui"
          onClick={() => setFlipOrder((prev) => [...prev.slice(1), prev[0]])}
        >
          <ArrowDownUp size={11} />
          <span>Reorder</span>
        </button>
      </div>
    </div>
  );
}

function VelocitySkewDemo({ motionEpoch }: DemoProps) {
  return (
    <div style={{ width: "100%", maxWidth: 330, display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
      <VelocitySkew
        key={motionEpoch}
        maxSkewDeg={7}
        sensitivity={0.1}
        style={{
          width: "100%",
          padding: "16px 18px",
          background: "#15181e",
          border: "1px solid var(--fui-border-strong)",
          borderRadius: 3,
        }}
      >
        <div className="fui-mono-label" style={{ color: "var(--fui-signal-warn)" }}>
          WINDOW SCROLL VELOCITY
        </div>
        <div style={{ marginTop: 4, fontSize: 13, fontWeight: 600 }}>
          Scroll the page rapidly to skew this surface along the Y-axis.
        </div>
      </VelocitySkew>
      <button
        type="button"
        className="btn-fui"
        onClick={() => {
          window.scrollBy({ top: 140, behavior: "smooth" });
          window.setTimeout(() => {
            window.scrollBy({ top: -140, behavior: "smooth" });
          }, 260);
        }}
      >
        <span>Pulse Scroll Test</span>
      </button>
    </div>
  );
}

export const layoutMorphDemos: DemoMap = {
  "flip-card": FlipCardDemo,
  "velocity-skew": VelocitySkewDemo,
};
