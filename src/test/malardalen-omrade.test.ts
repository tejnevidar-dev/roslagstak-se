/**
 * AJ4 gren A (Mälardalen ingår, beslut 2026-09-26): mallens mening om uppdragsområdet och schemat säger samma sak som beslutet.
 */
import { describe, expect, it } from "vitest";
import { locations } from "@/data/locations";
import { usesMall } from "@/data/location-mall";
import { buildLocalBusinessSchema } from "@/lib/schema";
import { prerenderContent } from "../../scripts/prerender-content";

const text = (path: string) => (prerenderContent(path)?.paragraphs ?? []).filter((p): p is string => typeof p === "string").join("\n");

describe("uppdragsområdet med Mälardalen", () => {
  it("varje Mälardalssida med mallen säger Roslagen, Storstockholm och Mälardalen, och ingen annan mallsida gör det", () => {
    const fel: string[] = [];
    for (const l of locations.filter(usesMall)) {
      const t = text(`/taklaggare-${l.slug}`);
      const sager = t.includes("tar uppdrag i Roslagen, Storstockholm och Mälardalen");
      const gammal = t.includes("tar uppdrag i Roslagen och Storstockholm");
      if (l.region === "Mälardalen" && (!sager || gammal)) fel.push(`${l.slug}: ska säga Mälardalen`);
      if (l.region !== "Mälardalen" && (sager || !gammal)) fel.push(`${l.slug}: ska vara oförändrad`);
    }
    expect(fel).toEqual([]);
  });

  it("schemats beskrivning och areaServed omfattar Mälardalen", () => {
    const s = buildLocalBusinessSchema();
    expect(s.description).toContain("Roslagen, Storstockholm och Mälardalen");
    const namn = s.areaServed.map((a: { name: string }) => a.name);
    for (const ort of ["Mälardalen", "Uppsala", "Västerås", "Eskilstuna", "Strängnäs", "Nyköping"]) expect(namn, ort).toContain(ort);
  });
});
