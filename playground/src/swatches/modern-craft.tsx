import type { ReactNode } from "react";

export const modernCraftSwatches: Record<string, () => ReactNode> = {
  "monolith-dark": () => (
    <div style={{ height: "100%", background: "#0f1011", color: "#f7f8f8", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: 9, color: "#8a8f98" }}>
        <span>CYCLE 14 // ACTIVE</span>
        <span style={{ color: "#828fff" }}>14 / 18 DONE</span>
      </div>
      <div style={{ background: "#141516", border: "1px solid #23252a", borderRadius: 6, overflow: "hidden" }}>
        {[
          { id: "UI-104", title: "Tiered token parity check", active: true },
          { id: "UI-108", title: "Lazy viewport stage mount", active: false },
        ].map((row, idx) => (
          <div key={row.id} style={{ padding: "8px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: idx ? "1px solid #23252a" : "none", background: row.active ? "#191a1b" : "transparent" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, minWidth: 0 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: row.active ? "#5e6ad2" : "#62666d", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#8a8f98" }}>{row.id}</span>
              <span style={{ fontSize: 11, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.title}</span>
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: row.active ? "#828fff" : "#62666d" }}>{row.active ? "PROG" : "TODO"}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 9, color: "#62666d" }}>
        <span>1PX #23252A</span>
        <span style={{ color: "#5e6ad2" }}>FOCUS #5E6AD2</span>
      </div>
    </div>
  ),

  "mesh-craft": () => (
    <div style={{ height: "100%", background: "#f6f9fc", color: "#0d253d", position: "relative", overflow: "hidden", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-sans)" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -28,
          left: -10,
          right: -10,
          height: 76,
          background: "linear-gradient(120deg, #533afd 0%, #665efd 45%, #b9b9f9 78%, #f5e9d4 100%)",
          transform: "skewY(-4deg)",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700, color: "#ffffff", letterSpacing: "0.06em" }}>INFRASTRUCTURE</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, background: "rgba(255,255,255,0.22)", color: "#ffffff", padding: "1px 7px", borderRadius: 999 }}>LIVE API</span>
      </div>
      <div style={{ position: "relative", zIndex: 1, background: "#ffffff", border: "1px solid #e3e8ee", borderRadius: 8, padding: "10px 12px", boxShadow: "0 8px 20px rgba(13,37,61,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 10, color: "#64748d" }}>Net volume</div>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.03em", color: "#0d253d" }}>$48,290</div>
        </div>
        <span style={{ background: "#533afd", color: "#ffffff", padding: "4px 10px", borderRadius: 999, fontSize: 10, fontWeight: 600 }}>+18.4%</span>
      </div>
      <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 9, color: "#64748d" }}>
        <span>PORCELAIN #F6F9FC</span>
        <span style={{ color: "#533afd" }}>#533AFD</span>
      </div>
    </div>
  ),

  "bento-grid": () => (
    <div style={{ height: "100%", background: "#f5f5f7", color: "#1d1d1f", padding: 12, display: "grid", gridTemplateColumns: "1.25fr 1fr", gridTemplateRows: "1fr 1fr", gap: 8, fontFamily: "var(--font-sans)" }}>
      <div style={{ gridRow: "span 2", background: "#ffffff", border: "1px solid #e0e0e0", borderRadius: 14, padding: 12, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <span style={{ fontSize: 9, fontWeight: 600, color: "#7a7a7a", letterSpacing: "0.04em" }}>MODULAR BENTO</span>
        <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05 }}>Pro Craft<br />Tiles.</div>
        <span style={{ alignSelf: "flex-start", background: "#0071e3", color: "#ffffff", padding: "3px 10px", borderRadius: 999, fontSize: 9, fontWeight: 600 }}>Explore</span>
      </div>
      <div style={{ background: "#1d1d1f", color: "#ffffff", borderRadius: 14, padding: "10px 12px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.03em" }}>60fps</div>
        <div style={{ fontSize: 9, color: "#a1a1a6" }}>Compositor only</div>
      </div>
      <div style={{ background: "#ffffff", border: "1px solid #e0e0e0", borderRadius: 14, padding: "10px 12px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 600 }}>18px Radii</div>
        <div style={{ fontSize: 9, color: "#7a7a7a" }}>Soft studio tiles</div>
      </div>
    </div>
  ),

  "aurora-mesh": () => (
    <div
      style={{
        height: "100%",
        background: "radial-gradient(circle at 18% 85%, rgba(59,158,255,0.34) 0%, transparent 48%), radial-gradient(circle at 82% 20%, rgba(17,255,153,0.22) 0%, transparent 45%), radial-gradient(circle at 60% 90%, rgba(255,128,31,0.26) 0%, transparent 45%), #06060a",
        color: "#fcfdff",
        padding: 14,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: 9, color: "#a1a4a5" }}>
        <span>AURORA // EDGE</span>
        <span style={{ color: "#11ff99" }}>● 99.99% UPTIME</span>
      </div>
      <div style={{ background: "rgba(16,16,18,0.78)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 8, padding: "10px 12px" }}>
        <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.03em" }}>Email for Developers</div>
        <div style={{ fontSize: 10, color: "#a1a4a5", marginTop: 3 }}>Obsidian surface + luminous horizon</div>
      </div>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <span style={{ background: "#fcfdff", color: "#06060a", padding: "3px 10px", borderRadius: 6, fontSize: 10, fontWeight: 600 }}>Get Started</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#3b9eff" }}>SDK v4.2</span>
      </div>
    </div>
  ),

  "tactile-soft": () => (
    <div style={{ height: "100%", background: "#ffffff", color: "#222222", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <span style={{ background: "#222222", color: "#ffffff", padding: "3px 10px", borderRadius: 999, fontSize: 9, fontWeight: 600 }}>Stays</span>
        <span style={{ border: "1px solid #dddddd", color: "#6a6a6a", padding: "3px 10px", borderRadius: 999, fontSize: 9 }}>Experiences</span>
      </div>
      <div style={{ background: "#ffffff", border: "1px solid #eeeeee", borderRadius: 12, boxShadow: "0 6px 20px rgba(0,0,0,0.08)", padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Kyoto Timber Loft</div>
          <div style={{ fontSize: 10, color: "#6a6a6a", marginTop: 2 }}>$184 night · ★ 4.96</div>
        </div>
        <span style={{ background: "#ff385c", color: "#ffffff", padding: "5px 12px", borderRadius: 999, fontSize: 10, fontWeight: 600 }}>Reserve</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 9, color: "#929292" }}>
        <span>SOFT ELEVATION</span>
        <span style={{ color: "#ff385c" }}>#FF385C</span>
      </div>
    </div>
  ),

  "perceptual-scale": () => (
    <div style={{ height: "100%", background: "#fcfcfd", color: "#1c2024", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: 9, color: "#60646c" }}>
        <span>12-STEP PERCEPTUAL</span>
        <span style={{ color: "#5b5bd6", fontWeight: 700 }}>IRIS-9</span>
      </div>
      <div style={{ display: "flex", gap: 3 }}>
        {["#fcfcfd", "#f9f9fb", "#eff0f3", "#d8d9e0", "#eef0ff", "#5b5bd6", "#1c2024"].map((c, i) => (
          <span key={i} style={{ flex: 1, height: 22, borderRadius: 4, background: c, border: "1px solid #d8d9e0" }} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ background: "#5b5bd6", color: "#ffffff", padding: "4px 11px", borderRadius: 6, fontSize: 10, fontWeight: 600 }}>Solid Step 9</span>
        <span style={{ background: "#eef0ff", color: "#5b5bd6", padding: "4px 10px", borderRadius: 6, fontSize: 10, fontWeight: 600 }}>Soft Step 3</span>
      </div>
    </div>
  ),

  "kinetic-studio-white": () => (
    <div style={{ height: "100%", background: "#fafafa", color: "#111113", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        <span style={{ background: "#0066ff", color: "#ffffff", padding: "3px 10px", borderRadius: 999, fontSize: 9, fontWeight: 600 }}>Spring</span>
        <span style={{ background: "#ffffff", border: "1px solid #e4e4e7", color: "#666870", padding: "3px 10px", borderRadius: 999, fontSize: 9 }}>60fps</span>
      </div>
      <div style={{ background: "#ffffff", border: "1px solid #e4e4e7", borderRadius: 10, boxShadow: "0 4px 16px rgba(15,23,42,0.05)", padding: "10px 12px" }}>
        <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.02em" }}>Kinetic Studio</div>
        <div style={{ fontSize: 10, color: "#666870", marginTop: 2 }}>Alabaster canvas + tactile pill lift</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 9, color: "#666870" }}>
        <span>#FAFAFA / 1PX</span>
        <span style={{ color: "#0066ff" }}>#0066FF</span>
      </div>
    </div>
  ),

  "motion-slate-minimal": () => (
    <div style={{ height: "100%", background: "#ffffff", color: "#18181b", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 9, color: "#71717a" }}>
        <span>PRIMITIVES // DOCS</span>
        <span style={{ color: "#059669" }}>● ZERO HUE</span>
      </div>
      <div style={{ background: "#f8f8f9", border: "1px solid #e4e4e7", borderRadius: 8, padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Motion Slate</div>
          <div style={{ fontSize: 10, color: "#71717a", marginTop: 2 }}>Quiet zinc component frame</div>
        </div>
        <span style={{ background: "#18181b", color: "#ffffff", padding: "3px 9px", borderRadius: 6, fontSize: 9, fontWeight: 600 }}>Run</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 9, color: "#71717a" }}>
        <span>#FFFFFF / #18181B</span>
        <span>8PX RADIUS</span>
      </div>
    </div>
  ),
};
