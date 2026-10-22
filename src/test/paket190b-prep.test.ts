/**
 * Gren 190b (Marknadschefens tillägg 2026-10-22 04:44): alla genererade etiketter tar prepositionen från ort-prep.ts. Ingen genererad text (rubrik, titel, brödsmula, schema, länketikett, stycke)
 * får ha "i" framför en ort som heter "på" (Värmdö, Södermalm, Väddö, Svartnö och öarna). Undantag: "på <ort> i <kommun>" ("på Ingarö i Värmdö") där kommunen står kvar.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { locations } from "../data/locations";
import { ortPrep, ortPrepNamn } from "../data/ort-prep";
import { prerenderContent } from "../../scripts/prerender-content";

const sitemap = readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8");
const sidor = [...sitemap.matchAll(/<loc>https:\/\/roslagstak\.se([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
const paOrter = locations.filter((l) => ortPrep(l) === "på").map((l) => l.name);

const text = (p: string) => {
  const c = prerenderContent(p);
  if (!c) return "";
  const lankar = (c.links ?? []).map((l) => l.label);
  return [c.h1, c.title, c.description, c.intro, ...c.paragraphs.map((x) => (typeof x === "string" ? x : JSON.stringify(x))), JSON.stringify(c.jsonLd ?? []), JSON.stringify(c.breadcrumbs ?? []), ...lankar].join("\n");
};

describe("gren 190b: prepositionen kommer från ort-prep", () => {
  it("ortPrepNamn ger 'på' för Värmdö, Södermalm, Väddö och Svartnö och 'i' för Täby och okända namn", () => {
    for (const n of ["Värmdö", "Södermalm", "Väddö", "Svartnö"]) expect(ortPrepNamn(n), n).toBe("på");
    expect(ortPrepNamn("Täby")).toBe("i");
    expect(ortPrepNamn("Okänd plats")).toBe("i");
  });
  it("ingen genererad text på en sida i sajtkartan har 'i' framför en på-ort", () => {
    const fel: string[] = [];
    for (const p of sidor) {
      const t = text(p);
      for (const namn of paOrter) {
        // "i <ort>" som platsangivelse: följt av skiljetecken, radslut, " och ", tankstreck eller en versal. Inte "i Värmdö kommun", "i Blidö socken", "i Ekerö sommarstad" (längre namn) eller "i Väddöviken".
        for (const m of t.matchAll(new RegExp(String.raw`(?<![\p{L}\p{N}])i ${namn}(?=[,.:;?!)"'—–&|]|$| och | [A-ZÅÄÖ—–&|(])`, "gmu"))) {
          const fore = t.slice(Math.max(0, m.index! - 40), m.index!);
          if (/\bpå [A-ZÅÄÖ][\wåäöÅÄÖ-]* $/.test(fore)) continue; // "på Ingarö i Värmdö"
          fel.push(`${p}: ${t.slice(Math.max(0, m.index! - 30), m.index! + namn.length + 20).replace(/\n/g, " ")}`);
        }
      }
    }
    if (process.env.UT190B) console.log(fel.join(" ## "));
    expect(fel.slice(0, 15)).toEqual([]);
  });
  it("brödsmulor och villaområdesrubriker på Värmdö-sidorna", () => {
    expect(JSON.stringify(prerenderContent("/taklaggare-stavsnas")!.breadcrumbs)).toContain("Takläggare på Värmdö");
    expect(text("/taklaggare-varmdo")).toContain("Villaområden på Värmdö");
  });
});
