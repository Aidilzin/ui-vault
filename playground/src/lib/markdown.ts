export interface ParsedStyleDoc {
  title: string;
  summary: string;
  frontmatter: Record<string, string>;
  sections: {
    heading: string;
    bullets: { label?: string; text: string }[];
    paragraphs: string[];
  }[];
}

export function parseStyleMarkdown(raw: string): ParsedStyleDoc {
  const normalized = raw.replace(/\r\n/g, "\n").trim();
  const frontmatter: Record<string, string> = {};
  let body = normalized;

  if (normalized.startsWith("---\n")) {
    const endIdx = normalized.indexOf("\n---\n", 4);
    if (endIdx !== -1) {
      const fmBlock = normalized.slice(4, endIdx);
      for (const line of fmBlock.split("\n")) {
        const colon = line.indexOf(":");
        if (colon !== -1) {
          const key = line.slice(0, colon).trim();
          const val = line.slice(colon + 1).trim();
          frontmatter[key] = val;
        }
      }
      body = normalized.slice(endIdx + 5).trim();
    }
  }

  let title = frontmatter.name ?? frontmatter.id ?? "Style Spec";
  const summaryLines: string[] = [];
  const sections: ParsedStyleDoc["sections"] = [];
  let currentSection: ParsedStyleDoc["sections"][number] | null = null;

  for (const rawLine of body.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith("# ")) {
      title = line.slice(2).trim();
      continue;
    }

    if (line.startsWith("## ")) {
      currentSection = {
        heading: line.slice(3).trim(),
        bullets: [],
        paragraphs: [],
      };
      sections.push(currentSection);
      continue;
    }

    if (line.startsWith("- ")) {
      const content = line.slice(2).trim();
      const boldPrefix = content.match(/^\*\*(.+?):\*\*\s*(.+)$/);
      if (currentSection) {
        if (boldPrefix) {
          currentSection.bullets.push({
            label: boldPrefix[1],
            text: boldPrefix[2],
          });
        } else {
          currentSection.bullets.push({ text: content });
        }
      }
      continue;
    }

    if (currentSection) {
      currentSection.paragraphs.push(line);
    } else {
      summaryLines.push(line);
    }
  }

  return {
    title,
    summary: summaryLines.join(" "),
    frontmatter,
    sections,
  };
}

export interface BookmarkItem {
  name: string;
  url: string;
  note: string;
}

export interface BookmarkCategory {
  title: string;
  items: BookmarkItem[];
}

export function parseBookmarksMarkdown(raw: string): BookmarkCategory[] {
  const normalized = raw.replace(/\r\n/g, "\n");
  const categories: BookmarkCategory[] = [];
  let current: BookmarkCategory | null = null;

  for (const rawLine of normalized.split("\n")) {
    const line = rawLine.trim();
    if (line.startsWith("## ")) {
      current = { title: line.slice(3).trim(), items: [] };
      categories.push(current);
      continue;
    }

    if (line.startsWith("- ") && current) {
      const match = line.match(
        /^-\s+\*\*(.+?)\*\*\s+[—-]\s+(https?:\/\/\S+)(?:\s+\((.+)\))?$/
      );
      if (match) {
        current.items.push({
          name: match[1].trim(),
          url: match[2].trim(),
          note: (match[3] ?? "").trim(),
        });
      }
    }
  }

  return categories;
}
