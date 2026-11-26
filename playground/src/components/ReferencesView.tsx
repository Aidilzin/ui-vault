import { useMemo } from "react";
import { Copy, ExternalLink, Package } from "lucide-react";
import { bookmarksMarkdown, vaultRelations } from "../lib/vault-data";
import { parseBookmarksMarkdown } from "../lib/markdown";

interface ReferencesViewProps {
  searchQuery: string;
  onCopy: (text: string, label: string) => void;
}

export function ReferencesView({ searchQuery, onCopy }: ReferencesViewProps) {
  const categories = useMemo(() => parseBookmarksMarkdown(bookmarksMarkdown), []);

  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return categories;
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) =>
          `${cat.title} ${item.name} ${item.url} ${item.note}`
            .toLowerCase()
            .includes(q)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [categories, searchQuery]);

  const registriesObj = useMemo(() => {
    const entries: Record<string, string> = {};
    for (const [key, url] of Object.entries(vaultRelations.externalRegistries)) {
      entries[`@${key}`] = url;
    }
    return entries;
  }, []);

  const componentsJsonSnippet = useMemo(
    () =>
      JSON.stringify(
        {
          registries: registriesObj,
        },
        null,
        2
      ),
    [registriesObj]
  );

  return (
    <section aria-label="References and External Registries">
      <div className="section-bar">
        <div>
          <h1 className="section-title">References &amp; External Registries</h1>
          <p className="section-subtitle">
            Curated galleries and motion dictionaries parsed live from{" "}
            <code>../references/bookmarks.md</code> plus external shadcn registries from{" "}
            <code>../relations.json</code>.
          </p>
        </div>
        <span className="badge badge-cyan">
          {Object.keys(vaultRelations.externalRegistries).length} REGISTRIES
        </span>
      </div>

      {/* External Registries Panel */}
      <div className="fui-card" style={{ padding: 16, marginBottom: 24, gap: 14 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Package size={15} color="#38bdf8" />
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>
              External shadcn Registries
            </h2>
          </div>

          <button
            type="button"
            className="btn-fui btn-fui-primary"
            onClick={() =>
              onCopy(componentsJsonSnippet, "Copied components.json registries snippet")
            }
          >
            <Copy size={12} />
            <span>Copy components.json Snippet</span>
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 10,
          }}
        >
          {Object.entries(registriesObj).map(([handle, template]) => (
            <div
              key={handle}
              style={{
                padding: "10px 12px",
                background: "var(--fui-canvas)",
                border: "1px solid var(--fui-border)",
                borderRadius: 3,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--fui-signal-active)",
                }}
              >
                {handle}
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--fui-ink-muted)",
                  wordBreak: "break-all",
                }}
              >
                {template}
              </div>
            </div>
          ))}
        </div>

        <pre className="code-block" style={{ fontSize: 11 }}>
          <code>{componentsJsonSnippet}</code>
        </pre>
      </div>

      {/* Curated Bookmarks */}
      {filteredCategories.length === 0 ? (
        <div className="empty-state">No references match "{searchQuery}".</div>
      ) : (
        <div className="refs-grid">
          {filteredCategories.map((category) => (
            <article key={category.title} className="fui-card" style={{ padding: 14, gap: 10 }}>
              <div
                style={{
                  paddingBottom: 8,
                  borderBottom: "1px solid var(--fui-border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>
                  {category.title}
                </h2>
                <span className="badge">{category.items.length}</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {category.items.map((item) => (
                  <a
                    key={item.url}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "block",
                      padding: "9px 10px",
                      background: "var(--fui-canvas)",
                      border: "1px solid var(--fui-border)",
                      borderRadius: 3,
                      textDecoration: "none",
                      transition: "border-color 120ms ease",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fui-ink)" }}>
                        {item.name}
                      </span>
                      <ExternalLink size={12} color="#8b94a3" />
                    </div>
                    {item.note && (
                      <div
                        style={{
                          marginTop: 3,
                          fontSize: 11,
                          color: "var(--fui-ink-muted)",
                        }}
                      >
                        {item.note}
                      </div>
                    )}
                    <div
                      style={{
                        marginTop: 4,
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "var(--fui-ink-faint)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.url}
                    </div>
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
