/**
 * Clean-room React/TypeScript implementation inspired by Codrops CSSMarqueeMenu grain overlay
 * (`https://github.com/codrops/CSSMarqueeMenu`).
 * Lightweight procedural canvas CRT/film-grain texture with stepped transform & reduced-motion freeze.
 */
import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

export interface CrtGrainOverlayProps {
  opacity?: number;
  scanlines?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
}

export function CrtGrainOverlay({
  opacity = 0.18,
  scanlines = true,
  children,
  style,
}: CrtGrainOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const w = 128;
    const h = 128;
    canvas.width = w;
    canvas.height = h;
    const img = ctx.createImageData(w, h);

    let rafId = 0;
    let lastDraw = 0;

    const draw = (now: number) => {
      if (now - lastDraw >= 85 || lastDraw === 0) {
        lastDraw = now;
        const data = img.data;
        for (let i = 0; i < data.length; i += 4) {
          const v = (Math.random() * 255) | 0;
          data[i] = v;
          data[i + 1] = v;
          data[i + 2] = v;
          data[i + 3] = 255;
        }
        ctx.putImageData(img, 0, 0);
      }
      if (!reduced) {
        rafId = requestAnimationFrame(draw);
      }
    };

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#0c0e11",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: 4,
        ...style,
      }}
    >
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity,
          mixBlendMode: "overlay",
          pointerEvents: "none",
          zIndex: 2,
          imageRendering: "pixelated",
        }}
      />
      {scanlines && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.28) 0px, rgba(0,0,0,0.28) 1px, transparent 1px, transparent 3px)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        />
      )}
    </div>
  );
}
