/**
 * Clean-room scroll-driven optical pattern distilled from 60fps.design spatial UI archives.
 * Multi-step CSS mask-image + backdrop-filter progressive edge fade for scrollable panels.
 */
import type { CSSProperties, ReactNode } from "react";

export interface ProgressiveBlurEdgeProps {
  children: ReactNode;
  edgeHeight?: number;
  maxBlurPx?: number;
  style?: CSSProperties;
}

export function ProgressiveBlurEdge({
  children,
  edgeHeight = 44,
  maxBlurPx = 10,
  style,
}: ProgressiveBlurEdgeProps) {
  return (
    <div style={{ position: "relative", overflow: "hidden", ...style }}>
      {children}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: edgeHeight,
          pointerEvents: "none",
          backdropFilter: `blur(${maxBlurPx}px)`,
          WebkitBackdropFilter: `blur(${maxBlurPx}px)`,
          maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
          background: "linear-gradient(to bottom, transparent 0%, rgba(9, 10, 12, 0.82) 100%)",
        }}
      />
    </div>
  );
}
