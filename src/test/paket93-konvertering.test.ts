/**
 * Paket 93 (Innehålls läsning av /priser, /kontakt och /tjanster/takomlaggning, 2026-10-14): P1, P2, K1, K2, K3, T2, T3, T4 ordagrant och T5 struken. T1 (raden under rubriken) och startsidan är orörda.
 * Underlag: ledning/marknad/innehall/konverteringssidor-lasning-2026-10-14.md.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { prerenderContent } from "../../scripts/prerender-content";
import { PRICES_PAGE_TEXT } from "@/data/prices-page-text";
import { serviceMeta } from "@/data/service-page";

const kalla = (f: string) => readFileSync(f, "utf8");
const text = (p: string) => {
  const s = prerenderContent(p)!;
  return [s.intro ?? "", ...s.paragraphs.map((x) => (typeof x === "string" ? x : ""))].join("\n");
};

describe("paket 93: /priser (P1, P2)", () => {
  it("P1: raden längst ned säger att man bokar en takkontroll och får fast pris, inte att man konfigurerar en offert", () => {
    expect(PRICES_PAGE_TEXT.ctaText).toBe("Boka en kostnadsfri takkontroll, så får du ett fast pris i offerten.");
    expect(text("/priser")).toContain("Boka en kostnadsfri takkontroll, så får du ett fast pris i offerten.");
    expect(text("/priser")).not.toContain("Konfigurera din offert eller kontakta oss");
  });
  it("P2: svaret om öar har hela ö-lydelsen", () => {
    const nytt = "Har ditt hus ingen bilväg: berätta var det ligger när du hör av dig, så går vi igenom hur en takkontroll kan ordnas. Ditt pris står i offerten och är fast.";
    expect(text("/priser")).toContain(nytt);
    expect(text("/priser")).not.toContain("hör av dig. Ditt pris står i offerten och är fast.");
  });
  it("priserna och ROT-förbehållet på /priser är orörda", () => {
    const t = text("/priser");
    expect(t).toContain("Vi arbetar endast till fast pris.");
    expect(t).toMatch(/drar vi av det på fakturan och begär utbetalningen från Skatteverket/);
  });
});

describe("paket 93: /kontakt (K1, K2, K3) i serverns HTML", () => {
  const t = text("/kontakt");
  it("K1: ö-stycket har den godkända ö-lydelsen och nämner inte Blidö och Singö", () => {
    expect(t).toContain("För dig på en ö: vi tar uppdrag i skärgården. Har ditt hus ingen bilväg: berätta var det ligger när du hör av dig, så går vi igenom hur en takkontroll kan ordnas.");
    expect(t).not.toContain("Blidö och Singö");
  });
  it("K2: tredje stycket lovar rapport efter takkontrollen och offert bara om taket behöver åtgärdas (K3), utan 'tillsammans med dig om du vill'", () => {
    expect(t).toContain("När du hör av dig får du svar inom 24 timmar. Vi bokar en tid för takkontroll som passar dig, och en av våra säljare tittar på taket på plats. Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris.");
    expect(t).not.toContain("tillsammans med dig");
    expect(t).not.toContain("lämnar därefter en offert");
  });
  it("K3: man skriver i formuläret, man mejlar inte via det", () => {
    expect(t).toContain("Du kan också skriva i formuläret på sidan. Ange adressen, så återkommer vi med förslag på tid för takkontroll.");
    expect(t).not.toContain("mejla via formuläret");
  });
  it("övriga stycken och formuläret är orörda (LeadForm.tsx rörs inte)", () => {
    expect(t).toContain("Läcker det: ring 070-154 36 39. Vi svarar inom 24 timmar.");
    expect(t).toContain("Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris. Du bestämmer i din egen takt.");
    expect(kalla("src/components/LeadForm.tsx")).not.toContain("paket 93");
  });
});

describe("paket 93: /tjanster/takomlaggning (T2, T3, T4, T5), T1 orörd", () => {
  const t = text("/tjanster/takomlaggning");
  it("T2: rutan säger 'enligt AMA' i stället för 'AMA-standard'", () => {
    expect(serviceMeta.takomlaggning.specs).toContainEqual({ k: "Utförande", v: "enligt AMA" });
    expect(t).toContain("Utförande: enligt AMA");
    expect(t).not.toContain("AMA-standard");
  });
  it("T3: rubriken säger 'Fyra vanliga ytskikt', inte att vi lägger fyra", () => {
    expect(t).toContain("Fyra vanliga ytskikt — och vad som skiljer dem");
    expect(t).not.toContain("Fyra ytskikt vi lägger");
  });
  it("T4: rutan 'Boka takkontroll' har K3-lydelsen ordagrant, bara på takomläggning", () => {
    expect(t).toContain("Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris.");
    expect(t).not.toContain("Vi återkommer med ett fast pris för ditt projekt efter kostnadsfri takkontroll.");
    // sedan paket 94 har alla tjänstesidor samma lydelse (se paket94-aside.test.ts)
  });
  it("T5: den allmänna meningen är ersatt av Innehålls alternativ, så banderollen 'Hantverket' har kvar sin rubrikrad; de andra tjänstesidornas data är orörda", () => {
    expect(serviceMeta.takomlaggning.craftLine).toBe("Underlaget, beslagen och ventilationen går vi igenom vid takkontrollen.");
    expect(t).toContain("Underlaget, beslagen och ventilationen går vi igenom vid takkontrollen.");
    expect(t).not.toContain("Rätt underlag, rätt beslag");
    expect(t).not.toContain("det är där ett tak avgörs");
    expect(serviceMeta.takrenovering.craftLine.length).toBeGreaterThan(10);
  });
  it("T5 i React och serverns HTML: raden ritas bara när den har text (inget tomt stycke), och den finns i banderollen", () => {
    expect(kalla("src/pages/ServiceDetail.tsx")).toMatch(/\{meta\.craftLine && \(\s*<p className="mt-5 max-w-2xl/);
    expect(kalla("src/data/service-page.ts")).toContain("...(meta.craftLine ? [meta.craftLine] : []),");
    expect(prerenderContent("/tjanster/takomlaggning")!.paragraphs.every((p) => typeof p !== "string" || p.trim() !== "")).toBe(true);
  });
  it("T4 i React: rutan tar den gemensamma texten (paket 94)", () => {
    expect(kalla("src/pages/ServiceDetail.tsx")).toContain("{SERVICE_COPY.asideText}");
  });
  it("T1 (raden under rubriken) är orörd: Vidars beslut väntar", () => {
    const s = prerenderContent("/tjanster/takomlaggning")!;
    expect(s.intro).toBe("Komplett takbyte där vi byter takmaterial, ser över råspont och underlagstäckning och utför allt enligt AMA.");
  });
});

describe("paket 93: startsidan är orörd", () => {
  it("meningen om underlag, infästning och plåtdetaljer står kvar på startsidan (beslutet tas tillsammans med T5 av Marknadschefen)", () => {
    expect(text("/")).toContain("Det är i underlaget, infästningen och plåtdetaljerna som ett tak avgörs.");
  });
});
