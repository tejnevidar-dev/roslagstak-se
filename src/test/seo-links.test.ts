/**
 * SEO-enhetstester för länkstruktur och tjänstesidor (fas 2.29 och DEL 1 avsnitt 5). Läser samma prerender-modell som
 * den statiska HTML:en, så testet gäller det Google och besökaren faktiskt får.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { services } from "@/components/Services";
import { serviceBlocks } from "@/data/service-blocks";
import { serviceDetails, serviceMeta } from "@/data/service-page";
import { prerenderContent } from "../../scripts/prerender-content";

const sitemapPaths = [...readFileSync(resolve("public/sitemap.xml"), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => m[1].replace(/^https?:\/\/[^/]+/, "").replace(/\/$/, "") || "/",
);
const normHref = (h: string) => h.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";

describe("tjänstesidor har egna poster (ingen formelmässig reservtitel)", () => {
  for (const s of services) {
    it(`${s.slug}: egna serviceBlocks, serviceDetails och serviceMeta`, () => {
      expect(serviceBlocks[s.slug], "serviceBlocks").toBeDefined();
      expect(serviceDetails[s.slug], "serviceDetails").toBeDefined();
      expect(serviceMeta[s.slug], "serviceMeta").toBeDefined();
      expect(serviceBlocks[s.slug].seoTitle.length).toBeGreaterThan(15);
    });
  }
});

describe("internlänkar", () => {
  const pages = sitemapPaths.map((p) => ({ p, page: prerenderContent(p) })).filter((x) => x.page);

  it("varje sida i sitemapen har minst tre interna länkar", () => {
    const few = pages.filter(({ page }) => new Set(page!.links.map((l) => normHref(l.href)).filter((h) => h.startsWith("/"))).size < 3).map((x) => x.p);
    expect(few).toEqual([]);
  });

  it("varje orts- och tjänst×ort-sida länkar till /takkontroll eller /priser", () => {
    const miss = pages
      .filter(({ p }) => p.startsWith("/taklaggare-") || /^\/(takbyte|takrenovering|takomlaggning|bandtackning|platttak|tegeltak|betongpannor|takmalning|taktvatt)-/.test(p))
      .filter(({ page }) => !page!.links.some((l) => ["/takkontroll", "/priser"].includes(normHref(l.href))))
      .map((x) => x.p);
    expect(miss).toEqual([]);
  });

  it("inga blogg-, problem- eller materiallänkar i brödtexten pekar på en adress som saknas i sitemapen", () => {
    // Hela sajten kontrolleras av scripts/link-audit.ts i bygget. Här bara sidtyperna där döda länkar uppstått (guider med inline-länkar).
    const sitemap = new Set(sitemapPaths);
    const dead = new Set<string>();
    for (const { p, page } of pages) {
      if (!/^\/(blogg|takproblem|material)\//.test(p)) continue;
      for (const l of page!.links) {
        const h = normHref(l.href);
        if (h.startsWith("/") && !sitemap.has(h) && !h.startsWith("/offert/")) dead.add(h + " (från " + p + ")");
      }
    }
    expect([...dead]).toEqual([]);
  });

  it("hubbsidorna för de mest sökta orterna har många inlänkar", () => {
    const inlinks = (target: string) => pages.filter(({ p, page }) => p !== target && page!.links.some((l) => normHref(l.href) === target)).length;
    expect(inlinks("/takbyte-norrtalje")).toBeGreaterThanOrEqual(30);
    expect(inlinks("/takrenovering-taby")).toBeGreaterThanOrEqual(20);
    expect(inlinks("/takbyte-stockholm")).toBeGreaterThanOrEqual(20);
  });
});
