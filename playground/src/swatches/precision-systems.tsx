import type { ReactNode } from "react";

export const precisionSystemsSwatches: Record<string, () => ReactNode> = {
  "fui-tactical": () => (
    <div
      style={{
        height: "100%",
        background: "#090a0c",
        color: "#e8ecf2",
        padding: 14,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "var(--font-mono)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, color: "#38bdf8", letterSpacing: "0.08em" }}>+ HUD // SEC-04</span>
        <span style={{ fontSize: 9, color: "#34d399", border: "1px solid rgba(52,211,153,0.35)", padding: "1px 6px", borderRadius: 2 }}>
          NOMINAL
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <div style={{ background: "#0f1115", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 3, padding: "8px 10px" }}>
          <div style={{ fontSize: 9, color: "#586170" }}>FRAME DELTA</div>
          <div style={{ fontSize: 18, fontWeight: 600, fontVariantNumeric: "tabular-nums", marginTop: 2 }}>
            16.4<span style={{ fontSize: 10, color: "#8b94a3" }}>ms</span>
          </div>
        </div>
        <div style={{ background: "#15181e", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 3, padding: "8px 10px" }}>
          <div style={{ fontSize: 9, color: "#586170" }}>SIGNAL LOCK</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: "#38bdf8", fontVariantNumeric: "tabular-nums", marginTop: 2 }}>99.8%</div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#586170", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 6 }}>
        <span>GRID 1PX HAIRLINE</span>
        <span>RADIUS 4PX MAX</span>
      </div>
    </div>
  ),

  "neo-swiss": () => (
    <div style={{ height: "100%", background: "#f5f4f0", color: "#111111", display: "grid", gridTemplateColumns: "1.4fr 1fr", fontFamily: "var(--font-sans)" }}>
      <div style={{ padding: 14, borderRight: "1px solid rgba(17,17,17,0.16)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.06em" }}>01 / EDITION 2026</div>
        <div style={{ fontSize: 30, fontWeight: 800, lineHeight: 0.92, letterSpacing: "-0.05em" }}>GRID<br />ORDER</div>
        <div style={{ fontSize: 10, color: "#444" }}>Zero radius. Mathematical alignment.</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, borderBottom: "1px solid rgba(17,17,17,0.16)", padding: 12, display: "flex", justifyContent: "flex-end" }}>
          <span style={{ width: 14, height: 14, background: "#ff3b00", display: "inline-block" }} />
        </div>
        <div style={{ padding: 12, fontSize: 10, lineHeight: 1.35 }}>
          <div style={{ fontWeight: 700, color: "#ff3b00" }}>FIG. 04</div>
          <div style={{ marginTop: 4 }}>Asymmetric negative space cell.</div>
        </div>
      </div>
    </div>
  ),

  "editorial-mono": () => (
    <div style={{ height: "100%", background: "#0b0b0b", color: "#ffffff", padding: 15, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", color: "#797979" }}>CONTENT ARCHITECTURE // 01</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#19d600", border: "1px solid #353535", background: "#212121", padding: "1px 6px", borderRadius: 3 }}>ACHROMATIC</span>
      </div>
      <div style={{ fontSize: 25, fontWeight: 500, lineHeight: 1.02, letterSpacing: "-0.045em" }}>
        Structured stage.<span style={{ color: "#b9b9b9" }}> Dark press.</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 10, borderTop: "1px solid #212121" }}>
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{ background: "#f36458", color: "#ffffff", padding: "4px 12px", borderRadius: 9999, fontSize: 10, fontWeight: 500 }}>Start building</span>
          <span style={{ background: "#212121", border: "1px solid #353535", color: "#b9b9b9", padding: "3px 10px", borderRadius: 5, fontSize: 10 }}>Docs</span>
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#0052ef" }}>HOVER #0052EF</span>
      </div>
    </div>
  ),

  "industrial-hardware": () => (
    <div style={{ height: "100%", background: "#f1f2f2", color: "#000000", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#4d4d4d", letterSpacing: "0.06em" }}>UNIT-04 // FIELD DECK</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, background: "#e5e5e5", border: "1px solid #b2b2b2", borderRadius: 1000, padding: "1px 8px", color: "#272727" }}>0PX SHADOW</span>
      </div>
      <div style={{ background: "#e5e5e5", border: "1px solid #b2b2b2", borderRadius: 3, padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 300, lineHeight: 1.1 }}>48.0 <span style={{ fontWeight: 700, fontSize: 13 }}>kHz</span></div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#4d4d4d", marginTop: 2 }}>200MS EASE-IN</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[{ bg: "#b81d13", label: "REC" }, { bg: "#0071bb", label: "MOD" }, { bg: "#006837", label: "RUN" }].map((k) => (
            <div key={k.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <span style={{ width: 24, height: 24, borderRadius: "50%", background: k.bg, border: "1px solid #272727", display: "grid", placeItems: "center" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f5f5f5" }} />
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "#4d4d4d" }}>{k.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ width: "58%", height: 6, background: "#cdcece", borderRadius: 1000, overflow: "hidden" }}>
          <div style={{ width: "68%", height: "100%", background: "#000000", borderRadius: 1000 }} />
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#4d4d4d" }}>#F1F2F2 / #B81D13</span>
      </div>
    </div>
  ),

  "telemetry-fault": () => (
    <div style={{ height: "100%", background: "#150f23", color: "#ffffff", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-mono)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, color: "#cfcfdb" }}>TRACE // PROD-EU-01</span>
        <span style={{ fontSize: 9, fontWeight: 700, background: "rgba(250,127,170,0.16)", color: "#fa7faa", border: "1px solid rgba(250,127,170,0.45)", padding: "1px 6px", borderRadius: 3 }}>HTTP 500</span>
      </div>
      <div style={{ background: "#1f1633", border: "1px solid #362d59", borderRadius: 6, padding: "10px 12px" }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#ffffff" }}>TypeError: undefined token</div>
        <div style={{ fontSize: 10, color: "#cfcfdb", marginTop: 4 }}>events: 1,420 · p95: 184ms</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ background: "#6a5fc1", color: "#ffffff", padding: "3px 9px", borderRadius: 4, fontSize: 10 }}>INSPECT STACK</span>
        <span style={{ fontSize: 10, color: "#c2ef4e", fontWeight: 700 }}>● 99.4% RESOLVED</span>
      </div>
    </div>
  ),

  "monochrome-stark": () => (
    <div style={{ height: "100%", background: "#ffffff", color: "#171717", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ebebeb", paddingBottom: 7 }}>
        <span style={{ fontWeight: 700, fontSize: 12, letterSpacing: "-0.02em" }}>▲ EDGE DEPLOY</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#666666" }}>sha:8f2c1a</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <div style={{ background: "#fafafa", border: "1px solid #ebebeb", borderRadius: 6, padding: "8px 10px" }}>
          <div style={{ fontSize: 9, color: "#666666", fontFamily: "var(--font-mono)" }}>STATUS</div>
          <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>Ready · 1.2s</div>
        </div>
        <div style={{ background: "#fafafa", border: "1px solid #ebebeb", borderRadius: 6, padding: "8px 10px" }}>
          <div style={{ fontSize: 9, color: "#666666", fontFamily: "var(--font-mono)" }}>REGION</div>
          <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>iad1 · global</div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ background: "#171717", color: "#ffffff", padding: "4px 12px", borderRadius: 6, fontSize: 10, fontWeight: 600 }}>Deploy Now</span>
        <span style={{ fontSize: 10, color: "#0070f3", fontWeight: 500 }}>Inspect logs →</span>
      </div>
    </div>
  ),

  "dark-gallery-index": () => (
    <div style={{ height: "100%", background: "#0b0b0b", color: "#f5f5f5", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        <span style={{ background: "#f5f5f5", color: "#0b0b0b", padding: "2px 9px", borderRadius: 9999, fontSize: 9, fontWeight: 700 }}>ALL</span>
        <span style={{ border: "1px solid rgba(255,255,255,0.16)", color: "#8c8c8c", padding: "2px 9px", borderRadius: 9999, fontSize: 9 }}>MOTION</span>
        <span style={{ border: "1px solid rgba(255,255,255,0.16)", color: "#8c8c8c", padding: "2px 9px", borderRadius: 9999, fontSize: 9 }}>STUDIO</span>
      </div>
      <div style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Curated Directory</div>
          <div style={{ fontSize: 10, color: "#8c8c8c", marginTop: 2 }}>120ms sharp hover index</div>
        </div>
        <span style={{ background: "#00e9b2", color: "#0b0b0b", padding: "2px 7px", borderRadius: 9999, fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700 }}>FEATURED</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 9, color: "#8c8c8c" }}>
        <span>MATTE OBSIDIAN</span>
        <span style={{ color: "#ffcf00" }}>★ 48 SITES</span>
      </div>
    </div>
  ),

  "swiss-type-foundry": () => (
    <div style={{ height: "100%", background: "#fafafa", color: "#000000", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: 9, color: "#666666" }}>
        <span>SPECIMEN // GROTESK 04</span>
        <span>WGHT 100–900</span>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderTop: "1px solid #d4d4d4", borderBottom: "1px solid #d4d4d4", padding: "6px 0" }}>
        <span style={{ fontSize: 42, fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 0.95 }}>Aa</span>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, fontWeight: 600 }}>Neue Specimen</div>
          <div style={{ fontSize: 10, color: "#666666" }}>Optical size · 24 styles</div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ background: "#ff2f00", color: "#ffffff", padding: "3px 11px", borderRadius: 999, fontSize: 10, fontWeight: 600 }}>Try Typeface</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#666666" }}>#FAFAFA / #FF2F00</span>
      </div>
    </div>
  ),
};
