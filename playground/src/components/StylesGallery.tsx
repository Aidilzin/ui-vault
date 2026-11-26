import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import {
  TIER_LIST,
  clusterList,
  formatNodeLabel,
  getShadcnAddCommand,
  nodeById,
  styleNodes,
  styleRawById,
  type ClusterId,
  type StyleNode,
  type TierId,
} from "../lib/vault-data";
import { parseStyleMarkdown } from "../lib/markdown";
import { StyleSwatch } from "./StyleSwatches";

interface StylesGalleryProps {
  searchQuery: string;
  activeStyleId: string | null;
  onSelectStyle: (styleId: string | null) => void;
  onCopy: (text: string, label: string) => void;
  onJumpToNode: (nodeId: string) => void;
}

function buildAgentPrompt(style: StyleNode, title: string): string {
  const paired = style.pairsWith.join(", ");
  const clashes = style.clashesWith.join(", ") || "none";
  return [
    `Apply the "${title}" (${style.id}) design system from ui-vault.`,
    `- Style spec: ${style.path}`,
    `- Install style via CLI: ${getShadcnAddCommand(style.registryItem)}`,
    `- Recommended paired animations: ${paired}`,
    `- Avoid clashing aesthetics/mechanics: ${clashes}`,
    `Strictly follow the Core Tokens & Surfaces, Typography & Layout, and Forbidden Anti-Patterns defined in ${style.path}.`,
  ].join("\n");
}

export function StylesGallery({
  searchQuery,
  activeStyleId,
  onSelectStyle,
  onCopy,
  onJumpToNode,
}: StylesGalleryProps) {
  const [selectedCluster, setSelectedCluster] = useState<ClusterId | "all">("all");
  const [selectedTier, setSelectedTier] = useState<TierId | "all">("all");
  const [sortByName, setSortByName] = useState(false);

  useEffect(() => {
    if (!activeStyleId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onSelectStyle(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeStyleId, onSelectStyle]);

  const parsedStyles = useMemo(() => {
    const map = new Map<string, ReturnType<typeof parseStyleMarkdown>>();
    for (const style of styleNodes) {
      map.set(style.id, parseStyleMarkdown(styleRawById[style.id] ?? ""));
    }
    return map;
  }, []);

  const filteredClusters = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return clusterList
      .filter((cluster) => selectedCluster === "all" || cluster.id === selectedCluster)
      .map((cluster) => {
        let styles = cluster.styles
          .map((id) => nodeById.get(id))
          .filter((n): n is StyleNode => Boolean(n && n.kind === "style"))
          .filter((style) => {
            if (selectedTier !== "all" && style.tier !== selectedTier) return false;
            if (!q) return true;
            const doc = parsedStyles.get(style.id);
            const hay = [
              style.id,
              style.tier,
              doc?.title ?? "",
              doc?.summary ?? "",
              cluster.id,
              cluster.label,
              cluster.dna,
              ...style.pairsWith,
            ]
              .join(" ")
              .toLowerCase();
            return hay.includes(q);
          });
        if (sortByName) {
          styles = [...styles].sort((a, b) => a.id.localeCompare(b.id));
        }
        return { cluster, styles };
      })
      .filter((entry) => entry.styles.length > 0);
  }, [searchQuery, parsedStyles, selectedCluster, selectedTier, sortByName]);

  const activeStyle = activeStyleId
    ? (nodeById.get(activeStyleId) as StyleNode | undefined)
    : undefined;
  const activeDoc = activeStyle ? parsedStyles.get(activeStyle.id) : undefined;

  return (
    <section aria-label="Styles Gallery">
      <div className="section-bar">
        <div>
          <h1 className="section-title">Styles Gallery</h1>
          <p className="section-subtitle">
            {styleNodes.length} aesthetic systems grouped across{" "}
            {clusterList.filter((c) => c.styles.length > 0).length} active clusters. Click any swatch to inspect its full <code>STYLE.md</code> specification.
          </p>
        </div>
        <span className="badge badge-cyan">
          {clusterList.filter((c) => c.styles.length > 0).length} CLUSTERS // {styleNodes.length} STYLES
        </span>
      </div>

      <div className="filter-row">
        <div className="filter-group">
          <span className="filter-label">Cluster</span>
          <button
            type="button"
            className="pill-btn"
            data-active={selectedCluster === "all"}
            onClick={() => setSelectedCluster("all")}
          >
            all ({styleNodes.length})
          </button>
          {clusterList.map((cluster) => {
            if (cluster.styles.length === 0) return null;
            return (
              <button
                key={cluster.id}
                type="button"
                className="pill-btn"
                data-active={selectedCluster === cluster.id}
                onClick={() => setSelectedCluster(cluster.id)}
              >
                {cluster.label} ({cluster.styles.length})
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
            onClick={() => setSelectedTier("all")}
          >
            all
          </button>
          {TIER_LIST.map((tier) => {
            const count = styleNodes.filter((s) => s.tier === tier).length;
            return (
              <button
                key={tier}
                type="button"
                className="pill-btn"
                data-active={selectedTier === tier}
                onClick={() => setSelectedTier(tier)}
              >
                {tier} ({count})
              </button>
            );
          })}

          <span className="filter-label" style={{ marginLeft: 8 }}>
            Sort
          </span>
          <button
            type="button"
            className="pill-btn"
            data-active={!sortByName}
            onClick={() => setSortByName(false)}
          >
            curated
          </button>
          <button
            type="button"
            className="pill-btn"
            data-active={sortByName}
            onClick={() => setSortByName(true)}
          >
            name
          </button>
        </div>
      </div>

      {filteredClusters.length === 0 ? (
        <div className="empty-state">No styles match "{searchQuery}".</div>
      ) : (
        filteredClusters.map(({ cluster, styles }) => (
          <div key={cluster.id} className="cluster-section">
            <div className="cluster-header">
              <div className="cluster-title-wrap">
                <span className="cluster-code">{cluster.id}</span>
                <h2 className="cluster-label">{cluster.label}</h2>
              </div>
              <span className="cluster-dna">DNA: {cluster.dna}</span>
            </div>

            <div className="styles-grid">
              {styles.map((style) => {
                const doc = parsedStyles.get(style.id);
                return (
                  <article
                    key={style.id}
                    className="fui-card style-card"
                    onClick={() => onSelectStyle(style.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSelectStyle(style.id);
                      }
                    }}
                  >
                    <div className="style-swatch-frame">
                      <StyleSwatch styleId={style.id} />
                    </div>

                    <div className="anim-card-meta">
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
                        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>
                          {doc?.title ?? formatNodeLabel(style.id)}
                        </h3>
                        <span
                          className={`badge ${
                            style.tier === "production"
                              ? "badge-emerald"
                              : style.tier === "viral"
                                ? "badge-cyan"
                                : "badge-amber"
                          }`}
                        >
                          {style.tier}
                        </span>
                      </div>

                      {doc?.summary && (
                        <p style={{ margin: 0, fontSize: 12, color: "var(--fui-ink-muted)" }}>
                          {doc.summary}
                        </p>
                      )}

                      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
                        <span className="filter-label" style={{ marginRight: 2 }}>
                          Pairs:
                        </span>
                        {style.pairsWith.map((pid) => (
                          <span key={pid} className="badge badge-emerald">
                            {pid}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ))
      )}

      {activeStyle && activeDoc && (
        <div
          className="drawer-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeDoc.title} specification`}
          onClick={(e) => {
            if (e.target === e.currentTarget) onSelectStyle(null);
          }}
        >
          <div className="drawer-panel">
            <div className="drawer-header">
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--fui-signal-active)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {activeStyle.cluster} // {activeStyle.path}
                </div>
                <h2 style={{ margin: "2px 0 0", fontSize: 17, fontWeight: 600 }}>
                  {activeDoc.title}
                </h2>
              </div>
              <button
                type="button"
                className="btn-fui"
                onClick={() => onSelectStyle(null)}
              >
                <X size={13} />
                <span>Close</span>
              </button>
            </div>

            <div className="drawer-body">
              <div
                style={{
                  height: 172,
                  borderRadius: 4,
                  overflow: "hidden",
                  border: "1px solid var(--fui-border-strong)",
                  flexShrink: 0,
                }}
              >
                <StyleSwatch styleId={activeStyle.id} />
              </div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="btn-fui btn-fui-primary"
                  onClick={() =>
                    onCopy(
                      getShadcnAddCommand(activeStyle.registryItem),
                      `Copied CLI for ${activeStyle.id}`
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
                      buildAgentPrompt(activeStyle, activeDoc.title),
                      `Copied Agent Prompt for ${activeStyle.id}`
                    )
                  }
                >
                  <Sparkles size={12} />
                  <span>Copy Agent Prompt</span>
                </button>
              </div>

              {activeDoc.summary && (
                <p style={{ margin: 0, fontSize: 13, color: "var(--fui-ink)" }}>
                  {activeDoc.summary}
                </p>
              )}

              <div
                style={{
                  padding: 12,
                  background: "var(--fui-canvas)",
                  border: "1px solid var(--fui-border)",
                  borderRadius: 4,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                  <span className="filter-label" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <CheckCircle2 size={11} color="#34d399" />
                    Pairs With:
                  </span>
                  {activeStyle.pairsWith.map((pid) => (
                    <button
                      key={pid}
                      type="button"
                      className="rel-chip rel-chip-pair"
                      onClick={() => onJumpToNode(pid)}
                    >
                      + {pid}
                    </button>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                  <span className="filter-label" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <AlertTriangle size={11} color="#f43f5e" />
                    Clashes With:
                  </span>
                  {activeStyle.clashesWith.length === 0 ? (
                    <span className="badge">none</span>
                  ) : (
                    activeStyle.clashesWith.map((cid) => (
                      <button
                        key={cid}
                        type="button"
                        className="rel-chip rel-chip-clash"
                        onClick={() => onJumpToNode(cid)}
                      >
                        ! {cid}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {activeDoc.sections.map((section) => {
                const isForbidden = section.heading.toLowerCase().includes("forbidden");
                return (
                  <div
                    key={section.heading}
                    style={{
                      padding: 14,
                      background: isForbidden
                        ? "rgba(244, 63, 94, 0.05)"
                        : "var(--fui-canvas)",
                      border: `1px solid ${
                        isForbidden ? "rgba(244, 63, 94, 0.28)" : "var(--fui-border)"
                      }`,
                      borderRadius: 4,
                    }}
                  >
                    <h3
                      style={{
                        margin: "0 0 8px",
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: isForbidden
                          ? "var(--fui-signal-fault)"
                          : "var(--fui-signal-active)",
                      }}
                    >
                      {section.heading}
                    </h3>

                    {section.paragraphs.map((p, idx) => (
                      <p key={idx} style={{ margin: "0 0 8px", fontSize: 13 }}>
                        {p}
                      </p>
                    ))}

                    {section.bullets.length > 0 && (
                      <ul
                        style={{
                          margin: 0,
                          paddingLeft: 18,
                          display: "flex",
                          flexDirection: "column",
                          gap: 6,
                          fontSize: 13,
                        }}
                      >
                        {section.bullets.map((b, idx) => (
                          <li key={idx} style={{ color: "var(--fui-ink)" }}>
                            {b.label && (
                              <strong style={{ color: "#ffffff" }}>{b.label}: </strong>
                            )}
                            <span style={{ color: "var(--fui-ink-muted)" }}>{b.text}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
