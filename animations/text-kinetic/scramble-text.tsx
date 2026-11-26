import { useEffect, useRef, useState } from "react";

const DEFAULT_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+-_#";

interface ScrambleTextProps {
    text: string;
    trigger?: "mount" | "hover" | "change";
    durationMs?: number;
    glyphs?: string;
    className?: string;
}

export function ScrambleText({
    text,
    trigger = "change",
    durationMs = 260,
    glyphs = DEFAULT_GLYPHS,
    className,
}: ScrambleTextProps) {
    const [display, setDisplay] = useState(text);
    const rafRef = useRef<number | null>(null);

    const runScramble = () => {
        if (
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            setDisplay(text);
            return;
        }

        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        const start = performance.now();

        const frame = (now: number) => {
            const progress = Math.min(1, (now - start) / durationMs);
            const lockedCount = Math.floor(progress * text.length);

            let next = "";
            for (let i = 0; i < text.length; i++) {
                if (text[i] === " " || i < lockedCount) {
                    next += text[i];
                } else {
                    next += glyphs[Math.floor(Math.random() * glyphs.length)];
                }
            }

            setDisplay(next);
            if (progress < 1) {
                rafRef.current = requestAnimationFrame(frame);
            } else {
                setDisplay(text);
            }
        };

        rafRef.current = requestAnimationFrame(frame);
    };

    useEffect(() => {
        if (trigger === "mount" || trigger === "change") {
            runScramble();
        } else {
            setDisplay(text);
        }
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [text]);

    return (
        <span
            className={className}
            onMouseEnter={trigger === "hover" ? runScramble : undefined}
        >
            {display}
        </span>
    );
}