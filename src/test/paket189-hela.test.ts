/**
 * Gren 189 (innehall/hela-rattning-2026-10-22.md, Marknadschefens grindsvar 298 och 299): "hela" är struket i alla uppdragsmeningar ("Vi tar uppdrag i hela Täby" → "Vi tar uppdrag i Täby"),
 * och check-arbetsomrade fäller bygget om en uppdragsmening på en byggd sida lovar "hela" en ort, kommun eller region. Provet gör samma kontroll mot förrenderingen av alla sidor i sajtkartan.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { prerenderContent } from "../../scripts/prerender-content";

const sitemap = readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8");
const sidor = [...sitemap.matchAll(/<loc>https:\/\/roslagstak\.se([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
const UPPDRAG = /\buppdrag\b|^\s*Ja,\s+i\s+hela\b|\bverksamma\b|\barbetar\s+i\b/i;
const HELA = /\bhela\s+(?:[A-ZÅÄÖ][\wåäöÅÄÖ-]+|kommunen|regionen|staden|området|länet)\b/;

const text = (p: string): string => {
  const c = prerenderContent(p);
  if (!c) return "";
  const delar: string[] = [];
  for (const x of c.paragraphs) delar.push(typeof x === "string" ? x : JSON.stringify(x));
  delar.push(JSON.stringify(c.jsonLd ?? []));
  return delar.join("\n").replace(/\*\*/g, "");
};

describe("gren 189: 'hela' i uppdragsmeningar", () => {
  it("ingen uppdragsmening på en sida i sajtkartan lovar 'hela' en ort, kommun eller region", () => {
    const fel: string[] = [];
    for (const p of sidor) {
      if (p === "/") continue; // startsidan hör till paket 52 (check-arbetsomrade)
      for (const mening of text(p).split(/(?<=[.?!])\s+|\n|\n/)) {
        if (UPPDRAG.test(mening) && HELA.test(mening)) fel.push(`${p}: ${mening.trim().slice(0, 100)}`);
      }
    }
    expect(fel.slice(0, 15)).toEqual([]);
  });
  it("de rättade meningarna står: Vaxholm, Upplands Väsby, Nacka och Täby", () => {
    expect(text("/taktvatt-nacka")).toContain("Vi tar uppdrag i Nacka.");
    expect(text("/taktvatt-huddinge")).toContain("Tar ni uppdrag i Huddinge?");
    expect(text("/taklaggare-taby")).toContain("Vi tar uppdrag i Täby, bland annat i Roslags-Näsby");
    expect(text("/taktvatt-upplands-vasby")).toContain("Ja, i Upplands Väsby kommun");
  });
});
