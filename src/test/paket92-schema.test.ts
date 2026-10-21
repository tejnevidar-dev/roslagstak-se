/**
 * Paket 92 (strukturerad data, inget syns): (O1) logotypen i schemat är märket i public/icon-512.png i stället för delningsbilden, (L2) bokningstiderna ordagrant som på sajten
 * läggs som openingHoursSpecification, (D2) paymentAccepted "Faktura" är borta eftersom sidan inte säger det som betalsätt. Datan ska stämma med det som syns.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { LOGO_URL, OPENING_HOURS, buildOrganizationNode } from "@/lib/schema-graph";
import { buildLocalBusinessSchema, buildLocalBusinessLeanSchema } from "@/lib/schema";
import { prerenderContent } from "../../scripts/prerender-content";

const kalla = (f: string) => readFileSync(f, "utf8");
const png = readFileSync("public/icon-512.png");

describe("paket 92: logotypen (O1)", () => {
  it("pekar på märket i icon-512.png, en riktig PNG som är kvadratisk och minst 112 × 112", () => {
    expect(LOGO_URL).toBe("https://roslagstak.se/icon-512.png");
    expect(png.subarray(1, 4).toString()).toBe("PNG");
    const bredd = png.readUInt32BE(16), hojd = png.readUInt32BE(20);
    expect(bredd).toBeGreaterThanOrEqual(112);
    expect(hojd).toBeGreaterThanOrEqual(112);
    expect(bredd).toBe(hojd);
  });
  it("alla noder som anger logo använder den: RoofingContractor (full och slimmad), Organization, bloggens utgivare och ortssidans nod", () => {
    expect((buildLocalBusinessSchema() as any).logo).toBe(LOGO_URL);
    expect((buildLocalBusinessLeanSchema() as any).logo).toBe(LOGO_URL);
    expect((buildOrganizationNode() as any).logo).toBe(LOGO_URL);
    expect(kalla("src/lib/blog-schema.ts")).toContain('logo: { "@type": "ImageObject", url: LOGO_URL }');
    // gren 168: ortssidans nod är en Service med provider på verksamheten (/#localbusiness) och har ingen egen logo
    expect(kalla("src/pages/LocationPage.tsx")).toContain("ortServiceNode(");
    expect(kalla("src/pages/LocationPage.tsx")).not.toContain("logo:");
  });
  it("sidans bild (image) är fortfarande delningsbilden, och ingen logo pekar på den", () => {
    expect((buildLocalBusinessSchema() as any).image).toBe("https://roslagstak.se/og-image.jpg");
    for (const f of ["src/lib/schema.ts", "src/lib/schema-graph.ts", "src/lib/blog-schema.ts", "src/pages/LocationPage.tsx"]) expect(kalla(f)).not.toMatch(/logo[^\n]*og-image/);
  });
});

describe("paket 92: öppettiderna (L2) stämmer med det sajten säger", () => {
  const SITE = /måndag–fredag (\d\d)–(\d\d)(?:,| och) lördag–söndag (\d\d)–(\d\d)/;
  it("tiderna i schemat är ordagrant de som står i sajtens texter (07–20 vardagar, 09–19 helger)", () => {
    for (const f of ["src/data/home-about.ts", "src/data/blog-posts.ts", "src/data/landing-services.ts", "src/data/location-faqs.ts"]) {
      const m = kalla(f).match(SITE);
      expect(m, f).not.toBeNull();
      expect([m![1], m![2], m![3], m![4]], f).toEqual(["07", "20", "09", "19"]);
    }
    expect(OPENING_HOURS).toEqual([
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday"], opens: "09:00", closes: "19:00" },
    ]);
  });
  it("tiderna står synligt på sidorna som bär dem (startsidan och /takkontroll), så datan inte säger något som sidan inte säger", () => {
    for (const p of ["/", "/takkontroll"]) {
      const sida = prerenderContent(p)!;
      const text = [sida.intro ?? "", ...sida.paragraphs.map((x) => (typeof x === "string" ? x : ""))].join("\n");
      expect(text, p).toMatch(SITE);
    }
  });
  it("alla RoofingContractor-noder bär samma tider och inget annat tidsfält (ingen priceRange, ingen sameAs)", () => {
    for (const n of [buildLocalBusinessSchema(), buildLocalBusinessLeanSchema()] as any[]) {
      expect(n.openingHoursSpecification).toEqual(OPENING_HOURS);
      expect(n.priceRange).toBeUndefined();
      expect(n.sameAs).toBeUndefined();
    }
    expect(kalla("src/pages/LocationPage.tsx")).not.toContain("openingHoursSpecification"); // gren 168: ortssidans Service-nod har inga öppettider, de bor på verksamheten
  });
  it("tidsformatet är ISO (HH:MM), dagarna är schema.org-namn och alla sju dagar förekommer en gång", () => {
    const dagar = OPENING_HOURS.flatMap((o) => o.dayOfWeek);
    expect(dagar).toHaveLength(7);
    expect(new Set(dagar).size).toBe(7);
    for (const o of OPENING_HOURS) {
      expect(o.opens).toMatch(/^\d\d:\d\d$/);
      expect(o.closes).toMatch(/^\d\d:\d\d$/);
    }
  });
});

describe("paket 92: paymentAccepted är borta (D2), och D1/L1 är orörda", () => {
  it("ingen RoofingContractor-nod anger paymentAccepted, currenciesAccepted är kvar", () => {
    for (const n of [buildLocalBusinessSchema(), buildLocalBusinessLeanSchema()] as any[]) {
      expect(n.paymentAccepted).toBeUndefined();
      expect(n.currenciesAccepted).toBe("SEK");
    }
    expect(kalla("src/pages/LocationPage.tsx")).not.toContain("paymentAccepted");
    expect(kalla("src/lib/schema.ts")).not.toContain("paymentAccepted");
  });
  it("beskrivningen och tjänstekatalogen (D1, plåtarbeten) och adressen (L1) är orörda", () => {
    const n = buildLocalBusinessSchema() as any;
    expect(n.description).toContain("plåtarbeten");
    expect(n.hasOfferCatalog.itemListElement.some((o: any) => /Plåtarbeten/.test(o.itemOffered.name))).toBe(true);
    expect(n.address.streetAddress).toBeUndefined();
  });
});
