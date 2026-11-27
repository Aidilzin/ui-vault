import { useMemo, useRef, useState, type CSSProperties } from "react";
import { Activity, BookOpen, Cpu, RefreshCw, Terminal } from "lucide-react";
import { BentoShowcase } from "@vault/layouts/bento-showcase/bento-showcase";
import { TriageWorkbench } from "@vault/layouts/triage-workbench/triage-workbench";
import { SwissEditorialGrid } from "@vault/layouts/swiss-editorial-grid/swiss-editorial-grid";
import { SplitAiIde } from "@vault/layouts/split-ai-ide/split-ai-ide";
import { StickyScrollytelling } from "@vault/layouts/sticky-scrollytelling/sticky-scrollytelling";
import { FloatingOsDesktop } from "@vault/layouts/floating-os-desktop/floating-os-desktop";
import { CommandHudDashboard } from "@vault/layouts/command-hud-dashboard/command-hud-dashboard";
import { MasonryArchive } from "@vault/layouts/masonry-archive/masonry-archive";
import {
  applyTypographyOverride,
  getScopedStageStyle,
  type ResolvedStyleTheme,
} from "../lib/style-theme";
import type { LabTemplateId, LabViewportMode } from "../lib/lab-helpers";
import type { ResolvedLabSlots } from "../lib/lab-slots";
import { formatNodeLabel, nodeById, type TextureNode } from "../lib/vault-data";
import { renderTelemetryWidget } from "../lib/foundations-registry";
import { LabBackdropLayer } from "./LabBackdropLayer";
import {
  DummyFeatureGrid,
  DummyFloatingDock,
  DummyHeroCta,
  DummyMarqueeBand,
  DummyMetricsBar,
  DummyNavSlot,
  DummyOverlayPortal,
  DummyOverlayTriggers,
  DummyScrollFxSection,
  DummyScrollProgress,
  SlotInspectorWrap,
  renderKineticText,
  renderWorkspaceWidget,
  type FeatureItem,
  type MetricItem,
} from "./DummySiteSlots";

interface DummySitePreviewProps {
  theme: ResolvedStyleTheme;
  layoutId: string | null;
  textureId: string | null;
  textureOpacity: number;
  typographyId: string | null;
  telemetryIds: string[];
  telemetrySeed: number;
  onSimulateTelemetry: () => void;
  template: LabTemplateId;
  viewport: LabViewportMode;
  slots: ResolvedLabSlots;
  backdropOpacity: number;
  inspectSlots: boolean;
  epoch: number;
  reducedMotion: boolean;
  onReplay: () => void;
}

const LANDING_NAV = [
  { id: "platform", label: "Platform" },
  { id: "runtime", label: "Runtime" },
  { id: "telemetry", label: "Telemetry" },
  { id: "docs", label: "Docs" },
];

const LANDING_METRICS: MetricItem[] = [
  { label: "Global Uptime", value: 99.98, decimals: 2, suffix: "%" },
  { label: "Edge p99 Latency", value: 14.2, decimals: 1, suffix: "ms" },
  { label: "Active Clusters", value: 1280 },
];

const LANDING_FEATURES: FeatureItem[] = [
  {
    id: "edge-mesh",
    tag: "01 // ROUTING",
    title: "Deterministic Edge Mesh",
    desc: "Sub-15ms state replication across 42 global PoPs with automatic regional failover and zero cold starts.",
    metric: "14.2ms p99",
  },
  {
    id: "typed-tokens",
    tag: "02 // DESIGN OPS",
    title: "Scoped Token Compiler",
    desc: "Compile design tokens directly into isolated CSS layers with WCAG contrast verification at build time.",
    metric: "100% WCAG",
  },
  {
    id: "live-trace",
    tag: "03 // OBSERVABILITY",
    title: "Frame-Budget Telemetry",
    desc: "Continuous 60fps compositor profiling that flags main-thread layout thrash before code reaches production.",
    metric: "0ms JANK",
  },
];

const WORKBENCH_NAV = [
  { id: "runs", label: "Runs" },
  { id: "traces", label: "Traces" },
  { id: "diffs", label: "Diffs" },
  { id: "policy", label: "Policy" },
];

const WORKBENCH_METRICS: MetricItem[] = [
  { label: "Task Accuracy", value: 98.4, decimals: 1, suffix: "%" },
  { label: "Tokens / Sec", value: 148, suffix: "t/s" },
  { label: "Tool Calls", value: 24 },
];

const WORKBENCH_CARDS: FeatureItem[] = [
  {
    id: "planner",
    tag: "AGENT-01",
    title: "Architecture Planner",
    desc: "Audits repository graph, verifies registry parity, and synthesizes typed patch plans.",
    metric: "READY",
  },
  {
    id: "verifier",
    tag: "AGENT-02",
    title: "Headless Verifier",
    desc: "Captures multi-viewport DOM telemetry and enforces zero console errors on every diff.",
    metric: "ACTIVE",
  },
  {
    id: "publisher",
    tag: "AGENT-03",
    title: "Registry Publisher",
    desc: "Validates shadcn manifests and triggers atomic static preview builds.",
    metric: "STANDBY",
  },
];

const EDITORIAL_NAV = [
  { id: "essays", label: "Essays" },
  { id: "systems", label: "Systems" },
  { id: "archive", label: "Archive" },
  { id: "colophon", label: "Colophon" },
];

const EDITORIAL_METRICS: MetricItem[] = [
  { label: "Issue Index", value: 9, prefix: "NO. 0" },
  { label: "Specimens", value: 105 },
  { label: "Read Time", value: 11, suffix: " min" },
];

const EDITORIAL_ARTICLES: FeatureItem[] = [
  {
    id: "grid-honesty",
    tag: "ESSAY // 01",
    title: "On Structural Grid Honesty",
    desc: "Why exposed 1px hairlines, honest typography, and disciplined whitespace outlast decorative chrome.",
    metric: "11 MIN",
  },
  {
    id: "motion-grammar",
    tag: "ESSAY // 02",
    title: "Physics as Editorial Punctuation",
    desc: "Treating spring damping, optical refraction, and scroll inertia as deliberate reading cues.",
    metric: "8 MIN",
  },
  {
    id: "zero-dep-craft",
    tag: "ESSAY // 03",
    title: "Zero-Dependency Interface Craft",
    desc: "Building durable tactile interactions with native WAAPI, SVG filters, and hardware-composited transforms.",
    metric: "6 MIN",
  },
];

const MARQUEE_ITEMS_BY_TEMPLATE: Record<LabTemplateId, string[]> = {
  landing: [
    "AETHER EDGE",
    "ZERO COLD-START",
    "COMPOSITOR NATIVE",
    "TYPED TOKENS",
    "42 GLOBAL POPS",
    "WCAG VERIFIED",
  ],
  workbench: [
    "AGENT CONTROL",
    "REASONING TRACE",
    "SANDBOXED TOOLS",
    "INLINE DIFFS",
    "HUMAN APPROVAL",
    "ZERO LEAKAGE",
  ],
  editorial: [
    "FORMA JOURNAL",
    "ISSUE 09",
    "SWISS TYPOGRAPHY",
    "KINETIC SPECIMENS",
    "ARCHIVAL PRINT",
    "SYSTEMS CRAFT",
  ],
};

export function DummySitePreview({
  theme: baseTheme,
  layoutId,
  textureId,
  textureOpacity,
  typographyId,
  telemetryIds,
  telemetrySeed,
  onSimulateTelemetry,
  template,
  viewport,
  slots,
  backdropOpacity,
  inspectSlots,
  epoch,
  reducedMotion,
  onReplay,
}: DummySitePreviewProps) {
  const browserScrollRef = useRef<HTMLDivElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [toastOpen, setToastOpen] = useState(true);

  const theme = useMemo(
    () => applyTypographyOverride(baseTheme, typographyId),
    [baseTheme, typographyId]
  );

  const activeTexture = useMemo(() => {
    if (!textureId) return null;
    const node = nodeById.get(textureId);
    return node?.kind === "texture" ? (node as TextureNode) : null;
  }, [textureId]);

  const scopedStyle = useMemo(() => getScopedStageStyle(theme), [theme]);
  const hasDock = slots.nav.includes("dock-magnify");
  const hasElasticCols = slots.scrollFx.includes("elastic-column-scroll");

  const workspaceIds = useMemo(() => {
    const ids = [...slots.interactiveStage];
    if (hasElasticCols) ids.push("elastic-column-scroll");
    return ids;
  }, [slots.interactiveStage, hasElasticCols]);

  const renderTelemetryBand = () => {
    if (telemetryIds.length === 0) return null;
    return (
      <section
        className="dummy-telemetry-band"
        data-testid="dummy-telemetry-band"
        style={{
          background: theme.surface,
          border: `${theme.borderWidth} solid ${theme.border}`,
          borderRadius: theme.radius,
          boxShadow: theme.profile === "swiss" ? "none" : theme.shadow,
        }}
      >
        <div
          className="dummy-telemetry-band-head"
          style={{ borderBottom: `1px solid ${theme.border}` }}
        >
          <span
            style={{
              fontFamily: theme.fontMono,
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: theme.accent,
            }}
          >
            LIVE TELEMETRY ({telemetryIds.length})
          </span>
          <button
            type="button"
            onClick={onSimulateTelemetry}
            style={{
              appearance: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "2px 7px",
              borderRadius: theme.radius,
              border: `1px solid ${theme.borderStrong}`,
              background: "transparent",
              color: theme.surfaceInk,
              fontFamily: theme.fontMono,
              fontSize: 9.5,
              cursor: "pointer",
            }}
          >
            <RefreshCw size={10} />
            <span>Simulate</span>
          </button>
        </div>

        <div
          className="dummy-telemetry-band-grid"
          data-count={telemetryIds.length}
        >
          {telemetryIds.map((telId) => (
            <div
              key={telId}
              className="dummy-telemetry-cell"
              style={{
                border: `1px solid ${theme.border}`,
                borderRadius: theme.radius,
                background: theme.elevated,
              }}
            >
              {renderTelemetryWidget(telId, {
                seed: telemetrySeed,
                reducedMotion,
              })}
            </div>
          ))}
        </div>
      </section>
    );
  };

  // Classic OS window titlebar for `retro-os` styles (`os-core`, `retro-web-96`)
  const renderOsTitlebar = () => {
    if (theme.profile !== "retro-os") return null;
    return (
      <div
        className="dummy-os-titlebar"
        style={{
          background: theme.accent,
          color: theme.accentInk,
          borderBottom: `2px solid ${theme.borderStrong}`,
          fontFamily: theme.fontMono,
        }}
      >
        <span>
          ■ AETHER_{template.toUpperCase()}.EXE — [{theme.styleId}]
        </span>
        <span className="dummy-os-controls" aria-hidden="true">
          <span>_</span>
          <span>□</span>
          <span>×</span>
        </span>
      </div>
    );
  };

  // Profile-specific eyebrow accent (Brutalist sticker, Acid barcode, or clean mono eyebrow)
  const renderHeroEyebrow = (defaultText: string) => {
    if (slots.heroTitleSecondary === "split-flap-clock") {
      return (
        <SlotInspectorWrap
          slot="hero-title"
          activeIds={["split-flap-clock"]}
          inspectSlots={inspectSlots}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span
              style={{
                fontFamily: theme.fontMono,
                fontSize: 10,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: theme.accent,
              }}
            >
              {defaultText}
            </span>
            <div style={{ transform: "scale(0.84)", transformOrigin: "left center" }}>
              {renderKineticText("split-flap-clock", defaultText, theme, epoch)}
            </div>
          </div>
        </SlotInspectorWrap>
      );
    }

    const innerText = slots.heroTitleSecondary
      ? renderKineticText(slots.heroTitleSecondary, defaultText, theme, epoch)
      : defaultText;

    if (theme.profile === "brutalist") {
      return (
        <span
          className="dummy-brutal-sticker"
          style={{
            background: theme.accent,
            color: theme.accentInk,
            border: "2px solid #000000",
            boxShadow: "3px 3px 0 #000000",
            fontFamily: theme.fontMono,
          }}
        >
          {innerText}
        </span>
      );
    }

    if (theme.profile === "acid") {
      return (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span
            style={{
              background:
                theme.chrome ??
                "linear-gradient(135deg, #ffffff 0%, #7c8496 45%, #f8fafc 55%, #272b36 100%)",
              color: "#050507",
              padding: "2px 10px",
              borderRadius: 999,
              fontFamily: theme.fontMono,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            {innerText}
          </span>
          <span
            style={{
              fontFamily: theme.fontMono,
              fontSize: 10,
              color: theme.accent,
              letterSpacing: "0.1em",
            }}
          >
            ||| || ||| | |||| SN-9904X
          </span>
        </div>
      );
    }

    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "3px 9px",
          borderRadius: theme.radius,
          border: `1px solid ${theme.borderStrong}`,
          background: theme.surface,
          color: theme.accent,
          fontFamily: theme.fontMono,
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
        }}
      >
        {innerText}
      </span>
    );
  };

  /* ==========================================================================
     TEMPLATE 1: SAAS LANDING ("Aether Engine")
     ========================================================================== */
  const renderLandingTemplate = () => {
    const headlineText = "Spatial infrastructure for high-craft teams.";

    return (
      <>
        {/* Sticky Top Navbar */}
        <header
          className="dummy-navbar"
          style={{
            background: theme.surface,
            borderBottom: `${theme.borderWidth} solid ${theme.border}`,
            backdropFilter: theme.blur ? `blur(${theme.blur})` : undefined,
          }}
        >
          <div className="dummy-brand">
            <span
              className="dummy-brand-dot"
              style={{
                background: theme.accent,
                color: theme.accentInk,
                borderRadius: theme.radius,
              }}
            >
              A
            </span>
            <span
              style={{
                fontFamily: theme.fontHeading,
                fontWeight: 700,
                fontSize: 14,
                color: theme.surfaceInk,
                letterSpacing: "-0.02em",
              }}
            >
              Aether Engine
            </span>
          </div>

          <DummyNavSlot
            navIds={slots.nav}
            links={LANDING_NAV}
            theme={theme}
            inspectSlots={inspectSlots}
          />

          <div className="dummy-nav-right">
            <DummyOverlayTriggers
              overlayIds={slots.overlay}
              drawerOpen={drawerOpen}
              toastOpen={toastOpen}
              onToggleDrawer={() => setDrawerOpen((v) => !v)}
              onToggleToast={() => setToastOpen((v) => !v)}
              theme={theme}
            />
            <button
              type="button"
              onClick={onReplay}
              style={{
                appearance: "none",
                cursor: "pointer",
                padding: "5px 11px",
                borderRadius: theme.radius,
                border: `${theme.borderWidth} solid ${theme.borderStrong}`,
                background: theme.accent,
                color: theme.accentInk,
                fontFamily: theme.fontMono,
                fontSize: 10,
                fontWeight: 600,
              }}
            >
              Deploy
            </button>
          </div>
        </header>

        <DummyScrollProgress
          scrollFxIds={slots.scrollFx}
          scrollRef={browserScrollRef}
          theme={theme}
        />

        {/* Full-bleed Hero */}
        <section
          className="dummy-hero"
          data-profile={theme.profile}
          style={{
            borderBottom: `${theme.borderWidth} solid ${theme.border}`,
          }}
        >
          {slots.heroBgPrimary && (
            <SlotInspectorWrap
              slot="hero-bg"
              activeIds={[slots.heroBgPrimary]}
              inspectSlots={inspectSlots}
              style={{ position: "absolute", inset: 0, zIndex: 0 }}
            >
              <LabBackdropLayer
                animationId={slots.heroBgPrimary}
                theme={theme}
                opacity={backdropOpacity}
                motionEpoch={epoch}
                reducedMotion={reducedMotion}
              />
            </SlotInspectorWrap>
          )}

          <div
            className="dummy-hero-inner"
            style={
              slots.heroBgPrimary
                ? {
                    background: `radial-gradient(ellipse at 32% 45%, ${theme.heroScrim} 0%, transparent 78%)`,
                    borderRadius: theme.radius,
                  }
                : undefined
            }
          >
            {renderHeroEyebrow(`${formatNodeLabel(theme.styleId)} // v2.4 EDGE`)}

            <SlotInspectorWrap
              slot="hero-title"
              activeIds={slots.heroTitlePrimary ? [slots.heroTitlePrimary] : []}
              inspectSlots={inspectSlots}
            >
              <h1
                className="dummy-hero-h1"
                data-profile={theme.profile}
                style={{
                  fontFamily: theme.fontHeading,
                  color: theme.ink,
                }}
              >
                {renderKineticText(slots.heroTitlePrimary, headlineText, theme, epoch)}
              </h1>
            </SlotInspectorWrap>

            <p
              className="dummy-hero-sub"
              style={{ color: theme.inkMuted }}
            >
              Ship deterministic edge runtimes, contrast-verified design systems, and
              60fps zero-dependency motion primitives from one unified control plane.
            </p>

            <DummyHeroCta
              ctaIds={slots.heroCta}
              primaryLabel="Start Building"
              secondaryLabel="Read Architecture"
              theme={theme}
              inspectSlots={inspectSlots}
              onAction={onReplay}
            />
          </div>
        </section>

        {/* Scroll-FX Wrapped Page Body */}
        <div className="dummy-body-stack">
          <DummyScrollFxSection
            scrollFxIds={slots.scrollFx}
            scrollRef={browserScrollRef}
            theme={theme}
            reducedMotion={reducedMotion}
            inspectSlots={inspectSlots}
          >
            <div className="dummy-sections-gap">
              {/* Optional Marquee Band */}
              <DummyMarqueeBand
                marqueeIds={slots.marqueeBand}
                items={MARQUEE_ITEMS_BY_TEMPLATE.landing}
                theme={theme}
                inspectSlots={inspectSlots}
              />

              {/* 3-Metric Telemetry Bar */}
              <DummyMetricsBar
                metricIds={slots.metrics}
                items={LANDING_METRICS}
                theme={theme}
                epoch={epoch}
                inspectSlots={inspectSlots}
              />

              {renderTelemetryBand()}

              {/* 3-Column Feature Grid */}
              <section className="dummy-section">
                <div className="dummy-section-head">
                  <span
                    style={{
                      fontFamily: theme.fontMono,
                      fontSize: 10,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: theme.accent,
                    }}
                  >
                    CORE CAPABILITIES
                  </span>
                  <h2
                    style={{
                      margin: "3px 0 0",
                      fontFamily: theme.fontHeading,
                      fontSize: 19,
                      fontWeight: 700,
                      color: theme.ink,
                    }}
                  >
                    Engineered for zero layout thrash
                  </h2>
                </div>

                <DummyFeatureGrid
                  cardIds={slots.featureCards}
                  features={LANDING_FEATURES}
                  theme={theme}
                  epoch={epoch}
                  inspectSlots={inspectSlots}
                />
              </section>

              {/* Live Product Preview / Interactive Workspace */}
              <section
                className="dummy-product-window"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  background: theme.surface,
                  border: `${theme.borderWidth} solid ${theme.border}`,
                  borderRadius: theme.radius,
                  boxShadow: theme.profile === "swiss" ? "none" : theme.shadow,
                  backdropFilter: theme.blur ? `blur(${theme.blur})` : undefined,
                }}
              >
                {slots.heroBgSecondary && (
                  <LabBackdropLayer
                    animationId={slots.heroBgSecondary}
                    theme={theme}
                    opacity={backdropOpacity * 0.7}
                    motionEpoch={epoch}
                    reducedMotion={reducedMotion}
                  />
                )}

                <div
                  className="dummy-product-window-head"
                  style={{ borderBottom: `1px solid ${theme.border}`, position: "relative", zIndex: 1 }}
                >
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                    <Terminal size={13} color={theme.accent} />
                    <span
                      style={{
                        fontFamily: theme.fontMono,
                        fontSize: 11,
                        fontWeight: 600,
                        color: theme.surfaceInk,
                      }}
                    >
                      LIVE PRODUCT WORKSPACE
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: theme.fontMono,
                      fontSize: 10,
                      color: theme.surfaceMuted,
                    }}
                  >
                    {workspaceIds.length > 0
                      ? `${workspaceIds.length} active module${workspaceIds.length === 1 ? "" : "s"}`
                      : "production // nominal"}
                  </span>
                </div>

                <div className="dummy-product-window-body" style={{ position: "relative", zIndex: 1 }}>
                  <SlotInspectorWrap
                    slot="interactive-stage"
                    activeIds={workspaceIds}
                    inspectSlots={inspectSlots}
                  >
                    {workspaceIds.length > 0 ? (
                      <div className="dummy-workspace-grid">
                        {workspaceIds.map((id) => (
                          <div key={id} className="dummy-workspace-item">
                            {renderWorkspaceWidget(id, theme, epoch)}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="dummy-default-deploy-panel">
                        <div
                          style={{
                            fontFamily: theme.fontMono,
                            fontSize: 11,
                            color: theme.accent,
                          }}
                        >
                          $ aether deploy --region=global --tokens={theme.styleId}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: theme.surfaceMuted,
                            marginTop: 6,
                          }}
                        >
                          ✓ Built 105 verified primitives in 1.42s · 0 layout shifts · Add any{" "}
                          <code>ai-agentic</code> or interactive widget from the left rail to mount it live here.
                        </div>
                      </div>
                    )}
                  </SlotInspectorWrap>
                </div>
              </section>
            </div>
          </DummyScrollFxSection>
        </div>

        {/* Compact Footer */}
        <footer
          className="dummy-footer"
          style={{
            borderTop: `${theme.borderWidth} solid ${theme.border}`,
            color: theme.inkMuted,
            fontFamily: theme.fontMono,
          }}
        >
          <span>© 2026 AETHER SYSTEMS · STYLE: {theme.styleId}</span>
          <span>PROFILE: {theme.profile.toUpperCase()}</span>
        </footer>
      </>
    );
  };

  /* ==========================================================================
     TEMPLATE 2: AI WORKBENCH ("Agent Control Surface")
     ========================================================================== */
  const renderWorkbenchTemplate = () => {
    const hasComposer = workspaceIds.includes("slash-prompt-composer");
    const streamWidgets = workspaceIds.filter((id) => id !== "slash-prompt-composer");

    return (
      <>
        <header
          className="dummy-navbar"
          style={{
            background: theme.surface,
            borderBottom: `${theme.borderWidth} solid ${theme.border}`,
          }}
        >
          <div className="dummy-brand">
            <Cpu size={15} color={theme.accent} />
            <span
              style={{
                fontFamily: theme.fontMono,
                fontWeight: 700,
                fontSize: 12,
                color: theme.surfaceInk,
              }}
            >
              AETHER // AGENT STUDIO
            </span>
          </div>

          <DummyNavSlot
            navIds={slots.nav}
            links={WORKBENCH_NAV}
            theme={theme}
            inspectSlots={inspectSlots}
          />

          <div className="dummy-nav-right">
            <DummyOverlayTriggers
              overlayIds={slots.overlay}
              drawerOpen={drawerOpen}
              toastOpen={toastOpen}
              onToggleDrawer={() => setDrawerOpen((v) => !v)}
              onToggleToast={() => setToastOpen((v) => !v)}
              theme={theme}
            />
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                fontFamily: theme.fontMono,
                fontSize: 10,
                color: theme.pairInk,
              }}
            >
              <Activity size={11} />
              <span>RUN #408</span>
            </span>
          </div>
        </header>

        <DummyScrollProgress
          scrollFxIds={slots.scrollFx}
          scrollRef={browserScrollRef}
          theme={theme}
        />

        <div className="dummy-workbench-split">
          {/* Left Sidebar: Metrics & Agent Status Cards */}
          <aside
            className="dummy-workbench-sidebar"
            style={{
              borderRight: `${theme.borderWidth} solid ${theme.border}`,
              background: theme.profile === "swiss" ? "transparent" : theme.surface,
            }}
          >
            <DummyMetricsBar
              metricIds={slots.metrics}
              items={WORKBENCH_METRICS}
              theme={theme}
              epoch={epoch}
              inspectSlots={inspectSlots}
            />

            <div style={{ marginTop: 12 }}>
              <div
                style={{
                  fontFamily: theme.fontMono,
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  color: theme.surfaceMuted,
                  marginBottom: 8,
                }}
              >
                ACTIVE AGENTS (3)
              </div>
              <DummyFeatureGrid
                cardIds={slots.featureCards}
                features={WORKBENCH_CARDS}
                theme={theme}
                epoch={epoch}
                inspectSlots={inspectSlots}
              />
            </div>
          </aside>

          {/* Right Execution Canvas */}
          <div className="dummy-workbench-main">
            {/* Run Header with Optional Hero-BG */}
            <div
              className="dummy-workbench-hero"
              style={{
                position: "relative",
                overflow: "hidden",
                borderBottom: `${theme.borderWidth} solid ${theme.border}`,
              }}
            >
              {slots.heroBgPrimary && (
                <LabBackdropLayer
                  animationId={slots.heroBgPrimary}
                  theme={theme}
                  opacity={backdropOpacity}
                  motionEpoch={epoch}
                  reducedMotion={reducedMotion}
                />
              )}

              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  padding: "16px 18px",
                  background: slots.heroBgPrimary
                    ? `linear-gradient(90deg, ${theme.heroScrim} 0%, transparent 92%)`
                    : undefined,
                }}
              >
                {renderHeroEyebrow("AUTONOMOUS PATCH PIPELINE")}

                <SlotInspectorWrap
                  slot="hero-title"
                  activeIds={slots.heroTitlePrimary ? [slots.heroTitlePrimary] : []}
                  inspectSlots={inspectSlots}
                >
                  <h1
                    style={{
                      margin: "8px 0 6px",
                      fontFamily: theme.fontHeading,
                      fontSize: 22,
                      fontWeight: 700,
                      color: theme.ink,
                    }}
                  >
                    {renderKineticText(
                      slots.heroTitlePrimary,
                      "Refactor token pipeline & verify 105 registry items",
                      theme,
                      epoch
                    )}
                  </h1>
                </SlotInspectorWrap>

                <DummyHeroCta
                  ctaIds={slots.heroCta}
                  primaryLabel="Approve Patch"
                  secondaryLabel="Export Trace"
                  theme={theme}
                  inspectSlots={inspectSlots}
                  onAction={onReplay}
                />
              </div>
            </div>

            <DummyMarqueeBand
              marqueeIds={slots.marqueeBand}
              items={MARQUEE_ITEMS_BY_TEMPLATE.workbench}
              theme={theme}
              inspectSlots={inspectSlots}
            />

            {/* Agent Execution Stream */}
            <DummyScrollFxSection
              scrollFxIds={slots.scrollFx}
              scrollRef={browserScrollRef}
              theme={theme}
              reducedMotion={reducedMotion}
              inspectSlots={inspectSlots}
            >
              <div className="dummy-workbench-thread">
                {renderTelemetryBand()}
                <SlotInspectorWrap
                  slot="interactive-stage"
                  activeIds={workspaceIds}
                  inspectSlots={inspectSlots}
                >
                  {streamWidgets.length > 0 ? (
                    <div className="dummy-agent-stack">
                      {streamWidgets.map((id) => (
                        <div key={id} className="dummy-workspace-item">
                          {renderWorkspaceWidget(id, theme, epoch)}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      className="dummy-default-deploy-panel"
                      style={{
                        background: theme.surface,
                        border: `1px solid ${theme.border}`,
                        borderRadius: theme.radius,
                        padding: 16,
                      }}
                    >
                      <div style={{ fontFamily: theme.fontMono, fontSize: 11, color: theme.accent }}>
                        AGENT EXECUTION CANVAS READY
                      </div>
                      <div style={{ fontSize: 12, color: theme.surfaceMuted, marginTop: 6 }}>
                        Toggle <code>reasoning-trace</code>, <code>tool-call-step</code>,{" "}
                        <code>streaming-token-text</code>, <code>inline-code-diff</code>, or{" "}
                        <code>slash-prompt-composer</code> from the left rail to compose a live agent UI.
                      </div>
                    </div>
                  )}
                </SlotInspectorWrap>
              </div>
            </DummyScrollFxSection>

            {/* Pinned Prompt Composer at Bottom of Workbench */}
            {hasComposer && (
              <div
                className="dummy-workbench-composer"
                style={{
                  borderTop: `${theme.borderWidth} solid ${theme.border}`,
                  background: theme.surface,
                }}
              >
                {renderWorkspaceWidget("slash-prompt-composer", theme, epoch)}
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  /* ==========================================================================
     TEMPLATE 3: EDITORIAL ("Forma · Design & Systems Journal")
     ========================================================================== */
  const renderEditorialTemplate = () => {
    const headlineText = "Typography, Friction & Honest Surfaces";

    return (
      <>
        <header
          className="dummy-navbar"
          style={{
            background: theme.canvas,
            borderBottom: `${theme.borderWidth} solid ${theme.borderStrong}`,
          }}
        >
          <div className="dummy-brand">
            <BookOpen size={15} color={theme.accent} />
            <span
              style={{
                fontFamily: theme.fontHeading,
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: theme.ink,
              }}
            >
              FORMA
            </span>
            <span
              style={{
                fontFamily: theme.fontMono,
                fontSize: 10,
                color: theme.inkMuted,
              }}
            >
              ISSUE 09
            </span>
          </div>

          <DummyNavSlot
            navIds={slots.nav}
            links={EDITORIAL_NAV}
            theme={theme}
            inspectSlots={inspectSlots}
          />

          <DummyOverlayTriggers
            overlayIds={slots.overlay}
            drawerOpen={drawerOpen}
            toastOpen={toastOpen}
            onToggleDrawer={() => setDrawerOpen((v) => !v)}
            onToggleToast={() => setToastOpen((v) => !v)}
            theme={theme}
          />
        </header>

        <DummyScrollProgress
          scrollFxIds={slots.scrollFx}
          scrollRef={browserScrollRef}
          theme={theme}
        />

        {/* Editorial Oversized Typographic Hero */}
        <section
          className="dummy-hero dummy-editorial-hero"
          data-profile={theme.profile}
          style={{
            borderBottom: `${theme.borderWidth} solid ${theme.borderStrong}`,
          }}
        >
          {slots.heroBgPrimary && (
            <SlotInspectorWrap
              slot="hero-bg"
              activeIds={[slots.heroBgPrimary]}
              inspectSlots={inspectSlots}
              style={{ position: "absolute", inset: 0, zIndex: 0 }}
            >
              <LabBackdropLayer
                animationId={slots.heroBgPrimary}
                theme={theme}
                opacity={backdropOpacity}
                motionEpoch={epoch}
                reducedMotion={reducedMotion}
              />
            </SlotInspectorWrap>
          )}

          <div
            className="dummy-hero-inner"
            style={
              slots.heroBgPrimary
                ? {
                    background: `radial-gradient(ellipse at 36% 45%, ${theme.heroScrim} 0%, transparent 80%)`,
                    borderRadius: theme.radius,
                  }
                : undefined
            }
          >
            {renderHeroEyebrow("MONOGRAPH // BY ELENA ROSTOVA · 11 MIN READ")}

            <SlotInspectorWrap
              slot="hero-title"
              activeIds={slots.heroTitlePrimary ? [slots.heroTitlePrimary] : []}
              inspectSlots={inspectSlots}
            >
              <h1
                className="dummy-hero-h1 dummy-editorial-h1"
                data-profile={theme.profile}
                style={{
                  fontFamily: theme.fontHeading,
                  color: theme.ink,
                }}
              >
                {renderKineticText(slots.heroTitlePrimary, headlineText, theme, epoch)}
              </h1>
            </SlotInspectorWrap>

            <p className="dummy-hero-sub" style={{ color: theme.inkMuted }}>
              An inquiry into how structural hairlines, tactile elevation, and restrained
              kinetic choreography shape reading calm across modern interfaces.
            </p>

            <DummyHeroCta
              ctaIds={slots.heroCta}
              primaryLabel="Read Monograph"
              secondaryLabel="Browse Specimens"
              theme={theme}
              inspectSlots={inspectSlots}
              onAction={onReplay}
            />
          </div>
        </section>

        <div className="dummy-body-stack">
          <DummyScrollFxSection
            scrollFxIds={slots.scrollFx}
            scrollRef={browserScrollRef}
            theme={theme}
            reducedMotion={reducedMotion}
            inspectSlots={inspectSlots}
          >
            <div className="dummy-sections-gap">
              <DummyMarqueeBand
                marqueeIds={slots.marqueeBand}
                items={MARQUEE_ITEMS_BY_TEMPLATE.editorial}
                theme={theme}
                inspectSlots={inspectSlots}
              />

              {/* Asymmetric 2-Column Editorial Spread */}
              <div className="dummy-editorial-spread">
                <div>
                  <div
                    style={{
                      fontFamily: theme.fontMono,
                      fontSize: 10,
                      letterSpacing: "0.08em",
                      color: theme.accent,
                      marginBottom: 10,
                    }}
                  >
                    FEATURED DISPATCHES
                  </div>
                  <DummyFeatureGrid
                    cardIds={slots.featureCards}
                    features={EDITORIAL_ARTICLES}
                    theme={theme}
                    epoch={epoch}
                    inspectSlots={inspectSlots}
                  />
                </div>

                {/* Interactive Artifact Inset */}
                <aside
                  className="dummy-editorial-artifact"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    background: theme.surface,
                    border: `${theme.borderWidth} solid ${theme.border}`,
                    borderRadius: theme.radius,
                    boxShadow: theme.profile === "swiss" ? "none" : theme.shadow,
                  }}
                >
                  {slots.heroBgSecondary && (
                    <LabBackdropLayer
                      animationId={slots.heroBgSecondary}
                      theme={theme}
                      opacity={backdropOpacity * 0.75}
                      motionEpoch={epoch}
                      reducedMotion={reducedMotion}
                    />
                  )}
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div
                      style={{
                        fontFamily: theme.fontMono,
                        fontSize: 10,
                        letterSpacing: "0.08em",
                        color: theme.surfaceMuted,
                        marginBottom: 10,
                      }}
                    >
                      FIG. 01 // INTERACTIVE SPECIMEN
                    </div>

                    <SlotInspectorWrap
                      slot="interactive-stage"
                      activeIds={workspaceIds}
                      inspectSlots={inspectSlots}
                    >
                      {workspaceIds.length > 0 ? (
                        <div className="dummy-agent-stack">
                          {workspaceIds.map((id) => (
                            <div key={id} className="dummy-workspace-item">
                              {renderWorkspaceWidget(id, theme, epoch)}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div
                          style={{
                            padding: "24px 16px",
                            border: `1px dashed ${theme.borderStrong}`,
                            borderRadius: theme.radius,
                            textAlign: "center",
                            fontSize: 12,
                            color: theme.surfaceMuted,
                          }}
                        >
                          Add <code>perspective-book</code>, <code>accordion-gallery</code>, or{" "}
                          <code>rotary-type-dial</code> to inspect a live editorial artifact here.
                        </div>
                      )}
                    </SlotInspectorWrap>
                  </div>
                </aside>
              </div>

              <DummyMetricsBar
                metricIds={slots.metrics}
                items={EDITORIAL_METRICS}
                theme={theme}
                epoch={epoch}
                inspectSlots={inspectSlots}
              />

              {renderTelemetryBand()}
            </div>
          </DummyScrollFxSection>
        </div>

        <footer
          className="dummy-footer"
          style={{
            borderTop: `${theme.borderWidth} solid ${theme.borderStrong}`,
            color: theme.inkMuted,
            fontFamily: theme.fontMono,
          }}
        >
          <span>FORMA JOURNAL // COLOPHON</span>
          <span>TYPESET IN {theme.styleId.toUpperCase()}</span>
        </footer>
      </>
    );
  };

  /* ==========================================================================
     LAYOUT SHELL OVERRIDE (8 real @vault/layouts/* shells)
     ========================================================================== */
  const renderLayoutShellOverride = () => {
    const contentTitle =
      template === "workbench"
        ? "Autonomous Patch Pipeline"
        : template === "editorial"
          ? "Typography, Friction & Honest Surfaces"
          : "Spatial infrastructure for high-craft teams.";
    const contentSub =
      template === "workbench"
        ? "Orchestrate reasoning traces, sandboxed tool calls, and inline code diffs in one deterministic agent shell."
        : template === "editorial"
          ? "An inquiry into how structural hairlines, tactile elevation, and restrained kinetic choreography shape reading calm."
          : "Ship deterministic edge runtimes, contrast-verified design systems, and zero-dependency motion primitives.";
    const features =
      template === "workbench"
        ? WORKBENCH_CARDS
        : template === "editorial"
          ? EDITORIAL_ARTICLES
          : LANDING_FEATURES;
    const metrics =
      template === "workbench"
        ? WORKBENCH_METRICS
        : template === "editorial"
          ? EDITORIAL_METRICS
          : LANDING_METRICS;
    const navLinks =
      template === "workbench"
        ? WORKBENCH_NAV
        : template === "editorial"
          ? EDITORIAL_NAV
          : LANDING_NAV;

    const compactNavbar = (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <div className="dummy-brand">
          <span
            className="dummy-brand-dot"
            style={{
              background: theme.accent,
              color: theme.accentInk,
              borderRadius: theme.radius,
            }}
          >
            A
          </span>
          <span style={{ fontFamily: theme.fontHeading, fontWeight: 700, fontSize: 13 }}>
            {template === "editorial" ? "FORMA" : "Aether Engine"}
          </span>
        </div>
        <DummyNavSlot
          navIds={slots.nav}
          links={navLinks}
          theme={theme}
          inspectSlots={inspectSlots}
        />
      </div>
    );

    const heroBlock = (
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 10 }}>
        {renderHeroEyebrow(`${formatNodeLabel(theme.styleId)} // ${layoutId}`)}
        <SlotInspectorWrap
          slot="hero-title"
          activeIds={slots.heroTitlePrimary ? [slots.heroTitlePrimary] : []}
          inspectSlots={inspectSlots}
        >
          <h1
            className="dummy-hero-h1"
            data-profile={theme.profile}
            style={{ fontFamily: theme.fontHeading, color: theme.ink }}
          >
            {renderKineticText(slots.heroTitlePrimary, contentTitle, theme, epoch)}
          </h1>
        </SlotInspectorWrap>
        <p className="dummy-hero-sub" style={{ color: theme.inkMuted }}>
          {contentSub}
        </p>
        <DummyHeroCta
          ctaIds={slots.heroCta}
          primaryLabel="Start Building"
          secondaryLabel="Inspect Spec"
          theme={theme}
          inspectSlots={inspectSlots}
          onAction={onReplay}
        />
      </div>
    );

    const primaryTelemetry =
      telemetryIds.length > 0
        ? renderTelemetryBand()
        : (
          <DummyMetricsBar
            metricIds={slots.metrics}
            items={metrics}
            theme={theme}
            epoch={epoch}
            inspectSlots={inspectSlots}
          />
        );

    const footerBar = (
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: theme.fontMono, fontSize: 10 }}>
        <span>STYLE: {theme.styleId.toUpperCase()}</span>
        <span>LAYOUT: {layoutId?.toUpperCase()}</span>
      </div>
    );

    switch (layoutId) {
      case "bento-showcase":
        return (
          <BentoShowcase
            header={compactNavbar}
            hero={heroBlock}
            metricColumn={primaryTelemetry}
            tiles={features.map((f) => (
              <div key={f.id}>
                <div style={{ fontFamily: theme.fontMono, fontSize: 10, color: theme.accent }}>
                  {f.tag}
                </div>
                <h2 style={{ margin: "4px 0", fontFamily: theme.fontHeading, fontSize: 15 }}>
                  {f.title}
                </h2>
                <p style={{ margin: 0, fontSize: 12, color: theme.surfaceMuted }}>{f.desc}</p>
              </div>
            ))}
            footer={footerBar}
          />
        );

      case "triage-workbench":
        return (
          <TriageWorkbench
            header={compactNavbar}
            navRail={navLinks.map((n, idx) => (
              <div
                key={n.id}
                style={{
                  fontFamily: theme.fontMono,
                  fontSize: 11,
                  padding: "4px 8px",
                  borderRadius: theme.radius,
                  background: idx === 0 ? theme.elevated : "transparent",
                  color: idx === 0 ? theme.accent : theme.surfaceMuted,
                }}
              >
                {n.label}
              </div>
            ))}
            queuePane={features.map((f) => (
              <div
                key={f.id}
                style={{
                  padding: "10px 12px",
                  border: `1px solid ${theme.border}`,
                  borderRadius: theme.radius,
                  background: theme.surface,
                }}
              >
                <div style={{ fontFamily: theme.fontMono, fontSize: 9.5, color: theme.accent }}>
                  {f.tag} · {f.metric}
                </div>
                <div style={{ fontWeight: 600, fontSize: 13, marginTop: 3 }}>{f.title}</div>
              </div>
            ))}
            inspectorPane={
              <>
                {heroBlock}
                {primaryTelemetry}
              </>
            }
            footer={footerBar}
          />
        );

      case "swiss-editorial-grid":
        return (
          <SwissEditorialGrid
            masthead={compactNavbar}
            indexRail={
              <>
                <div style={{ fontFamily: theme.fontMono, fontSize: 10, color: theme.accent }}>
                  INDEX // 01–03
                </div>
                {features.map((f, i) => (
                  <div key={f.id} style={{ fontSize: 11.5, color: theme.inkMuted }}>
                    0{i + 1}. {f.title}
                  </div>
                ))}
              </>
            }
            hero={heroBlock}
            body={
              <>
                {primaryTelemetry}
                <DummyFeatureGrid
                  cardIds={slots.featureCards}
                  features={features}
                  theme={theme}
                  epoch={epoch}
                  inspectSlots={inspectSlots}
                />
              </>
            }
            footer={footerBar}
          />
        );

      case "split-ai-ide":
        return (
          <SplitAiIde
            header={compactNavbar}
            sessionRail={features.map((f, i) => (
              <div
                key={f.id}
                style={{
                  fontFamily: theme.fontMono,
                  fontSize: 10.5,
                  padding: "5px 8px",
                  borderRadius: theme.radius,
                  border: `1px solid ${i === 0 ? theme.accent : theme.border}`,
                  color: i === 0 ? theme.accent : theme.surfaceMuted,
                }}
              >
                RUN #{408 - i} · {f.id}
              </div>
            ))}
            stream={
              <>
                {heroBlock}
                {workspaceIds.length > 0 && (
                  <div className="dummy-agent-stack">
                    {workspaceIds.map((id) => (
                      <div key={id}>{renderWorkspaceWidget(id, theme, epoch)}</div>
                    ))}
                  </div>
                )}
              </>
            }
            composer={
              <div style={{ fontFamily: theme.fontMono, fontSize: 11, color: theme.surfaceMuted }}>
                &gt; /plan verify 144 registry items --style={theme.styleId}
              </div>
            }
            artifactPane={primaryTelemetry}
          />
        );

      case "sticky-scrollytelling":
        return (
          <StickyScrollytelling
            scrollContainerRef={browserScrollRef}
            header={compactNavbar}
            steps={features.map((f) => ({
              id: f.id,
              content: (
                <div>
                  <div style={{ fontFamily: theme.fontMono, fontSize: 10, color: theme.accent }}>
                    {f.tag}
                  </div>
                  <h2 style={{ margin: "4px 0 6px", fontFamily: theme.fontHeading, fontSize: 16 }}>
                    {f.title}
                  </h2>
                  <p style={{ margin: 0, fontSize: 12.5, color: theme.surfaceMuted }}>{f.desc}</p>
                </div>
              ),
            }))}
            renderStage={(idx) => (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ fontFamily: theme.fontMono, fontSize: 10, color: theme.accent }}>
                  ACTIVE CHAPTER 0{idx + 1} // {features[idx]?.title ?? "STAGE"}
                </div>
                {heroBlock}
                {primaryTelemetry}
              </div>
            )}
            footer={footerBar}
          />
        );

      case "floating-os-desktop":
        return (
          <FloatingOsDesktop
            menuBar={compactNavbar}
            primaryTitle={`${template.toUpperCase()}.APP`}
            primaryWindow={
              <>
                {heroBlock}
                <DummyFeatureGrid
                  cardIds={slots.featureCards}
                  features={features}
                  theme={theme}
                  epoch={epoch}
                  inspectSlots={inspectSlots}
                />
              </>
            }
            secondaryTitle="TELEMETRY.SYS"
            secondaryWindow={primaryTelemetry}
            dock={navLinks.map((n) => (
              <span
                key={n.id}
                style={{
                  fontFamily: theme.fontMono,
                  fontSize: 10,
                  padding: "3px 8px",
                  border: `1px solid ${theme.border}`,
                  borderRadius: theme.radius,
                }}
              >
                {n.label}
              </span>
            ))}
          />
        );

      case "command-hud-dashboard": {
        const quadTel = telemetryIds.length > 0 ? telemetryIds : ["inline-sparkline", "uptime-strip"];
        return (
          <CommandHudDashboard
            ticker={compactNavbar}
            quadrants={[
              { id: "hero", label: "COMMAND", content: heroBlock },
              {
                id: "tel-1",
                label: quadTel[0].toUpperCase(),
                content: renderTelemetryWidget(quadTel[0], {
                  seed: telemetrySeed,
                  reducedMotion,
                }),
              },
              {
                id: "tel-2",
                label: (quadTel[1] ?? "latency-histogram").toUpperCase(),
                content: renderTelemetryWidget(quadTel[1] ?? "latency-histogram", {
                  seed: telemetrySeed,
                  reducedMotion,
                }),
              },
              {
                id: "cap",
                label: "SYSTEM MODULES",
                content:
                  quadTel[2] ? (
                    renderTelemetryWidget(quadTel[2], {
                      seed: telemetrySeed,
                      reducedMotion,
                    })
                  ) : (
                    <DummyMetricsBar
                      metricIds={slots.metrics}
                      items={metrics}
                      theme={theme}
                      epoch={epoch}
                      inspectSlots={inspectSlots}
                    />
                  ),
              },
            ]}
            eventRail={footerBar}
          />
        );
      }

      case "masonry-archive":
        return (
          <MasonryArchive
            header={compactNavbar}
            filterBar={
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {navLinks.map((n, i) => (
                  <span
                    key={n.id}
                    style={{
                      fontFamily: theme.fontMono,
                      fontSize: 10,
                      padding: "2px 8px",
                      borderRadius: theme.radius,
                      border: `1px solid ${i === 0 ? theme.accent : theme.border}`,
                      color: i === 0 ? theme.accent : theme.surfaceMuted,
                    }}
                  >
                    {n.label}
                  </span>
                ))}
              </div>
            }
            items={[
              <div key="hero">{heroBlock}</div>,
              ...features.map((f) => (
                <div key={f.id}>
                  <div style={{ fontFamily: theme.fontMono, fontSize: 10, color: theme.accent }}>
                    {f.tag}
                  </div>
                  <h2 style={{ margin: "4px 0", fontFamily: theme.fontHeading, fontSize: 15 }}>
                    {f.title}
                  </h2>
                  <p style={{ margin: 0, fontSize: 12, color: theme.surfaceMuted }}>{f.desc}</p>
                </div>
              )),
            ]}
            detailRail={primaryTelemetry}
            footer={footerBar}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="dummy-browser-shell"
      data-viewport={viewport}
    >
      <div
        ref={browserScrollRef}
        className="dummy-browser-viewport"
        data-testid="dummy-browser-viewport"
      >
        <div
          className={
            typographyId
              ? `dummy-site-root type-${typographyId}`
              : "dummy-site-root"
          }
          data-style-id={theme.styleId}
          data-layout-id={layoutId ?? undefined}
          data-profile={theme.profile}
          data-template={template}
          data-viewport={viewport}
          data-light={theme.isLight}
          data-type-override={Boolean(typographyId)}
          data-texture-id={textureId ?? undefined}
          style={scopedStyle}
        >
          {activeTexture && (
            <div
              className={`dummy-texture-layer tx-${activeTexture.id}`}
              data-layer={activeTexture.layer}
              aria-hidden="true"
              style={
                {
                  "--tx-color":
                    activeTexture.id === "radial-vignette"
                      ? theme.isLight
                        ? "rgba(15, 23, 42, 0.72)"
                        : "rgba(0, 0, 0, 0.92)"
                      : theme.ink,
                  "--tx-opacity": String(textureOpacity),
                } as CSSProperties
              }
            />
          )}

          {inspectSlots && (layoutId || activeTexture || typographyId || telemetryIds.length > 0) && (
            <div className="dummy-foundations-inspector" aria-hidden="true">
              {layoutId && (
                <span className="slot-inspector-tag" style={{ position: "static" }}>
                  LAYOUT: {layoutId}
                </span>
              )}
              {activeTexture && (
                <span className="slot-inspector-tag" style={{ position: "static" }}>
                  TEXTURE ({activeTexture.layer.toUpperCase()}): {activeTexture.id} ·{" "}
                  {Math.round(textureOpacity * 100)}%
                </span>
              )}
              {typographyId && (
                <span className="slot-inspector-tag" style={{ position: "static" }}>
                  TYPOGRAPHY: {typographyId}
                </span>
              )}
              {telemetryIds.length > 0 && (
                <span className="slot-inspector-tag" style={{ position: "static" }}>
                  TELEMETRY: {telemetryIds.join(" + ")}
                </span>
              )}
            </div>
          )}

          {layoutId ? (
            renderLayoutShellOverride()
          ) : (
            <>
              {renderOsTitlebar()}
              {template === "landing" && renderLandingTemplate()}
              {template === "workbench" && renderWorkbenchTemplate()}
              {template === "editorial" && renderEditorialTemplate()}
            </>
          )}
        </div>
      </div>

      {/* Trapped inside .dummy-browser-shell (transform: translateZ(0)) so fixed overlays & dock stay scoped */}
      <DummyFloatingDock active={hasDock} inspectSlots={inspectSlots} />
      <DummyOverlayPortal
        overlayIds={slots.overlay}
        drawerOpen={drawerOpen}
        toastOpen={toastOpen}
        inspectSlots={inspectSlots}
      />
    </div>
  );
}
