import { useState } from "react";
import { ArrowDownUp, Layers, RotateCcw } from "lucide-react";
import { FlipCard } from "@vault/animations/layout-morph/flip-card";
import { VelocitySkew } from "@vault/animations/layout-morph/velocity-skew";
import { MakeWayGrid } from "@vault/animations/layout-morph/make-way-grid";
import { SpotlightTabs } from "@vault/animations/layout-morph/spotlight-tabs";
import { BlurFade } from "@vault/animations/layout-morph/blur-fade";
import { StackedCardDeck } from "@vault/animations/layout-morph/stacked-card-deck";
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

function MakeWayGridDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: "100%" }}>
      <MakeWayGrid
        items={[
          { id: "m1", title: "SEC-01", detail: "WAAPI FLIP span-2 expansion" },
          { id: "m2", title: "SEC-02", detail: "Neighbors reflow automatically" },
          { id: "m3", title: "SEC-03", detail: "Zero layout-thrash transforms" },
          { id: "m4", title: "SEC-04", detail: "Click any tile to toggle" },
        ]}
      />
      <span className="fui-mono-label">Click any tile to expand &amp; shift neighbors</span>
    </div>
  );
}

function SpotlightTabsDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <SpotlightTabs
        tabs={[
          { id: "overview", label: "OVERVIEW" },
          { id: "tokens", label: "TOKENS" },
          { id: "motion", label: "MOTION" },
        ]}
      />
      <span className="fui-mono-label">Click segments to glide active pill</span>
    </div>
  );
}

function BlurFadeDemo({ motionEpoch }: DemoProps) {
  const [replay, setReplay] = useState(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <BlurFade key={`${replay}-${motionEpoch}`}>
        <div
          style={{
            padding: "14px 18px",
            background: "#15181e",
            border: "1px solid var(--fui-border-strong)",
            borderRadius: 6,
            textAlign: "center",
          }}
        >
          <div className="fui-mono-label" style={{ color: "var(--fui-signal-active)" }}>
            BLUR-FADE CONTAINER
          </div>
          <div style={{ marginTop: 4, fontSize: 13 }}>Clean optical card entrance</div>
        </div>
      </BlurFade>
      <button type="button" className="btn-fui" onClick={() => setReplay((k) => k + 1)}>
        <RotateCcw size={11} />
        <span>Replay</span>
      </button>
    </div>
  );
}

export const layoutMorphDemos: DemoMap = {
  "flip-card": FlipCardDemo,
  "velocity-skew": VelocitySkewDemo,
  "make-way-grid": MakeWayGridDemo,
  "spotlight-tabs": SpotlightTabsDemo,
  "blur-fade": BlurFadeDemo,
  "stacked-card-deck": () => <StackedCardDeck />,
};
