import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  FlaskConical,
  GitFork,
  Layers,
  RotateCcw,
  Search,
  Terminal,
  X,
} from "lucide-react";
import {
  animationNodes,
  clusterList,
  formatNodeLabel,
  getHybridBundleCommand,
  getRelationStatus,
  getShadcnAddCommand,
  nodeById,
  styleNodes,
  vaultRelations,
  type ClusterId,
  type HybridRecipe,
  type MechanicId,
  type RelationStatus,
} from "../lib/vault-data";
import { resolveStyleTheme } from "../lib/style-theme";

type RelationsSubView = "graph" | "hybrids";
type RelationFilterMode = "all" | "matches" | "pairs" | "clashes";

const RELATION_RANK: Record<RelationStatus, number> = {
  selected: 0,
  pairs: 1,
  clashes: 2,
  neutral: 3,
};

interface RelationsExplorerProps {
  searchQuery: string;
  onClearGlobalSearch: () => void;
  onCopy: (text: string, label: string) => void;
  onJumpToNode: (nodeId: string) => void;
  onOpenNodeInLab: (nodeId: string) => void;
  onOpenHybridInLab: (hybrid: HybridRecipe) => void;
}

export function RelationsExplorer({
  searchQuery,
  onClearGlobalSearch,
  onCopy,
  onJumpToNode,
  onOpenNodeInLab,
  onOpenHybridInLab,
}: RelationsExplorerProps) {
  const [subView, setSubView] = useState<RelationsSubView>("graph");
  const [selectedId, setSelectedId] = useState<string | null>("fui-tactical");
  const [relationFilter, setRelationFilter] = useState<RelationFilterMode>("all");

  // Independent per-column filters
  const [styleSearch, setStyleSearch] = useState("");
  const [styleCluster, setStyleCluster] = useState<ClusterId | "all">("all");
  const [animSearch, setAnimSearch] = useState("");
  const [animMechanic, setAnimMechanic] = useState<MechanicId | "all">("all");
  const [hybridSearch, setHybridSearch] = useState("");

  const globalQ = searchQuery.trim().toLowerCase();
  const selectedNode = selectedId ? nodeById.get(selectedId) ?? null : null;

  const matchesRelationFilter = (status: RelationStatus): boolean => {
    if (!selectedId || relationFilter === "all") return true;
    if (status === "selected") return true;
    if (relationFilter === "matches") {
      return status === "pairs" || status === "clashes";
    }
    if (relationFilter === "pairs") return status === "pairs";
    if (relationFilter === "clashes") return status === "clashes";
    return true;
  };

  const visibleStyles = useMemo(() => {
    const q = styleSearch.trim().toLowerCase();
    const filtered = styleNodes.filter((n) => {
      if (styleCluster !== "all" && n.cluster !== styleCluster) return false;
      const status = getRelationStatus(selectedId, n.id);
      if (!matchesRelationFilter(status)) return false;
      const hay = `${n.id} ${n.cluster} ${n.tier} ${formatNodeLabel(n.id)}`.toLowerCase();
      if (q && !hay.includes(q)) return false;
      return true;
    });

    if (!selectedId) return filtered;
    return [...filtered].sort((a, b) => {
      const ra = RELATION_RANK[getRelationStatus(selectedId, a.id)];
      const rb = RELATION_RANK[getRelationStatus(selectedId, b.id)];
      if (ra !== rb) return ra - rb;
      return a.id.localeCompare(b.id);
    });
  }, [styleSearch, styleCluster, selectedId, relationFilter]);

  const visibleAnimations = useMemo(() => {
    const q = animSearch.trim().toLowerCase();
    const filtered = animationNodes.filter((n) => {
      if (animMechanic !== "all" && n.mechanic !== animMechanic) return false;
      const status = getRelationStatus(selectedId, n.id);
      if (!matchesRelationFilter(status)) return false;
      const hay = `${n.id} ${n.mechanic} ${n.tier} ${n.engine.join(" ")} ${formatNodeLabel(n.id)}`.toLowerCase();
      if (q && !hay.includes(q)) return false;
      return true;
    });

    if (!selectedId) return filtered;
    return [...filtered].sort((a, b) => {
      const ra = RELATION_RANK[getRelationStatus(selectedId, a.id)];
      const rb = RELATION_RANK[getRelationStatus(selectedId, b.id)];
      if (ra !== rb) return ra - rb;
      return a.id.localeCompare(b.id);
    });
  }, [animSearch, animMechanic, selectedId, relationFilter]);

  const visibleHybrids = useMemo(() => {
    const q = (hybridSearch.trim() || globalQ).toLowerCase();
    if (!q) return vaultRelations.hybrids;
    return vaultRelations.hybrids.filter((h) =>
      `${h.id} ${h.name} ${h.baseStyle} ${h.accents.join(" ")} ${h.bestFor}`
        .toLowerCase()
        .includes(q)
    );
  }, [hybridSearch, globalQ]);

  const pairCount = useMemo(() => {
    if (!selectedId) return 0;
    return vaultRelations.nodes.filter(
      (n) => getRelationStatus(selectedId, n.id) === "pairs"
    ).length;
  }, [selectedId]);

  const clashCount = useMemo(() => {
    if (!selectedId) return 0;
    return vaultRelations.nodes.filter(
      (n) => getRelationStatus(selectedId, n.id) === "clashes"
    ).length;
  }, [selectedId]);

  const copySelectedPairBundle = () => {
    if (!selectedNode) return;
    const pairedNodes = vaultRelations.nodes.filter(
      (n) => getRelationStatus(selectedNode.id, n.id) === "pairs"
    );
    const items = [
      selectedNode.registryItem,
      ...pairedNodes.map((n) => n.registryItem),
    ];
    onCopy(
      getShadcnAddCommand(items),
      `Copied ${selectedNode.id} + ${pairedNodes.length} paired items`
    );
  };

  return (
    <section
      className="rel-workbench"
      aria-label="Relations and Hybrids Explorer"
    >
      {/* Compact Header + Sub-view Switcher */}
      <div className="rel-top-bar">
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <h1 className="section-title" style={{ fontSize: 16 }}>
            Relations &amp; Hybrids
          </h1>
          <div className="rel-subview-tabs" role="tablist" aria-label="Relations sub-view">
            <button
              type="button"
              role="tab"
              aria-selected={subView === "graph"}
              className="pill-btn"
              data-active={subView === "graph"}
              onClick={() => setSubView("graph")}
            >
              <GitFork size={11} style={{ marginRight: 5, verticalAlign: "-1px" }} />
              Graph Explorer
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={subView === "hybrids"}
              className="pill-btn"
              data-active={subView === "hybrids"}
              onClick={() => setSubView("hybrids")}
            >
              <Layers size={11} style={{ marginRight: 5, verticalAlign: "-1px" }} />
              Proven Hybrids ({vaultRelations.hybrids.length})
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          {globalQ && (
            <button
              type="button"
              className="badge badge-amber"
              style={{ cursor: "pointer" }}
              onClick={onClearGlobalSearch}
              title="Relations uses independent column search. Click to clear top-bar search."
            >
              <span>Top search: "{searchQuery}"</span>
              <X size={10} />
            </button>
          )}
          <span className="badge badge-cyan">ACTIVE</span>
          <span className="badge badge-emerald">PAIRS</span>
          <span className="badge badge-crimson">CLASHES</span>
        </div>
      </div>

      {subView === "graph" ? (
        <>
          {/* Pinned Compact Inspector Bar */}
          <div className="rel-inspector-bar">
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", minWidth: 0 }}>
              <GitFork size={13} color="#38bdf8" style={{ flexShrink: 0 }} />
              {selectedNode ? (
                <>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--fui-ink)",
                    }}
                  >
                    {selectedNode.id}
                  </span>
                  <span className="badge">{selectedNode.kind}</span>
                  <span className="badge badge-emerald">
                    <CheckCircle2 size={10} />
                    {pairCount} pairs
                  </span>
                  <span className="badge badge-crimson">
                    <AlertTriangle size={10} />
                    {clashCount} clashes
                  </span>
                </>
              ) : (
                <span className="fui-mono-label">
                  Select any style or animation below to pin its pairings to the top
                </span>
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              {/* Relation filter pills */}
              <div className="rel-filter-group" role="group" aria-label="Filter by compatibility">
                {(
                  [
                    { id: "all", label: "All" },
                    { id: "matches", label: "Matches Only" },
                    { id: "pairs", label: "Pairs" },
                    { id: "clashes", label: "Clashes" },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="pill-btn"
                    style={{ padding: "3px 8px", fontSize: 10 }}
                    data-active={relationFilter === item.id}
                    disabled={!selectedId && item.id !== "all"}
                    onClick={() => setRelationFilter(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {selectedNode && (
                <>
                  <button
                    type="button"
                    className="btn-fui btn-fui-primary"
                    onClick={() => onOpenNodeInLab(selectedNode.id)}
                  >
                    <FlaskConical size={12} />
                    <span>Open in Lab →</span>
                  </button>
                  <button
                    type="button"
                    className="btn-fui"
                    onClick={() => onJumpToNode(selectedNode.id)}
                    title={`Open ${selectedNode.kind === "style" ? "Style Spec" : "Live Demo"}`}
                  >
                    <ArrowUpRight size={12} />
                    <span>{selectedNode.kind === "style" ? "Spec" : "Demo"}</span>
                  </button>
                  <button
                    type="button"
                    className="btn-fui"
                    onClick={copySelectedPairBundle}
                    title="Copy shadcn CLI command for selected node + all paired nodes"
                  >
                    <Terminal size={12} />
                    <span>Paired CLI</span>
                  </button>
                  <button
                    type="button"
                    className="btn-fui"
                    onClick={() => {
                      setSelectedId(null);
                      setRelationFilter("all");
                    }}
                    title="Clear selection"
                  >
                    <RotateCcw size={11} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Viewport-Locked Side-by-Side Independent Scroll Panels */}
          <div className="rel-columns">
            {/* LEFT PANEL: STYLES */}
            <div className="fui-card rel-pane">
              <div className="rel-pane-header">
                <div className="rel-pane-title-row">
                  <span className="fui-mono-label" style={{ color: "var(--fui-ink)" }}>
                    Styles ({visibleStyles.length}/{styleNodes.length})
                  </span>
                  <div className="rel-pane-search-wrap">
                    <Search size={11} className="rel-pane-search-icon" />
                    <input
                      type="text"
                      className="rel-pane-search"
                      value={styleSearch}
                      onChange={(e) => setStyleSearch(e.target.value)}
                      placeholder="Filter styles..."
                      aria-label="Filter styles column"
                    />
                    {styleSearch && (
                      <button
                        type="button"
                        className="rel-pane-search-clear"
                        onClick={() => setStyleSearch("")}
                        aria-label="Clear style filter"
                      >
                        <X size={10} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="rel-chip-strip">
                  <button
                    type="button"
                    className="pill-btn rel-mini-pill"
                    data-active={styleCluster === "all"}
                    onClick={() => setStyleCluster("all")}
                  >
                    all
                  </button>
                  {clusterList.map((cl) => (
                    <button
                      key={cl.id}
                      type="button"
                      className="pill-btn rel-mini-pill"
                      data-active={styleCluster === cl.id}
                      onClick={() => setStyleCluster(cl.id)}
                      title={`${cl.id}: ${cl.label}`}
                    >
                      {cl.id.slice(0, 2)} · {cl.label.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rel-pane-scroll" data-testid="relations-styles-scroll">
                {visibleStyles.length === 0 ? (
                  <div className="rel-empty-inline">
                    No styles match current filter.
                  </div>
                ) : (
                  <div className="rel-dense-list">
                    {visibleStyles.map((style) => {
                      const status = getRelationStatus(selectedId, style.id);
                      const dimmed = Boolean(selectedId) && status === "neutral";
                      const theme = resolveStyleTheme(style.id);
                      return (
                        <button
                          key={style.id}
                          type="button"
                          className="rel-dense-row"
                          data-status={status}
                          data-dimmed={dimmed}
                          onClick={() =>
                            setSelectedId((prev) => (prev === style.id ? null : style.id))
                          }
                        >
                          <div className="rel-dense-left">
                            <span
                              className="rel-swatch-dots"
                              aria-hidden="true"
                              title={`${theme.canvas} / ${theme.accent}`}
                            >
                              <span style={{ background: theme.canvas }} />
                              <span style={{ background: theme.accent }} />
                            </span>
                            <span className="rel-dense-name">
                              {formatNodeLabel(style.id)}
                            </span>
                            <span className="rel-dense-meta">
                              {style.cluster.slice(0, 2)}
                            </span>
                          </div>

                          <div className="rel-dense-right">
                            <span
                              className={`tier-dot tier-dot-${style.tier}`}
                              title={`Tier: ${style.tier}`}
                            />
                            {status === "selected" && (
                              <span className="badge badge-cyan rel-status-tag">SEL</span>
                            )}
                            {status === "pairs" && (
                              <span className="badge badge-emerald rel-status-tag">PAIR</span>
                            )}
                            {status === "clashes" && (
                              <span className="badge badge-crimson rel-status-tag">CLASH</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT PANEL: ANIMATIONS */}
            <div className="fui-card rel-pane">
              <div className="rel-pane-header">
                <div className="rel-pane-title-row">
                  <span className="fui-mono-label" style={{ color: "var(--fui-ink)" }}>
                    Animations ({visibleAnimations.length}/{animationNodes.length})
                  </span>
                  <div className="rel-pane-search-wrap">
                    <Search size={11} className="rel-pane-search-icon" />
                    <input
                      type="text"
                      className="rel-pane-search"
                      value={animSearch}
                      onChange={(e) => setAnimSearch(e.target.value)}
                      placeholder="Filter animations..."
                      aria-label="Filter animations column"
                    />
                    {animSearch && (
                      <button
                        type="button"
                        className="rel-pane-search-clear"
                        onClick={() => setAnimSearch("")}
                        aria-label="Clear animation filter"
                      >
                        <X size={10} />
                      </button>
                    )}
                  </div>
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
              </div>

              <div className="rel-pane-scroll" data-testid="relations-anims-scroll">
                {visibleAnimations.length === 0 ? (
                  <div className="rel-empty-inline">
                    No animations match current filter.
                  </div>
                ) : (
                  <div className="rel-anim-dense-grid">
                    {visibleAnimations.map((anim) => {
                      const status = getRelationStatus(selectedId, anim.id);
                      const dimmed = Boolean(selectedId) && status === "neutral";
                      return (
                        <button
                          key={anim.id}
                          type="button"
                          className="rel-dense-row"
                          data-status={status}
                          data-dimmed={dimmed}
                          onClick={() =>
                            setSelectedId((prev) => (prev === anim.id ? null : anim.id))
                          }
                        >
                          <div className="rel-dense-left">
                            <span className="rel-dense-name">
                              {formatNodeLabel(anim.id)}
                            </span>
                            <span className="rel-dense-meta">{anim.mechanic}</span>
                          </div>

                          <div className="rel-dense-right">
                            <span
                              className={`tier-dot tier-dot-${anim.tier}`}
                              title={`Tier: ${anim.tier}`}
                            />
                            {status === "selected" && (
                              <span className="badge badge-cyan rel-status-tag">SEL</span>
                            )}
                            {status === "pairs" && (
                              <span className="badge badge-emerald rel-status-tag">PAIR</span>
                            )}
                            {status === "clashes" && (
                              <span className="badge badge-crimson rel-status-tag">CLASH</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        /* PROVEN HYBRIDS SUB-VIEW */
        <div className="rel-hybrids-pane">
          <div className="rel-hybrids-toolbar">
            <span className="fui-mono-label" style={{ color: "var(--fui-ink-muted)" }}>
              {visibleHybrids.length} curated multi-style + motion recipes — load any recipe directly in Labs
            </span>
            <div className="rel-pane-search-wrap" style={{ width: 220 }}>
              <Search size={11} className="rel-pane-search-icon" />
              <input
                type="text"
                className="rel-pane-search"
                value={hybridSearch}
                onChange={(e) => setHybridSearch(e.target.value)}
                placeholder="Filter hybrid recipes..."
                aria-label="Filter hybrid recipes"
              />
              {hybridSearch && (
                <button
                  type="button"
                  className="rel-pane-search-clear"
                  onClick={() => setHybridSearch("")}
                  aria-label="Clear hybrid search"
                >
                  <X size={10} />
                </button>
              )}
            </div>
          </div>

          <div className="rel-hybrids-scroll">
            <div className="hybrids-grid">
              {visibleHybrids.map((hybrid) => {
                const bundleCmd = getHybridBundleCommand(hybrid);
                return (
                  <article
                    key={hybrid.id}
                    className="fui-card"
                    style={{ padding: 14, gap: 10 }}
                  >
                    <div>
                      <div
                        className="fui-mono-label"
                        style={{ color: "var(--fui-signal-active)" }}
                      >
                        RECIPE // {hybrid.id}
                      </div>
                      <h3 style={{ margin: "3px 0 0", fontSize: 15, fontWeight: 600 }}>
                        {hybrid.name}
                      </h3>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        <span className="filter-label" style={{ marginRight: 0 }}>
                          Base:
                        </span>
                        <button
                          type="button"
                          className="rel-chip rel-chip-pair"
                          onClick={() => {
                            setSelectedId(hybrid.baseStyle);
                            setSubView("graph");
                          }}
                        >
                          {hybrid.baseStyle}
                        </button>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
                        <span className="filter-label" style={{ marginRight: 0 }}>
                          Accents:
                        </span>
                        {hybrid.accents.map((acc) => {
                          const kind = nodeById.get(acc)?.kind;
                          return (
                            <button
                              key={acc}
                              type="button"
                              className="pill-btn"
                              style={{ padding: "2px 7px", fontSize: 10 }}
                              onClick={() => {
                                setSelectedId(acc);
                                setSubView("graph");
                              }}
                              title={kind ? `Inspect ${kind}: ${acc}` : acc}
                            >
                              + {acc}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <p style={{ margin: 0, fontSize: 12, color: "var(--fui-ink-muted)", flex: 1 }}>
                      <strong style={{ color: "var(--fui-ink)" }}>Best for:</strong>{" "}
                      {hybrid.bestFor}
                    </p>

                    <div
                      style={{
                        padding: "7px 9px",
                        background: "var(--fui-canvas)",
                        border: "1px solid var(--fui-border)",
                        borderRadius: 3,
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "var(--fui-ink-muted)",
                        wordBreak: "break-all",
                      }}
                    >
                      {bundleCmd}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      <button
                        type="button"
                        className="btn-fui btn-fui-primary"
                        onClick={() => onOpenHybridInLab(hybrid)}
                      >
                        <FlaskConical size={12} />
                        <span>Open in Lab →</span>
                      </button>
                      <button
                        type="button"
                        className="btn-fui"
                        onClick={() =>
                          onCopy(bundleCmd, `Copied bundle CLI for ${hybrid.name}`)
                        }
                      >
                        <Terminal size={12} />
                        <span>Copy CLI</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
