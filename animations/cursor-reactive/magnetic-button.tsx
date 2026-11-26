import { useRef, useState } from "react";
import type { ButtonHTMLAttributes, MouseEvent } from "react";

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    strength?: number;
}

export function MagneticButton({
    children,
    strength = 0.28,
    className,
    style,
    onMouseMove,
    onMouseLeave,
    ...props
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
        onMouseMove?.(e);
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        setOffset({ x: dx * strength, y: dy * strength });
    };

    const handleLeave = (e: MouseEvent<HTMLButtonElement>) => {
        onMouseLeave?.(e);
        setOffset({ x: 0, y: 0 });
    };

    return (
        <button
            ref={ref}
            className={className}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{
                ...style,
                transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
                transition:
                    offset.x === 0 && offset.y === 0
                        ? "transform 280ms cubic-bezier(0.22, 1, 0.36, 1)"
                        : "transform 80ms linear",
                willChange: "transform",
            }}
            {...props}
        >
            {children}
        </button>
    );
}