import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  GitFork,
  Layers,
  RotateCcw,
  Terminal,
} from "lucide-react";
import {
  animationNodes,
  formatNodeLabel,
  getHybridBundleCommand,
  getRelationStatus,
  getShadcnAddCommand,
  nodeById,
  styleNodes,
  vaultRelations,
} from "../lib/vault-data";

interface RelationsExplorerProps {
  searchQuery: string;
  onCopy: (text: string, label: string) => void;
  onJumpToNode: (nodeId: string) => void;
}

export function RelationsExplorer({
  searchQuery,
  onCopy,
  onJumpToNode,
}: RelationsExplorerProps) {
  const [selectedId, setSelectedId] = useState<string | null>("fui-tactical");

  const q = searchQuery.trim().toLowerCase();

  const visibleStyles = useMemo(() => {
    if (!q) return styleNodes;
    return styleNodes.filter((n) =>
      `${n.id} ${n.cluster} ${formatNodeLabel(n.id)}`.toLowerCase().includes(q)
    );
  }, [q]);

  const visibleAnimations = useMemo(() => {
    if (!q) return animationNodes;
    return animationNodes.filter((n) =>
      `${n.id} ${n.mechanic} ${n.engine.join(" ")} ${formatNodeLabel(n.id)}`
        .toLowerCase()
        .includes(q)
    );
  }, [q]);

  const selectedNode = selectedId ? nodeById.get(selectedId) ?? null : null;

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
    <section aria-label="Relations and Hybrids Explorer">
      <div className="section-bar">
        <div>
          <h1 className="section-title">Relations &amp; Hybrids</h1>
          <p className="section-subtitle">
            Powered directly by <code>../relations.json</code>. Click any style or animation node to highlight compatible pairings in emerald and clashes in crimson.
          </p>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <span className="badge badge-cyan">ACTIVE</span>
          <span className="badge badge-emerald">PAIRS WITH</span>
          <span className="badge badge-crimson">CLASHES WITH</span>
        </div>
      </div>

      {/* Inspector status strip */}
      <div className="filter-row" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <GitFork size={14} color="#38bdf8" />
          {selectedNode ? (
            <>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600 }}>
                {selectedNode.id}
              </span>
              <span className="badge">{selectedNode.kind}</span>
              <span className="badge badge-emerald">
                <CheckCircle2 size={10} />
                {pairCount} compatible
              </span>
              <span className="badge badge-crimson">
                <AlertTriangle size={10} />
                {clashCount} clashing
              </span>
            </>
          ) : (
            <span className="fui-mono-label">Select any node below to inspect compatibility</span>
          )}
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {selectedNode && (
            <>
              <button
                type="button"
                className="btn-fui"
                onClick={() => onJumpToNode(selectedNode.id)}
              >
                <span>Open {selectedNode.kind === "style" ? "Style Spec" : "Live Demo"}</span>
              </button>
              <button
                type="button"
                className="btn-fui btn-fui-primary"
                onClick={copySelectedPairBundle}
              >
                <Terminal size={12} />
                <span>Copy Paired Bundle CLI</span>
              </button>
              <button
                type="button"
                className="btn-fui"
                onClick={() => setSelectedId(null)}
              >
                <RotateCcw size={11} />
                <span>Clear</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Two-column interactive node matrix */}
      <div className="relations-layout">
        <div className="fui-card" style={{ padding: 14 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
              paddingBottom: 8,
              borderBottom: "1px solid var(--fui-border)",
            }}
          >
            <span className="fui-mono-label" style={{ color: "var(--fui-ink)" }}>
              Styles ({visibleStyles.length})
            </span>
            <span className="fui-mono-label">Click to inspect</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {visibleStyles.map((style) => {
              const status = getRelationStatus(selectedId, style.id);
              const dimmed = Boolean(selectedId) && status === "neutral";
              return (
                <button
                  key={style.id}
                  type="button"
                  className="rel-node-btn"
                  data-status={status}
                  data-dimmed={dimmed}
                  onClick={() =>
                    setSelectedId((prev) => (prev === style.id ? null : style.id))
                  }
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>
                      {formatNodeLabel(style.id)}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "var(--fui-ink-muted)",
                      }}
                    >
                      {style.id} // {style.cluster}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    {status === "selected" && <span className="badge badge-cyan">SELECTED</span>}
                    {status === "pairs" && <span className="badge badge-emerald">PAIRS</span>}
                    {status === "clashes" && <span className="badge badge-crimson">CLASHES</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="fui-card" style={{ padding: 14 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
              paddingBottom: 8,
              borderBottom: "1px solid var(--fui-border)",
            }}
          >
            <span className="fui-mono-label" style={{ color: "var(--fui-ink)" }}>
              Animations ({visibleAnimations.length})
            </span>
            <span className="fui-mono-label">Mechanic + Engine</span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 6,
            }}
          >
            {visibleAnimations.map((anim) => {
              const status = getRelationStatus(selectedId, anim.id);
              const dimmed = Boolean(selectedId) && status === "neutral";
              return (
                <button
                  key={anim.id}
                  type="button"
                  className="rel-node-btn"
                  data-status={status}
                  data-dimmed={dimmed}
                  onClick={() =>
                    setSelectedId((prev) => (prev === anim.id ? null : anim.id))
                  }
                >
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatNodeLabel(anim.id)}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "var(--fui-ink-muted)",
                      }}
                    >
                      {anim.mechanic}
                    </div>
                  </div>
                  {status === "selected" && <span className="badge badge-cyan">SEL</span>}
                  {status === "pairs" && <span className="badge badge-emerald">PAIR</span>}
                  {status === "clashes" && <span className="badge badge-crimson">CLASH</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Proven Hybrid Recipes */}
      <div className="cluster-header" style={{ marginTop: 28 }}>
        <div className="cluster-title-wrap">
          <Layers size={15} color="#38bdf8" />
          <h2 className="cluster-label">Proven Hybrid Recipes</h2>
        </div>
        <span className="cluster-dna">
          Tested multi-style + motion stacks with one-click bundle install
        </span>
      </div>

      <div className="hybrids-grid">
        {vaultRelations.hybrids.map((hybrid) => {
          const bundleCmd = getHybridBundleCommand(hybrid);
          return (
            <article key={hybrid.id} className="fui-card" style={{ padding: 14, gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <div>
                  <div className="fui-mono-label" style={{ color: "var(--fui-signal-active)" }}>
                    RECIPE // {hybrid.id}
                  </div>
                  <h3 style={{ margin: "3px 0 0", fontSize: 15, fontWeight: 600 }}>
                    {hybrid.name}
                  </h3>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <span className="filter-label" style={{ marginRight: 0 }}>
                    Base:
                  </span>
                  <button
                    type="button"
                    className="rel-chip rel-chip-pair"
                    onClick={() => setSelectedId(hybrid.baseStyle)}
                  >
                    {hybrid.baseStyle}
                  </button>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
                  <span className="filter-label" style={{ marginRight: 0 }}>
                    Accents:
                  </span>
                  {hybrid.accents.map((acc) => (
                    <button
                      key={acc}
                      type="button"
                      className="pill-btn"
                      style={{ padding: "2px 7px", fontSize: 10 }}
                      onClick={() => setSelectedId(acc)}
                    >
                      + {acc}
                    </button>
                  ))}
                </div>
              </div>

              <p style={{ margin: 0, fontSize: 12, color: "var(--fui-ink-muted)", flex: 1 }}>
                <strong style={{ color: "var(--fui-ink)" }}>Best for:</strong> {hybrid.bestFor}
              </p>

              <div
                style={{
                  padding: "8px 10px",
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

              <button
                type="button"
                className="btn-fui btn-fui-primary"
                style={{ width: "100%" }}
                onClick={() => onCopy(bundleCmd, `Copied bundle CLI for ${hybrid.name}`)}
              >
                <Terminal size={12} />
                <span>Copy Combined Bundle CLI</span>
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
