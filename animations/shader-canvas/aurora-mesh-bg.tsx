/**
 * Clean-room ambient multi-stop aurora mesh backdrop inspired by modern dark SaaS craft.
 * Smooth CSS-composited drift with static reduced-motion freeze.
 */
import type { CSSProperties, ReactNode } from "react";

export interface AuroraMeshBgProps {
  children?: ReactNode;
  style?: CSSProperties;
}

const KEYFRAMES = `
@keyframes uv-aurora-drift {
  0% { transform: translate3d(-6%, -4%, 0) scale(1); }
  50% { transform: translate3d(6%, 4%, 0) scale(1.08); }
  100% { transform: translate3d(-6%, -4%, 0) scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .uv-aurora-layer { animation: none !important; }
}
`;

export function AuroraMeshBg({ children, style }: AuroraMeshBgProps) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#06060a",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: 6,
        ...style,
      }}
    >
      <style>{KEYFRAMES}</style>
      <div
        aria-hidden="true"
        className="uv-aurora-layer"
        style={{
          position: "absolute",
          inset: "-35%",
          background:
            "radial-gradient(circle at 25% 30%, rgba(59, 158, 255, 0.42) 0%, transparent 45%), radial-gradient(circle at 75% 35%, rgba(17, 255, 153, 0.28) 0%, transparent 45%), radial-gradient(circle at 50% 80%, rgba(255, 128, 31, 0.28) 0%, transparent 48%)",
          filter: "blur(28px)",
          animation: "uv-aurora-drift 11s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
