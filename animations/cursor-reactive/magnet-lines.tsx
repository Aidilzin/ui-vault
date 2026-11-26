/**
 * Adapted from React Bits (`https://reactbits.dev/r/MagnetLines-TS-CSS.json`).
 * License: MIT (React Bits Open Registry).
 * Zero-dependency vector tick field rotating toward pointer with prefers-reduced-motion fallback.
 */
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

export interface MagnetLinesProps {
  rows?: number;
  columns?: number;
  lineColor?: string;
  lineWidth?: number;
  lineHeight?: number;
  baseAngle?: number;
  className?: string;
  style?: CSSProperties;
}

export function MagnetLines({
  rows = 5,
  columns = 9,
  lineColor = "#38bdf8",
  lineWidth = 2,
  lineHeight = 16,
  baseAngle = -12,
  className,
  style,
}: MagnetLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(container.querySelectorAll<HTMLSpanElement>("[data-magnet-line]"));

    const onPointerMove = (e: PointerEvent) => {
      for (const item of items) {
        const rect = item.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const angle = (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI;
        item.style.transform = `rotate(${(angle + 90).toFixed(1)}deg)`;
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [rows, columns]);

  const total = rows * columns;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        placeItems: "center",
        gap: 10,
        ...style,
      }}
    >
      {Array.from({ length: total }, (_, idx) => (
        <span
          key={idx}
          data-magnet-line=""
          style={{
            display: "block",
            width: lineWidth,
            height: lineHeight,
            borderRadius: 1,
            background: lineColor,
            transform: `rotate(${baseAngle}deg)`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
