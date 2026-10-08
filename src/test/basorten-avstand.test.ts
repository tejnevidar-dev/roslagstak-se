/**
 * AG3: orter närmare basen än 5 km får inte avståndsledet i meningen "<ort> tillhör <region> och ligger cirka N km från vår bas i Norrtälje".
 */
import { describe, expect, it } from "vitest";
import { locations } from "@/data/locations";
import { distanceFromBaseKm } from "@/data/service-reach";
import { prerenderContent } from "../../scripts/prerender-content";

describe("avståndsmeningen mot basen", () => {
  it("utelämnas för orter under 5 km (Norrtälje) och står kvar för alla andra", () => {
    const fel: string[] = [];
    for (const l of locations) {
      const rad = (prerenderContent(`/taklaggare-${l.slug}`)?.paragraphs ?? []).find((p) => p.startsWith(`${l.name} tillhör `) && p.includes("Närmaste orter i vårt område"));
      if (!rad) continue; // mallsidor har ingen sådan mening
      const km = distanceFromBaseKm(l);
      const harLed = rad.includes("från vår bas i Norrtälje");
      if (km < 5 && harLed) fel.push(`${l.slug}: avståndsledet står kvar (${km.toFixed(1)} km)`);
      if (km >= 5 && !harLed) fel.push(`${l.slug}: avståndsledet saknas (${km.toFixed(1)} km)`);
    }
    expect(fel.slice(0, 10)).toEqual([]);
    expect(locations.filter((l) => distanceFromBaseKm(l) < 5).map((l) => l.slug)).toEqual(["norrtalje"]);
  });
});
