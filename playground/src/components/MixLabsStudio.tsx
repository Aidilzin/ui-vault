import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Copy,
  Dices,
  Eye,
  Flame,
  Grid2x2,
  LayoutGrid,
  Link2,
  Maximize2,
  Minimize2,
  Monitor,
  RefreshCw,
  RotateCcw,
  Search,
  Smartphone,
  Sparkles,
  Tablet,
  Terminal,
  Trash2,
  Type,
  X,
} from "lucide-react";
import {
  TIER_LIST,
  animationNodes,
  clusterList,
  formatNodeLabel,
  getRelationStatus,
  layoutNodes,
  nodeById,
  styleNodes,
  telemetryNodes,
  textureNodes,
  typographyNodes,
  vaultRelations,
  type ClusterId,
  type MechanicId,
  type TierId,
  type TypographyNode,
} from "../lib/vault-data";
import { resolveStyleTheme } from "../lib/style-theme";
import { loadGoogleFonts } from "../lib/font-loader";
import {
  MAX_LAB_ANIMATIONS,
  MAX_LAB_TELEMETRY,
  buildLabAgentPrompt,
  buildLabShadcnCommand,
  buildLabShareUrl,
  evaluateLabMix,
  pickChaosMix,
  pickRandomCompatibleMix,
  resolveHybridToLabMix,
  type LabState,
  type LabTemplateId,
  type LabViewportMode,
} from "../lib/lab-helpers";
import { getSlotBadgeLabel, resolveLabSlots } from "../lib/lab-slots";
import { DummySitePreview } from "./DummySitePreview";

interface MixLabsStudioProps {
  labState: LabState;
  onUpdateLabState: (updater: (prev: LabState) => LabState) => void;
  motionEpoch: number;
  reducedMotion: boolean;
  onCopy: (text: string, label: string) => void;
}

const TEMPLATE_OPTIONS: Array<{ id: LabTemplateId; label: string }> = [
  { id: "landing", label: "SaaS Landing" },
  { id: "workbench", label: "AI Workbench" },
  { id: "editorial", label: "Editorial" },
];

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
  const [layoutOpen, setLayoutOpen] = useState(false);
  const [textureOpen, setTextureOpen] = useState(false);
  const [typographyOpen, setTypographyOpen] = useState(false);
  const [telemetryOpen, setTelemetryOpen] = useState(false);
  const [telemetrySeed, setTelemetrySeed] = useState(0);

  const [animSearch, setAnimSearch] = useState("");
  const [animMechanic, setAnimMechanic] = useState<MechanicId | "all">("all");
  const [pairsFirst, setPairsFirst] = useState(true);
  const [labReplayEpoch, setLabReplayEpoch] = useState(0);
  const [selectedPresetId, setSelectedPresetId] = useState("");
  const [inspectSlots, setInspectSlots] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!labState.typographyId) return;
    const node = nodeById.get(labState.typographyId) as TypographyNode | undefined;
    if (node?.kind === "typography") {
      loadGoogleFonts(node.googleFontsUrl);
    }
  }, [labState.typographyId]);

  const theme = useMemo(
    () => resolveStyleTheme(labState.styleId),
    [labState.styleId]
  );

  const slots = useMemo(
    () => resolveLabSlots(labState.animationIds),
    [labState.animationIds]
  );

  const evaluation = useMemo(
    () =>
      evaluateLabMix(
        labState.styleId,
        labState.animationIds,
        labState.textureId,
        labState.typographyId,
        labState.layoutId,
        labState.telemetryIds
      ),
    [
      labState.styleId,
      labState.animationIds,
      labState.textureId,
      labState.typographyId,
      labState.layoutId,
      labState.telemetryIds,
    ]
  );

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

  const rankAgainstStyle = (id: string) => {
    const st = getRelationStatus(labState.styleId, id);
    if (st === "pairs") return 0;
    if (st === "neutral") return 1;
    return 2;
  };

  const sortedLayouts = useMemo(
    () => [...layoutNodes].sort((a, b) => rankAgainstStyle(a.id) - rankAgainstStyle(b.id)),
    [labState.styleId]
  );

  const sortedTextures = useMemo(
    () => [...textureNodes].sort((a, b) => rankAgainstStyle(a.id) - rankAgainstStyle(b.id)),
    [labState.styleId]
  );

  const sortedTypography = useMemo(
    () => [...typographyNodes].sort((a, b) => rankAgainstStyle(a.id) - rankAgainstStyle(b.id)),
    [labState.styleId]
  );

  const sortedTelemetry = useMemo(
    () => [...telemetryNodes].sort((a, b) => rankAgainstStyle(a.id) - rankAgainstStyle(b.id)),
    [labState.styleId]
  );

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

    return [...list].sort(
      (a, b) =>
        rankAgainstStyle(a.id) - rankAgainstStyle(b.id) || a.id.localeCompare(b.id)
    );
  }, [animSearch, animMechanic, pairsFirst, labState.styleId]);

  const toggleCluster = (clusterId: ClusterId) => {
    setCollapsedClusters((prev) => ({ ...prev, [clusterId]: !prev[clusterId] }));
  };

  const handleSelectStyle = (styleId: string) => {
    setSelectedPresetId("");
    onUpdateLabState((prev) => ({ ...prev, styleId }));
  };

  const handleSelectLayout = (layoutId: string | null) => {
    setSelectedPresetId("");
    onUpdateLabState((prev) => ({ ...prev, layoutId }));
  };

  const handleSelectTexture = (textureId: string | null) => {
    setSelectedPresetId("");
    const tex = textureId
      ? textureNodes.find((t) => t.id === textureId)
      : undefined;
    onUpdateLabState((prev) => ({
      ...prev,
      textureId,
      textureOpacity: tex ? tex.defaultOpacity : prev.textureOpacity,
    }));
  };

  const handleSelectTypography = (typographyId: string | null) => {
    setSelectedPresetId("");
    if (typographyId) {
      const typo = typographyNodes.find((t) => t.id === typographyId);
      if (typo) loadGoogleFonts(typo.googleFontsUrl);
    }
    onUpdateLabState((prev) => ({ ...prev, typographyId }));
  };

  const handleToggleTelemetry = (telId: string) => {
    setSelectedPresetId("");
    onUpdateLabState((prev) => {
      const exists = prev.telemetryIds.includes(telId);
      if (exists) {
        return {
          ...prev,
          telemetryIds: prev.telemetryIds.filter((id) => id !== telId),
        };
      }
      if (prev.telemetryIds.length >= MAX_LAB_TELEMETRY) return prev;
      return {
        ...prev,
        telemetryIds: [...prev.telemetryIds, telId],
      };
    });
  };

  const handleToggleAnimation = (animId: string) => {
    setSelectedPresetId("");
    onUpdateLabState((prev) => {
      const exists = prev.animationIds.includes(animId);
      if (exists) {
        return {
          ...prev,
          animationIds: prev.animationIds.filter((id) => id !== animId),
        };
      }
      if (prev.animationIds.length >= MAX_LAB_ANIMATIONS) return prev;
      return {
        ...prev,
        animationIds: [...prev.animationIds, animId],
      };
    });
  };

  const handleApplyHybrid = (hybridId: string) => {
    setSelectedPresetId(hybridId);
    const hybrid = vaultRelations.hybrids.find((h) => h.id === hybridId);
    if (!hybrid) return;
    const mix = resolveHybridToLabMix(hybrid);
    onUpdateLabState((prev) => ({
      ...prev,
      styleId: mix.styleId,
      layoutId: mix.layoutId,
      animationIds: mix.animationIds,
      textureId: mix.textureId,
      textureOpacity: mix.textureOpacity ?? prev.textureOpacity,
      typographyId: mix.typographyId,
      telemetryIds: mix.telemetryIds,
      template: mix.suggestedTemplate ?? prev.template,
    }));
  };

  const handleRandomCompatible = () => {
    setSelectedPresetId("");
    const mix = pickRandomCompatibleMix(labState.styleId);
    onUpdateLabState((prev) => ({
      ...prev,
      styleId: mix.styleId,
      animationIds: mix.animationIds,
    }));
  };

  const handleChaosMix = () => {
    setSelectedPresetId("");
    const mix = pickChaosMix(labState.styleId);
    onUpdateLabState((prev) => ({
      ...prev,
      styleId: mix.styleId,
      animationIds: mix.animationIds,
    }));
  };

  const handleClearLayers = () => {
    setSelectedPresetId("");
    onUpdateLabState((prev) => ({
      ...prev,
      layoutId: null,
      animationIds: [],
      textureId: null,
      typographyId: null,
      telemetryIds: [],
    }));
  };

  const combinedEpoch = motionEpoch + labReplayEpoch;
  const totalShadcnItems =
    1 +
    (labState.layoutId ? 1 : 0) +
    (labState.textureId ? 1 : 0) +
    (labState.typographyId ? 1 : 0) +
    labState.telemetryIds.length +
    labState.animationIds.length;

  return (
    <section className="lab-studio" aria-label="Labs Mix and Match Studio">
      <div className="lab-workspace" data-expanded={expanded}>
        {/* LEFT CONTROL RAIL */}
        {!expanded && (
          <aside className="lab-rail" aria-label="Lab Controls">
            {/* Quick Presets */}
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
                >
                  <Dices size={12} />
                  <span>Random Compatible</span>
                </button>
                <button
                  type="button"
                  className="btn-fui lab-btn-chaos"
                  style={{ fontSize: 10, padding: "0 8px" }}
                  onClick={handleChaosMix}
                >
                  <Flame size={12} />
                  <span>Chaos Mix</span>
                </button>
                <button
                  type="button"
                  className="btn-fui"
                  style={{ fontSize: 10, padding: "0 7px" }}
                  onClick={handleClearLayers}
                  title="Clear active layout, texture, typography, telemetry & animations"
                  aria-label="Clear active layers"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>

            {/* 1. Base Style */}
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
                          <span>
                            {cluster.id.slice(0, 2)} · {cluster.label}
                          </span>
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
                                <span className={`tier-dot tier-dot-${style.tier}`} />
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

            {/* 2. Layout Shell (Collapsible) */}
            <div className="lab-rail-section">
              <button
                type="button"
                className="lab-collapse-toggle"
                onClick={() => setLayoutOpen((v) => !v)}
                aria-expanded={layoutOpen}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                  {layoutOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  <LayoutGrid size={11} />
                  <span className="fui-mono-label" style={{ color: "var(--fui-ink)" }}>
                    2. Layout Shell
                  </span>
                </span>
                <span
                  className={`badge ${labState.layoutId ? "badge-emerald" : ""}`}
                  style={{ fontSize: 9 }}
                >
                  {labState.layoutId ?? "Auto"}
                </span>
              </button>

              {layoutOpen && (
                <div className="lab-compact-list">
                  <button
                    type="button"
                    className="lab-rail-row"
                    data-active={labState.layoutId === null}
                    onClick={() => handleSelectLayout(null)}
                  >
                    <span className="lab-rail-row-name">Auto / Template Default</span>
                  </button>
                  {sortedLayouts.map((lay) => {
                    const active = labState.layoutId === lay.id;
                    const rel = getRelationStatus(labState.styleId, lay.id);
                    return (
                      <button
                        key={lay.id}
                        type="button"
                        className="lab-rail-row"
                        data-active={active}
                        onClick={() => handleSelectLayout(lay.id)}
                      >
                        <span className="lab-rail-row-left">
                          <span className="lab-rail-row-name">{lay.name}</span>
                        </span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                          {rel === "pairs" && (
                            <span className="badge badge-emerald rel-status-tag">PAIR</span>
                          )}
                          {rel === "clashes" && (
                            <span className="badge badge-crimson rel-status-tag">CLASH</span>
                          )}
                          <span className={`tier-dot tier-dot-${lay.tier}`} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 3. Surface Texture (Collapsible) */}
            <div className="lab-rail-section">
              <button
                type="button"
                className="lab-collapse-toggle"
                onClick={() => setTextureOpen((v) => !v)}
                aria-expanded={textureOpen}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                  {textureOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  <Grid2x2 size={11} />
                  <span className="fui-mono-label" style={{ color: "var(--fui-ink)" }}>
                    3. Surface Texture
                  </span>
                </span>
                <span
                  className={`badge ${labState.textureId ? "badge-cyan" : ""}`}
                  style={{ fontSize: 9 }}
                >
                  {labState.textureId ?? "None"}
                </span>
              </button>

              {labState.textureId && (
                <label className="lab-texture-opacity-bar">
                  <span className="fui-mono-label">OPACITY</span>
                  <input
                    type="range"
                    min={0.04}
                    max={0.45}
                    step={0.01}
                    value={labState.textureOpacity}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      onUpdateLabState((prev) => ({ ...prev, textureOpacity: val }));
                    }}
                    aria-label="Surface texture opacity"
                  />
                  <span className="fui-mono-label" style={{ minWidth: 28, textAlign: "right" }}>
                    {Math.round(labState.textureOpacity * 100)}%
                  </span>
                </label>
              )}

              {textureOpen && (
                <div className="lab-compact-list">
                  <button
                    type="button"
                    className="lab-rail-row"
                    data-active={labState.textureId === null}
                    onClick={() => handleSelectTexture(null)}
                  >
                    <span className="lab-rail-row-name">None (Style Ground)</span>
                  </button>
                  {sortedTextures.map((tex) => {
                    const active = labState.textureId === tex.id;
                    const rel = getRelationStatus(labState.styleId, tex.id);
                    return (
                      <button
                        key={tex.id}
                        type="button"
                        className="lab-rail-row"
                        data-active={active}
                        onClick={() => handleSelectTexture(tex.id)}
                      >
                        <span className="lab-rail-row-left">
                          <span className="lab-rail-row-name">{tex.name}</span>
                        </span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                          {rel === "pairs" && (
                            <span className="badge badge-emerald rel-status-tag">PAIR</span>
                          )}
                          {rel === "clashes" && (
                            <span className="badge badge-crimson rel-status-tag">CLASH</span>
                          )}
                          <span className={`tier-dot tier-dot-${tex.tier}`} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 4. Typography Override (Collapsible) */}
            <div className="lab-rail-section">
              <button
                type="button"
                className="lab-collapse-toggle"
                onClick={() => setTypographyOpen((v) => !v)}
                aria-expanded={typographyOpen}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                  {typographyOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  <Type size={11} />
                  <span className="fui-mono-label" style={{ color: "var(--fui-ink)" }}>
                    4. Typography
                  </span>
                </span>
                <span
                  className={`badge ${labState.typographyId ? "badge-amber" : ""}`}
                  style={{ fontSize: 9 }}
                >
                  {labState.typographyId ?? "Style Default"}
                </span>
              </button>

              {typographyOpen && (
                <div className="lab-compact-list">
                  <button
                    type="button"
                    className="lab-rail-row"
                    data-active={labState.typographyId === null}
                    onClick={() => handleSelectTypography(null)}
                  >
                    <span className="lab-rail-row-name">Style Default</span>
                  </button>
                  {sortedTypography.map((typo) => {
                    const active = labState.typographyId === typo.id;
                    const rel = getRelationStatus(labState.styleId, typo.id);
                    return (
                      <button
                        key={typo.id}
                        type="button"
                        className="lab-rail-row"
                        data-active={active}
                        onClick={() => handleSelectTypography(typo.id)}
                      >
                        <span className="lab-rail-row-left">
                          <span className="lab-rail-row-name">{typo.name}</span>
                        </span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                          {rel === "pairs" && (
                            <span className="badge badge-emerald rel-status-tag">PAIR</span>
                          )}
                          {rel === "clashes" && (
                            <span className="badge badge-crimson rel-status-tag">CLASH</span>
                          )}
                          <span className={`tier-dot tier-dot-${typo.tier}`} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 5. Telemetry Stack (Collapsible, max 3) */}
            <div className="lab-rail-section">
              <button
                type="button"
                className="lab-collapse-toggle"
                onClick={() => setTelemetryOpen((v) => !v)}
                aria-expanded={telemetryOpen}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                  {telemetryOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  <Activity size={11} />
                  <span className="fui-mono-label" style={{ color: "var(--fui-ink)" }}>
                    5. Telemetry
                  </span>
                </span>
                <span
                  className={`badge ${
                    labState.telemetryIds.length >= MAX_LAB_TELEMETRY
                      ? "badge-amber"
                      : labState.telemetryIds.length > 0
                        ? "badge-cyan"
                        : ""
                  }`}
                  style={{ fontSize: 9 }}
                >
                  {labState.telemetryIds.length}/{MAX_LAB_TELEMETRY}
                </span>
              </button>

              {telemetryOpen && (
                <div className="lab-compact-list">
                  {sortedTelemetry.map((tel) => {
                    const selected = labState.telemetryIds.includes(tel.id);
                    const disabled =
                      !selected && labState.telemetryIds.length >= MAX_LAB_TELEMETRY;
                    const rel = getRelationStatus(labState.styleId, tel.id);
                    return (
                      <button
                        key={tel.id}
                        type="button"
                        className="lab-rail-row"
                        data-active={selected}
                        disabled={disabled}
                        onClick={() => handleToggleTelemetry(tel.id)}
                      >
                        <span className="lab-rail-row-left">
                          <span
                            className="lab-check-box"
                            data-checked={selected}
                            aria-hidden="true"
                          >
                            {selected && <Check size={9} strokeWidth={3} />}
                          </span>
                          <span className="lab-rail-row-name">{tel.name}</span>
                        </span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                          {rel === "pairs" && (
                            <span className="badge badge-emerald rel-status-tag">PAIR</span>
                          )}
                          {rel === "clashes" && (
                            <span className="badge badge-crimson rel-status-tag">CLASH</span>
                          )}
                          <span className={`tier-dot tier-dot-${tel.tier}`} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 6. Animation Stack */}
            <div className="lab-rail-section">
              <div className="lab-rail-section-head">
                <span className="fui-mono-label" style={{ color: "var(--fui-ink)" }}>
                  6. Animation Stack
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <button
                    type="button"
                    className="pill-btn rel-mini-pill"
                    data-active={pairsFirst}
                    onClick={() => setPairsFirst((v) => !v)}
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

                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          flexShrink: 0,
                        }}
                      >
                        {selected && (
                          <span className="badge badge-cyan rel-status-tag">
                            {getSlotBadgeLabel(anim.id)}
                          </span>
                        )}
                        {rel === "pairs" && (
                          <span className="badge badge-emerald rel-status-tag">PAIR</span>
                        )}
                        {rel === "clashes" && (
                          <span className="badge badge-crimson rel-status-tag">CLASH</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        )}

        {/* RIGHT LIVE MOCK BROWSER PREVIEW */}
        <div className="lab-stage-col">
          <div className="dummy-browser-chrome">
            <div className="dummy-browser-left">
              <div className="dummy-traffic-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="dummy-browser-url" title="Live preview address">
                https://preview.ui-vault.dev/{labState.styleId}/
                {labState.layoutId ?? labState.template}
              </div>
            </div>

            <div className="dummy-browser-controls">
              <div className="lab-vp-group" role="tablist" aria-label="Website content theme">
                {TEMPLATE_OPTIONS.map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    role="tab"
                    aria-selected={labState.template === tpl.id}
                    className="pill-btn rel-mini-pill"
                    data-active={labState.template === tpl.id}
                    onClick={() =>
                      onUpdateLabState((prev) => ({ ...prev, template: tpl.id }))
                    }
                  >
                    {tpl.label}
                  </button>
                ))}
              </div>

              <div className="lab-vp-group" role="group" aria-label="Browser viewport size">
                {(
                  [
                    { id: "desktop", label: "Desktop", icon: Monitor },
                    { id: "tablet", label: "768px", icon: Tablet },
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
                  >
                    <Icon size={11} style={{ marginRight: 3, verticalAlign: "-1px" }} />
                    {label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="pill-btn rel-mini-pill"
                data-active={inspectSlots}
                onClick={() => setInspectSlots((v) => !v)}
              >
                <Eye size={11} style={{ marginRight: 4, verticalAlign: "-1px" }} />
                Inspect Slots
              </button>

              <button
                type="button"
                className="btn-fui"
                style={{ height: 24, fontSize: 10, padding: "0 7px" }}
                onClick={() => setLabReplayEpoch((n) => n + 1)}
              >
                <RotateCcw size={11} />
                <span>Replay</span>
              </button>

              <button
                type="button"
                className="btn-fui"
                style={{ height: 24, fontSize: 10, padding: "0 7px" }}
                onClick={() => setExpanded((v) => !v)}
                aria-label={expanded ? "Collapse preview" : "Expand preview"}
              >
                {expanded ? <Minimize2 size={11} /> : <Maximize2 size={11} />}
                <span>{expanded ? "Rail" : "Expand"}</span>
              </button>
            </div>
          </div>

          {/* Active Layer Chips */}
          <div className="lab-toolbar" style={{ padding: "5px 10px" }}>
            <div className="lab-active-chips">
              {labState.layoutId && (
                <div className="lab-active-chip" data-backdrop="true">
                  <span className="lab-chip-slot-pill">LAY</span>
                  <span className="lab-active-chip-name">{labState.layoutId}</span>
                  <button
                    type="button"
                    className="lab-chip-remove"
                    onClick={() => handleSelectLayout(null)}
                    aria-label={`Remove layout ${labState.layoutId}`}
                  >
                    <X size={11} />
                  </button>
                </div>
              )}

              {labState.textureId && (
                <div className="lab-active-chip" data-backdrop="true">
                  <span className="lab-chip-slot-pill">TEX</span>
                  <span className="lab-active-chip-name">
                    {labState.textureId} ({Math.round(labState.textureOpacity * 100)}%)
                  </span>
                  <button
                    type="button"
                    className="lab-chip-remove"
                    onClick={() => handleSelectTexture(null)}
                    aria-label={`Remove texture ${labState.textureId}`}
                  >
                    <X size={11} />
                  </button>
                </div>
              )}

              {labState.typographyId && (
                <div className="lab-active-chip" data-backdrop="true">
                  <span className="lab-chip-slot-pill">TYPE</span>
                  <span className="lab-active-chip-name">{labState.typographyId}</span>
                  <button
                    type="button"
                    className="lab-chip-remove"
                    onClick={() => handleSelectTypography(null)}
                    aria-label={`Remove typography ${labState.typographyId}`}
                  >
                    <X size={11} />
                  </button>
                </div>
              )}

              {labState.telemetryIds.map((telId) => (
                <div key={telId} className="lab-active-chip" data-backdrop="true">
                  <span className="lab-chip-slot-pill">TEL</span>
                  <span className="lab-active-chip-name">{telId}</span>
                  <button
                    type="button"
                    className="lab-chip-remove"
                    onClick={() => handleToggleTelemetry(telId)}
                    aria-label={`Remove telemetry ${telId}`}
                  >
                    <X size={11} />
                  </button>
                </div>
              ))}

              {labState.telemetryIds.length > 0 && (
                <button
                  type="button"
                  className="pill-btn rel-mini-pill"
                  onClick={() => setTelemetrySeed((n) => n + 1)}
                  title="Simulate live telemetry data"
                >
                  <RefreshCw size={10} style={{ marginRight: 4, verticalAlign: "-1px" }} />
                  Simulate
                </button>
              )}

              {labState.animationIds.map((animId) => (
                <div key={animId} className="lab-active-chip">
                  <span className="lab-active-chip-name">{animId}</span>
                  <span className="lab-chip-slot-pill">
                    {getSlotBadgeLabel(animId)}
                  </span>
                  <button
                    type="button"
                    className="lab-chip-remove"
                    onClick={() => handleToggleAnimation(animId)}
                    aria-label={`Remove ${animId}`}
                  >
                    <X size={11} />
                  </button>
                </div>
              ))}

              {slots.heroBgPrimary && (
                <label className="lab-opacity-control">
                  <span className="fui-mono-label">HERO BG</span>
                  <input
                    type="range"
                    min={15}
                    max={95}
                    step={5}
                    value={Math.round(labState.backdropOpacity * 100)}
                    onChange={(e) => {
                      const val = Number(e.target.value) / 100;
                      onUpdateLabState((prev) => ({ ...prev, backdropOpacity: val }));
                    }}
                    aria-label="Hero backdrop opacity"
                  />
                  <span className="fui-mono-label" style={{ width: 28 }}>
                    {Math.round(labState.backdropOpacity * 100)}%
                  </span>
                </label>
              )}
            </div>
          </div>

          {/* Mock Browser Canvas Frame */}
          <div className="dummy-browser-canvas">
            <div className="dummy-browser-frame" data-viewport={labState.viewport}>
              <DummySitePreview
                theme={theme}
                layoutId={labState.layoutId}
                textureId={labState.textureId}
                textureOpacity={labState.textureOpacity}
                typographyId={labState.typographyId}
                telemetryIds={labState.telemetryIds}
                telemetrySeed={telemetrySeed}
                onSimulateTelemetry={() => setTelemetrySeed((n) => n + 1)}
                template={labState.template}
                viewport={labState.viewport}
                slots={slots}
                backdropOpacity={labState.backdropOpacity}
                inspectSlots={inspectSlots}
                epoch={combinedEpoch}
                reducedMotion={reducedMotion}
                onReplay={() => setLabReplayEpoch((n) => n + 1)}
              />
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
                <strong>{labState.styleId}</strong> ({theme.profile})
              </span>
            ) : (
              <span>
                {`${evaluation.pairs.length} paired · ${evaluation.untested.length} untested (preview unlocked)`}
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
                buildLabShadcnCommand(
                  labState.styleId,
                  labState.animationIds,
                  labState.textureId,
                  labState.typographyId,
                  labState.layoutId,
                  labState.telemetryIds
                ),
                `Copied shadcn add (${totalShadcnItems} items)`
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
                  evaluation,
                  labState.template,
                  labState.textureId,
                  labState.textureOpacity,
                  labState.typographyId,
                  labState.layoutId,
                  labState.telemetryIds
                ),
                `Copied 6-Layer Agent Prompt for ${labState.styleId}`
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
              onCopy(buildLabShareUrl(labState), "Copied shareable Lab link")
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
