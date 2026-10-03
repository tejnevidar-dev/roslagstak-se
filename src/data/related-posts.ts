/**
 * Relaterade guider efter ämnesnärhet (delade nyckelord). EN källa för BlogPost.tsx (rendering) och
 * scripts/prerender-content.ts (statisk HTML), så att crawlers utan JS ser samma ämnesrelevanta
 * internlänkar som besökaren (tidigare länkade den statiska HTML:en till de 8 första artiklarna oavsett ämne).
 */
import { blogPosts, type BlogPost } from "./blog-posts";

const scoreAgainst = (kw: Set<string>, candidate: BlogPost) =>
  candidate.keywords.reduce((s, k) => s + (kw.has(k.toLowerCase()) ? 2 : 0), 0) +
  candidate.keywords.reduce(
    (s, k) => s + (Array.from(kw).some((pk) => pk.includes(k.toLowerCase()) || k.toLowerCase().includes(pk)) ? 1 : 0),
    0,
  );

const RELATED_COUNT = 4;
/** Hur hårt redan mottagna länkar straffas, så att inlänkarna sprids över alla guider i stället för att hamna på några få. */
const SPREAD_PENALTY = 1;

/** Förberäknad, deterministisk länkplan: varje guide länkar till 4 ämnesrelaterade guider, med lätt
 *  utjämning av antalet inlänkar per guide. */
const relatedPlan: Map<string, BlogPost[]> = (() => {
  const inDegree = new Map<string, number>();
  const plan = new Map<string, BlogPost[]>();
  for (const post of blogPosts) {
    const kw = new Set(post.keywords.map((k) => k.toLowerCase()));
    const pool = blogPosts.filter((p) => p.slug !== post.slug).map((p) => ({ post: p, score: scoreAgainst(kw, p) }));
    const picked: BlogPost[] = [];
    for (let i = 0; i < RELATED_COUNT && pool.length; i++) {
      pool.sort(
        (x, y) =>
          y.score - SPREAD_PENALTY * (inDegree.get(y.post.slug) ?? 0) - (x.score - SPREAD_PENALTY * (inDegree.get(x.post.slug) ?? 0)),
      );
      const next = pool.shift()!;
      picked.push(next.post);
      inDegree.set(next.post.slug, (inDegree.get(next.post.slug) ?? 0) + 1);
    }
    plan.set(post.slug, picked);
  }
  return plan;
})();

/** Ämnesrelaterade andra guider (EN plan för rendering och statisk HTML). */
export const relatedPosts = (post: Pick<BlogPost, "slug" | "keywords">, n = RELATED_COUNT): BlogPost[] =>
  (relatedPlan.get(post.slug) ?? []).slice(0, n);

/** Guider vars nyckelord matchar en sidas ämnesord (t.ex. för problem- och materialsidor); bara träffar med poäng. */
export const guidesForKeywords = (keywords: string[], n = 2): BlogPost[] => {
  const kw = new Set(keywords.map((k) => k.toLowerCase()));
  return blogPosts
    .map((p) => ({ post: p, score: scoreAgainst(kw, p) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((x) => x.post);
};

const GENERIC = new Set(["tak", "taket", "takets", "och", "eller", "för", "med", "vad", "hur"]);

/** Guider som matchar ämnesorden i en sidtitel (problem-, material- och tjänstesidor → relevanta guider). */
export const guidesForTitle = (title: string, n = 2): BlogPost[] =>
  guidesForKeywords(
    title
      .toLowerCase()
      .split(/[^a-zåäö0-9]+/)
      .filter((w) => w.length >= 5 && !GENERIC.has(w)),
    n,
  );
