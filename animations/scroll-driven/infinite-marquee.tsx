/**
 * Adapted from Magic UI (`https://magicui.design/r/marquee.json`).
 * License: MIT (Magic UI Open Registry).
 * Zero-dependency seamless infinite marquee strip with pause-on-hover and edge fade mask.
 */
import { useState } from "react";
import type { CSSProperties } from "react";

export interface InfiniteMarqueeProps {
  items: string[];
  durationSec?: number;
  pauseOnHover?: boolean;
  style?: CSSProperties;
}

const KEYFRAMES = `
@keyframes uv-infinite-marquee {
  0% { transform: translate3d(0%, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}
@media (prefers-reduced-motion: reduce) {
  .uv-infinite-marquee-track { animation: none !important; }
}
`;

export function InfiniteMarquee({
  items,
  durationSec = 14,
  pauseOnHover = true,
  style,
}: InfiniteMarqueeProps) {
  const [paused, setPaused] = useState(false);
  const doubled = [...items, ...items];

  return (
    <div
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 340,
        overflow: "hidden",
        maskImage: "linear-gradient(90deg, transparent 0%, black 14%, black 86%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, black 14%, black 86%, transparent 100%)",
        ...style,
      }}
    >
      <style>{KEYFRAMES}</style>
      <div
        className="uv-infinite-marquee-track"
        style={{
          display: "flex",
          gap: 8,
          width: "max-content",
          willChange: "transform",
          animation: `uv-infinite-marquee ${durationSec}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {doubled.map((item, idx) => (
          <span
            key={`${item}-${idx}`}
            style={{
              padding: "6px 12px",
              background: "#15181e",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: 4,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 11,
              color: "#e8ecf2",
              whiteSpace: "nowrap",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
