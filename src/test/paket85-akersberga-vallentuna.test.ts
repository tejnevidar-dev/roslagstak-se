/**
 * Paket 85 (Marknadschefen 2026-10-13 21:25, innehall/gren85-briefrader-2026-10-13.md Å1, Å2, V1, V2, T5 och Tk2): fem tjänst × ort-sidor säger vilka vi är och hur man bokar
 * i första stycket (samma form som gren 81 och 82), och svaret på "Vilka områden arbetar ni i?" på /takkontroll säger vilka vi är. Godkända lydelser som flyttas upp, inget nytt påstående.
 */
import { describe, expect, it } from "vitest";
import { comboOverrides } from "@/data/combo-overrides";
import { landingServices } from "@/data/landing-services";
import { stripInlineMd } from "@/lib/inline-md";
import { prerenderContent } from "../../scripts/prerender-content";

const BAS = (ort: string) => `Vi är en takfirma med bas i Norrtälje och tar uppdrag i ${ort}.`;
const BOKA = "Boka på roslagstak.se/takkontroll eller ring 070-154 36 39.";
const c = (n: string) => comboOverrides[n].content;

/** Gren 148 (ägarkartan A och C) lägger en mening med länk till ortssidan (och takrenoveringssidan) i första stycket. De här proven gäller resten av stycket, så meningarna tas bort före jämförelsen; paket148 prövar meningarna. */
const utanLankMening = (t: string) => t.replace(/ Mer om orten finns på sidan om \[[^\]]+\]\([^)]+\)\./, "").replace(/ Ska bara delar av taket göras om finns mer på sidan om \[[^\]]+\]\([^)]+\)\./, "");

describe("paket 85: första stycket på fem sidor", () => {
  it("/takbyte-akersberga: basen först, bokning och svarstid sist; basmeningen borta ur 'Närområdet'", () => {
    const f = utanLankMening(c("takbyte-akersberga")[0]);
    expect(f.startsWith(BAS("Åkersberga") + " Mellan Stockholm och skärgården")).toBe(true);
    expect(f.endsWith(BOKA + " Vi svarar inom 24 timmar.")).toBe(true);
    expect(c("takbyte-akersberga").filter((p) => p.includes(BAS("Åkersberga"))).length).toBe(1);
  });
  it("/takomlaggning-akersberga: basen först, bokningen sist, frågan 'Plåt, betong eller tegel?' borta", () => {
    const f = utanLankMening(c("takomlaggning-akersberga")[0]);
    expect(f.startsWith(BAS("Åkersberga") + " Vid en takomläggning byggs taket upp på nytt")).toBe(true);
    expect(f.endsWith("Det börjar med en kostnadsfri takkontroll: boka på roslagstak.se/takkontroll eller ring 070-154 36 39.")).toBe(true);
    expect(f).not.toContain("Plåt, betong eller tegel?");
    expect(c("takomlaggning-akersberga").filter((p) => p.includes(BAS("Åkersberga"))).length).toBe(1);
  });
  it("/takbyte-vallentuna: basen som andra mening, bokning och svarstid sist", () => {
    const f = utanLankMening(c("takbyte-vallentuna")[0]);
    expect(f.startsWith("Funderar du på att byta tak i Vallentuna? " + BAS("Vallentuna") + " Här går vi igenom")).toBe(true);
    expect(f.endsWith(BOKA + " Vi svarar inom 24 timmar.")).toBe(true);
    expect(c("takbyte-vallentuna").filter((p) => p.includes(BAS("Vallentuna"))).length).toBe(1);
  });
  it("/takomlaggning-vallentuna: basen först, 'och hur du kommer igång' borta, bokningen sist", () => {
    const f = utanLankMening(c("takomlaggning-vallentuna")[0]);
    expect(f.startsWith(BAS("Vallentuna") + " Har taket på ditt hus i Vallentuna")).toBe(true);
    expect(f).not.toContain("hur du kommer igång");
    expect(f.endsWith("Det börjar med en kostnadsfri takkontroll: boka på roslagstak.se/takkontroll eller ring 070-154 36 39.")).toBe(true);
    expect(c("takomlaggning-vallentuna").filter((p) => p.includes(BAS("Vallentuna"))).length).toBe(1);
  });
  it("/takrenovering-taby: basen först, 'För dig som bor i Täby' borta, 'efter en kostnadsfri takkontroll' och bokningen sist", () => {
    const f = utanLankMening(c("takrenovering-taby")[0]);
    expect(f.startsWith(BAS("Täby") + " Ett tak som har börjat läcka")).toBe(true);
    expect(f).not.toContain("För dig som bor i Täby");
    expect(f.endsWith("hur du får ett fast pris efter en kostnadsfri takkontroll. " + BOKA)).toBe(true);
    expect(c("takrenovering-taby").filter((p) => p.includes(BAS("Täby"))).length).toBe(1);
  });
  it("serverns HTML har samma första stycke, och basmeningen står en gång per sida", () => {
    for (const n of ["takbyte-akersberga", "takomlaggning-akersberga", "takbyte-vallentuna", "takomlaggning-vallentuna", "takrenovering-taby"]) {
      const p = prerenderContent("/" + n)!.paragraphs.map((x) => (typeof x === "string" ? x : ""));
      expect(p[0], n).toBe(stripInlineMd(c(n)[0]));
      expect(p.join("\n").split("Vi är en takfirma med bas i Norrtälje och tar uppdrag i").length - 1, n).toBe(1);
    }
  });
  it("titel och meta rörs inte på de fem sidorna", () => {
    expect(comboOverrides["takbyte-akersberga"].title).toBe("Takbyte i Åkersberga – fast pris och AMA");
    expect(comboOverrides["takrenovering-taby"].title).toBe("Takrenovering i Täby – kostnadsfri takkontroll");
  });
});

describe("paket 85: Tk2, /takkontroll svarar på 'Vilka områden arbetar ni i?' med basen först", () => {
  const NY = "Vi är en takfirma med bas i Norrtälje och tar uppdrag i Roslagen och Storstockholm.";
  const GAMMAL = "Vi tar uppdrag i Roslagen och Storstockholm.";
  it("bara /takkontroll har fått det nya svaret; /takreparation och /takbyte-var-2027 har det gamla", () => {
    for (const l of landingServices) {
      const f = l.faqs.find((q) => q.question === "Vilka områden arbetar ni i?");
      if (!f) continue;
      expect(f.answer, l.slug).toBe(l.slug === "takkontroll" ? NY : GAMMAL);
    }
    expect(landingServices.find((l) => l.slug === "takkontroll")!.faqs.some((q) => q.answer === NY)).toBe(true);
  });
  it("serverns HTML och FAQPage på /takkontroll har samma svar (frågelistan driver båda)", () => {
    const sida = prerenderContent("/takkontroll")!;
    expect(sida.paragraphs.join("\n")).toContain(NY);
    const ld = JSON.stringify(sida.jsonLd ?? []);
    expect(ld).toContain(NY);
    expect(ld).not.toContain('"Vi tar uppdrag i Roslagen och Storstockholm."');
  });
});
