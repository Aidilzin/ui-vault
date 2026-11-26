/**
 * Adapted from KokonutUI (`https://kokonutui.com/r/hold-button.json`).
 * License: MIT (KokonutUI Open Registry).
 * Zero-dependency press-and-hold confirmation button with progress fill and release snap.
 */
import { useEffect, useRef, useState } from "react";

export interface HoldToConfirmProps {
  label?: string;
  confirmedLabel?: string;
  holdDurationMs?: number;
  accentColor?: string;
  onConfirm?: () => void;
}

export function HoldToConfirm({
  label = "HOLD TO PURGE CACHE",
  confirmedLabel = "CONFIRMED",
  holdDurationMs = 900,
  accentColor = "#f43f5e",
  onConfirm,
}: HoldToConfirmProps) {
  const [progress, setProgress] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef(0);

  const cancelHold = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    if (!confirmed) setProgress(0);
  };

  const startHold = () => {
    if (confirmed) {
      setConfirmed(false);
      setProgress(0);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      setConfirmed(true);
      onConfirm?.();
      return;
    }

    startRef.current = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - startRef.current) / holdDurationMs);
      setProgress(t);
      if (t >= 1) {
        setConfirmed(true);
        onConfirm?.();
        rafRef.current = null;
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <button
      type="button"
      onPointerDown={startHold}
      onPointerUp={cancelHold}
      onPointerLeave={cancelHold}
      onPointerCancel={cancelHold}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "10px 18px",
        borderRadius: 4,
        border: `1px solid ${confirmed ? "#34d399" : accentColor}`,
        background: "#15181e",
        color: "#ffffff",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: 11,
        letterSpacing: "0.06em",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: confirmed ? "rgba(52, 211, 153, 0.25)" : `${accentColor}44`,
          transformOrigin: "left center",
          transform: `scaleX(${progress.toFixed(3)})`,
          pointerEvents: "none",
        }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>
        {confirmed ? confirmedLabel : label}
      </span>
    </button>
  );
}
