import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  ArrowRight,
  Code2,
  Copy,
  FileText,
  Grid2x2,
  Moon,
  Sun,
  Terminal,
  Type,
  X,
} from "lucide-react";
import {
  TIER_LIST,
  formatNodeLabel,
  getShadcnAddCommand,
  textureNodes,
  textureRawById,
  typographyCssById,
  typographyNodes,
  typographyRawById,
  type TextureNode,
  type TierId,
  type TypographyNode,
} from "../lib/vault-data";
import { loadGoogleFonts } from "../lib/font-loader";
import { parseStyleMarkdown } from "../lib/markdown";

export type FoundationsSubView = "textures" | "typography";

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
  if (unit === "%") {
    return `${Math.round(val * multiplier)}%`;
  }
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
  const [drawerTab, setDrawerTab] = useState<"spec" | "css">("spec");
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Close drawers on Escape
  useEffect(() => {
    if (!activeTextureDrawer && !activeTypeDrawer) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveTextureDrawer(null);
        setActiveTypeDrawer(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeTextureDrawer, activeTypeDrawer]);

  // Live tabular-nums counter in Typography Specimen Bar
  useEffect(() => {
    if (subView !== "typography" || reducedMotion) return;
    const id = window.setInterval(() => {
      setTickCounter((n) => (n >= 9999 ? 1024 : n + 7));
    }, 900);
    return () => window.clearInterval(id);
  }, [subView, reducedMotion]);

  // On-demand Google Fonts loader when Typography sub-view is active
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
      const hay = [
        tex.id,
        tex.name,
        tex.tier,
        tex.layer,
        tex.mechanism,
        ...tex.pairsWith,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [searchQuery, tierFilter]);

  const filteredTypography = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return typographyNodes.filter((typo) => {
      if (tierFilter !== "all" && typo.tier !== tierFilter) return false;
      if (!q) return true;
      const hay = [
        typo.id,
        typo.name,
        typo.tier,
        typo.voice,
        ...typo.fonts,
        ...typo.pairsWith,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [searchQuery, tierFilter]);

  const activeTypeDoc = useMemo(() => {
    if (!activeTypeDrawer) return null;
    return parseStyleMarkdown(typographyRawById[activeTypeDrawer.id] ?? "");
  }, [activeTypeDrawer]);

  const isLightGround = groundMode === "light";
  const stageBg = isLightGround ? "#f5f4ef" : "#0f1115";
  const stageInk = isLightGround ? "#14171f" : "#e8ecf2";
  const stageMuted = isLightGround ? "#555c68" : "#8b94a3";
  const stageBorder = isLightGround ? "rgba(17, 19, 24, 0.12)" : "rgba(255, 255, 255, 0.1)";

  return (
    <section aria-label="Foundations Gallery">
      {/* Header Bar + Sub-View Switcher */}
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
            </div>
          </div>
          <p className="section-subtitle">
            {subView === "textures"
              ? `${textureNodes.length} zero-JS adaptive CSS surface layers parameterized by --tx-color, --tx-opacity, and --tx-size.`
              : `${typographyNodes.length} scoped fluid typography systems with on-demand Google Fonts, clamp() scales, and strict tabular-nums.`}
          </p>
        </div>
        <span className="badge badge-cyan">
          {textureNodes.length} TEXTURES // {typographyNodes.length} TYPOGRAPHY
        </span>
      </div>

      {/* Sub-View Controls Bar */}
      {subView === "textures" ? (
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

            <span className="filter-label" style={{ marginLeft: 8 }}>
              Tier
            </span>
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
              <span className="filter-label" style={{ marginRight: 0 }}>
                Opacity
              </span>
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
              <span className="filter-label" style={{ marginRight: 0 }}>
                Scale
              </span>
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
      ) : (
        <div className="filter-row fnd-specimen-bar">
          <div className="fnd-specimen-input-wrap">
            <span className="filter-label" style={{ marginRight: 0 }}>
              Specimen
            </span>
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
            <div
              className="fnd-tabular-pill"
              title="Live tabular-nums alignment preview"
            >
              <span className="fui-mono-label">TABULAR</span>
              <span className="fnd-tabular-val">
                {(tickCounter / 100).toFixed(2)}ms · {tickCounter.toLocaleString()}
              </span>
            </div>

            <span className="filter-label" style={{ marginLeft: 4 }}>
              Tier
            </span>
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

      {/* TEXTURES GRID */}
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
                <article
                  key={tex.id}
                  className="fui-card fnd-card"
                  data-texture-id={tex.id}
                >
                  <div
                    className={`fnd-texture-stage tx-${tex.id}`}
                    style={stageStyle}
                  >
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
                        <div style={{ fontSize: 12, fontWeight: 600 }}>
                          {tex.name}
                        </div>
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
                          title={`Jump to ${targetId}`}
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

      {/* TYPOGRAPHY GRID */}
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
                  {/* Live Modular Scale Ladder inside Scoped .type-<id> */}
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
                          title={`Jump to ${targetId}`}
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
                          setDrawerTab("spec");
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
                    data-active={drawerTab === "spec"}
                    onClick={() => setDrawerTab("spec")}
                  >
                    TYPOGRAPHY.md
                  </button>
                  <button
                    type="button"
                    className="pill-btn"
                    data-active={drawerTab === "css"}
                    onClick={() => setDrawerTab("css")}
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
                        drawerTab === "spec"
                          ? typographyRawById[activeTypeDrawer.id] ?? ""
                          : typographyCssById[activeTypeDrawer.id] ?? "",
                        `Copied ${drawerTab === "spec" ? "TYPOGRAPHY.md" : "typography.css"}`
                      )
                    }
                  >
                    <Copy size={12} />
                    <span>Copy {drawerTab === "spec" ? "Spec" : "CSS"}</span>
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

              {drawerTab === "spec" && activeTypeDoc ? (
                <div className="spec-doc">
                  {activeTypeDoc.summary && (
                    <p className="spec-summary">{activeTypeDoc.summary}</p>
                  )}
                  {activeTypeDoc.sections.map((sec) => (
                    <div key={sec.heading} className="spec-section">
                      <h3 className="spec-section-title">{sec.heading}</h3>
                      {sec.paragraphs.map((p, idx) => (
                        <p key={idx} className="spec-paragraph">
                          {p}
                        </p>
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
    </section>
  );
}
