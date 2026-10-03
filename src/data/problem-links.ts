/**
 * Länkplan för G12 (Marknadschefens beslut 2026-10-03): varje ortssida länkar till 3 problemsidor, varje problemsida
 * länkar till /takkontroll och till regionsidorna. Problemsidor länkar INTE till enskilda orter.
 * Deterministisk (ingen slump) och ämnesoberoende: orter har ingen taktyp, så inlänkarna sprids jämnt över alla
 * problemsidor (samma utjämningsprincip som guidernas länkplan i related-posts.ts). EN plan för React och statisk HTML.
 * Bara relativa importer.
 */
import { locationIndex } from "./location-index";
import { problemIndex } from "./problems-index";
import { regionOrder, regionSlugs } from "./regions";

export const PROBLEMS_PER_LOCATION = 3;

export interface ProblemLink {
  to: string;
  label: string;
}

const plan: Map<string, ProblemLink[]> = (() => {
  const inDegree = new Map<string, number>(problemIndex.map((p) => [p.slug, 0]));
  const out = new Map<string, ProblemLink[]>();
  const orter = [...locationIndex].sort((a, b) => a.slug.localeCompare(b.slug));
  orter.forEach((loc, i) => {
    // Rotera startpunkten per ort så att lika inlänkstal inte alltid ger samma tre sidor.
    const pool = problemIndex.map((p, idx) => ({ p, idx }));
    const picked: ProblemLink[] = [];
    for (let k = 0; k < PROBLEMS_PER_LOCATION; k++) {
      pool.sort(
        (x, y) =>
          (inDegree.get(x.p.slug) ?? 0) - (inDegree.get(y.p.slug) ?? 0) ||
          ((x.idx - i * 7 + problemIndex.length * 100) % problemIndex.length) - ((y.idx - i * 7 + problemIndex.length * 100) % problemIndex.length),
      );
      const next = pool.shift()!;
      inDegree.set(next.p.slug, (inDegree.get(next.p.slug) ?? 0) + 1);
      picked.push({ to: `/takproblem/${next.p.slug}`, label: next.p.title });
    }
    out.set(loc.slug, picked);
  });
  return out;
})();

/** De tre problemsidor en ortssida länkar till. */
export const problemsForLocation = (slug: string): ProblemLink[] => plan.get(slug) ?? [];

/** Länkar som varje problemsida har till takkontroll och till alla regionsidor. */
export const takkontrollLink: ProblemLink = { to: "/takkontroll", label: "Boka kostnadsfri takkontroll" };
export const regionLinksForProblems = (): ProblemLink[] =>
  regionOrder.filter((r) => regionSlugs[r]).map((r) => ({ to: `/omraden/${regionSlugs[r]}`, label: `Takläggare i ${r}` }));
