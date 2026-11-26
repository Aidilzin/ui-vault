import { useId } from "react";
import type { HTMLAttributes } from "react";

interface LiquidGlassProps extends HTMLAttributes<HTMLDivElement> {
    blurPx?: number;
    displacementScale?: number;
}

export function LiquidGlassSurface({
    children,
    blurPx = 16,
    displacementScale = 12,
    className,
    style,
    ...props
}: LiquidGlassProps) {
    const filterId = useId().replace(/:/g, "");

    return (
        <>
            <svg aria-hidden="true" style={{ position: "absolute", width: 0, height: 0 }}>
                <defs>
                    <filter id={filterId}>
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.014 0.014"
                            numOctaves={2}
                            result="noise"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="noise"
                            scale={displacementScale}
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                    </filter>
                </defs>
            </svg>

            <div
                className={className}
                style={{
                    background: "rgba(255, 255, 255, 0.07)",
                    backdropFilter: `blur(${blurPx}px) saturate(160%)`,
                    WebkitBackdropFilter: `blur(${blurPx}px) saturate(160%)`,
                    border: "1px solid rgba(255, 255, 255, 0.14)",
                    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.25)",
                    ...style,
                }}
                {...props}
            >
                {children}
            </div>
        </>
    );
}