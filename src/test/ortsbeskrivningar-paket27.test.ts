/**
 * Paket 27 (AG4): de 19 ortssidornas egna metabeskrivningar: högst 160 tecken, "Takläggare i/på <ort>:", inga belopp och inga träffar mot forbjudna-monster.json,
 * och varje beskrivning har en loggrad (manuell-2026-10-08-…) med path och "efter" lika med texten.
 */
import { describe, expect, it } from "vitest";
import logg from "@/data/overrides/_logg.json";
import mönsterFil from "@/data/seo-regler/forbjudna-monster.json";
import { ortSeoOverrides } from "@/data/seo-overrides";

const SLUGS = ["akersberga", "danderyd", "vaxholm", "stockholm", "solna", "sundbyberg", "sollentuna", "nacka", "varmdo", "tyreso", "haninge", "jarfalla", "huddinge", "sigtuna", "nynashamn", "botkyrka", "salem", "sodertalje", "upplands-bro"];

describe("19 ortsbeskrivningar (paket 27)", () => {
  it("är högst 160 tecken, börjar med Takläggare och träffar inga mönster", () => {
    const mönster = (mönsterFil as { monster: { id: string; monster: string; flaggor?: string }[] }).monster.filter((m) => m.id !== "platshallare-och-fel");
    const fel: string[] = [];
    for (const slug of SLUGS) {
      const d = ortSeoOverrides[slug]?.description ?? "";
      if (d.length === 0 || d.length > 160) fel.push(`${slug}: ${d.length} tecken`);
      if (!/^Takläggare (i|på) /.test(d)) fel.push(`${slug}: börjar inte med Takläggare i/på`);
      for (const m of mönster) if (new RegExp(m.monster, (m.flaggor ?? "").replace(/g/g, "")).test(d)) fel.push(`${slug}: träff ${m.id}`);
    }
    expect(fel).toEqual([]);
  });
  it("har en loggrad per beskrivning med rätt path och 'efter'", () => {
    const fel: string[] = [];
    for (const slug of SLUGS) {
      const rad = (logg as { rader: { id: string; path: string; falt: string; efter: string }[] }).rader.find((r) => r.path === `/taklaggare-${slug}` && r.id.startsWith("manuell-2026-10-08-"));
      if (!rad) { fel.push(`${slug}: loggrad saknas`); continue; }
      if (rad.falt !== "description" || rad.efter !== ortSeoOverrides[slug].description) fel.push(`${slug}: loggraden stämmer inte`);
    }
    expect(fel).toEqual([]);
  });
});
