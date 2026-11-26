import { useEffect, useRef } from "react";

const BAYER_4X4 = [
    [0, 8, 2, 10],
    [12, 4, 14, 6],
    [3, 11, 1, 9],
    [15, 7, 13, 5],
];

interface BayerDitherProps {
    width?: number;
    height?: number;
    pixelSize?: number;
    darkColor?: string;
    lightColor?: string;
    animate?: boolean;
    className?: string;
}

export function BayerDither({
    width = 360,
    height = 200,
    pixelSize = 4,
    darkColor = "#0b0c0a",
    lightColor = "#f2f0e6",
    animate = true,
    className,
}: BayerDitherProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const cols = Math.ceil(width / pixelSize);
        const rows = Math.ceil(height / pixelSize);
        let rafId = 0;

        const render = (timeMs: number) => {
            const t = animate && !reduced ? timeMs * 0.0008 : 0;
            ctx.fillStyle = darkColor;
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = lightColor;

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const nx = x / cols;
                    const ny = y / rows;
                    const wave =
                        0.5 +
                        0.28 * Math.sin(nx * 6 + t) +
                        0.22 * Math.cos(ny * 5 - t * 1.3);
                    const threshold = (BAYER_4X4[y & 3][x & 3] + 0.5) / 16;
                    if (wave > threshold) {
                        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
                    }
                }
            }

            if (animate && !reduced) {
                rafId = requestAnimationFrame(render);
            }
        };

        rafId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(rafId);
    }, [width, height, pixelSize, darkColor, lightColor, animate]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className={className}
            style={{ imageRendering: "pixelated", display: "block" }}
        />
    );
}