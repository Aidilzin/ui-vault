import type { ReactNode } from "react";

export const editorialWarmSwatches: Record<string, () => ReactNode> = {
  "warm-manuscript": () => (
    <div style={{ height: "100%", background: "#faf9f5", color: "#141413", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "Georgia, serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--font-sans)", fontSize: 9, color: "#6c6a64", letterSpacing: "0.06em" }}>
        <span>MANUSCRIPT // ESSAY</span>
        <span>68CH MEASURE</span>
      </div>
      <div style={{ background: "#f5f0e8", border: "1px solid #e6dfd8", borderRadius: 10, padding: "10px 12px" }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#141413", lineHeight: 1.15 }}>Calm Editorial Clarity</div>
        <div style={{ fontSize: 11, color: "#6c6a64", marginTop: 4, fontFamily: "var(--font-sans)" }}>
          Warm linen paper and soft carbon ink.
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--font-sans)" }}>
        <span style={{ background: "#cc785c", color: "#ffffff", padding: "4px 12px", borderRadius: 8, fontSize: 10, fontWeight: 600 }}>Continue reading</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#8e8b82" }}>#FAF9F5 / #CC785C</span>
      </div>
    </div>
  ),

  "archival-paper": () => (
    <div style={{ height: "100%", background: "#ffffff", color: "#000000", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 10, color: "#696969" }}>
        <span>Channel / <strong style={{ color: "#00075f" }}>Visual Systems</strong></span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9 }}>142 blocks</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 7 }}>
        {["FIG. 01", "FIG. 02", "FIG. 03"].map((fig) => (
          <div key={fig} style={{ background: "#f7f7f7", border: "1px solid #dedede", borderRadius: 3, padding: "14px 6px", textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 9, color: "#333333" }}>
            {fig}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 9, color: "#696969" }}>
        <span>MUSEUM ARCHIVE</span>
        <span style={{ color: "#00075f", fontWeight: 600 }}>#00075F</span>
      </div>
    </div>
  ),

  "tactile-studio-warm": () => (
    <div style={{ height: "100%", background: "#fcfbfa", color: "#0d0d0d", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 8, flex: 1, marginBottom: 10 }}>
        <div style={{ background: "#f2f1f0", border: "1px solid #e8e6e4", borderRadius: 10, padding: 10, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <span style={{ fontSize: 9, color: "#6e6a69" }}>CLUSTER 06</span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Curated Mood</span>
        </div>
        <div style={{ background: "#e8e6e4", borderRadius: 10, padding: 10, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <span style={{ fontSize: 10, color: "#5c5754", fontWeight: 500 }}>Stone &amp; Clay</span>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ background: "#232323", color: "#ffffff", padding: "3px 11px", borderRadius: 999, fontSize: 10, fontWeight: 500 }}>Save Element</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#6e6a69" }}>150MS EASE</span>
      </div>
    </div>
  ),

  "monochrome-gallery": () => (
    <div style={{ height: "100%", background: "#ffffff", color: "#0a1530", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-sans)" }}>
      <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em" }}>Workspace Spec Doc</div>
      <div style={{ background: "#f7f7f5", border: "1px solid #e6e6e4", borderRadius: 6, padding: "9px 11px", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#dd5b00", fontWeight: 700 }}>/</span>
        <span style={{ fontSize: 11, color: "#37352f" }}>Type slash to insert callout block...</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 10 }}>
        <span style={{ color: "#0075de", fontWeight: 600 }}>Share workspace →</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#787774" }}>#FFFFFF / #0075DE</span>
      </div>
    </div>
  ),

  "pastel-playful": () => (
    <div style={{ height: "100%", background: "#f7f7f5", color: "#000000", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", gap: 7 }}>
        <div style={{ flex: 1, background: "#c5b0f4", border: "1.5px solid #1f1d3d", borderRadius: 10, padding: "10px 10px", color: "#000000" }}>
          <div style={{ fontSize: 12, fontWeight: 700 }}>Frame 01</div>
          <div style={{ fontSize: 9, color: "#1f1d3d" }}>Auto-layout</div>
        </div>
        <div style={{ flex: 1, background: "#dceeb1", border: "1.5px solid #1f1d3d", borderRadius: 10, padding: "10px 10px", color: "#000000" }}>
          <div style={{ fontSize: 12, fontWeight: 700 }}>Tokens</div>
          <div style={{ fontSize: 9, color: "#1f1d3d" }}>4 variables</div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ background: "#f3c9b6", color: "#000000", border: "1.5px solid #1f1d3d", padding: "2px 9px", borderRadius: 999, fontSize: 10, fontWeight: 700 }}>
          ↗ Designer
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#1f1d3d" }}>HIGH-CONTRAST PASTEL</span>
      </div>
    </div>
  ),

  "wordmark-press": () => (
    <div style={{ height: "100%", background: "#f8f6f1", color: "#141311", padding: 14, display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "Georgia, serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 9, color: "#6b665c", borderBottom: "1px solid rgba(20,19,17,0.18)", paddingBottom: 6 }}>
        <span>01 / 04 · WORDMARK</span>
        <span style={{ color: "#c83e2b" }}>[INDEX]</span>
      </div>
      <div style={{ fontSize: 22, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
        Type alone,<br />zero boxes.
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 10, borderTop: "1px solid rgba(20,19,17,0.18)", paddingTop: 6 }}>
        <span style={{ color: "#c83e2b", fontWeight: 600 }}>[OPEN SPEC →]</span>
        <span style={{ color: "#6b665c" }}>0PX RADIUS</span>
      </div>
    </div>
  ),
};
