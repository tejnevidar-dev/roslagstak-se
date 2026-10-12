/**
 * Genererar src/data/home-guide-cards.ts: de uppgifter startsidans guideblock (GuidesTeaser.tsx) visar för varje guide (adress, titel, ingress och lästid),
 * så att startsidan inte behöver hämta hela guidetexten i src/data/blog-posts.ts (ca 230 kB) för sex kort.
 * Urvalet är det som blocket alltid har visat: de första HOME_GUIDES_COUNT guiderna i blog-posts.ts som inte är avindexerade.
 *
 * Körs automatiskt via `predev`/`prebuild`.
 */
import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { blogPosts } from "../src/data/blog-posts";
import { synligaGuider } from "../src/data/avindexerade-guider";
import { HOME_GUIDES_COUNT } from "../src/data/home-guides";

const kort = synligaGuider(blogPosts).slice(0, HOME_GUIDES_COUNT);
const rader = kort
  .map(
    (p) =>
      `  { slug: ${JSON.stringify(p.slug)}, title: ${JSON.stringify(p.title)}, excerpt: ${JSON.stringify(p.excerpt)}, readTime: ${JSON.stringify(p.readTime)} },`,
  )
  .join("\n");

const fil = `/* AUTO-GENERERAD av scripts/generate-home-guide-cards.ts — redigera inte manuellt.
   Kör "bun scripts/generate-home-guide-cards.ts" (eller npm run dev/build) för att uppdatera. */

export interface HomeGuideCard {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
}

export const homeGuideCards: HomeGuideCard[] = [
${rader}
];
`;

const mal = resolve("src/data/home-guide-cards.ts");
// Skriver bara om innehållet ändrats (radbrytningar oräknade), så att ett bygge inte lämnar filen som ändrad i git.
const nuvarande = existsSync(mal) ? readFileSync(mal, "utf8").split(String.fromCharCode(13)).join("") : null;
if (nuvarande !== fil) writeFileSync(mal, fil);
console.log(`[home-guide-cards] wrote ${kort.length} guidekort to src/data/home-guide-cards.ts`);
