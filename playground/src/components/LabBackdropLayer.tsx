import { useEffect, useRef, useState } from "react";
import { BayerDither } from "@vault/animations/shader-canvas/bayer-dither";
import { AsciiFilter } from "@vault/animations/shader-canvas/ascii-filter";
import {
  OrbitalCanvas,
  type OrbitHub,
} from "@vault/animations/shader-canvas/orbital-canvas";
import { PixelHoverGrid } from "@vault/animations/shader-canvas/pixel-hover-grid";
import { CrtGrainOverlay } from "@vault/animations/shader-canvas/crt-grain-overlay";
import { AuroraMeshBg } from "@vault/animations/shader-canvas/aurora-mesh-bg";
import { SvgRipplePulse } from "@vault/animations/shader-canvas/svg-ripple-pulse";
import { MeteorShower } from "@vault/animations/shader-canvas/meteor-shower";
import { EclipseOrb } from "@vault/animations/shader-canvas/eclipse-orb";
import { LampHorizonGlow } from "@vault/animations/physics-optics/lamp-horizon-glow";
import { MagnetLines } from "@vault/animations/cursor-reactive/magnet-lines";
import type { ResolvedStyleTheme } from "../lib/style-theme";

interface LabBackdropLayerProps {
  animationId: string;
  theme: ResolvedStyleTheme;
  opacity: number;
  motionEpoch: number;
  reducedMotion: boolean;
}

function buildOrbitHubs(theme: ResolvedStyleTheme): OrbitHub[] {
  return [
    {
      id: "core",
      label: "Base",
      ring: 0,
      satellites: [
        { id: "c1", color: theme.accent },
        { id: "c2", color: theme.ink },
        { id: "c3", color: theme.accentAlt },
      ],
    },
    {
      id: "mid",
      label: "Motion",
      ring: 1,
      satellites: [
        { id: "m1", color: theme.accentAlt },
        { id: "m2", color: theme.accent },
        { id: "m3", color: theme.inkMuted },
        { id: "m4", color: theme.accent },
      ],
    },
    {
      id: "outer",
      label: "Tokens",
      ring: 2,
      satellites: [
        { id: "o1", color: theme.inkMuted },
        { id: "o2", color: theme.accent },
        { id: "o3", color: theme.accentAlt },
        { id: "o4", color: theme.ink },
      ],
    },
  ];
}

export function LabBackdropLayer({
  animationId,
  theme,
  opacity,
  motionEpoch,
  reducedMotion,
}: LabBackdropLayerProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 760, height: 480 });

  useEffect(() => {
    const el = hostRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const w = Math.max(240, Math.round(rect.width));
      const h = Math.max(240, Math.round(rect.height));
      setSize((prev) =>
        Math.abs(prev.width - w) > 4 || Math.abs(prev.height - h) > 4
          ? { width: w, height: h }
          : prev
      );
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const renderBackdrop = () => {
    switch (animationId) {
      case "bayer-dither":
        return (
          <BayerDither
            key={`${motionEpoch}-${size.width}x${size.height}`}
            width={size.width}
            height={size.height}
            pixelSize={5}
            darkColor={theme.isLight ? theme.borderStrong : theme.canvas}
            lightColor={theme.isLight ? theme.canvas : theme.accent}
            animate={!reducedMotion}
          />
        );
      case "orbital-canvas":
        return (
          <OrbitalCanvas
            key={`${motionEpoch}-${size.width}x${size.height}`}
            hubs={buildOrbitHubs(theme)}
            width={size.width}
            height={size.height}
            orbitSpeedMultiplier={reducedMotion ? 0 : 0.6}
            clusterSpreadC={10}
          />
        );
      case "pixel-hover-grid":
        return (
          <PixelHoverGrid
            key={`${motionEpoch}-${size.width}x${size.height}`}
            width={size.width}
            height={size.height}
            cellSize={22}
            accentColor={theme.accent}
          />
        );
      case "ascii-filter": {
        const cols = Math.max(36, Math.min(110, Math.floor(size.width / 8)));
        const rows = Math.max(16, Math.min(40, Math.floor(size.height / 14)));
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
              color: theme.accent,
              fontSize: 11,
              lineHeight: 1.15,
              overflow: "hidden",
            }}
          >
            <AsciiFilter
              key={`${motionEpoch}-${cols}x${rows}`}
              cols={cols}
              rows={rows}
              animate={!reducedMotion}
            />
          </div>
        );
      }
      case "crt-grain-overlay":
        return (
          <CrtGrainOverlay
            key={motionEpoch}
            opacity={0.45}
            style={{ width: "100%", height: "100%", border: "none", borderRadius: 0 }}
          />
        );
      case "aurora-mesh-bg":
        return (
          <AuroraMeshBg
            key={motionEpoch}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: 0,
            }}
          />
        );
      case "meteor-shower":
        return (
          <MeteorShower
            key={motionEpoch}
            count={14}
            color={theme.accent}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: 0,
              background: "transparent",
            }}
          />
        );
      case "svg-ripple-pulse":
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
            }}
          >
            <SvgRipplePulse
              key={motionEpoch}
              color={theme.accent}
              size={Math.min(size.width, size.height, 420)}
              rings={4}
              label=""
            />
          </div>
        );
      case "eclipse-orb":
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
            }}
          >
            <EclipseOrb
              key={motionEpoch}
              size={Math.min(size.width, size.height, 360)}
              coronaColor={theme.accent}
              accentColor={theme.accentAlt}
            />
          </div>
        );
      case "lamp-horizon-glow":
        return (
          <LampHorizonGlow
            key={motionEpoch}
            color={theme.accent}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: 0,
              background: "transparent",
            }}
          />
        );
      case "magnet-lines": {
        const cols = Math.max(6, Math.min(18, Math.floor(size.width / 54)));
        const rows = Math.max(4, Math.min(10, Math.floor(size.height / 48)));
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
              overflow: "hidden",
            }}
          >
            <MagnetLines
              key={`${motionEpoch}-${cols}x${rows}`}
              rows={rows}
              columns={cols}
              lineColor={theme.accent}
              lineHeight={18}
            />
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div
      ref={hostRef}
      className="lab-backdrop-layer"
      aria-hidden="true"
      style={{ opacity }}
    >
      {renderBackdrop()}
    </div>
  );
}
