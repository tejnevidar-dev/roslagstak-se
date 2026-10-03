/**
 * Kontrastkontroll av sajtens färgtokens (WCAG 2.1, DEL 1 avsnitt 20). Läser :root i src/index.css och räknar
 * kontrastförhållandet för de par som används som text mot bakgrund. Lokalt verktyg, ingen del av bygget.
 * Kör: bun scripts/contrast-check.ts  (skriver ledning/marknad/kontrastgranskning.md, exit 1 om ett par under normal
 * text 4,5:1 används som brödtext enligt listan "bodyText" nedan)
 *
 * Gränser: 4,5:1 för normal text, 3:1 för stor text (≥ 24 px, eller ≥ 18,66 px fet) och för ikoner/linjer.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const css = readFileSync(resolve("src/index.css"), "utf8");
const root = css.match(/:root\s*\{([\s\S]*?)\n\s*\}/)?.[1] ?? "";
const tokens = new Map<string, [number, number, number]>();
for (const m of root.matchAll(/--([a-z-]+):\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*;/g)) tokens.set(m[1], [Number(m[2]), Number(m[3]), Number(m[4])]);

const hslToRgb = ([h, s, l]: [number, number, number]): [number, number, number] => {
  const S = s / 100;
  const L = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = S * Math.min(L, 1 - L);
  const f = (n: number) => L - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0) * 255, f(8) * 255, f(4) * 255];
};
const lum = (rgb: [number, number, number]) => {
  const [r, g, b] = rgb.map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (fg: string, bg: string) => {
  const a = tokens.get(fg);
  const b = tokens.get(bg);
  if (!a || !b) throw new Error(`token saknas: ${fg} eller ${bg}`);
  const [hi, lo] = [lum(hslToRgb(a)), lum(hslToRgb(b))].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const hex = (t: string) => "#" + hslToRgb(tokens.get(t)!).map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");

type Par = { fg: string; bg: string; use: string; body: boolean };
const pairs: Par[] = [
  { fg: "foreground", bg: "background", use: "brödtext", body: true },
  { fg: "card-foreground", bg: "card", use: "text i kort", body: true },
  { fg: "muted-foreground", bg: "background", use: "sekundär text på sidan", body: true },
  { fg: "muted-foreground", bg: "card", use: "sekundär text i kort", body: true },
  { fg: "muted-foreground", bg: "muted", use: "sekundär text på dämpad yta", body: true },
  { fg: "primary-foreground", bg: "primary", use: "text på marinblå yta och knappar", body: true },
  { fg: "cta-foreground", bg: "cta", use: "text på koppar-knappar", body: true },
  { fg: "accent-foreground", bg: "accent", use: "vit text på accentfärg", body: false },
  { fg: "accent", bg: "background", use: "accentfärgad text (eyebrows, rubriker, länkar)", body: false },
  { fg: "accent", bg: "card", use: "accentfärgad text i kort", body: false },
  { fg: "primary", bg: "background", use: "primärfärgad text och länkar", body: true },
  { fg: "primary", bg: "secondary", use: "primärfärgad text på dämpad yta", body: true },
  { fg: "secondary-foreground", bg: "secondary", use: "text på sekundär yta", body: true },
  { fg: "marine-foreground", bg: "marine", use: "text på marinfärg", body: true },
  { fg: "ink-foreground", bg: "ink", use: "text i sidfoten", body: true },
  { fg: "destructive-foreground", bg: "destructive", use: "text på felfärg", body: false },
];

const rows = pairs.map((p) => ({ ...p, r: ratio(p.fg, p.bg) }));
const out = [
  "# Kontrastgranskning av färgtokens",
  "",
  "Genererad av `bun scripts/contrast-check.ts` ur `:root` i `src/index.css` (WCAG 2.1: 4,5:1 normal text, 3:1 stor text och ikoner). Gäller färgparen, inte varje enskild förekomst i komponenterna. Tangentbordsfokus: se avsnittet sist.",
  "",
  "| Text | Bakgrund | Använd som | Kontrast | Normal text (4,5:1) | Stor text (3:1) |",
  "|---|---|---|---|---|---|",
  ...rows.map((r) => `| ${r.fg} ${hex(r.fg)} | ${r.bg} ${hex(r.bg)} | ${r.use} | ${r.r.toFixed(2)}:1 | ${r.r >= 4.5 ? "ja" : "NEJ"} | ${r.r >= 3 ? "ja" : "NEJ"} |`),
  "",
];
const fail = rows.filter((r) => r.r < 4.5);
out.push(`## Fynd`, "");
if (!fail.length) out.push("Alla par klarar 4,5:1.");
else
  for (const r of fail)
    out.push(`- **${r.fg} på ${r.bg}** (${r.use}): ${r.r.toFixed(2)}:1. ${r.r >= 3 ? "Duger bara för stor text (≥ 24 px, eller ≥ 18,66 px fet) och ikoner. Använd inte som liten brödtext." : "Klarar inte ens stor text."}${r.body ? " **Används som brödtext.**" : ""}`);
out.push(
  "",
  "## Tangentbord och fokus",
  "",
  "Sajten använder Radix-komponenter (meny, dragspel, dialog) som hanterar tangentbord och fokus (piltangenter, Escape, fokusfälla). Knappar och länkar har synlig fokusring via Tailwind (`focus-visible:ring`), och `outline-none` förekommer bara på Radix-menyobjekt som markeras med bakgrundsfärg vid tangentbordsfokus. En fullständig tangentbords- och skärmläsartestning av varje sida är manuell och gjord stickprovsvis, inte automatiserad.",
);
writeFileSync(resolve("../ledning/marknad/kontrastgranskning.md"), out.join("\n") + "\n");
console.log(`[contrast-check] ${rows.length} par, ${fail.length} under 4,5:1 → ledning/marknad/kontrastgranskning.md`);
const bodyFail = fail.filter((r) => r.body);
if (bodyFail.length) {
  console.error("Brödtextpar under 4,5:1: " + bodyFail.map((r) => `${r.fg}/${r.bg}`).join(", "));
  process.exit(1);
}
