/**
 * BlogPosting-schema för en guide. EN byggare för BlogPost.tsx (inline-script) och prerender-content.ts
 * (statisk HTML), så att crawlers utan JS får samma schema som besökaren (fas 2.19/2.21).
 * Författare och utgivare är organisationen; ingen personförfattare tills Om oss-frågorna (10e) är besvarade.
 */
import type { BlogPost } from "../data/blog-posts";
import { stripInlineMd } from "./inline-md";

export const buildBlogPostingSchema = (post: BlogPost) => {
  const url = `https://roslagstak.se/blogg/${post.slug}`;
  const articleBody = post.content.map(stripInlineMd).join("\n\n");
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: "sv-SE",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    image: "https://roslagstak.se/og-image.jpg",
    wordCount: articleBody.split(/\s+/).filter(Boolean).length,
    articleBody,
    keywords: post.keywords.join(", "),
    author: { "@type": "Organization", name: "RoslagsTak", url: "https://roslagstak.se/" },
    publisher: {
      "@type": "Organization",
      name: "RoslagsTak",
      url: "https://roslagstak.se/",
      logo: { "@type": "ImageObject", url: "https://roslagstak.se/og-image.jpg" },
    },
    about: { "@type": "Place", name: "Roslagen, Stockholm, Sverige" },
  };
};
