import React, { useRef, useState } from "react";

export interface SlideToCommitProps {
  label?: string;
  committedLabel?: string;
  accentColor?: string;
  onCommit?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function SlideToCommit({
  label = "Slide to Commit",
  committedLabel = "Committed ✓",
  accentColor = "#38bdf8",
  onCommit,
  className = "",
  style,
}: SlideToCommitProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [committed, setCommitted] = useState(false);

  const THUMB = 34;

  const updateProgress = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const usable = Math.max(1, r.width - THUMB - 8);
    const pct = (clientX - r.left - THUMB / 2 - 4) / usable;
    setProgress(Math.max(0, Math.min(1, pct)));
  };

  const finishDrag = () => {
    setDragging(false);
    if (progress >= 0.82) {
      setProgress(1);
      setCommitted(true);
      onCommit?.();
    } else {
      setProgress(0);
    }
  };

  return (
    <div
      ref={trackRef}
      className={className}
      role="button"
      tabIndex={0}
      aria-pressed={committed}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (committed) {
            setCommitted(false);
            setProgress(0);
          } else {
            setCommitted(true);
            setProgress(1);
            onCommit?.();
          }
        }
      }}
      onClick={() => {
        if (committed) {
          setCommitted(false);
          setProgress(0);
        }
      }}
      onPointerMove={(e) => {
        if (dragging && !committed) updateProgress(e.clientX);
      }}
      onPointerUp={(e) => {
        if (dragging) {
          if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
          }
          finishDrag();
        }
      }}
      style={{
        position: "relative",
        width: 224,
        height: 42,
        borderRadius: 999,
        background: "var(--fui-surface, #141820)",
        border: `1px solid ${committed ? accentColor : "var(--fui-border-strong, rgba(255,255,255,0.2))"}`,
        overflow: "hidden",
        userSelect: "none",
        touchAction: "none",
        cursor: committed ? "pointer" : "grab",
        ...style,
      }}
    >
      {/* Fill progress */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: `${Math.round(progress * 100)}%`,
          background: accentColor,
          opacity: committed ? 0.24 : 0.16,
          transition: dragging ? "none" : "width 240ms cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      {/* Centered rail label */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          fontFamily: "var(--font-mono, monospace)",
          fontSize: 10.5,
          fontWeight: 600,
          letterSpacing: "0.05em",
          color: committed ? accentColor : "var(--fui-ink, #e8ecf2)",
          pointerEvents: "none",
        }}
      >
        {committed ? committedLabel : label}
      </div>

      {/* Draggable thumb */}
      <div
        onPointerDown={(e) => {
          if (committed) return;
          e.stopPropagation();
          setDragging(true);
          trackRef.current?.setPointerCapture(e.pointerId);
          updateProgress(e.clientX);
        }}
        style={{
          position: "absolute",
          top: 3,
          left: 3,
          width: THUMB,
          height: THUMB,
          borderRadius: "50%",
          background: accentColor,
          color: "#090a0c",
          display: "grid",
          placeItems: "center",
          fontFamily: "var(--font-mono, monospace)",
          fontSize: 13,
          fontWeight: 700,
          transform: `translate3d(${(progress * (224 - THUMB - 8)).toFixed(1)}px, 0, 0)`,
          transition: dragging ? "none" : "transform 240ms cubic-bezier(0.22,1,0.36,1)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
        }}
      >
        {committed ? "✓" : "→"}
      </div>
    </div>
  );
}
