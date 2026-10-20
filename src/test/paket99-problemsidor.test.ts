/**
 * Paket 99: de tio gamla problemsidorna enligt Innehålls läsning (innehall/takproblem-sidor-lasning-2026-10-15.md), ordagrant.
 * "Så undersöks det" utan uppräkning, "Vanliga åtgärder" med raden om takkontrollen, och de små rättningarna.
 * De nyare problemsidorna (med brief) är orörda.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { ATGARDER_RAD, ATGARDER_RUBRIK, problems } from "../data/problems";
import { prerenderContent } from "../../scripts/prerender-content";

const TIO = ["lackage-vid-skorsten", "trasiga-takpannor", "mossa-pa-taket", "rostig-plat", "fukt-pa-vinden", "igensatta-hangrannor", "rutten-raspont", "kondens-pa-vinden", "dalig-underlagspapp", "istappar-pa-taket"];
const RAD = "Vilka av dem som behövs, och vilka vi gör, går vi igenom vid takkontrollen.";
const UNDERSOK = "Vid takkontrollen tittar en av våra säljare på taket på plats. Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris.";
const p = (slug: string) => problems.find((x) => x.slug === slug)!;
const serverText = (slug: string) => {
  const s = prerenderContent(`/takproblem/${slug}`)!;
  return [s.intro ?? "", ...s.paragraphs.map((x) => (typeof x === "string" ? x : ""))].join("\n");
};

describe("paket 99: de tio gamla problemsidorna", () => {
  it("'Så undersöks det' är samma mening utan uppräkning på alla tio", () => {
    for (const s of TIO) expect(p(s).undersokning, s).toBe(UNDERSOK);
  });
  it("åtgärdsavsnittet heter 'Vanliga åtgärder' och slutar med raden om takkontrollen, från sidmallen (paket 101): datan upprepar varken rubrik eller rad", () => {
    expect(ATGARDER_RUBRIK).toBe("Vanliga åtgärder");
    expect(ATGARDER_RAD).toBe(RAD);
    for (const s of TIO) expect(p(s).atgarder.includes(RAD), s).toBe(false);
  });
  it("mossa, rost och kondens har Innehålls särskilda åtgärdstexter", () => {
    expect(p("mossa-pa-taket").atgarder.startsWith("Taktvätt och rensning av hängrännor. Är ytan skadad kan fler åtgärder behövas.")).toBe(true); // gren 133 lägger till text efter
    expect(p("rostig-plat").atgarder.startsWith("Beroende på hur långt rosten har gått: ny ytbehandling, byte av plåtdetaljer eller nytt plåttak.")).toBe(true);
    expect(p("kondens-pa-vinden").atgarder.startsWith("Tätning mot bostaden och bättre ventilation i takfot och nock. Vid omfattande fuktskador även åtgärder på underlaget.")).toBe(true);
    for (const s of ["mossa-pa-taket", "rostig-plat", "kondens-pa-vinden", "fukt-pa-vinden", "istappar-pa-taket"]) {
      expect(p(s).atgarder, s).not.toMatch(/behandling av taket|Rengöring och ny ytbehandling|vindslucka, genomföringar/);
    }
  });
  it("de små rättningarna: 'ofta efter storm', 'oftast på norrsidan', mossans akut-text och 'inomhusmiljön'", () => {
    expect(p("trasiga-takpannor").symptom).toContain("saknas, till exempel efter en storm.");
    expect(p("trasiga-takpannor").symptom).not.toContain("ofta efter storm");
    expect(p("mossa-pa-taket").symptom).toContain("till exempel på norrsidan och under träd");
    expect(p("mossa-pa-taket").akut).toBe("Tjocka mattor av mossa kan hålla kvar fukt och täppa till hängrännor.");
    expect(p("fukt-pa-vinden").akut).toBe("Vid aktivt läckage, blöt isolering eller mögel som sprider sig. Mögel på vinden ska utredas, eftersom det kan påverka virket.");
  });
  it("serverns HTML och React har samma rubrik och texter", () => {
    const react = readFileSync("src/pages/ProblemPage.tsx", "utf8");
    expect(react).toContain("ATGARDER_RAD");
    expect(react).toContain("heading: ATGARDER_RUBRIK");
    for (const s of TIO) {
      const t = serverText(s);
      expect(t, s).toContain("Vanliga åtgärder");
      expect(t, s).not.toContain("Åtgärder som används");
      expect(t, s).toContain(UNDERSOK);
      expect(t, s).toContain(RAD);
    }
  });
  it("rubriken och raden gäller alla 27 problemsidor (paket 101), också de 17 nyare", () => {
    expect(problems.length).toBe(27);
    for (const x of problems) {
      const t = serverText(x.slug);
      expect(t, x.slug).toContain("Vanliga åtgärder");
      expect(t, x.slug).not.toContain("Åtgärder som används");
      expect(t, x.slug).toContain(RAD);
    }
  });
  it("inget förbjudet eller obelagt ord i de ändrade fälten", () => {
    for (const s of TIO) {
      const alla = [p(s).undersokning, p(s).atgarder, p(s).akut, p(s).symptom].join("\n");
      expect(alla, s).not.toMatch(/\bjour\b|\bakut utryckning\b|garanterar|inomhusmiljön/i);
    }
  });
});

describe("paket 99b: /akut-lackage säger inte 'ingen jour'", () => {
  it("varken källan eller serverns text har ordet jour, och svarstiden står kvar", () => {
    expect(readFileSync("src/data/landing-services.ts", "utf8")).not.toMatch(/\bjour\b/i);
    const s = prerenderContent("/akut-lackage")!;
    const t = [s.intro ?? "", ...s.paragraphs.map((x) => (typeof x === "string" ? x : ""))].join("\n");
    expect(t).not.toMatch(/\bjour\b/i);
    expect(t).toContain("Vi svarar inom 24 timmar.");
  });
});
