/**
 * Paket 37 (Innehålls rättelser del 2, grindade av Marknadschefen): frågorna om tid och material efter briefens frågedel, rubriken "Om <ort>",
 * avståndsmeningen, "ungefär 1–2 timmar" och ersättningstexten för takmålningsguiden.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blog-posts";
import { medTidOchMaterial } from "@/data/brief-faq";
import { generateLocationFAQs, generateServiceLocationFAQs, tidOchMaterialFragor } from "@/data/location-faqs";
import { omOrtRubrik, REGIONER_MED_ENKEL_RUBRIK } from "@/data/location-sections";
import { locations } from "@/data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

const TID = "Det beror på takets storlek, underlagets skick och vädret, och det går inte att säga innan någon har tittat på taket. Vi anger därför inget antal dagar här. Hur arbetet läggs upp går vi igenom innan start.";
const MATERIAL = "Vi lägger betongpannor, lertegel, TP20-plåt, pannplåt, dubbelfalsad plåt och papptak. Vilket som passar beror på huset, takets lutning och konstruktionen, och på vilket uttryck du vill ha. Vi går igenom alternativen vid takkontrollen.";

describe("paket 37a: frågorna om tid och material", () => {
  it("lydelserna är Innehålls, ordagrant, på ett ställe", () => {
    const f = generateLocationFAQs("Täby", "i", false);
    expect(f.find((x) => x.question.startsWith("Hur lång tid"))!.answer).toBe(TID);
    expect(f.find((x) => x.question.startsWith("Vilka takmaterial"))!.answer).toBe(MATERIAL);
    const [tid, mat] = tidOchMaterialFragor({ serviceSlug: "takbyte", serviceName: "Takbyte", prep: "i", locationName: "Täby" });
    expect(tid).toEqual({ question: "Hur lång tid tar takbyte i Täby?", answer: TID });
    expect(mat).toEqual({ question: "Vilka takmaterial lägger ni?", answer: MATERIAL });
  });

  it("materialfrågan bara på takbyte och takomläggning", () => {
    const c = (serviceSlug: string, serviceName: string) => tidOchMaterialFragor({ serviceSlug, serviceName, prep: "i", locationName: "Täby" }).map((x) => x.question);
    expect(c("takbyte", "Takbyte")).toHaveLength(2);
    expect(c("takomlaggning", "Takomläggning")).toHaveLength(2);
    for (const [s, n] of [["takrenovering", "Takrenovering"], ["bandtackning", "Bandtäckning"], ["platttak", "Plåttak"]]) expect(c(s, n), s).toHaveLength(1);
    const gen = (n: string) => generateServiceLocationFAQs(n, "Täby", "i", false).map((x) => x.question);
    expect(gen("Takbyte")).toContain("Vilka takmaterial lägger ni?");
    expect(gen("Takomläggning")).toContain("Vilka takmaterial lägger ni?");
    expect(gen("Takrenovering").some((q) => /material/i.test(q))).toBe(false);
  });

  it("läggs direkt efter briefens sista fråga, och bara en gång", () => {
    const c = { serviceSlug: "takbyte", serviceName: "Takbyte", prep: "i", locationName: "Täby" };
    const ut = medTidOchMaterial(["Text.", "## Vanliga frågor om takbyte i Täby", "**Är priset fast?** Ja.", "Boka."], c);
    expect(ut).toEqual(["Text.", "## Vanliga frågor om takbyte i Täby", "**Är priset fast?** Ja.", `**Hur lång tid tar takbyte i Täby?** ${TID}`, `**Vilka takmaterial lägger ni?** ${MATERIAL}`, "Boka."]);
    expect(medTidOchMaterial(ut, c)).toEqual(ut);
    expect(medTidOchMaterial(["Text."], c)).toEqual(["Text."]);
  });

  it("sidan med brief visar frågorna i den statiska texten och i FAQPage-schemat", () => {
    const sida = prerenderContent("/takbyte-taby")!;
    const text = sida.paragraphs.map((p) => (typeof p === "string" ? p : (p as { h: string }).h ?? "")).join("\n");
    expect(text).toContain("Hur lång tid tar takbyte i Täby?");
    expect(text).toContain(TID);
    expect(text).toContain(MATERIAL);
    const ld = (sida.jsonLd ?? []).find((j) => (j as { "@type"?: string })["@type"] === "FAQPage") as { mainEntity: { name: string }[] };
    expect(ld.mainEntity.map((q) => q.name)).toEqual(expect.arrayContaining(["Hur lång tid tar takbyte i Täby?", "Vilka takmaterial lägger ni?"]));
  });
});

describe("paket 37b: rubriken Om <ort>", () => {
  it("51 sidor i fem regioner får bara ortsnamnet, övriga behåller sin rubrik", () => {
    const med = locations.filter((l) => REGIONER_MED_ENKEL_RUBRIK.has(l.region));
    expect(med).toHaveLength(51);
    for (const l of med) expect(omOrtRubrik(l)).toBe(`Om ${l.name}`);
    const sodermalm = locations.find((l) => l.name === "Södermalm")!;
    expect(omOrtRubrik(sodermalm)).toBe(`Om Södermalm och takläggning i ${sodermalm.region}`);
  });
});

describe("paket 37c: avståndsmeningen", () => {
  it("'<Ort> ligger cirka <X> km från vår bas i Norrtälje.' utan 'tillhör'", () => {
    const rad = (prerenderContent("/taklaggare-taby")!.paragraphs as string[]).find((p) => typeof p === "string" && p.includes("Närmaste orter i vårt område"))!;
    expect(rad).toMatch(/^Täby ligger cirka \d+ km från vår bas i Norrtälje\. Närmaste orter/);
    expect(rad).not.toContain("tillhör");
  });
});

describe("paket 37d: 'ungefär 1–2 timmar'", () => {
  it("står på de sju ställena, och 'ca 1–2 timmar' finns inte kvar i koden", () => {
    for (const f of ["src/data/home-faqs.ts", "src/data/internal-links.ts", "src/data/landing-services.ts", "src/data/service-blocks.ts", "src/data/service-page.ts", "public/llms.txt"]) {
      const t = readFileSync(f, "utf8");
      expect(t, f).toMatch(/[Uu]ngefär 1–2 timmar/);
      expect(/\b[Cc]a 1–2 timmar/.test(t), f).toBe(false);
    }
    expect(readFileSync("src/data/service-blocks.ts", "utf8")).toContain('value: "Ungefär 1–2 timmar"');
    expect(readFileSync("src/data/service-page.ts", "utf8")).toContain('v: "Ungefär 1–2 timmar"');
  });
});

describe("paket 37e: takmålningsguiden", () => {
  it("ersättningstexten med titel och meta, och inga obelagda påståenden kvar", () => {
    const g = blogPosts.find((b) => b.slug === "takmalning-betongpannor")!;
    expect(g.title).toBe("Takmålning av betongpannor: börja med en takkontroll");
    expect(g.excerpt).toBe("Går betongpannorna att måla, eller är det dags att byta? Det går inte att säga på avstånd. Vi börjar med en kostnadsfri takkontroll utan förpliktelser.");
    expect(g.title.length).toBeLessThanOrEqual(60);
    expect(g.excerpt.length).toBeLessThanOrEqual(160);
    const t = g.content.join("\n");
    for (const borta of ["10–15 år", "15–20 års", "torktid", "sparar du 30", "betydligt billigare", "juni–september", "alg- och mosskydd"]) expect(t, borta).not.toContain(borta);
    expect(t).toContain("Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris.");
    expect(t).toContain("Vi svarar inom 24 timmar.");
  });
});
