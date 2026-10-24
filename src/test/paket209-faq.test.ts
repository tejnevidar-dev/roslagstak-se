/**
 * Gren 209 (Innehålls `tjanstesidor-2026-10-24.md`, grindsvar 361): FAQ på de nationella sidorna /tjanster/takomlaggning (3 frågor), /material/tp20-plattak (1) och /material/betongpannor (1), med den befintliga FAQ-komponenten
 * (ExtraFaq) och FAQPage-schema. Frågan om att måla plåttak är struken (V1). Prisfrågan har ROT-förbehållet intill beloppen (R2), och beloppen kommer ur prices.ts.
 */
import { describe, expect, it } from "vitest";
import { SERVICE_EXTRAS, MATERIAL_EXTRAS } from "../data/page-extras";
import { ROT_FORBEHALL, beloppLopande } from "../data/prices";
import { prerenderContent } from "../../scripts/prerender-content";

const tjanst = SERVICE_EXTRAS.takomlaggning;
const tp20 = MATERIAL_EXTRAS["tp20-plattak"];
const betong = MATERIAL_EXTRAS.betongpannor;

describe("gren 209: FAQ på nationella tjänste- och materialsidor", () => {
  it("/tjanster/takomlaggning har tre frågor", () => {
    expect(tjanst.faqs.map((f) => f.question)).toEqual([
      "Vad är skillnaden mellan takomläggning och takbyte?",
      "Vad kostar en takomläggning?",
      "Kan jag få ROT-avdrag för takomläggning?",
    ]);
  });
  it("prisfrågan har beloppen ur prices.ts och ROT-förbehållet (R2) intill", () => {
    const svar = tjanst.faqs[1].answer;
    expect(svar).toContain(beloppLopande("TP20 plåttak"));
    expect(svar).toContain(beloppLopande("Lertegeltak"));
    expect(svar).toContain(beloppLopande("Dubbelfalsat plåttak"));
    expect(svar).toContain(ROT_FORBEHALL);
    expect(svar).toContain("Fast pris efter kostnadsfri takkontroll.");
  });
  it("ROT-svaret är R1 utan belopp i kronor och skillnadssvaret länkar till guiden", () => {
    expect(tjanst.faqs[2].answer).toBe("Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden. ROT-avdraget dras på fakturan. Läs mer om [ROT-avdrag](/rot-avdrag).");
    expect(tjanst.faqs[0].answer).toContain("(/blogg/lagga-om-tak-vad-kostar-det)");
    expect(tjanst.faqs[0].answer).toContain("används gärna");
    expect(tjanst.faqs[0].answer).not.toMatch(/\bofta\b/);
  });
  it("/material/tp20-plattak och /material/betongpannor har sin nya fråga sist, och plåt målas inte", () => {
    expect(tp20.faqs[tp20.faqs.length - 1].question).toBe("Hur länge håller ett plåttak?");
    expect(tp20.faqs[tp20.faqs.length - 1].answer).toContain("(/blogg/hur-lange-haller-tak)");
    expect(betong.faqs[betong.faqs.length - 1].question).toBe("Gör mossa skada på betongpannor?");
    expect(betong.faqs[betong.faqs.length - 1].answer).toContain("(/blogg/ta-bort-mossa-fran-tak)");
    expect(JSON.stringify([tjanst, tp20, betong])).not.toMatch(/Går det att måla ett plåttak/);
  });
  for (const [url, fraga, lank] of [
    ["/tjanster/takomlaggning", "Vad kostar en takomläggning?", "/rot-avdrag"],
    ["/material/tp20-plattak", "Hur länge håller ett plåttak?", "/blogg/hur-lange-haller-tak"],
    ["/material/betongpannor", "Gör mossa skada på betongpannor?", "/blogg/ta-bort-mossa-fran-tak"],
  ] as const) {
    it(`${url}: frågan står i serverns HTML, FAQPage-schemat har den och länken ligger i länklistan`, () => {
      const p = prerenderContent(url)!;
      const text = JSON.stringify(p.paragraphs);
      expect(text, url).toContain(fraga);
      const ld = JSON.stringify(p.jsonLd);
      expect(ld, url).toContain('"FAQPage"');
      expect(ld, url).toContain(fraga);
      expect(ld, url).not.toMatch(/\]\(\//); // inga markdown-länkar i schematexten
      expect(p.links.map((l) => l.href), url).toContain(lank);
    });
  }
});
