/**
 * Paket 98, steg 5: de tio gamla problemsidornas intro (kortet på /takproblem och ingressen på problemsidan) är Innehålls korttexter ordagrant,
 * ur innehall/takproblem-kort-2026-10-15.md. De generella påståendena (hur vanligt, hur lätt, "ofta") är borta.
 */
import { describe, expect, it } from "vitest";
import { problems } from "../data/problems";
import { prerenderContent } from "../../scripts/prerender-content";

const NYA: Record<string, string> = {
  "lackage-vid-skorsten": "Fuktfläckar eller droppmärken nära skorstenen kan komma från beslaget runt skorstenen, fogen mellan beslag och murverk, murverket eller pannorna närmast skorstenen.",
  "trasiga-takpannor": "Pannor som ligger snett, har glidit ner, har spruckit eller saknas kan släppa in vatten. Senare kan fukt synas på vinden.",
  "mossa-pa-taket": "Mossa, lav och alger växer där taket ligger i skugga och torkar långsamt, till exempel på norrsidan och under träd.",
  "rostig-plat": "Rostfläckar eller flagnande färg på plåttak, fotplåt, vindskiveplåt, ränndalar eller skorstensbeslag kan komma av en skadad eller sliten ytbehandling, repor eller stående vatten.",
  "fukt-pa-vinden": "Fukt eller mögel på vinden kan komma från ett läckage genom yttertaket eller från kondens, när varm fuktig inomhusluft når den kalla vinden.",
  "igensatta-hangrannor": "När hängrännorna är igensatta rinner vattnet över kanten när det regnar, och på vintern kan det bli istappar längs takfoten.",
  "rutten-raspont": "Rutten råspont syns som mörka, mjuka eller svampangripna brädor på vinden. Den kommer av fukt över lång tid.",
  "kondens-pa-vinden": "Kondens på vinden syns som droppar, rimfrost eller fukt på undersidan av yttertaket, spridd över stora ytor och utan en tydlig läckpunkt.",
  "dalig-underlagspapp": "En underlagspapp som har slutat skydda kan ge läckage som inte går att härleda till en enskild trasig panna, och fuktfläckar på flera ställen på vinden.",
  "istappar-pa-taket": "Stora istappar och isvallar vid takfoten kan bero på värme från bostaden som smälter snön, igensatta hängrännor eller otillräcklig ventilation.",
};

describe("paket 98 steg 5: tio korttexter på /takproblem", () => {
  it("varje intro är Innehålls text ordagrant", () => {
    for (const [slug, text] of Object.entries(NYA)) {
      const p = problems.find((x) => x.slug === slug);
      expect(p, slug).toBeDefined();
      expect(p!.intro, slug).toBe(text);
    }
  });
  it("de generella påståendena är borta", () => {
    const alla = Object.keys(NYA).map((s) => problems.find((x) => x.slug === s)!.intro).join("\n");
    for (const ord of ["vanligaste", "oftast", "ofta ", "snabbt", "enkelt", "reservskydd", "bärande underlag", "litet problem"]) expect(alla).not.toContain(ord);
  });
  it("serverns HTML för /takproblem och problemsidorna har samma texter", () => {
    const lista = prerenderContent("/takproblem")!.paragraphs.map((x) => (typeof x === "string" ? x : "")).join("\n");
    for (const [slug, text] of Object.entries(NYA)) {
      expect(lista, slug).toContain(text);
      const sida = prerenderContent(`/takproblem/${slug}`)!;
      expect(sida.intro, slug).toBe(text);
    }
  });
  it("de nyare problemsidorna (med brief) är orörda: deras intro finns kvar", () => {
    const ororda = problems.filter((p) => !(p.slug in NYA));
    expect(ororda.length).toBeGreaterThanOrEqual(17);
    for (const p of ororda) expect(p.intro.length).toBeGreaterThan(20);
  });
});
