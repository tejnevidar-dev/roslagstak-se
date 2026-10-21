/**
 * Gren 186 (mallandel-topp10-2026-10-22.md, Marknadschefens grindsvar 288, utan Trosa): nio ortssidor med hög mallandel får ett nytt källbelagt stycke ur Wikipedia.
 * Standardblocken är orörda. Raderna är tillämpade av _verktyg/gren182-rader.mjs (9 rader, en träff var).
 */
import { describe, expect, it } from "vitest";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

const NYA: [string, string][] = [
  [
    "marsta",
    "Märsta delas in i flera bostadsområden med småhus. Enligt Wikipedia be"
  ],
  [
    "tumba",
    "Namnet Tumbokvarn är enligt Wikipedia en hopdragning av Tunabornas kva"
  ],
  [
    "saltsjo-boo",
    "De äldsta kända namnen på trakten är Hargsö, Övre Orminge och Yttre Or"
  ],
  [
    "edsberg",
    "Edsbergs slott, ett tidigare säteri vid norra änden av Edsviken, stod "
  ],
  [
    "spanga",
    "Namnet innehåller pluralis av ordet spång. Centrala Spånga med station"
  ],
  [
    "gustavsberg",
    "Platsen var bebodd långt före bruket. Under järnåldern gick en smal va"
  ],
  [
    "rotebro",
    "Namnen Rotebro och Rotsunda kommer enligt Wikipedia från en bro över e"
  ],
  [
    "edsviken",
    "Grannområdet Kummelby var en gård redan i förhistorisk tid, och namnet"
  ],
  [
    "graddo",
    "Enligt hitta.se är husen på Rådmansö, bland annat i Gräddö, byggda und"
  ]
];

describe("gren 186: nytt stycke på nio sidor med hög mallandel", () => {
  for (const [slug, text] of NYA) {
    it(`/taklaggare-${slug}: det nya stycket står i datan och i serverns HTML, Trosa är inte med`, () => {
      expect(locations.find((l) => l.slug === slug)!.longDescription, slug).toContain(text);
      expect(JSON.stringify(prerenderContent(`/taklaggare-${slug}`)!.paragraphs), slug).toContain(text.replace(/"/g, '\\"'));
    });
  }
});
