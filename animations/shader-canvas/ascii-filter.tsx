import { useEffect, useRef, useState } from "react";

const RAMP = " .:-=+*#%@";

interface AsciiFilterProps {
    cols?: number;
    rows?: number;
    animate?: boolean;
    className?: string;
}

export function AsciiFilter({
    cols = 48,
    rows = 16,
    animate = true,
    className,
}: AsciiFilterProps) {
    const [frame, setFrame] = useState("");
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let lastDraw = 0;

        const render = (now: number) => {
            if (now - lastDraw >= 50 || lastDraw === 0) {
                lastDraw = now;
                const t = animate && !reduced ? now * 0.0014 : 0;
                const lines: string[] = [];

                for (let y = 0; y < rows; y++) {
                    let line = "";
                    for (let x = 0; x < cols; x++) {
                        const nx = (x / cols) * 2 - 1;
                        const ny = (y / rows) * 2 - 1;
                        const d = Math.hypot(nx, ny);
                        const v = 0.5 + 0.5 * Math.sin(d * 8 - t * 2.2 + Math.atan2(ny, nx));
                        const idx = Math.min(RAMP.length - 1, Math.max(0, Math.floor(v * RAMP.length)));
                        line += RAMP[idx];
                    }
                    lines.push(line);
                }
                setFrame(lines.join("\n"));
            }

            if (animate && !reduced) {
                rafRef.current = requestAnimationFrame(render);
            }
        };

        rafRef.current = requestAnimationFrame(render);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [cols, rows, animate]);

    return (
        <pre
            className={className}
            style={{
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                lineHeight: 1.05,
                margin: 0,
                userSelect: "none",
            }}
        >
            {frame}
        </pre>
    );
}