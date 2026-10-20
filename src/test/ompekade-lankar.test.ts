/**
 * Gren 136: inga interna länkar till de 210 adresser som public/_redirects pekar om (gren 129). src/data/ompekade.ts stämmer med _redirects,
 * serverns HTML har ingen länk till dem (ortssidorna och tjänst × ort-sidorna), och React-sidorna filtrerar med samma lista.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { locations } from "../data/locations";
import { OMPEKADE, arOmpekad } from "../data/ompekade";
import { allServiceSlugs, hasServiceCombos } from "../data/service-slugs";
import { prerenderContent } from "../../scripts/prerender-content";

describe("gren 136: länkar till ompekade adresser", () => {
  it("ompekade.ts har exakt raderna efter gren 129-kommentaren i _redirects (210 st)", () => {
    const rader = readFileSync("public/_redirects", "utf8").split(/\r?\n/);
    const start = rader.findIndex((r) => r.startsWith("# Ompekning (gren 129"));
    expect(start).toBeGreaterThan(-1);
    const fran = rader.slice(start).map((r) => r.trim()).filter((r) => /^\/[a-z0-9-]+ \/\S* 301$/.test(r)).map((r) => r.split(" ")[0]).sort();
    expect([...OMPEKADE].sort()).toEqual(fran);
    expect(OMPEKADE.size).toBe(210);
    expect(arOmpekad("/takbyte-vaddo")).toBe(true);
    expect(arOmpekad("/takbyte-taby")).toBe(false);
  });
  it("ingen ortssida i serverns HTML länkar till en ompekad adress", () => {
    const fel: string[] = [];
    for (const l of locations) {
      const c = prerenderContent(`/taklaggare-${l.slug}`);
      if (!c) continue;
      for (const k of c.links) if (OMPEKADE.has(k.href)) fel.push(`${l.slug} -> ${k.href}`);
    }
    expect(fel.slice(0, 10)).toEqual([]);
  });
  it("tjänst × ort-sidorna i serverns HTML länkar inte heller dit", () => {
    const fel: string[] = [];
    for (const l of locations.filter((x) => hasServiceCombos(x.region)).slice(0, 80)) {
      for (const s of allServiceSlugs) {
        const c = prerenderContent(`/${s}-${l.slug}`);
        if (!c) continue;
        for (const k of c.links) if (OMPEKADE.has(k.href) && k.href !== `/${s}-${l.slug}`) fel.push(`${s}-${l.slug} -> ${k.href}`);
      }
    }
    expect(fel.slice(0, 10)).toEqual([]);
  });
  it("React-sidorna filtrerar med samma lista", () => {
    expect(readFileSync("src/pages/LocationPage.tsx", "utf8")).toContain("!arOmpekad(");
    const sl = readFileSync("src/pages/ServiceLocationPage.tsx", "utf8");
    expect(sl).toContain("arOmpekad(`/${combo.serviceSlug}-${nearby.slug}`)");
    expect(sl).toContain("arOmpekad(`/${s.slug}-${combo.locationSlug}`)");
  });
});
