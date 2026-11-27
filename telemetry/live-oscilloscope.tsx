import { useEffect, useRef, useState, type CSSProperties } from "react";

export interface LiveOscilloscopeProps {
  label?: string;
  frequency?: number;
  amplitude?: number;
  height?: number;
  reducedMotion?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Rolling real-time Canvas waveform oscilloscope sized via ResizeObserver + devicePixelRatio.
 * Pauses cleanly and renders a crisp static waveform snapshot under prefers-reduced-motion.
 */
export function LiveOscilloscope({
  label = "SIGNAL BUS",
  frequency = 2.4,
  amplitude = 0.68,
  height = 68,
  reducedMotion: reducedMotionProp,
  className,
  style,
}: LiveOscilloscopeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);
  const [sysReduced, setSysReduced] = useState(false);
  const [peakHz, setPeakHz] = useState("60.0Hz");

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setSysReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setSysReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const isStatic = Boolean(reducedMotionProp || sysReduced || paused);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let phase = 0;
    let width = Math.max(120, wrap.clientWidth);

    const resize = () => {
      width = Math.max(120, wrap.clientWidth);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawFrame = (t: number) => {
      const cs = getComputedStyle(wrap);
      const accent =
        cs.getPropertyValue("--tel-accent").trim() ||
        cs.getPropertyValue("--fui-signal-active").trim() ||
        "#38bdf8";
      const border =
        cs.getPropertyValue("--tel-border").trim() || "rgba(128,128,128,0.22)";

      ctx.clearRect(0, 0, width, height);

      // Center baseline + quarter hairlines
      ctx.strokeStyle = border;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Primary waveform trace
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      const midY = height / 2;
      const ampPx = (height * 0.4) * Math.max(0.2, Math.min(1, amplitude));

      for (let x = 0; x <= width; x += 2) {
        const norm = x / width;
        const env = Math.sin(norm * Math.PI);
        const y =
          midY -
          (Math.sin(norm * Math.PI * 2 * frequency + t) * 0.65 +
            Math.sin(norm * Math.PI * 2 * (frequency * 2.3) - t * 1.4) * 0.35) *
            ampPx *
            (0.45 + 0.55 * env);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    resize();
    drawFrame(phase);

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            resize();
            drawFrame(phase);
          })
        : null;
    ro?.observe(wrap);

    if (!isStatic) {
      let frameCount = 0;
      const tick = () => {
        phase += 0.055;
        frameCount += 1;
        drawFrame(phase);
        if (frameCount % 30 === 0) {
          const hz = 58.4 + Math.abs(Math.sin(phase * 0.5)) * 3.1;
          setPeakHz(`${hz.toFixed(1)}Hz`);
        }
        rafId = window.requestAnimationFrame(tick);
      };
      rafId = window.requestAnimationFrame(tick);
    }

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      ro?.disconnect();
    };
  }, [frequency, amplitude, height, isStatic]);

  return (
    <div
      ref={wrapRef}
      className={className}
      role="img"
      aria-label={`${label} oscilloscope ${isStatic ? "(static snapshot)" : "(live)"}`}
      style={{
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        boxSizing: "border-box",
        fontVariantNumeric: "tabular-nums",
        color: "var(--tel-ink, var(--fui-ink, currentColor))",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          marginBottom: 4,
          fontFamily: "var(--font-mono, monospace)",
          fontSize: 10,
        }}
      >
        <span style={{ color: "var(--tel-muted, var(--fui-ink-muted, currentColor))" }}>
          {label} · {peakHz}
        </span>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          style={{
            appearance: "none",
            padding: "1px 6px",
            borderRadius: 2,
            border: "1px solid var(--tel-border, rgba(128,128,128,0.3))",
            background: "transparent",
            color: "var(--tel-accent, var(--fui-signal-active, currentColor))",
            fontFamily: "inherit",
            fontSize: 9,
            cursor: "pointer",
          }}
        >
          {isStatic ? "RESUME" : "PAUSE"}
        </button>
      </div>

      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height,
          borderRadius: 2,
          border: "1px solid var(--tel-border, rgba(128,128,128,0.18))",
        }}
      />
    </div>
  );
}
