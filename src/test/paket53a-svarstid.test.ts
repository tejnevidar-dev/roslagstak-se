/**
 * Paket 53a (Marknadschefen 2026-10-11, grindsvar 18:26 punkt 6): svarstiden i EN lydelse, "Vi svarar inom 24 timmar" (S1), på alla ställen utom startsidans text
 * (paket 52, går till Vidar) och LeadForm.tsx (rörs inte), samt menyns underrad ("Vi svarar inom 24 timmar och bokar en tid").
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { prerenderContent } from "../../scripts/prerender-content";

const walk = (d: string): string[] => readdirSync(d).flatMap((f) => { const x = join(d, f); return statSync(x).isDirectory() ? (f === "test" ? [] : walk(x)) : /\.tsx?$/.test(f) ? [x] : []; });
const kallor = () => [...walk("src"), "scripts/prerender-content.ts"];
// Rader som med flit står kvar (se Del 53a): startsidans text (paket 52) och LeadForm.tsx (rörs inte)
const MED_FLIT = [
  "src/components/LeadForm.tsx",
  "src/data/home-area.ts",
  "src/data/home-faqs.ts",
];

describe("paket 53a: svarstiden", () => {
  it("'återkopplar/återkommer inom 24 timmar' och 'Återkoppling inom 24 timmar' finns inte kvar utanför startsidans text och LeadForm", () => {
    const traffar: string[] = [];
    for (const f of kallor().map((x) => x.replace(/\\/g, "/"))) {
      if (MED_FLIT.includes(f)) continue;
      const rader = readFileSync(f, "utf8").split(/\r?\n/);
      rader.forEach((r, i) => {
        if (!/(återkopplar|återkommer|Återkoppling)[^.]{0,30}inom 24|[Åå]terkoppling inom 24/i.test(r)) return;
        if (f === "scripts/prerender-content.ts" && r.includes("Boka en kostnadsfri takkontroll. Vi återkopplar inom 24 timmar. Ring")) return; // startsidan, paket 52
        traffar.push(`${f}:${i + 1}`);
      });
    }
    expect(traffar).toEqual([]);
  });

  it("de gemensamma mallarna säger 'Vi svarar inom 24 timmar'", () => {
    expect(readFileSync("src/data/blog-template-text.ts", "utf8")).toContain("Kostnadsfri takkontroll utan förpliktelser. Vi svarar inom 24 timmar.");
    expect(readFileSync("src/data/location-page-text.ts", "utf8")).toContain("Vi svarar inom 24 timmar.");
    expect(readFileSync("src/data/service-location-text.ts", "utf8")).toContain("Vi svarar inom 24 timmar.");
    const c = readFileSync("src/data/service-location-combos.ts", "utf8");
    expect(c.split("Vi svarar inom 24 timmar.").length - 1).toBeGreaterThanOrEqual(3);
    expect(c).toContain("Kontakta oss så svarar vi inom 24 timmar.");
  });

  it("annonssidorna (landing-services) och /brf-texterna säger 'Vi svarar inom 24 timmar'", () => {
    const l = readFileSync("src/data/landing-services.ts", "utf8");
    expect(l.split("Vi svarar inom 24 timmar").length - 1).toBeGreaterThanOrEqual(8);
    expect(readFileSync("src/data/brf-sections.ts", "utf8")).toContain("Vi svarar inom 24 timmar och bokar en tid som passar styrelsen.");
    expect(readFileSync("src/pages/BrfPage.tsx", "utf8")).toContain("Vi svarar inom 24 timmar för att stämma av tid för takkontroll.");
  });

  it("/kontakt: React-sidan och serverns HTML säger 'svarar' och 'Svar inom 24 timmar'", () => {
    const r = readFileSync("src/pages/ContactLanding.tsx", "utf8");
    expect(r).toContain("2. Vi svarar inom 24 timmar");
    expect(r).toContain("Vi svarar inom 24 timmar och bokar in din kostnadsfria takkontroll.");
    expect(r).not.toContain("24h");
    const p = prerenderContent("/kontakt")!;
    expect(p.description).toContain("Svar inom 24 timmar.");
    expect(p.intro).toContain("Vi svarar inom 24 timmar");
  });

  it("offertkonfiguratorn säger 'Vi svarar inom 24 timmar'", () => {
    const q = readFileSync("src/components/QuoteConfigurator.tsx", "utf8");
    expect(q).not.toMatch(/återkopplar/);
    expect(q).toContain("Vi svarar <strong>inom 24 timmar</strong>");
  });

  it("menyns underrad för takkontrollen säger 'Vi svarar inom 24 timmar och bokar en tid'", () => {
    expect(readFileSync("src/components/Header.tsx", "utf8")).toContain('note: "Vi svarar inom 24 timmar och bokar en tid",');
    expect(readFileSync("src/components/Header.tsx", "utf8")).not.toContain("Vi ringer upp och bokar takkontroll");
  });
});
