import { useEffect, useRef } from "react";
import type { HTMLAttributes, MouseEvent } from "react";

interface SpringTiltCardProps extends HTMLAttributes<HTMLDivElement> {
    maxTiltDeg?: number;
    perspectivePx?: number;
}

export function SpringTiltCard({
    children,
    maxTiltDeg = 9,
    perspectivePx = 800,
    style,
    onMouseMove,
    onMouseLeave,
    ...props
}: SpringTiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const target = useRef({ rx: 0, ry: 0 });
    const current = useRef({ rx: 0, ry: 0 });

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        let rafId = 0;

        const tick = () => {
            current.current.rx += (target.current.rx - current.current.rx) * 0.14;
            current.current.ry += (target.current.ry - current.current.ry) * 0.14;
            if (ref.current) {
                ref.current.style.transform = `perspective(${perspectivePx}px) rotateX(${current.current.rx.toFixed(2)}deg) rotateY(${current.current.ry.toFixed(2)}deg)`;
            }
            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, [perspectivePx]);

    const handleMove = (e: MouseEvent<HTMLDivElement>) => {
        onMouseMove?.(e);
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        target.current = { rx: -py * maxTiltDeg * 2, ry: px * maxTiltDeg * 2 };
    };

    const handleLeave = (e: MouseEvent<HTMLDivElement>) => {
        onMouseLeave?.(e);
        target.current = { rx: 0, ry: 0 };
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ willChange: "transform", transformStyle: "preserve-3d", ...style }}
            {...props}
        >
            {children}
        </div>
    );
}