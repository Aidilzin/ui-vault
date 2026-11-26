/**
 * Clean-room React/TypeScript implementation inspired by Codrops SVGImageHover
 * (`https://github.com/codrops/SVGImageHover`).
 * Animated SVG feTurbulence + feDisplacementMap ripple distortion on hover with reduced-motion fallback.
 */
import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

export interface SvgTurbulenceHoverProps {
  maxScale?: number;
  children: ReactNode;
  style?: CSSProperties;
}

export function SvgTurbulenceHover({
  maxScale = 24,
  children,
  style,
}: SvgTurbulenceHoverProps) {
  const filterId = `uv-turb-${useId().replace(/:/g, "")}`;
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dispRef.current?.setAttribute("scale", "0");
      return;
    }

    let rafId = 0;
    let current = 0;
    const target = hovered ? maxScale : 0;
    let freq = 0.02;

    const tick = () => {
      current += (target - current) * 0.14;
      freq = 0.018 + (current / Math.max(1, maxScale)) * 0.032;
      dispRef.current?.setAttribute("scale", current.toFixed(2));
      turbRef.current?.setAttribute("baseFrequency", `${freq.toFixed(4)} ${(freq * 1.4).toFixed(4)}`);

      if (Math.abs(target - current) > 0.15) {
        rafId = requestAnimationFrame(tick);
      } else {
        dispRef.current?.setAttribute("scale", target.toFixed(2));
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [hovered, maxScale]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", cursor: "pointer", ...style }}
    >
      <svg aria-hidden="true" style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id={filterId}>
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.02 0.03"
              numOctaves={2}
              result="noise"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="noise"
              scale={0}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <div style={{ filter: `url(#${filterId})` }}>{children}</div>
    </div>
  );
}
