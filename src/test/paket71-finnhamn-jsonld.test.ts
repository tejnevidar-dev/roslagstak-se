/**
 * Paket 71 (Marknadschefen 2026-10-12): en avindexerad ort (src/data/avindexerade-orter.ts) står inte som plats vi tar uppdrag på i den strukturerade datan.
 * Listan med Place-poster i företagsnoden (startsidan och /kontakt) följer avindexerade-orter.ts, och byggkontrollen scripts/check-avindexerade.ts fäller
 * en indexerbar sida vars JSON-LD anger en avindexerad ort.
 */
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { AVINDEXERADE_ORTER } from "@/data/avindexerade-orter";
import { avindexeradeGuidevagar } from "@/data/avindexerade-guider";
import { avindexeradeOrtsvagar } from "@/data/avindexerade-orter";
import { locationIndex } from "@/data/location-index";
import { buildLocalBusinessLeanSchema, buildLocalBusinessSchema, serviceRegions } from "@/lib/schema";

const namnPaAvindexerade = AVINDEXERADE_ORTER.map((s) => locationIndex.find((l) => l.slug === s)!.name);

describe("paket 71: företagsnodens platser", () => {
  it("ingen avindexerad ort står som Place i areaServed, men de övriga orterna står kvar", () => {
    const s = buildLocalBusinessSchema() as { areaServed: { "@type": string; name: string }[] };
    const platser = s.areaServed.filter((a) => a["@type"] === "Place").map((a) => a.name);
    for (const n of namnPaAvindexerade) expect(platser, n).not.toContain(n);
    expect(namnPaAvindexerade).toContain("Finnhamn");
    for (const ok of ["Husarö", "Ingmarsö", "Norrtälje"]) expect(platser, ok).toContain(ok);
    const synliga = locationIndex.filter((l) => !AVINDEXERADE_ORTER.includes(l.slug));
    expect(platser).toHaveLength(synliga.length);
  });
  it("regionerna är oförändrade och inga avindexerade orter finns i den lätta noden", () => {
    expect(serviceRegions).toContain("Mellersta skärgården");
    expect(JSON.stringify(buildLocalBusinessLeanSchema())).not.toContain("Finnhamn");
    expect(JSON.stringify(buildLocalBusinessSchema())).not.toContain("Finnhamn");
  });
});

describe("paket 71: byggkontrollen scripts/check-avindexerade.ts", { timeout: 60000 }, () => {
  const sidor = [...avindexeradeGuidevagar(), ...avindexeradeOrtsvagar()];
  const html = (robots: string, jsonld: unknown, extra = "") =>
    `<!doctype html><html><head><meta name="robots" content="${robots}"><script type="application/ld+json">${JSON.stringify(jsonld)}</script></head><body>${extra}</body></html>`;
  const kor = (indexerbar: unknown) => {
    const dir = mkdtempSync(join(tmpdir(), "avindex-"));
    mkdirSync(join(dir, "dist"), { recursive: true });
    for (const p of sidor) {
      const f = join(dir, "dist", p.replace(/^\//, "") + ".html");
      mkdirSync(join(f, ".."), { recursive: true });
      writeFileSync(f, html("noindex, follow", { "@type": "Place", name: "Finnhamn" }));
    }
    writeFileSync(join(dir, "dist", "index.html"), html("index, follow", indexerbar));
    return spawnSync("bun", [resolve("scripts/check-avindexerade.ts")], { cwd: dir, encoding: "utf8", shell: true });
  };
  it("fäller en indexerbar sida som anger en avindexerad ort i areaServed, och noindex-sidorna får ange den", () => {
    const r = kor({ "@type": "RoofingContractor", areaServed: [{ "@type": "Place", name: "Husarö" }, { "@type": "Place", name: "Finnhamn" }] });
    expect(r.status).toBe(1);
    expect(r.stderr).toContain("/index: JSON-LD anger den avindexerade orten Finnhamn som plats");
  });
  it("fäller också när orten står som sträng i areaServed eller som addressLocality", () => {
    expect(kor({ areaServed: "Finnhamn" }).status).toBe(1);
    expect(kor({ address: { addressLocality: "Finnhamn" } }).status).toBe(1);
  });
  it("godkänner en indexerbar sida utan ortens namn som plats, och ortens namn i en adress räknas inte", () => {
    expect(kor({ areaServed: [{ "@type": "Place", name: "Husarö" }] }).status).toBe(0);
    expect(kor({ "@type": "WebPage", url: "https://roslagstak.se/blogg/takbyte-husaro-finnhamn-oar", headline: "Takbyte på Husarö" }).status).toBe(0);
  });
});
