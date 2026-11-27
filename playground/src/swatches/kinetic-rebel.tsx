import type { ReactNode } from "react";

export const kineticRebelSwatches: Record<string, () => ReactNode> = {
  "neo-brutalism": () => (
    <div style={{ height: "100%", background: "#fffdf5", color: "#000000", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-display)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ background: "#ffde00", border: "2px solid #000", boxShadow: "3px 3px 0 #000", padding: "2px 8px", fontSize: 10, fontWeight: 700, transform: "rotate(-2deg)" }}>
          RAW PRIMITIVE
        </span>
        <span style={{ background: "#ff5c5c", border: "2px solid #000", padding: "2px 6px", fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700 }}>
          0PX BLUR
        </span>
      </div>
      <div style={{ background: "#ffffff", border: "2px solid #000", boxShadow: "4px 4px 0 #000", padding: "10px 12px" }}>
        <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.05 }}>HARD OFFSET SHADOWS</div>
        <div style={{ fontSize: 11, marginTop: 4, fontFamily: "var(--font-mono)" }}>2px solid #000 // 4px 4px 0</div>
      </div>
    </div>
  ),

  "acid-y2k": () => (
    <div
      style={{
        height: "100%",
        background: "#050507",
        backgroundImage: "linear-gradient(rgba(204,255,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(204,255,0,0.08) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        color: "#f8fafc",
        padding: 14,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ background: "linear-gradient(135deg, #ffffff 0%, #7c8496 45%, #f8fafc 55%, #272b36 100%)", color: "#050507", padding: "2px 10px", borderRadius: 999, fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700, letterSpacing: "0.08em" }}>
          CHROME // 2000
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#ff00a8", border: "1px solid #ff00a8", padding: "1px 6px" }}>SN-9904X</span>
      </div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, letterSpacing: "0.1em", color: "#ccff00", lineHeight: 1 }}>ACID//Y2K</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: 9, color: "#94a3b8" }}>
        <span>||| || ||| | ||||</span>
        <span style={{ color: "#ccff00" }}>#CCFF00 + #FF00A8</span>
      </div>
    </div>
  ),

  "console-2001": () => (
    <div style={{ height: "100%", background: "#21242e", color: "#ffffff", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-display)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ background: "#e60012", color: "#ffffff", padding: "2px 10px", borderRadius: 999, fontSize: 9, fontWeight: 700, letterSpacing: "0.06em" }}>CARTRIDGE 01</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#9fbee7" }}>64-BIT // CHROME</span>
      </div>
      <div style={{ background: "#dedede", color: "#21242e", border: "2px solid #3d4f97", borderRadius: 10, padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#21242e" }}>Console 2001</div>
          <div style={{ fontSize: 10, color: "#3d4f97", fontWeight: 600 }}>Molded alloy + cobalt trim</div>
        </div>
        <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#f68d1f", border: "2px solid #21242e", display: "grid", placeItems: "center", fontSize: 10, fontWeight: 700, color: "#21242e" }}>A</span>
      </div>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <span style={{ background: "#3d4f97", color: "#ffffff", padding: "3px 10px", borderRadius: 999, fontSize: 9, fontWeight: 700 }}>PLAY</span>
        <span style={{ background: "#f68d1f", color: "#21242e", padding: "3px 10px", borderRadius: 999, fontSize: 9, fontWeight: 700 }}>DEMO</span>
      </div>
    </div>
  ),

  "zine-wire": () => (
    <div style={{ height: "100%", background: "#131313", color: "#ffffff", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ background: "#5200ff", color: "#ffffff", padding: "2px 8px", fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700 }}>LIVE FEED</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#3cffd0" }}>03:18 UTC</span>
      </div>
      <div style={{ borderLeft: "3px solid #3cffd0", paddingLeft: 10 }}>
        <div style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.02em" }}>
          Kinetic Zine <span style={{ borderBottom: "2px solid #3cffd0" }}>Dispatches</span>
        </div>
        <div style={{ fontSize: 10, color: "#949494", marginTop: 4 }}>High-voltage cyber editorial deck.</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: 9 }}>
        <span style={{ background: "#3cffd0", color: "#000000", padding: "2px 7px", fontWeight: 700 }}>READ STORY</span>
        <span style={{ color: "#949494" }}>#131313 / #3CFFD0</span>
      </div>
    </div>
  ),

  "avant-poster": () => (
    <div style={{ height: "100%", background: "#f1f1f1", color: "#000000", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-display)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: 34, fontWeight: 800, lineHeight: 0.85, letterSpacing: "-0.05em" }}>04</span>
        <span style={{ background: "#711bff", color: "#ffffff", padding: "3px 8px", fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 700 }}>ARCHIVE // EXP</span>
      </div>
      <div style={{ background: "#ffffff", border: "1.5px solid #000000", padding: "8px 10px" }}>
        <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.1 }}>RULE-BREAKING POSTER</div>
        <div style={{ fontSize: 10, color: "#444444", marginTop: 2 }}>Raw newsprint + ultraviolet signal</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 9 }}>
        <span style={{ color: "#711bff", fontWeight: 700 }}>● FEATURED ENTRY</span>
        <span>300MS EASE</span>
      </div>
    </div>
  ),

  "risograph-print": () => (
    <div style={{ height: "100%", background: "#f6f1e7", color: "#171b2e", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-display)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: 9 }}>
        <span style={{ background: "#1d4ed8", color: "#fbf8f2", padding: "2px 6px", fontWeight: 700 }}>DRUM 01 // COBALT</span>
        <span style={{ color: "#ef4444", fontWeight: 700 }}>+3PX OFFSET</span>
      </div>
      <div style={{ background: "#fbf8f2", border: "1.5px solid #1d4ed8", boxShadow: "3px 3px 0 #ef4444", padding: "9px 11px" }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: "#171b2e", lineHeight: 1.05 }}>RISOGRAPH PRESS</div>
        <div style={{ fontSize: 10, color: "#525870", marginTop: 3, fontFamily: "var(--font-mono)" }}>Soy-ink overprint on cream stock</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 9 }}>
        <span style={{ color: "#1d4ed8", fontWeight: 700 }}>#1D4ED8</span>
        <span style={{ color: "#ef4444", fontWeight: 700 }}>#EF4444</span>
      </div>
    </div>
  ),
};
