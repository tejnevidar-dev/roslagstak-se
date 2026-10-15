/**
 * Paket 54 (Marknadschefen 2026-10-11): /hur-det-gar-till i React (LayerIntro, RoofBuildAnimation, RoofBuildVideo, K3) och de tio äldre takproblemsidorna (Pr2).
 * Texter ur innehall/leverans-2026-10-12.md, punkt 1 och 2. Ett test per grupp.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { problems } from "@/data/problems";

const kalla = (f: string) => readFileSync(f, "utf8");
const K3 = "Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris.";

describe("paket 54: de tio äldre takproblemsidorna (Pr2)", () => {
  const slugs = ["lackage-vid-skorsten", "trasiga-takpannor", "mossa-pa-taket", "rostig-plat", "fukt-pa-vinden", "igensatta-hangrannor", "rutten-raspont", "kondens-pa-vinden", "dalig-underlagspapp", "istappar-pa-taket"];
  it("alla tio börjar 'Vid takkontrollen tittar' (sedan paket 99 utan uppräkning) och slutar med K3:s lydelse", () => {
    for (const s of slugs) {
      const p = problems.find((x) => x.slug === s);
      expect(p, s).toBeTruthy();
      expect(p!.undersokning.startsWith("Vid takkontrollen tittar"), s).toBe(true);
      expect(p!.undersokning.endsWith(K3), s).toBe(true);
    }
  });
  it("'uppe på taket', 'uppifrån taket', 'när pannor eller plåt lyfts' och 'plåtslagare' som den som kontrollerar är borta", () => {
    const alla = problems.map((p) => p.undersokning).join("\n");
    for (const borta of ["uppe på taket", "uppifrån taket", "när pannor eller plåt lyfts", "En takläggare eller plåtslagare kontrollerar", "En takläggare tittar", "En takläggare kontrollerar", "En takläggare bedömer"]) expect(alla, borta).not.toContain(borta);
  });
  it("uppräkningen av vad som tittas på är borta på alla tio (paket 99), så 'Där vinden går att komma åt' står inte längre kvar", () => {
    for (const s of slugs) expect(problems.find((p) => p.slug === s)!.undersokning, s).not.toContain("Där vinden går att komma åt");
  });
});

describe("paket 54: /hur-det-gar-till i React (K3)", () => {
  it("LayerIntro: rubrik, ingress och sju lager utan produktnamn, klimat eller centrumavstånd", () => {
    const s = kalla("src/components/LayerIntro.tsx");
    expect(s).toContain('title="Ett tak byggs upp i sju lager"');
    expect(s).toContain('intro="Ett tak är inte ett skikt utan flera. Ordningen är underlag, läkt, takmaterial och plåtdetaljer."');
    for (const borta of ["Mataki", "Haloten", "skärgårdens väder", "centrumavstånd", "stormklammer", "falsad plåt läggs"]) expect(s, borta).not.toContain(borta);
    for (const namn of ['name: "Råspont"', 'name: "Underlagspapp"', 'name: "Fotplåt och hängrännor"', 'name: "Vindskivor"', 'name: "Läkt"', 'name: "Takmaterial"', 'name: "Plåtdetaljer"']) expect(s, namn).toContain(namn);
  });
  it("RoofBuildAnimation: nya titlar, kroppar och detaljer; detail är valfri och tomma fält ritas inte", () => {
    const s = kalla("src/components/RoofBuildAnimation.tsx");
    for (const borta of ["Mataki", "Haloten", "skärgårdens", "slagregn", "Stormklammer", "Millimeterinmätning", "centrumavstånd", "Grundmålat virke", "kustnära", "Täta anslutningar hela vägen"]) expect(s, borta).not.toContain(borta);
    expect(s).toContain("detail?: string;");
    expect(s).toContain("{item.detail && <p");
    expect(s).toContain("text: item.detail ? `${item.body} ${item.detail}` : item.body");
    expect(s).toContain('title="Så byggs taket upp, lager för lager"');
    expect(s).toContain('intro="Följ ett komplett takbyte lager för lager."');
    expect(s).toContain('title: "Taksäkerhet och slutgenomgång"');
    expect(s).toContain('title: "Nock och plåtbeslag"');
    // Vindskivor och nock/beslag har inget detail
    expect(s).toMatch(/title: "Vindskivor",\r?\n\s+body: "Vindskivorna och plåten på gavlarna är takets kanter.",\r?\n\s+image:/);
    expect(s).toMatch(/body: "Plåtbeslag monteras kring skorsten, ventiler och genomföringar.",\r?\n\s+image:/);
  });
  it("RoofBuildVideo: 'färdigt tak' i stället för snörasskydd, och beskrivningen säger animation", () => {
    const s = kalla("src/components/RoofBuildVideo.tsx");
    expect(s).not.toMatch(/snörasskydd|Mataki|hela arbetsgången/);
    expect(s).toContain("RoslagsTak visar arbetsgången vid ett takbyte som animation: råspont, underlagspapp, fotplåt och hängrännor, vindskivor, läkt, takmaterial och plåtbeslag.");
    expect(s).toContain('alt="Animation: så går ett takbyte till, från råspont till färdigt tak"');
  });
});
