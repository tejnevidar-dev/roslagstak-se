/**
 * Paket 113: /taklaggare-yxlan har en egen text ur innehall/utkast/yxlan-2026-10-15.md (Grind-rad: godkänd av Marknadschefen 2026-10-15), titel, meta och H1 enligt utkastet.
 * /taklaggare-blido behåller den gemensamma texten och är orörd.
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { ortSeoOverrides } from "../data/seo-overrides";
import { prerenderContent } from "../../scripts/prerender-content";

const l = (slug: string) => locations.find((x) => x.slug === slug)!;
const sida = (slug: string) => JSON.stringify(prerenderContent(`/taklaggare-${slug}`));

describe("paket 113: Yxlan", () => {
  it("egen text om Yxlö, Alsvik, Vagnsunda, Kolsvik och Köpmanholm", () => {
    const y = JSON.stringify(l("yxlan"));
    for (const t of ["Yxlan är en ö i Blidö socken", "Yxlö, den äldsta byn", "Alsvik och Vagnsunda", "Kolsvik och Köpmanholm", "Vad det betyder för taket"]) expect(y, t).toContain(t);
  });
  it("H1 och meta enligt utkastet", () => {
    expect(l("yxlan").h1Override).toBe("Takläggare på Yxlan, Norrtälje");
    expect(l("yxlan").description).toBe("Takläggare på Yxlan i Blidö socken: Yxlö, Alsvik, Vagnsunda, Kolsvik och Köpmanholm. Vägfärja från Furusund. Kostnadsfri takkontroll.");
  });
  it("texten är inte längre densamma som på Blidö", () => {
    expect(l("yxlan").longDescription).not.toBe(l("blido").longDescription);
    expect(JSON.stringify(l("yxlan").extraSections)).not.toBe(JSON.stringify(l("blido").extraSections));
  });
  it("Blidö är orört: samma beskrivning som före", () => {
    expect(l("blido").description).toContain("Takbyte på Yxlan och Blidö");
    expect(JSON.stringify(l("blido"))).toContain("Blidö");
  });
  it("faktarutan är en riktig faktaruta (fyra rader) och ingen rå markdown ligger i texten", () => {
    expect(l("yxlan").factBox?.map((r) => r.label)).toEqual(["Kommun", "Byar", "Hustyper", "Byggperiod"]);
    expect(JSON.stringify(l("yxlan"))).not.toContain("**Faktaruta");
    expect(sida("yxlan")).not.toContain("**Faktaruta");
  });
  it("serverns HTML har den egna texten", () => {
    expect(sida("yxlan")).toContain("Yxlö, den äldsta byn");
    expect(sida("blido")).not.toContain("Yxlö, den äldsta byn");
  });
  it("titeln finns i seo-overrides", () => {
    expect(JSON.stringify(ortSeoOverrides?.yxlan ?? ortSeoOverrides)).toContain("Yxlan");
  });
});
