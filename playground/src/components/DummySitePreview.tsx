import { useMemo, useRef, useState } from "react";
import { Activity, BookOpen, Cpu, Terminal } from "lucide-react";
import { getScopedStageStyle, type ResolvedStyleTheme } from "../lib/style-theme";
import type { LabTemplateId, LabViewportMode } from "../lib/lab-helpers";
import type { ResolvedLabSlots } from "../lib/lab-slots";
import { formatNodeLabel } from "../lib/vault-data";
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
  theme,
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

  const scopedStyle = useMemo(() => getScopedStageStyle(theme), [theme]);
  const hasDock = slots.nav.includes("dock-magnify");
  const hasElasticCols = slots.scrollFx.includes("elastic-column-scroll");

  const workspaceIds = useMemo(() => {
    const ids = [...slots.interactiveStage];
    if (hasElasticCols) ids.push("elastic-column-scroll");
    return ids;
  }, [slots.interactiveStage, hasElasticCols]);

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
          className="dummy-site-root"
          data-style-id={theme.styleId}
          data-profile={theme.profile}
          data-template={template}
          data-viewport={viewport}
          data-light={theme.isLight}
          style={scopedStyle}
        >
          {renderOsTitlebar()}
          {template === "landing" && renderLandingTemplate()}
          {template === "workbench" && renderWorkbenchTemplate()}
          {template === "editorial" && renderEditorialTemplate()}
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
