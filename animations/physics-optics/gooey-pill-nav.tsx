/**
 * Clean-room metaball navigation inspired by Rare UI gooey-nav mechanics.
 * Applies SVG feGaussianBlur + feColorMatrix ONLY to an aria-hidden background pill layer
 * behind crisp, unfiltered foreground text labels so typography never blurs.
 */
import { useId, useLayoutEffect, useRef, useState } from "react";

export interface GooeyNavItem {
  id: string;
  label: string;
}

const DEFAULT_ITEMS: GooeyNavItem[] = [
  { id: "lab", label: "LAB" },
  { id: "styles", label: "STYLES" },
  { id: "graph", label: "GRAPH" },
];

export function GooeyPillNav({ items = DEFAULT_ITEMS }: { items?: GooeyNavItem[] }) {
  const filterId = `uv-gooey-${useId().replace(/:/g, "")}`;
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const btnRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [pill, setPill] = useState({ left: 0, width: 64 });

  useLayoutEffect(() => {
    const el = btnRefs.current.get(activeId);
    if (!el) return;
    setPill({ left: el.offsetLeft, width: el.offsetWidth });
  }, [activeId, items]);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div style={{ position: "relative", display: "inline-flex", padding: 5, gap: 4, background: "#0f1115", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999 }}>
      <svg aria-hidden="true" style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
          </filter>
        </defs>
      </svg>

      {/* Filtered metaball background layer ONLY (typography stays completely unfiltered above) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          filter: reduced ? "none" : `url(#${filterId})`,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 5,
            bottom: 5,
            left: 0,
            width: pill.width,
            borderRadius: 999,
            background: "#38bdf8",
            transform: `translate3d(${pill.left}px, 0, 0)`,
            transition: reduced ? "none" : "transform 280ms cubic-bezier(0.22, 1, 0.36, 1), width 280ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>

      {/* Crisp unfiltered foreground text buttons */}
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            ref={(el) => {
              if (el) btnRefs.current.set(item.id, el);
              else btnRefs.current.delete(item.id);
            }}
            type="button"
            onClick={() => setActiveId(item.id)}
            style={{
              position: "relative",
              zIndex: 1,
              padding: "6px 14px",
              border: "none",
              borderRadius: 999,
              background: "transparent",
              color: active ? "#090a0c" : "#8b94a3",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              transition: "color 160ms ease",
            }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
