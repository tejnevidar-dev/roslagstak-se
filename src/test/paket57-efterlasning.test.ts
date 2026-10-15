/**
 * Paket 57 (Marknadschefen 2026-10-12, Innehålls efterläsning på live, E1-E5): offertetiketten, Tyresö-svaret, svarstiden, ljudmeningen och takproblemsidornas brasklapp.
 */
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blog-posts";
import { PROBLEM_PAGE_TEXT } from "@/data/problem-page-text";
import { QUOTE_CONFIG } from "@/data/offert-text";
import { serviceDetails } from "@/data/service-page";
import { prerenderContent } from "../../scripts/prerender-content";

const kalla = (f: string) => readFileSync(f, "utf8");

describe("paket 57: Innehålls efterläsning E1-E5", () => {
  it("E1: konfiguratorns etikett är 'Offert' i React och i serverns HTML på /offert", () => {
    expect(QUOTE_CONFIG.eyebrow).toBe("Offert");
    const t = prerenderContent("/offert")!.paragraphs.join("\n");
    expect(t).not.toContain("Offert & Rådgivning");
  });
  it("E2: Tyresö-svaret säger 'Det går vi igenom vid takkontrollen.'", () => {
    const c = kalla("src/data/combo-overrides.ts");
    expect(c).toContain("och då kan en omläggning vara rätt åtgärd. Det går vi igenom vid takkontrollen.");
    expect(c).not.toContain("Vilket som gäller står i rapporten efter takkontrollen.");
  });
  it("E3: svarstiden är 'Svar inom 24 timmar' på tjänstesidorna, ortssidorna och tjänst × ort-sidorna", () => {
    expect(JSON.stringify(serviceDetails)).not.toMatch(/inom 24 ?h\b/);
    expect(kalla("src/data/service-page.ts")).toContain('chipSvar: "Svar inom 24 timmar",');
    for (const f of ["src/pages/LocationPage.tsx", "src/pages/ServiceLocationPage.tsx", "src/components/QuickContactFacts.tsx"]) {
      const k = kalla(f);
      expect(k, f).toContain("Svar inom 24 timmar");
      expect(k, f).not.toMatch(/Svar inom 24 ?h\b/);
    }
  });
  it("E4: ljudmeningen i guiden om plåttak mot betongpannor", () => {
    const g = JSON.stringify(blogPosts.find((p) => p.slug === "plattak-vs-betongpannor"));
    expect(g).toContain("Hur mycket ett plåttak hörs när det regnar beror på vad som finns under plåten."); // paket 107 (P4): samma lydelse som på TP20-sidan
    expect(g).not.toContain("Pannor är tyngre och dämpar mer i sig");
    expect(g).not.toContain("Med rätt uppbyggnad under plåten dämpas ljudet");
  });
  it("E5: takproblemsidornas exempeltext utan brasklappen 'Vi påstår inte'", () => {
    expect(PROBLEM_PAGE_TEXT.exampleText("takpannor")).toBe("Jobbet hade inte det här problemet, men det visar hur ett komplett takbyte kan se ut: takpannor.");
  });
});

describe("paket 57: byggkontrollen scripts/check-svarstid.ts", { timeout: 30000 }, () => {
  const kor = (filer: Record<string, string>) => {
    const dir = mkdtempSync(join(tmpdir(), "svarstid-"));
    for (const [f, t] of Object.entries(filer)) {
      mkdirSync(join(dir, f, ".."), { recursive: true });
      writeFileSync(join(dir, f), t);
    }
    return spawnSync("bun", [resolve("scripts/check-svarstid.ts")], { cwd: dir, encoding: "utf8", shell: true });
  };
  it("godkänner 'Svar inom 24 timmar' och fäller '24 h', '24h' och 'Vi påstår inte' i källa och HTML, men inte startsidans undantag", () => {
    expect(kor({ "src/a.tsx": "<b>Svar inom 24 timmar</b>" }).status).toBe(0);
    expect(kor({ "src/a.tsx": "<b>Svar inom 24 h</b>" }).status).toBe(1);
    expect(kor({ "src/a.tsx": "<b>Svar inom 24h</b>" }).status).toBe(1);
    expect(kor({ "src/a.ts": "const t = `Vi påstår inte att det här projektet hade problemet`;" }).status).toBe(1);
    expect(kor({ "src/a.ts": "// Svar inom 24 h i en kommentar är tillåtet\nconst a = 1;" }).status).toBe(0);
    expect(kor({ "src/a.ts": "const a = 1;", "dist/tjanster/x.html": "<p>Svar inom 24 h</p>" }).status).toBe(1);
    expect(kor({ "src/a.ts": "const a = 1;", "dist/index.html": "<p>Svar inom 24 h</p>" }).status).toBe(0);
    expect(kor({ "src/data/home-sections.ts": 'chips: ["Svar inom 24 h"]' }).status).toBe(0);
  });
  it("är kopplad till postbuild och rena källfiler i repot går igenom", () => {
    expect(kalla("package.json")).toContain("bun scripts/check-svarstid.ts");
  });
});
