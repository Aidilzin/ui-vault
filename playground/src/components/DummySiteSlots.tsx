import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import {
  ArrowRight,
  Compass,
  Cpu,
  Layers,
  LayoutGrid,
  List,
  Sparkles,
  Terminal,
} from "lucide-react";

// Cursor-reactive
import { MagneticButton } from "@vault/animations/cursor-reactive/magnetic-button";
import { BorderSpotlight } from "@vault/animations/cursor-reactive/border-spotlight";
import { StarBorder } from "@vault/animations/cursor-reactive/star-border";
import { CrosshairReticle } from "@vault/animations/cursor-reactive/crosshair-reticle";
import { BorderBeam } from "@vault/animations/cursor-reactive/border-beam";
import { KineticCardTrail } from "@vault/animations/cursor-reactive/kinetic-card-trail";
import { RotaryTypeDial } from "@vault/animations/cursor-reactive/rotary-type-dial";
import "@vault/animations/cursor-reactive/sibling-dim.css";

// Text-kinetic
import { ScrambleText } from "@vault/animations/text-kinetic/scramble-text";
import { SplitReveal } from "@vault/animations/text-kinetic/split-reveal";
import { VariableProximity } from "@vault/animations/text-kinetic/variable-proximity";
import { MarqueeHoverRow } from "@vault/animations/text-kinetic/marquee-hover-row";
import { ShinyText } from "@vault/animations/text-kinetic/shiny-text";
import { BlurText } from "@vault/animations/text-kinetic/blur-text";
import { TextRoll } from "@vault/animations/text-kinetic/text-roll";
import { SplitFlapClock } from "@vault/animations/text-kinetic/split-flap-clock";

// Layout-morph
import { FlipCard } from "@vault/animations/layout-morph/flip-card";
import { MakeWayGrid } from "@vault/animations/layout-morph/make-way-grid";
import { SpotlightTabs } from "@vault/animations/layout-morph/spotlight-tabs";
import { BlurFade } from "@vault/animations/layout-morph/blur-fade";
import { StackedCardDeck } from "@vault/animations/layout-morph/stacked-card-deck";
import { AccordionGallery } from "@vault/animations/layout-morph/accordion-gallery";
import { VelocityDismissDrawer } from "@vault/animations/layout-morph/velocity-dismiss-drawer";

// Shader-canvas
import { PixelCard } from "@vault/animations/shader-canvas/pixel-card";

// Physics-optics
import { LiquidGlassSurface } from "@vault/animations/physics-optics/liquid-glass-filter";
import { SpringTiltCard } from "@vault/animations/physics-optics/spring-tilt-card";
import { GlareHover } from "@vault/animations/physics-optics/glare-hover";
import { ElasticSlider } from "@vault/animations/physics-optics/elastic-slider";
import { DockMagnify } from "@vault/animations/physics-optics/dock-magnify";
import { SvgTurbulenceHover } from "@vault/animations/physics-optics/svg-turbulence-hover";
import { AnimatedConnectorBeam } from "@vault/animations/physics-optics/animated-connector-beam";
import { HolographicFoilCard } from "@vault/animations/physics-optics/holographic-foil-card";
import { GooeyPillNav } from "@vault/animations/physics-optics/gooey-pill-nav";
import { PerspectiveBook } from "@vault/animations/physics-optics/perspective-book";

// Scroll-driven
import { ScrollProgressBar } from "@vault/animations/scroll-driven/scroll-progress-bar";
import { ElasticColumnScroll } from "@vault/animations/scroll-driven/elastic-column-scroll";
import { ProgressiveBlurEdge } from "@vault/animations/scroll-driven/progressive-blur-edge";
import { InfiniteMarquee } from "@vault/animations/scroll-driven/infinite-marquee";

// Micro-feedback
import { ClickSpark } from "@vault/animations/micro-feedback/click-spark";
import { CountUp } from "@vault/animations/micro-feedback/count-up";
import { HoldToConfirm } from "@vault/animations/micro-feedback/hold-to-confirm";
import { TactilePressBadge } from "@vault/animations/micro-feedback/tactile-press-badge";
import { KineticStatusPill } from "@vault/animations/micro-feedback/kinetic-status-pill";
import { TactilePushButton } from "@vault/animations/micro-feedback/tactile-push-button";
import { OdometerTicker } from "@vault/animations/micro-feedback/odometer-ticker";
import { SpringNumberFlow } from "@vault/animations/micro-feedback/spring-number-flow";
import { StackedToastDeck } from "@vault/animations/micro-feedback/stacked-toast-deck";
import { MagneticCopySpell } from "@vault/animations/micro-feedback/magnetic-copy-spell";

// AI-agentic
import { StreamingTokenText } from "@vault/animations/ai-agentic/streaming-token-text";
import { ReasoningTrace } from "@vault/animations/ai-agentic/reasoning-trace";
import { ToolCallStep } from "@vault/animations/ai-agentic/tool-call-step";
import { AgentApprovalCard } from "@vault/animations/ai-agentic/agent-approval-card";
import { InlineCodeDiff } from "@vault/animations/ai-agentic/inline-code-diff";
import { SlashPromptComposer } from "@vault/animations/ai-agentic/slash-prompt-composer";
import { ChainOfThoughtRail } from "@vault/animations/ai-agentic/chain-of-thought-rail";

import type { ResolvedStyleTheme } from "../lib/style-theme";
import { SLOT_INSPECTOR_NAME, type SlotId } from "../lib/lab-slots";
import { animationDemoRegistry } from "../demos";

export interface FeatureItem {
  id: string;
  tag: string;
  title: string;
  desc: string;
  metric: string;
}

export interface MetricItem {
  label: string;
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

/* ============================================================================
   Slot Inspector Wrapper
   ============================================================================ */
export function SlotInspectorWrap({
  slot,
  activeIds,
  inspectSlots,
  children,
  className,
  style,
}: {
  slot: SlotId;
  activeIds: string[];
  inspectSlots: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  if (!inspectSlots || activeIds.length === 0) {
    return className || style ? (
      <div className={className} style={style}>
        {children}
      </div>
    ) : (
      <>{children}</>
    );
  }

  return (
    <div
      className={`slot-inspector-box ${className ?? ""}`}
      data-slot={slot}
      style={style}
    >
      <span className="slot-inspector-tag" aria-hidden="true">
        SLOT: {SLOT_INSPECTOR_NAME[slot]} · {activeIds.join(" + ")}
      </span>
      {children}
    </div>
  );
}

/* ============================================================================
   1. Navbar Slot (`nav`)
   ============================================================================ */
export function DummyNavSlot({
  navIds,
  links,
  theme,
  inspectSlots,
}: {
  navIds: string[];
  links: Array<{ id: string; label: string }>;
  theme: ResolvedStyleTheme;
  inspectSlots: boolean;
}) {
  const [activeLink, setActiveLink] = useState(links[0]?.id ?? "overview");
  const hasSpotlight = navIds.includes("spotlight-tabs");
  const hasGooey = navIds.includes("gooey-pill-nav");
  const hasStatus = navIds.includes("kinetic-status-pill");

  const navContent = hasSpotlight ? (
    <SpotlightTabs
      tabs={links.map((l) => ({ id: l.id, label: l.label }))}
      defaultTabId={links[0]?.id}
      accentBg={theme.accent}
      accentBorder={theme.accent}
      activeColor={theme.accentInk}
      inactiveColor={theme.surfaceMuted}
      trackBg={theme.elevated}
      trackBorder={theme.border}
      onChange={setActiveLink}
    />
  ) : hasGooey ? (
    <GooeyPillNav items={links.slice(0, 4)} />
  ) : (
    <div className="dummy-nav-links">
      {links.map((link) => (
        <button
          key={link.id}
          type="button"
          className="dummy-nav-link"
          data-active={activeLink === link.id}
          onClick={() => setActiveLink(link.id)}
          style={{
            color: activeLink === link.id ? theme.accent : theme.surfaceMuted,
            fontFamily: theme.fontMono,
          }}
        >
          {link.label}
        </button>
      ))}
    </div>
  );

  const inlineNavIds = navIds.filter((id) => id !== "dock-magnify");

  return (
    <SlotInspectorWrap
      slot="nav"
      activeIds={inlineNavIds}
      inspectSlots={inspectSlots}
      style={{ display: "inline-flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}
    >
      {navContent}
      {hasStatus && <KineticStatusPill />}
    </SlotInspectorWrap>
  );
}

export function DummyFloatingDock({
  active,
  inspectSlots,
}: {
  active: boolean;
  inspectSlots: boolean;
}) {
  if (!active) return null;
  return (
    <div className="dummy-floating-dock-wrap">
      <SlotInspectorWrap
        slot="nav"
        activeIds={["dock-magnify"]}
        inspectSlots={inspectSlots}
      >
        <DockMagnify
          items={[
            { id: "explore", label: "Explore", icon: <Compass size={16} /> },
            { id: "systems", label: "Systems", icon: <Layers size={16} /> },
            { id: "motion", label: "Motion", icon: <Sparkles size={16} /> },
            { id: "compute", label: "Compute", icon: <Cpu size={16} /> },
            { id: "cli", label: "CLI", icon: <Terminal size={16} /> },
          ]}
        />
      </SlotInspectorWrap>
    </div>
  );
}

/* ============================================================================
   2. Hero Title & Secondary Text Slot (`hero-title`)
   ============================================================================ */
export function renderKineticText(
  animId: string | null,
  text: string,
  theme: ResolvedStyleTheme,
  epoch: number
): ReactNode {
  if (!animId) return text;
  switch (animId) {
    case "scramble-text":
      return (
        <ScrambleText
          key={`scr-${epoch}-${text}`}
          text={text}
          trigger="mount"
          durationMs={460}
        />
      );
    case "split-reveal":
      return (
        <SplitReveal
          key={`spl-${epoch}-${text}`}
          text={text}
          mode="words"
          staggerMs={55}
          durationMs={440}
        />
      );
    case "variable-proximity":
      return (
        <VariableProximity
          key={`vp-${epoch}`}
          text={text}
          minWeight={300}
          maxWeight={900}
          radius={140}
        />
      );
    case "shiny-text":
      return (
        <ShinyText
          key={`sh-${epoch}`}
          text={text}
          baseColor={theme.ink}
          shineColor={theme.accent}
          speedSec={3}
        />
      );
    case "blur-text":
      return (
        <BlurText
          key={`bt-${epoch}-${text}`}
          text={text}
          staggerMs={48}
          durationMs={420}
        />
      );
    case "text-roll":
      return <TextRoll key={`tr-${epoch}-${text}`} text={text} />;
    case "split-flap-clock":
      return <SplitFlapClock key={`sfc-${epoch}`} />;
    default:
      return text;
  }
}

/* ============================================================================
   3. Hero CTA Slot (`hero-cta`)
   ============================================================================ */
export function DummyHeroCta({
  ctaIds,
  primaryLabel,
  secondaryLabel,
  theme,
  inspectSlots,
  onAction,
}: {
  ctaIds: string[];
  primaryLabel: string;
  secondaryLabel: string;
  theme: ResolvedStyleTheme;
  inspectSlots: boolean;
  onAction: () => void;
}) {
  const hasMagnetic = ctaIds.includes("magnetic-button");
  const hasTactilePush = ctaIds.includes("tactile-push-button");
  const hasCopySpell = ctaIds.includes("magnetic-copy-spell");
  const hasHoldConfirm = ctaIds.includes("hold-to-confirm");
  const hasPressBadge = ctaIds.includes("tactile-press-badge");
  const hasClickSpark = ctaIds.includes("click-spark");

  const primaryBtnStyle: CSSProperties = {
    appearance: "none",
    cursor: "pointer",
    padding: "10px 18px",
    borderRadius: theme.radius,
    border: `${theme.borderWidth} solid ${theme.borderStrong}`,
    background: theme.accent,
    color: theme.accentInk,
    boxShadow:
      theme.profile === "brutalist" ? "4px 4px 0 #000000" : undefined,
    fontFamily: theme.fontMono,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.04em",
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
  };

  const secondaryBtnStyle: CSSProperties = {
    appearance: "none",
    cursor: "pointer",
    padding: "10px 16px",
    borderRadius: theme.radius,
    border: `${theme.borderWidth} solid ${theme.borderStrong}`,
    background: theme.surface,
    color: theme.surfaceInk,
    fontFamily: theme.fontMono,
    fontSize: 12,
    fontWeight: 500,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  };

  let primaryControl: ReactNode;
  if (hasTactilePush) {
    primaryControl = (
      <TactilePushButton
        label={primaryLabel}
        faceColor={theme.accent}
        lipColor={theme.borderStrong}
        inkColor={theme.accentInk}
        onClick={onAction}
      />
    );
  } else if (hasMagnetic) {
    primaryControl = (
      <MagneticButton strength={0.34} style={primaryBtnStyle} onClick={onAction}>
        <span>{primaryLabel}</span>
        <ArrowRight size={13} />
      </MagneticButton>
    );
  } else if (hasHoldConfirm) {
    primaryControl = (
      <HoldToConfirm
        label={`Hold to ${primaryLabel}`}
        confirmedLabel="Deployed ✓"
        accentColor={theme.accent}
        onConfirm={onAction}
      />
    );
  } else {
    primaryControl = (
      <button type="button" style={primaryBtnStyle} onClick={onAction}>
        <span>{primaryLabel}</span>
        <ArrowRight size={13} />
      </button>
    );
  }

  const row = (
    <div className="dummy-cta-row">
      {primaryControl}
      {hasMagnetic && hasTactilePush && (
        <MagneticButton strength={0.34} style={secondaryBtnStyle} onClick={onAction}>
          <span>{secondaryLabel}</span>
        </MagneticButton>
      )}
      {hasCopySpell ? (
        <MagneticCopySpell />
      ) : (
        !hasHoldConfirm && (
          <button type="button" style={secondaryBtnStyle} onClick={onAction}>
            <span>{secondaryLabel}</span>
          </button>
        )
      )}
      {hasHoldConfirm && (hasMagnetic || hasTactilePush) && (
        <HoldToConfirm
          label="Hold to Deploy"
          confirmedLabel="Live ✓"
          accentColor={theme.accent}
          onConfirm={onAction}
        />
      )}
      {hasPressBadge && (
        <TactilePressBadge
          label="Endorse"
          initialCount={142}
          accentColor={theme.accent}
        />
      )}
    </div>
  );

  const wrapped = hasClickSpark ? (
    <ClickSpark sparkColor={theme.accent} sparkCount={10} style={{ display: "inline-block" }}>
      {row}
    </ClickSpark>
  ) : (
    row
  );

  return (
    <SlotInspectorWrap slot="hero-cta" activeIds={ctaIds} inspectSlots={inspectSlots}>
      {wrapped}
    </SlotInspectorWrap>
  );
}

/* ============================================================================
   4. Live Metrics Telemetry Bar (`metrics`)
   ============================================================================ */
export function DummyMetricsBar({
  metricIds,
  items,
  theme,
  epoch,
  inspectSlots,
}: {
  metricIds: string[];
  items: MetricItem[];
  theme: ResolvedStyleTheme;
  epoch: number;
  inspectSlots: boolean;
}) {
  const [pulseCount, setPulseCount] = useState(0);
  const hasCountUp = metricIds.includes("count-up");
  const hasOdometer = metricIds.includes("odometer-ticker");
  const hasSpringFlow = metricIds.includes("spring-number-flow");

  const delta = pulseCount * 17;

  return (
    <SlotInspectorWrap slot="metrics" activeIds={metricIds} inspectSlots={inspectSlots}>
      <div
        className="dummy-metrics-bar"
        style={{
          background: theme.profile === "swiss" ? "transparent" : theme.surface,
          borderTop: `${theme.borderWidth} solid ${theme.border}`,
          borderBottom: `${theme.borderWidth} solid ${theme.border}`,
          borderLeft: theme.profile === "swiss" ? "none" : `${theme.borderWidth} solid ${theme.border}`,
          borderRight: theme.profile === "swiss" ? "none" : `${theme.borderWidth} solid ${theme.border}`,
          borderRadius: theme.radius,
          boxShadow: theme.profile === "swiss" ? "none" : theme.shadow,
        }}
      >
        <div className="dummy-metrics-grid">
          {items.map((m, idx) => {
            const liveVal =
              m.decimals && m.decimals > 0
                ? Number((m.value + (pulseCount % 3) * 0.01).toFixed(m.decimals))
                : m.value + (idx === 2 ? delta : pulseCount * 3);

            return (
              <div
                key={m.label}
                className="dummy-metric-cell"
                style={{
                  borderColor: theme.border,
                }}
              >
                <span
                  style={{
                    fontFamily: theme.fontMono,
                    fontSize: 10,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: theme.surfaceMuted,
                  }}
                >
                  {m.label}
                </span>
                <div
                  style={{
                    fontFamily: theme.fontHeading,
                    fontSize: 22,
                    fontWeight: 700,
                    fontVariantNumeric: "tabular-nums",
                    color: idx === 0 ? theme.accent : theme.surfaceInk,
                    marginTop: 2,
                  }}
                >
                  {hasOdometer && idx === 2 ? (
                    <OdometerTicker value={Math.round(liveVal)} padLength={4} />
                  ) : hasCountUp ? (
                    <CountUp
                      key={`cu-${epoch}-${pulseCount}-${idx}`}
                      from={0}
                      to={liveVal}
                      decimals={m.decimals ?? 0}
                      prefix={m.prefix ?? ""}
                      suffix={m.suffix ?? ""}
                    />
                  ) : (
                    `${m.prefix ?? ""}${liveVal.toLocaleString()}${m.suffix ?? ""}`
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="dummy-metrics-actions">
          {hasSpringFlow && (
            <div style={{ transform: "scale(0.88)", transformOrigin: "right center" }}>
              <SpringNumberFlow />
            </div>
          )}
          <button
            type="button"
            onClick={() => setPulseCount((c) => c + 1)}
            style={{
              appearance: "none",
              cursor: "pointer",
              padding: "5px 10px",
              borderRadius: theme.radius,
              border: `1px solid ${theme.borderStrong}`,
              background: theme.canvas,
              color: theme.ink,
              fontFamily: theme.fontMono,
              fontSize: 10,
              whiteSpace: "nowrap",
            }}
          >
            Simulate Traffic
          </button>
        </div>
      </div>
    </SlotInspectorWrap>
  );
}

/* ============================================================================
   5. Feature Cards Grid (`feature-cards`) — Deterministic Nesting Order
   Outer: BlurFade -> FlipCard -> SpringTiltCard -> HolographicFoilCard
   Inner: LiquidGlassSurface -> BorderSpotlight / BorderBeam / StarBorder / GlareHover / PixelCard / CrosshairReticle / SvgTurbulenceHover
   ============================================================================ */
export function DummyFeatureGrid({
  cardIds,
  features,
  theme,
  epoch,
  inspectSlots,
}: {
  cardIds: string[];
  features: FeatureItem[];
  theme: ResolvedStyleTheme;
  epoch: number;
  inspectSlots: boolean;
}) {
  const [flipMode, setFlipMode] = useState<"grid" | "list">("grid");
  const hasSiblingDim = cardIds.includes("sibling-dim");
  const hasFlip = cardIds.includes("flip-card");
  const hasMakeWay = cardIds.includes("make-way-grid");

  if (hasMakeWay) {
    return (
      <SlotInspectorWrap slot="feature-cards" activeIds={cardIds} inspectSlots={inspectSlots}>
        <MakeWayGrid
          items={features.map((f) => ({
            id: f.id,
            title: `${f.tag} · ${f.title}`,
            detail: f.desc,
          }))}
        />
      </SlotInspectorWrap>
    );
  }

  const wrapFeatureCard = (cardInner: ReactNode, feat: FeatureItem, idx: number): ReactNode => {
    let node: ReactNode = cardInner;

    // INNER LAYER: clipped surface & border shaders
    if (cardIds.includes("svg-turbulence-hover")) {
      node = (
        <SvgTurbulenceHover key={`turb-${epoch}`} maxScale={16}>
          {node}
        </SvgTurbulenceHover>
      );
    }
    if (cardIds.includes("crosshair-reticle")) {
      node = (
        <CrosshairReticle color={theme.accent} style={{ height: "100%" }}>
          {node}
        </CrosshairReticle>
      );
    }
    if (cardIds.includes("pixel-card")) {
      node = (
        <PixelCard
          key={`px-${epoch}`}
          colors={[theme.accent, theme.accentAlt, theme.surfaceMuted]}
          style={{ height: "100%" }}
        >
          {node}
        </PixelCard>
      );
    }
    if (cardIds.includes("glare-hover")) {
      node = (
        <GlareHover
          key={`gl-${epoch}`}
          width="100%"
          height="100%"
          background={theme.surface}
          borderColor={theme.border}
          borderRadius={theme.radius}
          glareColor={theme.accent}
          glareOpacity={0.4}
          rimGlint
        >
          {node}
        </GlareHover>
      );
    }
    if (cardIds.includes("star-border")) {
      node = (
        <StarBorder color={theme.accent} speedSec={4.5} style={{ height: "100%" }}>
          {node}
        </StarBorder>
      );
    }
    if (cardIds.includes("border-beam")) {
      node = (
        <BorderBeam
          colorFrom={theme.accent}
          colorTo={theme.accentAlt}
          durationSec={4.5}
          style={{ height: "100%" }}
        >
          {node}
        </BorderBeam>
      );
    }
    if (cardIds.includes("border-spotlight")) {
      node = (
        <BorderSpotlight
          spotlightColor={theme.accent}
          radius={190}
          style={{
            height: "100%",
            borderRadius: theme.radius,
          }}
        >
          {node}
        </BorderSpotlight>
      );
    }
    if (cardIds.includes("liquid-glass-filter")) {
      node = (
        <LiquidGlassSurface
          blurPx={14}
          displacementScale={10}
          style={{ height: "100%", borderRadius: theme.radius }}
        >
          {node}
        </LiquidGlassSurface>
      );
    }

    // OUTER LAYER: 3D perspective & layout morph wrappers (never clipped by inner overflow:hidden)
    if (cardIds.includes("holographic-foil-card")) {
      node = (
        <HolographicFoilCard style={{ height: "100%", padding: 0 }}>
          {node}
        </HolographicFoilCard>
      );
    }
    if (cardIds.includes("spring-tilt-card")) {
      node = (
        <SpringTiltCard
          key={`tilt-${epoch}`}
          maxTiltDeg={9}
          perspectivePx={760}
          style={{ height: "100%" }}
        >
          {node}
        </SpringTiltCard>
      );
    }
    if (hasFlip) {
      node = (
        <FlipCard
          key={`flip-${feat.id}`}
          layoutKey={flipMode}
          durationMs={260}
          style={{ height: "100%" }}
        >
          {node}
        </FlipCard>
      );
    }
    if (cardIds.includes("blur-fade")) {
      node = (
        <BlurFade
          key={`bf-${epoch}-${idx}`}
          delayMs={idx * 90}
          durationMs={420}
          style={{ height: "100%" }}
        >
          {node}
        </BlurFade>
      );
    }

    return (
      <div
        key={feat.id}
        className={`dummy-feature-slot ${
          theme.profile === "modern-bento" && idx === 0 ? "dummy-bento-lead" : ""
        }`}
      >
        {node}
      </div>
    );
  };

  return (
    <SlotInspectorWrap slot="feature-cards" activeIds={cardIds} inspectSlots={inspectSlots}>
      {hasFlip && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
          <button
            type="button"
            onClick={() => setFlipMode((m) => (m === "grid" ? "list" : "grid"))}
            style={{
              appearance: "none",
              cursor: "pointer",
              padding: "4px 9px",
              borderRadius: theme.radius,
              border: `1px solid ${theme.borderStrong}`,
              background: theme.surface,
              color: theme.surfaceInk,
              fontFamily: theme.fontMono,
              fontSize: 10,
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            {flipMode === "grid" ? <List size={11} /> : <LayoutGrid size={11} />}
            <span>FLIP Layout: {flipMode === "grid" ? "Rows" : "Grid"}</span>
          </button>
        </div>
      )}

      <div
        className={`dummy-features-grid ${hasSiblingDim ? "sibling-dim-group" : ""}`}
        data-flip-mode={flipMode}
        data-profile={theme.profile}
      >
        {features.map((feat, idx) => {
          const baseCard = (
            <article
              className="dummy-feature-card"
              data-profile={theme.profile}
              style={{
                height: "100%",
                background:
                  theme.profile === "swiss"
                    ? "transparent"
                    : theme.surface,
                color: theme.surfaceInk,
                border:
                  theme.profile === "swiss"
                    ? "none"
                    : `${theme.borderWidth} solid ${theme.border}`,
                borderRadius: theme.radius,
                boxShadow: theme.profile === "swiss" ? "none" : theme.shadow,
                backdropFilter: theme.blur ? `blur(${theme.blur})` : undefined,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: theme.fontMono,
                    fontSize: 10,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: theme.accent,
                    fontWeight: 600,
                  }}
                >
                  {feat.tag}
                </span>
                <span
                  style={{
                    fontFamily: theme.fontMono,
                    fontSize: 10,
                    color: theme.surfaceMuted,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {feat.metric}
                </span>
              </div>

              <h3
                style={{
                  margin: "0 0 6px",
                  fontFamily: theme.fontHeading,
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: theme.profile === "swiss" ? "-0.03em" : "-0.015em",
                  color: theme.surfaceInk,
                }}
              >
                {feat.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: 12.5,
                  lineHeight: 1.5,
                  color: theme.surfaceMuted,
                }}
              >
                {feat.desc}
              </p>
            </article>
          );

          return wrapFeatureCard(baseCard, feat, idx);
        })}
      </div>
    </SlotInspectorWrap>
  );
}

/* ============================================================================
   6. Scroll-FX Hooks & Wrappers (Strictly Bound to browserScrollRef.scrollTop)
   ============================================================================ */
export function DummyScrollProgress({
  scrollFxIds,
  scrollRef,
  theme,
}: {
  scrollFxIds: string[];
  scrollRef: RefObject<HTMLDivElement | null>;
  theme: ResolvedStyleTheme;
}) {
  if (!scrollFxIds.includes("scroll-progress-bar")) return null;
  return (
    <div style={{ position: "sticky", top: 48, zIndex: 18 }}>
      <ScrollProgressBar
        containerRef={scrollRef}
        color={theme.accent}
        height={3}
      />
    </div>
  );
}

export function DummyScrollFxSection({
  scrollFxIds,
  scrollRef,
  theme,
  reducedMotion,
  inspectSlots,
  children,
}: {
  scrollFxIds: string[];
  scrollRef: RefObject<HTMLDivElement | null>;
  theme: ResolvedStyleTheme;
  reducedMotion: boolean;
  inspectSlots: boolean;
  children: ReactNode;
}) {
  const hasVelocitySkew = scrollFxIds.includes("velocity-skew");
  const hasTracingBeam = scrollFxIds.includes("tracing-scroll-beam");
  const hasStickyScale = scrollFxIds.includes("scroll-sticky-scale");
  const hasProgressiveBlur = scrollFxIds.includes("progressive-blur-edge");

  const skewElRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0.15);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    if (reducedMotion) {
      setScrollProgress(1);
      if (skewElRef.current) skewElRef.current.style.transform = "none";
      return;
    }

    let lastTop = scroller.scrollTop;
    let currentSkew = 0;
    let targetSkew = 0;
    let rafId = 0;

    const onScroll = () => {
      const top = scroller.scrollTop;
      const max = Math.max(1, scroller.scrollHeight - scroller.clientHeight);
      if (hasTracingBeam || hasStickyScale) {
        setScrollProgress(Math.max(0.05, Math.min(1, top / max)));
      }
      if (hasVelocitySkew) {
        const delta = top - lastTop;
        lastTop = top;
        targetSkew = Math.max(-5, Math.min(5, delta * 0.08));
      }
    };

    const tick = () => {
      if (hasVelocitySkew && skewElRef.current) {
        currentSkew += (targetSkew - currentSkew) * 0.14;
        targetSkew *= 0.84;
        if (Math.abs(currentSkew) < 0.01) currentSkew = 0;
        skewElRef.current.style.transform =
          currentSkew === 0 ? "none" : `skewY(${currentSkew.toFixed(3)}deg)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    onScroll();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    if (hasVelocitySkew) {
      rafId = requestAnimationFrame(tick);
    }
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [scrollRef, hasVelocitySkew, hasTracingBeam, hasStickyScale, reducedMotion]);

  const stickyScale =
    hasStickyScale && !reducedMotion
      ? 0.94 + scrollProgress * 0.06
      : 1;

  let content: ReactNode = (
    <div
      ref={skewElRef}
      style={{
        position: "relative",
        paddingLeft: hasTracingBeam ? 22 : undefined,
        transform: hasStickyScale && !hasVelocitySkew ? `scale(${stickyScale.toFixed(3)})` : undefined,
        transformOrigin: "top center",
        willChange: hasVelocitySkew || hasStickyScale ? "transform" : undefined,
      }}
    >
      {hasTracingBeam && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 6,
            top: 4,
            bottom: 4,
            width: 3,
            borderRadius: 2,
            background: theme.border,
          }}
        >
          <div
            style={{
              width: "100%",
              height: `${(scrollProgress * 100).toFixed(1)}%`,
              background: `linear-gradient(180deg, ${theme.accent} 0%, ${theme.accentAlt} 100%)`,
              borderRadius: 2,
              transition: reducedMotion ? "none" : "height 80ms linear",
            }}
          />
        </div>
      )}
      {children}
    </div>
  );

  if (hasProgressiveBlur) {
    content = (
      <ProgressiveBlurEdge edgeHeight={40} maxBlurPx={8}>
        {content}
      </ProgressiveBlurEdge>
    );
  }

  return (
    <SlotInspectorWrap
      slot="scroll-fx"
      activeIds={scrollFxIds.filter((id) => id !== "elastic-column-scroll")}
      inspectSlots={inspectSlots}
    >
      {content}
    </SlotInspectorWrap>
  );
}

/* ============================================================================
   7. Marquee Band (`marquee-band`)
   ============================================================================ */
export function DummyMarqueeBand({
  marqueeIds,
  items,
  theme,
  inspectSlots,
}: {
  marqueeIds: string[];
  items: string[];
  theme: ResolvedStyleTheme;
  inspectSlots: boolean;
}) {
  if (marqueeIds.length === 0) return null;
  const hasInfinite = marqueeIds.includes("infinite-marquee");
  const hasHoverRow = marqueeIds.includes("marquee-hover-row");

  return (
    <SlotInspectorWrap
      slot="marquee-band"
      activeIds={marqueeIds}
      inspectSlots={inspectSlots}
      style={{ display: "flex", flexDirection: "column", gap: 10 }}
    >
      {hasInfinite && (
        <div
          style={{
            borderTop: `1px solid ${theme.border}`,
            borderBottom: `1px solid ${theme.border}`,
            padding: "8px 0",
          }}
        >
          <InfiniteMarquee items={items} durationSec={14} pauseOnHover />
        </div>
      )}
      {hasHoverRow && (
        <div
          style={{
            border: `${theme.borderWidth} solid ${theme.border}`,
            borderRadius: theme.radius,
            overflow: "hidden",
            background: theme.surface,
          }}
        >
          {items.slice(0, 3).map((label, idx) => (
            <MarqueeHoverRow
              key={label}
              index={`0${idx + 1}`}
              label={label}
              accentBg={theme.accent}
              accentInk={theme.accentInk}
              durationSec={6 + idx * 0.6}
              style={idx === 2 ? { borderBottom: "none" } : undefined}
            />
          ))}
        </div>
      )}
    </SlotInspectorWrap>
  );
}

/* ============================================================================
   8. Interactive Workspace / Product Preview (`interactive-stage`)
   ============================================================================ */
export function renderWorkspaceWidget(
  animId: string,
  theme: ResolvedStyleTheme,
  epoch: number
): ReactNode {
  switch (animId) {
    case "streaming-token-text":
      return <StreamingTokenText key={`stt-${epoch}`} />;
    case "reasoning-trace":
      return <ReasoningTrace key={`rt-${epoch}`} />;
    case "tool-call-step":
      return <ToolCallStep key={`tcs-${epoch}`} />;
    case "agent-approval-card":
      return <AgentApprovalCard key={`aac-${epoch}`} />;
    case "inline-code-diff":
      return <InlineCodeDiff key={`icd-${epoch}`} />;
    case "slash-prompt-composer":
      return <SlashPromptComposer key={`spc-${epoch}`} />;
    case "chain-of-thought-rail":
      return <ChainOfThoughtRail key={`cot-${epoch}`} />;
    case "animated-connector-beam":
      return (
        <AnimatedConnectorBeam
          key={`acb-${epoch}`}
          fromLabel="CLIENT"
          toLabel="AETHER"
          beamColor={theme.accent}
        />
      );
    case "stacked-card-deck":
      return <StackedCardDeck key={`scd-${epoch}`} />;
    case "accordion-gallery":
      return <AccordionGallery key={`ag-${epoch}`} />;
    case "perspective-book":
      return (
        <PerspectiveBook
          key={`pb-${epoch}`}
          title="FORMA SYSTEMS"
          subtitle="Issue 09 · Spatial Craft"
          coverColor={theme.accent}
        />
      );
    case "rotary-type-dial":
      return <RotaryTypeDial key={`rtd-${epoch}`} label="TYPE AXIS" />;
    case "elastic-slider":
      return <ElasticSlider key={`es-${epoch}`} defaultValue={64} accentColor={theme.accent} />;
    case "kinetic-card-trail":
      return <KineticCardTrail key={`kct-${epoch}`} style={{ width: "100%" }} />;
    case "elastic-column-scroll":
      return <ElasticColumnScroll key={`ecs-${epoch}`} />;
    default: {
      const FallbackDemo = animationDemoRegistry[animId];
      return FallbackDemo ? <FallbackDemo key={`fb-${epoch}`} motionEpoch={epoch} /> : null;
    }
  }
}

/* ============================================================================
   9. Scoped Overlays (`overlay`) — Trapped inside .dummy-browser-shell
   ============================================================================ */
export function DummyOverlayTriggers({
  overlayIds,
  drawerOpen,
  toastOpen,
  onToggleDrawer,
  onToggleToast,
  theme,
}: {
  overlayIds: string[];
  drawerOpen: boolean;
  toastOpen: boolean;
  onToggleDrawer: () => void;
  onToggleToast: () => void;
  theme: ResolvedStyleTheme;
}) {
  if (overlayIds.length === 0) return null;
  const btnStyle = (active: boolean): CSSProperties => ({
    appearance: "none",
    cursor: "pointer",
    padding: "4px 9px",
    borderRadius: theme.radius,
    border: `1px solid ${active ? theme.accent : theme.borderStrong}`,
    background: active ? theme.accent : theme.canvas,
    color: active ? theme.accentInk : theme.ink,
    fontFamily: theme.fontMono,
    fontSize: 10,
    fontWeight: 600,
    whiteSpace: "nowrap",
  });

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      {overlayIds.includes("velocity-dismiss-drawer") && (
        <button type="button" style={btnStyle(drawerOpen)} onClick={onToggleDrawer}>
          {drawerOpen ? "Hide Sheet" : "Open Sheet"}
        </button>
      )}
      {overlayIds.includes("stacked-toast-deck") && (
        <button type="button" style={btnStyle(toastOpen)} onClick={onToggleToast}>
          {toastOpen ? "Hide Toasts" : "Notifications"}
        </button>
      )}
    </div>
  );
}

export function DummyOverlayPortal({
  overlayIds,
  drawerOpen,
  toastOpen,
  inspectSlots,
}: {
  overlayIds: string[];
  drawerOpen: boolean;
  toastOpen: boolean;
  inspectSlots: boolean;
}) {
  if (overlayIds.length === 0) return null;
  const hasDrawer = overlayIds.includes("velocity-dismiss-drawer") && drawerOpen;
  const hasToast = overlayIds.includes("stacked-toast-deck") && toastOpen;
  if (!hasDrawer && !hasToast) return null;

  return (
    <>
      {hasDrawer && (
        <div className="dummy-overlay-drawer">
          <SlotInspectorWrap
            slot="overlay"
            activeIds={["velocity-dismiss-drawer"]}
            inspectSlots={inspectSlots}
          >
            <VelocityDismissDrawer />
          </SlotInspectorWrap>
        </div>
      )}
      {hasToast && (
        <div className="dummy-overlay-toast">
          <SlotInspectorWrap
            slot="overlay"
            activeIds={["stacked-toast-deck"]}
            inspectSlots={inspectSlots}
          >
            <StackedToastDeck />
          </SlotInspectorWrap>
        </div>
      )}
    </>
  );
}
