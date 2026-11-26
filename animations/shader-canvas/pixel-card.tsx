/**
 * Adapted from React Bits (`https://reactbits.dev/r/PixelCard-TS-CSS.json`).
 * License: MIT (React Bits Open Registry).
 * Zero-dependency canvas pixel shimmer grid blooming on hover with prefers-reduced-motion fallback.
 */
import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

export interface PixelCardProps {
  colors?: string[];
  gap?: number;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

interface PixelCell {
  x: number;
  y: number;
  color: string;
  size: number;
  maxSize: number;
  speed: number;
  delay: number;
  counter: number;
  shimmer: boolean;
  reverse: boolean;
}

export function PixelCard({
  colors = ["#38bdf8", "#34d399", "#e8ecf2"],
  gap = 7,
  children,
  className,
  style,
}: PixelCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const w = Math.max(120, container.clientWidth);
    const h = Math.max(90, container.clientHeight);
    canvas.width = w;
    canvas.height = h;

    const cells: PixelCell[] = [];
    for (let x = 0; x < w; x += gap) {
      for (let y = 0; y < h; y += gap) {
        const dist = Math.hypot(x - w / 2, y - h / 2);
        cells.push({
          x,
          y,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 0,
          maxSize: Math.max(2, gap - 3),
          speed: 0.14 + Math.random() * 0.22,
          delay: reduced ? 0 : dist * 0.35,
          counter: 0,
          shimmer: false,
          reverse: false,
        });
      }
    }

    let rafId = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const isHover = activeRef.current;

      for (const c of cells) {
        if (isHover) {
          if (reduced) {
            c.size = c.maxSize * 0.65;
          } else if (c.counter < c.delay) {
            c.counter += 6;
          } else if (!c.shimmer) {
            c.size += c.speed;
            if (c.size >= c.maxSize) c.shimmer = true;
          } else {
            c.size += c.reverse ? -c.speed * 0.6 : c.speed * 0.6;
            if (c.size >= c.maxSize) c.reverse = true;
            if (c.size <= 1) c.reverse = false;
          }
        } else {
          c.counter = 0;
          c.shimmer = false;
          c.size = Math.max(0, c.size - 0.28);
        }

        if (c.size > 0.2) {
          const offset = (c.maxSize - c.size) / 2;
          ctx.fillStyle = c.color;
          ctx.globalAlpha = 0.55;
          ctx.fillRect(c.x + offset, c.y + offset, c.size, c.size);
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [colors, gap]);

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseEnter={() => {
        activeRef.current = true;
      }}
      onMouseLeave={() => {
        activeRef.current = false;
      }}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#0f1115",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: 6,
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
