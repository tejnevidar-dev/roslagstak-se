/**
 * Paket 79 (Marknadschefen 2026-10-13, förslag B, steg 2): på ortssidor med egen text står meningen om referensjobbet direkt efter områdestextens första stycke, lika i React och
 * i serverns HTML. Förut stod den bara i serverns HTML, mitt på sidan. Lydelsen och urvalet är oförändrade; sidor som använder mallen har sin egen mening och berörs inte.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { locations } from "@/data/locations";
import { usesMall } from "@/data/location-mall";
import { referensMening } from "@/data/location-referens";
import { prerenderContent } from "../../scripts/prerender-content";

const kalla = (f: string) => readFileSync(f, "utf8");
const ownText = locations.filter((l) => !usesMall(l));

describe("paket 79: referensmeningen efter områdestextens första stycke", () => {
  it("lydelsen är densamma som förut: 'Ett referensjobb i närområdet: …' och 'Vi har utfört ett dokumenterat referensjobb här: …'", () => {
    expect(referensMening({ slug: "hallstavik", name: "Hallstavik", lat: 60.0522, lng: 18.5975 }, "i")).toMatch(
      /^Ett referensjobb i närområdet: Nytt tak på [A-ZÅÄÖa-zåäö]+, ungefär \d+ km härifrån\. Det jobbet gjordes inte i Hallstavik, men det visar hur ett komplett takbyte kan se ut\.$/,
    );
    const blido = locations.find((l) => l.slug === "blido")!;
    expect(referensMening(blido, "på")).toBe("Vi har utfört ett dokumenterat referensjobb här: Nytt tak på Blidö.");
  });
  it("serverns HTML: meningen är stycke två, direkt efter första stycket, på varje egen-text-sida som har den", () => {
    let antal = 0;
    for (const l of ownText) {
      const prep = l.isIsland ? "på" : "i";
      const m = referensMening(l, prep);
      const sida = prerenderContent("/taklaggare-" + l.slug)!;
      const ps = sida.paragraphs.map((p) => (typeof p === "string" ? p : ""));
      if (!m) { expect(ps.join("\n"), l.slug).not.toContain("Ett referensjobb i närområdet"); continue; }
      antal++;
      const i = ps.findIndex((p) => p === m);
      expect(i, l.slug).toBeGreaterThanOrEqual(0);
      expect(ps[i - 1], l.slug).toBe(l.longDescription);
      expect(ps.filter((p) => p.includes(m)).length, l.slug).toBe(1);
    }
    expect(antal).toBeGreaterThan(15);
  });
  it("ingen sida har meningen kvar i geo-stycket mitt på sidan, och mallsidorna är orörda", () => {
    for (const l of ownText) {
      const ps = prerenderContent("/taklaggare-" + l.slug)!.paragraphs.map((p) => (typeof p === "string" ? p : ""));
      const geo = ps.find((p) => p.includes("Närmaste orter i vårt område"));
      if (geo) expect(geo, l.slug).not.toMatch(/referensjobb/);
    }
    // Mallsidorna på öar (Finnhamn, Humlö) har J1 i "så arbetar vi", så mallens referensmening är avstängd där (en mening om egna jobb per sida)
    for (const slug of ["finnhamn", "humlo"]) {
      const t = prerenderContent("/taklaggare-" + slug)!.paragraphs.join("\n");
      expect(t, slug).not.toMatch(/Ett referensjobb i närområdet|Vi har inget referensjobb|Vill du se ett tak vi har bytt/);
      expect(t, slug).toContain("kompletta takbyten på Blidö och Singö");
    }
  });
  it("React: LocationPage ritar samma mening direkt efter longDescription, bara på sidor med egen text", () => {
    const k = kalla("src/pages/LocationPage.tsx");
    expect(k).toContain("referensMening(location, prep)");
    expect(k.indexOf("const prep = ")).toBeLessThan(k.indexOf("referensMening(location, prep)"));
    expect(k.indexOf("{location.longDescription}")).toBeLessThan(k.indexOf("{referens}"));
    expect(k).toMatch(/!usesMall\([^)]*\)[^{]*&& referens &&/);
  });
});

/** Meningar om egna jobb: J1 (gammal och ny lydelse), referensmeningarna och mallens varianter. */
const MENING_OM_EGNA_JOBB = /kompletta takbyten på Blidö|referensjobb|tak vi har bytt|Tre tak vi har/;
const meningar = (t: string) => t.split(/(?<=[.!?])\s+/).filter((m) => MENING_OM_EGNA_JOBB.test(m));

describe("paket 79: högst en mening om egna jobb per ortssida (Marknadschefens regel 2026-10-13)", () => {
  it("ingen av ortssidorna har mer än en mening om egna jobb (referensmeningen och J1 räknas båda)", () => {
    const fel: string[] = [];
    let med = 0;
    for (const l of locations) {
      const sida = prerenderContent("/taklaggare-" + l.slug);
      if (!sida) continue;
      const t = [sida.intro ?? "", ...sida.paragraphs.map((p) => (typeof p === "string" ? p : ""))].join("\n");
      const m = meningar(t);
      if (m.length > 0) med++;
      // Norrtälje undantas först när gren 72 byggs (utkastet tar bort mallens mening på den sidan)
      if (m.length > 1 && l.slug !== "norrtalje") fel.push(`${l.slug}: ${m.length} meningar: ${m.map((x) => x.slice(0, 60)).join(" | ")}`);
    }
    expect(fel).toEqual([]);
    expect(med).toBeGreaterThan(50);
  });
  it("Blidö, där jobbet gjordes, har referensmeningen och ingen J1; Ljusterö har J1 och ingen referensmening", () => {
    const blido = prerenderContent("/taklaggare-blido")!.paragraphs.join("\n");
    expect(blido).toContain("Vi har utfört ett dokumenterat referensjobb här: Nytt tak på Blidö.");
    expect(blido).not.toContain("kompletta takbyten på Blidö och Singö");
    const ljustero = prerenderContent("/taklaggare-ljustero")!.paragraphs.join("\n");
    expect(ljustero).toContain("kompletta takbyten på Blidö och Singö");
    expect(ljustero).not.toMatch(/Ett referensjobb i närområdet/);
  });
});
