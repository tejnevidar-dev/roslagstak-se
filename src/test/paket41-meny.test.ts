/**
 * Paket 41 (Vidars ja 2026-10-11): menyposten "Boka kostnadsfri takkontroll" under "Få offert" leder till /takkontroll i stället för /offert#radgivning.
 * Texten och underraden är oförändrade.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("paket 41: menyposten leder till /takkontroll", () => {
  it("målet är /takkontroll, texten och underraden är oförändrade", () => {
    const t = readFileSync("src/components/Header.tsx", "utf8").replace(/\r/g, "");
    expect(t).toContain('label: "Boka kostnadsfri takkontroll",\n    to: "/takkontroll",\n    note: "Vi ringer upp och bokar takkontroll",');
    expect(t).not.toContain('"/offert#radgivning"');
  });
});
