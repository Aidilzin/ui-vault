import { MagneticButton } from "@vault/animations/cursor-reactive/magnetic-button";
import { BorderSpotlight } from "@vault/animations/cursor-reactive/border-spotlight";
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

export const cursorReactiveDemos: DemoMap = {
  "magnetic-button": MagneticButtonDemo,
  "border-spotlight": BorderSpotlightDemo,
  "sibling-dim": SiblingDimDemo,
};
