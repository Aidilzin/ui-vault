/**
 * Adapted from @01orbital (`https://01orbital.dev/r/eclipse-orb.json`).
 * License: MIT.
 * Zero-dependency layered planetary eclipse corona orb with breathing luminance & reduced-motion freeze.
 */
import type { CSSProperties } from "react";

export interface EclipseOrbProps {
  size?: number;
  coronaColor?: string;
  accentColor?: string;
  style?: CSSProperties;
}

const KEYFRAMES = `
@keyframes uv-eclipse-breathe {
  0%, 100% { transform: scale(1); opacity: 0.72; }
  50% { transform: scale(1.07); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .uv-eclipse-halo { animation: none !important; opacity: 0.85 !important; }
}
`;

export function EclipseOrb({
  size = 112,
  coronaColor = "#f59e0b",
  accentColor = "#38bdf8",
  style,
}: EclipseOrbProps) {
  return (
    <div style={{ position: "relative", width: size, height: size, display: "grid", placeItems: "center", ...style }}>
      <style>{KEYFRAMES}</style>
      <div
        aria-hidden="true"
        className="uv-eclipse-halo"
        style={{
          position: "absolute",
          inset: -8,
          borderRadius: "50%",
          background: `radial-gradient(circle at 32% 28%, ${coronaColor} 0%, ${accentColor}55 48%, transparent 72%)`,
          filter: "blur(10px)",
          animation: "uv-eclipse-breathe 4.4s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: size * 0.78,
          height: size * 0.78,
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, #1d2028 0%, #07080b 75%)",
          border: `1px solid ${coronaColor}66`,
          boxShadow: `inset -8px -8px 18px rgba(0,0,0,0.85), 0 0 18px ${coronaColor}33`,
        }}
      />
    </div>
  );
}
