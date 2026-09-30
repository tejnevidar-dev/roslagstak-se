/**
 * Minimal inline-markdown för bloggtexter (#1y): "## Rubrik" som egen rad, [text](/länk) och **fet**.
 * Delas av BlogPost.tsx (rendering) och scripts/prerender-content.ts (ren text + länkar), så att
 * crawlern och besökaren får samma text.
 */
export const INLINE_MD = /(\[[^\]]+\]\([^)\s]+\)|\*\*[^*]+\*\*)/g;

export const isHeading = (p: string) => p.startsWith("## ");

/** Ren text utan markdown-syntax. */
export const stripInlineMd = (p: string): string =>
  (isHeading(p) ? p.slice(3) : p).replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");

/** Alla interna länkar i texten. */
export const inlineMdLinks = (p: string): { href: string; label: string }[] =>
  [...p.matchAll(/\[([^\]]+)\]\((\/[^)\s]*)\)/g)].map((m) => ({ href: m[2], label: m[1] }));
