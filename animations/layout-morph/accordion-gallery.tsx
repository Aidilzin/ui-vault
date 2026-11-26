/**
 * Adapted from @000h-cojeev (`https://cojeev.com/ui/r/accordion-gallery.json`).
 * License: MIT.
 * Zero-dependency horizontal flex-ratio expanding strip where active panel widens smoothly.
 */
import { useState } from "react";

const PANELS = [
  { id: "01", title: "PRECISION", subtitle: "1px hairlines", bg: "#15181e", accent: "#38bdf8" },
  { id: "02", title: "CERAMIC", subtitle: "Soft halo orbs", bg: "#1a1822", accent: "#f59e0b" },
  { id: "03", title: "EDITORIAL", subtitle: "Pure wordmark", bg: "#171c19", accent: "#34d399" },
  { id: "04", title: "ARCADE", subtitle: "8-bit pixels", bg: "#21161c", accent: "#f43f5e" },
];

export function AccordionGallery() {
  const [active, setActive] = useState(0);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div style={{ display: "flex", gap: 6, width: "100%", maxWidth: 340, height: 132 }}>
      {PANELS.map((panel, idx) => {
        const isOpen = idx === active;
        return (
          <button
            key={panel.id}
            type="button"
            onMouseEnter={() => setActive(idx)}
            onClick={() => setActive(idx)}
            style={{
              flex: isOpen ? 3.2 : 1,
              minWidth: 0,
              padding: "10px 8px",
              borderRadius: 4,
              border: `1px solid ${isOpen ? panel.accent : "rgba(255,255,255,0.12)"}`,
              background: panel.bg,
              color: "#e8ecf2",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              textAlign: "left",
              overflow: "hidden",
              cursor: "pointer",
              transition: reduced ? "none" : "flex 280ms cubic-bezier(0.22, 1, 0.36, 1), border-color 160ms ease",
            }}
          >
            <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 10, color: panel.accent }}>
              {panel.id}
            </span>
            <div style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
              <div style={{ fontSize: 11, fontWeight: 700 }}>{panel.title}</div>
              {isOpen && <div style={{ fontSize: 10, color: "#8b94a3", marginTop: 2 }}>{panel.subtitle}</div>}
            </div>
          </button>
        );
      })}
    </div>
  );
}
