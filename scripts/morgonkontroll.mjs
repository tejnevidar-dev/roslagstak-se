/**
 * Morgonkontroll i ett kommando (AG6): kör M3 (kontroll-efter-slapp.mjs), live-status över alla adresser i sajtkartan och formulärkontrollen
 * till nätverksgränsen för alla sex formulär (utan inlämning), lagringsfallet "all lagring blockerad" (startsidan och alla sex formulär med localStorage och
 * sessionStorage som kastar SecurityError, som i Chrome med alla kakor blockerade), och skriver EN fil per dag med JA eller NEJ överst.
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
/** --lokalt: provkörning mot ett lokalt bygge. Alla anrop utanför --base stoppas (annars väntar sidan på externa tjänster). */
const lokalt = process.argv.includes("--lokalt");
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

// 3. Formulärkontrollen till nätverksgränsen, alla sex formulär, utan inlämning. 4. Samma sex formulär med all lagring blockerad, och startsidan.
const SIDOR = ["/takkontroll", "/kontakt", "/offert", "/brf", "/boka-takkontroll", "/offert/taby"];
/** localStorage och sessionStorage kastar SecurityError vid åtkomst, som i Chrome med alla kakor blockerade (paket 45). */
const BLOCKERA = () => {
  for (const n of ["localStorage", "sessionStorage"]) Object.defineProperty(window, n, { configurable: true, get() { throw new DOMException("blockerad", "SecurityError"); } });
};
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, headless: true });
const nyttFonster = async (blockerad) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  if (lokalt) await ctx.route((u) => !u.href.startsWith(base), (r) => r.abort());
  const p = await ctx.newPage();
  const sidfel = [];
  if (blockerad) await p.addInitScript(BLOCKERA);
  p.on("pageerror", (e) => sidfel.push(String(e).slice(0, 100)));
  return { ctx, p, sidfel };
};
const rotText = (p) => p.evaluate(() => (document.getElementById("root")?.innerText ?? "").trim().length);
const provaFormular = async (path, blockerad) => {
  const r = { path, blockerad, knappNar: false, svarFranServer: 0, stoppadeSkick: [], besokaren: "", fel: "", sidfel: [], rot: 0, kakruta: false };
  const { ctx, p, sidfel } = await nyttFonster(blockerad);
  p.on("response", (x) => { const q = x.request(); if (q.method() !== "GET" && /supabase|quote_requests|webhook/i.test(q.url())) r.svarFranServer++; });
  p.on("requestfailed", (x) => { if (x.method() !== "GET") r.stoppadeSkick.push(`${x.method()} ${x.url().replace(/\?.*/, "")}`); });
  try {
    await p.goto(base + path, { waitUntil: "networkidle" });
    r.rot = await rotText(p);
    const kaka = p.getByRole("button", { name: /nödvändiga|necessary/i }).first();
    r.kakruta = (await kaka.count()) > 0;
    if (r.kakruta) { await kaka.click().catch(() => {}); await p.waitForTimeout(600); }
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
    r.fel = String(e).split("\n")[0].slice(0, 120);
  }
  r.sidfel = sidfel;
  r.ok = !r.fel && r.knappNar && r.svarFranServer === 0 && r.stoppadeSkick.some((s) => /quote_requests/.test(s)) && (!blockerad || (sidfel.length === 0 && r.rot > 0));
  await ctx.close();
  return r;
};
const formulär = [];
for (const path of SIDOR) formulär.push(await provaFormular(path, false));
const blockerade = [];
for (const path of SIDOR) blockerade.push(await provaFormular(path, true));
// Startsidan med all lagring blockerad: sidan renderas (rot-text större än noll, rubriken syns efter att splashen släppt) och kakrutan visas
const startsida = { path: "/", rot: 0, kakruta: false, rubrik: "", sidfel: [], fel: "", ok: false };
{
  const { ctx, p, sidfel } = await nyttFonster(true);
  try {
    await p.goto(base + "/", { waitUntil: "networkidle" });
    await p.waitForTimeout(3500);
    startsida.rot = await rotText(p);
    startsida.kakruta = (await p.getByRole("button", { name: /nödvändiga|necessary/i }).first().count()) > 0;
    startsida.rubrik = (await p.locator("h1").first().innerText().catch(() => "")).replace(/\s+/g, " ").trim().slice(0, 80);
  } catch (e) {
    startsida.fel = String(e).split("\n")[0].slice(0, 120);
  }
  startsida.sidfel = sidfel;
  startsida.ok = !startsida.fel && startsida.rot > 0 && startsida.kakruta && !!startsida.rubrik && sidfel.length === 0;
  await ctx.close();
}
await browser.close();
const formOk = formulär.every((f) => f.ok);
const lagringOk = blockerade.every((f) => f.ok) && startsida.ok;

const allt = m3Ok && lsOk && formOk && lagringOk;
const orsaker = [!m3Ok && `M3: ${m3Text}`, !lsOk && `live-status: ${lsText}`, !formOk && `formulär: ${formulär.filter((f) => !f.ok).map((f) => f.path).join(", ")}`, !lagringOk && `lagring blockerad: ${[...(startsida.ok ? [] : ["/ (startsidan)"]), ...blockerade.filter((f) => !f.ok).map((f) => f.path)].join(", ")}`].filter(Boolean);
const md = [
  allt ? "**JA**" : `**NEJ**: ${orsaker.join("; ")}`,
  "",
  `# Morgonkontroll ${dag} ${klockan} (${base})`,
  "",
  "Kör M3, live-status över sajtkartan och formulärkontrollen till nätverksgränsen (alla sex formulär, utan inlämning) i ett kommando: `bun scripts/morgonkontroll.mjs`. JA kräver att alla fyra är gröna.",
  "",
  "| Kontroll | Resultat | Detalj |",
  "|---|---|---|",
  `| M3 (kontroll-efter-slapp) | ${m3Ok ? "JA" : "**NEJ**"} | ${m3Text}; fil: \`${m3Fil.split(/[\\/]/).pop()}\` |`,
  `| Live-status (sajtkartan) | ${lsOk ? "JA" : "**NEJ**"} | ${lsText}; fil: \`${lsFil.split(/[\\/]/).pop()}\` |`,
  `| Formulär till nätverksgränsen | ${formOk ? "JA" : "**NEJ**"} | ${formulär.filter((f) => f.ok).length} av ${formulär.length} formulär |`,
  `| Lagring blockerad (startsidan och alla sex formulär) | ${lagringOk ? "JA" : "**NEJ**"} | startsidan ${startsida.ok ? "JA" : "**NEJ**"}, formulär ${blockerade.filter((f) => f.ok).length} av ${blockerade.length} |`,
  "",
  ...(m3Nej.length ? ["## M3: punkter som fick NEJ", "", ...m3Nej, ""] : []),
  "## Formulär (inget skickas: nätverket stängs av innan Skicka)",
  "",
  "| Sida | Skicka-knappen går att nå | Svar från servern (ska vara 0) | Anropet stoppades vid nätverksgränsen | Det besökaren ser | Resultat |",
  "|---|---|---|---|---|---|",
  ...formulär.map((f) => `| \`${f.path}\` | ${f.knappNar ? "JA" : "**NEJ**"} | ${f.svarFranServer} | ${f.stoppadeSkick.map((s) => s.replace(/^POST https:\/\/[^/]+/, "POST ")).join(", ") || "inget anrop"} | ${f.besokaren || f.fel || "–"} | ${f.ok ? "JA" : "**NEJ**"} |`),
  "",
  "## Lagring blockerad (localStorage och sessionStorage kastar SecurityError, som i Chrome med alla kakor blockerade)",
  "",
  "Sidan ska renderas (text i rotelementet), kakrutan ska visas, inga sidfel, och varje formulär ska nå nätverksgränsen som vanligt. Inget skickas.",
  "",
  "| Sida | Rot-text (tecken) | Kakrutan syns | Sidfel | Skicka-knappen går att nå | Anropet stoppades vid nätverksgränsen | Resultat |",
  "|---|---|---|---|---|---|---|",
  `| \`/\` (startsidan) | ${startsida.rot} | ${startsida.kakruta ? "JA" : "**NEJ**"} | ${startsida.sidfel.length ? startsida.sidfel.join(" || ") : "inga"} | – | – | ${startsida.ok ? "JA" : `**NEJ** ${startsida.fel}`} (rubrik: ${startsida.rubrik || "saknas"}) |`,
  ...blockerade.map((f) => `| \`${f.path}\` | ${f.rot} | ${f.kakruta ? "JA" : "**NEJ**"} | ${f.sidfel.length ? f.sidfel.join(" || ") : "inga"} | ${f.knappNar ? "JA" : "**NEJ**"} | ${f.stoppadeSkick.map((s) => s.replace(/^POST https:\/\/[^/]+/, "POST ")).join(", ") || "inget anrop"} | ${f.ok ? "JA" : `**NEJ** ${f.fel}`} |`),
  "",
];
writeFileSync(fil, md.join("\n"));
console.log(`${allt ? "JA" : "NEJ"}: ${fil}`);
process.exit(allt ? 0 : 1);
