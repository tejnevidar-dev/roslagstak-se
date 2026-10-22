/**
 * Gren 193 (Driftchefens fynd, CRM 2): kommentaren i index.html om canonical innehöll taggen "<link rel="canonical">" som text, och hamnade före den riktiga canonical-taggen i startsidans byggda HTML.
 * Verktyg som inte tar bort kommentarer kunde läsa den tomma taggen först. Mallen får inte ha någon canonical-tagg inne i en kommentar.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("gren 193: ingen canonical-tagg i en HTML-kommentar", () => {
  it("index.html har ingen <link rel=\"canonical\" i en kommentar och ingen utanför den heller", () => {
    const html = readFileSync(resolve(__dirname, "../../index.html"), "utf8");
    for (const m of html.matchAll(/<!--[\s\S]*?-->/g)) expect(m[0], m[0].slice(0, 60)).not.toMatch(/<link\s+rel="canonical"/i);
    expect(html.replace(/<!--[\s\S]*?-->/g, "")).not.toMatch(/<link\s+rel="canonical"/i);
  });
});
