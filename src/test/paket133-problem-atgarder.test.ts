/**
 * Paket 133 (Marknadschefens grind 2026-10-20, tre beslut): längre "Vanliga åtgärder" på de tio tunnaste problemsidorna, ordagrant ur innehall/problemsidor-atgarder-2026-10-20.md.
 * Beslut: meningen om råsponten står bara på rutten-raspont (struken på dalig-underlagspapp), Blidö och Singö står kvar där, "och då säger vi det" är struket på fukt-pa-vinden.
 */
import { describe, expect, it } from "vitest";
import { problems } from "../data/problems";
import { prerenderContent } from "../../scripts/prerender-content";

const TILLAGG: Record<string, string> = {
  "rostig-plat": "Det är ytbeläggningen som skyddar stålet, så skador i den bör åtgärdas innan rost får fäste.",
  "mossa-pa-taket": "Är pannorna porösa och underlaget slitet kan en takomläggning vara det som löser grundproblemet.",
  "igensatta-hangrannor": "En ränndal som är full av löv och barr rensas, helst före vintern.",
  "istappar-pa-taket": "och det är inte ett takarbete.",
  "kondens-pa-vinden": "Ventilationen vid takfot och nock ska inte täppas igen, eftersom vinden då får problem med fukt.",
  "trasiga-takpannor": "Har läkten gett efter och skadan är avgränsad kan pannorna lyftas, läkten bytas på den delen och pannorna läggas tillbaka.",
  "rutten-raspont": "På Blidö i Norrtälje behölls den befintliga råsponten, och på Singö byttes delar av den.",
  "lackage-vid-skorsten": "Vid ett takbyte görs alla anslutningar om.",
  "dalig-underlagspapp": "Hela och friska pannor kan ibland återanvändas, annars läggs nya.",
  "fukt-pa-vinden": "Är orsaken kondens eller en ledning inne i huset är det inte ett takarbete.",
};

describe("paket 133: åtgärdstexterna på tio problemsidor", () => {
  it("varje sida har sitt tillägg efter den befintliga texten, i React-data och serverns HTML", () => {
    for (const [slug, mening] of Object.entries(TILLAGG)) {
      const p = problems.find((x) => x.slug === slug)!;
      expect(p, slug).toBeTruthy();
      expect(p.atgarder, slug).toContain(mening);
      const c = prerenderContent(`/takproblem/${slug}`)!;
      expect([c.intro, ...c.paragraphs].join(" "), slug).toContain(mening);
    }
  });
  it("råsponten bedöms-meningen står bara på rutten-raspont, och 'och då säger vi det' är struken på fukt-pa-vinden", () => {
    const rasp = "Råsponten bedöms när taket är öppet";
    expect(problems.filter((p) => p.atgarder.includes(rasp)).map((p) => p.slug)).toEqual(["rutten-raspont"]);
    expect(problems.find((p) => p.slug === "dalig-underlagspapp")!.atgarder).not.toContain("råspont");
    expect(problems.find((p) => p.slug === "fukt-pa-vinden")!.atgarder).not.toContain("och då säger vi det");
  });
  it("inga nya 'ofta'-led i tilläggen och inga priser", () => {
    for (const m of Object.values(TILLAGG)) expect(m).not.toMatch(/\bofta\b|\bkr\b|\bkronor\b/i);
  });
  it("taktvätt rörs inte (ingen text i problems.ts för taktvätt)", () => {
    expect(problems.some((p) => /taktv/i.test(p.slug))).toBe(false);
  });
});
