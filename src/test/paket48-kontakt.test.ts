/**
 * Paket 48 (Marknadschefen 2026-10-11): resten av det statiska blocket på /kontakt, "skriftlig offert" överallt och kartnålen på kontaktsidan.
 * Ett test per struken lydelse. Stående regel: aldrig "skriftlig" om offert.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { prerenderContent } from "../../scripts/prerender-content";

const kontakt = () => {
  const p = prerenderContent("/kontakt")!;
  return { text: p.paragraphs.map((x) => (typeof x === "string" ? x : "")).join("\n"), p };
};
const walk = (d: string): string[] => readdirSync(d).flatMap((f) => { const x = join(d, f); return statSync(x).isDirectory() ? (f === "test" ? [] : walk(x)) : /\.tsx?$/.test(f) ? [x] : []; });

describe("paket 48: /kontakt", () => {
  it("a) 'skriftlig offert' finns inte i någon källtext", () => {
    const traffar = [...walk("src"), "scripts/prerender-content.ts"].filter((f) => /skriftlig offert/i.test(readFileSync(f, "utf8")));
    expect(traffar).toEqual([]);
    expect(kontakt().text).not.toMatch(/skriftlig/i);
    expect(prerenderContent("/hur-det-gar-till")!.paragraphs.join("\n")).not.toMatch(/skriftlig offert/i);
  });

  it("b) stycket efter takkontrollen har den nya lydelsen och inte uppräkningen eller 'utan påtryckningar'", () => {
    const { text } = kontakt();
    expect(text).toContain("Efter takkontrollen får du en rapport om takets skick. Behöver taket åtgärdas får du också en offert med fast pris. Du bestämmer i din egen takt.");
    for (const borta of ["tydlig specifikation", "rivning, underlag, tätskikt", "taksäkerhet och städning", "utan påtryckningar"]) expect(text, borta).not.toContain(borta);
  });

  it("c) 'Vi tar med all mätutrustning' är struken", () => {
    expect(kontakt().text).not.toContain("mätutrustning");
  });

  it("d) och 1.8: uppräkningen har varken 'alla öar', Östhammar eller 'hela', och ö-stycket står kvar oförändrat", () => {
    const { text, p } = kontakt();
    expect(text).toContain("Vi tar uppdrag i Roslagen och Storstockholm, från Norrtälje, Österåker och Vaxholm till Täby, Sollentuna, Nacka och Södertälje.");
    expect(text).not.toContain("alla öar");
    expect(text).not.toContain("Östhammar");
    expect(text).toContain("För dig på en ö: vi tar uppdrag i skärgården och har gjort kompletta takbyten på Blidö och Singö. Berätta var fastigheten ligger och hur den nås, så planerar vi takkontrollen därefter.");
    expect(p.description).toBe("Ring 070-154 36 39 eller fyll i formuläret — kostnadsfri takkontroll i Roslagen och Storstockholm. Återkoppling inom 24 timmar.");
  });

  it("e) frågelistan har inte 'kan man bo kvar under arbetet'", () => {
    const { text } = kontakt();
    expect(text).not.toContain("bo kvar");
    expect(text).toContain("Vanliga frågor vid första kontakten: vad kostar ett takbyte (se vår prissida för riktpriser) och hur lång tid tar det (det beror på takets storlek, underlagets skick och väder).");
  });

  it("S1: kartnålen på kontaktsidan säger Norrtälje", () => {
    const t = readFileSync("src/pages/ContactLanding.tsx", "utf8");
    expect(t).toContain('{ icon: MapPin, label: "Norrtälje" },');
    expect(t).not.toContain('"Blidö, Norrtälje"');
  });
});
