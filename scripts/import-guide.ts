/**
 * Importskript för guidetexter (ledning/marknad/innehall/guidetexter/*.md) → src/data/blog-posts.ts.
 * Hela brödtexten tas över utan manuell kortning; meningsgrinden (content-coverage-check.ts)
 * kontrollerar sedan varje mening. Lokalt verktyg, ingen del av bygget.
 *
 * Kör: bun scripts/import-guide.ts <brief.md> [--date ÅÅÅÅ-MM-DD]
 * Finns sluggen redan i blog-posts.ts ersätts titel/excerpt/content/keywords (övriga fält behålls),
 * annars läggs ett nytt inlägg överst i listan.
 *
 * Konvertering: första "## "-raden (artikeltiteln) hoppas över (sidan har den som H1), "### " → "## ",
 * punktlistor ("- ") blir egna stycken, [text](/länk) och **fet** behålls (renderas av inline-md).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const briefPath = args.find((a) => !a.startsWith("--") && a.endsWith(".md"));
if (!briefPath) {
  console.error("Användning: bun scripts/import-guide.ts <brief.md> [--date ÅÅÅÅ-MM-DD]");
  process.exit(2);
}
const dateIdx = args.indexOf("--date");
let date = dateIdx > -1 ? args[dateIdx + 1] : new Date().toISOString().slice(0, 10);

const raw = readFileSync(resolve(briefPath), "utf8").replace(/\r/g, "");
if (!/\*\*Grind:\*\*\s*GODKÄND/.test(raw)) {
  console.error('Briefen saknar raden "**Grind:** GODKÄND ...". En brief utan Grind-rad byggs aldrig.');
  process.exit(1);
}
const field = (re: RegExp) => raw.match(re)?.[1]?.trim();
const slug = field(/\*\*Slug:\*\*\s*\/blogg\/([a-z0-9-]+)/);
const title = field(/\*\*(?:Ny titel|Titel) \(≤ ?60\):\*\*\s*(.+)/)?.replace(/\s*\(\d+\)\s*$/, "");
const excerpt = field(/\*\*Meta \(≤ ?160\):\*\*\s*(.+)/)?.replace(/\s*\(\d+\)\s*$/, "");
const kwLine = field(/\*\*Primärt sökord:\*\*\s*(.+)/);
if (!slug || !title || !excerpt || !kwLine) {
  console.error("Saknar Slug/titel/meta/sökord i briefens huvud.", { slug, title, excerpt, kwLine });
  process.exit(2);
}
const keywords = kwLine
  .replace(/\*\*Sekundära:\*\*/, ",")
  .split(/[,·]/)
  .map((k) => k.trim())
  .filter(Boolean);

const afterRule = raw.split(/\n---\n/).slice(1).join("\n---\n");
// Brödtexten slutar vid "## Källor" eller vid en ändringsnotis ("- **Ändrat ÅÅÅÅ-MM-DD …"), som är redaktionell notering och inte publiceras.
const bodyRaw = afterRule.split(/\n## Källor/)[0].split(/\n- \*\*Ändrat \d{4}-\d{2}-\d{2}/)[0];
const lines = bodyRaw.split("\n");
const content: string[] = [];
let skippedTitle = false;
let para: string[] = [];
const flush = () => {
  if (para.length) content.push(para.join(" ").trim());
  para = [];
};
for (const line of lines) {
  const t = line.trim();
  if (!t) {
    flush();
    continue;
  }
  if (t.startsWith("## ")) {
    flush();
    if (!skippedTitle) {
      skippedTitle = true;
      continue;
    }
    content.push(t);
  } else if (t.startsWith("### ")) {
    flush();
    content.push("## " + t.slice(4));
  } else if (t.startsWith("- ")) {
    flush();
    content.push(t.slice(2));
  } else {
    para.push(t);
  }
}
flush();

const words = content.join(" ").split(/\s+/).length;
const readTime = `${Math.max(1, Math.round(words / 200))} min`;
const js = (s: string) => JSON.stringify(s);

const serialize = (updatedLine: string) =>
  `  {
    slug: ${js(slug)},
    title: ${js(title)},
    excerpt: ${js(excerpt)},
    date: ${js(date)},${updatedLine}
    readTime: ${js(readTime)},
    keywords: [${keywords.map(js).join(",")}],
    content: [
${content.map((c) => `      ${js(c)},`).join("\n")}
    ],
  },`;

const f = resolve("src/data/blog-posts.ts");
let src = readFileSync(f, "utf8");
const marker = `    slug: "${slug}",`;
const at = src.indexOf(marker);
if (at > -1) {
  // blog-posts.ts har blandade radslut (CRLF/LF): sök efter "  {" och "  }," utan att anta radslutet efter klammern.
  const start = src.lastIndexOf("\n  {", at) + 1;
  if (start === 0) {
    console.error(`Hittar inte början på posten ${slug} i blog-posts.ts (avbryter utan att skriva).`);
    process.exit(2);
  }
  const end = src.indexOf("\n  },", at) + "\n  },".length;
  const block = src.slice(start, end);
  // Ersatt text: behåll det ursprungliga publiceringsdatumet och sätt "updated" till importdagen.
  const oldDate = block.match(/\n    date: "([^"]+)"/)?.[1];
  const stamp = date;
  if (oldDate) date = oldDate;
  const updatedLine = oldDate && oldDate !== stamp ? `\n    updated: ${js(stamp)},` : "";
  src = src.slice(0, start) + serialize(updatedLine) + src.slice(end);
  console.log(`[import-guide] ersatte /blogg/${slug} (${content.length} stycken, ${words} ord)`);
} else {
  // Blandade radslut (CRLF/LF) i blog-posts.ts: hitta radens slut oavsett radslut, och avbryt om listan inte hittas.
  const head = src.match(/export const blogPosts: BlogPost\[\] = \[\r?\n/);
  if (!head || head.index === undefined) {
    console.error("Hittar inte 'export const blogPosts: BlogPost[] = [' i blog-posts.ts (avbryter utan att skriva).");
    process.exit(2);
  }
  const arrStart = head.index + head[0].length;
  src = src.slice(0, arrStart) + serialize("") + "\n" + src.slice(arrStart);
  // (nytt inlägg: date = importdagen, ingen updated)
  console.log(`[import-guide] nytt inlägg /blogg/${slug} (${content.length} stycken, ${words} ord)`);
}
writeFileSync(f, src);
