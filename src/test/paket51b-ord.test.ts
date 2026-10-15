/**
 * Paket 51b (Marknadschefen 2026-10-11): Co4–Co8 och "bo kvar" i combo-overrides.ts, takproblemsidorna (Pr1, Pr3), guiderna (G1–G9, So1, So2),
 * bildtexterna Bi1 och Bi4 och tjänsteingressen 1.7. Ett test per struken eller ny lydelse.
 */
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { blogPosts } from "@/data/blog-posts";
import { problems } from "@/data/problems";
import { processFaqs } from "@/data/process-faqs";
import { SERVICE_COPY } from "@/data/service-page";

const kalla = (f: string) => readFileSync(f, "utf8");
const guide = (slug: string) => blogPosts.find((p) => p.slug === slug)!.content.join("\n");
const combo = kalla("src/data/combo-overrides.ts");

describe("paket 51b: de egna tjänst × ort-texterna", () => {
  it("Co4: 'i regel' om huset är borta ur Huddinge och Nacka", () => {
    expect(combo).not.toContain("har i regel byggts om och till");
    expect(combo.split("har ofta byggts om och till, och då finns det takdelar av olika ålder på samma hus").length - 1).toBe(2);
  });

  it("Co5: frågan om att bo kvar står kvar, svaret lovar inte 'i de allra flesta fall'", () => {
    expect(combo).not.toContain("I de allra flesta fall");
    expect(combo.split("**Kan vi bo kvar medan taket byts?** Hur arbetet läggs upp går vi igenom innan start, och du har en kontaktperson genom hela processen.").length - 1).toBe(2);
  });

  it("Co6: 'mest känt för sina industrier' är borta, Wikipedia-uppgiften står kvar", () => {
    expect(combo).not.toContain("mest känt för sina industrier");
    expect(combo).toContain("Enligt Wikipedia bodde över 22 000 personer i småhus i Södertälje tätort 2020.");
  });

  it("Co7: Åkersberga namnger källan", () => {
    expect(combo).not.toContain("enligt ortens historia bebyggdes");
    expect(combo).toContain("och enligt Wikipedia bebyggdes de områdena med villor");
  });

  it("Co8: rapporten lovas inte mer än 'en rapport om takets skick' (fem ställen här)", () => {
    for (const borta of [
      "står vad som bör åtgärdas och vad som kan bevakas",
      "säger rapporten det",
      "där framgår vad som bör åtgärdas",
      "framgår av rapporten efter takkontrollen",
      "Vilket som gäller står i rapporten efter takkontrollen, och offerten",
    ]) expect(combo, borta).not.toContain(borta);
    for (const ny of [
      "Det beror på takets skick. Det går vi igenom vid takkontrollen.",
      "Räcker en renovering inte går vi igenom det vid takkontrollen.",
      "Efter takkontrollen får du en rapport om takets skick.\"",
      "Hur mycket som behöver göras på ditt tak går vi igenom vid takkontrollen.",
      "Vilket som gäller går vi igenom vid takkontrollen, och offerten har fast pris.",
    ]) expect(combo, ny).toContain(ny);
  });

  it("Co8: taktvättssidorna (nionde och tionde stället) säger det inte heller", () => {
    for (const f of ["src/data/taktvatt-text.ts", "src/data/service-blocks.ts"]) {
      expect(kalla(f), f).not.toContain("står det i rapporten");
      expect(kalla(f), f).toContain("Behöver taket något annat än en tvätt går vi igenom det vid takkontrollen, och du bestämmer själv hur du vill gå vidare.");
    }
  });
});

describe("paket 51b: takproblemsidorna", () => {
  const alla = JSON.stringify(problems);
  it("Pr1: 'saltluft i kustnära lägen' är borta ur orsakerna till rost", () => {
    expect(alla).not.toContain("saltluft");
    expect(alla).toContain("stående vatten, felaktiga material i kontakt med varandra");
  });

  it("Pr3: alla fjorton sidor som har en avslutning använder K3:s lydelse, ingen 'Efter bedömningen'", () => {
    expect(alla).not.toContain("Efter bedömningen");
    const k3 = "Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris.";
    expect(alla.split(k3).length - 1).toBe(27); // 14 från 51b (Pr3), 10 från paket 54 (Pr2) och 3 från paket 101 (takfönster, svackor och vindskivor fick K3 i "Så undersöks det")
  });
});

describe("paket 51b: guiderna", () => {
  it("G1: 'exklusivt intryck' blir 'stramt intryck'", () => {
    const t = guide("tp20-eller-dubbelfalsat-platttak");
    expect(t).not.toContain("exklusivt");
    expect(t).toContain("ger ett klassiskt, stramt intryck som passar");
  });

  it("G2, G5, G6 (Co8): rapporten lovar inget mer än K3", () => {
    expect(guide("taket-lacker-vad-gor-jag-nu")).toContain("Det går vi igenom vid takkontrollen. Vi går igenom skillnaden");
    expect(guide("takrenovering-sommarstuga-roslagen")).toContain("Det går vi igenom vid takkontrollen. Skillnaden mellan de tre");
    const g6 = guide("takbyte-sasong-vinter-sommar");
    expect(g6).toContain("**Kan jag vänta ett år till?** Det beror på takets skick, och det går vi igenom vid takkontrollen.");
    expect(g6).not.toContain("vad som kan bevakas");
  });

  it("G3: frågan om att bo kvar, utan 'i de allra flesta fall'", () => {
    const t = guide("forbered-takbyte-checklista");
    expect(t).not.toContain("i de allra flesta fall");
    expect(t).toContain("**Kan vi bo kvar under arbetet?** Hur arbetet läggs upp går vi igenom innan start.");
  });

  it("G4: 'vi börjar alltid' är borta", () => {
    const t = guide("taklaggare-norrtalje-guide");
    expect(t).not.toContain("vi börjar alltid");
    expect(t).toContain("**Vårt svar:** vi börjar med en kostnadsfri takkontroll utan förpliktelser.");
  });

  it("G7: 'i regel' om taket och huset blir 'oftast' och 'ofta'", () => {
    expect(guide("takpapp-byte-hur-ofta")).toContain("byts oftast inte för sig");
    expect(guide("takpapp-byte-hur-ofta")).not.toContain("byts i regel");
    expect(guide("platttak-ljud-regn-skargardshus")).toContain("Under den finns ofta flera lager:");
  });

  it("G8: 'vad vi gör i Stockholm' blir 'tak i Stockholm'", () => {
    const t = guide("takrenovering-stockholm-guide");
    expect(t).not.toContain("vad vi gör i Stockholm");
    expect(t).toContain("Mer om tak i Stockholm finns på sidan [takläggare i Stockholm](/taklaggare-stockholm).");
  });

  it("G9: bandtäckningsguiden lovar inte att ljudet dämpas, och länkar till ljudguiden", () => {
    const t = guide("bandtackning-tak-guide");
    expect(t).not.toContain("Med rätt uppbyggnad dämpas ljudet");
    expect(t).toContain("Det beror på vad som ligger under plåten och på huset. Det gäller alla plåttak, inte bara bandtäckta. Läs [låter plåttak när det regnar?](/blogg/platttak-ljud-regn-skargardshus)");
    expect(t).toContain("kan det höras mer när det regnar, beroende på vad som finns under plåten.");
    expect(t).not.toContain("om uppbyggnaden under plåten inte är rätt");
  });

  it("So1 och So2: solcellsguiden nämner inte garantier, och falsklämmorna står utan 'i regel'", () => {
    const t = guide("solceller-platttak-roslagen");
    expect(t).not.toMatch(/garanti/i);
    expect(t).toContain("på dubbelfalsat plåttak kan fästena klämmas runt falsen. På TP20 och pannplåt skruvas fästena genom plåten. Fråga tillverkaren och installatören hur monteringen påverkar taket.");
    expect(t).not.toContain("i regel");
  });
});

describe("paket 51b: /hur-det-gar-till, bildtexter och tjänsteingress", () => {
  it("Sm1: frågan om att bo kvar står kvar, svaret utan 'i de allra flesta fall'", () => {
    const f = processFaqs.find((x) => x.question === "Kan jag bo kvar under takbytet?")!;
    expect(f.answer).toBe("Hur arbetet läggs upp går vi igenom innan start, och du har en kontaktperson genom hela processen.");
  });

  it("Bi1: Singö-bilden på takomläggning har bildtexten 'Takbyte på Singö'", () => {
    expect(SERVICE_COPY.craftCaption("Takomläggning", "takomlaggning")).toBe("Takbyte på Singö");
    expect(SERVICE_COPY.craftCaption("Takrenovering", "takrenovering")).toBe("Takrenovering");
  });

  it("Bi4: etiketten 'Foto' över bilderna på tjänstesidorna blir 'Bild'", () => {
    expect(SERVICE_COPY.photoLabel).toBe("Bild");
  });

  it("1.7: mallen serviceIntro säger Roslagen och Storstockholm utan \"hela\" (mallen används av ingen sida i dag, så ingen sida ändras)", () => {
    const s = kalla("scripts/prerender-content.ts");
    expect(s).not.toContain("utför ${title.toLowerCase()} i hela Roslagen");
    expect(s).toContain("och tar uppdrag i Roslagen och Storstockholm. Vi arbetar enligt AMA och lämnar 10 års utförandegaranti på det arbete vi utför.");
  });
});
