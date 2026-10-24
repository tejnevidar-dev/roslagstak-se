/**
 * Gren 207 (Innehålls `ofta2-rattning-2026-10-24.md`, grindsvar 355): generaliseringar med "ofta" bytta till "kan", "till exempel" eller "ibland", och två namn borttagna (Per Albin-radhusen, S/S Ingrid Horn).
 * 56 rader i guider, problemtexter, materialtexter, tjänstetexter, ortstexter och regiontexter. Provet kräver att den ändrade delen av varje Före-rad är borta ur datafilerna och att Efter-delen står där (som skriven eller JSON-kodad).
 */
import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const dir = resolve(__dirname, "../data");
const alla = (d: string): string => readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? [alla(resolve(d, e.name))] : e.name.endsWith(".ts") ? [readFileSync(resolve(d, e.name), "utf8")] : [])).join("\n");
const kod = alla(dir).replace(/\r/g, "");
const jsonKod = (t: string) => JSON.stringify(t).slice(1, -1);
const finns = (t: string) => kod.includes(t) || kod.includes(jsonKod(t));

/** [rubrik, ändrad del av Före, ändrad del av Efter] */
const RADER: [string, string, string][] = [
 [
  "## 1. /blogg/ventilation-takfot-viktigt",
  "id takfoten hänger ofta ihop med v",
  "id takfoten kan hänga ihop med v"
 ],
 [
  "## 2. /blogg/hur-lange-haller-tak",
  " tidigt kan ofta åtgärdas på ",
  " tidigt kan åtgärdas på "
 ],
 [
  "## 3. /blogg/takventilation-luftspalt-nockventil",
  "akfoten. De hänger ofta ihop med v",
  "akfoten. De kan hänga ihop med v"
 ],
 [
  "## 4. /blogg/korrugerad-plat-falsad-plat",
  "den används ofta om varandr",
  "den används gärna om varandr"
 ],
 [
  "## 4. /blogg/korrugerad-plat-falsad-plat",
  "?** Ja. Det väljs ofta för utseend",
  "?** Ja. Det kan väljas för utseend"
 ],
 [
  "## 5. /blogg/platttak-ljud-regn-skargardshus",
  ". Under den finns ofta flera lager",
  ". Under den kan det finnas flera lager"
 ],
 [
  "## 6. /blogg/takbyte-vaxholm-skargarden",
  "truntbostad ofta har byggts om o",
  "truntbostad kan ha byggts om o"
 ],
 [
  "## 7. /blogg/takrenovering-stockholm-guide",
  "ldre villor är takets form, material och kulör ofta en del av ",
  "ldre villor kan takets form, material och kulör vara en del av "
 ],
 [
  "## 8. /blogg/byta-till-plattak-forandra-look",
  "äldre villa är takets material ofta en del av ",
  "äldre villa kan takets material vara en del av "
 ],
 [
  "## 9. /blogg/skiffertak-hallbarhet-pris",
  " skiffertak är alltså ofta ett äldre ",
  " skiffertak kan alltså vara ett äldre "
 ],
 [
  "## 10. /blogg/tp20-eller-dubbelfalsat-platttak",
  "uthus, och ofta på lägre ta",
  "uthus, och också på lägre ta"
 ],
 [
  "## 11. /blogg/lagga-om-tak-vad-kostar-det",
  "et\" används ofta om vartann",
  "et\" används gärna om vartann"
 ],
 [
  "## 11. /blogg/lagga-om-tak-vad-kostar-det",
  "det används ofta när samma ",
  "det används gärna när samma "
 ],
 [
  "## 12. /blogg/tecken-byta-tak",
  "lig orsak** går ofta att laga.",
  "lig orsak** kan gå att laga."
 ],
 [
  "## 13. /blogg/takbyte-skargarden-logistik",
  " fritidshus står ofta tomt långa ",
  " fritidshus kan stå tomt långa "
 ],
 [
  "## 14. /blogg/taket-lacker-vad-gor-jag-nu",
  "t.** Vatten rinner ofta en bra bit",
  "t.** Vatten kan rinna en bra bit"
 ],
 [
  "## 14. /blogg/taket-lacker-vad-gor-jag-nu",
  "pannor, kan ofta lagas för si",
  "pannor, kan lagas för si"
 ],
 [
  "## 15. /blogg/skota-taket-betongpannor-tegel-plat",
  "re tegeltak är nockpannorna ofta satta i br",
  "re tegeltak kan nockpannorna vara satta i br"
 ],
 [
  "## 16. /blogg/hangrannor-stupror-skargard",
  "er lossnat, ofta av snö och ",
  "er lossnat, till exempel av snö och "
 ],
 [
  "## 16. /blogg/hangrannor-stupror-skargard",
  "t ränna kan ofta bytas för si",
  "t ränna kan bytas för si"
 ],
 [
  "## 17. /blogg/eternittak-asbest-sanering",
  "n 1982, men finns ofta kvar i äldr",
  "n 1982, men kan finnas kvar i äldr"
 ],
 [
  "## 18. /blogg/takrenovering-sommarstuga-roslagen",
  "struktionen är ofta lättare.**",
  "struktionen kan vara lättare.**"
 ],
 [
  "## 19. /blogg/takpapp-byte-livslangd",
  " släppt kan ofta lagas för si",
  " släppt kan lagas för si"
 ],
 [
  "## 19. /blogg/takpapp-byte-livslangd",
  "erlagstak), ofta råspont med",
  "erlagstak), till exempel råspont med"
 ],
 [
  "## 19. /blogg/takpapp-byte-livslangd",
  "a skada kan ofta lagas. Papp som h",
  "a skada kan gå att laga. Papp som h"
 ],
 [
  "## 20. (se briefen)",
  " Underlaget är ofta råspont me",
  " Underlaget kan vara råspont me"
 ],
 [
  "## 20. (se briefen)",
  "Underlag (ofta råspont med",
  "Underlag (till exempel råspont med"
 ],
 [
  "## 21. (se briefen)",
  "vänds också ofta när ett befi",
  "vänds också när ett befi"
 ],
 [
  "## 22. /material/papptak",
  "p. Ytpappen har ofta ett skikt ",
  "p. Ytpappen kan ha ett skikt "
 ],
 [
  "## 23. /material/underlagstak",
  " och skador upptäcks ofta sent, först",
  " och skador kan upptäckas sent, först"
 ],
 [
  "## 23. /material/underlagstak",
  "kit, vilket ofta märks som läckag",
  "kit, vilket kan märkas som läckag"
 ],
 [
  "## 23. /material/underlagstak",
  "måste bytas syns ofta först när t",
  "måste bytas kan visa sig först när t"
 ],
 [
  "## 24. /takproblem/lackande-plattak",
  "ertaket som ofta följer en rak linj",
  "ertaket som kan följa en rak linj"
 ],
 [
  "## 24. /takproblem/lackande-plattak",
  "ptak ligger ofta på flacka ta",
  "ptak ligger på flacka ta"
 ],
 [
  "## 24. /takproblem/lackande-plattak",
  "na. Inomhus visar det sig som fuktfläckar i innertaket, ofta en bit från",
  "na. Inomhus kan det visa sig som fuktfläckar i innertaket, en bit från"
 ],
 [
  "## 24. /takproblem/lackande-plattak",
  "d. Slitaget går ofta fortare på ",
  "d. Slitaget kan gå fortare på "
 ],
 [
  "## 25. /takproblem/lackande-hangrannor",
  "et, och det görs ofta i samband m",
  "et, och det kan göras i samband m"
 ],
 [
  "## 25. /takproblem/lackande-hangrannor",
  "n. Läckaget märks ofta vid slagreg",
  "n. Läckaget kan märkas vid slagreg"
 ],
 [
  "## 25. /takproblem/lackande-hangrannor",
  "sfärgningen är ofta tydligast ",
  "sfärgningen kan vara tydligast "
 ],
 [
  "## 25. /takproblem/lackande-hangrannor",
  "      \"Ofta behövs ingenting annat än att taket h",
  "      \"Det kan räcka med att taket h"
 ],
 [
  "## 26. /takproblem/fuktflack-i-innertaket",
  " innertaket är ofta det första",
  " innertaket kan vara det första"
 ],
 [
  "## 26. /takproblem/fuktflack-i-innertaket",
  "innertaket, ofta med en mörkare kant. Färg som bubblar eller flagnar, tapet som släpper uppe vid taket, eller en taklist som har missfärgats. Fläcken kan växa efter regn eller när snö smälter och blekna däremellan. Ibland känns ytan fuktig eller mjuk, och i värsta fall droppar det. En unken lukt i rummet eller på vinden ovanför hör ofta ihop med f",
  "innertaket, ibland med en mörkare kant. Färg som bubblar eller flagnar, tapet som släpper uppe vid taket, eller en taklist som har missfärgats. Fläcken kan växa efter regn eller när snö smälter och blekna däremellan. Ibland känns ytan fuktig eller mjuk, och i värsta fall droppar det. En unken lukt i rummet eller på vinden ovanför kan höra ihop med f"
 ],
 [
  "## 26. /takproblem/fuktflack-i-innertaket",
  "ra läckage, är ett takbyte ofta bättre än ",
  "ra läckage, kan ett takbyte vara bättre än "
 ],
 [
  "## 27. /takproblem/is-i-ranndalen",
  " ränndalen, ofta längst ner ",
  " ränndalen, ibland längst ner "
 ],
 [
  "## 27. /takproblem/is-i-ranndalen",
  "takfall och har ofta mer snö än",
  "takfall och kan ha mer snö än"
 ],
 [
  "## 28. /takproblem/lackande-ranndal",
  "t. Läckaget märks ofta mest vid kr",
  "t. Läckaget kan märkas mest vid kr"
 ],
 [
  "## 28. /takproblem/lackande-ranndal",
  "kit, och då ofta även nytt u",
  "kit, och då ibland även nytt u"
 ],
 [
  "## 28. /takproblem/lackande-ranndal",
  "ndalen. Den ligger ofta högt och i",
  "ndalen. Den kan ligga högt och i"
 ],
 [
  "## 29. /takproblem/ruttna-vindskivor-och-takfot",
  "rjar ruttna är det ofta ett tecken",
  "rjar ruttna kan det vara ett tecken"
 ],
 [
  "## 30. /takproblem/svackor-i-taket",
  " i takytan, ofta tydligast i",
  " i takytan, som kan synas tydligast i"
 ],
 [
  "## 30. /takproblem/svackor-i-taket",
  "kten bytas, ofta i samband m",
  "kten bytas, till exempel i samband m"
 ],
 [
  "## 31. /takproblem/yrsno-pa-vinden",
  "indsgolvet, ofta i en sträng",
  "indsgolvet, till exempel i en sträng"
 ],
 [
  "## 31. /takproblem/yrsno-pa-vinden",
  "hårt oväder kräver ofta ingen annan åtgärd än att snön tas bort. Kommer snön in genom en öppning rättas den till: pannor läggs tillbaka eller byts, nockpannor fästs, och en otät genomföring eller anslutning görs om. Är underlaget skadat på en begränsad yta kan det lagas där. Är underlaget dåligt på stora delar av taket är ett takbyte ofta bättre än ",
  "hårt oväder behöver inte kräva någon annan åtgärd än att snön tas bort. Kommer snön in genom en öppning rättas den till: pannor läggs tillbaka eller byts, nockpannor fästs, och en otät genomföring eller anslutning görs om. Är underlaget skadat på en begränsad yta kan det lagas där. Är underlaget dåligt på stora delar av taket kan ett takbyte vara bättre än "
 ],
 [
  "## 32. /omraden/sydostra-stockholm",
  "Jägaren och S/S Ingrid Horn. Nynäsbanan",
  "Jägaren och ett ångfartyg. Nynäsbanan"
 ],
 [
  "## 33. /taklaggare-alsten",
  " 1932–1933. De kallas Per Albin-radhusen. Enligt Wikip",
  " 1932–1933. Enligt Wikip"
 ],
 [
  "## 34. /taklaggare-hoglandet",
  "villor (ofta två fulla v",
  "villor (bland dem hus i två fulla v"
 ]
];

describe("gren 207: ofta och namn", () => {
  it("56 rader", () => expect(RADER.length).toBe(56));
  RADER.forEach(([rubrik, fore, efter], i) => {
    it(`rad ${i + 1} (${rubrik}): Efter står i datan, Före är borta`, () => {
      if (efter.length > 0) expect(finns(efter), "Efter: " + efter).toBe(true);
      expect(finns(fore) && fore !== efter, "Före kvar: " + fore).toBe(false);
    });
  });
  it("inga namnen kvar: Per Albin-radhusen och S/S Ingrid Horn", () => {
    expect(kod).not.toContain("Per Albin-radhusen");
    expect(kod).not.toContain("S/S Ingrid Horn");
  });
});
