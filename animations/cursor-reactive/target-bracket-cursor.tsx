import React, { useEffect, useRef, useState } from "react";

export interface TargetBracketCursorProps {
  children?: React.ReactNode;
  accentColor?: string;
  bracketSize?: number;
  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_TARGETS = [
  { id: "t1", code: "NODE-01", label: "Edge Router" },
  { id: "t2", code: "NODE-02", label: "Token Engine" },
  { id: "t3", code: "NODE-03", label: "Frame Budget" },
  { id: "t4", code: "NODE-04", label: "Audit Gate" },
];

export function TargetBracketCursor({
  children,
  accentColor = "#38bdf8",
  bracketSize = 10,
  className = "",
  style,
}: TargetBracketCursorProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [rect, setRect] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
    locked: boolean;
  } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage) return;
    const stageRect = stage.getBoundingClientRect();
    const targetEl = (e.target as HTMLElement | null)?.closest<HTMLElement>(
      "[data-bracket-target]"
    );

    if (targetEl && stage.contains(targetEl)) {
      const tr = targetEl.getBoundingClientRect();
      setRect({
        x: tr.left - stageRect.left - 4,
        y: tr.top - stageRect.top - 4,
        w: tr.width + 8,
        h: tr.height + 8,
        locked: true,
      });
    } else {
      const size = 28;
      setRect({
        x: e.clientX - stageRect.left - size / 2,
        y: e.clientY - stageRect.top - size / 2,
        w: size,
        h: size,
        locked: false,
      });
    }
  };

  const handlePointerLeave = () => setRect(null);

  const cornerBase: React.CSSProperties = {
    position: "absolute",
    width: bracketSize,
    height: bracketSize,
    borderColor: accentColor,
    borderStyle: "solid",
    borderWidth: 0,
  };

  return (
    <div
      ref={stageRef}
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        position: "relative",
        padding: 14,
        borderRadius: 6,
        border: "1px solid var(--fui-border, rgba(255,255,255,0.14))",
        background: "var(--fui-canvas, #0b0d12)",
        overflow: "hidden",
        ...style,
      }}
    >
      {children ?? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 10,
          }}
        >
          {DEFAULT_TARGETS.map((item) => (
            <button
              key={item.id}
              type="button"
              data-bracket-target="true"
              style={{
                appearance: "none",
                textAlign: "left",
                padding: "10px 12px",
                borderRadius: 4,
                border: "1px solid var(--fui-border, rgba(255,255,255,0.12))",
                background: "var(--fui-surface, #141820)",
                color: "var(--fui-ink, #e8ecf2)",
                cursor: "crosshair",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: 9.5,
                  color: accentColor,
                  letterSpacing: "0.06em",
                }}
              >
                {item.code}
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, marginTop: 3 }}>
                {item.label}
              </div>
            </button>
          ))}
        </div>
      )}

      {rect && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: rect.w,
            height: rect.h,
            transform: `translate3d(${rect.x.toFixed(1)}px, ${rect.y.toFixed(1)}px, 0)`,
            transition: reducedMotion
              ? "none"
              : rect.locked
                ? "transform 160ms cubic-bezier(0.22,1,0.36,1), width 160ms cubic-bezier(0.22,1,0.36,1), height 160ms cubic-bezier(0.22,1,0.36,1)"
                : "transform 60ms linear, width 140ms ease, height 140ms ease",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <span style={{ ...cornerBase, top: 0, left: 0, borderTopWidth: 2, borderLeftWidth: 2 }} />
          <span style={{ ...cornerBase, top: 0, right: 0, borderTopWidth: 2, borderRightWidth: 2 }} />
          <span style={{ ...cornerBase, bottom: 0, left: 0, borderBottomWidth: 2, borderLeftWidth: 2 }} />
          <span style={{ ...cornerBase, bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2 }} />
        </div>
      )}
    </div>
  );
}
