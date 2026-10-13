/**
 * Paket 81 (Marknadschefens grindsvar 2026-10-13 10:57, innehall/leverans-2026-10-13.md Del 2 punkt 4 och Del 4 tillägg 2): de tre Norrtälje-tjänstesidorna
 * säger vilka vi är och hur man bokar i första stycket. Lydelserna är de godkända, flyttade upp; inget nytt löfte.
 */
import { describe, expect, it } from "vitest";
import { comboOverrides } from "@/data/combo-overrides";
import { withSuffix } from "@/lib/seo-fit";
import { prerenderContent } from "../../scripts/prerender-content";

const BOKA = "Boka på roslagstak.se/takkontroll eller ring 070-154 36 39.";
const innehall = (nyckel: string) => comboOverrides[nyckel].content;
const rubriker = (nyckel: string) => innehall(nyckel).filter((p) => p.startsWith("## ")).map((p) => p.slice(3));

describe("paket 81: första stycket på de tre Norrtälje-tjänstesidorna", () => {
  it("/takbyte-norrtalje: tre tak, bokningen och svarstiden i första stycket", () => {
    const f = innehall("takbyte-norrtalje")[0];
    expect(f).toContain("tre tak vi har bytt i kommunen. " + BOKA + " Vi svarar inom 24 timmar.");
    expect(f.startsWith("Ska du byta tak i Norrtälje? Vi har vår bas här.")).toBe(true);
    expect(rubriker("takbyte-norrtalje")[0]).toBe("Tre tak vi har bytt i Norrtälje kommun");
    expect(innehall("takbyte-norrtalje")[2]).toContain("I Grisslehamn fick ett tak på 120 kvadratmeter svarta betongpannor från Benders i september 2026.");
  });
  it("/takomlaggning-norrtalje: vilka vi är först, bokningen sist i första stycket, rubriken 'Boka takkontroll'", () => {
    const f = innehall("takomlaggning-norrtalje")[0];
    expect(f.startsWith("Vi är en takfirma med bas i Norrtälje och lägger om tak i staden och kommunen. Ett tak som läcker vid skorstenen")).toBe(true);
    expect(f.endsWith("Det börjar med en kostnadsfri takkontroll: boka på roslagstak.se/takkontroll eller ring 070-154 36 39.")).toBe(true);
    expect(f).not.toContain("Här beskriver vi vad en omläggning");
    const r = rubriker("takomlaggning-norrtalje");
    expect(r).toContain("Boka takkontroll");
    expect(r).not.toContain("Vi har vår bas i Norrtälje");
    const i = innehall("takomlaggning-norrtalje").indexOf("## Boka takkontroll");
    expect(innehall("takomlaggning-norrtalje")[i + 1]).toBe("Norrtälje ligger längst in i Norrtäljeviken, cirka sju mil nordost om Stockholm. Takkontrollen bokar du vardagar 07–20 eller helger 09–19.");
  });
  it("/takrenovering-norrtalje: vilka vi är och bokningen i första stycket, utan uppräkningen (den står direkt under i 'Takrenovering i korthet'); 'Takrenovering i korthet' kommer före 'Hus på halvöarna och öarna'", () => {
    const f = innehall("takrenovering-norrtalje")[0];
    expect(f).toBe(
      "Vi är en takfirma med bas i Norrtälje. Ibland är det bara en del av taket som behöver åtgärdas. Här förklarar vi vad en takrenovering innebär, var gränsen mot ett takbyte går och hur du får ett fast pris efter en kostnadsfri takkontroll. " + BOKA,
    );
    // uppräkningen står bara i avsnittet "Takrenovering i korthet" (Marknadschefens ändring 2026-10-13 16:35), inte i första stycket
    const uppr = "trasiga pannor, lösa eller rostiga plåtdetaljer, beslag kring skorsten och genomföringar, fotplåt eller hängrännor";
    const korthet = innehall("takrenovering-norrtalje")[innehall("takrenovering-norrtalje").indexOf("## Takrenovering i korthet") + 1];
    expect(korthet).toContain(uppr);
    expect(f).not.toContain("trasiga pannor");
    expect(innehall("takrenovering-norrtalje").join(" ").split(uppr).length - 1).toBe(1);
    const r = rubriker("takrenovering-norrtalje");
    expect(r.indexOf("Takrenovering i korthet")).toBeGreaterThanOrEqual(0);
    expect(r.indexOf("Takrenovering i korthet")).toBeLessThan(r.indexOf("Hus på halvöarna och öarna"));
    expect(r.indexOf("Hus på halvöarna och öarna")).toBeLessThan(r.indexOf("Plåttak av TP20"));
  });
  it("serverns HTML har samma första stycke som React-sidan (samma data) på alla tre sidor", () => {
    for (const [url, nyckel] of [["/takbyte-norrtalje", "takbyte-norrtalje"], ["/takomlaggning-norrtalje", "takomlaggning-norrtalje"], ["/takrenovering-norrtalje", "takrenovering-norrtalje"]] as const) {
      const sida = prerenderContent(url)!;
      const p = sida.paragraphs.map((x) => (typeof x === "string" ? x : ""));
      const forsta = innehall(nyckel)[0];
      expect(p[0], url).toBe(forsta);
      expect(p[0], url).toMatch(/takkontroll/);
      expect(p[0], url).toContain("070-154 36 39");
    }
  });
  it("ingen annan tjänst×ort-sida har fått ändrad text: första stycket börjar inte med 'Vi är en takfirma' på andra sidor än de två", () => {
    const fel = Object.entries(comboOverrides)
      .filter(([k, v]) => v.content[0]?.startsWith("Vi är en takfirma med bas i Norrtälje") && !["takomlaggning-norrtalje", "takrenovering-norrtalje"].includes(k))
      .map(([k]) => k);
    expect(fel).toEqual([]);
  });
});

describe("paket 81: titel och meta (Marknadschefens val 2026-10-13: förslag B)", () => {
  it("takomläggning och takrenovering har titel B; takomläggning har den nya metan; takrenovering behåller sin; takbyte rörs inte", () => {
    expect(comboOverrides["takomlaggning-norrtalje"].title).toBe("Takomläggning i Norrtälje – takfirma med bas här");
    expect(comboOverrides["takrenovering-norrtalje"].title).toBe("Takrenovering i Norrtälje – takfirma med bas här");
    expect(comboOverrides["takomlaggning-norrtalje"].description).toBe("Takomläggning i Norrtälje: vi är en takfirma med bas här. Kostnadsfri takkontroll utan förpliktelser, fast pris i offerten och svar inom 24 timmar.");
    expect(comboOverrides["takrenovering-norrtalje"].description).toBe("Takrenovering i Norrtälje: vi åtgärdar plåt, pannor och avvattning när hela taket inte behöver bytas. Kostnadsfri takkontroll och fast pris.");
    expect(comboOverrides["takbyte-norrtalje"].title).toBe("Takbyte i Norrtälje – fast pris och AMA");
    // titel + suffix " | RoslagsTak" ryms på 60 tecken
    for (const k of ["takomlaggning-norrtalje", "takrenovering-norrtalje"]) {
      expect(withSuffix(comboOverrides[k].title).length, k).toBeLessThanOrEqual(60);
      expect(comboOverrides[k].description.length, k).toBeLessThanOrEqual(160);
    }
  });
});
