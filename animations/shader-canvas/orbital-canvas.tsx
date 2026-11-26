import { useEffect, useRef } from "react";

export interface OrbitHub {
    id: string;
    label: string;
    ring: 0 | 1 | 2;
    satellites: { id: string; color?: string }[];
}

interface OrbitalCanvasProps {
    hubs: OrbitHub[];
    width?: number;
    height?: number;
    perspectiveSquashT?: number;
    planeTiltDeg?: number;
    orbitSpeedMultiplier?: number;
    hoverFreezeDamping?: number;
    clusterSpreadC?: number;
    className?: string;
}

export function OrbitalCanvas({
    hubs,
    width = 760,
    height = 420,
    perspectiveSquashT = 0.37,
    planeTiltDeg = -7,
    orbitSpeedMultiplier = 0.2,
    hoverFreezeDamping = 0.07,
    clusterSpreadC = 7.0,
    className,
}: OrbitalCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const hoveringRef = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const tiltRad = (planeTiltDeg * Math.PI) / 180;
        const cosT = Math.cos(tiltRad);
        const sinT = Math.sin(tiltRad);
        const cx = width / 2;
        const cy = height / 2;
        const radii = [Math.min(width, height) * 0.24, Math.min(width, height) * 0.36, Math.min(width, height) * 0.47];
        const speeds = [0.24, 0.16, 0.1];

        let angleTime = 0;
        let speedFactor = 1;
        let lastNow = performance.now();
        let rafId = 0;

        const project = (rx: number, ry: number) => ({
            x: cx + rx * cosT - ry * sinT,
            y: cy + rx * sinT + ry * cosT,
        });

        const draw = (now: number) => {
            const dt = Math.min(0.05, (now - lastNow) / 1000);
            lastNow = now;

            const targetSpeed = reduced || hoveringRef.current ? 0 : 1;
            speedFactor += (targetSpeed - speedFactor) * hoverFreezeDamping;
            angleTime += dt * orbitSpeedMultiplier * speedFactor;

            ctx.clearRect(0, 0, width, height);

            // Orbit tracks
            ctx.strokeStyle = "rgba(255, 255, 255, 0.09)";
            ctx.lineWidth = 1;
            for (const r of radii) {
                ctx.save();
                ctx.translate(cx, cy);
                ctx.rotate(tiltRad);
                ctx.beginPath();
                ctx.ellipse(0, 0, r, r * perspectiveSquashT, 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            // Depth-sorted hubs + Phyllotaxis satellites
            const projected = hubs
                .map((hub, idx) => {
                    const r = radii[hub.ring];
                    const phi = (idx * 2.15) + angleTime * speeds[hub.ring];
                    const p = project(r * Math.cos(phi), r * Math.sin(phi) * perspectiveSquashT);
                    const z = Math.sin(phi);
                    return { hub, x: p.x, y: p.y, z };
                })
                .sort((a, b) => a.z - b.z);

            for (const node of projected) {
                const scale = 0.8 + ((node.z + 1) / 2) * 0.3;
                const alpha = 0.42 + ((node.z + 1) / 2) * 0.58;

                ctx.save();
                ctx.globalAlpha = alpha;
                node.hub.satellites.forEach((sat, i) => {
                    const theta = (i + 1) * 2.39996;
                    const dist = (10 + clusterSpreadC * Math.sqrt(i + 1)) * scale;
                    ctx.fillStyle = sat.color ?? "#7a8494";
                    ctx.beginPath();
                    ctx.arc(node.x + Math.cos(theta) * dist, node.y + Math.sin(theta) * dist * 0.72, 2.2 * scale, 0, Math.PI * 2);
                    ctx.fill();
                });

                ctx.fillStyle = "#111318";
                ctx.strokeStyle = "rgba(255,255,255,0.22)";
                ctx.beginPath();
                ctx.arc(node.x, node.y, 9 * scale, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.restore();
            }

            // Center core
            ctx.fillStyle = "#020204";
            ctx.strokeStyle = "rgba(255, 224, 178, 0.78)";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(cx, cy, 13, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            rafId = requestAnimationFrame(draw);
        };

        rafId = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(rafId);
    }, [hubs, width, height, perspectiveSquashT, planeTiltDeg, orbitSpeedMultiplier, hoverFreezeDamping, clusterSpreadC]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            onPointerEnter={() => {
                hoveringRef.current = true;
            }}
            onPointerLeave={() => {
                hoveringRef.current = false;
            }}
            style={{ width, height, display: "block" }}
        />
    );
}