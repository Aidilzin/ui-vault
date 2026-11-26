/**
 * Adapted from React Bits (`https://reactbits.dev/r/BlurText-TS-CSS.json`).
 * License: MIT (React Bits Open Registry).
 * Zero-dependency staggered optical blur-to-focus text reveal with prefers-reduced-motion fallback.
 */
import { useEffect, useState } from "react";

export interface BlurTextProps {
  text: string;
  staggerMs?: number;
  durationMs?: number;
  className?: string;
}

export function BlurText({
  text,
  staggerMs = 55,
  durationMs = 460,
  className,
}: BlurTextProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }
    const id = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(id);
  }, [text]);

  const words = text.split(" ");

  return (
    <span className={className} aria-label={text}>
      {words.map((word, idx) => (
        <span
          key={`${word}-${idx}`}
          aria-hidden="true"
          style={{
            display: "inline-block",
            marginRight: "0.28em",
            filter: revealed ? "blur(0px)" : "blur(10px)",
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translate3d(0, 0, 0)" : "translate3d(0, 10px, 0)",
            transition: `filter ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) ${idx * staggerMs}ms, opacity ${durationMs}ms ease ${idx * staggerMs}ms, transform ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) ${idx * staggerMs}ms`,
            willChange: "filter, opacity, transform",
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
