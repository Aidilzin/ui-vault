/**
 * Clean-room React/TypeScript implementation inspired by Codrops ElasticGridScroll
 * (`https://github.com/codrops/ElasticGridScroll`).
 * Multi-column scrollable grid where adjacent columns lag at staggered inertia ratios.
 */
import { useEffect, useRef } from "react";

export interface ElasticColumnScrollProps {
  columns?: string[][];
  height?: number;
}

const DEFAULT_COLUMNS: string[][] = [
  ["A-01", "A-02", "A-03", "A-04", "A-05"],
  ["B-01", "B-02", "B-03", "B-04", "B-05"],
  ["C-01", "C-02", "C-03", "C-04", "C-05"],
];

export function ElasticColumnScroll({
  columns = DEFAULT_COLUMNS,
  height = 148,
}: ElasticColumnScrollProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lastScroll = scroller.scrollTop;
    let velocity = 0;
    const offsets = columns.map(() => 0);
    const multipliers = [-0.45, 0.35, -0.65];
    let rafId = 0;

    const onScroll = () => {
      const delta = scroller.scrollTop - lastScroll;
      lastScroll = scroller.scrollTop;
      velocity = Math.max(-24, Math.min(24, delta * 0.9));
    };

    const tick = () => {
      velocity *= 0.86;
      columns.forEach((_, idx) => {
        const target = velocity * (multipliers[idx % multipliers.length] ?? 0.3);
        offsets[idx] += (target - offsets[idx]) * 0.18;
        const el = colRefs.current[idx];
        if (el) {
          el.style.transform = `translate3d(0, ${offsets[idx].toFixed(2)}px, 0)`;
        }
      });
      rafId = requestAnimationFrame(tick);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [columns]);

  return (
    <div
      ref={scrollerRef}
      style={{
        width: "100%",
        maxWidth: 320,
        height,
        overflowY: "auto",
        padding: 10,
        background: "#0b0d12",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: 4,
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns.length}, 1fr)`, gap: 8 }}>
        {columns.map((col, cIdx) => (
          <div
            key={cIdx}
            ref={(el) => {
              colRefs.current[cIdx] = el;
            }}
            style={{ display: "flex", flexDirection: "column", gap: 6, willChange: "transform" }}
          >
            {col.map((label) => (
              <div
                key={label}
                style={{
                  padding: "12px 8px",
                  background: "#15181e",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: 3,
                  textAlign: "center",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize: 10,
                  color: "#e8ecf2",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
