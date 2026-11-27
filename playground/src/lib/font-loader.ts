const loadedFontUrls = new Set<string>();

/**
 * Dynamically injects a deduplicated Google Fonts <link rel="stylesheet"> into <head>.
 * Keeps initial Playground boot fast by loading typography webfonts strictly on demand.
 */
export function loadGoogleFonts(url: string | null | undefined): void {
  if (!url || typeof document === "undefined") return;
  if (loadedFontUrls.has(url)) return;

  const existing = document.head.querySelector<HTMLLinkElement>(
    `link[rel="stylesheet"][href="${CSS.escape(url)}"]`
  );
  if (existing) {
    loadedFontUrls.add(url);
    return;
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  link.dataset.vaultFont = "true";
  document.head.appendChild(link);
  loadedFontUrls.add(url);
}

export function isGoogleFontLoaded(url: string): boolean {
  return loadedFontUrls.has(url);
}
