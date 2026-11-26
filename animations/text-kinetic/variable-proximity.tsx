import { useEffect, useRef, useState } from "react";

interface VariableProximityProps {
    text: string;
    minWeight?: number;
    maxWeight?: number;
    radius?: number;
    className?: string;
}

export function VariableProximity({
    text,
    minWeight = 350,
    maxWeight = 850,
    radius = 140,
    className,
}: VariableProximityProps) {
    const chars = Array.from(text);
    const containerRef = useRef<HTMLSpanElement>(null);
    const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const [weights, setWeights] = useState<number[]>(() => chars.map(() => minWeight));

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const handleMove = (e: PointerEvent) => {
            const next = charRefs.current.map((el) => {
                if (!el) return minWeight;
                const rect = el.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
                const t = Math.max(0, 1 - dist / radius);
                return Math.round(minWeight + (maxWeight - minWeight) * t * t);
            });
            setWeights(next);
        };

        window.addEventListener("pointermove", handleMove, { passive: true });
        return () => window.removeEventListener("pointermove", handleMove);
    }, [minWeight, maxWeight, radius, text]);

    return (
        <span ref={containerRef} className={className}>
            {chars.map((char, idx) => (
                <span
                    key={`${char}-${idx}`}
                    ref={(el) => {
                        charRefs.current[idx] = el;
                    }}
                    style={{
                        display: "inline-block",
                        fontVariationSettings: `'wght' ${weights[idx] ?? minWeight}`,
                        fontWeight: weights[idx] ?? minWeight,
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </span>
    );
}