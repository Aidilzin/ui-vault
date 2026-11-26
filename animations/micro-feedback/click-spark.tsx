/**
 * Adapted from React Bits (`https://reactbits.dev/r/ClickSpark-TS-CSS.json`).
 * License: MIT (React Bits Open Registry).
 * Zero-dependency canvas radial spark burst on click with prefers-reduced-motion fallback.
 */
import { useEffect, useRef } from "react";
import type { CSSProperties, MouseEvent, ReactNode } from "react";

export interface ClickSparkProps {
  sparkColor?: string;
  sparkCount?: number;
  sparkRadius?: number;
  durationMs?: number;
  children: ReactNode;
  style?: CSSProperties;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  start: number;
}

export function ClickSpark({
  sparkColor = "#38bdf8",
  sparkCount = 8,
  sparkRadius = 22,
  durationMs = 360,
  children,
  style,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    const draw = (now: number) => {
      const parent = canvas.parentElement;
      if (parent && (canvas.width !== parent.clientWidth || canvas.height !== parent.clientHeight)) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparksRef.current = sparksRef.current.filter((spark) => {
        const t = (now - spark.start) / durationMs;
        if (t >= 1) return false;
        const eased = t * (2 - t);
        const dist = eased * sparkRadius;
        const len = 10 * (1 - eased);
        const x1 = spark.x + dist * Math.cos(spark.angle);
        const y1 = spark.y + dist * Math.sin(spark.angle);
        const x2 = spark.x + (dist + len) * Math.cos(spark.angle);
        const y2 = spark.y + (dist + len) * Math.sin(spark.angle);
        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return true;
      });

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [sparkColor, sparkRadius, durationMs]);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = performance.now();
    for (let i = 0; i < sparkCount; i++) {
      sparksRef.current.push({
        x,
        y,
        angle: (2 * Math.PI * i) / sparkCount,
        start: now,
      });
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{ position: "relative", width: "100%", height: "100%", ...style }}
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
          zIndex: 2,
        }}
      />
      {children}
    </div>
  );
}
