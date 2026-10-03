import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  CANONICAL_ALIASES,
  SITE_URL,
  canonicalPath,
  canonicalUrl,
  isNoindexPath,
  normalizePath,
} from "@/lib/canonical";
import { locations } from "@/data/locations";
import { allServiceSlugs } from "@/data/service-location-combos";
import { hasServiceCombos } from "@/data/service-slugs";
import { isThinCombo } from "@/data/thin-combos";

const sitemap = readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
const sitemapPaths = sitemapUrls.map((u) => normalizePath(u.replace(SITE_URL, "")));

describe("canonical resolver", () => {
  it("normalizes trailing slashes, casing, query and hash", () => {
    expect(canonicalUrl("/Priser/")).toBe(`${SITE_URL}/priser`);
    expect(canonicalUrl("/priser?utm_source=fb")).toBe(`${SITE_URL}/priser`);
    expect(canonicalUrl("/priser#faq")).toBe(`${SITE_URL}/priser`);
    expect(canonicalUrl("/")).toBe(`${SITE_URL}/`);
  });

  it("collapses alias routes onto a single canonical URL", () => {
    for (const [alias, target] of Object.entries(CANONICAL_ALIASES)) {
      expect(canonicalPath(alias)).toBe(target);
      // canonical targets must be self-referencing (no alias chains)
      expect(canonicalPath(target)).toBe(target);
    }
  });

  it("marks the admin area as noindex", () => {
    expect(isNoindexPath("/admin")).toBe(true);
    expect(isNoindexPath("/admin/seo")).toBe(true);
    expect(isNoindexPath("/priser")).toBe(false);
  });
});

describe("duplicate control", () => {
  it("has no duplicate URLs in the sitemap", () => {
    const seen = new Set<string>();
    const dupes = sitemapPaths.filter((p) => (seen.has(p) ? true : (seen.add(p), false)));
    expect(dupes).toEqual([]);
  });

  it("never lists an alias or noindex path in the sitemap", () => {
    const aliases = sitemapPaths.filter((p) => p in CANONICAL_ALIASES);
    const admin = sitemapPaths.filter(isNoindexPath);
    expect(aliases).toEqual([]);
    expect(admin).toEqual([]);
  });

  it("lists every location page and non-thin service-location combo exactly once", () => {
    // Tunna tjänst+ort-sidor (utan egen text) är medvetet noindex och utanför sitemap
    // (Marknadschefens beslut 2026-09-29, se thin-combos.ts) — testar bara de som ska vara med.
    const missing: string[] = [];
    for (const loc of locations) {
      if (!sitemapPaths.includes(`/taklaggare-${loc.slug}`)) missing.push(`/taklaggare-${loc.slug}`);
      if (!hasServiceCombos(loc.region)) continue;
      for (const service of allServiceSlugs) {
        if (isThinCombo(service, loc)) continue;
        const path = `/${service}-${loc.slug}`;
        if (!sitemapPaths.includes(canonicalPath(path))) missing.push(path);
      }
    }
    expect(missing).toEqual([]);
  });

  it("has unique location slugs so two towns can never share a URL", () => {
    const slugs = locations.map((l) => l.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses absolute https URLs on the project domain in the sitemap", () => {
    const bad = sitemapUrls.filter((u) => !u.startsWith(`${SITE_URL}/`));
    expect(bad).toEqual([]);
  });
});

describe("omdirigeringsregister", () => {
  it("varje alias har datum och skäl, och inget mål är i sin tur ett alias (inga kedjor)", async () => {
    const { REDIRECT_REGISTRY } = await import("@/lib/canonical");
    for (const [alias, target] of Object.entries(CANONICAL_ALIASES)) {
      expect(REDIRECT_REGISTRY[alias], `register saknas för ${alias}`).toBeDefined();
      expect(REDIRECT_REGISTRY[alias].datum).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(REDIRECT_REGISTRY[alias].skal.length).toBeGreaterThan(10);
      expect(CANONICAL_ALIASES[target], `${alias} → ${target} är en kedja`).toBeUndefined();
    }
    for (const alias of Object.keys(REDIRECT_REGISTRY)) expect(CANONICAL_ALIASES[alias], `${alias} står i registret men inte i CANONICAL_ALIASES`).toBeDefined();
  });
});
