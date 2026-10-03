/**
 * Lokal grind (körs via `bun run verify:local`, INTE i produktionsbygget): varje route som
 * prerenderContent() ger `breadcrumbs` för måste ha en BreadcrumbList i den statiska HTML:en i dist/.
 * Fas 2.19 (Marknadschefens beslut 2026-10-03). Ligger utanför postbuild eftersom en variant av
 * den här kontrollen i validate-structured-data.mjs fick Cloudflare-bygget att falla (bisect 10-03).
 */
import { readFileSync, existsSync, readdirSync, statSync, rmSync } from "fs";
import { resolve, join } from "path";
import { tmpdir } from "os";
import { build as esbuild } from "esbuild";
import { pathToFileURL } from "url";

const dist = resolve("dist");
if (!existsSync(dist)) {
  console.error("[check-breadcrumbs] dist/ finns inte — kör bygget först");
  process.exit(1);
}

const bundlePath = resolve(tmpdir(), `prerender-content-bc-${process.pid}.mjs`);
await esbuild({
  entryPoints: [resolve("scripts/prerender-content.ts")],
  outfile: bundlePath,
  bundle: true,
  format: "esm",
  platform: "node",
  target: "node18",
  logLevel: "silent",
});
const { prerenderContent } = await import(pathToFileURL(bundlePath).href);

const errors = [];
let checked = 0;
const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (entry.endsWith(".html")) check(full);
  }
};
const check = (file) => {
  const rel = file.replace(dist, "") || "/index.html";
  if (/[\/]404\.html$/.test(rel)) return;
  const routePath = rel.split("\\").join("/").replace(/\/index\.html$/, "").replace(/\.html$/, "") || "/";
  if (!prerenderContent(routePath)?.breadcrumbs) return;
  checked++;
  const html = readFileSync(file, "utf8");
  const robots = html.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? "";
  if (robots.startsWith("noindex")) return;
  const hasList = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].some((m) => {
    try {
      return JSON.parse(m[1])?.["@type"] === "BreadcrumbList";
    } catch {
      return false;
    }
  });
  if (!hasList) errors.push(rel);
};
walk(dist);
rmSync(bundlePath, { force: true });

console.log(`[check-breadcrumbs] kontrollerade ${checked} sidor som ska ha brödsmula`);
for (const e of errors.slice(0, 40)) console.error(`  FEL ${e}: saknar BreadcrumbList i den statiska HTML:en`);
if (errors.length) {
  console.error(`[check-breadcrumbs] BLOCKERAR: ${errors.length} sidor`);
  process.exit(1);
}
console.log("[check-breadcrumbs] OK");
