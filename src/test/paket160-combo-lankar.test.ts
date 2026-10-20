/**
 * Paket 160 (Marknadschefens ord 2026-10-21): länkarna i tjänst × ort-sidornas brödtext ([text](/länk) i briefens stycken, t.ex. "Mer om orten finns på sidan om takläggare i <ort>" i 131, 137, 148 och 150)
 * skrivs som <a> i serverns HTML, som på ortssidorna (page.inlineLinks). Texten är oförändrad, och sidor utan länkar i texten får ingen inlineLinks.
 */
import { describe, expect, it } from "vitest";
import { comboOverrides } from "../data/combo-overrides";
import { inlineMdLinks, stripInlineMd } from "../lib/inline-md";
import { prerenderContent, styckenMedLankar } from "../../scripts/prerender-content";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const MED = Object.keys(comboOverrides).filter((k) => comboOverrides[k].content.some((p) => inlineMdLinks(p).length > 0));
const UTAN = Object.keys(comboOverrides).filter((k) => !MED.includes(k));

describe("paket 160: länkar i brödtexten på tjänst × ort-sidorna, i serverns HTML", () => {
  it("det finns sidor med länkar i texten (minst de 67 med länkmeningen), och varje sida får sina länkar som inlineLinks", () => {
    expect(MED.length).toBeGreaterThanOrEqual(67);
    for (const k of MED) {
      const c = prerenderContent(`/${k}`)!;
      const forvantat = comboOverrides[k].content.flatMap(inlineMdLinks);
      expect(c.inlineLinks, k).toBeTruthy();
      for (const l of forvantat) expect(c.inlineLinks!.some((x) => x.href === l.href && x.label === l.label), `${k} ${l.href}`).toBe(true);
    }
  });
  it("varje länk blir en <a> i HTML-stycket och texten är exakt som förut (taggarna borttagna = stycket)", () => {
    for (const k of MED) {
      const c = prerenderContent(`/${k}`)!;
      const ps = c.paragraphs.map((p) => (typeof p === "string" ? p : ""));
      const html = styckenMedLankar(ps, c.inlineLinks, esc);
      for (const l of c.inlineLinks!) expect(html.join("\n"), `${k} ${l.href}`).toContain(`<a href="${esc(l.href)}">${esc(l.label)}</a>`);
      html.forEach((h, i) => expect(h.replace(/<[^>]+>/g, ""), `${k} stycke ${i}`).toBe(esc(ps[i])));
    }
  });
  it("tjänst × ort-sidor utan länk i texten får ingen inlineLinks, så deras HTML är oförändrad", () => {
    for (const k of UTAN.slice(0, 40)) {
      const c = prerenderContent(`/${k}`);
      if (c) expect(c.inlineLinks, k).toBeUndefined();
    }
  });
  it("länkmeningen på de 55 + 12 sidorna ritas som länk till ortssidan i serverns HTML", () => {
    const k = "takbyte-nacka";
    const c = prerenderContent(`/${k}`)!;
    const html = styckenMedLankar(c.paragraphs.map((p) => (typeof p === "string" ? p : "")), c.inlineLinks, esc).join("\n");
    expect(html).toMatch(/Mer om orten finns på sidan om <a href="\/taklaggare-nacka">takläggare i Nacka<\/a>\./);
    expect(stripInlineMd(comboOverrides[k].content.join(" "))).toContain("Mer om orten finns på sidan om takläggare i Nacka.");
  });
});
