import { useLayoutEffect, useRef } from "react";
import type { HTMLAttributes } from "react";

interface FlipCardProps extends HTMLAttributes<HTMLDivElement> {
    layoutKey: string | boolean | number;
    durationMs?: number;
}

export function FlipCard({
    layoutKey,
    durationMs = 260,
    children,
    ...props
}: FlipCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const prevRectRef = useRef<DOMRect | null>(null);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;

        const nextRect = el.getBoundingClientRect();
        const prevRect = prevRectRef.current;
        prevRectRef.current = nextRect;

        if (!prevRect) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const dx = prevRect.left - nextRect.left;
        const dy = prevRect.top - nextRect.top;
        const sx = prevRect.width / (nextRect.width || 1);
        const sy = prevRect.height / (nextRect.height || 1);

        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 && Math.abs(sx - 1) < 0.01 && Math.abs(sy - 1) < 0.01) {
            return;
        }

        el.animate(
            [
                { transformOrigin: "top left", transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` },
                { transformOrigin: "top left", transform: "translate(0px, 0px) scale(1, 1)" },
            ],
            { duration: durationMs, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
        );
    }, [layoutKey, durationMs]);

    return (
        <div ref={ref} {...props}>
            {children}
        </div>
    );
}