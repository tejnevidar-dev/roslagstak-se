/**
 * Grannlistorna (nearbyLocations) pekar bara på orter som finns, med ortens exakta namn (samma regel som det blockerande steget i scripts/geo-graph-audit.ts, som körs i bygget).
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";

describe("nearbyLocations", () => {
  it("varje granne är en ort som finns på sajten, med exakt namn", () => {
    const namn = new Set(locations.map((l) => l.name));
    const fel: string[] = [];
    for (const l of locations) for (const g of l.nearbyLocations) if (!namn.has(g)) fel.push(`${l.slug}: «${g}»`);
    expect(fel).toEqual([]);
  });
});
