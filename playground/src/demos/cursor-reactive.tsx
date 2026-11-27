import { MagneticButton } from "@vault/animations/cursor-reactive/magnetic-button";
import { BorderSpotlight } from "@vault/animations/cursor-reactive/border-spotlight";
import { StarBorder } from "@vault/animations/cursor-reactive/star-border";
import { MagnetLines } from "@vault/animations/cursor-reactive/magnet-lines";
import { CrosshairReticle } from "@vault/animations/cursor-reactive/crosshair-reticle";
import { BorderBeam } from "@vault/animations/cursor-reactive/border-beam";
import { KineticCardTrail } from "@vault/animations/cursor-reactive/kinetic-card-trail";
import { RotaryTypeDial } from "@vault/animations/cursor-reactive/rotary-type-dial";
import { TargetBracketCursor } from "@vault/animations/cursor-reactive/target-bracket-cursor";
import "@vault/animations/cursor-reactive/sibling-dim.css";
import type { DemoMap } from "./types";

function MagneticButtonDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <MagneticButton
        strength={0.32}
        style={{
          padding: "10px 20px",
          background: "rgba(56, 189, 248, 0.14)",
          border: "1px solid rgba(56, 189, 248, 0.55)",
          borderRadius: 4,
          color: "#e8ecf2",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: "0.06em",
          cursor: "pointer",
        }}
      >
        ENGAGE MAGNETIC PULL
      </MagneticButton>
      <span className="fui-mono-label">Hover &amp; drift cursor across button</span>
    </div>
  );
}

function BorderSpotlightDemo() {
  return (
    <BorderSpotlight
      spotlightColor="rgba(56, 189, 248, 0.36)"
      radius={180}
      style={{
        width: "100%",
        maxWidth: 320,
        padding: "18px 20px",
        background: "#0f1115",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: 4,
      }}
    >
      <div className="fui-mono-label" style={{ color: "var(--fui-signal-active)" }}>
        TELEMETRY // RADIAL TRACK
      </div>
      <div style={{ marginTop: 6, fontSize: 13, color: "var(--fui-ink)" }}>
        Move pointer across this panel to trace the 1px radial spotlight perimeter.
      </div>
    </BorderSpotlight>
  );
}

function SiblingDimDemo() {
  return (
    <div style={{ width: "100%", maxWidth: 340 }}>
      <div
        className="sibling-dim-group"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 8,
        }}
      >
        {["NODE 01", "NODE 02", "NODE 03", "NODE 04", "NODE 05", "NODE 06"].map((label) => (
          <div
            key={label}
            style={{
              padding: "12px 8px",
              background: "#15181e",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 3,
              textAlign: "center",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "#e8ecf2",
              cursor: "default",
            }}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="fui-mono-label" style={{ textAlign: "center", marginTop: 10 }}>
        Hover any cell to dim siblings (:has selector)
      </div>
    </div>
  );
}

function StarBorderDemo() {
  return (
    <StarBorder color="#38bdf8" speedSec={4}>
      <div style={{ padding: "12px 22px", fontFamily: "var(--font-mono)", fontSize: 12 }}>
        ORBITING STAR BORDER
      </div>
    </StarBorder>
  );
}

function MagnetLinesDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <MagnetLines rows={4} columns={8} lineColor="#38bdf8" lineHeight={16} />
      <span className="fui-mono-label">Move cursor to align vector field</span>
    </div>
  );
}

function CrosshairReticleDemo() {
  return (
    <CrosshairReticle
      style={{
        width: "100%",
        maxWidth: 320,
        height: 130,
        background: "#0f1115",
        border: "1px solid var(--fui-border-strong)",
        borderRadius: 4,
        display: "grid",
        placeItems: "center",
      }}
    >
      <span className="fui-mono-label">SCAN TARGET SURFACE</span>
    </CrosshairReticle>
  );
}

function BorderBeamDemo() {
  return (
    <BorderBeam colorFrom="#38bdf8" colorTo="#34d399" durationSec={4}>
      <div style={{ padding: "16px 22px", width: 280 }}>
        <div className="fui-mono-label" style={{ color: "var(--fui-signal-active)" }}>
          CONIC PERIMETER BEAM
        </div>
        <div style={{ marginTop: 4, fontSize: 13 }}>
          Continuous 1.5px rotating light trace.
        </div>
      </div>
    </BorderBeam>
  );
}

function KineticCardTrailDemo() {
  return <KineticCardTrail style={{ maxWidth: 340 }} />;
}

export const cursorReactiveDemos: DemoMap = {
  "magnetic-button": MagneticButtonDemo,
  "border-spotlight": BorderSpotlightDemo,
  "sibling-dim": SiblingDimDemo,
  "star-border": StarBorderDemo,
  "magnet-lines": MagnetLinesDemo,
  "crosshair-reticle": CrosshairReticleDemo,
  "border-beam": BorderBeamDemo,
  "kinetic-card-trail": KineticCardTrailDemo,
  "rotary-type-dial": () => <RotaryTypeDial />,
  "target-bracket-cursor": () => (
    <TargetBracketCursor style={{ width: "100%", maxWidth: 330 }} />
  ),
};
