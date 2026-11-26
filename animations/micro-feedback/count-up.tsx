/**
 * Adapted from React Bits (`https://reactbits.dev/r/CountUp-TS-CSS.json`).
 * License: MIT (React Bits Open Registry).
 * Zero-dependency eased tabular-nums numeric counter with prefers-reduced-motion fallback.
 */
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

export interface CountUpProps {
  from?: number;
  to: number;
  durationMs?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  style?: CSSProperties;
}

export function CountUp({
  from = 0,
  to,
  durationMs = 900,
  prefix = "",
  suffix = "",
  decimals = 0,
  style,
}: CountUpProps) {
  const [val, setVal] = useState(from);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(to);
      return;
    }

    let rafId = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(from + (to - from) * eased);
      if (t < 1) rafId = requestAnimationFrame(tick);
      else setVal(to);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [from, to, durationMs]);

  return (
    <span style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}
