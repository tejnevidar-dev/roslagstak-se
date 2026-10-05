/**
 * Textrad med länk till takkontrollen efter ingressen i de guider som får flest klick (Marknadschefen, #1da punkt 2).
 * Ligger i mallen, inte i varje brief. Skiffertak-guiden är undantagen tills Vidar svarat om skiffer (inget erbjudande).
 * Delas av BlogPost.tsx och scripts/prerender-content.ts, så att besökare och crawler får samma text.
 */
export const GUIDE_CTA_SLUGS = [
  "bandtackt-plat-vs-klicktak",
  "mala-plattak-guide-pris",
  "takkupa-vindskupa-guide",
  "ventilation-takfot-viktigt",
  "takpapp-byte-livslangd",
  "eternittak-asbest-sanering",
  "hur-lange-haller-tak",
  "bandtackning-tak-guide",
  "takstege-takbrygga-sakerhet",
  "ta-bort-mossa-fran-tak",
  "rot-avdrag-takbyte",
  "hangrannor-stupror-skargard",
  "plattak-vs-betongpannor",
  "kostnad-takbyte-2026",
  "takrenovering-sommarstuga-roslagen",
];

export const GUIDE_CTA_LINE = "Gäller det ditt eget tak? [Boka en kostnadsfri takkontroll utan förpliktelser.](/takkontroll)";

/** Guidens stycken, med takkontrollraden insatt direkt efter ingressen (första stycket) om guiden är med i listan. */
export const guideContent = (post: { slug: string; content: string[] }): string[] =>
  GUIDE_CTA_SLUGS.includes(post.slug) && post.content.length > 0
    ? [post.content[0], GUIDE_CTA_LINE, ...post.content.slice(1)]
    : post.content;
