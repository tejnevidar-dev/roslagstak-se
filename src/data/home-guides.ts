/**
 * Startsidans avsnitt "Guider & råd" (GuidesTeaser.tsx): texterna delas av komponenten (React) och av
 * scripts/prerender-content.ts (statisk HTML), så att besökaren och sökmotorn får samma ord (AC4). Ändra texten här, inte i komponenten.
 */
import type { BlogPost } from "@/data/blog-posts";

export const HOME_GUIDES = {
  eyebrow: "Guider & råd",
  headingA: "Kunskap om tak —",
  headingB: "skrivet av takläggare.",
  allLink: "Se alla guider",
  leadReadMore: "Läs guiden",
};

/** Antalet guider som visas (de första i blog-posts.ts). */
export const HOME_GUIDES_COUNT = 6;

/** Texten under bilden på den stora guiden. */
export const homeGuideLeadCaption = (post: Pick<BlogPost, "readTime">) => `Mest läst · ${post.readTime} läsning`;
export const homeGuideReadTime = (post: Pick<BlogPost, "readTime">) => `${post.readTime} läsning`;
