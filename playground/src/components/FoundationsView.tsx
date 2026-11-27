import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  Activity,
  ArrowRight,
  Code2,
  Copy,
  FileText,
  Grid2x2,
  LayoutGrid,
  Monitor,
  Moon,
  RefreshCw,
  Smartphone,
  Sun,
  Terminal,
  Type,
  X,
} from "lucide-react";
import {
  TIER_LIST,
  formatNodeLabel,
  getShadcnAddCommand,
  layoutCssById,
  layoutMdById,
  layoutNodes,
  layoutTsxById,
  telemetryNodes,
  telemetryRawById,
  textureNodes,
  textureRawById,
  typographyCssById,
  typographyNodes,
  typographyRawById,
  type LayoutNode,
  type TelemetryNode,
  type TextureNode,
  type TierId,
  type TypographyNode,
} from "../lib/vault-data";
import { loadGoogleFonts } from "../lib/font-loader";
import { parseStyleMarkdown } from "../lib/markdown";
import {
  renderLayoutMiniPreview,
  renderTelemetryWidget,
} from "../lib/foundations-registry";
import { LazyStage } from "./LazyStage";

export type FoundationsSubView = "textures" | "typography" | "layouts" | "telemetry";

interface FoundationsViewProps {
  subView: FoundationsSubView;
  onSubViewChange: (sub: FoundationsSubView) => void;
  searchQuery: string;
  reducedMotion: boolean;
  onCopy: (text: string, label: string) => void;
  onJumpToNode: (nodeId: string) => void;
  onOpenNodeInLab: (nodeId: string) => void;
}

function scaleCssSize(baseSize: string, multiplier: number): string {
  const match = baseSize.trim().match(/^([0-9.]+)(px|%|rem|em)$/);
  if (!match) return baseSize;
  const val = parseFloat(match[1]);
  const unit = match[2];
  if (unit === "%") return `${Math.round(val * multiplier)}%`;
  return `${Math.max(1, Number((val * multiplier).toFixed(1)))}${unit}`;
}

export function FoundationsView({
  subView,
  onSubViewChange,
  searchQuery,
  reducedMotion,
  onCopy,
  onJumpToNode,
  onOpenNodeInLab,
}: FoundationsViewProps) {
  const [tierFilter, setTierFilter] = useState<TierId | "all">("all");

  // Textures controls
  const [groundMode, setGroundMode] = useState<"dark" | "light">("dark");
  const [opacityOverride, setOpacityOverride] = useState<number | null>(null);
  const [scaleMultiplier, setScaleMultiplier] = useState<number>(1);
  const [activeTextureDrawer, setActiveTextureDrawer] = useState<TextureNode | null>(null);

  // Typography controls
  const [specimenText, setSpecimenText] = useState(
    "Precision craft meets expressive hierarchy."
  );
  const [tickCounter, setTickCounter] = useState(1428);
  const [activeTypeDrawer, setActiveTypeDrawer] = useState<TypographyNode | null>(null);
  const [typeDrawerTab, setTypeDrawerTab] = useState<"spec" | "css">("spec");
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Layouts controls
  const [layoutPreviewMode, setLayoutPreviewMode] = useState<"desktop" | "compact">("desktop");
  const [activeLayoutDrawer, setActiveLayoutDrawer] = useState<LayoutNode | null>(null);
  const [layoutDrawerTab, setLayoutDrawerTab] = useState<"spec" | "tsx" | "css">("spec");

  // Telemetry controls
  const [telemetryGround, setTelemetryGround] = useState<"dark" | "light">("dark");
  const [simSeed, setSimSeed] = useState(0);
  const [activeTelemetryDrawer, setActiveTelemetryDrawer] = useState<TelemetryNode | null>(null);

  const anyDrawerOpen = Boolean(
    activeTextureDrawer || activeTypeDrawer || activeLayoutDrawer || activeTelemetryDrawer
  );

  useEffect(() => {
    if (!anyDrawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveTextureDrawer(null);
        setActiveTypeDrawer(null);
        setActiveLayoutDrawer(null);
        setActiveTelemetryDrawer(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [anyDrawerOpen]);

  useEffect(() => {
    if (subView !== "typography" || reducedMotion) return;
    const id = window.setInterval(() => {
      setTickCounter((n) => (n >= 9999 ? 1024 : n + 7));
    }, 900);
    return () => window.clearInterval(id);
  }, [subView, reducedMotion]);

  useEffect(() => {
    if (subView !== "typography") return;
    if (typeof IntersectionObserver === "undefined") {
      typographyNodes.forEach((t) => loadGoogleFonts(t.googleFontsUrl));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const url = (entry.target as HTMLElement).dataset.fontUrl;
            if (url) loadGoogleFonts(url);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "240px" }
    );

    cardRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [subView, tierFilter, searchQuery]);

  const filteredTextures = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return textureNodes.filter((tex) => {
      if (tierFilter !== "all" && tex.tier !== tierFilter) return false;
      if (!q) return true;
      return [tex.id, tex.name, tex.tier, tex.layer, tex.mechanism, ...tex.pairsWith]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [searchQuery, tierFilter]);

  const filteredTypography = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return typographyNodes.filter((typo) => {
      if (tierFilter !== "all" && typo.tier !== tierFilter) return false;
      if (!q) return true;
      return [typo.id, typo.name, typo.tier, typo.voice, ...typo.fonts, ...typo.pairsWith]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [searchQuery, tierFilter]);

  const filteredLayouts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return layoutNodes.filter((lay) => {
      if (tierFilter !== "all" && lay.tier !== tierFilter) return false;
      if (!q) return true;
      return [lay.id, lay.name, lay.tier, lay.pattern, ...lay.slots, ...lay.pairsWith]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [searchQuery, tierFilter]);

  const filteredTelemetry = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return telemetryNodes.filter((tel) => {
      if (tierFilter !== "all" && tel.tier !== tierFilter) return false;
      if (!q) return true;
      return [tel.id, tel.name, tel.tier, ...tel.engine, ...tel.pairsWith]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [searchQuery, tierFilter]);

  const activeTypeDoc = useMemo(() => {
    if (!activeTypeDrawer) return null;
    return parseStyleMarkdown(typographyRawById[activeTypeDrawer.id] ?? "");
  }, [activeTypeDrawer]);

  const activeLayoutDoc = useMemo(() => {
    if (!activeLayoutDrawer) return null;
    return parseStyleMarkdown(layoutMdById[activeLayoutDrawer.id] ?? "");
  }, [activeLayoutDrawer]);

  const isLightGround = groundMode === "light";
  const stageBg = isLightGround ? "#f5f4ef" : "#0f1115";
  const stageInk = isLightGround ? "#14171f" : "#e8ecf2";
  const stageMuted = isLightGround ? "#555c68" : "#8b94a3";
  const stageBorder = isLightGround ? "rgba(17, 19, 24, 0.12)" : "rgba(255, 255, 255, 0.1)";

  const isTelLight = telemetryGround === "light";
  const telStageVars = {
    backgroundColor: isTelLight ? "#f5f4ef" : "#0f1115",
    color: isTelLight ? "#14171f" : "#e8ecf2",
    borderColor: isTelLight ? "rgba(17, 19, 24, 0.14)" : "rgba(255, 255, 255, 0.08)",
    "--tel-surface": isTelLight ? "#ffffff" : "#15181e",
    "--tel-ink": isTelLight ? "#14171f" : "#e8ecf2",
    "--tel-muted": isTelLight ? "#4b5563" : "#8b94a3",
    "--tel-border": isTelLight ? "rgba(17, 19, 24, 0.16)" : "rgba(255, 255, 255, 0.12)",
    "--tel-accent": isTelLight ? "#0369a1" : "#38bdf8",
    "--tel-ok": isTelLight ? "#047857" : "#34d399",
    "--tel-warn": isTelLight ? "#b45309" : "#f59e0b",
    "--tel-danger": isTelLight ? "#be123c" : "#f43f5e",
  } as CSSProperties;

  const totalFoundations =
    textureNodes.length +
    typographyNodes.length +
    layoutNodes.length +
    telemetryNodes.length;

  return (
    <section aria-label="Foundations Gallery">
      {/* Header Bar + 4-Category Sub-View Switcher */}
      <div className="section-bar">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <h1 className="section-title">Foundations</h1>
            <div className="rel-subview-tabs" role="tablist" aria-label="Foundations category">
              <button
                type="button"
                role="tab"
                aria-selected={subView === "textures"}
                className="pill-btn"
                data-active={subView === "textures"}
                onClick={() => onSubViewChange("textures")}
              >
                <Grid2x2 size={11} style={{ marginRight: 5, verticalAlign: "-1px" }} />
                Textures ({textureNodes.length})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={subView === "typography"}
                className="pill-btn"
                data-active={subView === "typography"}
                onClick={() => onSubViewChange("typography")}
              >
                <Type size={11} style={{ marginRight: 5, verticalAlign: "-1px" }} />
                Typography ({typographyNodes.length})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={subView === "layouts"}
                className="pill-btn"
                data-active={subView === "layouts"}
                onClick={() => onSubViewChange("layouts")}
              >
                <LayoutGrid size={11} style={{ marginRight: 5, verticalAlign: "-1px" }} />
                Layouts ({layoutNodes.length})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={subView === "telemetry"}
                className="pill-btn"
                data-active={subView === "telemetry"}
                onClick={() => onSubViewChange("telemetry")}
              >
                <Activity size={11} style={{ marginRight: 5, verticalAlign: "-1px" }} />
                Telemetry ({telemetryNodes.length})
              </button>
            </div>
          </div>
          <p className="section-subtitle">
            {subView === "textures" &&
              `${textureNodes.length} zero-JS adaptive CSS surface layers parameterized by --tx-color, --tx-opacity, and --tx-size.`}
            {subView === "typography" &&
              `${typographyNodes.length} scoped fluid typography systems with on-demand Google Fonts, clamp() scales, and strict tabular-nums.`}
            {subView === "layouts" &&
              `${layoutNodes.length} container-query (@container) page shells driven by --lay-* tokens with zero hardcoded palettes.`}
            {subView === "telemetry" &&
              `${telemetryNodes.length} zero-library SVG/React telemetry micro-charts with WCAG-safe light & dark --tel-* tokens.`}
          </p>
        </div>
        <span className="badge badge-cyan">{totalFoundations} FOUNDATIONS // 4 CATEGORIES</span>
      </div>

      {/* SUB-VIEW CONTROLS BAR */}
      {subView === "textures" && (
        <div className="filter-row">
          <div className="filter-group">
            <span className="filter-label">Ground</span>
            <button
              type="button"
              className="pill-btn"
              data-active={groundMode === "dark"}
              onClick={() => setGroundMode("dark")}
            >
              <Moon size={11} style={{ marginRight: 4, verticalAlign: "-1px" }} />
              Dark (#0f1115)
            </button>
            <button
              type="button"
              className="pill-btn"
              data-active={groundMode === "light"}
              onClick={() => setGroundMode("light")}
            >
              <Sun size={11} style={{ marginRight: 4, verticalAlign: "-1px" }} />
              Light (#f5f4ef)
            </button>

            <span className="filter-label" style={{ marginLeft: 8 }}>Tier</span>
            <button
              type="button"
              className="pill-btn"
              data-active={tierFilter === "all"}
              onClick={() => setTierFilter("all")}
            >
              all
            </button>
            {TIER_LIST.map((tier) => (
              <button
                key={tier}
                type="button"
                className="pill-btn"
                data-active={tierFilter === tier}
                onClick={() => setTierFilter(tier)}
              >
                {tier}
              </button>
            ))}
          </div>

          <div className="filter-group">
            <label className="fnd-slider-control">
              <span className="filter-label" style={{ marginRight: 0 }}>Opacity</span>
              <input
                type="range"
                min={0.04}
                max={0.45}
                step={0.01}
                value={opacityOverride ?? 0.16}
                onChange={(e) => setOpacityOverride(Number(e.target.value))}
                aria-label="Texture preview opacity"
              />
              <span className="fui-mono-label" style={{ minWidth: 34 }}>
                {opacityOverride !== null ? `${Math.round(opacityOverride * 100)}%` : "AUTO"}
              </span>
            </label>

            <label className="fnd-slider-control">
              <span className="filter-label" style={{ marginRight: 0 }}>Scale</span>
              <input
                type="range"
                min={0.5}
                max={2}
                step={0.1}
                value={scaleMultiplier}
                onChange={(e) => setScaleMultiplier(Number(e.target.value))}
                aria-label="Texture preview scale"
              />
              <span className="fui-mono-label" style={{ minWidth: 30 }}>
                {scaleMultiplier.toFixed(1)}×
              </span>
            </label>

            {(opacityOverride !== null || scaleMultiplier !== 1) && (
              <button
                type="button"
                className="pill-btn"
                onClick={() => {
                  setOpacityOverride(null);
                  setScaleMultiplier(1);
                }}
              >
                Reset
              </button>
            )}
          </div>
        </div>
      )}

      {subView === "typography" && (
        <div className="filter-row fnd-specimen-bar">
          <div className="fnd-specimen-input-wrap">
            <span className="filter-label" style={{ marginRight: 0 }}>Specimen</span>
            <input
              type="text"
              className="fnd-specimen-input"
              value={specimenText}
              onChange={(e) => setSpecimenText(e.target.value)}
              placeholder="Type a custom headline to preview live across all 9 systems..."
              aria-label="Custom typography specimen headline"
            />
          </div>

          <div className="filter-group">
            <div className="fnd-tabular-pill" title="Live tabular-nums alignment preview">
              <span className="fui-mono-label">TABULAR</span>
              <span className="fnd-tabular-val">
                {(tickCounter / 100).toFixed(2)}ms · {tickCounter.toLocaleString()}
              </span>
            </div>

            <span className="filter-label" style={{ marginLeft: 4 }}>Tier</span>
            <button
              type="button"
              className="pill-btn"
              data-active={tierFilter === "all"}
              onClick={() => setTierFilter("all")}
            >
              all
            </button>
            {TIER_LIST.map((tier) => (
              <button
                key={tier}
                type="button"
                className="pill-btn"
                data-active={tierFilter === tier}
                onClick={() => setTierFilter(tier)}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>
      )}

      {subView === "layouts" && (
        <div className="filter-row">
          <div className="filter-group">
            <span className="filter-label">Container Width</span>
            <button
              type="button"
              className="pill-btn"
              data-active={layoutPreviewMode === "desktop"}
              onClick={() => setLayoutPreviewMode("desktop")}
            >
              <Monitor size={11} style={{ marginRight: 4, verticalAlign: "-1px" }} />
              Desktop
            </button>
            <button
              type="button"
              className="pill-btn"
              data-active={layoutPreviewMode === "compact"}
              onClick={() => setLayoutPreviewMode("compact")}
            >
              <Smartphone size={11} style={{ marginRight: 4, verticalAlign: "-1px" }} />
              Compact (380px)
            </button>

            <span className="filter-label" style={{ marginLeft: 8 }}>Tier</span>
            <button
              type="button"
              className="pill-btn"
              data-active={tierFilter === "all"}
              onClick={() => setTierFilter("all")}
            >
              all
            </button>
            {TIER_LIST.map((tier) => (
              <button
                key={tier}
                type="button"
                className="pill-btn"
                data-active={tierFilter === tier}
                onClick={() => setTierFilter(tier)}
              >
                {tier}
              </button>
            ))}
          </div>
          <span className="fui-mono-label">
            All shells use @container queries — toggle Compact to inspect live column collapse
          </span>
        </div>
      )}

      {subView === "telemetry" && (
        <div className="filter-row">
          <div className="filter-group">
            <span className="filter-label">Ground</span>
            <button
              type="button"
              className="pill-btn"
              data-active={telemetryGround === "dark"}
              onClick={() => setTelemetryGround("dark")}
            >
              <Moon size={11} style={{ marginRight: 4, verticalAlign: "-1px" }} />
              Dark (#0f1115)
            </button>
            <button
              type="button"
              className="pill-btn"
              data-active={telemetryGround === "light"}
              onClick={() => setTelemetryGround("light")}
            >
              <Sun size={11} style={{ marginRight: 4, verticalAlign: "-1px" }} />
              Light (#f5f4ef)
            </button>

            <span className="filter-label" style={{ marginLeft: 8 }}>Tier</span>
            <button
              type="button"
              className="pill-btn"
              data-active={tierFilter === "all"}
              onClick={() => setTierFilter("all")}
            >
              all
            </button>
            {TIER_LIST.map((tier) => (
              <button
                key={tier}
                type="button"
                className="pill-btn"
                data-active={tierFilter === tier}
                onClick={() => setTierFilter(tier)}
              >
                {tier}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="btn-fui btn-fui-primary"
            onClick={() => setSimSeed((n) => n + 1)}
          >
            <RefreshCw size={12} />
            <span>Simulate Live Data</span>
          </button>
        </div>
      )}

      {/* 1. TEXTURES GRID */}
      {subView === "textures" &&
        (filteredTextures.length === 0 ? (
          <div className="empty-state">No textures match "{searchQuery}".</div>
        ) : (
          <div className="fnd-textures-grid">
            {filteredTextures.map((tex) => {
              const effOpacity = opacityOverride ?? tex.defaultOpacity;
              const effSize = scaleCssSize(tex.defaultSize, scaleMultiplier);
              const txColor =
                tex.id === "radial-vignette"
                  ? isLightGround
                    ? "rgba(15, 23, 42, 0.72)"
                    : "rgba(0, 0, 0, 0.92)"
                  : stageInk;

              const stageStyle = {
                backgroundColor: stageBg,
                color: stageInk,
                borderColor: stageBorder,
                "--tx-color": txColor,
                "--tx-opacity": String(effOpacity),
                "--tx-size": effSize,
              } as CSSProperties;

              return (
                <article key={tex.id} className="fui-card fnd-card" data-texture-id={tex.id}>
                  <div className={`fnd-texture-stage tx-${tex.id}`} style={stageStyle}>
                    <div className="fnd-texture-stage-content">
                      <span
                        className="fnd-texture-stage-tag"
                        style={{
                          color: stageMuted,
                          borderColor: stageBorder,
                          background: isLightGround
                            ? "rgba(255,255,255,0.72)"
                            : "rgba(9,10,12,0.72)",
                        }}
                      >
                        .tx-{tex.id} · {Math.round(effOpacity * 100)}%
                      </span>
                      <div
                        className="fnd-texture-sample-card"
                        style={{
                          background: isLightGround
                            ? "rgba(255,255,255,0.78)"
                            : "rgba(21,24,30,0.78)",
                          borderColor: stageBorder,
                          color: stageInk,
                        }}
                      >
                        <div style={{ fontSize: 12, fontWeight: 600 }}>{tex.name}</div>
                        <div
                          style={{
                            fontSize: 10,
                            fontFamily: "var(--font-mono)",
                            color: stageMuted,
                          }}
                        >
                          {tex.layer.toUpperCase()} · {tex.mechanism} · {effSize}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="fnd-card-body">
                    <div className="fnd-card-head">
                      <div>
                        <h2 className="fnd-card-title">{tex.name}</h2>
                        <div className="fui-mono-label">{tex.registryItem}</div>
                      </div>
                      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                        <span className="badge">{tex.layer}</span>
                        <span
                          className={`badge ${
                            tex.tier === "production"
                              ? "badge-emerald"
                              : tex.tier === "viral"
                                ? "badge-cyan"
                                : "badge-amber"
                          }`}
                        >
                          {tex.tier}
                        </span>
                      </div>
                    </div>

                    <div className="fnd-chip-row">
                      {tex.pairsWith.slice(0, 4).map((targetId) => (
                        <button
                          key={targetId}
                          type="button"
                          className="rel-chip rel-chip-pair"
                          onClick={() => onJumpToNode(targetId)}
                        >
                          {targetId}
                        </button>
                      ))}
                    </div>

                    <div className="fnd-card-actions">
                      <button
                        type="button"
                        className="btn-fui"
                        onClick={() => setActiveTextureDrawer(tex)}
                      >
                        <Code2 size={12} />
                        <span>View CSS</span>
                      </button>
                      <button
                        type="button"
                        className="btn-fui"
                        onClick={() =>
                          onCopy(
                            getShadcnAddCommand(tex.registryItem),
                            `Copied ${tex.registryItem} install`
                          )
                        }
                      >
                        <Terminal size={12} />
                        <span>shadcn Add</span>
                      </button>
                      <button
                        type="button"
                        className="btn-fui btn-fui-primary"
                        onClick={() => onOpenNodeInLab(tex.id)}
                      >
                        <span>Open in Lab</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ))}

      {/* 2. TYPOGRAPHY GRID */}
      {subView === "typography" &&
        (filteredTypography.length === 0 ? (
          <div className="empty-state">No typography systems match "{searchQuery}".</div>
        ) : (
          <div className="fnd-type-grid">
            {filteredTypography.map((typo) => {
              const displayLine = specimenText.trim() || "Precision craft meets hierarchy.";
              return (
                <article
                  key={typo.id}
                  ref={(el) => {
                    if (el) cardRefs.current.set(typo.id, el);
                    else cardRefs.current.delete(typo.id);
                  }}
                  data-font-url={typo.googleFontsUrl}
                  data-typography-id={typo.id}
                  className="fui-card fnd-card"
                  onMouseEnter={() => loadGoogleFonts(typo.googleFontsUrl)}
                >
                  <div className={`fnd-type-stage type-${typo.id}`}>
                    <div className="fnd-type-ladder-eyebrow">
                      <span
                        style={{
                          fontFamily: "var(--type-mono)",
                          fontSize: "var(--text-micro)",
                          letterSpacing: "var(--tracking-label)",
                          textTransform: "uppercase",
                          color: "var(--fui-signal-active)",
                        }}
                      >
                        {typo.id} // 01 SPECIMEN
                      </span>
                      <span
                        className="type-tabular"
                        style={{
                          fontFamily: "var(--type-mono)",
                          fontSize: "var(--text-micro)",
                          color: "var(--fui-ink-muted)",
                        }}
                      >
                        {(tickCounter / 100).toFixed(2)}ms
                      </span>
                    </div>

                    <div
                      className="type-display fnd-type-hero-sample"
                      style={{
                        fontFamily: "var(--type-display)",
                        fontWeight: "var(--display-weight)",
                        letterSpacing: "var(--tracking-display)",
                        lineHeight: "var(--leading-display)",
                        textTransform: "var(--display-transform)" as CSSProperties["textTransform"],
                      }}
                    >
                      {displayLine}
                    </div>

                    <div
                      className="fnd-type-h2-sample"
                      style={{
                        fontFamily: "var(--type-display)",
                        fontWeight: "var(--display-weight)",
                        letterSpacing: "var(--tracking-display)",
                        lineHeight: 1.15,
                      }}
                    >
                      Fluid modular hierarchy across viewports
                    </div>

                    <p
                      className="fnd-type-body-sample"
                      style={{
                        fontFamily: "var(--type-body)",
                        lineHeight: "var(--leading-body)",
                      }}
                    >
                      Scoped CSS custom properties drive display, body, and monospace rhythm with zero global leakage.
                    </p>
                  </div>

                  <div className="fnd-card-body">
                    <div className="fnd-card-head">
                      <div>
                        <h2 className="fnd-card-title">{typo.name}</h2>
                        <div className="fui-mono-label">{typo.fonts.join(" + ")}</div>
                      </div>
                      <span
                        className={`badge ${
                          typo.tier === "production"
                            ? "badge-emerald"
                            : typo.tier === "viral"
                              ? "badge-cyan"
                              : "badge-amber"
                        }`}
                      >
                        {typo.tier}
                      </span>
                    </div>

                    <div className="fnd-chip-row">
                      {typo.pairsWith.slice(0, 4).map((targetId) => (
                        <button
                          key={targetId}
                          type="button"
                          className="rel-chip rel-chip-pair"
                          onClick={() => onJumpToNode(targetId)}
                        >
                          {targetId}
                        </button>
                      ))}
                    </div>

                    <div className="fnd-card-actions">
                      <button
                        type="button"
                        className="btn-fui"
                        onClick={() => {
                          loadGoogleFonts(typo.googleFontsUrl);
                          setTypeDrawerTab("spec");
                          setActiveTypeDrawer(typo);
                        }}
                      >
                        <FileText size={12} />
                        <span>View Spec</span>
                      </button>
                      <button
                        type="button"
                        className="btn-fui"
                        onClick={() =>
                          onCopy(
                            getShadcnAddCommand(typo.registryItem),
                            `Copied ${typo.registryItem} install`
                          )
                        }
                      >
                        <Terminal size={12} />
                        <span>shadcn Add</span>
                      </button>
                      <button
                        type="button"
                        className="btn-fui btn-fui-primary"
                        onClick={() => onOpenNodeInLab(typo.id)}
                      >
                        <span>Open in Lab</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ))}

      {/* 3. LAYOUTS GRID */}
      {subView === "layouts" &&
        (filteredLayouts.length === 0 ? (
          <div className="empty-state">No layouts match "{searchQuery}".</div>
        ) : (
          <div className="fnd-layouts-grid">
            {filteredLayouts.map((lay) => (
              <article key={lay.id} className="fui-card fnd-card" data-layout-id={lay.id}>
                <div className="fnd-layout-stage-wrap">
                  <div
                    className="fnd-layout-stage-frame"
                    data-mode={layoutPreviewMode}
                  >
                    {renderLayoutMiniPreview(lay.id)}
                  </div>
                </div>

                <div className="fnd-card-body">
                  <div className="fnd-card-head">
                    <div>
                      <h2 className="fnd-card-title">{lay.name}</h2>
                      <div className="fui-mono-label">{lay.pattern}</div>
                    </div>
                    <span
                      className={`badge ${
                        lay.tier === "production"
                          ? "badge-emerald"
                          : lay.tier === "viral"
                            ? "badge-cyan"
                            : "badge-amber"
                      }`}
                    >
                      {lay.tier}
                    </span>
                  </div>

                  <div className="fnd-chip-row">
                    {lay.slots.map((slot) => (
                      <span key={slot} className="badge" style={{ fontSize: 9 }}>
                        {slot}
                      </span>
                    ))}
                  </div>

                  <div className="fnd-chip-row">
                    {lay.pairsWith.slice(0, 4).map((targetId) => (
                      <button
                        key={targetId}
                        type="button"
                        className="rel-chip rel-chip-pair"
                        onClick={() => onJumpToNode(targetId)}
                      >
                        {targetId}
                      </button>
                    ))}
                  </div>

                  <div className="fnd-card-actions">
                    <button
                      type="button"
                      className="btn-fui"
                      onClick={() => {
                        setLayoutDrawerTab("spec");
                        setActiveLayoutDrawer(lay);
                      }}
                    >
                      <FileText size={12} />
                      <span>View Spec</span>
                    </button>
                    <button
                      type="button"
                      className="btn-fui"
                      onClick={() =>
                        onCopy(
                          getShadcnAddCommand(lay.registryItem),
                          `Copied ${lay.registryItem} install`
                        )
                      }
                    >
                      <Terminal size={12} />
                      <span>shadcn Add</span>
                    </button>
                    <button
                      type="button"
                      className="btn-fui btn-fui-primary"
                      onClick={() => onOpenNodeInLab(lay.id)}
                    >
                      <span>Open in Lab</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ))}

      {/* 4. TELEMETRY GRID */}
      {subView === "telemetry" &&
        (filteredTelemetry.length === 0 ? (
          <div className="empty-state">No telemetry widgets match "{searchQuery}".</div>
        ) : (
          <div className="fnd-textures-grid">
            {filteredTelemetry.map((tel) => {
              const needsLazy =
                tel.id === "live-oscilloscope" || tel.id === "led-status-matrix";
              const widget = renderTelemetryWidget(tel.id, {
                seed: simSeed,
                reducedMotion,
              });

              return (
                <article key={tel.id} className="fui-card fnd-card" data-telemetry-id={tel.id}>
                  {needsLazy ? (
                    <LazyStage
                      className="fnd-telemetry-stage"
                      minHeight={132}
                      style={telStageVars}
                    >
                      {widget}
                    </LazyStage>
                  ) : (
                    <div className="fnd-telemetry-stage" style={telStageVars}>
                      {widget}
                    </div>
                  )}

                  <div className="fnd-card-body">
                    <div className="fnd-card-head">
                      <div>
                        <h2 className="fnd-card-title">{tel.name}</h2>
                        <div className="fui-mono-label">
                          {tel.engine.join(" + ")} · perf: {tel.perfTier}
                        </div>
                      </div>
                      <span
                        className={`badge ${
                          tel.tier === "production"
                            ? "badge-emerald"
                            : tel.tier === "viral"
                              ? "badge-cyan"
                              : "badge-amber"
                        }`}
                      >
                        {tel.tier}
                      </span>
                    </div>

                    <div className="fnd-chip-row">
                      {tel.pairsWith.slice(0, 4).map((targetId) => (
                        <button
                          key={targetId}
                          type="button"
                          className="rel-chip rel-chip-pair"
                          onClick={() => onJumpToNode(targetId)}
                        >
                          {targetId}
                        </button>
                      ))}
                    </div>

                    <div className="fnd-card-actions">
                      <button
                        type="button"
                        className="btn-fui"
                        onClick={() => setActiveTelemetryDrawer(tel)}
                      >
                        <Code2 size={12} />
                        <span>View Code</span>
                      </button>
                      <button
                        type="button"
                        className="btn-fui"
                        onClick={() =>
                          onCopy(
                            getShadcnAddCommand(tel.registryItem),
                            `Copied ${tel.registryItem} install`
                          )
                        }
                      >
                        <Terminal size={12} />
                        <span>shadcn Add</span>
                      </button>
                      <button
                        type="button"
                        className="btn-fui btn-fui-primary"
                        onClick={() => onOpenNodeInLab(tel.id)}
                      >
                        <span>Open in Lab</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ))}

      {/* TEXTURE CSS DRAWER */}
      {activeTextureDrawer && (
        <div
          className="drawer-backdrop"
          onClick={() => setActiveTextureDrawer(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeTextureDrawer.name} CSS`}
        >
          <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div>
                <h2 className="drawer-title">{activeTextureDrawer.name}</h2>
                <div className="fui-mono-label">
                  {activeTextureDrawer.path} · {activeTextureDrawer.registryItem}
                </div>
              </div>
              <button
                type="button"
                className="btn-fui"
                onClick={() => setActiveTextureDrawer(null)}
                aria-label="Close CSS drawer"
              >
                <X size={14} />
              </button>
            </div>
            <div className="drawer-body">
              <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="btn-fui btn-fui-primary"
                  onClick={() =>
                    onCopy(
                      textureRawById[activeTextureDrawer.id] ?? "",
                      `Copied ${activeTextureDrawer.id}.css`
                    )
                  }
                >
                  <Copy size={12} />
                  <span>Copy CSS</span>
                </button>
                <button
                  type="button"
                  className="btn-fui"
                  onClick={() =>
                    onCopy(
                      getShadcnAddCommand(activeTextureDrawer.registryItem),
                      `Copied ${activeTextureDrawer.registryItem}`
                    )
                  }
                >
                  <Terminal size={12} />
                  <span>Copy shadcn Add</span>
                </button>
                <button
                  type="button"
                  className="btn-fui"
                  onClick={() => {
                    const id = activeTextureDrawer.id;
                    setActiveTextureDrawer(null);
                    onOpenNodeInLab(id);
                  }}
                >
                  <span>Open in Lab</span>
                  <ArrowRight size={12} />
                </button>
              </div>
              <pre className="code-block">
                <code>{textureRawById[activeTextureDrawer.id] ?? ""}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TYPOGRAPHY SPEC + CSS DRAWER */}
      {activeTypeDrawer && (
        <div
          className="drawer-backdrop"
          onClick={() => setActiveTypeDrawer(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeTypeDrawer.name} Specification`}
        >
          <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div>
                <h2 className="drawer-title">{activeTypeDrawer.name}</h2>
                <div className="fui-mono-label">
                  {activeTypeDrawer.fonts.join(" + ")} · {activeTypeDrawer.registryItem}
                </div>
              </div>
              <button
                type="button"
                className="btn-fui"
                onClick={() => setActiveTypeDrawer(null)}
                aria-label="Close typography drawer"
              >
                <X size={14} />
              </button>
            </div>
            <div className="drawer-body">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8,
                  marginBottom: 14,
                  flexWrap: "wrap",
                }}
              >
                <div className="rel-subview-tabs">
                  <button
                    type="button"
                    className="pill-btn"
                    data-active={typeDrawerTab === "spec"}
                    onClick={() => setTypeDrawerTab("spec")}
                  >
                    TYPOGRAPHY.md
                  </button>
                  <button
                    type="button"
                    className="pill-btn"
                    data-active={typeDrawerTab === "css"}
                    onClick={() => setTypeDrawerTab("css")}
                  >
                    typography.css
                  </button>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    type="button"
                    className="btn-fui btn-fui-primary"
                    onClick={() =>
                      onCopy(
                        typeDrawerTab === "spec"
                          ? typographyRawById[activeTypeDrawer.id] ?? ""
                          : typographyCssById[activeTypeDrawer.id] ?? "",
                        `Copied ${typeDrawerTab === "spec" ? "TYPOGRAPHY.md" : "typography.css"}`
                      )
                    }
                  >
                    <Copy size={12} />
                    <span>Copy {typeDrawerTab === "spec" ? "Spec" : "CSS"}</span>
                  </button>
                  <button
                    type="button"
                    className="btn-fui"
                    onClick={() => {
                      const id = activeTypeDrawer.id;
                      setActiveTypeDrawer(null);
                      onOpenNodeInLab(id);
                    }}
                  >
                    <span>Open in Lab</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
              {typeDrawerTab === "spec" && activeTypeDoc ? (
                <div className="spec-doc">
                  {activeTypeDoc.summary && <p className="spec-summary">{activeTypeDoc.summary}</p>}
                  {activeTypeDoc.sections.map((sec) => (
                    <div key={sec.heading} className="spec-section">
                      <h3 className="spec-section-title">{sec.heading}</h3>
                      {sec.paragraphs.map((p, idx) => (
                        <p key={idx} className="spec-paragraph">{p}</p>
                      ))}
                      {sec.bullets.length > 0 && (
                        <ul className="spec-list">
                          {sec.bullets.map((b, idx) => (
                            <li key={idx}>
                              {b.label && <strong>{b.label}: </strong>}
                              <span>{b.text}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                  <div className="spec-section">
                    <h3 className="spec-section-title">Compatible Pairings</h3>
                    <div className="fnd-chip-row">
                      {activeTypeDrawer.pairsWith.map((id) => (
                        <button
                          key={id}
                          type="button"
                          className="rel-chip rel-chip-pair"
                          onClick={() => {
                            setActiveTypeDrawer(null);
                            onJumpToNode(id);
                          }}
                        >
                          {formatNodeLabel(id)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <pre className="code-block">
                  <code>{typographyCssById[activeTypeDrawer.id] ?? ""}</code>
                </pre>
              )}
            </div>
          </div>
        </div>
      )}

      {/* LAYOUT SPEC + TSX + CSS DRAWER */}
      {activeLayoutDrawer && (
        <div
          className="drawer-backdrop"
          onClick={() => setActiveLayoutDrawer(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeLayoutDrawer.name} Specification`}
        >
          <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div>
                <h2 className="drawer-title">{activeLayoutDrawer.name}</h2>
                <div className="fui-mono-label">
                  {activeLayoutDrawer.path} · {activeLayoutDrawer.registryItem}
                </div>
              </div>
              <button
                type="button"
                className="btn-fui"
                onClick={() => setActiveLayoutDrawer(null)}
                aria-label="Close layout drawer"
              >
                <X size={14} />
              </button>
            </div>
            <div className="drawer-body">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8,
                  marginBottom: 14,
                  flexWrap: "wrap",
                }}
              >
                <div className="rel-subview-tabs">
                  <button
                    type="button"
                    className="pill-btn"
                    data-active={layoutDrawerTab === "spec"}
                    onClick={() => setLayoutDrawerTab("spec")}
                  >
                    LAYOUT.md
                  </button>
                  <button
                    type="button"
                    className="pill-btn"
                    data-active={layoutDrawerTab === "tsx"}
                    onClick={() => setLayoutDrawerTab("tsx")}
                  >
                    {activeLayoutDrawer.id}.tsx
                  </button>
                  <button
                    type="button"
                    className="pill-btn"
                    data-active={layoutDrawerTab === "css"}
                    onClick={() => setLayoutDrawerTab("css")}
                  >
                    {activeLayoutDrawer.id}.css
                  </button>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    type="button"
                    className="btn-fui btn-fui-primary"
                    onClick={() => {
                      const raw =
                        layoutDrawerTab === "spec"
                          ? layoutMdById[activeLayoutDrawer.id] ?? ""
                          : layoutDrawerTab === "tsx"
                            ? layoutTsxById[activeLayoutDrawer.id] ?? ""
                            : layoutCssById[activeLayoutDrawer.id] ?? "";
                      onCopy(raw, `Copied ${layoutDrawerTab.toUpperCase()} for ${activeLayoutDrawer.id}`);
                    }}
                  >
                    <Copy size={12} />
                    <span>Copy</span>
                  </button>
                  <button
                    type="button"
                    className="btn-fui"
                    onClick={() => {
                      const id = activeLayoutDrawer.id;
                      setActiveLayoutDrawer(null);
                      onOpenNodeInLab(id);
                    }}
                  >
                    <span>Open in Lab</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              {layoutDrawerTab === "spec" && activeLayoutDoc ? (
                <div className="spec-doc">
                  {activeLayoutDoc.summary && <p className="spec-summary">{activeLayoutDoc.summary}</p>}
                  {activeLayoutDoc.sections.map((sec) => (
                    <div key={sec.heading} className="spec-section">
                      <h3 className="spec-section-title">{sec.heading}</h3>
                      {sec.paragraphs.map((p, idx) => (
                        <p key={idx} className="spec-paragraph">{p}</p>
                      ))}
                      {sec.bullets.length > 0 && (
                        <ul className="spec-list">
                          {sec.bullets.map((b, idx) => (
                            <li key={idx}>
                              {b.label && <strong>{b.label}: </strong>}
                              <span>{b.text}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <pre className="code-block">
                  <code>
                    {layoutDrawerTab === "tsx"
                      ? layoutTsxById[activeLayoutDrawer.id] ?? ""
                      : layoutCssById[activeLayoutDrawer.id] ?? ""}
                  </code>
                </pre>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TELEMETRY CODE DRAWER */}
      {activeTelemetryDrawer && (
        <div
          className="drawer-backdrop"
          onClick={() => setActiveTelemetryDrawer(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeTelemetryDrawer.name} Code`}
        >
          <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div>
                <h2 className="drawer-title">{activeTelemetryDrawer.name}</h2>
                <div className="fui-mono-label">
                  {activeTelemetryDrawer.path} · {activeTelemetryDrawer.registryItem}
                </div>
              </div>
              <button
                type="button"
                className="btn-fui"
                onClick={() => setActiveTelemetryDrawer(null)}
                aria-label="Close telemetry code drawer"
              >
                <X size={14} />
              </button>
            </div>
            <div className="drawer-body">
              <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="btn-fui btn-fui-primary"
                  onClick={() =>
                    onCopy(
                      telemetryRawById[activeTelemetryDrawer.id] ?? "",
                      `Copied ${activeTelemetryDrawer.id}.tsx`
                    )
                  }
                >
                  <Copy size={12} />
                  <span>Copy TSX</span>
                </button>
                <button
                  type="button"
                  className="btn-fui"
                  onClick={() =>
                    onCopy(
                      getShadcnAddCommand(activeTelemetryDrawer.registryItem),
                      `Copied ${activeTelemetryDrawer.registryItem}`
                    )
                  }
                >
                  <Terminal size={12} />
                  <span>Copy shadcn Add</span>
                </button>
                <button
                  type="button"
                  className="btn-fui"
                  onClick={() => {
                    const id = activeTelemetryDrawer.id;
                    setActiveTelemetryDrawer(null);
                    onOpenNodeInLab(id);
                  }}
                >
                  <span>Open in Lab</span>
                  <ArrowRight size={12} />
                </button>
              </div>
              <pre className="code-block">
                <code>{telemetryRawById[activeTelemetryDrawer.id] ?? ""}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
