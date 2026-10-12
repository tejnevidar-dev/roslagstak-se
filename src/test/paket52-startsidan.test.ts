/**
 * Paket 52 (startsidan; byggs, släpps inte): huvudrubriken, 1.1, 1.2, 1.3, 2.1, 2.3, S3 (serverns HTML och React säger samma sak), Li3, Li4, Bi5 och slutradens svarstid.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { prerenderContent } from "../../scripts/prerender-content";
import { HOME_ABOUT_CAPTION, HOME_ABOUT_P1 } from "@/data/home-about";
import { HOME_AREA_INTRO, HOME_AREA_SEO_PARAGRAPHS, homeAreaIntroText } from "@/data/home-area";
import { HOME_GUIDES } from "@/data/home-guides";
import { HOME_HERO } from "@/data/home-sections";

const kalla = (f: string) => readFileSync(f, "utf8");

describe("paket 52: startsidan", () => {
  it("S3: serverns H1 och React-H1 är samma, 'Ett tak du kan lita på.'", () => {
    expect(prerenderContent("/")!.h1).toBe("Ett tak du kan lita på.");
    const h = kalla("src/components/Hero.tsx");
    expect(h).toMatch(/Ett tak du kan lita på\.\r?\n/);
    expect(h).not.toContain("i decennier framöver");
  });
  it("1.1: ingressen har Marknadschefens lydelse (takfirma med bas, Roslagen och Storstockholm, utan plåtarbeten, taktvätt och hela)", () => {
    const i = prerenderContent("/")!.intro;
    expect(i).toBe("RoslagsTak är en takfirma med bas i Norrtälje och takläggare i Roslagen och Storstockholm. Vi utför takbyte, takomläggning, takrenovering, takreparation och hängrännor. Vi lämnar 10 års utförandegaranti på det arbete vi utför.");
  });
  it("1.2 och 1.3: Storstockholm-stycket och 'innehåller allt'-stycket", () => {
    const t = prerenderContent("/")!.paragraphs.map((p) => (typeof p === "string" ? p : "")).join("\n");
    expect(t).toContain("Vi tar uppdrag i Roslagen och Storstockholm, från Täby, Danderyd och Sollentuna i norr till Nacka, Huddinge och Södertälje i söder. Du får ett fast pris i offerten och en kontaktperson genom hela processen.");
    expect(t).toContain("Vad som ingår står i offerten. Ett komplett takbyte omfattar normalt nytt underlag, ny läkt, nytt ytmaterial och nya plåtdetaljer, och byggställning ingår. Du får en kontaktperson hela vägen, från takkontroll till färdigt tak.");
    for (const borta of ["Sedan 2026", "innehåller allt", "Samma fasta priser", "slutgenomgång", "hela Storstockholm"]) expect(t, borta).not.toContain(borta);
    expect(t).toContain("Vi svarar inom 24 timmar. Ring");
  });
  it("2.1: områdestexterna utan utförda jobb på orter där vi inte har gjort några, utan Finnhamn och utan 'hela'", () => {
    const t = HOME_AREA_SEO_PARAGRAPHS.join("\n") + homeAreaIntroText(7);
    for (const borta of ["takbyte på Blidö", "takrenovering på Ljusterö", "plåttak på Yxlan", "bandtäckning i Danderyd", "plåttak i Bromma", "alla typer av takarbeten", "Finnhamn", "hela Storstockholm", "plåtarbeten", "ö utan bro", "återkopplar"]) expect(t, borta).not.toContain(borta);
    expect(HOME_AREA_SEO_PARAGRAPHS[0]).toBe("Behöver du en **takläggare i Roslagen** eller [takläggare i Stockholm](/taklaggare-stockholm)? Vi är en takfirma med bas i Norrtälje och tar uppdrag i Roslagen och Storstockholm. Vi har gjort kompletta takbyten på Blidö, på Singö och i Grisslehamn.");
    expect(homeAreaIntroText(7)).toBe("Vi utför takbyte, takomläggning och takrenovering och tar uppdrag i 7 områden i Roslagen och Storstockholm. Vi tar också uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö.");
  });
  it("2.3: hero-texten, om-oss-texten och sektionstexten", () => {
    expect(HOME_HERO.text).toContain("för villor och bostadsrättsföreningar i Roslagen och Storstockholm.");
    expect(HOME_HERO.text).not.toMatch(/företag|hela Roslagen/);
    expect(HOME_ABOUT_P1).toContain("Vi arbetar enligt AMA, och du får ett fast pris i offerten.");
    expect(HOME_ABOUT_P1).not.toMatch(/alltid|plåtarbeten/);
    expect(kalla("src/data/home-sections.ts")).not.toContain("svenskt klimat");
    expect(kalla("src/components/Hero.tsx")).toContain("och Storstockholm —");
    expect(HOME_HERO.chips).toContain("Svar inom 24 timmar");
    expect(HOME_HERO.chips.join("|")).not.toMatch(/24 ?h\b/);
  });
  it("Li3, Li4, Bi5: 'Var finns vi', 'Kunskap om tak' och bildtexten 'Takbyte på Blidö'", () => {
    expect(HOME_AREA_INTRO.eyebrow).toBe("Var finns vi");
    expect(HOME_GUIDES.headingA).toBe("Kunskap om tak");
    expect(HOME_GUIDES.headingB).toBe("");
    expect(HOME_ABOUT_CAPTION.text).toBe("Takbyte på Blidö");
  });
});
