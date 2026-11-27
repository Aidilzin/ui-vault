import React, { useEffect, useMemo, useState } from "react";

export interface TextMorphSwapProps {
  phrases?: string[];
  intervalMs?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function TextMorphSwap({
  phrases = ["Continue", "Confirming...", "Confirmed"],
  intervalMs = 2000,
  className = "",
  style,
}: TextMorphSwapProps) {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion || phrases.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [reducedMotion, phrases.length, intervalMs]);

  const current = phrases[index % phrases.length] ?? "";

  const keyedChars = useMemo(() => {
    const counts: Record<string, number> = {};
    return current.split("").map((ch, pos) => {
      const lower = ch.toLowerCase();
      counts[lower] = (counts[lower] ?? 0) + 1;
      return {
        id: `${lower}-${counts[lower]}`,
        ch: ch === " " ? "\u00A0" : ch,
        delayMs: pos * 18,
      };
    });
  }, [current]);

  return (
    <span
      className={className}
      onClick={() => setIndex((prev) => (prev + 1) % phrases.length)}
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        cursor: "pointer",
        userSelect: "none",
        ...style,
      }}
      title="Click to morph phrase"
    >
      <style>{`
        @keyframes uiVaultMorphIn {
          from { opacity: 0; transform: translateY(4px) scale(0.92); filter: blur(2px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
      `}</style>
      {keyedChars.map((item) => (
        <span
          key={item.id}
          style={{
            display: "inline-block",
            animation: reducedMotion
              ? "none"
              : `uiVaultMorphIn 260ms cubic-bezier(0.22,1,0.36,1) ${item.delayMs}ms both`,
          }}
        >
          {item.ch}
        </span>
      ))}
    </span>
  );
}
