/**
 * Paket 144 (Marknadschefens grind 2026-10-20): regionsidorna Österåker och Nordvästra Stockholm vässas (innehall/osteraker-vassa-briefrader och nordvastra-stockholm-vassa-briefrader).
 */
import { describe, expect, it } from "vitest";
import { regionTexts } from "../data/region-texts";
import { prerenderContent } from "../../scripts/prerender-content";

describe("paket 144: Österåker", () => {
  const r = regionTexts["Österåker"];
  it("sökordet i ingressen och en rubrik 'Takläggare i Österåker' med länkarna till Åkersberga-sidorna, före 'Så går det till'", () => {
    expect(r.intro).toContain("Den här sidan handlar om takläggare i Österåker");
    const i = r.body.indexOf("## Takläggare i Österåker");
    expect(i).toBeGreaterThan(-1);
    expect(r.body[i + 1]).toContain("(/takbyte-akersberga)");
    expect(r.body[i + 1]).toContain("(/takomlaggning-akersberga)");
    expect(r.body[i + 1]).toContain("(/takrenovering-akersberga)");
    expect(r.body[i + 1]).toContain("(/taklaggare-akersberga)");
    expect(r.body.indexOf("## Så går det till")).toBeGreaterThan(i);
  });
  it("Margretelund, Stora Stava och Svinninge finns, och 'ofta' är rättat till 'kan'", () => {
    const t = r.body.join(" ");
    for (const o of ["Margretelund", "Stava", "Svinninge"]) expect(t, o).toContain(o);
    expect(t).not.toMatch(/\bofta\b/);
  });
});

describe("paket 144: Nordvästra Stockholm", () => {
  const r = regionTexts["Nordvästra Stockholm"];
  it("avsnittet 'Takbyte i nordvästra Stockholm' har länkarna till takbytessidorna, före 'Så går det till'", () => {
    const i = r.body.indexOf("## Takbyte i nordvästra Stockholm");
    expect(i).toBeGreaterThan(-1);
    for (const l of ["(/takbyte-jarfalla)", "(/takbyte-bro)", "(/takbyte-kungsangen)", "(/takbyte-stockholm)"]) expect(r.body[i + 1], l).toContain(l);
    expect(r.body.indexOf("## Så går det till")).toBeGreaterThan(i);
  });
  it("Kallhäll och Skälby finns med länkar, och serverns HTML har takbytes-länkarna", () => {
    const t = r.body.join(" ");
    expect(t).toMatch(/Kallhäll/);
    expect(t).toContain("(/taklaggare-barkarby)");
    const c = prerenderContent("/omraden/nordvastra-stockholm")!;
    expect(c.links.map((l) => l.href)).toContain("/takbyte-jarfalla");
  });
});
