/**
 * Paket 83 (Marknadschefens tillägg 2026-10-13 16:55, innehall/leverans-2026-10-13.md Del 6 punkt 3, P1 och P2): /material/tp20-plattak (dit /platttak-yxlan pekas om)
 * säger var priserna står och har en nästa-steg-rad sist i prisavsnittet. P1 bara på materialsidan, inte i taktyper-text.ts. Inget nytt påstående.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { materials } from "@/data/materials";
import { MATERIAL_PRISAVSNITT } from "@/data/material-prices";
import { prerenderContent, styckenMedLankar } from "../../scripts/prerender-content";

const P1 = "TP20 är en trapetsprofilerad takplåt. Den är lätt och läggs i långa längder. Riktpriser för TP20, pannplåt och dubbelfalsad plåt står längre ned på sidan.";
const P2 = "Gäller det ditt eget tak? Boka en kostnadsfri takkontroll utan förpliktelser.";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

describe("paket 83: /material/tp20-plattak", () => {
  it("P1: raden under rubriken säger var priserna står, i React-datan och i serverns HTML", () => {
    expect(materials.find((m) => m.slug === "tp20-plattak")!.detail!.intro).toBe(P1);
    expect(prerenderContent("/material/tp20-plattak")!.intro).toBe(P1);
  });
  it("P1 står inte i översikten över taktyper (samma mening utan tillägget)", () => {
    const rad = readFileSync("src/data/taktyper-text.ts", "utf8");
    expect(rad).toContain("TP20 är en trapetsprofilerad takplåt. Den är lätt och läggs i långa längder.");
    expect(rad).not.toContain("står längre ned på sidan");
  });
  it("P2: nästa-steg-raden står sist i prisavsnittet, direkt efter 'Alla riktpriser finns på prissidan.', med länk till /takkontroll", () => {
    const a = MATERIAL_PRISAVSNITT["tp20-plattak"];
    expect(a.nastaSteg).toBe("Gäller det ditt eget tak? [Boka en kostnadsfri takkontroll utan förpliktelser.](/takkontroll)");
    const sida = prerenderContent("/material/tp20-plattak")!;
    const p = sida.paragraphs.map((x) => (typeof x === "string" ? x : ""));
    const i = p.indexOf(P2);
    expect(i).toBeGreaterThan(0);
    expect(p[i - 1]).toBe("Alla riktpriser finns på prissidan.");
    expect(p.filter((x) => x === P2).length).toBe(1);
    // länken står i stycket i serverns HTML (och i länklistan), inte i ett tidigare stycke
    const html = styckenMedLankar(p, sida.inlineLinks, esc);
    expect(html.map((h, k) => (h.includes('<a href="/takkontroll">') ? k : -1)).filter((k) => k >= 0)).toEqual([i]);
    expect(sida.links.some((l) => l.href === "/takkontroll")).toBe(true);
  });
  it("P2 bara på tp20-plattak: ingen annan materialsida har fått nästa-steg-raden", () => {
    for (const [slug, a] of Object.entries(MATERIAL_PRISAVSNITT)) if (slug !== "tp20-plattak") expect(a.nastaSteg, slug).toBeUndefined();
    for (const slug of ["betongpannor", "pannplat", "papptak"]) expect(prerenderContent("/material/" + slug)?.paragraphs.join("\n") ?? "", slug).not.toContain(P2);
  });
  it("React: MaterialPage ritar raden med renderInline efter prisavsnittets sista stycke", () => {
    const k = readFileSync("src/pages/MaterialPage.tsx", "utf8");
    expect(k).toContain("MATERIAL_PRISAVSNITT[material.slug].nastaSteg");
    expect(k.indexOf("MATERIAL_PAGE_TEXT.pricesLink")).toBeLessThan(k.indexOf("nastaSteg!"));
    expect(k).toContain("renderInline(MATERIAL_PRISAVSNITT[material.slug].nastaSteg!)");
  });
});
