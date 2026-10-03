/**
 * SEO-ändringslogg (fas 2.49): strukturerad lista över alla ändringar i sajten, ur git-historiken, plus de manuella
 * titel-/metaändringarna i src/data/overrides/_logg.json. Lokalt verktyg. Kör: bun scripts/seo-changelog.ts
 * Skriver: ledning/marknad/seo-andringslogg.md (datum, commit, ändring, antal filer, berörda sidtyper).
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const git = (...args: string[]) => execFileSync("git", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
const SINCE = process.argv.find((a) => a.startsWith("--since="))?.split("=")[1] ?? "2026-09-01";
const raw = git("log", `--since=${SINCE}`, "--date=short", "--name-only", "--format=@@%ad|%h|%s");

type Entry = { date: string; hash: string; subject: string; files: string[] };
const entries: Entry[] = [];
for (const block of raw.split("@@").slice(1)) {
  const [head, ...rest] = block.split("\n");
  const [date, hash, ...subj] = head.split("|");
  entries.push({ date, hash, subject: subj.join("|"), files: rest.map((l) => l.trim()).filter(Boolean) });
}

const area = (files: string[]) => {
  const a = new Set<string>();
  for (const f of files) {
    if (/blog-posts/.test(f)) a.add("blogg");
    else if (/locations|location-|region|villa-areas|service-location/.test(f)) a.add("orter");
    else if (/service-|Services\.tsx|ServiceDetail/.test(f)) a.add("tjänstesidor");
    else if (/overrides|seo-regler/.test(f)) a.add("Command Center");
    else if (/prices|priser|Prices/i.test(f)) a.add("priser");
    else if (/sitemap|schema|canonical|seo-fit|prerender|generate-static/.test(f)) a.add("teknisk SEO");
    else if (/scripts\//.test(f)) a.add("verktyg");
    else if (/test\//.test(f)) a.add("tester");
    else a.add("övrigt");
  }
  return [...a].join(", ");
};

const out = ["# SEO-ändringslogg", ""];
out.push(`Genererad av \`bun scripts/seo-changelog.ts\` ur git-historiken (sedan ${SINCE}), ${entries.length} commits. Skäl och bevis per ändring står i commit-meddelandet och i \`seo-program-status.md\`. Manuella titel- och metaändringar med före/efter-värden: \`src/data/overrides/_logg.json\`, publicerad på /seo-overrides-logg.json.`, "");
out.push("| Datum | Commit | Ändring | Filer | Område |", "|---|---|---|---|---|");
for (const e of entries) out.push(`| ${e.date} | ${e.hash} | ${e.subject.replace(/\|/g, "/").slice(0, 170)} | ${e.files.length} | ${area(e.files)} |`);

try {
  const logg = JSON.parse(readFileSync(resolve("src/data/overrides/_logg.json"), "utf8")) as { rader: { id: string; path: string; falt: string; fore: string | null; efter: string; tid: string }[] };
  out.push("", "## Manuella och automatiska fältändringar (_logg.json)", "", "| Tid | Id | Sida | Fält | Före | Efter |", "|---|---|---|---|---|---|");
  for (const r of logg.rader) out.push(`| ${r.tid.slice(0, 10)} | ${r.id} | ${r.path} | ${r.falt} | ${(r.fore ?? "–").slice(0, 80)} | ${r.efter.slice(0, 80)} |`);
} catch {
  /* ingen logg */
}
writeFileSync(resolve("../ledning/marknad/seo-andringslogg.md"), out.join("\n") + "\n");
console.log(`[seo-changelog] ${entries.length} commits → ledning/marknad/seo-andringslogg.md`);
