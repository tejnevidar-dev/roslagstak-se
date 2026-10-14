/**
 * Paket 95 (projektsidorna, Innehålls briefrader 2026-10-14): länktexten till ortssidan har rätt preposition ("Takläggare på Blidö", "Takläggare på Singö", "Takläggare i Grisslehamn"),
 * "Så arbetar vi" har K3 på alla tre, och Grisslehamns avvattning säger Vidars ord. Adressen till ortssidorna är oförändrad.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { prerenderContent } from "../../scripts/prerender-content";
import { projectTexts } from "@/data/project-texts";
import { projektOrtLank } from "@/data/project-lank";

const SLUGS = ["takrenovering-blido", "takbyte-singo", "takbyte-grisslehamn"];
const FORE_SA = "Därefter får kunden en offert med fast pris, arbetet utförs enligt AMA och kunden har en kontaktperson genom hela processen.";
const EFTER_SA = "Efter takkontrollen får kunden en rapport om takets skick, och behöver taket åtgärdas en offert med fast pris. Arbetet utförs enligt AMA, och kunden har en kontaktperson genom hela processen.";
const text = (p: string) => {
  const s = prerenderContent(p)!;
  return [s.intro ?? "", ...s.paragraphs.map((x) => (typeof x === "string" ? x : ""))].join("\n");
};

describe("paket 95: projektsidorna", () => {
  it("länktexten till ortssidan: på för öarna, i för Grisslehamn, med oförändrad adress", () => {
    const vantat: Record<string, [string, string]> = {
      "takrenovering-blido": ["/taklaggare-blido", "Takläggare på Blidö"],
      "takbyte-singo": ["/taklaggare-singo", "Takläggare på Singö"],
      "takbyte-grisslehamn": ["/taklaggare-grisslehamn", "Takläggare i Grisslehamn"],
    };
    for (const slug of SLUGS) {
      const p = projectTexts.find((x) => x.slug === slug)!;
      expect(projektOrtLank(p), slug).toBe(vantat[slug][1]);
      const lank = prerenderContent("/projekt/" + slug)!.links.find((l) => l.href === vantat[slug][0]);
      expect(lank?.label, slug).toBe(vantat[slug][1]);
    }
  });
  it("React använder samma funktion som serverns HTML", () => {
    expect(readFileSync("src/pages/ProjectPage.tsx", "utf8")).toContain("{projektOrtLank(project)}");
    expect(readFileSync("scripts/prerender-content.ts", "utf8")).toContain("label: projektOrtLank(project)");
  });
  it("K3 i 'Så arbetar vi' på alla tre, och den gamla meningen är borta", () => {
    for (const slug of SLUGS) {
      const t = text("/projekt/" + slug);
      expect(t, slug).toContain(EFTER_SA);
      expect(t, slug).not.toContain(FORE_SA);
      expect(t, slug).toContain("Varje jobb börjar med en kostnadsfri takkontroll utan förpliktelser, där en av våra säljare tittar på taket på plats.");
    }
  });
  it("Grisslehamn: 'Ny avvattning från Lindab' i stället för 'Hängrännor och stuprör, från Lindab'", () => {
    const t = text("/projekt/takbyte-grisslehamn");
    expect(t).toContain("Ny avvattning från Lindab. Mer om takavvattning");
    expect(t).not.toContain("Hängrännor och stuprör, från Lindab");
  });
  it("Blidös och Singös avvattningstext är orörd", () => {
    expect(text("/projekt/takrenovering-blido")).toContain("Nya hängrännor");
  });
});
