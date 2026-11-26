/**
 * Adapted from Magic UI (`https://magicui.design/r/blur-fade.json`).
 * License: MIT (Magic UI Open Registry).
 * Zero-dependency optical blur + vertical slide container reveal with prefers-reduced-motion fallback.
 */
import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

export interface BlurFadeProps {
  children: ReactNode;
  delayMs?: number;
  durationMs?: number;
  yOffsetPx?: number;
  blurPx?: number;
  style?: CSSProperties;
}

export function BlurFade({
  children,
  delayMs = 0,
  durationMs = 420,
  yOffsetPx = 10,
  blurPx = 8,
  style,
}: BlurFadeProps) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      style={{
        opacity: shown ? 1 : 0,
        filter: shown ? "blur(0px)" : `blur(${blurPx}px)`,
        transform: shown ? "translate3d(0, 0, 0)" : `translate3d(0, ${yOffsetPx}px, 0)`,
        transition: `opacity ${durationMs}ms ease ${delayMs}ms, filter ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms, transform ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`,
        willChange: "opacity, filter, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
