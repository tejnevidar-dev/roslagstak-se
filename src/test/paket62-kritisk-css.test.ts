/**
 * Paket 62 (förslag, släpps inte utan Vidars ja): kritisk CSS. Det fulla stilbladet laddas utan att blockera första målningen; en per sida beräknad kritisk del ligger inline.
 * Byggkontrollen scripts/check-kritisk-css.ts provar den byggda HTML:en; här provas koden som React och byggsteget förlitar sig på.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const lasa = (f: string) => readFileSync(f, "utf8").split("\r\n").join("\n");

describe("paket 62: kritisk CSS", () => {
  it("main.tsx ritar React först när det fulla stilbladet är laddat (eller efter högst 3 s), och startar direkt om det saknas eller redan är laddat", () => {
    const m = lasa("src/main.tsx");
    expect(m).toContain('document.querySelector<HTMLLinkElement>("link[data-css-lazy]")');
    expect(m).toContain('addEventListener("load", starta, { once: true })');
    expect(m).toContain('addEventListener("error", starta, { once: true })');
    expect(m).toContain("window.setTimeout(starta, 3000)");
    expect(m).toContain("if (startad) return;");
    expect(m.split('createRoot(document.getElementById("root")!).render(<App />)').length - 1).toBe(1);
  });
  it("byggsteget lägger kritisk CSS, en icke-blockerande länk och en noscript-länk, även på 404-sidan", () => {
    const g = lasa("scripts/generate-static-heads.mjs");
    expect(g).toContain("<style data-kritisk-css>");
    expect(g).toContain('media="print" onload="this.media=\'all\'" data-css-lazy');
    expect(g).toContain("<noscript><link rel=\"stylesheet\"");
    expect(g.split("kritiskCss(html)").length - 1).toBe(2);
  });
  it("kontrollen är kopplad till postbuild", () => {
    expect(lasa("package.json")).toContain("bun scripts/check-kritisk-css.ts");
  });
});
