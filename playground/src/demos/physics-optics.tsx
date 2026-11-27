import { useState } from "react";
import { LiquidGlassSurface } from "@vault/animations/physics-optics/liquid-glass-filter";
import { SpringTiltCard } from "@vault/animations/physics-optics/spring-tilt-card";
import {
  GlareHover,
  type GlareMode,
  type GlareVariant,
} from "@vault/animations/physics-optics/glare-hover";
import { ElasticSlider } from "@vault/animations/physics-optics/elastic-slider";
import { DockMagnify } from "@vault/animations/physics-optics/dock-magnify";
import { SvgTurbulenceHover } from "@vault/animations/physics-optics/svg-turbulence-hover";
import { AnimatedConnectorBeam } from "@vault/animations/physics-optics/animated-connector-beam";
import { HolographicFoilCard } from "@vault/animations/physics-optics/holographic-foil-card";
import { LampHorizonGlow } from "@vault/animations/physics-optics/lamp-horizon-glow";
import { GooeyPillNav } from "@vault/animations/physics-optics/gooey-pill-nav";
import { PerspectiveBook } from "@vault/animations/physics-optics/perspective-book";
import { OpticalZoomLens } from "@vault/animations/physics-optics/optical-zoom-lens";
import { Compass, Cpu, Layers, Sparkles, Terminal } from "lucide-react";
import type { DemoMap, DemoProps } from "./types";

function LiquidGlassDemo() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 330,
        height: 150,
        borderRadius: 4,
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
        background:
          "radial-gradient(circle at 20% 25%, #38bdf8 0%, transparent 48%), radial-gradient(circle at 80% 70%, #f43f5e 0%, transparent 50%), radial-gradient(circle at 55% 20%, #f59e0b 0%, transparent 42%), #0b1020",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.14) 0px, rgba(255,255,255,0.14) 2px, transparent 2px, transparent 14px)",
        }}
      />
      <LiquidGlassSurface
        blurPx={14}
        displacementScale={14}
        style={{
          position: "relative",
          zIndex: 1,
          width: "82%",
          padding: "14px 16px",
          borderRadius: 10,
          color: "#ffffff",
        }}
      >
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, opacity: 0.85 }}>
          OPTICAL REFRACTION // 14PX BLUR
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>
          LiquidGlassSurface over high-contrast pattern
        </div>
      </LiquidGlassSurface>
    </div>
  );
}

function SpringTiltCardDemo({ motionEpoch }: DemoProps) {
  return (
    <SpringTiltCard
      key={motionEpoch}
      maxTiltDeg={11}
      perspectivePx={700}
      style={{
        width: "100%",
        maxWidth: 280,
        padding: "18px 20px",
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(15,17,21,0.96) 60%)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        borderRadius: 6,
      }}
    >
      <div className="fui-mono-label" style={{ color: "var(--fui-signal-active)" }}>
        3D SPRING INERTIA
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, marginTop: 6 }}>
        SpringTiltCard
      </div>
      <div style={{ fontSize: 12, color: "var(--fui-ink-muted)", marginTop: 4 }}>
        Move pointer across corners to inspect damped perspective rotation.
      </div>
    </SpringTiltCard>
  );
}

function GlareHoverDemo({ motionEpoch }: DemoProps) {
  const [glareMode, setGlareMode] = useState<GlareMode>("hover");
  const [glareVariant, setGlareVariant] = useState<GlareVariant>("streak");

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: "100%" }}>
      <GlareHover
        key={`${glareMode}-${glareVariant}-${motionEpoch}`}
        width="100%"
        background="linear-gradient(135deg, #131824 0%, #0b0e15 100%)"
        borderColor="rgba(56, 189, 248, 0.28)"
        borderRadius="6px"
        glareColor="#38bdf8"
        glareOpacity={0.55}
        variant={glareVariant}
        mode={glareMode}
        rimGlint
        style={{ maxWidth: 310, padding: "18px 20px", textAlign: "left" }}
      >
        <div style={{ width: "100%" }}>
          <div className="fui-mono-label" style={{ color: "var(--fui-signal-active)" }}>
            SPECULAR SWEEP // {glareVariant.toUpperCase()}
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, marginTop: 6 }}>
            GlareHover Surface
          </div>
          <div style={{ fontSize: 12, color: "var(--fui-ink-muted)", marginTop: 4 }}>
            Hover across to trigger directional light streak &amp; 1px rim glint.
          </div>
        </div>
      </GlareHover>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
        <button
          type="button"
          className="btn-fui"
          onClick={() => setGlareMode((m) => (m === "hover" ? "follow" : "hover"))}
        >
          <span>Mode: {glareMode}</span>
        </button>
        <button
          type="button"
          className="btn-fui"
          onClick={() =>
            setGlareVariant((v) =>
              v === "streak" ? "twin" : v === "twin" ? "sheen" : "streak"
            )
          }
        >
          <span>Variant: {glareVariant}</span>
        </button>
      </div>
    </div>
  );
}

function ElasticSliderDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: "100%" }}>
      <ElasticSlider defaultValue={62} />
      <span className="fui-mono-label">Drag past left/right edge for elastic stretch</span>
    </div>
  );
}

function DockMagnifyDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <DockMagnify
        items={[
          { id: "a", label: "Explore", icon: <Compass size={16} /> },
          { id: "b", label: "Styles", icon: <Layers size={16} /> },
          { id: "c", label: "Motion", icon: <Sparkles size={16} /> },
          { id: "d", label: "Compute", icon: <Cpu size={16} /> },
          { id: "e", label: "CLI", icon: <Terminal size={16} /> },
        ]}
      />
      <span className="fui-mono-label">Sweep pointer across dock icons</span>
    </div>
  );
}

function SvgTurbulenceHoverDemo({ motionEpoch }: DemoProps) {
  return (
    <SvgTurbulenceHover key={motionEpoch} maxScale={22}>
      <div
        style={{
          padding: "20px 26px",
          background: "linear-gradient(135deg, #1d2b44 0%, #0f1115 100%)",
          border: "1px solid rgba(56, 189, 248, 0.35)",
          borderRadius: 6,
          textAlign: "center",
        }}
      >
        <div className="fui-mono-label" style={{ color: "var(--fui-signal-active)" }}>
          SVG FE-TURBULENCE
        </div>
        <div style={{ marginTop: 4, fontSize: 16, fontWeight: 700 }}>
          HOVER FOR LIQUID RIPPLE
        </div>
      </div>
    </SvgTurbulenceHover>
  );
}

function AnimatedConnectorBeamDemo() {
  return <AnimatedConnectorBeam fromLabel="APP" toLabel="UI-VAULT" />;
}

function HolographicFoilCardDemo() {
  return (
    <HolographicFoilCard style={{ width: "100%", maxWidth: 280, padding: "20px 18px" }}>
      <div className="fui-mono-label" style={{ color: "#38bdf8" }}>IRIDESCENT FOIL</div>
      <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>Holographic Surface</div>
      <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 3 }}>Sweep cursor to shift spectral angle</div>
    </HolographicFoilCard>
  );
}

function LampHorizonGlowDemo({ motionEpoch }: DemoProps) {
  return (
    <LampHorizonGlow key={motionEpoch} style={{ width: "100%", maxWidth: 310 }}>
      <div className="fui-mono-label" style={{ color: "#38bdf8" }}>OVERHEAD CONIC BEAM</div>
      <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>Lamp Horizon Reveal</div>
    </LampHorizonGlow>
  );
}

function GooeyPillNavDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <GooeyPillNav />
      <span className="fui-mono-label">Metaball filter isolated to background pill</span>
    </div>
  );
}

export const physicsOpticsDemos: DemoMap = {
  "liquid-glass-filter": LiquidGlassDemo,
  "spring-tilt-card": SpringTiltCardDemo,
  "glare-hover": GlareHoverDemo,
  "elastic-slider": ElasticSliderDemo,
  "dock-magnify": DockMagnifyDemo,
  "svg-turbulence-hover": SvgTurbulenceHoverDemo,
  "animated-connector-beam": AnimatedConnectorBeamDemo,
  "holographic-foil-card": HolographicFoilCardDemo,
  "lamp-horizon-glow": LampHorizonGlowDemo,
  "gooey-pill-nav": GooeyPillNavDemo,
  "perspective-book": () => <PerspectiveBook />,
  "optical-zoom-lens": () => <OpticalZoomLens style={{ width: "100%", maxWidth: 330 }} />,
};
