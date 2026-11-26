/**
 * Clean-room scroll-driven sticky scale card container.
 * Scales smoothly from 0.90 to 1.00 as the container scrolls with prefers-reduced-motion fallback.
 */
import { useEffect, useRef, useState } from "react";

export interface ScrollStickyScaleProps {
  title?: string;
  subtitle?: string;
}

export function ScrollStickyScale({
  title = "SCROLL-LINKED SCALE",
  subtitle = "Scroll inside this preview box to expand card scale from 0.90 to 1.00.",
}: ScrollStickyScaleProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    const onScroll = () => {
      const max = Math.max(1, el.scrollHeight - el.clientHeight);
      setProgress(Math.max(0, Math.min(1, el.scrollTop / max)));
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scale = 0.9 + progress * 0.1;

  return (
    <div
      ref={scrollerRef}
      style={{
        width: "100%",
        maxWidth: 320,
        height: 148,
        overflowY: "auto",
        background: "#090a0c",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: 4,
        padding: 10,
      }}
    >
      <div style={{ height: 260, position: "relative" }}>
        <div
          style={{
            position: "sticky",
            top: 12,
            padding: "16px 14px",
            background: "#15181e",
            border: "1px solid rgba(56, 189, 248, 0.35)",
            borderRadius: 6,
            transform: `scale(${scale.toFixed(3)})`,
            transition: "border-color 140ms ease",
            willChange: "transform",
          }}
        >
          <div
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 10,
              color: "#38bdf8",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {title} // {scale.toFixed(2)}x
          </div>
          <div style={{ fontSize: 12, color: "#cbd5e1", marginTop: 4 }}>{subtitle}</div>
        </div>
      </div>
    </div>
  );
}
