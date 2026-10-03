/**
 * Lägger innehållsöverstyrningarna (textblock, FAQ, internlänkar) på prerender-modellen, så att statisk HTML,
 * ordräkning, länkgrafen och kvalitetsgrindarna ser samma sak som besökaren (ContentOverrides.tsx läser samma modell).
 * Ren funktion utan sidoeffekter, bara relativa importer. Utan block returneras sidan oförändrad (samma objekt).
 */
import type { OverrideBlocks } from "../data/overrides";

export interface ApplicerbarSida {
  paragraphs: string[];
  links: { href: string; label: string }[];
  headingAt?: Record<number, 2 | 3>;
}

export const applyOverrideBlocks = <T extends ApplicerbarSida>(page: T, blocks: OverrideBlocks | null): T => {
  if (!blocks) return page;
  const paragraphs = [...page.paragraphs];
  const headingAt: Record<number, 2 | 3> = { ...(page.headingAt ?? {}) };
  const links = [...page.links];
  const rubrik = (text: string, nivå: 2 | 3) => {
    headingAt[paragraphs.length] = nivå;
    paragraphs.push(text);
  };
  if (blocks.textblock) {
    if (blocks.textblock.rubrik) rubrik(blocks.textblock.rubrik, 2);
    paragraphs.push(...blocks.textblock.stycken);
  }
  if (blocks.faq) {
    rubrik(blocks.faq.rubrik, 2);
    for (const f of blocks.faq.fragor) {
      rubrik(f.fraga, 3);
      paragraphs.push(f.svar);
    }
  }
  if (blocks.lankar) {
    for (const l of blocks.lankar.lankar) links.push({ href: l.href, label: l.text });
  }
  return { ...page, paragraphs, links, headingAt };
};
