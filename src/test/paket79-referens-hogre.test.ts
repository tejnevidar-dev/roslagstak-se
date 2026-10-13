/**
 * Paket 79 (Marknadschefen 2026-10-13, förslag B, steg 2): på ortssidor med egen text står meningen om referensjobbet direkt efter områdestextens första stycke, lika i React och
 * i serverns HTML. Förut stod den bara i serverns HTML, mitt på sidan. Lydelsen och urvalet är oförändrade; sidor som använder mallen har sin egen mening och berörs inte.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { locations } from "@/data/locations";
import { usesMall } from "@/data/location-mall";
import { referensMening } from "@/data/location-referens";
import { prerenderContent } from "../../scripts/prerender-content";

const kalla = (f: string) => readFileSync(f, "utf8");
const ownText = locations.filter((l) => !usesMall(l));

describe("paket 79: referensmeningen efter områdestextens första stycke", () => {
  it("lydelsen är densamma som förut: 'Ett referensjobb i närområdet: …' och 'Vi har utfört ett dokumenterat referensjobb här: …'", () => {
    expect(referensMening({ slug: "hallstavik", name: "Hallstavik", lat: 60.0522, lng: 18.5975 }, "i")).toMatch(
      /^Ett referensjobb i närområdet: Nytt tak på [A-ZÅÄÖa-zåäö]+, ungefär \d+ km härifrån\. Det jobbet gjordes inte i Hallstavik, men det visar hur ett komplett takbyte kan se ut\.$/,
    );
    const blido = locations.find((l) => l.slug === "blido")!;
    expect(referensMening(blido, "på")).toBe("Vi har utfört ett dokumenterat referensjobb här: Nytt tak på Blidö.");
  });
  it("serverns HTML: meningen är stycke två, direkt efter första stycket, på varje egen-text-sida som har den", () => {
    let antal = 0;
    for (const l of ownText) {
      const prep = l.isIsland ? "på" : "i";
      const m = referensMening(l, prep);
      const sida = prerenderContent("/taklaggare-" + l.slug)!;
      const ps = sida.paragraphs.map((p) => (typeof p === "string" ? p : ""));
      if (!m) { expect(ps.join("\n"), l.slug).not.toContain("Ett referensjobb i närområdet"); continue; }
      antal++;
      const i = ps.findIndex((p) => p === m);
      expect(i, l.slug).toBeGreaterThanOrEqual(0);
      expect(ps[i - 1], l.slug).toBe(l.longDescription);
      expect(ps.filter((p) => p.includes(m)).length, l.slug).toBe(1);
    }
    expect(antal).toBeGreaterThan(20);
  });
  it("ingen sida har meningen kvar i geo-stycket mitt på sidan, och mallsidorna är orörda", () => {
    for (const l of ownText) {
      const ps = prerenderContent("/taklaggare-" + l.slug)!.paragraphs.map((p) => (typeof p === "string" ? p : ""));
      const geo = ps.find((p) => p.includes("Närmaste orter i vårt område"));
      if (geo) expect(geo, l.slug).not.toMatch(/referensjobb/);
    }
    const finnhamn = prerenderContent("/taklaggare-finnhamn")!.paragraphs.join("\n");
    expect(finnhamn).toContain("Ett referensjobb i närområdet");
  });
  it("React: LocationPage ritar samma mening direkt efter longDescription, bara på sidor med egen text", () => {
    const k = kalla("src/pages/LocationPage.tsx");
    expect(k).toContain("referensMening(location, prep)");
    expect(k.indexOf("const prep = ")).toBeLessThan(k.indexOf("referensMening(location, prep)"));
    expect(k.indexOf("{location.longDescription}")).toBeLessThan(k.indexOf("{referens}"));
    expect(k).toMatch(/!usesMall\([^)]*\)[^{]*&& referens &&/);
  });
});
