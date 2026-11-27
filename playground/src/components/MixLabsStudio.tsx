import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Copy,
  Dices,
  Flame,
  Layers,
  Link2,
  Monitor,
  RotateCcw,
  Search,
  Smartphone,
  Sparkles,
  Square,
  Terminal,
  Trash2,
  X,
} from "lucide-react";
import {
  TIER_LIST,
  animationNodes,
  clusterList,
  formatNodeLabel,
  getRelationStatus,
  nodeById,
  styleNodes,
  vaultRelations,
  type ClusterId,
  type MechanicId,
  type StyleNode,
  type TierId,
} from "../lib/vault-data";
import { getScopedStageStyle, resolveStyleTheme } from "../lib/style-theme";
import {
  AMBIENT_BACKDROP_IDS,
  MAX_LAB_ANIMATIONS,
  buildLabAgentPrompt,
  buildLabShadcnCommand,
  buildLabShareUrl,
  evaluateLabMix,
  pickChaosMix,
  pickRandomCompatibleMix,
  resolveHybridToLabMix,
  type LabState,
  type LabViewportMode,
} from "../lib/lab-helpers";
import { animationDemoRegistry } from "../demos";
import { LabBackdropLayer } from "./LabBackdropLayer";

interface MixLabsStudioProps {
  labState: LabState;
  onUpdateLabState: (updater: (prev: LabState) => LabState) => void;
  motionEpoch: number;
  reducedMotion: boolean;
  onCopy: (text: string, label: string) => void;
}

export function MixLabsStudio({
  labState,
  onUpdateLabState,
  motionEpoch,
  reducedMotion,
  onCopy,
}: MixLabsStudioProps) {
  const [styleSearch, setStyleSearch] = useState("");
  const [styleTier, setStyleTier] = useState<TierId | "all">("all");
  const [collapsedClusters, setCollapsedClusters] = useState<Record<string, boolean>>({});

  const [animSearch, setAnimSearch] = useState("");
  const [animMechanic, setAnimMechanic] = useState<MechanicId | "all">("all");
  const [pairsFirst, setPairsFirst] = useState(true);
  const [labReplayEpoch, setLabReplayEpoch] = useState(0);
  const [selectedPresetId, setSelectedPresetId] = useState("");

  const activeStyleNode = nodeById.get(labState.styleId) as StyleNode | undefined;
  const theme = useMemo(
    () => resolveStyleTheme(labState.styleId),
    [labState.styleId]
  );
  const scopedStageStyle = useMemo(() => getScopedStageStyle(theme), [theme]);

  const evaluation = useMemo(
    () => evaluateLabMix(labState.styleId, labState.animationIds),
    [labState.styleId, labState.animationIds]
  );

  // Group filtered styles by cluster
  const groupedStyles = useMemo(() => {
    const q = styleSearch.trim().toLowerCase();
    return clusterList
      .map((cluster) => {
        const items = styleNodes.filter((s) => {
          if (s.cluster !== cluster.id) return false;
          if (styleTier !== "all" && s.tier !== styleTier) return false;
          if (!q) return true;
          return `${s.id} ${s.cluster} ${s.tier} ${formatNodeLabel(s.id)}`
            .toLowerCase()
            .includes(q);
        });
        return { cluster, items };
      })
      .filter((group) => group.items.length > 0);
  }, [styleSearch, styleTier]);

  // Filter & optionally sort animations by compatibility with Base Style
  const filteredAnimations = useMemo(() => {
    const q = animSearch.trim().toLowerCase();
    const list = animationNodes.filter((a) => {
      if (animMechanic !== "all" && a.mechanic !== animMechanic) return false;
      if (!q) return true;
      return `${a.id} ${a.mechanic} ${a.tier} ${a.engine.join(" ")} ${formatNodeLabel(a.id)}`
        .toLowerCase()
        .includes(q);
    });

    if (!pairsFirst) return list;

    const rank = (id: string) => {
      const st = getRelationStatus(labState.styleId, id);
      if (st === "pairs") return 0;
      if (st === "neutral") return 1;
      return 2; // clashes
    };

    return [...list].sort(
      (a, b) => rank(a.id) - rank(b.id) || a.id.localeCompare(b.id)
    );
  }, [animSearch, animMechanic, pairsFirst, labState.styleId]);

  const toggleCluster = (clusterId: ClusterId) => {
    setCollapsedClusters((prev) => ({ ...prev, [clusterId]: !prev[clusterId] }));
  };

  const handleSelectStyle = (styleId: string) => {
    setSelectedPresetId("");
    onUpdateLabState((prev) => ({ ...prev, styleId }));
  };

  const handleToggleAnimation = (animId: string) => {
    setSelectedPresetId("");
    onUpdateLabState((prev) => {
      const exists = prev.animationIds.includes(animId);
      if (exists) {
        return {
          ...prev,
          animationIds: prev.animationIds.filter((id) => id !== animId),
          backdropId: prev.backdropId === animId ? null : prev.backdropId,
        };
      }
      if (prev.animationIds.length >= MAX_LAB_ANIMATIONS) {
        return prev;
      }
      return {
        ...prev,
        animationIds: [...prev.animationIds, animId],
      };
    });
  };

  // Single-backdrop enforcement: toggling Backdrop on a 2nd ambient anim demotes the prior one to Card
  const handleToggleBackdrop = (animId: string) => {
    if (!AMBIENT_BACKDROP_IDS.has(animId)) return;
    onUpdateLabState((prev) => ({
      ...prev,
      backdropId: prev.backdropId === animId ? null : animId,
    }));
  };

  const handleApplyHybrid = (hybridId: string) => {
    setSelectedPresetId(hybridId);
    const hybrid = vaultRelations.hybrids.find((h) => h.id === hybridId);
    if (!hybrid) return;
    const mix = resolveHybridToLabMix(hybrid);
    onUpdateLabState((prev) => ({
      ...prev,
      styleId: mix.styleId,
      animationIds: mix.animationIds,
      backdropId: null,
    }));
  };

  const handleRandomCompatible = () => {
    setSelectedPresetId("");
    const mix = pickRandomCompatibleMix(labState.styleId);
    onUpdateLabState((prev) => ({
      ...prev,
      styleId: mix.styleId,
      animationIds: mix.animationIds,
      backdropId: null,
    }));
  };

  const handleChaosMix = () => {
    setSelectedPresetId("");
    const mix = pickChaosMix(labState.styleId);
    onUpdateLabState((prev) => ({
      ...prev,
      styleId: mix.styleId,
      animationIds: mix.animationIds,
      backdropId: null,
    }));
  };

  const handleClearAnims = () => {
    setSelectedPresetId("");
    onUpdateLabState((prev) => ({
      ...prev,
      animationIds: [],
      backdropId: null,
    }));
  };

  const cardAnimationIds = labState.animationIds.filter(
    (id) => id !== labState.backdropId
  );

  const combinedEpoch = motionEpoch + labReplayEpoch;
  const clusterMeta = activeStyleNode
    ? vaultRelations.clusters[activeStyleNode.cluster]
    : null;

  return (
    <section className="lab-studio" aria-label="Labs Mix and Match Studio">
      {/* Main 2-column workspace */}
      <div className="lab-workspace">
        {/* LEFT CONTROL RAIL */}
        <aside className="lab-rail" aria-label="Lab Controls">
          {/* Quick Presets Bar */}
          <div className="lab-rail-section">
            <div className="lab-rail-section-head">
              <span className="fui-mono-label" style={{ color: "var(--fui-ink)" }}>
                Quick Presets
              </span>
              <span className="fui-mono-label">
                {vaultRelations.hybrids.length} hybrids
              </span>
            </div>

            <select
              className="lab-preset-select"
              value={selectedPresetId}
              onChange={(e) => handleApplyHybrid(e.target.value)}
              aria-label="Load hybrid recipe preset"
            >
              <option value="">Load Hybrid Recipe...</option>
              {vaultRelations.hybrids.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.baseStyle})
                </option>
              ))}
            </select>

            <div className="lab-preset-actions">
              <button
                type="button"
                className="btn-fui btn-fui-primary"
                style={{ flex: 1, fontSize: 10, padding: "0 8px" }}
                onClick={handleRandomCompatible}
                title="Pick a random style + 2–3 compatible animations"
              >
                <Dices size={12} />
                <span>Random Compatible</span>
              </button>
              <button
                type="button"
                className="btn-fui lab-btn-chaos"
                style={{ fontSize: 10, padding: "0 8px" }}
                onClick={handleChaosMix}
                title="Intentionally pair clashing aesthetics to test rule-breaking combos"
              >
                <Flame size={12} />
                <span>Chaos Mix</span>
              </button>
              <button
                type="button"
                className="btn-fui"
                style={{ fontSize: 10, padding: "0 7px" }}
                onClick={handleClearAnims}
                title="Clear active animations"
                aria-label="Clear active animations"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>

          {/* Base Style Selector (Single-Select) */}
          <div className="lab-rail-section">
            <div className="lab-rail-section-head">
              <span className="fui-mono-label" style={{ color: "var(--fui-ink)" }}>
                1. Base Style
              </span>
              <span className="badge badge-cyan" style={{ fontSize: 9 }}>
                {labState.styleId}
              </span>
            </div>

            <div className="rel-pane-search-wrap" style={{ width: "100%" }}>
              <Search size={11} className="rel-pane-search-icon" />
              <input
                type="text"
                className="rel-pane-search"
                style={{ width: "100%" }}
                value={styleSearch}
                onChange={(e) => setStyleSearch(e.target.value)}
                placeholder="Search 36 styles..."
                aria-label="Search base styles"
              />
              {styleSearch && (
                <button
                  type="button"
                  className="rel-pane-search-clear"
                  onClick={() => setStyleSearch("")}
                  aria-label="Clear style search"
                >
                  <X size={10} />
                </button>
              )}
            </div>

            <div className="rel-chip-strip">
              <button
                type="button"
                className="pill-btn rel-mini-pill"
                data-active={styleTier === "all"}
                onClick={() => setStyleTier("all")}
              >
                all
              </button>
              {TIER_LIST.map((tier) => (
                <button
                  key={tier}
                  type="button"
                  className="pill-btn rel-mini-pill"
                  data-active={styleTier === tier}
                  onClick={() => setStyleTier(tier)}
                >
                  {tier}
                </button>
              ))}
            </div>

            <div className="lab-style-groups">
              {groupedStyles.map(({ cluster, items }) => {
                const isCollapsed = Boolean(collapsedClusters[cluster.id]) && !styleSearch;
                return (
                  <div key={cluster.id} className="lab-cluster-group">
                    <button
                      type="button"
                      className="lab-cluster-toggle"
                      onClick={() => toggleCluster(cluster.id)}
                    >
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                        {isCollapsed ? <ChevronRight size={11} /> : <ChevronDown size={11} />}
                        <span>{cluster.id.slice(0, 2)} · {cluster.label}</span>
                      </span>
                      <span className="fui-mono-label">{items.length}</span>
                    </button>

                    {!isCollapsed && (
                      <div className="lab-style-list">
                        {items.map((style) => {
                          const stTheme = resolveStyleTheme(style.id);
                          const active = style.id === labState.styleId;
                          return (
                            <button
                              key={style.id}
                              type="button"
                              className="lab-rail-row"
                              data-active={active}
                              onClick={() => handleSelectStyle(style.id)}
                            >
                              <span className="lab-rail-row-left">
                                <span className="lab-palette-dots" aria-hidden="true">
                                  {stTheme.paletteDots.map((color, idx) => (
                                    <span key={idx} style={{ background: color }} />
                                  ))}
                                </span>
                                <span className="lab-rail-row-name">
                                  {formatNodeLabel(style.id)}
                                </span>
                              </span>
                              <span
                                className={`tier-dot tier-dot-${style.tier}`}
                                title={`Tier: ${style.tier}`}
                              />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Animation Stack Selector (Multi-Select, max 4) */}
          <div className="lab-rail-section">
            <div className="lab-rail-section-head">
              <span className="fui-mono-label" style={{ color: "var(--fui-ink)" }}>
                2. Animation Stack
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <button
                  type="button"
                  className="pill-btn rel-mini-pill"
                  data-active={pairsFirst}
                  onClick={() => setPairsFirst((v) => !v)}
                  title="Float compatible PAIR animations to the top"
                >
                  Pairs First
                </button>
                <span
                  className={`badge ${
                    labState.animationIds.length >= MAX_LAB_ANIMATIONS
                      ? "badge-amber"
                      : "badge-cyan"
                  }`}
                  style={{ fontSize: 9 }}
                >
                  {labState.animationIds.length}/{MAX_LAB_ANIMATIONS}
                </span>
              </div>
            </div>

            <div className="rel-pane-search-wrap" style={{ width: "100%" }}>
              <Search size={11} className="rel-pane-search-icon" />
              <input
                type="text"
                className="rel-pane-search"
                style={{ width: "100%" }}
                value={animSearch}
                onChange={(e) => setAnimSearch(e.target.value)}
                placeholder="Search 69 animations..."
                aria-label="Search animations"
              />
              {animSearch && (
                <button
                  type="button"
                  className="rel-pane-search-clear"
                  onClick={() => setAnimSearch("")}
                  aria-label="Clear animation search"
                >
                  <X size={10} />
                </button>
              )}
            </div>

            <div className="rel-chip-strip">
              <button
                type="button"
                className="pill-btn rel-mini-pill"
                data-active={animMechanic === "all"}
                onClick={() => setAnimMechanic("all")}
              >
                all
              </button>
              {vaultRelations.mechanics.map((mech) => (
                <button
                  key={mech}
                  type="button"
                  className="pill-btn rel-mini-pill"
                  data-active={animMechanic === mech}
                  onClick={() => setAnimMechanic(mech)}
                >
                  {mech}
                </button>
              ))}
            </div>

            <div className="lab-anim-list">
              {filteredAnimations.map((anim) => {
                const selected = labState.animationIds.includes(anim.id);
                const disabled =
                  !selected && labState.animationIds.length >= MAX_LAB_ANIMATIONS;
                const rel = getRelationStatus(labState.styleId, anim.id);

                return (
                  <button
                    key={anim.id}
                    type="button"
                    className="lab-rail-row"
                    data-active={selected}
                    disabled={disabled}
                    onClick={() => handleToggleAnimation(anim.id)}
                  >
                    <span className="lab-rail-row-left">
                      <span
                        className="lab-check-box"
                        data-checked={selected}
                        aria-hidden="true"
                      >
                        {selected && <Check size={9} strokeWidth={3} />}
                      </span>
                      <span className="lab-rail-row-name">
                        {formatNodeLabel(anim.id)}
                      </span>
                    </span>

                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                      {rel === "pairs" && (
                        <span className="badge badge-emerald rel-status-tag">PAIR</span>
                      )}
                      {rel === "clashes" && (
                        <span className="badge badge-crimson rel-status-tag">CLASH</span>
                      )}
                      {rel === "neutral" && (
                        <span className="badge rel-status-tag" style={{ opacity: 0.7 }}>
                          UNTESTED
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* RIGHT LIVE PREVIEW STAGE */}
        <div className="lab-stage-col">
          {/* Stage Utility Toolbar (always dark fui-tactical chrome) */}
          <div className="lab-toolbar">
            <div className="lab-active-chips">
              {labState.animationIds.length === 0 ? (
                <span className="fui-mono-label">
                  No animations mounted — pick up to {MAX_LAB_ANIMATIONS} from the left rail
                </span>
              ) : (
                labState.animationIds.map((animId) => {
                  const isAmbient = AMBIENT_BACKDROP_IDS.has(animId);
                  const isBackdrop = labState.backdropId === animId;
                  return (
                    <div key={animId} className="lab-active-chip" data-backdrop={isBackdrop}>
                      <span className="lab-active-chip-name">{animId}</span>
                      {isAmbient && (
                        <button
                          type="button"
                          className="lab-chip-mode-btn"
                          data-active={isBackdrop}
                          onClick={() => handleToggleBackdrop(animId)}
                          title={
                            isBackdrop
                              ? "Move back to standalone card slot"
                              : "Layer behind themed stage as ambient backdrop"
                          }
                        >
                          {isBackdrop ? "Backdrop" : "Card"}
                        </button>
                      )}
                      <button
                        type="button"
                        className="lab-chip-remove"
                        onClick={() => handleToggleAnimation(animId)}
                        aria-label={`Remove ${animId}`}
                      >
                        <X size={11} />
                      </button>
                    </div>
                  );
                })
              )}

              {labState.backdropId && (
                <label className="lab-opacity-control">
                  <span className="fui-mono-label">BG</span>
                  <input
                    type="range"
                    min={15}
                    max={100}
                    step={5}
                    value={Math.round(labState.backdropOpacity * 100)}
                    onChange={(e) => {
                      const val = Number(e.target.value) / 100;
                      onUpdateLabState((prev) => ({
                        ...prev,
                        backdropOpacity: val,
                      }));
                    }}
                    aria-label="Ambient backdrop opacity"
                  />
                  <span className="fui-mono-label" style={{ width: 28 }}>
                    {Math.round(labState.backdropOpacity * 100)}%
                  </span>
                </label>
              )}
            </div>

            <div className="lab-toolbar-right">
              <button
                type="button"
                className="btn-fui"
                style={{ height: 26, fontSize: 10, padding: "0 8px" }}
                onClick={() => setLabReplayEpoch((n) => n + 1)}
                title="Remount all active animations to replay entrance/mount effects"
              >
                <RotateCcw size={11} />
                <span>Replay All</span>
              </button>

              <div className="lab-vp-group" role="group" aria-label="Stage viewport size">
                {(
                  [
                    { id: "desktop", label: "Desktop", icon: Monitor },
                    { id: "card", label: "Card Focus", icon: Square },
                    { id: "mobile", label: "390px", icon: Smartphone },
                  ] as Array<{ id: LabViewportMode; label: string; icon: typeof Monitor }>
                ).map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    className="pill-btn rel-mini-pill"
                    data-active={labState.viewport === id}
                    onClick={() =>
                      onUpdateLabState((prev) => ({ ...prev, viewport: id }))
                    }
                    title={`Preview viewport: ${label}`}
                  >
                    <Icon size={11} style={{ marginRight: 4, verticalAlign: "-1px" }} />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Scrollable Stage Viewport Wrapper */}
          <div className="lab-stage-viewport">
            <div
              className="lab-stage-frame"
              data-viewport={labState.viewport}
            >
              {/* STRICTLY SCOPED THEMED STAGE CONTAINER */}
              <div
                className="lab-stage-scope"
                data-style-id={labState.styleId}
                data-light={theme.isLight}
                style={scopedStageStyle}
              >
                {/* Optional Full-Stage Ambient Backdrop */}
                {labState.backdropId && (
                  <LabBackdropLayer
                    animationId={labState.backdropId}
                    theme={theme}
                    opacity={labState.backdropOpacity}
                    motionEpoch={combinedEpoch}
                    reducedMotion={reducedMotion}
                  />
                )}

                {/* Stage Foreground Content */}
                <div className="lab-stage-content">
                  {/* Themed Stage Header Mockup */}
                  <header
                    className="lab-stage-header"
                    style={{
                      background: theme.surface,
                      color: theme.surfaceInk,
                      border: `${theme.borderWidth} solid ${theme.border}`,
                      borderRadius: theme.radius,
                      boxShadow: theme.shadow,
                      backdropFilter: theme.blur ? `blur(${theme.blur})` : undefined,
                    }}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          flexWrap: "wrap",
                          fontFamily: theme.fontMono,
                          fontSize: 10,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: theme.surfaceMuted,
                        }}
                      >
                        <span>{activeStyleNode?.cluster ?? "style"}</span>
                        <span>//</span>
                        <span>{labState.styleId}</span>
                        {activeStyleNode && (
                          <span
                            style={{
                              padding: "1px 6px",
                              borderRadius: theme.radius,
                              border: `1px solid ${theme.border}`,
                              color: theme.surfaceInk,
                            }}
                          >
                            {activeStyleNode.tier}
                          </span>
                        )}
                      </div>
                      <h2
                        style={{
                          margin: "5px 0 2px",
                          fontFamily: theme.fontHeading,
                          fontSize: labState.viewport === "mobile" ? 18 : 22,
                          fontWeight: 700,
                          letterSpacing: "-0.02em",
                          lineHeight: 1.12,
                          color: theme.surfaceInk,
                        }}
                      >
                        {formatNodeLabel(labState.styleId)}
                      </h2>
                      {clusterMeta && (
                        <p
                          style={{
                            margin: 0,
                            fontSize: 12,
                            color: theme.surfaceMuted,
                          }}
                        >
                          {clusterMeta.dna}
                        </p>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        flexWrap: "wrap",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          padding: "4px 8px",
                          borderRadius: theme.radius,
                          border: `1px solid ${theme.border}`,
                          background: theme.canvas,
                          color: theme.inkMuted,
                          fontFamily: theme.fontMono,
                          fontSize: 10,
                        }}
                      >
                        {theme.paletteDots.map((c, idx) => (
                          <span
                            key={idx}
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: 2,
                              background: c,
                              border: `1px solid ${theme.border}`,
                              display: "inline-block",
                            }}
                          />
                        ))}
                        <span>{theme.isLight ? "LIGHT" : "DARK"}</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => setLabReplayEpoch((n) => n + 1)}
                        style={{
                          appearance: "none",
                          cursor: "pointer",
                          padding: "6px 12px",
                          borderRadius: theme.radius,
                          border: `${theme.borderWidth} solid ${theme.borderStrong}`,
                          background: theme.accent,
                          color: theme.accentInk,
                          boxShadow:
                            labState.styleId === "neo-brutalism"
                              ? "2px 2px 0 #000000"
                              : undefined,
                          fontFamily: theme.fontMono,
                          fontSize: 11,
                          fontWeight: 600,
                          letterSpacing: "0.04em",
                        }}
                      >
                        SAMPLE CTA →
                      </button>
                    </div>
                  </header>

                  {/* Interactive Animation Slots (Only Actively Selected Animations Mounted) */}
                  {cardAnimationIds.length === 0 ? (
                    <div
                      className="lab-empty-stage"
                      style={{
                        background: theme.surface,
                        color: theme.surfaceMuted,
                        border: `${theme.borderWidth} dashed ${theme.borderStrong}`,
                        borderRadius: theme.radius,
                      }}
                    >
                      <Sparkles size={20} color={theme.accent} />
                      <div
                        style={{
                          fontFamily: theme.fontHeading,
                          fontSize: 15,
                          fontWeight: 600,
                          color: theme.surfaceInk,
                        }}
                      >
                        {labState.backdropId
                          ? `Ambient backdrop "${labState.backdropId}" active`
                          : "Ready to Compose"}
                      </div>
                      <div style={{ fontSize: 12, maxWidth: 360 }}>
                        {labState.backdropId
                          ? "Add 1–3 interactive foreground animations from the left rail to layer over this backdrop."
                          : "Select up to 4 animations from the left rail, load a hybrid recipe, or click Random Compatible."}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="lab-slots-grid"
                      data-count={cardAnimationIds.length}
                      data-viewport={labState.viewport}
                    >
                      {cardAnimationIds.map((animId) => {
                        const animNode = nodeById.get(animId);
                        const DemoComponent = animationDemoRegistry[animId];
                        const rel = getRelationStatus(labState.styleId, animId);
                        const isAmbient = AMBIENT_BACKDROP_IDS.has(animId);

                        const badgeStyle =
                          rel === "pairs"
                            ? {
                                color: theme.pairInk,
                                background: theme.pairBg,
                                border: `1px solid ${theme.pairBorder}`,
                              }
                            : rel === "clashes"
                              ? {
                                  color: theme.clashInk,
                                  background: theme.clashBg,
                                  border: `1px solid ${theme.clashBorder}`,
                                }
                              : {
                                  color: theme.untestedInk,
                                  background: theme.untestedBg,
                                  border: `1px solid ${theme.untestedBorder}`,
                                };

                        return (
                          <article
                            key={animId}
                            className="lab-anim-card"
                            style={{
                              background: theme.surface,
                              color: theme.surfaceInk,
                              border: `${theme.borderWidth} solid ${theme.border}`,
                              borderRadius: theme.radius,
                              boxShadow: theme.shadow,
                              backdropFilter: theme.blur
                                ? `blur(${theme.blur})`
                                : undefined,
                            }}
                          >
                            <div
                              className="lab-anim-card-head"
                              style={{
                                borderBottom: `1px solid ${theme.border}`,
                              }}
                            >
                              <div style={{ minWidth: 0 }}>
                                <div
                                  style={{
                                    fontFamily: theme.fontHeading,
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: theme.surfaceInk,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {formatNodeLabel(animId)}
                                </div>
                                <div
                                  style={{
                                    fontFamily: theme.fontMono,
                                    fontSize: 10,
                                    color: theme.surfaceMuted,
                                  }}
                                >
                                  {animNode?.kind === "animation"
                                    ? animNode.mechanic
                                    : animId}
                                </div>
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 5,
                                  flexShrink: 0,
                                }}
                              >
                                <span
                                  style={{
                                    ...badgeStyle,
                                    padding: "1px 6px",
                                    borderRadius: theme.radius,
                                    fontFamily: theme.fontMono,
                                    fontSize: 9,
                                    fontWeight: 600,
                                    letterSpacing: "0.04em",
                                  }}
                                >
                                  {rel === "pairs"
                                    ? "PAIR"
                                    : rel === "clashes"
                                      ? "CLASH"
                                      : "UNTESTED"}
                                </span>

                                {isAmbient && (
                                  <button
                                    type="button"
                                    onClick={() => handleToggleBackdrop(animId)}
                                    style={{
                                      appearance: "none",
                                      cursor: "pointer",
                                      padding: "2px 6px",
                                      borderRadius: theme.radius,
                                      border: `1px solid ${theme.border}`,
                                      background: theme.canvas,
                                      color: theme.ink,
                                      fontFamily: theme.fontMono,
                                      fontSize: 9,
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: 3,
                                    }}
                                    title="Use as full-stage ambient backdrop"
                                  >
                                    <Layers size={10} />
                                    <span>BG</span>
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={() => handleToggleAnimation(animId)}
                                  aria-label={`Remove ${animId}`}
                                  style={{
                                    appearance: "none",
                                    cursor: "pointer",
                                    width: 22,
                                    height: 22,
                                    borderRadius: theme.radius,
                                    border: `1px solid ${theme.border}`,
                                    background: theme.canvas,
                                    color: theme.ink,
                                    display: "grid",
                                    placeItems: "center",
                                  }}
                                >
                                  <X size={11} />
                                </button>
                              </div>
                            </div>

                            <div className="lab-anim-card-body">
                              {DemoComponent ? (
                                <DemoComponent
                                  key={`${animId}-${combinedEpoch}`}
                                  motionEpoch={combinedEpoch}
                                />
                              ) : (
                                <span style={{ fontFamily: theme.fontMono, fontSize: 11 }}>
                                  Demo unavailable for {animId}
                                </span>
                              )}
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PINNED BOTTOM COMPATIBILITY READOUT & EXPORT DOCK */}
      <footer className="lab-dock" aria-label="Compatibility and Export Dock">
        <div className="lab-dock-status">
          {evaluation.status === "HARMONIOUS" && (
            <span className="badge badge-emerald" data-testid="lab-compat-status">
              <CheckCircle2 size={12} />
              <span>HARMONIOUS</span>
            </span>
          )}
          {evaluation.status === "EXPERIMENTAL MIX" && (
            <span className="badge badge-cyan" data-testid="lab-compat-status">
              <Sparkles size={12} />
              <span>EXPERIMENTAL MIX</span>
            </span>
          )}
          {evaluation.status === "CLASH DETECTED" && (
            <span className="badge badge-crimson" data-testid="lab-compat-status">
              <AlertTriangle size={12} />
              <span>CLASH DETECTED</span>
            </span>
          )}

          <div className="lab-dock-detail">
            {evaluation.status === "CLASH DETECTED" ? (
              <span style={{ color: "var(--fui-signal-fault)" }}>
                Clashes:{" "}
                {evaluation.clashes.map((c) => `${c.a} × ${c.b}`).join(", ")}
              </span>
            ) : evaluation.status === "HARMONIOUS" ? (
              <span>
                {evaluation.pairs.length} verified compatible{" "}
                {evaluation.pairs.length === 1 ? "pairing" : "pairings"} with{" "}
                <strong>{labState.styleId}</strong>
              </span>
            ) : (
              <span>
                {labState.animationIds.length === 0
                  ? `Base style: ${labState.styleId}`
                  : `${evaluation.pairs.length} paired · ${evaluation.untested.length} untested (preview unlocked)`}
              </span>
            )}
          </div>
        </div>

        <div className="lab-dock-actions">
          <button
            type="button"
            className="btn-fui btn-fui-primary"
            onClick={() =>
              onCopy(
                buildLabShadcnCommand(labState.styleId, labState.animationIds),
                `Copied shadcn add (${1 + labState.animationIds.length} items)`
              )
            }
          >
            <Terminal size={12} />
            <span>Copy shadcn Add</span>
          </button>

          <button
            type="button"
            className="btn-fui"
            onClick={() =>
              onCopy(
                buildLabAgentPrompt(
                  labState.styleId,
                  labState.animationIds,
                  evaluation
                ),
                `Copied Agent Prompt for ${labState.styleId}`
              )
            }
          >
            <Copy size={12} />
            <span>Copy Agent Prompt</span>
          </button>

          <button
            type="button"
            className="btn-fui"
            onClick={() =>
              onCopy(
                buildLabShareUrl(labState),
                "Copied shareable Lab link"
              )
            }
          >
            <Link2 size={12} />
            <span>Copy Share Link</span>
          </button>
        </div>
      </footer>
    </section>
  );
}
