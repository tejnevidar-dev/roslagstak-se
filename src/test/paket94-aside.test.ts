/**
 * Paket 94 (Marknadschefen 2026-10-14): rutan "Boka takkontroll" på ALLA tjänstesidor (/tjanster/<slug>) har K3-lydelsen i stället för "Vi återkommer med ett fast pris för ditt projekt
 * efter kostnadsfri takkontroll." Den gemensamma texten SERVICE_COPY.asideText byts, och den egna lydelsen för takomläggning (paket 93) tas bort.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { prerenderContent } from "../../scripts/prerender-content";
import { SERVICE_COPY, serviceMeta } from "@/data/service-page";

const NY = "Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris.";
const GAMMAL = "Vi återkommer med ett fast pris för ditt projekt efter kostnadsfri takkontroll.";
const text = (p: string) => {
  const s = prerenderContent(p)!;
  return [s.intro ?? "", ...s.paragraphs.map((x) => (typeof x === "string" ? x : ""))].join("\n");
};

describe("paket 94: K3-lydelsen i rutan 'Boka takkontroll' på alla tjänstesidor", () => {
  it("den gemensamma texten är K3 ordagrant, och ingen egen lydelse per tjänst finns kvar", () => {
    expect(SERVICE_COPY.asideText).toBe(NY);
    for (const [slug, meta] of Object.entries(serviceMeta)) expect((meta as { asideText?: string }).asideText, slug).toBeUndefined();
    const k = readFileSync("src/pages/ServiceDetail.tsx", "utf8");
    expect(k).toContain("{SERVICE_COPY.asideText}");
    expect(k).not.toContain("meta.asideText");
  });
  it("varje tjänstesida i serverns HTML har K3-lydelsen och inte den gamla", () => {
    const slugs = Object.keys(serviceMeta);
    expect(slugs.length).toBeGreaterThanOrEqual(9);
    let antal = 0;
    for (const slug of slugs) {
      if (!prerenderContent("/tjanster/" + slug)) continue;
      antal++;
      const t = text("/tjanster/" + slug);
      expect(t, slug).toContain(NY);
      expect(t, slug).not.toContain(GAMMAL);
    }
    expect(antal).toBeGreaterThanOrEqual(9);
  });
  it("ingen annan källfil har den gamla meningen kvar", () => {
    for (const f of ["src/data/service-page.ts", "src/data/service-taksakerhet.ts", "src/data/service-blocks.ts", "src/data/page-extras.ts"]) expect(readFileSync(f, "utf8"), f).not.toContain(GAMMAL);
  });
});

describe("paket 94: 'AMA-standard' är rättat till 'enligt AMA' överallt i src (samma regel som T2)", () => {
  it("ingen källfil utom proven har 'AMA-standard', och taksäkerhetssidan säger 'Utförande: enligt AMA'", () => {
    const fel: string[] = [];
    const gå = (d: string) => {
      for (const n of readdirSync(d)) {
        const p = join(d, n);
        if (statSync(p).isDirectory()) { if (n !== "test" && n !== "assets") gå(p); }
        else if (/\.(ts|tsx|json|md)$/.test(n) && /AMA[- ]?standard/i.test(readFileSync(p, "utf8"))) fel.push(p);
      }
    };
    gå("src");
    expect(fel).toEqual([]);
    expect(text("/tjanster/taksakerhet")).toContain("Utförande: enligt AMA");
    expect(text("/tjanster/taksakerhet")).not.toContain("AMA-standard");
  });
});
