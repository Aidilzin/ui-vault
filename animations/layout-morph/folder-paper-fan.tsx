import React, { useState } from "react";

export interface FolderPaperFanProps {
  label?: string;
  sheets?: string[];
  accentColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function FolderPaperFan({
  label = "SPECIMENS",
  sheets = ["01 // TOKENS", "02 // MOTION", "03 // LAYOUT"],
  accentColor = "#38bdf8",
  className = "",
  style,
}: FolderPaperFanProps) {
  const [open, setOpen] = useState(false);

  const fanTransforms = [
    "translate(-18px, -28px) rotate(-11deg)",
    "translate(0px, -36px) rotate(0deg)",
    "translate(18px, -28px) rotate(11deg)",
  ];

  return (
    <button
      type="button"
      className={className}
      onClick={() => setOpen((v) => !v)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      aria-expanded={open}
      style={{
        appearance: "none",
        background: "transparent",
        border: "none",
        padding: "32px 16px 8px",
        cursor: "pointer",
        position: "relative",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        perspective: 600,
        ...style,
      }}
    >
      <div style={{ position: "relative", width: 132, height: 86 }}>
        {/* Back folder tab */}
        <div
          style={{
            position: "absolute",
            top: -10,
            left: 6,
            width: 48,
            height: 14,
            borderRadius: "5px 5px 0 0",
            background: accentColor,
            opacity: 0.72,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 8,
            background: accentColor,
            opacity: 0.3,
            border: `1px solid ${accentColor}`,
          }}
        />

        {/* Tucked document sheets */}
        {sheets.slice(0, 3).map((title, idx) => (
          <div
            key={title}
            style={{
              position: "absolute",
              left: 10,
              right: 10,
              top: 10,
              height: 62,
              borderRadius: 5,
              background: idx === 1 ? "#ffffff" : "#eef2f6",
              color: "#111318",
              border: "1px solid rgba(15,23,42,0.16)",
              padding: "6px 7px",
              fontFamily: "var(--font-mono, monospace)",
              fontSize: 8.5,
              fontWeight: 700,
              textAlign: "left",
              boxShadow: "0 4px 12px rgba(0,0,0,0.22)",
              transform: open
                ? fanTransforms[idx]
                : `translate(0px, ${idx * 3}px) rotate(0deg)`,
              transition: "transform 280ms cubic-bezier(0.22,1,0.36,1)",
              zIndex: idx + 1,
            }}
          >
            {title}
          </div>
        ))}

        {/* Front folder flap */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 58,
            borderRadius: "4px 4px 8px 8px",
            background: accentColor,
            color: "#090a0c",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: "8px 10px",
            fontFamily: "var(--font-mono, monospace)",
            fontSize: 9.5,
            fontWeight: 700,
            letterSpacing: "0.06em",
            transformOrigin: "bottom center",
            transform: open ? "rotateX(-24deg)" : "rotateX(0deg)",
            transition: "transform 260ms cubic-bezier(0.22,1,0.36,1)",
            zIndex: 5,
          }}
        >
          <span>{label}</span>
          <span>{sheets.length}</span>
        </div>
      </div>
    </button>
  );
}
