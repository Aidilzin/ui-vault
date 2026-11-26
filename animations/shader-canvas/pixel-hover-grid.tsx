/**
 * Clean-room React/TypeScript implementation inspired by Codrops HoverGrid
 * (`https://github.com/codrops/HoverGrid`).
 * Interactive Canvas pixel-block dissolve/reveal grid driven by pointer proximity.
 */
import { useEffect, useRef } from "react";

export interface PixelHoverGridProps {
  width?: number;
  height?: number;
  cellSize?: number;
  accentColor?: string;
}

export function PixelHoverGrid({
  width = 320,
  height = 144,
  cellSize = 16,
  accentColor = "#38bdf8",
}: PixelHoverGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -999,
    y: -999,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cols = Math.ceil(width / cellSize);
    const rows = Math.ceil(height / cellSize);
    const alphas = new Float32Array(cols * rows);
    let rafId = 0;

    const render = () => {
      ctx.fillStyle = "#0b0d12";
      ctx.fillRect(0, 0, width, height);

      const { x: px, y: py, active } = pointerRef.current;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const cx = c * cellSize + cellSize / 2;
          const cy = r * cellSize + cellSize / 2;
          const dist = Math.hypot(cx - px, cy - py);
          const target = active && dist < 76 ? Math.max(0.15, 1 - dist / 76) : 0;

          if (reduced) {
            alphas[idx] = target;
          } else {
            alphas[idx] += (target - alphas[idx]) * (target > alphas[idx] ? 0.32 : 0.08);
          }

          ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
          ctx.strokeRect(c * cellSize + 0.5, r * cellSize + 0.5, cellSize - 1, cellSize - 1);

          if (alphas[idx] > 0.02) {
            ctx.save();
            ctx.globalAlpha = alphas[idx];
            ctx.fillStyle = accentColor;
            ctx.fillRect(c * cellSize + 2, r * cellSize + 2, cellSize - 4, cellSize - 4);
            ctx.restore();
          }
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, [width, height, cellSize, accentColor]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        pointerRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          active: true,
        };
      }}
      onPointerLeave={() => {
        pointerRef.current.active = false;
      }}
      style={{
        display: "block",
        borderRadius: 4,
        border: "1px solid rgba(255, 255, 255, 0.12)",
        cursor: "crosshair",
      }}
    />
  );
}
