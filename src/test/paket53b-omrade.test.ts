/**
 * Paket 53b (Marknadschefen 2026-10-11): arbetsområdet utan "hela" (utom startsidan, paket 52), sidfoten K2, AreasPage/RegionPage, Header, "rådgivning" till "takkontroll",
 * 4.2, 4.3, Li5, Li6/P3, Li7, Li8, P2 och Sd1–Sd4. Ett test per ändrad lydelse.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { prerenderContent } from "../../scripts/prerender-content";
import { locations } from "@/data/locations";
import { applyMall, usesMall } from "@/data/location-mall";
import { serviceMeta } from "@/data/service-page";

const kalla = (f: string) => readFileSync(f, "utf8");
const txt = (p: ReturnType<typeof prerenderContent>) => [p!.h1, p!.intro, ...p!.paragraphs.map((x) => (typeof x === "string" ? x : ""))].join("\n");

describe("paket 53b: arbetsområdet", () => {
  it("Rg1 och de egna tjänst × ort-texterna: 'tar uppdrag i Roslagen och Storstockholm', aldrig 'hela'", () => {
    expect(kalla("src/data/region-texts.ts")).not.toMatch(/tar uppdrag i hela/);
    expect(kalla("src/data/region-texts.ts").split("tar uppdrag i Roslagen och Storstockholm.").length - 1).toBe(8);
    expect(kalla("src/data/region-texts.ts")).toContain("tar uppdrag i kommunen.");
    expect(kalla("src/data/region-texts.ts")).toContain("tar uppdrag i Österåker.");
    expect(kalla("src/data/combo-overrides.ts")).not.toContain("tar uppdrag i hela Storstockholm");
    expect(kalla("src/data/combo-overrides.ts").split("tar uppdrag i Roslagen och Storstockholm").length - 1).toBeGreaterThanOrEqual(20);
  });

  it("/omraden (serverns HTML och React) säger 'Roslagen och Storstockholm' utan 'hela' och utan plåtarbeten", () => {
    const p = prerenderContent("/omraden")!;
    const t = txt(p) + p.title + p.description;
    expect(t).not.toMatch(/hela Storstockholm|plåtarbeten/);
    expect(p.h1).toBe("Takläggare i Roslagen och Storstockholm");
    const a = kalla("src/pages/AreasPage.tsx");
    expect(a).not.toMatch(/hela Storstockholm|plåtarbeten|utför takarbeten/);
    expect(a).toContain("Orter där RoslagsTak tar uppdrag");
    const r = kalla("src/pages/RegionPage.tsx");
    expect(r).not.toMatch(/utför takarbeten|plåtarbeten/);
    expect(r).toContain("takbyte, takomläggning och takrenovering i ${places.length} orter");
  });

  it("/kontakt: 'kostnadsfri takkontroll i Roslagen och Storstockholm' utan 'hela'", () => {
    expect(txt(prerenderContent("/kontakt"))).toContain("Vi erbjuder kostnadsfri takkontroll i Roslagen och Storstockholm.");
    expect(txt(prerenderContent("/kontakt"))).not.toMatch(/hela (Roslagen|Storstockholm)/);
  });

  it("sidfoten (K2): inga uppräknade öar, inga plåtarbeten, och länken heter 'Plåt på taket'", () => {
    const f = kalla("src/components/Footer.tsx");
    expect(f).not.toMatch(/Ljusterö, Yxlan|plåtarbeten|Plåtslagare för tak/);
    expect(f).toContain("Takfirma med bas i Norrtälje. Vi tar uppdrag i Roslagen och Storstockholm med takbyte, takomläggning och takrenovering.");
    expect(f).toContain('label: "Plåt på taket"');
    expect(kalla("src/components/Services.tsx")).toContain('short: "Plåt på taket"');
  });

  it("guiderna: 'i hela Roslagen' är borta", () => {
    expect(kalla("src/data/blog-posts.ts")).not.toMatch(/i hela Roslagen/);
  });
});

describe("paket 53b: takkontroll i stället för rådgivning och riktpris i menyn", () => {
  it("Header 42: 'Räkna fram ett riktpris direkt'", () => {
    expect(kalla("src/components/Header.tsx")).toContain('note: "Räkna fram ett riktpris direkt",');
  });
  it("'Kostnadsfri rådgivning' blir 'Kostnadsfri takkontroll' (bara texten) i konfiguratorn och på /recensioner", () => {
    expect(kalla("src/components/QuoteConfigurator.tsx")).toContain("<div>Kostnadsfri takkontroll</div>");
    expect(kalla("src/components/QuoteConfigurator.tsx")).not.toContain("Kostnadsfri rådgivning");
    expect(kalla("src/pages/Reviews.tsx")).not.toContain("Kostnadsfri rådgivning");
    expect(kalla("src/pages/Reviews.tsx")).toContain('to="/offert#radgivning"'); // ankaret rörs inte
  });
  it("de två raderna 'En av våra säljare kontaktar dig inom 24 timmar' är borta ur konfiguratorn", () => {
    expect(kalla("src/components/QuoteConfigurator.tsx")).not.toContain("kontaktar dig inom 24 timmar");
    expect(kalla("src/components/QuoteConfigurator.tsx")).toContain("Vi svarar inom 24 timmar från att formuläret skickas in.");
  });
  it("QuotePage 37: brödsmulan och eyebrow heter 'Offert', i React, serverns HTML och fixturerna", () => {
    expect(kalla("src/pages/QuotePage.tsx")).toContain('{ name: "Offert", path: "/offert" }');
    expect(kalla("src/data/offert-text.ts")).toContain('eyebrow: "Offert",');
    expect(prerenderContent("/offert")!.breadcrumbs!.map((b) => b.name)).toEqual(["Hem", "Offert"]);
  });
});

describe("paket 53b: mallar och länktexter", () => {
  it("4.2: ortssidornas mening är 'hör till <region> i vår områdesindelning'", () => {
    expect(kalla("src/data/location-sections.ts")).not.toContain("tillhör ${regionIMening");
    expect(kalla("src/data/location-sections.ts")).toContain("hör till ${regionIMening(location.region)} i vår områdesindelning.");
  });
  it("4.3: rubriken är 'Takläggare <prep> <ort>: så arbetar vi'", () => {
    expect(kalla("src/data/location-sections.ts")).toContain("heading: `Takläggare ${prep} ${location.name}: så arbetar vi`,");
    expect(kalla("src/data/location-sections.ts")).not.toContain("heading: `Varför välja RoslagsTak som");
  });
  it("Li5: länklistorna säger 'på Singö' och 'på Rådmansö'", () => {
    const c = kalla("src/data/combo-overrides.ts");
    expect(c).toContain('label: "Takläggare på Singö"');
    expect(c).toContain('label: "Takläggare på Rådmansö"');
    expect(c).not.toContain('label: "Takläggare i Singö"');
  });
  it("Li6/P3: sidor med egen text använder mallens lydelse om referensjobbet", () => {
    // Paket 79: meningen har flyttats ur prerender-content.ts till den delade funktionen i location-referens.ts (samma lydelse, React och serverns HTML)
    expect(kalla("scripts/prerender-content.ts")).not.toContain("Vi påstår inte att det jobbet gjordes här");
    expect(kalla("src/data/location-referens.ts")).not.toContain("Vi påstår inte att det jobbet gjordes här");
    expect(kalla("src/data/location-referens.ts")).toContain("Ett referensjobb i närområdet: ${near.title}, ungefär");
  });
  it("Li7: huvudrubrikerna på /tjanster/platarbeten och /tjanster/takavvattning har kolon", () => {
    expect(prerenderContent("/tjanster/platarbeten")!.h1).toBe("Plåtarbeten: beslag och bandtäckning");
    expect(prerenderContent("/tjanster/takavvattning")!.h1).toBe("Takavvattning: rännor och stuprör");
    expect(serviceMeta.platarbeten.h1Sep).toBe(":");
  });
  it("Li8: takrenoveringsmallen säger 'Vi tar uppdrag med takrenovering'", () => {
    expect(kalla("src/data/service-location-combos.ts")).toContain("Vi tar uppdrag med takrenovering ${prep} ${loc.name}, från byte");
    expect(kalla("src/data/service-location-combos.ts")).not.toContain("RoslagsTak utför takrenoveringar");
  });
  it("P2: mallens uppräkning av grannorter har rätt preposition och 'och' före sista ledet", () => {
    const m = kalla("src/data/location-mall.ts");
    expect(m).toContain("bland annat ${orterMedPrep(loc.nearbyLocations)}.");
    // Finnhamn (ö) har grannöar: uppräkningen blir "på A, B och C" i den variant som har uppräkningen
    const ort = locations.find((l) => l.slug === "finnhamn" && usesMall(l));
    if (ort) {
      const txt2 = JSON.stringify(applyMall(ort));
      expect(txt2).not.toMatch(/bland annat i [^.]*, [^.]*\./);
    }
  });
});

describe("paket 53b: strukturerad data", () => {
  it("Sd1, Sd2, Sd3: lydelserna i schema.ts", () => {
    const s = kalla("src/lib/schema.ts");
    expect(s).toContain('"Montering av hängrännor och stuprör."');
    expect(s).not.toContain("snörasskydd.");
    expect(s).toContain('"Takkupor och takfönster: vi börjar med en kostnadsfri takkontroll."');
    expect(s).toContain("Fast pris i offerten efter kostnadsfri takkontroll.");
  });
  it("Sd4: Service-noden på tjänstesidorna har areaServed Roslagen och Storstockholm", () => {
    const s = kalla("src/data/service-page.ts");
    expect(s).toContain('{ "@type": "Place", name: "Storstockholm" }');
  });
});
