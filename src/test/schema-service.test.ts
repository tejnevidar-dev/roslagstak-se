/**
 * Gren 168 (H3, seo-analys-2026-10-21/1-teknik-i-koden.md F4): EN verksamhet (/#localbusiness) och en Service-nod per ort- och tjänst × ort-sida med provider på verksamheten och areaServed som City.
 * Verksamhetens areaServed anger kommuner i stället för regionnamn. Ingen RoofingContractor per ort i React-sidorna.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { locations } from "../data/locations";
import { LOCAL_BUSINESS_ID } from "../lib/schema-graph";
import { SERVICE_KOMMUNER, buildLocalBusinessSchema, buildLocalBusinessLeanSchema, serviceRegions } from "../lib/schema";
import { serviceSchemaFor } from "../../scripts/prerender-content";

const kalla = (f: string) => readFileSync(f, "utf8");

describe("H3: Service-noder per ort och tjänst × ort", () => {
  it("ortssida: Service med @id, provider på verksamheten, areaServed som City med platsen", () => {
    const n = serviceSchemaFor("/taklaggare-taby") as any;
    expect(n["@type"]).toBe("Service");
    expect(n["@id"]).toBe("https://roslagstak.se/taklaggare-taby#service");
    expect(n.provider).toEqual({ "@id": LOCAL_BUSINESS_ID });
    expect(n.areaServed["@type"]).toBe("City");
    expect(n.areaServed.name).toBe("Täby");
    expect(n.areaServed.geo.latitude).toBeGreaterThan(59);
    expect(JSON.stringify(n)).not.toContain("RoofingContractor");
  });
  it("kommunens delområden pekar på kommunen (containedInPlace)", () => {
    const n = serviceSchemaFor("/taklaggare-akersberga") as any;
    const loc = locations.find((l) => l.slug === "akersberga")!;
    if (loc.parentLocation) expect(n.areaServed.containedInPlace.name).toBe(loc.parentLocation.name);
  });
  it("tjänst × ort-sida: Service med provider på verksamheten, serviceType och erbjudande", () => {
    const n = serviceSchemaFor("/takbyte-taby") as any;
    expect(n["@id"]).toBe("https://roslagstak.se/takbyte-taby#service");
    expect(n.provider).toEqual({ "@id": LOCAL_BUSINESS_ID });
    expect(n.serviceType).toBe("Takbyte");
    expect(n.areaServed.name).toBe("Täby");
    expect(n.offers?.description).toMatch(/Fast pris i offerten/);
    expect(JSON.stringify(n)).not.toMatch(/\d\s?kr\b/);
  });
  it("andra sidtyper får ingen Service-nod här", () => {
    expect(serviceSchemaFor("/priser")).toBeNull();
    expect(serviceSchemaFor("/")).toBeNull();
  });
  it("verksamhetens areaServed anger kommuner (och Mälardalen), inga regionnamn från ortsdatan, och inga dubbletter", () => {
    for (const n of [buildLocalBusinessSchema(), buildLocalBusinessLeanSchema()] as any[]) {
      const namn: string[] = n.areaServed.map((a: { name: string }) => a.name);
      for (const k of ["Danderyd", "Norrtälje", "Österåker", "Mälardalen"]) expect(namn, k).toContain(k);
      for (const r of serviceRegions.filter((x) => x !== "Mälardalen" && x !== "Österåker" && !locations.some((l) => l.name === x))) expect(namn, `region ${r}`).not.toContain(r);
      expect(new Set(namn).size).toBe(namn.length);
    }
  });
  it("kommunerna finns i ortsdatan som ort eller som föräldraort (så att ortkopplingen är riktig)", () => {
    const kanda = new Set([...locations.map((l) => l.name), ...locations.flatMap((l) => (l.parentLocation ? [l.parentLocation.name] : [])), "Österåker"]);
    for (const k of SERVICE_KOMMUNER) expect(kanda.has(k), k).toBe(true);
  });
  it("React-sidorna bygger inga egna RoofingContractor-noder (de delar byggarna i schema-service.ts med den statiska headen)", () => {
    for (const f of ["src/pages/LocationPage.tsx", "src/pages/ServiceLocationPage.tsx"]) expect(kalla(f), f).not.toContain("RoofingContractor");
    expect(kalla("src/pages/LocationPage.tsx")).toContain("ortServiceNode(");
    expect(kalla("src/pages/ServiceLocationPage.tsx")).toContain("comboServiceNode(");
    expect(kalla("scripts/prerender-content.ts")).toContain("ortServiceNode(");
    expect(kalla("scripts/generate-static-heads.mjs")).toContain("serviceSchemaFor(path)");
  });
});
