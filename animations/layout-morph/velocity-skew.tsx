import { useEffect, useRef } from "react";
import type { HTMLAttributes } from "react";

interface VelocitySkewProps extends HTMLAttributes<HTMLDivElement> {
    maxSkewDeg?: number;
    sensitivity?: number;
}

export function VelocitySkew({
    children,
    maxSkewDeg = 6,
    sensitivity = 0.08,
    style,
    ...props
}: VelocitySkewProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let lastY = window.scrollY;
        let currentSkew = 0;
        let targetSkew = 0;
        let rafId = 0;

        const onScroll = () => {
            const delta = window.scrollY - lastY;
            lastY = window.scrollY;
            targetSkew = Math.max(-maxSkewDeg, Math.min(maxSkewDeg, delta * sensitivity));
        };

        const tick = () => {
            currentSkew += (targetSkew - currentSkew) * 0.14;
            targetSkew *= 0.85;
            if (Math.abs(currentSkew) < 0.01) currentSkew = 0;
            if (ref.current) {
                ref.current.style.transform = `skewY(${currentSkew.toFixed(3)}deg)`;
            }
            rafId = requestAnimationFrame(tick);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        rafId = requestAnimationFrame(tick);
        return () => {
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(rafId);
        };
    }, [maxSkewDeg, sensitivity]);

    return (
        <div ref={ref} style={{ willChange: "transform", ...style }} {...props}>
            {children}
        </div>
    );
}