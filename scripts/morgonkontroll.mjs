/**
 * Morgonkontroll i ett kommando (AG6): kör M3 (kontroll-efter-slapp.mjs), live-status över alla adresser i sajtkartan och formulärkontrollen
 * till nätverksgränsen för alla sex formulär (utan inlämning), och skriver EN fil per dag med JA eller NEJ överst.
 *
 * Körning (från webbsida/):  CHROME_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe" bun scripts/morgonkontroll.mjs [--base=https://roslagstak.se] [--ut=../ledning/marknad]
 * Filen heter morgonkontroll-ÅÅÅÅ-MM-DD.md. Körs den flera gånger samma dag skrivs filen över (senaste körningen gäller).
 * Läser bara: inget formulär skickas (nätverket stängs av innan "Skicka" trycks), inga sidor ändras.
 * Exit-kod 0 vid JA, 1 vid NEJ.
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { chromium } from "playwright-core";

const arg = (n, d) => process.argv.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3) ?? d;
const base = arg("base", "https://roslagstak.se").replace(/\/$/, "");
const utMapp = resolve(arg("ut", "../ledning/marknad"));
mkdirSync(utMapp, { recursive: true });
const dag = new Date().toLocaleDateString("sv-SE");
const fil = join(utMapp, `morgonkontroll-${dag}.md`);
const delFil = (n) => join(utMapp, `morgonkontroll-${dag}-${n}`);
const klockan = new Date().toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
const bun = process.execPath;

const kor = (skript, args, tidsgräns) => spawnSync(bun, [skript, ...args], { encoding: "utf8", env: process.env, timeout: tidsgräns, maxBuffer: 64 * 1024 * 1024 });

// 1. M3
const m3Fil = delFil("m3.md");
const m3 = kor("scripts/kontroll-efter-slapp.mjs", [`--base=${base}`, `--ut=${m3Fil}`], 25 * 60 * 1000);
const m3Rad = (m3.stdout ?? "").match(/(\d+)\/(\d+) JA/);
const m3Ok = !!m3Rad && m3Rad[1] === m3Rad[2] && m3.status === 0;
const m3Nej = existsSync(m3Fil) ? readFileSync(m3Fil, "utf8").split("\n").filter((r) => r.startsWith("| **NEJ**")).slice(0, 10) : [];
const m3Text = m3Rad ? `${m3Rad[1]} av ${m3Rad[2]} punkter JA` : `körningen gav inget resultat (${String(m3.error ?? m3.stderr ?? "").slice(0, 120)})`;

// 2. Live-status
const lsFil = delFil("live-status.md");
const ls = kor("scripts/live-status.mjs", [base, lsFil], 25 * 60 * 1000);
const lsRad = (ls.stdout ?? "").match(/avvikelser: (\d+)/);
const lsAdresser = (ls.stdout ?? "").match(/200,(\d+)/);
const lsOk = !!lsRad && lsRad[1] === "0" && ls.status === 0;
const lsText = lsRad ? `${lsAdresser ? lsAdresser[1] + " adresser = 200, " : ""}${lsRad[1]} avvikelser` : `körningen gav inget resultat (${String(ls.error ?? ls.stderr ?? "").slice(0, 120)})`;

// 3. Formulärkontrollen till nätverksgränsen, alla sex formulär, utan inlämning
const SIDOR = ["/takkontroll", "/kontakt", "/offert", "/brf", "/boka-takkontroll", "/offert/taby"];
const formulär = [];
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, headless: true });
for (const path of SIDOR) {
  const r = { path, knappNar: false, svarFranServer: 0, stoppadeSkick: [], besokaren: "", fel: "" };
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage();
  p.on("response", (x) => { const q = x.request(); if (q.method() !== "GET" && /supabase|quote_requests|webhook/i.test(q.url())) r.svarFranServer++; });
  p.on("requestfailed", (x) => { if (x.method() !== "GET") r.stoppadeSkick.push(`${x.method()} ${x.url().replace(/\?.*/, "")}`); });
  try {
    await p.goto(base + path, { waitUntil: "networkidle" });
    const kaka = p.getByRole("button", { name: /nödvändiga|necessary/i }).first();
    if (await kaka.count()) { await kaka.click().catch(() => {}); await p.waitForTimeout(600); }
    const form = p.locator("form").filter({ has: p.locator("input[type=tel]") }).first();
    if (!(await form.count())) throw new Error("hittade inget formulär med telefonfält");
    const texter = form.locator("input:not([type=tel]):not([type=email]):not([type=checkbox]):not([type=radio]):not([type=hidden]):not([type=submit])");
    for (let k = 0; k < (await texter.count()); k++) await texter.nth(k).fill("TEST – radera").catch(() => {});
    await form.locator("input[type=tel]").first().fill("0700000000");
    const mejl = form.locator("input[type=email]");
    for (let k = 0; k < (await mejl.count()); k++) await mejl.nth(k).fill("test@example.invalid").catch(() => {});
    const ta = form.locator("textarea");
    for (let k = 0; k < (await ta.count()); k++) await ta.nth(k).fill("TEST – skickas inte, nätverket är avstängt").catch(() => {});
    const sel = form.locator("select");
    for (let k = 0; k < (await sel.count()); k++) await sel.nth(k).selectOption({ index: 1 }).catch(() => {});
    const cb = form.locator("input[type=checkbox]");
    for (let k = 0; k < (await cb.count()); k++) await cb.nth(k).check().catch(() => {});
    const knapp = form.locator("button[type=submit]").first();
    await knapp.evaluate((b) => b.scrollIntoView({ block: "center" }));
    await p.waitForTimeout(800);
    r.knappNar = await knapp.evaluate((b) => { const q = b.getBoundingClientRect(); const e = document.elementFromPoint(q.x + q.width / 2, q.y + q.height / 2); return !!e && (b === e || b.contains(e)); });
    await ctx.setOffline(true);
    await knapp.click({ force: true });
    await p.waitForTimeout(2500);
    r.besokaren = (await p.evaluate(() => [...document.querySelectorAll("[role=status],[data-sonner-toast],li[data-state=open],.toast,[role=alert]")].map((e) => (e.textContent || "").replace(/\s+/g, " ").trim().slice(0, 100)).filter(Boolean).join(" | ")));
  } catch (e) {
    r.fel = String(e).slice(0, 120);
  }
  r.ok = !r.fel && r.knappNar && r.svarFranServer === 0 && r.stoppadeSkick.some((s) => /quote_requests/.test(s));
  formulär.push(r);
  await ctx.close();
}
await browser.close();
const formOk = formulär.every((f) => f.ok);

const allt = m3Ok && lsOk && formOk;
const orsaker = [!m3Ok && `M3: ${m3Text}`, !lsOk && `live-status: ${lsText}`, !formOk && `formulär: ${formulär.filter((f) => !f.ok).map((f) => f.path).join(", ")}`].filter(Boolean);
const md = [
  allt ? "**JA**" : `**NEJ**: ${orsaker.join("; ")}`,
  "",
  `# Morgonkontroll ${dag} ${klockan} (${base})`,
  "",
  "Kör M3, live-status över sajtkartan och formulärkontrollen till nätverksgränsen (alla sex formulär, utan inlämning) i ett kommando: `bun scripts/morgonkontroll.mjs`. JA kräver att alla tre är gröna.",
  "",
  "| Kontroll | Resultat | Detalj |",
  "|---|---|---|",
  `| M3 (kontroll-efter-slapp) | ${m3Ok ? "JA" : "**NEJ**"} | ${m3Text}; fil: \`${m3Fil.split(/[\\/]/).pop()}\` |`,
  `| Live-status (sajtkartan) | ${lsOk ? "JA" : "**NEJ**"} | ${lsText}; fil: \`${lsFil.split(/[\\/]/).pop()}\` |`,
  `| Formulär till nätverksgränsen | ${formOk ? "JA" : "**NEJ**"} | ${formulär.filter((f) => f.ok).length} av ${formulär.length} formulär |`,
  "",
  ...(m3Nej.length ? ["## M3: punkter som fick NEJ", "", ...m3Nej, ""] : []),
  "## Formulär (inget skickas: nätverket stängs av innan Skicka)",
  "",
  "| Sida | Skicka-knappen går att nå | Svar från servern (ska vara 0) | Anropet stoppades vid nätverksgränsen | Det besökaren ser | Resultat |",
  "|---|---|---|---|---|---|",
  ...formulär.map((f) => `| \`${f.path}\` | ${f.knappNar ? "JA" : "**NEJ**"} | ${f.svarFranServer} | ${f.stoppadeSkick.map((s) => s.replace(/^POST https:\/\/[^/]+/, "POST ")).join(", ") || "inget anrop"} | ${f.besokaren || f.fel || "–"} | ${f.ok ? "JA" : "**NEJ**"} |`),
  "",
];
writeFileSync(fil, md.join("\n"));
console.log(`${allt ? "JA" : "NEJ"}: ${fil}`);
process.exit(allt ? 0 : 1);
