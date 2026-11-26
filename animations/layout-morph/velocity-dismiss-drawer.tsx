/**
 * Clean-room velocity drag-to-dismiss drawer inspired by Vaul.
 * Scoped inside a self-contained preview frame with touch-action: none on the drag handle
 * so pointer dragging never fights main page scrolling.
 */
import { useRef, useState } from "react";
import type { PointerEvent } from "react";

export function VelocityDismissDrawer() {
  const [open, setOpen] = useState(true);
  const [offsetY, setOffsetY] = useState(0);
  const dragRef = useRef<{ active: boolean; startY: number; startTime: number }>({
    active: false,
    startY: 0,
    startTime: 0,
  });

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    dragRef.current = { active: true, startY: e.clientY, startTime: performance.now() };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const dy = e.clientY - dragRef.current.startY;
    // Rubber-band damping when pulling upward past 0
    setOffsetY(dy < 0 ? dy * 0.2 : dy);
  };

  const onUp = () => {
    if (!dragRef.current.active) return;
    const elapsed = Math.max(1, performance.now() - dragRef.current.startTime);
    const velocity = offsetY / elapsed;
    dragRef.current.active = false;
    if (offsetY > 44 || velocity > 0.35) {
      setOpen(false);
    }
    setOffsetY(0);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 320,
        height: 158,
        overflow: "hidden",
        background: "#090a0c",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 6,
        display: "grid",
        placeItems: "center",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          padding: "6px 12px",
          borderRadius: 4,
          border: "1px solid rgba(56,189,248,0.45)",
          background: "rgba(56,189,248,0.14)",
          color: "#38bdf8",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 10,
          cursor: "pointer",
        }}
      >
        OPEN DRAWER SHEET
      </button>

      <div
        style={{
          position: "absolute",
          left: 8,
          right: 8,
          bottom: 0,
          background: "#15181e",
          border: "1px solid rgba(255,255,255,0.18)",
          borderBottom: "none",
          borderRadius: "10px 10px 0 0",
          padding: "8px 14px 14px",
          transform: open
            ? `translate3d(0, ${offsetY.toFixed(1)}px, 0)`
            : "translate3d(0, 115%, 0)",
          transition:
            dragRef.current.active || reduced
              ? "none"
              : "transform 260ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          style={{
            padding: "4px 0 10px",
            display: "grid",
            placeItems: "center",
            cursor: "grab",
            touchAction: "none",
          }}
        >
          <span style={{ width: 38, height: 4, borderRadius: 999, background: "rgba(255,255,255,0.3)" }} />
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#e8ecf2" }}>Velocity Dismiss Sheet</div>
        <div style={{ fontSize: 11, color: "#8b94a3", marginTop: 3 }}>
          Drag handle down to dismiss (rubber-band upward).
        </div>
      </div>
    </div>
  );
}
