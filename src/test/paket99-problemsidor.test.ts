/**
 * Paket 99: de tio gamla problemsidorna enligt Innehålls läsning (innehall/takproblem-sidor-lasning-2026-10-15.md), ordagrant.
 * "Så undersöks det" utan uppräkning, "Vanliga åtgärder" med raden om takkontrollen, och de små rättningarna.
 * De nyare problemsidorna (med brief) är orörda.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { problems } from "../data/problems";
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
  it("åtgärdsavsnittet heter 'Vanliga åtgärder' och slutar med raden om takkontrollen på alla tio", () => {
    for (const s of TIO) {
      expect(p(s).atgarderRubrik, s).toBe("Vanliga åtgärder");
      expect(p(s).atgarder.endsWith(RAD), s).toBe(true);
    }
  });
  it("mossa, rost och kondens har Innehålls särskilda åtgärdstexter", () => {
    expect(p("mossa-pa-taket").atgarder).toBe(`Taktvätt och rensning av hängrännor. Är ytan skadad kan fler åtgärder behövas. ${RAD}`);
    expect(p("rostig-plat").atgarder).toBe(`Beroende på hur långt rosten har gått: ny ytbehandling, byte av plåtdetaljer eller nytt plåttak. ${RAD}`);
    expect(p("kondens-pa-vinden").atgarder).toBe(`Tätning mot bostaden och bättre ventilation i takfot och nock. Vid omfattande fuktskador även åtgärder på underlaget. ${RAD}`);
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
    expect(react).toContain("problem.atgarderRubrik");
    for (const s of TIO) {
      const t = serverText(s);
      expect(t, s).toContain("Vanliga åtgärder");
      expect(t, s).not.toContain("Åtgärder som används");
      expect(t, s).toContain(UNDERSOK);
      expect(t, s).toContain(RAD);
    }
  });
  it("de nyare problemsidorna är orörda: rubriken 'Åtgärder som används' och deras egna undersökningstexter står kvar", () => {
    const ovriga = problems.filter((x) => !TIO.includes(x.slug));
    expect(ovriga.length).toBeGreaterThanOrEqual(17);
    for (const x of ovriga) {
      expect(x.atgarderRubrik, x.slug).toBeUndefined();
      expect(x.undersokning, x.slug).not.toBe(UNDERSOK);
      expect(serverText(x.slug), x.slug).toContain("Åtgärder som används");
    }
  });
  it("inget förbjudet eller obelagt ord i de ändrade fälten", () => {
    for (const s of TIO) {
      const alla = [p(s).undersokning, p(s).atgarder, p(s).akut, p(s).symptom].join("\n");
      expect(alla, s).not.toMatch(/\bjour\b|\bakut utryckning\b|garanterar|inomhusmiljön/i);
    }
  });
});
