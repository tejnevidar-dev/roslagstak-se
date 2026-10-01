#!/usr/bin/env bun
/**
 * Kör Lighthouse (mobil) mot produktion för ett fast set nyckelsidor (backlog #1h) och skriver
 * en markdown-tabell. Körs manuellt (inte i postbuild — för långsam och kräver produktions-URL:er
 * + en lokal Chrome). Kräver CHROME_PATH satt till en installerad Chrome/Chromium.
 *
 * Användning: bun scripts/lighthouse-check.ts > ledning/marknad/lighthouse-2026-09-29.md
 */
import { execSync } from "child_process";
import { mkdtempSync, readFileSync, rmSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

const BASE = "https://roslagstak.se";
const PAGES: { label: string; path: string }[] = [
  { label: "Startsidan", path: "/" },
  { label: "Takkontroll", path: "/takkontroll" },
  { label: "Offert (Täby)", path: "/offert/taby" },
  { label: "Offert (Norrtälje)", path: "/offert/norrtalje" },
  { label: "Takbyte Täby", path: "/takbyte-taby" },
  { label: "Projekt: Takbyte Singö", path: "/projekt/takbyte-singo" },
  { label: "Projekt: Nytt tak Blidö", path: "/projekt/takrenovering-blido" },
  { label: "Material", path: "/material" },
  { label: "Takproblem", path: "/takproblem" },
  { label: "Priser", path: "/priser" },
  { label: "Blogg: kostnad takbyte 2026", path: "/blogg/kostnad-takbyte-2026" },
];

interface Row {
  label: string;
  path: string;
  score: number | null;
  fcp: string;
  lcp: string;
  tbt: string;
  cls: string;
  tti: string;
  lcpMs?: number;
  clsValue?: number;
  error?: string;
}

const runOne = (path: string): Omit<Row, "label" | "path"> => {
  const dir = mkdtempSync(join(tmpdir(), "lh-"));
  const outFile = join(dir, "report.json");
  let execError: unknown = null;
  try {
    execSync(
      `bunx lighthouse "${BASE}${path}" --preset=perf --form-factor=mobile --screenEmulation.mobile ` +
        `--output=json --output-path="${outFile}" ` +
        `--chrome-flags="--headless=new --no-sandbox --disable-gpu" --only-categories=performance --quiet`,
      { stdio: ["ignore", "ignore", "ignore"] },
    );
  } catch (e) {
    // chrome-launcher kastar ibland EBUSY vid temp-städning EFTER att rapporten redan skrivits
    // (Windows-specifikt filås-race) — behandla inte som fel förrän vi kollat om filen finns.
    execError = e;
  }
  try {
    const r = JSON.parse(readFileSync(outFile, "utf8"));
    const a = r.audits;
    return {
      score: Math.round((r.categories.performance.score ?? 0) * 100),
      fcp: a["first-contentful-paint"]?.displayValue ?? "–",
      lcp: a["largest-contentful-paint"]?.displayValue ?? "–",
      tbt: a["total-blocking-time"]?.displayValue ?? "–",
      cls: a["cumulative-layout-shift"]?.displayValue ?? "–",
      tti: a["interactive"]?.displayValue ?? "–",
      lcpMs: a["largest-contentful-paint"]?.numericValue,
      clsValue: a["cumulative-layout-shift"]?.numericValue,
    };
  } catch {
    return {
      score: null,
      fcp: "–",
      lcp: "–",
      tbt: "–",
      cls: "–",
      tti: "–",
      error: String(execError ?? "okänt fel: rapportfilen saknades").slice(0, 200),
    };
  } finally {
    try {
      rmSync(dir, { recursive: true, force: true });
    } catch {
      /* Windows kan hålla filen låst en kort stund, strunta i cleanup-felet */
    }
  }
};

const rows: Row[] = PAGES.map(({ label, path }) => {
  process.stderr.write(`[lighthouse-check] ${label} (${path})...\n`);
  return { label, path, ...runOne(path) };
});

console.log(`# Lighthouse mobil — produktion, ${new Date().toISOString().slice(0, 10)}\n`);
console.log("| Sida | Score | FCP | LCP | TBT | CLS | TTI |");
console.log("|---|---|---|---|---|---|---|");
for (const r of rows) {
  if (r.error) {
    console.log(`| ${r.label} (${r.path}) | FEL | | | | | |`);
  } else {
    console.log(`| ${r.label} (${r.path}) | ${r.score} | ${r.fcp} | ${r.lcp} | ${r.tbt} | ${r.cls} | ${r.tti} |`);
  }
}
console.log("\nScore < 50 = dåligt, 50–89 = förbättra, 90+ = bra (Lighthouse mobil-standard).");
console.log("TBT över ~200 ms och LCP över 2,5 s är de vanligaste orsakerna till låg poäng.");

const failed = rows.filter((r) => r.error);
if (failed.length > 0) {
  console.error(`\n[lighthouse-check] ${failed.length} sida(or) kunde inte mätas:`);
  for (const r of failed) console.error(`  - ${r.label}: ${r.error}`);
}

/* CWV-budget (kör: bun run check:cwv). Faller med exit 1 om någon nyckelsida ligger över budget.
   Körs manuellt eller i CI med Chrome installerat — inte i Cloudflare-bygget (ingen Chrome där,
   och mätningen går mot produktion). Budget: LCP ≤ 4,0 s (Lighthouse mobil, strypt nät), CLS ≤ 0,1. */
if (process.argv.includes("--budget")) {
  const LCP_BUDGET_MS = 4000;
  const CLS_BUDGET = 0.1;
  const over = rows.filter((r) => !r.error && ((r.lcpMs ?? 0) > LCP_BUDGET_MS || (r.clsValue ?? 0) > CLS_BUDGET));
  if (over.length > 0 || failed.length > 0) {
    console.error(`
[lighthouse-check] CWV-budget överskriden på ${over.length} sida(or):`);
    for (const r of over) console.error(`  - ${r.label} (${r.path}): LCP ${r.lcp}, CLS ${r.cls}`);
    process.exit(1);
  }
  console.error("
[lighthouse-check] ✓ Alla sidor inom CWV-budget (LCP ≤ 4,0 s, CLS ≤ 0,1).");
}
