/**
 * Frågedelen i en briefs innehåll (combo-overrides.ts): rubriken "## Vanliga frågor om …" eller "## Frågor om …" följd av stycken på formen
 * "**Fråga?** Svar". Har briefen en sådan del visar sidan inte sin egen genererade FAQ-sektion (det blev två frågedelar på sidan), och
 * FAQPage-schemat byggs på briefens frågor. Delas av ServiceLocationPage.tsx och scripts/prerender-content.ts (AG2).
 */
import { tidOchMaterialFragor } from "./location-faqs";

export interface BriefFaq {
  question: string;
  /** Svaret med eventuella [länk](/sida) kvar; rensas av den som skriver schema eller statisk text. */
  answer: string;
}

const FAQ_HEADING = /^## .*fråg/i;
const QA = /^\*\*(.+?\?)\*\*\s*([\s\S]+)$/;

/**
 * Lägger frågorna om tid och material (location-faqs.ts, Innehålls lydelser) direkt efter sista frågan i briefens frågedel.
 * Briefar utan frågedel lämnas orörda (de visar sidans egna genererade frågor). Delas av ServiceLocationPage.tsx och prerender-content.ts,
 * så att besökaren, den statiska texten och FAQPage-schemat får samma frågor.
 */
export const medTidOchMaterial = (
  content: readonly string[],
  c: { serviceSlug: string; serviceName: string; prep: string; locationName: string },
): string[] => {
  const start = content.findIndex((p) => FAQ_HEADING.test(p));
  if (start < 0) return [...content];
  let sista = -1;
  const finns = new Set<string>();
  for (let i = start + 1; i < content.length; i++) {
    if (content[i].startsWith("## ")) break;
    const m = content[i].match(QA);
    if (m) {
      sista = i;
      finns.add(m[1].trim());
    }
  }
  if (sista < 0) return [...content];
  const nya = tidOchMaterialFragor(c)
    .filter((f) => !finns.has(f.question))
    .map((f) => `**${f.question}** ${f.answer}`);
  return [...content.slice(0, sista + 1), ...nya, ...content.slice(sista + 1)];
};

/** Briefens frågor, eller null om briefen saknar frågedel (då visas sidans egna genererade frågor som förut). */
export const briefFaqs = (content: readonly string[] | undefined): BriefFaq[] | null => {
  if (!content) return null;
  const start = content.findIndex((p) => FAQ_HEADING.test(p));
  if (start < 0) return null;
  const ut: BriefFaq[] = [];
  for (const p of content.slice(start + 1)) {
    if (p.startsWith("## ")) break;
    const m = p.match(QA);
    if (m) ut.push({ question: m[1].trim(), answer: m[2].trim() });
  }
  return ut.length > 0 ? ut : null;
};
