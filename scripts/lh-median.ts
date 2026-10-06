#!/usr/bin/env bun
/**
 * Lighthouse (mobil) mot produktion, N körningar per sida, och medianen av LCP, TBT och poäng. En enskild körning här varierar
 * mycket (±30 %, och ibland ger Chrome ingen rapport alls, som lighthouse-check.ts då skriver som poäng 0), så före/efter-jämförelser
 * ska göras på medianen.
 * Användning: CHROME_PATH=… bun scripts/lh-median.ts [--runs=3] [--base=https://roslagstak.se] /sida1 /sida2
 */
import { execSync } from "child_process";
import { mkdtempSync, readFileSync, rmSync, existsSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

const args = process.argv.slice(2);
const runs = Number(args.find((a) => a.startsWith("--runs="))?.slice(7) ?? 3);
const base = args.find((a) => a.startsWith("--base="))?.slice(7) ?? "https://roslagstak.se";
const pages = args.filter((a) => a.startsWith("/"));
const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  return s.length ? s[Math.floor((s.length - 1) / 2)] : NaN;
};
const sec = (ms: number) => (Number.isNaN(ms) ? "–" : (ms / 1000).toFixed(1) + " s");

console.log("| Sida | Körningar | Poäng (median) | FCP | LCP (median) | LCP min–max | TBT (median) | TTI (median) |");
console.log("|---|---|---|---|---|---|---|---|");
for (const path of pages) {
  const lcp: number[] = [];
  const tbt: number[] = [];
  const fcp: number[] = [];
  const tti: number[] = [];
  const score: number[] = [];
  let fail = 0;
  for (let i = 0; i < runs; i++) {
    const dir = mkdtempSync(join(tmpdir(), "lhm-"));
    const out = join(dir, "r.json");
    const cmd =
      "bunx lighthouse " + JSON.stringify(base + path) +
      " --preset=perf --form-factor=mobile --screenEmulation.mobile --output=json --output-path=" + JSON.stringify(out) +
      ' --chrome-flags="--headless=new --no-sandbox --disable-gpu" --only-categories=performance --quiet';
    try {
      execSync(cmd, { stdio: "ignore" });
    } catch {
      /* chrome-launcher kastar ibland EBUSY efter att rapporten skrivits */
    }
    let ok = false;
    if (existsSync(out)) {
      try {
        const r = JSON.parse(readFileSync(out, "utf8"));
        const a = r.audits;
        const l = a["largest-contentful-paint"]?.numericValue;
        if (typeof l === "number") {
          lcp.push(l);
          fcp.push(a["first-contentful-paint"].numericValue);
          tbt.push(a["total-blocking-time"]?.numericValue ?? NaN);
          tti.push(a["interactive"]?.numericValue ?? NaN);
          score.push(Math.round((r.categories.performance.score ?? 0) * 100));
          ok = true;
        }
      } catch {
        /* trasig rapport räknas som utan rapport */
      }
    }
    if (!ok) fail++;
    try {
      rmSync(dir, { recursive: true, force: true });
    } catch {
      /* */
    }
  }
  const tbtMed = median(tbt);
  console.log(
    "| " + path + " | " + lcp.length + "/" + runs + (fail ? " (" + fail + " utan rapport)" : "") +
      " | " + median(score) + " | " + sec(median(fcp)) + " | " + sec(median(lcp)) +
      " | " + sec(Math.min(...lcp)) + "–" + sec(Math.max(...lcp)) +
      " | " + (Number.isNaN(tbtMed) ? "–" : Math.round(tbtMed) + " ms") + " | " + sec(median(tti)) + " |",
  );
}
