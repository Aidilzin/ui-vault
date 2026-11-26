import { useMemo, useState } from "react";
import {
  Code2,
  Cpu,
  RotateCcw,
  Terminal,
  ArrowDownUp,
  Layers,
} from "lucide-react";

import { MagneticButton } from "@vault/animations/cursor-reactive/magnetic-button";
import { BorderSpotlight } from "@vault/animations/cursor-reactive/border-spotlight";
import "@vault/animations/cursor-reactive/sibling-dim.css";
import { ScrambleText } from "@vault/animations/text-kinetic/scramble-text";
import { SplitReveal } from "@vault/animations/text-kinetic/split-reveal";
import { VariableProximity } from "@vault/animations/text-kinetic/variable-proximity";
import { FlipCard } from "@vault/animations/layout-morph/flip-card";
import { VelocitySkew } from "@vault/animations/layout-morph/velocity-skew";
import { BayerDither } from "@vault/animations/shader-canvas/bayer-dither";
import { AsciiFilter } from "@vault/animations/shader-canvas/ascii-filter";
import {
  OrbitalCanvas,
  type OrbitHub,
} from "@vault/animations/shader-canvas/orbital-canvas";
import { LiquidGlassSurface } from "@vault/animations/physics-optics/liquid-glass-filter";
import { SpringTiltCard } from "@vault/animations/physics-optics/spring-tilt-card";

import {
  animationNodes,
  formatNodeLabel,
  getShadcnAddCommand,
  vaultRelations,
  type AnimationNode,
  type MechanicId,
} from "../lib/vault-data";

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

interface AnimationsLabProps {
  searchQuery: string;
  motionEpoch: number;
  reducedMotion: boolean;
  focusedAnimationId: string | null;
  onClearFocus: () => void;
  onCopy: (text: string, label: string) => void;
  onInspectCode: (anim: AnimationNode) => void;
  onJumpToNode: (nodeId: string) => void;
}

export function AnimationsLab({
  searchQuery,
  motionEpoch,
  reducedMotion,
  focusedAnimationId,
  onClearFocus,
  onCopy,
  onInspectCode,
  onJumpToNode,
}: AnimationsLabProps) {
  const [selectedMechanic, setSelectedMechanic] = useState<MechanicId | "all">("all");
  const [selectedPerf, setSelectedPerf] = useState<"all" | "low" | "medium">("all");

  // Interactive demo states
  const [scrambleKey, setScrambleKey] = useState(0);
  const [scrambleMode, setScrambleMode] = useState<"mount" | "hover">("mount");
  const [splitKey, setSplitKey] = useState(0);
  const [splitMode, setSplitMode] = useState<"words" | "chars">("words");
  const [flipExpanded, setFlipExpanded] = useState(false);
  const [flipOrder, setFlipOrder] = useState<string[]>(["A1", "B2", "C3"]);
  const [ditherAnimate, setDitherAnimate] = useState(true);
  const [asciiAnimate, setAsciiAnimate] = useState(true);
  const [orbitLightBg, setOrbitLightBg] = useState(false);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return animationNodes.filter((node) => {
      if (focusedAnimationId && node.id !== focusedAnimationId) return false;
      if (selectedMechanic !== "all" && node.mechanic !== selectedMechanic) {
        return false;
      }
      if (selectedPerf !== "all" && node.perfTier !== selectedPerf) {
        return false;
      }
      if (!q) return true;
      const haystack = [
        node.id,
        formatNodeLabel(node.id),
        node.mechanic,
        node.perfTier,
        node.reducedMotion,
        ...node.engine,
        ...node.pairsWith,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [searchQuery, selectedMechanic, selectedPerf, focusedAnimationId]);

  const renderDemo = (id: string) => {
    switch (id) {
      case "magnetic-button":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <MagneticButton
              strength={0.32}
              style={{
                padding: "10px 20px",
                background: "rgba(56, 189, 248, 0.14)",
                border: "1px solid rgba(56, 189, 248, 0.55)",
                borderRadius: 4,
                color: "#e8ecf2",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.06em",
                cursor: "pointer",
              }}
            >
              ENGAGE MAGNETIC PULL
            </MagneticButton>
            <span className="fui-mono-label">Hover &amp; drift cursor across button</span>
          </div>
        );

      case "border-spotlight":
        return (
          <BorderSpotlight
            spotlightColor="rgba(56, 189, 248, 0.36)"
            radius={180}
            style={{
              width: "100%",
              maxWidth: 320,
              padding: "18px 20px",
              background: "#0f1115",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: 4,
            }}
          >
            <div className="fui-mono-label" style={{ color: "var(--fui-signal-active)" }}>
              TELEMETRY // RADIAL TRACK
            </div>
            <div style={{ marginTop: 6, fontSize: 13, color: "var(--fui-ink)" }}>
              Move pointer across this panel to trace the 1px radial spotlight perimeter.
            </div>
          </BorderSpotlight>
        );

      case "sibling-dim":
        return (
          <div style={{ width: "100%", maxWidth: 340 }}>
            <div
              className="sibling-dim-group"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 8,
              }}
            >
              {["NODE 01", "NODE 02", "NODE 03", "NODE 04", "NODE 05", "NODE 06"].map(
                (label) => (
                  <div
                    key={label}
                    style={{
                      padding: "12px 8px",
                      background: "#15181e",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 3,
                      textAlign: "center",
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      color: "#e8ecf2",
                      cursor: "default",
                    }}
                  >
                    {label}
                  </div>
                )
              )}
            </div>
            <div className="fui-mono-label" style={{ textAlign: "center", marginTop: 10 }}>
              Hover any cell to dim siblings (:has selector)
            </div>
          </div>
        );

      case "scramble-text":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: "0.06em",
                color: "var(--fui-signal-active)",
                padding: "8px 14px",
                border: "1px solid var(--fui-border)",
                borderRadius: 3,
                background: "#0f1115",
                cursor: scrambleMode === "hover" ? "pointer" : "default",
              }}
            >
              <ScrambleText
                key={`${scrambleKey}-${scrambleMode}-${motionEpoch}`}
                text="SYS.TELEMETRY // LOCKED"
                trigger={scrambleMode}
                durationMs={380}
              />
            </div>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
              <button
                type="button"
                className="btn-fui"
                onClick={() => {
                  setScrambleMode("mount");
                  setScrambleKey((k) => k + 1);
                }}
              >
                <RotateCcw size={11} />
                <span>Replay</span>
              </button>
              <button
                type="button"
                className={`btn-fui ${scrambleMode === "hover" ? "btn-fui-primary" : ""}`}
                onClick={() =>
                  setScrambleMode((m) => (m === "hover" ? "mount" : "hover"))
                }
              >
                <span>Mode: {scrambleMode === "hover" ? "Hover Text" : "Mount"}</span>
              </button>
            </div>
          </div>
        );

      case "split-reveal":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--fui-ink)",
                textAlign: "center",
              }}
            >
              <SplitReveal
                key={`${splitKey}-${splitMode}-${motionEpoch}`}
                text="PRECISION KINETIC TYPE"
                mode={splitMode}
                staggerMs={splitMode === "words" ? 65 : 22}
                durationMs={420}
              />
            </div>

            <div style={{ display: "flex", gap: 6 }}>
              <button
                type="button"
                className="btn-fui"
                onClick={() => setSplitKey((k) => k + 1)}
              >
                <RotateCcw size={11} />
                <span>Replay</span>
              </button>
              <button
                type="button"
                className="btn-fui"
                onClick={() => {
                  setSplitMode((m) => (m === "words" ? "chars" : "words"));
                  setSplitKey((k) => k + 1);
                }}
              >
                <span>Split: {splitMode}</span>
              </button>
            </div>
          </div>
        );

      case "variable-proximity":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 26,
                letterSpacing: "-0.02em",
                color: "var(--fui-ink)",
                userSelect: "none",
              }}
            >
              <VariableProximity
                key={motionEpoch}
                text="PROXIMITY WEIGHT"
                minWeight={200}
                maxWeight={900}
                radius={140}
              />
            </div>
            <span className="fui-mono-label">
              Sweep cursor over letters (Inter variable wght 200-900)
            </span>
          </div>
        );

      case "flip-card":
        return (
          <div style={{ width: "100%", maxWidth: 340, display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: flipExpanded ? "1fr" : "repeat(3, 1fr)",
                gap: 8,
              }}
            >
              {flipOrder.map((code) => (
                <FlipCard
                  key={code}
                  layoutKey={`${flipExpanded}-${flipOrder.join(",")}`}
                  durationMs={280}
                  style={{
                    padding: flipExpanded ? "10px 14px" : "14px 10px",
                    background: "#15181e",
                    border: "1px solid rgba(56, 189, 248, 0.28)",
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                  }}
                >
                  <span style={{ color: "var(--fui-signal-active)" }}>MOD-{code}</span>
                  {flipExpanded && (
                    <span style={{ color: "var(--fui-ink-muted)", fontSize: 10 }}>
                      WAAPI FLIP ACTIVE
                    </span>
                  )}
                </FlipCard>
              ))}
            </div>
            <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
              <button
                type="button"
                className="btn-fui"
                onClick={() => setFlipExpanded((v) => !v)}
              >
                <Layers size={11} />
                <span>{flipExpanded ? "Grid 3-Col" : "Expand Rows"}</span>
              </button>
              <button
                type="button"
                className="btn-fui"
                onClick={() => setFlipOrder((prev) => [...prev.slice(1), prev[0]])}
              >
                <ArrowDownUp size={11} />
                <span>Reorder</span>
              </button>
            </div>
          </div>
        );

      case "velocity-skew":
        return (
          <div style={{ width: "100%", maxWidth: 330, display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
            <VelocitySkew
              key={motionEpoch}
              maxSkewDeg={7}
              sensitivity={0.1}
              style={{
                width: "100%",
                padding: "16px 18px",
                background: "#15181e",
                border: "1px solid var(--fui-border-strong)",
                borderRadius: 3,
              }}
            >
              <div className="fui-mono-label" style={{ color: "var(--fui-signal-warn)" }}>
                WINDOW SCROLL VELOCITY
              </div>
              <div style={{ marginTop: 4, fontSize: 13, fontWeight: 600 }}>
                Scroll the page rapidly to skew this surface along the Y-axis.
              </div>
            </VelocitySkew>
            <button
              type="button"
              className="btn-fui"
              onClick={() => {
                window.scrollBy({ top: 140, behavior: "smooth" });
                window.setTimeout(() => {
                  window.scrollBy({ top: -140, behavior: "smooth" });
                }, 260);
              }}
            >
              <span>Pulse Scroll Test</span>
            </button>
          </div>
        );

      case "bayer-dither":
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

      case "ascii-filter":
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
              <AsciiFilter
                key={motionEpoch}
                cols={44}
                rows={11}
                animate={asciiAnimate}
              />
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

      case "orbital-canvas":
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

      case "liquid-glass-filter":
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

      case "spring-tilt-card":
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

      default:
        return <div className="fui-mono-label">Preview not configured for {id}</div>;
    }
  };

  return (
    <section aria-label="Animations Lab">
      <div className="section-bar">
        <div>
          <h1 className="section-title">Animations Lab</h1>
          <p className="section-subtitle">
            All {animationNodes.length} primitives imported live from{" "}
            <code>../animations/</code>.
            {reducedMotion && " Reduced Motion simulation is currently active."}
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {focusedAnimationId && (
            <button type="button" className="btn-fui btn-fui-primary" onClick={onClearFocus}>
              <span>Showing: {focusedAnimationId} (Reset)</span>
            </button>
          )}
          <span className="badge">
            <Cpu size={11} />
            <span>
              {filtered.length} / {animationNodes.length} MOUNTED
            </span>
          </span>
        </div>
      </div>

      <div className="filter-row">
        <div className="filter-group">
          <span className="filter-label">Mechanic</span>
          <button
            type="button"
            className="pill-btn"
            data-active={selectedMechanic === "all"}
            onClick={() => setSelectedMechanic("all")}
          >
            all ({animationNodes.length})
          </button>
          {vaultRelations.mechanics.map((mech) => {
            const count = animationNodes.filter((a) => a.mechanic === mech).length;
            return (
              <button
                key={mech}
                type="button"
                className="pill-btn"
                data-active={selectedMechanic === mech}
                onClick={() => setSelectedMechanic(mech)}
              >
                {mech} ({count})
              </button>
            );
          })}
        </div>

        <div className="filter-group">
          <span className="filter-label">Perf Tier</span>
          {(["all", "low", "medium"] as const).map((tier) => (
            <button
              key={tier}
              type="button"
              className="pill-btn"
              data-active={selectedPerf === tier}
              onClick={() => setSelectedPerf(tier)}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          No animations match the active filters. Clear search or reset mechanic filter.
        </div>
      ) : (
        <div className="anim-grid">
          {filtered.map((anim) => {
            const cmd = getShadcnAddCommand(anim.registryItem);
            return (
              <article key={anim.id} className="fui-card">
                <div className="anim-card-header">
                  <div>
                    <h2 className="anim-card-title">{formatNodeLabel(anim.id)}</h2>
                    <div className="anim-card-id">{anim.id}</div>
                  </div>

                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end" }}>
                    <span className="badge badge-cyan">{anim.mechanic}</span>
                    <span
                      className={`badge ${
                        anim.perfTier === "low" ? "badge-emerald" : "badge-amber"
                      }`}
                    >
                      perf:{anim.perfTier}
                    </span>
                  </div>
                </div>

                <div className="anim-stage">{renderDemo(anim.id)}</div>

                <div className="anim-card-meta">
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                    <span className="filter-label" style={{ marginRight: 0 }}>
                      Engine:
                    </span>
                    {anim.engine.map((eng) => (
                      <span key={eng} className="badge">
                        {eng}
                      </span>
                    ))}
                    <span className="badge" title="Reduced motion fallback">
                      rm:{anim.reducedMotion}
                    </span>
                  </div>

                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
                    <span className="filter-label" style={{ marginRight: 2 }}>
                      Pairs:
                    </span>
                    {anim.pairsWith.map((targetId) => (
                      <button
                        key={targetId}
                        type="button"
                        className="rel-chip rel-chip-pair"
                        onClick={() => onJumpToNode(targetId)}
                        title={`Inspect ${targetId}`}
                      >
                        + {targetId}
                      </button>
                    ))}
                    {anim.clashesWith.length > 0 && (
                      <>
                        <span className="filter-label" style={{ marginLeft: 4, marginRight: 2 }}>
                          Clashes:
                        </span>
                        {anim.clashesWith.map((targetId) => (
                          <button
                            key={targetId}
                            type="button"
                            className="rel-chip rel-chip-clash"
                            onClick={() => onJumpToNode(targetId)}
                            title={`Inspect clashing ${targetId}`}
                          >
                            ! {targetId}
                          </button>
                        ))}
                      </>
                    )}
                  </div>
                </div>

                <div className="anim-card-footer">
                  <button
                    type="button"
                    className="btn-fui"
                    onClick={() => onInspectCode(anim)}
                  >
                    <Code2 size={12} />
                    <span>View Code</span>
                  </button>

                  <button
                    type="button"
                    className="btn-fui btn-fui-primary"
                    onClick={() => onCopy(cmd, `Copied CLI for ${anim.id}`)}
                  >
                    <Terminal size={12} />
                    <span>Copy shadcn Add</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
