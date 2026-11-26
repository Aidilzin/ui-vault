/**
 * Adapted from React Bits (`https://reactbits.dev/r/Dock-TS-CSS.json`).
 * License: MIT (React Bits Open Registry).
 * Zero-dependency proximity-magnified dock bar with prefers-reduced-motion fallback.
 */
import { useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";

export interface DockItem {
  id: string;
  label: string;
  icon: ReactNode;
  onClick?: () => void;
}

export interface DockMagnifyProps {
  items: DockItem[];
  baseSize?: number;
  maxScale?: number;
  distance?: number;
}

export function DockMagnify({
  items,
  baseSize = 38,
  maxScale = 1.48,
  distance = 110,
}: DockMagnifyProps) {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [scales, setScales] = useState<number[]>(() => items.map(() => 1));

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const next = itemRefs.current.map((el) => {
      if (!el) return 1;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const d = Math.abs(e.clientX - cx);
      const t = Math.max(0, 1 - d / distance);
      return 1 + (maxScale - 1) * t * t;
    });
    setScales(next);
  };

  const handleLeave = () => {
    setScales(items.map(() => 1));
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        display: "inline-flex",
        alignItems: "flex-end",
        gap: 8,
        padding: "8px 12px",
        background: "rgba(255, 255, 255, 0.04)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: 10,
        minHeight: baseSize + 24,
      }}
    >
      {items.map((item, idx) => {
        const scale = scales[idx] ?? 1;
        return (
          <button
            key={item.id}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            type="button"
            title={item.label}
            aria-label={item.label}
            onClick={item.onClick}
            style={{
              width: baseSize,
              height: baseSize,
              borderRadius: 8,
              border: "1px solid rgba(255, 255, 255, 0.16)",
              background: "#15181e",
              color: "#e8ecf2",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              transformOrigin: "bottom center",
              transform: `scale(${scale.toFixed(3)})`,
              transition: "transform 120ms cubic-bezier(0.22, 1, 0.36, 1)",
              willChange: "transform",
            }}
          >
            {item.icon}
          </button>
        );
      })}
    </div>
  );
}
