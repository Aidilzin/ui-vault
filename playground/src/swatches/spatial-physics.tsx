import type { ReactNode } from "react";

export const spatialPhysicsSwatches: Record<string, () => ReactNode> = {
  "liquid-glass": () => (
    <div
      style={{
        height: "100%",
        position: "relative",
        background: "radial-gradient(circle at 18% 25%, #38bdf8 0%, transparent 45%), radial-gradient(circle at 82% 72%, #f43f5e 0%, transparent 48%), radial-gradient(circle at 60% 18%, #34d399 0%, transparent 38%), #070b14",
        padding: 16,
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          padding: "14px 16px",
          borderRadius: 12,
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(18px) saturate(160%)",
          WebkitBackdropFilter: "blur(18px) saturate(160%)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.28)",
          color: "#ffffff",
        }}
      >
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, opacity: 0.8 }}>SPECULAR RIM // BLUR 18PX</div>
        <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4 }}>Liquid Glass Surface</div>
        <div style={{ fontSize: 11, opacity: 0.78, marginTop: 2 }}>Refractive depth over ambient chroma.</div>
      </div>
    </div>
  ),

  "ambient-orbit": () => (
    <div style={{ height: "100%", background: "radial-gradient(ellipse at 50% 50%, #161f33 0%, #0a0e18 65%, #06070a 100%)", color: "#e8ecf2", position: "relative", overflow: "hidden", display: "grid", placeItems: "center", fontFamily: "var(--font-mono)" }}>
      <svg viewBox="0 0 280 160" style={{ width: "100%", height: "100%", display: "block" }} aria-hidden="true">
        <g transform="translate(140 82) rotate(-7)">
          <ellipse cx="0" cy="0" rx="46" ry="17" fill="none" stroke="rgba(255,255,255,0.22)" />
          <ellipse cx="0" cy="0" rx="82" ry="30" fill="none" stroke="rgba(255,255,255,0.17)" />
          <ellipse cx="0" cy="0" rx="116" ry="43" fill="none" stroke="rgba(255,255,255,0.13)" />
          <circle cx="-72" cy="-16" r="4.5" fill="#111318" stroke="rgba(255,255,255,0.22)" opacity="0.5" />
          <circle cx="52" cy="24" r="6.5" fill="#111318" stroke="rgba(255,255,255,0.34)" />
          <circle cx="62" cy="18" r="2.3" fill="#38bdf8" />
          <circle cx="43" cy="30" r="2" fill="#7a8494" />
          <circle cx="-94" cy="22" r="5.5" fill="#111318" stroke="rgba(255,255,255,0.26)" />
          <circle cx="-102" cy="16" r="2.2" fill="#f59e0b" />
          <circle cx="0" cy="0" r="9" fill="#020204" stroke="rgba(255,224,178,0.8)" strokeWidth="1.2" />
        </g>
      </svg>
      <span style={{ position: "absolute", bottom: 8, left: 12, fontSize: 9, color: "#7a8494", letterSpacing: "0.08em" }}>
        2.5D DEPTH-SORTED RADAR // #06070A
      </span>
    </div>
  ),

  "command-dark": () => (
    <div style={{ height: "100%", background: "#07080a", color: "#ffffff", padding: 14, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-sans)" }}>
      <div style={{ width: "100%", background: "#101111", border: "1px solid #434345", borderRadius: 10, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14)", overflow: "hidden" }}>
        <div style={{ padding: "8px 11px", borderBottom: "1px solid #242728", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: "#9c9c9d" }}>
          <span>Search commands...</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, background: "#242728", padding: "1px 5px", borderRadius: 4, color: "#e8e8e8" }}>⌘K</span>
        </div>
        <div style={{ padding: 5, display: "flex", flexDirection: "column", gap: 3 }}>
          <div style={{ background: "#242728", borderRadius: 6, padding: "6px 9px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 11, fontWeight: 600 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: "#ff6363" }} />
              Launch Workspace
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#9c9c9d" }}>↵</span>
          </div>
          <div style={{ padding: "5px 9px", display: "flex", justifyContent: "space-between", fontSize: 10, color: "#9c9c9d" }}>
            <span>Toggle Reduced Motion</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9 }}>⌘M</span>
          </div>
        </div>
      </div>
    </div>
  ),

  "orbital-ceramic": () => (
    <div style={{ height: "100%", background: "#0c0d10", color: "#f1efe9", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-sans)", position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", right: -16, top: -16, width: 96, height: 96, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,168,100,0.45) 0%, rgba(122,167,217,0.18) 55%, transparent 72%)", filter: "blur(8px)" }} />
      <div style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-mono)", fontSize: 9, color: "#8e8c87" }}>CERAMIC // HALO SEAM</div>
      <div style={{ position: "relative", zIndex: 1, background: "#14161b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "10px 12px" }}>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Sculpted Quiet Orb</div>
        <div style={{ fontSize: 10, color: "#8e8c87", marginTop: 2 }}>Diffused corona light on matte basalt</div>
      </div>
      <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 9 }}>
        <span style={{ color: "#e8a864" }}>● CORONA #E8A864</span>
        <span style={{ color: "#7aa7d9" }}>12PX RADIUS</span>
      </div>
    </div>
  ),

  "cinema-noir-motion": () => (
    <div style={{ height: "100%", background: "radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.22) 0%, transparent 62%), #060708", color: "#f4f4f5", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 9, color: "#9ca3af", letterSpacing: "0.08em" }}>
        <span>REEL 04 // 2.39:1</span>
        <span style={{ color: "#f59e0b" }}>● TUNGSTEN</span>
      </div>
      <div style={{ background: "#0e1013", border: "1px solid rgba(255,255,255,0.12)", borderTop: "2px solid #f59e0b", borderRadius: 4, padding: "10px 12px" }}>
        <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em" }}>Cinema Noir Stage</div>
        <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>Obsidian letterbox + amber key light</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 9, color: "#9ca3af" }}>
        <span>#060708 / #F59E0B</span>
        <span>SHUTTER EASE</span>
      </div>
    </div>
  ),

  "velvet-chrome-prism": () => (
    <div style={{ height: "100%", background: "radial-gradient(circle at 20% 20%, rgba(139,92,246,0.24) 0%, transparent 50%), radial-gradient(circle at 82% 80%, rgba(34,211,238,0.2) 0%, transparent 48%), #07050f", color: "#f5f3ff", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 9, color: "#a79fc4" }}>
        <span>PRISM // OPTICS</span>
        <span style={{ color: "#22d3ee" }}>UV-SEAM</span>
      </div>
      <div style={{ background: "#100c1e", border: "1px solid rgba(167,139,250,0.34)", borderRadius: 12, boxShadow: "inset 0 1px 0 rgba(34,211,238,0.3)", padding: "10px 12px" }}>
        <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.02em" }}>Velvet Chrome</div>
        <div style={{ fontSize: 10, color: "#a79fc4", marginTop: 2 }}>Iridescent violet-cyan prism rim</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 9 }}>
        <span style={{ color: "#8b5cf6" }}>#8B5CF6</span>
        <span style={{ color: "#22d3ee" }}>#22D3EE</span>
      </div>
    </div>
  ),
};
