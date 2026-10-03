/**
 * BlogPosting-schema för en guide. EN byggare för BlogPost.tsx (inline-script) och prerender-content.ts
 * (statisk HTML), så att crawlers utan JS får samma schema som besökaren (fas 2.19/2.21).
 * Författare och utgivare är organisationen; ingen personförfattare tills Om oss-frågorna (10e) är besvarade.
 */
import type { BlogPost } from "../data/blog-posts";
import { stripInlineMd } from "./inline-md";
import { SITE_URL, articleId, organizationRef, webPageId } from "./schema-graph";

export const buildBlogPostingSchema = (post: BlogPost) => {
  const url = `${SITE_URL}/blogg/${post.slug}`;
  const articleBody = post.content.map(stripInlineMd).join("\n\n");
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": articleId(url),
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: "sv-SE",
    mainEntityOfPage: { "@id": webPageId(url) },
    isPartOf: { "@id": webPageId(url) },
    url,
    image: `${SITE_URL}/og-image.jpg`,
    wordCount: articleBody.split(/\s+/).filter(Boolean).length,
    articleBody,
    keywords: post.keywords.join(", "),
    author: organizationRef(),
    publisher: { ...organizationRef(), url: `${SITE_URL}/`, logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` } },
    about: { "@type": "Place", name: "Roslagen, Stockholm, Sverige" },
  };
};
