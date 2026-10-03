/**
 * Stycken med rubriknivå för den statiska HTML:en (G1 i konkurrentanalysen 2026-10). En rubrik läggs som eget
 * stycke (med valfritt suffix som texten hade förut, t.ex. ":" eller "."), och dess index sparas i headingAt.
 * Delas av scripts/prerender-content.ts och src/data/service-page.ts (bara relativa importer).
 */
export type BodyItem = string | { h: string; level?: 2 | 3; suffix?: string };

export const buildBody = (items: BodyItem[]): { paragraphs: string[]; headingAt: Record<number, 2 | 3> } => {
  const paragraphs: string[] = [];
  const headingAt: Record<number, 2 | 3> = {};
  for (const it of items) {
    if (typeof it === "string") paragraphs.push(it);
    else {
      headingAt[paragraphs.length] = it.level ?? 2;
      paragraphs.push(`${it.h}${it.suffix ?? ""}`);
    }
  }
  return { paragraphs, headingAt };
};
