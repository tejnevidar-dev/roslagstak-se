/**
 * Paket 51a (Marknadschefen 2026-10-11): /recensioner (1.4, 1.5, 1.9, S4), /projekt (1.6, 1.10), "med kundens samtycke" på fem ställen,
 * /brf (2.5, Bi2), /priser (2.6), 2.7, 2.8 och K4. Ett test per struken eller ny lydelse.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { prerenderContent } from "../../scripts/prerender-content";
import { BRF_BOENDE, BRF_HERO_CAPTION, BRF_PROCESS, BRF_STEPS } from "@/data/brf-sections";
import { brfFaqs } from "@/data/brf-faqs";
import { projectTexts } from "@/data/project-texts";
import { HOME_REFERENS } from "@/data/home-referens";

const walk = (d: string): string[] => readdirSync(d).flatMap((f) => { const x = join(d, f); return statSync(x).isDirectory() ? (f === "test" ? [] : walk(x)) : /\.tsx?$/.test(f) ? [x] : []; });
const kallor = () => [...walk("src"), "scripts/prerender-content.ts"];
const text = (path: string) => {
  const p = prerenderContent(path)!;
  return [p.h1, p.intro, ...p.paragraphs.map((x) => (typeof x === "string" ? x : ""))].join("\n");
};

describe("paket 51a: /recensioner", () => {
  it("S4: serverns HTML har React-sidans rubrik, ingress och tre kort", () => {
    const p = prerenderContent("/recensioner")!;
    expect(p.h1).toBe("Omdömen om RoslagsTak");
    expect(p.intro).toBe("Våra omdömen finns på Google. Följ länken till vår Google-profil för att läsa dem. Vi publicerar inga egenskrivna recensioner och kan inte kontrollera vem som skriver på Google.");
    const t = text("/recensioner");
    for (const kort of ["På Google, inte skrivna av oss:", "Läs dem hos Google:", "Har vi jobbat hos dig?"]) expect(t, kort).toContain(kort);
  });

  it("1.4: stycket om att bedöma en takfirma är struket", () => {
    const t = text("/recensioner");
    for (const borta of ["Så kan du själv bedöma en takfirma", "Ett seriöst företag", "aldrig ett pris per telefon", "garantierna skriftligt"]) expect(t, borta).not.toContain(borta);
  });

  it("1.5: 'rådgivning' blir 'takkontroll'", () => {
    const t = text("/recensioner");
    expect(t).toContain("våra riktpriser eller boka en kostnadsfri takkontroll.");
    expect(t).not.toMatch(/rådgivning/i);
  });

  it("1.9: de två styckena om omdömena är strukna och den korta lydelsen står kvar", () => {
    const t = text("/recensioner");
    for (const borta of ["istället för att skriva egna omdömen", "hur vi svarar", "bygger kontinuerligt upp", "helt frivilligt", "trovärdiga"]) expect(t, borta).not.toContain(borta);
    expect(t).toContain("Vi länkar till Google i stället för att publicera omdömen här. Omdömen på Google kan vi inte ändra eller ta bort.");
  });

  it("uppmaningen är densamma i serverns HTML och i React-sidan", () => {
    const uppmaning = "Boka en kostnadsfri takkontroll. Behöver taket åtgärdas får du en offert med fast pris.";
    expect(text("/recensioner")).toContain(uppmaning);
    expect(readFileSync("src/pages/Reviews.tsx", "utf8")).toContain(uppmaning);
  });
});

describe("paket 51a: /projekt och 'med kundens samtycke'", () => {
  it("1.6: Storstockholm är borta ur meta, och Grisslehamn har sin mening", () => {
    const p = prerenderContent("/projekt")!;
    expect(p.description).toBe("Se riktiga takprojekt vi har utfört i Roslagen, med bilder och fakta om material, omfattning och plats.");
    expect(p.description).not.toMatch(/Storstockholm/);
    expect(text("/projekt")).toContain("Nytt tak i Grisslehamn: komplett takbyte på ett hus i Grisslehamn i Norrtälje kommun, med svarta betongpannor från Benders. Taket är 120 kvadratmeter.");
    expect(readFileSync("src/pages/ProjectsPage.tsx", "utf8")).toContain("Se riktiga takprojekt vi har utfört i Roslagen, med bilder");
  });

  it("1.10: /projekt ingress utan 'med kundens samtycke', i serverns HTML och i React", () => {
    expect(prerenderContent("/projekt")!.intro).toBe("Här visar vi jobb vi har utfört. Riktiga bilder, riktiga material.");
    expect(readFileSync("src/pages/ProjectsPage.tsx", "utf8")).toContain('text="Här visar vi jobb vi har utfört. Riktiga bilder, riktiga material."');
  });

  it("'med kundens samtycke' finns inte på något av de fem ställena", () => {
    expect(kallor().filter((f) => /publiceras med kundens samtycke|visas med kundens samtycke|med kundens samtycke\. Riktiga/.test(readFileSync(f, "utf8")))).toEqual([]);
    expect(JSON.stringify(HOME_REFERENS)).not.toMatch(/samtycke/);
    expect(JSON.stringify(projectTexts)).not.toMatch(/samtycke/);
    expect(JSON.stringify(projectTexts)).toContain("Jobbet är utfört av RoslagsTak. Funderar du på ditt eget tak?");
  });
});

describe("paket 51a: /brf", () => {
  const brfText = () => JSON.stringify({ BRF_BOENDE, BRF_PROCESS, BRF_STEPS, brfFaqs, BRF_HERO_CAPTION });
  it("2.5: städning, bortforsling, skydd av fasad, tidplan och startdatum är borta ur sidans texter", () => {
    const t = brfText();
    for (const borta of ["städas", "städar", "bortforsling", "skyddar fasad", "planteringar", "uteplatser", "startdatum", "Startdatum", "tidplan och", "och tidplan", "får en fast kontaktperson", "under hela projektet, städ"]) expect(t, borta).not.toContain(borta);
    expect(BRF_BOENDE.map((b) => b.title)).not.toContain("Ordning på arbetsplatsen");
  });

  it("2.5: de nya lydelserna står", () => {
    const t = brfText();
    for (const ny of [
      "Vi svarar på frågor om underlag och material innan ni bestämmer er.",
      "Ställning och etablering stäms av med styrelsen, och när arbetet görs bestämmer vi tillsammans. Föreningen har en kontaktperson genom hela processen.",
      "Rivning, underlag, nytt tak och plåtdetaljer.",
      "Ställningen reses innan arbetet börjar.",
      "När beslutet är taget planerar vi ställning och arbetets gång tillsammans med styrelsen.",
      "Vi planerar ställningen och arbetets gång tillsammans med styrelsen, och föreningen har en kontaktperson genom hela processen.",
    ]) expect(t, ny).toContain(ny);
  });

  it("Bi2: bildtext och alt kallar bilden en 3D-visualisering, och sidan nämner ingen plats eller nylagt tak", () => {
    expect(BRF_HERO_CAPTION).toBe("3D-visualisering av ett tak med snörasskydd.");
    expect(readFileSync("src/pages/BrfPage.tsx", "utf8")).toContain('alt="3D-visualisering av ett tak med mörka pannor och snörasskydd"');
    expect(text("/brf")).not.toMatch(/nylagt tak, Roslagens skärgård/);
  });
});

describe("paket 51a: /priser, länktexter och /material", () => {
  it("2.6: 'aldrig ett pris' är borta, och den nya meningen står i prislistan", () => {
    expect(kallor().filter((f) => /lämnar vi aldrig ett pris/.test(readFileSync(f, "utf8")))).toEqual([]);
    expect(readFileSync("src/data/prices.ts", "utf8")).toContain("Därför lämnar vi det fasta priset först efter takkontrollen.");
  });

  it("2.7: 'tidplan' i annonssidans meta och i länktexten till /offert#faq", () => {
    expect(readFileSync("src/data/landing-services.ts", "utf8")).toContain("offert med fast pris, och vi bestämmer tidpunkt tillsammans med dig.");
    expect(readFileSync("src/data/landing-services.ts", "utf8")).not.toContain("en tidplan tillsammans med dig");
    expect(readFileSync("src/data/internal-links.ts", "utf8")).toContain("Garantier, ROT och vad som ingår i ett fast pris.");
  });

  it("2.8: länktexten heter 'Takkontroll: …' och adressen är oförändrad", () => {
    const s = readFileSync("src/data/service-blocks.ts", "utf8");
    expect(s).toContain('{ to: "/blogg/takinspektion-guide", label: "Takkontroll: när, varför och hur det går till" }');
    expect(s).not.toContain("Takinspektion: när");
  });

  it("K4: /material säger inte längre 'utan påhittade livslängder eller priser'", () => {
    const s = readFileSync("src/pages/MaterialsPage.tsx", "utf8");
    expect(s).not.toContain("påhittade");
    expect(s).toContain("Här går vi igenom vad som skiljer dem åt.");
  });
});
