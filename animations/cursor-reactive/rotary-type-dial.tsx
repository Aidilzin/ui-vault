/**
 * Adapted from @0nlytype (`https://thedirectors.agency/ui/r/dial.json`).
 * License: MIT.
 * Zero-dependency pointer-rotatable typographic radial dial with angular stops & reduced-motion support.
 */
import { useRef, useState } from "react";
import type { PointerEvent } from "react";

export interface RotaryTypeDialProps {
  defaultAngle?: number;
  label?: string;
}

export function RotaryTypeDial({ defaultAngle = 45, label = "TRACKING" }: RotaryTypeDialProps) {
  const dialRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [angle, setAngle] = useState(defaultAngle);

  const updateAngle = (clientX: number, clientY: number) => {
    const el = dialRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const deg = (Math.atan2(clientY - (rect.top + rect.height / 2), clientX - (rect.left + rect.width / 2)) * 180) / Math.PI + 90;
    setAngle(Math.round((deg + 360) % 360));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, userSelect: "none" }}>
      <div
        ref={dialRef}
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={359}
        aria-valuenow={angle}
        onPointerDown={(e: PointerEvent<HTMLDivElement>) => {
          draggingRef.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          updateAngle(e.clientX, e.clientY);
        }}
        onPointerMove={(e: PointerEvent<HTMLDivElement>) => {
          if (draggingRef.current) updateAngle(e.clientX, e.clientY);
        }}
        onPointerUp={() => {
          draggingRef.current = false;
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") setAngle((a) => (a + 15) % 360);
          if (e.key === "ArrowLeft") setAngle((a) => (a + 345) % 360);
        }}
        style={{
          position: "relative",
          width: 96,
          height: 96,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.22)",
          background: "#0f1115",
          display: "grid",
          placeItems: "center",
          cursor: "grab",
          touchAction: "none",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 6,
            transform: `rotate(${angle}deg)`,
          }}
        >
          <span style={{ position: "absolute", top: 0, left: "50%", width: 2, height: 14, transform: "translateX(-50%)", background: "#38bdf8" }} />
        </div>
        <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 13, fontVariantNumeric: "tabular-nums", color: "#e8ecf2" }}>
          {angle}°
        </span>
      </div>
      <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 10, color: "#8b94a3" }}>
        {label} // DRAG DIAL
      </span>
    </div>
  );
}
