import { useEffect, useState } from "react";

interface SplitRevealProps {
    text: string;
    mode?: "words" | "chars";
    staggerMs?: number;
    durationMs?: number;
    className?: string;
}

export function SplitReveal({
    text,
    mode = "words",
    staggerMs = 36,
    durationMs = 420,
    className,
}: SplitRevealProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) {
            setVisible(true);
            return;
        }
        const id = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(id);
    }, [text]);

    const tokens = mode === "words" ? text.split(" ") : Array.from(text);

    return (
        <span className={className} aria-label={text}>
            {tokens.map((token, idx) => (
                <span
                    key={`${token}-${idx}`}
                    style={{
                        display: "inline-block",
                        overflow: "hidden",
                        verticalAlign: "bottom",
                        marginRight: mode === "words" ? "0.28em" : undefined,
                    }}
                >
                    <span
                        aria-hidden="true"
                        style={{
                            display: "inline-block",
                            transform: visible ? "translate3d(0, 0%, 0)" : "translate3d(0, 110%, 0)",
                            opacity: visible ? 1 : 0,
                            transition: `transform ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) ${idx * staggerMs}ms, opacity ${durationMs}ms ease ${idx * staggerMs}ms`,
                            willChange: "transform, opacity",
                        }}
                    >
                        {token === " " ? "\u00A0" : token}
                    </span>
                </span>
            ))}
        </span>
    );
}