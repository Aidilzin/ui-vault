import { useMemo, useState } from "react";
import { Code2, Cpu, Terminal } from "lucide-react";
import {
  TIER_LIST,
  animationNodes,
  formatNodeLabel,
  getShadcnAddCommand,
  vaultRelations,
  type AnimationNode,
  type MechanicId,
  type TierId,
} from "../lib/vault-data";
import { LazyStage } from "./LazyStage";
import { animationDemoRegistry } from "../demos";

type SortMode = "newest" | "name" | "perfTier";

const PERF_RANK: Record<AnimationNode["perfTier"], number> = {
  low: 0,
  medium: 1,
  high: 2,
};

const PAGE_SIZE = 18;

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
  const [selectedTier, setSelectedTier] = useState<TierId | "all">("all");
  const [selectedPerf, setSelectedPerf] = useState<"all" | "low" | "medium">("all");
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const [visibleLimit, setVisibleLimit] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = animationNodes.filter((node) => {
      if (focusedAnimationId && node.id !== focusedAnimationId) return false;
      if (selectedMechanic !== "all" && node.mechanic !== selectedMechanic) {
        return false;
      }
      if (selectedTier !== "all" && node.tier !== selectedTier) {
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
        node.tier,
        node.perfTier,
        node.reducedMotion,
        ...node.engine,
        ...node.pairsWith,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });

    if (sortMode === "name") {
      return [...list].sort((a, b) => a.id.localeCompare(b.id));
    }
    if (sortMode === "perfTier") {
      return [...list].sort(
        (a, b) => PERF_RANK[a.perfTier] - PERF_RANK[b.perfTier] || a.id.localeCompare(b.id)
      );
    }
    return list;
  }, [searchQuery, selectedMechanic, selectedTier, selectedPerf, focusedAnimationId, sortMode]);

  const visibleItems = filtered.slice(0, visibleLimit);
  const hasMore = visibleItems.length < filtered.length;

  return (
    <section aria-label="Animations Lab">
      <div className="section-bar">
        <div>
          <h1 className="section-title">Animations Lab</h1>
          <p className="section-subtitle">
            All {animationNodes.length} primitives imported live from{" "}
            <code>../animations/</code> with viewport-aware mounting.
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
              {visibleItems.length} / {filtered.length} VISIBLE
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
            onClick={() => {
              setSelectedMechanic("all");
              setVisibleLimit(PAGE_SIZE);
            }}
          >
            all ({animationNodes.length})
          </button>
          {vaultRelations.mechanics.map((mech) => {
            const count = animationNodes.filter((a) => a.mechanic === mech).length;
            if (count === 0) return null;
            return (
              <button
                key={mech}
                type="button"
                className="pill-btn"
                data-active={selectedMechanic === mech}
                onClick={() => {
                  setSelectedMechanic(mech);
                  setVisibleLimit(PAGE_SIZE);
                }}
              >
                {mech} ({count})
              </button>
            );
          })}
        </div>

        <div className="filter-group">
          <span className="filter-label">Tier</span>
          <button
            type="button"
            className="pill-btn"
            data-active={selectedTier === "all"}
            onClick={() => {
              setSelectedTier("all");
              setVisibleLimit(PAGE_SIZE);
            }}
          >
            all
          </button>
          {TIER_LIST.map((tier) => {
            const count = animationNodes.filter((a) => a.tier === tier).length;
            return (
              <button
                key={tier}
                type="button"
                className="pill-btn"
                data-active={selectedTier === tier}
                onClick={() => {
                  setSelectedTier(tier);
                  setVisibleLimit(PAGE_SIZE);
                }}
              >
                {tier} ({count})
              </button>
            );
          })}

          <span className="filter-label" style={{ marginLeft: 8 }}>
            Perf
          </span>
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

          <span className="filter-label" style={{ marginLeft: 8 }}>
            Sort
          </span>
          {(["newest", "name", "perfTier"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              className="pill-btn"
              data-active={sortMode === mode}
              onClick={() => setSortMode(mode)}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          No animations match the active filters. Clear search or reset mechanic filter.
        </div>
      ) : (
        <>
          <div className="anim-grid">
            {visibleItems.map((anim) => {
              const cmd = getShadcnAddCommand(anim.registryItem);
              const DemoComponent = animationDemoRegistry[anim.id];

              return (
                <article key={anim.id} className="fui-card">
                  <div className="anim-card-header">
                    <div>
                      <h2 className="anim-card-title">{formatNodeLabel(anim.id)}</h2>
                      <div className="anim-card-id">{anim.id}</div>
                    </div>

                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end" }}>
                      <span
                        className={`badge ${
                          anim.tier === "production"
                            ? "badge-emerald"
                            : anim.tier === "viral"
                              ? "badge-cyan"
                              : "badge-amber"
                        }`}
                      >
                        {anim.tier}
                      </span>
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

                  <LazyStage>
                    {DemoComponent ? (
                      <DemoComponent motionEpoch={motionEpoch} />
                    ) : (
                      <div className="fui-mono-label">Preview not configured for {anim.id}</div>
                    )}
                  </LazyStage>

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

          {hasMore && (
            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 20 }}>
              <button
                type="button"
                className="btn-fui btn-fui-primary"
                onClick={() => setVisibleLimit((n) => n + PAGE_SIZE)}
              >
                <span>Load More ({filtered.length - visibleItems.length} remaining)</span>
              </button>
              <button
                type="button"
                className="btn-fui"
                onClick={() => setVisibleLimit(filtered.length)}
              >
                <span>Show All ({filtered.length})</span>
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
