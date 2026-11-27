import React, { useEffect, useRef } from "react";

export interface FlickeringTelemetryGridProps {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  maxOpacity?: number;
  width?: number;
  height?: number;
  animate?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function FlickeringTelemetryGrid({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.25,
  color = "#38bdf8",
  maxOpacity = 0.36,
  width,
  height,
  animate = true,
  className = "",
  style,
}: FlickeringTelemetryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shouldAnimate = animate && !prefersReduced;

    let rafId = 0;
    let cols = 0;
    let rows = 0;
    let opacities = new Float32Array(0);
    let lastTime = 0;

    const setup = () => {
      const w = Math.max(60, width ?? container.clientWidth);
      const h = Math.max(60, height ?? container.clientHeight);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const step = squareSize + gridGap;
      cols = Math.max(1, Math.floor(w / step));
      rows = Math.max(1, Math.floor(h / step));
      opacities = new Float32Array(cols * rows);
      for (let i = 0; i < opacities.length; i++) {
        const seed = Math.sin(i * 12.9898) * 43758.5453;
        opacities[i] = (seed - Math.floor(seed)) * maxOpacity;
      }
      draw(w, h);
    };

    const draw = (w: number, h: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      const step = squareSize + gridGap;
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          ctx.globalAlpha = opacities[c * rows + r];
          ctx.fillRect(c * step, r * step, squareSize, squareSize);
        }
      }
      ctx.globalAlpha = 1;
    };

    setup();

    const ro =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(setup) : null;
    ro?.observe(container);

    const loop = (now: number) => {
      const dt = Math.min(0.1, (now - lastTime) / 1000 || 0.016);
      lastTime = now;
      for (let i = 0; i < opacities.length; i++) {
        if (Math.random() < flickerChance * dt) {
          opacities[i] = Math.random() * maxOpacity;
        }
      }
      draw(
        width ?? container.clientWidth,
        height ?? container.clientHeight
      );
      rafId = requestAnimationFrame(loop);
    };

    if (shouldAnimate) {
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(rafId);
      ro?.disconnect();
    };
  }, [squareSize, gridGap, flickerChance, color, maxOpacity, width, height, animate]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        width: width ?? "100%",
        height: height ?? "100%",
        overflow: "hidden",
        ...style,
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
