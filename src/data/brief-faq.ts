/**
 * Frågedelen i en briefs innehåll (combo-overrides.ts): rubriken "## Vanliga frågor om …" eller "## Frågor om …" följd av stycken på formen
 * "**Fråga?** Svar". Har briefen en sådan del visar sidan inte sin egen genererade FAQ-sektion (det blev två frågedelar på sidan), och
 * FAQPage-schemat byggs på briefens frågor. Delas av ServiceLocationPage.tsx och scripts/prerender-content.ts (AG2).
 */
export interface BriefFaq {
  question: string;
  /** Svaret med eventuella [länk](/sida) kvar; rensas av den som skriver schema eller statisk text. */
  answer: string;
}

const FAQ_HEADING = /^## .*fråg/i;
const QA = /^\*\*(.+?\?)\*\*\s*([\s\S]+)$/;

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
