/**
 * Paket 55 (Marknadschefen 2026-10-12): frågorna som visas på /offert och startsidan (home-faqs.ts), undantaget för /offert borta ur check-arbetsomrade.ts,
 * Sd7 (HowTo utan supply och estimatedCost), Sd8 (WebSite utan SearchAction), M3-punkt 4 skärpt till "takkontroll" och sökordet "solceller roslagen" borta.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { homeFaqs } from "@/data/home-faqs";
import { buildWebSiteNode } from "@/lib/schema-graph";
import { blogPosts } from "@/data/blog-posts";
import { prerenderContent } from "../../scripts/prerender-content";

const kalla = (f: string) => readFileSync(f, "utf8");

describe("paket 55", () => {
  it("home-faqs: svarstiden utan startdatum och områdesfrågan med arbetsområdets lydelse (rad 29 och 37)", () => {
    const f = (q: string) => homeFaqs.find((x) => x.question === q)!.answer;
    expect(f("Hur snabbt får jag svar på min förfrågan?")).toBe("Vi svarar inom 24 timmar. Därefter bokar vi en kostnadsfri takkontroll. När arbetet görs bestämmer vi tillsammans med dig.");
    expect(f("Vilka områden i Roslagen täcker ni?")).toBe("Vi tar uppdrag i Roslagen och Storstockholm. Alla orter finns på sidan Områden.");
    expect(JSON.stringify(homeFaqs)).not.toMatch(/startdatum|hela Roslagen|återkopplar/);
  });
  it("frågorna visas på startsidan och /offert (serverns HTML) och är samma där", () => {
    for (const path of ["/", "/offert"]) {
      const t = JSON.stringify(prerenderContent(path));
      expect(t, path).toContain("Vi tar uppdrag i Roslagen och Storstockholm. Alla orter finns på sidan Områden.");
      expect(t, path).not.toContain("startdatum");
    }
  });
  it("check-arbetsomrade undantar bara startsidan", () => {
    expect(kalla("scripts/check-arbetsomrade.ts")).toContain('const UNDANTAG = new Set<string>(["index.html"]);');
  });
  it("Sd7: HowTo-noden på tjänstesidorna har varken supply eller estimatedCost", () => {
    const s = kalla("src/data/service-page.ts");
    expect(s).not.toMatch(/HowToSupply|estimatedCost|supply:/);
  });
  it("Sd8: WebSite-noden har ingen SearchAction", () => {
    expect(JSON.stringify(buildWebSiteNode())).not.toContain("SearchAction");
    expect(kalla("src/lib/schema-graph.ts")).not.toContain("search_term_string");
  });
  it("M3-punkt 4 klickar bara på 'Kostnadsfri takkontroll'", () => {
    const s = kalla("scripts/kontroll-efter-slapp.mjs");
    expect(s).toContain("name: /Kostnadsfri takkontroll/");
    expect(s).not.toContain("Kostnadsfri rådgivning");
  });
  it("solcellsguiden har inte sökordet 'solceller roslagen'", () => {
    const g = blogPosts.find((p) => p.slug === "solceller-platttak-roslagen")!;
    expect(g.keywords).not.toContain("solceller roslagen");
    expect(g.keywords).toContain("solceller plåttak");
  });
});
