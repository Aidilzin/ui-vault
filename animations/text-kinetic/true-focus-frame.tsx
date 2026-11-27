import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

export interface TrueFocusFrameProps {
  sentence?: string;
  blurAmountPx?: number;
  borderColor?: string;
  intervalMs?: number;
  manualMode?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function TrueFocusFrame({
  sentence = "Precision Kinetic Focus",
  blurAmountPx = 3.5,
  borderColor = "#38bdf8",
  intervalMs = 1700,
  manualMode = false,
  className = "",
  style,
}: TrueFocusFrameProps) {
  const words = sentence.trim().split(/\s+/);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [box, setBox] = useState({ x: 0, y: 0, w: 0, h: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (manualMode || reducedMotion || words.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % words.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [manualMode, reducedMotion, intervalMs, words.length]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const activeEl = wordRefs.current[activeIndex];
    if (!container || !activeEl) return;
    const cr = container.getBoundingClientRect();
    const ar = activeEl.getBoundingClientRect();
    setBox({
      x: ar.left - cr.left - 5,
      y: ar.top - cr.top - 3,
      w: ar.width + 10,
      h: ar.height + 6,
    });
  }, [activeIndex, sentence]);

  const corner: React.CSSProperties = {
    position: "absolute",
    width: 8,
    height: 8,
    borderColor,
    borderStyle: "solid",
    borderWidth: 0,
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        display: "inline-flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "0.38em",
        ...style,
      }}
    >
      {words.map((word, idx) => {
        const isActive = reducedMotion || idx === activeIndex;
        return (
          <span
            key={`${word}-${idx}`}
            ref={(el) => {
              wordRefs.current[idx] = el;
            }}
            onMouseEnter={() => setActiveIndex(idx)}
            style={{
              position: "relative",
              display: "inline-block",
              cursor: "default",
              filter: isActive ? "blur(0px)" : `blur(${blurAmountPx}px)`,
              opacity: isActive ? 1 : 0.56,
              transition: reducedMotion
                ? "none"
                : "filter 260ms ease, opacity 260ms ease",
            }}
          >
            {word}
          </span>
        );
      })}

      {!reducedMotion && box.w > 0 && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: box.w,
            height: box.h,
            transform: `translate3d(${box.x.toFixed(1)}px, ${box.y.toFixed(1)}px, 0)`,
            transition:
              "transform 280ms cubic-bezier(0.22,1,0.36,1), width 280ms cubic-bezier(0.22,1,0.36,1), height 280ms cubic-bezier(0.22,1,0.36,1)",
            pointerEvents: "none",
          }}
        >
          <span style={{ ...corner, top: 0, left: 0, borderTopWidth: 2, borderLeftWidth: 2 }} />
          <span style={{ ...corner, top: 0, right: 0, borderTopWidth: 2, borderRightWidth: 2 }} />
          <span style={{ ...corner, bottom: 0, left: 0, borderBottomWidth: 2, borderLeftWidth: 2 }} />
          <span style={{ ...corner, bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2 }} />
        </span>
      )}
    </div>
  );
}
