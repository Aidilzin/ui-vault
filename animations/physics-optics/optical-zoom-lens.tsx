import React, { useRef, useState } from "react";

export interface OpticalZoomLensProps {
  children?: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  accentColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function OpticalZoomLens({
  children,
  zoomFactor = 2,
  lensSize = 112,
  accentColor = "#38bdf8",
  className = "",
  style,
}: OpticalZoomLensProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number; active: boolean }>({
    x: 120,
    y: 72,
    active: false,
  });

  const specimen = children ?? (
    <div
      style={{
        padding: 16,
        height: 150,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "repeating-linear-gradient(90deg, rgba(56,189,248,0.08) 0 1px, transparent 1px 18px), repeating-linear-gradient(0deg, rgba(56,189,248,0.08) 0 1px, transparent 1px 18px), #0c1018",
        color: "#e8ecf2",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono, monospace)", fontSize: 9, color: accentColor }}>
        <span>OPTICAL LOUPE // 2.0X</span>
        <span>0.5PX HAIRLINE</span>
      </div>
      <div>
        <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em" }}>
          Inspect Micro-Typography
        </div>
        <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 4, fontFamily: "var(--font-mono, monospace)" }}>
          Hover across surface to magnify kerning &amp; grid pitch.
        </div>
      </div>
    </div>
  );

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = boxRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: e.clientX - r.left,
      y: e.clientY - r.top,
      active: true,
    });
  };

  return (
    <div
      ref={boxRef}
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={() => setPos((p) => ({ ...p, active: false }))}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 6,
        border: "1px solid var(--fui-border-strong, rgba(255,255,255,0.16))",
        cursor: "zoom-in",
        ...style,
      }}
    >
      {specimen}

      {pos.active && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: pos.x - lensSize / 2,
            top: pos.y - lensSize / 2,
            width: lensSize,
            height: lensSize,
            borderRadius: "50%",
            overflow: "hidden",
            border: `2px solid ${accentColor}`,
            boxShadow: "0 10px 28px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.3)",
            pointerEvents: "none",
            zIndex: 8,
            background: "#0c1018",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: boxRef.current?.clientWidth ?? 300,
              height: boxRef.current?.clientHeight ?? 150,
              transformOrigin: "0 0",
              transform: `translate3d(${(lensSize / 2 - pos.x * zoomFactor).toFixed(1)}px, ${(lensSize / 2 - pos.y * zoomFactor).toFixed(1)}px, 0) scale(${zoomFactor})`,
            }}
          >
            {specimen}
          </div>
        </div>
      )}
    </div>
  );
}
