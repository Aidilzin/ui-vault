/**
 * Adapted from Magic UI (`https://magicui.design/r/animated-beam.json`).
 * License: MIT (Magic UI Open Registry).
 * Zero-dependency SVG cubic-bezier signal connector beam with prefers-reduced-motion fallback.
 */
import { useId } from "react";
import type { CSSProperties } from "react";

export interface AnimatedConnectorBeamProps {
  fromLabel?: string;
  toLabel?: string;
  beamColor?: string;
  durationSec?: number;
  style?: CSSProperties;
}

const KEYFRAMES = `
@keyframes uv-connector-dash {
  0% { stroke-dashoffset: 260; }
  100% { stroke-dashoffset: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .uv-connector-pulse { animation: none !important; stroke-dasharray: none !important; opacity: 0.7; }
}
`;

export function AnimatedConnectorBeam({
  fromLabel = "CLIENT",
  toLabel = "VAULT",
  beamColor = "#38bdf8",
  durationSec = 2.4,
  style,
}: AnimatedConnectorBeamProps) {
  const gradId = `uv-beam-${useId().replace(/:/g, "")}`;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 320,
        height: 110,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 14px",
        ...style,
      }}
    >
      <style>{KEYFRAMES}</style>
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "8px 12px",
          background: "#15181e",
          border: "1px solid rgba(255,255,255,0.16)",
          borderRadius: 6,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 10,
          color: "#e8ecf2",
        }}
      >
        {fromLabel}
      </div>

      <svg
        viewBox="0 0 220 80"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={beamColor} stopOpacity="0" />
            <stop offset="50%" stopColor={beamColor} stopOpacity="1" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 38 40 C 90 10, 130 70, 182 40"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="2"
        />
        <path
          className="uv-connector-pulse"
          d="M 38 40 C 90 10, 130 70, 182 40"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="65 195"
          style={{ animation: `uv-connector-dash ${durationSec}s linear infinite` }}
        />
      </svg>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "8px 12px",
          background: "#15181e",
          border: `1px solid ${beamColor}66`,
          borderRadius: 6,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 10,
          color: beamColor,
        }}
      >
        {toLabel}
      </div>
    </div>
  );
}
