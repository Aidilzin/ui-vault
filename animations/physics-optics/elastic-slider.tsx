/**
 * Adapted from React Bits (`https://reactbits.dev/r/ElasticSlider-TS-CSS.json`).
 * License: MIT (React Bits Open Registry).
 * Zero-dependency elastic range slider that stretches when pulled past bounds.
 */
import { useRef, useState } from "react";
import type { PointerEvent } from "react";

export interface ElasticSliderProps {
  defaultValue?: number;
  min?: number;
  max?: number;
  accentColor?: string;
  onChange?: (value: number) => void;
}

export function ElasticSlider({
  defaultValue = 58,
  min = 0,
  max = 100,
  accentColor = "#38bdf8",
  onChange,
}: ElasticSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(defaultValue);
  const [stretch, setStretch] = useState({ scaleX: 1, shiftX: 0 });
  const draggingRef = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const rawRatio = (clientX - rect.left) / rect.width;
    const clamped = Math.max(0, Math.min(1, rawRatio));
    const nextVal = Math.round(min + clamped * (max - min));
    setValue(nextVal);
    onChange?.(nextVal);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStretch({ scaleX: 1, shiftX: 0 });
      return;
    }

    if (rawRatio < 0) {
      const over = Math.min(28, Math.abs(rawRatio) * 60);
      setStretch({ scaleX: 1 + over * 0.004, shiftX: -over * 0.35 });
    } else if (rawRatio > 1) {
      const over = Math.min(28, (rawRatio - 1) * 60);
      setStretch({ scaleX: 1 + over * 0.004, shiftX: over * 0.35 });
    } else {
      setStretch({ scaleX: 1, shiftX: 0 });
    }
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = () => {
    draggingRef.current = false;
    setStretch({ scaleX: 1, shiftX: 0 });
  };

  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div style={{ width: "100%", maxWidth: 280, userSelect: "none" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 11,
          fontVariantNumeric: "tabular-nums",
          color: "#8b94a3",
        }}
      >
        <span>GAIN</span>
        <span style={{ color: accentColor }}>{value}%</span>
      </div>
      <div
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") setValue((v) => Math.min(max, v + 5));
          if (e.key === "ArrowLeft") setValue((v) => Math.max(min, v - 5));
        }}
        style={{
          height: 24,
          display: "flex",
          alignItems: "center",
          cursor: "ew-resize",
          touchAction: "none",
          transform: `translate3d(${stretch.shiftX.toFixed(1)}px, 0, 0) scaleX(${stretch.scaleX.toFixed(3)})`,
          transition: draggingRef.current
            ? "none"
            : "transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 6,
            borderRadius: 999,
            background: "rgba(255, 255, 255, 0.12)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: "100%",
              background: accentColor,
              borderRadius: 999,
            }}
          />
        </div>
      </div>
    </div>
  );
}
