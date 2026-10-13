/**
 * Paket 80 (Marknadschefen 2026-10-13): raden "Avstånd till vår bas i Norrtälje (fågelvägen)" visas inte på /taklaggare-norrtalje, där den visade "1 km" till den egna basen.
 * Övriga sidor är oförändrade. Faktarutan ritas ur samma lista i React (LocationPage) och serverns HTML (prerender-content).
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { locations } from "@/data/locations";
import { buildLocalSections } from "@/data/local-sections";
import { prerenderContent } from "../../scripts/prerender-content";

const RAD = "Avstånd till vår bas i Norrtälje (fågelvägen)";
const ort = (slug: string) => locations.find((l) => l.slug === slug)!;

describe("paket 80: avståndsraden finns på Rimbo och saknas på Norrtälje", () => {
  it("faktarutans lista: Rimbo har raden, Norrtälje har den inte, de andra raderna är kvar", () => {
    const rimbo = buildLocalSections(ort("rimbo")).facts.map((f) => f.label);
    const norrtalje = buildLocalSections(ort("norrtalje")).facts.map((f) => f.label);
    expect(rimbo).toContain(RAD);
    expect(norrtalje).not.toContain(RAD);
    expect(norrtalje).toEqual(["Område", "Närmaste orter"]);
  });
  it("serverns HTML: Rimbo har raden och värdet, Norrtälje har varken raden eller '1 km'", () => {
    const rimbo = prerenderContent("/taklaggare-rimbo")!.paragraphs.join("\n");
    const norrtalje = prerenderContent("/taklaggare-norrtalje")!.paragraphs.join("\n");
    expect(rimbo).toContain(RAD);
    expect(norrtalje).not.toContain("Avstånd till vår bas");
    expect(norrtalje).not.toMatch(/^1 km$/m);
  });
  it("React: LocationPage ritar faktarutan ur buildLocalSections, utan egen avståndsrad", () => {
    const k = readFileSync("src/pages/LocationPage.tsx", "utf8");
    expect(k).toContain("localSections.facts.map");
    expect(k).not.toContain("Avstånd till vår bas");
  });
  it("ingen annan sida har tappat raden: alla ortssidor utom Norrtälje har den", () => {
    const utan = locations.filter((l) => !buildLocalSections(l).facts.some((f) => f.label === RAD)).map((l) => l.slug);
    expect(utan).toEqual(["norrtalje"]);
  });
});
