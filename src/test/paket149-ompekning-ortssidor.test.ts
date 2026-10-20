/**
 * Paket 149 (Marknadschefen 2026-10-20 23:30): inga 301-rader pekar på startsidan (Google läser det ofta som en sida som inte finns).
 * De sju adresserna pekas i stället på ortens egen sida, eller på /taklaggare-stockholm för Hammarby sjöstad och Södermalm.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const rot = resolve(__dirname, "../..");
const text = readFileSync(resolve(rot, "public/_redirects"), "utf8");
const rader = text.split(/\r?\n/).map((r) => r.trim()).filter((r) => r && !r.startsWith("#")).map((r) => r.split(/\s+/));
const sitemap = readFileSync(resolve(rot, "public/sitemap.xml"), "utf8");

const FORVANTAT: Record<string, string> = {
  "/takbyte-hammarby-sjostad": "/taklaggare-stockholm",
  "/takbyte-sodermalm": "/taklaggare-stockholm",
  "/takomlaggning-sodermalm": "/taklaggare-stockholm",
  "/takbyte-handen": "/taklaggare-handen",
  "/takbyte-rotebro": "/taklaggare-rotebro",
  "/takomlaggning-furusund": "/taklaggare-furusund",
  "/takrenovering-arholma": "/taklaggare-arholma",
};

describe("paket 149: ompekning utan startsidan som mål", () => {
  it("ingen regel pekar på startsidan", () => {
    expect(rader.filter(([, mal]) => mal === "/").map((r) => r[0])).toEqual([]);
    expect(text).not.toMatch(/^# -> \/ \(/m);
  });
  it("de sju adresserna pekar på rätt ortssida, med 301, och målet finns i sajtkartan", () => {
    for (const [kalla, mal] of Object.entries(FORVANTAT)) {
      const r = rader.filter(([k]) => k === kalla);
      expect(r, kalla).toEqual([[kalla, mal, "301"]]);
      expect(sitemap, mal).toContain(`<loc>https://roslagstak.se${mal}</loc>`);
    }
  });
  it("rubrikernas antal stämmer med raderna under dem", () => {
    const rl = text.split(/\r?\n/);
    rl.forEach((l, i) => {
      const m = l.match(/^# -> (\S+) \((\d+)\)$/);
      if (!m) return;
      let n = 0;
      for (let k = i + 1; k < rl.length && /^\/\S+ \/\S* 301$/.test(rl[k]); k++) n++;
      expect(n, l).toBe(+m[2]);
    });
  });
});
