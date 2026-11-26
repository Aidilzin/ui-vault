/**
 * Adapted from Magic UI (`https://magicui.design/r/scroll-progress.json`).
 * License: MIT (Magic UI Open Registry).
 * Zero-dependency compositor-only scroll progress bar supporting window or container scroll.
 */
import { useEffect, useState } from "react";
import type { CSSProperties, RefObject } from "react";

export interface ScrollProgressBarProps {
  containerRef?: RefObject<HTMLElement | null>;
  color?: string;
  height?: number;
  style?: CSSProperties;
}

export function ScrollProgressBar({
  containerRef,
  color = "#38bdf8",
  height = 3,
  style,
}: ScrollProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = containerRef?.current;

    const update = () => {
      if (target) {
        const max = Math.max(1, target.scrollHeight - target.clientHeight);
        setProgress(Math.max(0, Math.min(1, target.scrollTop / max)));
      } else {
        const doc = document.documentElement;
        const max = Math.max(1, doc.scrollHeight - window.innerHeight);
        setProgress(Math.max(0, Math.min(1, window.scrollY / max)));
      }
    };

    update();
    const el: EventTarget = target ?? window;
    el.addEventListener("scroll", update, { passive: true });
    return () => el.removeEventListener("scroll", update);
  }, [containerRef]);

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        width: "100%",
        height,
        background: "rgba(255, 255, 255, 0.08)",
        overflow: "hidden",
        borderRadius: height,
        ...style,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: color,
          transformOrigin: "left center",
          transform: `scaleX(${progress.toFixed(4)})`,
          willChange: "transform",
        }}
      />
    </div>
  );
}
