/**
 * Paket 49b-4 (Marknadschefen 2026-10-11, ur Innehålls efterläsning av 49b på live): svaret på "När byggdes husen …?" följer rutan (A1), frågan tas bort där svaret bara är en enda byggnad (A2),
 * och egennamn behåller stor bokstav efter kolon (A3).
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { locations } from "@/data/locations";

const ort = (slug: string) => locations.find((l) => l.slug === slug)!;
const box = (slug: string, label: string) => ort(slug).factBox!.find((f) => f.label === label)!.value;
const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

describe("paket 49b-4", () => {
  it("A1: svaret på Segeltorp, Snättringe och Höglandet följer rutans byggperiod och hustyper", () => {
    for (const slug of ["segeltorp", "snattringe", "hoglandet"]) {
      const svar = ort(slug).uniqueFAQ!.answer;
      expect(svar.startsWith(`Byggperiod enligt källorna: ${lower(box(slug, "Byggperiod"))}. Hustyper: ${lower(box(slug, "Hustyper"))}. `), slug).toBe(true);
    }
    const alla = locations.map((l) => l.uniqueFAQ?.answer ?? "").join("\n");
    for (const borta of ["radhus främst 1950-tal", "inslag till 2010-tal", "källan anger också 1929–1933"]) expect(alla, borta).not.toContain(borta);
  });

  it("A1 allmänt: på varje ort med frågan om husens byggår följer svaret rutan (utom Blidö, där ordet 'byarna' står kvar)", () => {
    const avvikare: string[] = [];
    for (const l of locations) {
      const q = l.uniqueFAQ;
      if (!q || !/^När byggdes husen/.test(q.question) || !l.factBox) continue;
      const bygg = l.factBox.find((f) => f.label === "Byggperiod")?.value;
      const hus = l.factBox.find((f) => f.label === "Hustyper")?.value;
      if (!bygg || !hus) continue;
      const lf = (s: string) => (/^(Roslagsbrovägen|Palmeska|Vaxmora|Trasthagen)/.test(s) ? s : lower(s));
      if (!q.answer.startsWith(`Byggperiod enligt källorna: ${lf(bygg)}. Hustyper: ${lf(hus)}. `)) avvikare.push(l.slug);
    }
    expect(avvikare).toEqual(["blido"]);
  });

  it("A2: frågan är borta på Spillersboda, Svartnö och Söderöra men kvar på Bromsten", () => {
    for (const slug of ["spillersboda", "svartno", "sodorora"]) expect(ort(slug).uniqueFAQ, slug).toBeUndefined();
    expect(ort("bromsten").uniqueFAQ?.answer).toContain("villatomter från 1899");
  });

  it("A3: egennamn behåller stor bokstav (Väddö, Enskede gård) och importskriptet har samma regel", () => {
    expect(ort("vaddo").uniqueFAQ!.answer).toContain("Byggperiod enligt källorna: Roslagsbrovägen mest 1940- och 1960-tal");
    expect(ort("enskede-gard").uniqueFAQ!.answer).toContain("Byggperiod enligt källorna: Palmeska villastaden från 1907");
    expect(ort("vaxmora").uniqueFAQ!.answer).toContain("Byggperiod enligt källorna: Vaxmora främst 1960- och 1970-tal"); // gren 128
    expect(ort("mosstorp").uniqueFAQ!.answer).toContain("Byggperiod enligt källorna: Trasthagen från 1885–1889."); // gren 139
    const s = readFileSync("scripts/import-omrade.ts", "utf8");
    expect(s).toContain('const EGENNAMN_I_BORJAN = ["Roslagsbrovägen", "Palmeska", "Vaxmora", "Trasthagen"];');
  });
});
