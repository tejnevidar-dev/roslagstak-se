/**
 * Central canonical-URL logic.
 *
 * Every indexable route must resolve to exactly ONE canonical URL so Google
 * never has to guess which duplicate to rank. Alias routes (same content served
 * on several paths) are mapped to their single canonical target here.
 */

export const SITE_URL = "https://roslagstak.se";

/** Alias path -> canonical path. Keys and values are lowercase, no trailing slash. */
export const CANONICAL_ALIASES: Record<string, string> = {
  // Booking / contact landing page is reachable from poster-friendly short URLs
  "/radgivning": "/kontakt",
  "/konsultation": "/kontakt",
  "/boka": "/kontakt",
  // Roof-wash page has legacy + short paths
  "/taktvatt": "/tjanster/taktvatt",
  "/tjanster/takvard": "/tjanster/taktvatt",
};

/** Paths that must never be indexed (admin area etc.). */
export const NOINDEX_PREFIXES = ["/admin"];

/** Normalize a pathname: strip query/hash, lowercase, remove trailing slash. */
export const normalizePath = (pathname: string): string => {
  const path = (pathname || "/").split("?")[0].split("#")[0].toLowerCase();
  const trimmed = path.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
};

/** Resolve any incoming path to its canonical path. */
export const canonicalPath = (pathname: string): string => {
  const path = normalizePath(pathname);
  return CANONICAL_ALIASES[path] ?? path;
};

/** Absolute canonical URL for a path (or a full URL passed through, normalized). */
export const canonicalUrl = (pathnameOrUrl: string): string => {
  const path = pathnameOrUrl.startsWith("http")
    ? pathnameOrUrl.replace(/^https?:\/\/[^/]+/i, "") || "/"
    : pathnameOrUrl;
  const canonical = canonicalPath(path);
  return canonical === "/" ? `${SITE_URL}/` : `${SITE_URL}${canonical}`;
};

export const isNoindexPath = (pathname: string): boolean => {
  const path = normalizePath(pathname);
  return NOINDEX_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
};
