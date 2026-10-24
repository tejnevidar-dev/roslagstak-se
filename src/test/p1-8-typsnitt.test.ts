/**
 * P1-8 (seo-audit/06, Vidars ja 2026-10-24): Fraunces och Karla hostas själva. @font-face står först i index.css (före @tailwind, så att de gäller), filerna finns som riktiga woff2, headen förladdar de två som behövs
 * först, och ingen tredje part (Google Fonts) anropas. Ortsfilen och BRF-sidornas komponent förladdas i den statiska headen (scripts/generate-static-heads.mjs, scripts/check-ortsfil-forladdning.ts).
 */
import { describe, expect, it } from "vitest";
import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const rot = resolve(__dirname, "../..");
const las = (rel: string) => readFileSync(resolve(rot, rel), "utf8");
const css = las("src/index.css");
const html = las("index.html");

describe("P1-8: typsnitt och förladdning", () => {
  it("@font-face för Fraunces (normal och kursiv) och Karla står före @tailwind, med font-display swap och latin-intervall som täcker å, ä, ö", () => {
    const iTailwind = css.indexOf("@tailwind base");
    for (const fam of ["Fraunces", "Karla"]) {
      const i = css.indexOf(`font-family: '${fam}'`);
      expect(i, fam).toBeGreaterThan(-1);
      expect(i, `${fam}: @font-face ska stå före @tailwind`).toBeLessThan(iTailwind);
    }
    expect(css.match(/^@font-face/gm)?.length).toBe(3);
    expect(css.match(/font-display: swap/g)?.length).toBe(3);
    expect(css).toContain("font-style: italic");
    expect(css.match(/unicode-range: U\+0000-00FF/g)?.length).toBe(3);
  });
  it("ingen @import och ingen Google Fonts-adress i stilmallen, index.html eller källkoden", () => {
    expect(css).not.toMatch(/^@import/m);
    expect(css + html).not.toMatch(/fonts\.(googleapis|gstatic)\.com/);
  });
  it("filerna finns, är woff2 och har rimlig storlek", () => {
    for (const [fil, min, max] of [["fraunces-v38-latin-normal.woff2", 40_000, 150_000], ["fraunces-v38-latin-italic.woff2", 40_000, 150_000], ["karla-v33-latin.woff2", 10_000, 80_000]] as const) {
      const p = resolve(rot, "public/fonts", fil);
      const b = readFileSync(p);
      expect(b.subarray(0, 4).toString("latin1"), fil).toBe("wOF2");
      expect(statSync(p).size, fil).toBeGreaterThan(min);
      expect(statSync(p).size, fil).toBeLessThan(max);
      expect(css, fil).toContain(`/fonts/${fil}`);
    }
    expect(las("public/fonts/README.txt")).toContain("SIL Open Font License");
  });
  it("index.html förladdar Fraunces (normal) och Karla, med crossorigin (krävs för typsnitt)", () => {
    for (const fil of ["fraunces-v38-latin-normal.woff2", "karla-v33-latin.woff2"])
      expect(html).toMatch(new RegExp(`<link rel="preload" href="/fonts/${fil.replace(/\./g, "\.")}" as="font" type="font/woff2" crossorigin />`));
  });
  it("/fonts/ cachas ett år som immutable (filnamnen har version)", () => {
    expect(las("public/_headers")).toMatch(/\/fonts\/\*\s+Cache-Control: public, max-age=31536000, immutable/);
  });
  it("den statiska headen förladdar ortens datafil, tjänst × ort-filen och BRF-sidornas komponent, och bygget kontrollerar det", () => {
    const heads = las("scripts/generate-static-heads.mjs");
    expect(heads).toContain('return "BrfPage-"');
    expect(heads).toContain('return "BrfLocationPage-"');
    expect(heads).toContain("dataFil");
    expect(las("package.json")).toContain("check-ortsfil-forladdning.ts");
    expect(las("scripts/check-ortsfil-forladdning.ts")).toContain("BrfLocationPage-");
  });
});
