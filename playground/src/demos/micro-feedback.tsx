import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { ClickSpark } from "@vault/animations/micro-feedback/click-spark";
import { CountUp } from "@vault/animations/micro-feedback/count-up";
import { HoldToConfirm } from "@vault/animations/micro-feedback/hold-to-confirm";
import { TactilePressBadge } from "@vault/animations/micro-feedback/tactile-press-badge";
import { KineticStatusPill } from "@vault/animations/micro-feedback/kinetic-status-pill";
import type { DemoMap, DemoProps } from "./types";

function ClickSparkDemo() {
  return (
    <ClickSpark
      sparkColor="#38bdf8"
      sparkCount={10}
      style={{
        display: "grid",
        placeItems: "center",
        minHeight: 140,
        border: "1px dashed var(--fui-border-strong)",
        borderRadius: 4,
        cursor: "pointer",
      }}
    >
      <span className="fui-mono-label">CLICK ANYWHERE INSIDE STAGE</span>
    </ClickSpark>
  );
}

function CountUpDemo({ motionEpoch }: DemoProps) {
  const [replay, setReplay] = useState(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 30,
          fontWeight: 600,
          color: "var(--fui-signal-ok)",
        }}
      >
        <CountUp key={`${replay}-${motionEpoch}`} from={0} to={99.94} decimals={2} suffix="%" />
      </div>
      <button type="button" className="btn-fui" onClick={() => setReplay((k) => k + 1)}>
        <RotateCcw size={11} />
        <span>Replay Ticker</span>
      </button>
    </div>
  );
}

function HoldToConfirmDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <HoldToConfirm />
      <span className="fui-mono-label">Press and hold 900ms (click again to reset)</span>
    </div>
  );
}

function TactilePressBadgeDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <TactilePressBadge />
      <span className="fui-mono-label">Click for 120ms physical detent press</span>
    </div>
  );
}

function KineticStatusPillDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <KineticStatusPill />
      <span className="fui-mono-label">Click pill to cycle idle → syncing → nominal</span>
    </div>
  );
}

export const microFeedbackDemos: DemoMap = {
  "click-spark": ClickSparkDemo,
  "count-up": CountUpDemo,
  "hold-to-confirm": HoldToConfirmDemo,
  "tactile-press-badge": TactilePressBadgeDemo,
  "kinetic-status-pill": KineticStatusPillDemo,
};
