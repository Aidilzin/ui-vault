/**
 * Clean-room React/TypeScript implementation inspired by Codrops MakeWayGridEffect
 * (`https://github.com/codrops/MakeWayGridEffect`).
 * Selecting a tile expands it smoothly while neighbors make way via WAAPI FLIP.
 */
import { useLayoutEffect, useRef, useState } from "react";

export interface MakeWayItem {
  id: string;
  title: string;
  detail: string;
}

export interface MakeWayGridProps {
  items: MakeWayItem[];
  durationMs?: number;
}

export function MakeWayGrid({ items, durationMs = 300 }: MakeWayGridProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const prevRectsRef = useRef<Map<string, DOMRect>>(new Map());

  const captureRects = () => {
    const map = new Map<string, DOMRect>();
    for (const [id, el] of itemRefs.current.entries()) {
      map.set(id, el.getBoundingClientRect());
    }
    prevRectsRef.current = map;
  };

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const prev = prevRectsRef.current;
    if (prev.size === 0) return;

    for (const [id, el] of itemRefs.current.entries()) {
      const first = prev.get(id);
      if (!first) continue;
      const last = el.getBoundingClientRect();
      const dx = first.left - last.left;
      const dy = first.top - last.top;
      const sx = first.width / (last.width || 1);
      const sy = first.height / (last.height || 1);
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 && Math.abs(sx - 1) < 0.01 && Math.abs(sy - 1) < 0.01) {
        continue;
      }
      el.animate(
        [
          { transformOrigin: "top left", transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` },
          { transformOrigin: "top left", transform: "translate(0px, 0px) scale(1, 1)" },
        ],
        { duration: durationMs, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
      );
    }
  }, [activeId, durationMs]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: 6,
        width: "100%",
        maxWidth: 340,
      }}
    >
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <button
            key={item.id}
            type="button"
            ref={(el) => {
              if (el) itemRefs.current.set(item.id, el);
              else itemRefs.current.delete(item.id);
            }}
            onClick={() => {
              captureRects();
              setActiveId((curr) => (curr === item.id ? null : item.id));
            }}
            style={{
              gridColumn: isActive ? "span 2" : "span 1",
              padding: "10px 10px",
              textAlign: "left",
              background: isActive ? "rgba(56, 189, 248, 0.14)" : "#15181e",
              border: `1px solid ${isActive ? "#38bdf8" : "rgba(255,255,255,0.12)"}`,
              borderRadius: 3,
              color: "#e8ecf2",
              cursor: "pointer",
            }}
          >
            <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 10, color: isActive ? "#38bdf8" : "#8b94a3" }}>
              {item.title}
            </div>
            {isActive && (
              <div style={{ fontSize: 11, marginTop: 4, color: "#cbd5e1" }}>
                {item.detail}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
