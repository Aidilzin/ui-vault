import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { ScrambleText } from "@vault/animations/text-kinetic/scramble-text";
import { SplitReveal } from "@vault/animations/text-kinetic/split-reveal";
import { VariableProximity } from "@vault/animations/text-kinetic/variable-proximity";
import { MarqueeHoverRow } from "@vault/animations/text-kinetic/marquee-hover-row";
import { ShinyText } from "@vault/animations/text-kinetic/shiny-text";
import { BlurText } from "@vault/animations/text-kinetic/blur-text";
import { TextRoll } from "@vault/animations/text-kinetic/text-roll";
import { SplitFlapClock } from "@vault/animations/text-kinetic/split-flap-clock";
import { TrueFocusFrame } from "@vault/animations/text-kinetic/true-focus-frame";
import { TextMorphSwap } from "@vault/animations/text-kinetic/text-morph-swap";
import { LineShadowHeading } from "@vault/animations/text-kinetic/line-shadow-heading";
import type { DemoMap, DemoProps } from "./types";

function ScrambleTextDemo({ motionEpoch }: DemoProps) {
  const [scrambleKey, setScrambleKey] = useState(0);
  const [scrambleMode, setScrambleMode] = useState<"mount" | "hover">("mount");

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: "0.06em",
          color: "var(--fui-signal-active)",
          padding: "8px 14px",
          border: "1px solid var(--fui-border)",
          borderRadius: 3,
          background: "#0f1115",
          cursor: scrambleMode === "hover" ? "pointer" : "default",
        }}
      >
        <ScrambleText
          key={`${scrambleKey}-${scrambleMode}-${motionEpoch}`}
          text="SYS.TELEMETRY // LOCKED"
          trigger={scrambleMode}
          durationMs={380}
        />
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
        <button
          type="button"
          className="btn-fui"
          onClick={() => {
            setScrambleMode("mount");
            setScrambleKey((k) => k + 1);
          }}
        >
          <RotateCcw size={11} />
          <span>Replay</span>
        </button>
        <button
          type="button"
          className={`btn-fui ${scrambleMode === "hover" ? "btn-fui-primary" : ""}`}
          onClick={() => setScrambleMode((m) => (m === "hover" ? "mount" : "hover"))}
        >
          <span>Mode: {scrambleMode === "hover" ? "Hover Text" : "Mount"}</span>
        </button>
      </div>
    </div>
  );
}

function SplitRevealDemo({ motionEpoch }: DemoProps) {
  const [splitKey, setSplitKey] = useState(0);
  const [splitMode, setSplitMode] = useState<"words" | "chars">("words");

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div
        style={{
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "var(--fui-ink)",
          textAlign: "center",
        }}
      >
        <SplitReveal
          key={`${splitKey}-${splitMode}-${motionEpoch}`}
          text="PRECISION KINETIC TYPE"
          mode={splitMode}
          staggerMs={splitMode === "words" ? 65 : 22}
          durationMs={420}
        />
      </div>

      <div style={{ display: "flex", gap: 6 }}>
        <button
          type="button"
          className="btn-fui"
          onClick={() => setSplitKey((k) => k + 1)}
        >
          <RotateCcw size={11} />
          <span>Replay</span>
        </button>
        <button
          type="button"
          className="btn-fui"
          onClick={() => {
            setSplitMode((m) => (m === "words" ? "chars" : "words"));
            setSplitKey((k) => k + 1);
          }}
        >
          <span>Split: {splitMode}</span>
        </button>
      </div>
    </div>
  );
}

function VariableProximityDemo({ motionEpoch }: DemoProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 26,
          letterSpacing: "-0.02em",
          color: "var(--fui-ink)",
          userSelect: "none",
        }}
      >
        <VariableProximity
          key={motionEpoch}
          text="PROXIMITY WEIGHT"
          minWeight={200}
          maxWeight={900}
          radius={140}
        />
      </div>
      <span className="fui-mono-label">
        Sweep cursor over letters (Inter variable wght 200-900)
      </span>
    </div>
  );
}

function MarqueeHoverRowDemo() {
  return (
    <div style={{ width: "100%", maxWidth: 340, display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        style={{
          border: "1px solid var(--fui-border-strong)",
          borderRadius: 3,
          overflow: "hidden",
          background: "#0f1115",
        }}
      >
        <MarqueeHoverRow
          index="01"
          label="PRECISION SYSTEMS"
          accentBg="#38bdf8"
          accentInk="#090a0c"
          durationSec={6.5}
        />
        <MarqueeHoverRow
          index="02"
          label="KINETIC REBEL"
          accentBg="#f36458"
          accentInk="#090a0c"
          durationSec={5.5}
        />
        <MarqueeHoverRow
          index="03"
          label="SPATIAL PHYSICS"
          accentBg="#34d399"
          accentInk="#090a0c"
          durationSec={6}
          style={{ borderBottom: "none" }}
        />
      </div>
      <span className="fui-mono-label" style={{ textAlign: "center" }}>
        Hover or Tab-focus any row to trigger marquee strip
      </span>
    </div>
  );
}

function ShinyTextDemo() {
  return (
    <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>
      <ShinyText text="SPECULAR METALLIC SWEEP" speedSec={3} />
    </div>
  );
}

function BlurTextDemo({ motionEpoch }: DemoProps) {
  const [replay, setReplay] = useState(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{ fontSize: 19, fontWeight: 600, textAlign: "center" }}>
        <BlurText key={`${replay}-${motionEpoch}`} text="OPTICAL FOCUS REVEAL" />
      </div>
      <button type="button" className="btn-fui" onClick={() => setReplay((k) => k + 1)}>
        <RotateCcw size={11} />
        <span>Replay</span>
      </button>
    </div>
  );
}

function TextRollDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 20,
          fontWeight: 600,
          color: "var(--fui-signal-active)",
        }}
      >
        <TextRoll text="SPLIT-FLAP ROLL" />
      </div>
      <span className="fui-mono-label">Hover text to roll characters vertically</span>
    </div>
  );
}

export const textKineticDemos: DemoMap = {
  "scramble-text": ScrambleTextDemo,
  "split-reveal": SplitRevealDemo,
  "variable-proximity": VariableProximityDemo,
  "marquee-hover-row": MarqueeHoverRowDemo,
  "shiny-text": ShinyTextDemo,
  "blur-text": BlurTextDemo,
  "text-roll": TextRollDemo,
  "split-flap-clock": () => <SplitFlapClock />,
  "true-focus-frame": ({ motionEpoch }) => (
    <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>
      <TrueFocusFrame key={motionEpoch} sentence="Precision Kinetic Focus" />
    </div>
  ),
  "text-morph-swap": ({ motionEpoch }) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ fontSize: 24, fontWeight: 700, color: "var(--fui-signal-active)" }}>
        <TextMorphSwap key={motionEpoch} phrases={["Deploy", "Deploying...", "Deployed"]} />
      </div>
      <span className="fui-mono-label">Auto-cycles or click text to morph glyphs</span>
    </div>
  ),
  "line-shadow-heading": () => (
    <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>
      <LineShadowHeading text="SPECIMEN" shadowColor="#38bdf8" />
    </div>
  ),
};
