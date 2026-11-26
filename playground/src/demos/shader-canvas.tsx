import { useState } from "react";
import { BayerDither } from "@vault/animations/shader-canvas/bayer-dither";
import { AsciiFilter } from "@vault/animations/shader-canvas/ascii-filter";
import {
  OrbitalCanvas,
  type OrbitHub,
} from "@vault/animations/shader-canvas/orbital-canvas";
import type { DemoMap, DemoProps } from "./types";

const SAMPLE_ORBIT_HUBS: OrbitHub[] = [
  {
    id: "precision",
    label: "Precision",
    ring: 0,
    satellites: [
      { id: "s1", color: "#38bdf8" },
      { id: "s2", color: "#cbd5e1" },
      { id: "s3", color: "#34d399" },
      { id: "s4", color: "#38bdf8" },
    ],
  },
  {
    id: "retro",
    label: "Retro",
    ring: 1,
    satellites: [
      { id: "r1", color: "#f59e0b" },
      { id: "r2", color: "#cbd5e1" },
      { id: "r3", color: "#38bdf8" },
      { id: "r4", color: "#cbd5e1" },
      { id: "r5", color: "#f59e0b" },
    ],
  },
  {
    id: "rebel",
    label: "Rebel",
    ring: 1,
    satellites: [
      { id: "k1", color: "#f43f5e" },
      { id: "k2", color: "#cbd5e1" },
      { id: "k3", color: "#f43f5e" },
    ],
  },
  {
    id: "spatial",
    label: "Spatial",
    ring: 2,
    satellites: [
      { id: "p1", color: "#38bdf8" },
      { id: "p2", color: "#34d399" },
      { id: "p3", color: "#cbd5e1" },
      { id: "p4", color: "#34d399" },
      { id: "p5", color: "#f59e0b" },
      { id: "p6", color: "#cbd5e1" },
    ],
  },
];

function BayerDitherDemo({ motionEpoch }: DemoProps) {
  const [ditherAnimate, setDitherAnimate] = useState(true);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div style={{ border: "1px solid var(--fui-border-strong)", lineHeight: 0 }}>
        <BayerDither
          key={motionEpoch}
          width={320}
          height={136}
          pixelSize={4}
          darkColor="#0b0c0a"
          lightColor="#f2f0e6"
          animate={ditherAnimate}
        />
      </div>
      <button
        type="button"
        className="btn-fui"
        onClick={() => setDitherAnimate((v) => !v)}
      >
        <span>{ditherAnimate ? "Pause Shader" : "Resume Shader"}</span>
      </button>
    </div>
  );
}

function AsciiFilterDemo({ motionEpoch }: DemoProps) {
  const [asciiAnimate, setAsciiAnimate] = useState(true);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: "100%" }}>
      <div
        style={{
          background: "#050608",
          border: "1px solid var(--fui-border)",
          borderRadius: 3,
          padding: "8px 10px",
          color: "#34d399",
          fontSize: 9,
          overflow: "hidden",
          maxWidth: "100%",
        }}
      >
        <AsciiFilter key={motionEpoch} cols={44} rows={11} animate={asciiAnimate} />
      </div>
      <button
        type="button"
        className="btn-fui"
        onClick={() => setAsciiAnimate((v) => !v)}
      >
        <span>{asciiAnimate ? "Freeze Frame" : "Resume Wave"}</span>
      </button>
    </div>
  );
}

function OrbitalCanvasDemo({ motionEpoch }: DemoProps) {
  const [orbitLightBg, setOrbitLightBg] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: "100%" }}>
      <div
        style={{
          background: orbitLightBg
            ? "radial-gradient(ellipse at 50% 50%, #2b364d 0%, #1a2233 65%, #121826 100%)"
            : "radial-gradient(ellipse at 50% 50%, #192236 0%, #0e1422 65%, #090d16 100%)",
          border: "1px solid var(--fui-border-strong)",
          borderRadius: 4,
          overflow: "hidden",
          maxWidth: "100%",
        }}
      >
        <OrbitalCanvas
          key={motionEpoch}
          hubs={SAMPLE_ORBIT_HUBS}
          width={380}
          height={210}
          orbitSpeedMultiplier={0.75}
          clusterSpreadC={8.5}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
        <span className="fui-mono-label">Hover canvas to freeze orbit</span>
        <button
          type="button"
          className="btn-fui"
          onClick={() => setOrbitLightBg((v) => !v)}
        >
          <span>Backdrop: {orbitLightBg ? "Bright Slate" : "Deep Navy"}</span>
        </button>
      </div>
    </div>
  );
}

export const shaderCanvasDemos: DemoMap = {
  "bayer-dither": BayerDitherDemo,
  "ascii-filter": AsciiFilterDemo,
  "orbital-canvas": OrbitalCanvasDemo,
};
