import React, { useRef, useState } from "react";

export interface BeforeAfterCurtainProps {
  beforeLabel?: string;
  afterLabel?: string;
  beforeContent?: React.ReactNode;
  afterContent?: React.ReactNode;
  defaultPosition?: number;
  accentColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function BeforeAfterCurtain({
  beforeLabel = "RAW WIREFRAME",
  afterLabel = "STYLED SPECIMEN",
  beforeContent,
  afterContent,
  defaultPosition = 50,
  accentColor = "#38bdf8",
  className = "",
  style,
}: BeforeAfterCurtainProps) {
  const [pos, setPos] = useState(defaultPosition);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const pct = ((clientX - r.left) / Math.max(1, r.width)) * 100;
    setPos(Math.max(6, Math.min(94, pct)));
  };

  return (
    <div
      ref={trackRef}
      className={className}
      role="slider"
      tabIndex={0}
      aria-label="Before and after comparison curtain"
      aria-valuemin={6}
      aria-valuemax={94}
      aria-valuenow={Math.round(pos)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(6, p - 5));
        if (e.key === "ArrowRight") setPos((p) => Math.min(94, p + 5));
      }}
      onPointerDown={(e) => {
        setDragging(true);
        e.currentTarget.setPointerCapture(e.pointerId);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging) updateFromClientX(e.clientX);
      }}
      onPointerUp={(e) => {
        setDragging(false);
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      }}
      style={{
        position: "relative",
        width: "100%",
        height: 156,
        borderRadius: 6,
        border: "1px solid var(--fui-border-strong, rgba(255,255,255,0.18))",
        overflow: "hidden",
        userSelect: "none",
        touchAction: "none",
        cursor: "ew-resize",
        ...style,
      }}
    >
      {/* After layer (full right-hand reveal) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 75% 25%, rgba(56,189,248,0.28), transparent 55%), #0c1018",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "#f4f7fb",
        }}
      >
        {afterContent ?? (
          <>
            <span style={{ alignSelf: "flex-end", fontFamily: "var(--font-mono, monospace)", fontSize: 9.5, color: accentColor }}>
              {afterLabel}
            </span>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Calibrated Dark Surface</div>
              <div style={{ fontSize: 11, opacity: 0.72 }}>1px specular rim · WCAG AAA</div>
            </div>
          </>
        )}
      </div>

      {/* Before layer (clipped left side) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `inset(0 ${(100 - pos).toFixed(2)}% 0 0)`,
          background: "#f4f3ef",
          color: "#14161a",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {beforeContent ?? (
          <>
            <span style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 9.5, color: "#525866" }}>
              {beforeLabel}
            </span>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Structural Skeleton</div>
              <div style={{ fontSize: 11, color: "#525866" }}>Container grid · semantic tokens</div>
            </div>
          </>
        )}
      </div>

      {/* Divider handle */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${pos.toFixed(2)}%`,
          width: 2,
          background: accentColor,
          transform: "translateX(-1px)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 24,
            height: 24,
            borderRadius: 999,
            background: accentColor,
            color: "#090a0c",
            display: "grid",
            placeItems: "center",
            fontFamily: "var(--font-mono, monospace)",
            fontSize: 10,
            fontWeight: 700,
            boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          ↔
        </div>
      </div>
    </div>
  );
}
