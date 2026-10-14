/**
 * Paket 89: ruttabellen i App.tsx har tre parameterrutter i stället för drygt 2 100 egna. Provet bygger den gamla tabellen ur samma listor som förut
 * och kräver att varje gammal adress ger samma sida som förut, och att en okänd adress ger NotFound.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { locationIndex } from "@/data/location-index";
import { allServiceSlugs, hasServiceCombos } from "@/data/service-slugs";
import { adLandingSlugs } from "@/data/ad-landings";
import { brfLocationSlugs } from "@/data/brf-locations";
import { resolveBrfSlug, resolveOffertSlug, resolveTopLevelSlug } from "@/lib/route-resolve";

/** Den gamla tabellen, ordagrant ur App.tsx före paket 89. */
const gamlaOrter = locationIndex.map((l) => `taklaggare-${l.slug}`);
const gamlaTjanstOrt = allServiceSlugs.flatMap((s) => locationIndex.filter((l) => hasServiceCombos(l.region)).map((l) => `${s}-${l.slug}`));

describe("paket 89: samma adresser ger samma sidor som den gamla ruttabellen", () => {
  it("varje ortsadress ger 'ort'", () => {
    expect(gamlaOrter.length).toBeGreaterThan(200);
    for (const s of gamlaOrter) expect(resolveTopLevelSlug(s), s).toBe("ort");
  });
  it("varje tjänst × ort-adress ger 'tjanst-ort'", () => {
    expect(gamlaTjanstOrt.length).toBeGreaterThan(1500);
    for (const s of gamlaTjanstOrt) expect(resolveTopLevelSlug(s), s).toBe("tjanst-ort");
  });
  it("varje annonssida och BRF-ort är känd, och bara de", () => {
    expect(adLandingSlugs.length).toBeGreaterThan(5);
    for (const s of adLandingSlugs) expect(resolveOffertSlug(s), s).toBe(true);
    for (const s of brfLocationSlugs) expect(resolveBrfSlug(s), s).toBe(true);
    expect(resolveOffertSlug("finns-inte")).toBe(false);
    expect(resolveBrfSlug("finns-inte")).toBe(false);
    expect(resolveOffertSlug("")).toBe(false);
  });
  it("okända adresser ger null (NotFound), också nära träffar och orter utan tjänst × ort", () => {
    const okanda = ["", "finns-inte", "taklaggare-", "taklaggare-finns-inte", "takbyte-", "takbyte-finns-inte", "Taklaggare-norrtalje", "takbyte-Norrtalje", "taklaggare-norrtalje-extra", "takbyte-takbyte-norrtalje", "norrtalje"];
    for (const s of okanda) expect(resolveTopLevelSlug(s), s).toBeNull();
    // orter i regioner utan tjänst × ort (Mälardalen) har bara sin ortssida
    const utan = locationIndex.filter((l) => !hasServiceCombos(l.region));
    expect(utan.length).toBeGreaterThan(0);
    for (const l of utan) {
      expect(resolveTopLevelSlug(`taklaggare-${l.slug}`)).toBe("ort");
      for (const s of allServiceSlugs) expect(resolveTopLevelSlug(`${s}-${l.slug}`), `${s}-${l.slug}`).toBeNull();
    }
  });
  it("de statiska adresserna är inte med i parameterrutten (de har egna rutter och vinner)", () => {
    const k = readFileSync("src/App.tsx", "utf8");
    for (const s of ["takkontroll", "takreparation", "offert", "kontakt", "blogg", "projekt", "material", "priser", "brf"]) {
      expect(resolveTopLevelSlug(s), s).toBeNull();
      expect(k).toContain(`path="/${s}"`);
    }
  });
});

describe("paket 89: App.tsx har få rutter och ingen ruttlista byggd ur data", () => {
  const k = readFileSync("src/App.tsx", "utf8");
  it("de tre parameterrutterna finns", () => {
    expect(k).toContain('<Route path="/:slug" element={<TopLevelRoute />} />');
    expect(k).toContain('<Route path="/offert/:slug" element={<OffertRoute />} />');
    expect(k).toContain('<Route path="/brf/:slug" element={<BrfRoute />} />');
  });
  it("ingen <Route> byggs i en loop över orter, tjänster, annonssidor eller BRF-orter", () => {
    expect(k).not.toMatch(/locationIndex\.(map|filter|flatMap)/);
    expect(k).not.toMatch(/adLandingSlugs\.map|brfLocationSlugs\.map|allServiceSlugs\.flatMap/);
  });
  it("färre än 60 <Route>-rader totalt (var drygt 2 100 när tabellen byggdes)", () => {
    const antal = (k.match(/<Route\b/g) ?? []).length;
    expect(antal).toBeLessThan(60);
    expect(antal).toBeGreaterThan(30);
  });
  it("NotFound är kvar som sista rutt och som svar för okänd adress", () => {
    expect(k).toContain('<Route path="*" element={<NotFound />} />');
    expect(k.indexOf('<Route path="/:slug"')).toBeLessThan(k.indexOf('<Route path="*"'));
    expect(k).toMatch(/sida === "ort" \? <LocationPage \/> : sida === "tjanst-ort" \? <ServiceLocationPage \/> : <NotFound \/>/);
  });
  it("LocationPage tar orten ur adressen, inte ur ruttparametern (som nu bär hela 'taklaggare-<ort>')", () => {
    const l = readFileSync("src/pages/LocationPage.tsx", "utf8");
    expect(l).not.toContain("useParams");
    expect(l).toContain('pathname.startsWith("/taklaggare-") ? pathname.replace("/taklaggare-", "")');
  });
});
