import { useRef, useState } from "react";
import type { HTMLAttributes, MouseEvent } from "react";

interface BorderSpotlightProps extends HTMLAttributes<HTMLDivElement> {
    spotlightColor?: string;
    radius?: number;
}

export function BorderSpotlight({
    children,
    spotlightColor = "rgba(56, 189, 248, 0.32)",
    radius = 220,
    className,
    style,
    onMouseMove,
    onMouseLeave,
    ...props
}: BorderSpotlightProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState<{ x: number; y: number; active: boolean }>({
        x: 0,
        y: 0,
        active: false,
    });

    const handleMove = (e: MouseEvent<HTMLDivElement>) => {
        onMouseMove?.(e);
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
    };

    const handleLeave = (e: MouseEvent<HTMLDivElement>) => {
        onMouseLeave?.(e);
        setPos((prev) => ({ ...prev, active: false }));
    };

    return (
        <div
            ref={ref}
            className={className}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{
                position: "relative",
                overflow: "hidden",
                ...style,
            }}
            {...props}
        >
            <div
                aria-hidden="true"
                style={{
                    pointerEvents: "none",
                    position: "absolute",
                    inset: 0,
                    opacity: pos.active ? 1 : 0,
                    transition: "opacity 180ms ease",
                    background: `radial-gradient(${radius}px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 72%)`,
                }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
        </div>
    );
}