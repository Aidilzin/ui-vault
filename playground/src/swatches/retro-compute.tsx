import type { ReactNode } from "react";

export const retroComputeSwatches: Record<string, () => ReactNode> = {
  ditherpunk: () => (
    <div style={{ height: "100%", background: "#f2f0e6", color: "#0b0c0a", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-mono)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #0b0c0a", paddingBottom: 6, fontSize: 10, fontWeight: 700 }}>
        <span>1-BIT // BAYER 4X4</span>
        <span style={{ background: "#ff4d00", color: "#0b0c0a", padding: "0 5px" }}>INK</span>
      </div>
      <div
        style={{
          height: 76,
          border: "2px solid #0b0c0a",
          backgroundImage: "radial-gradient(#0b0c0a 1.25px, transparent 1.25px), radial-gradient(#0b0c0a 1.25px, #f2f0e6 1.25px)",
          backgroundSize: "6px 6px",
          backgroundPosition: "0 0, 3px 3px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ background: "#0b0c0a", color: "#f2f0e6", padding: "4px 10px", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em" }}>
          NO BLUR // ZERO AA
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10 }}>
        <span>#0B0C0A / #F2F0E6</span>
        <span style={{ color: "#ff4d00", fontWeight: 700 }}>SPOT #FF4D00</span>
      </div>
    </div>
  ),

  "os-core": () => (
    <div style={{ height: "100%", background: "#008080", padding: 14, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)" }}>
      <div style={{ width: "100%", background: "#d4d0c8", borderTop: "2px solid #ffffff", borderLeft: "2px solid #ffffff", borderRight: "2px solid #404040", borderBottom: "2px solid #404040", padding: 3, color: "#111111" }}>
        <div style={{ background: "#000080", color: "#ffffff", padding: "3px 6px", fontSize: 10, fontWeight: 700, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>SYSTEM_VAULT.EXE</span>
          <span style={{ display: "flex", gap: 2 }}>
            {["_", "X"].map((ch) => (
              <span key={ch} style={{ background: "#d4d0c8", color: "#111", width: 14, height: 14, display: "inline-grid", placeItems: "center", fontSize: 9, borderTop: "1px solid #fff", borderLeft: "1px solid #fff", borderRight: "1px solid #404040", borderBottom: "1px solid #404040" }}>
                {ch}
              </span>
            ))}
          </span>
        </div>
        <div style={{ padding: "10px 8px", fontSize: 11 }}>
          <div style={{ marginBottom: 8 }}>Beveled 2-step hardware chrome.</div>
          <div style={{ display: "flex", gap: 6 }}>
            {["OK", "Cancel"].map((b) => (
              <span key={b} style={{ padding: "3px 10px", fontSize: 10, background: "#d4d0c8", borderTop: "2px solid #ffffff", borderLeft: "2px solid #ffffff", borderRight: "2px solid #404040", borderBottom: "2px solid #404040" }}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),

  "retro-web-96": () => (
    <div style={{ height: "100%", background: "#ffffff", color: "#000000", padding: 12, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-mono)" }}>
      <div style={{ background: "#c0d4a7", border: "1px solid #000000", padding: "4px 8px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 10, fontWeight: 700 }}>
        <span>CATALOG INDEX // 1996</span>
        <span style={{ background: "#e91d2a", color: "#ffffff", padding: "0 5px", fontSize: 9 }}>NEW!</span>
      </div>
      <div style={{ border: "1px solid #000000", display: "grid", gridTemplateColumns: "1fr 1fr", fontSize: 10 }}>
        <div style={{ padding: "7px 8px", borderRight: "1px solid #000000", borderBottom: "1px solid #000000", background: "#a5b8c0", fontWeight: 700 }}>SYSTEMS</div>
        <div style={{ padding: "7px 8px", borderBottom: "1px solid #000000", background: "#a5b8c0", fontWeight: 700 }}>SPECS</div>
        <div style={{ padding: "7px 8px", borderRight: "1px solid #000000", color: "#0000ee", textDecoration: "underline" }}>Workstation Pro</div>
        <div style={{ padding: "7px 8px" }}>200MHz / 32MB</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9 }}>
        <span style={{ color: "#0000ee", textDecoration: "underline" }}>[Order Online]</span>
        <span style={{ background: "#fcc20f", color: "#000000", padding: "0 5px", fontWeight: 700 }}>0PX RADIUS</span>
      </div>
    </div>
  ),

  "phosphor-terminal": () => (
    <div style={{ height: "100%", background: "#1a1522", color: "#e5f7d4", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-mono)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 9, color: "#a5a7ad" }}>
        <span>~/ui-vault (main)</span>
        <span style={{ color: "#8b5cf6", border: "1px solid rgba(139,92,246,0.45)", padding: "1px 6px", borderRadius: 3 }}>ZSH · 12ms</span>
      </div>
      <div style={{ background: "#0b0c10", border: "1px solid rgba(229,247,212,0.16)", borderRadius: 6, padding: "10px 12px", fontSize: 11 }}>
        <div>
          <span style={{ color: "#edf872" }}>$</span> npx shadcn@latest validate
        </div>
        <div style={{ color: "#43c251", marginTop: 5, fontSize: 10 }}>
          ✔ 76 items verified · 0 errors{" "}
          <span style={{ display: "inline-block", width: 6, height: 11, background: "#edf872", verticalAlign: "middle" }} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#a5a7ad" }}>
        <span>PHOSPHOR SHELL</span>
        <span style={{ color: "#edf872" }}>#EDF872 / #43C251</span>
      </div>
    </div>
  ),

  "eight-bit-arcade": () => (
    <div style={{ height: "100%", background: "#111226", color: "#ffffff", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-mono)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, fontWeight: 700 }}>
        <span style={{ color: "#ffd43b" }}>1UP 004200</span>
        <span style={{ color: "#fa5252" }}>♥♥♥</span>
      </div>
      <div style={{ background: "#1c1e3a", border: "2px solid #ffffff", boxShadow: "4px 4px 0 #000000", padding: "10px 12px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em" }}>STAGE 02 // READY</div>
        <div style={{ marginTop: 6, display: "flex", gap: 3 }}>
          {[1, 1, 1, 1, 0].map((v, i) => (
            <span key={i} style={{ flex: 1, height: 6, background: v ? "#40c057" : "#2f335c" }} />
          ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#a4a8d4" }}>
        <span>STEPPED PIXEL HUD</span>
        <span style={{ color: "#ffd43b" }}>PRESS START</span>
      </div>
    </div>
  ),
};
