/**
 * Paket 144b (Marknadschefens grind 142c, 2026-10-20): regionsidan Roslagens inland vässas (innehall/roslagens-inland-vassa-briefrader-2026-10-20).
 */
import { describe, expect, it } from "vitest";
import { regionTexts } from "../data/region-texts";
import { locations } from "../data/locations";
import { comboOverrides } from "../data/combo-overrides";
import { prerenderContent } from "../../scripts/prerender-content";

describe("paket 144b: Roslagens inland", () => {
  const r = regionTexts["Roslagens inland"];
  const t = r.body.join(" ");
  it("Lindholmen och Ella gård har länkar med ortsnamn, och länkmålen finns som områdessidor", () => {
    expect(t).toContain("[Lindholmens](/taklaggare-lindholmen)");
    expect(t).toContain("[Ella gård](/taklaggare-ella-gard)");
    for (const s of ["lindholmen", "ella-gard"]) expect(locations.some((l) => l.slug === s), s).toBe(true);
  });
  it("en länk till taksäkerhet, och avsnittet om takbyte och takomläggning ligger före 'Så går det till'", () => {
    expect(t).toContain("[taksäkerhet](/tjanster/taksakerhet)");
    const i = r.body.indexOf("## Takbyte och takomläggning i Roslagens inland");
    expect(i).toBeGreaterThan(-1);
    for (const l of ["(/takbyte-rimbo)", "(/takomlaggning-rimbo)", "(/takbyte-vallentuna)", "(/takomlaggning-vallentuna)", "(/takbyte-taby)"]) expect(r.body[i + 1], l).toContain(l);
    expect(r.body.indexOf("## Så går det till")).toBeGreaterThan(i);
  });
  it("tjänstesidorna som länkas finns, och serverns HTML har länkarna", () => {
    for (const k of ["takbyte-rimbo", "takomlaggning-rimbo", "takbyte-vallentuna", "takomlaggning-vallentuna"]) expect(comboOverrides[k], k).toBeTruthy();
    const c = prerenderContent("/omraden/roslagens-inland")!;
    const hrefs = c.links.map((l) => l.href);
    for (const h of ["/takbyte-rimbo", "/takomlaggning-vallentuna", "/takbyte-taby", "/tjanster/taksakerhet", "/taklaggare-lindholmen"]) expect(hrefs, h).toContain(h);
  });
});
