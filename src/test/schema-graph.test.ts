import { describe, expect, it } from "vitest";
import {
  ORG_ID,
  WEBSITE_ID,
  buildBreadcrumbNode,
  buildOrganizationNode,
  buildWebPageNode,
  webPageTypeFor,
} from "@/lib/schema-graph";
import { buildBlogPostingSchema } from "@/lib/blog-schema";
import { blogPosts } from "@/data/blog-posts";

describe("schema-graf (fas 2.19)", () => {
  it("ger varje sida en egen WebPage som är del av WebSite", () => {
    const page = buildWebPageNode({ path: "/priser", name: "Priser", hasBreadcrumb: true });
    expect(page["@id"]).toBe("https://roslagstak.se/priser#webpage");
    expect(page.url).toBe("https://roslagstak.se/priser");
    expect(page.isPartOf["@id"]).toBe(WEBSITE_ID);
    expect(page.breadcrumb?.["@id"]).toBe("https://roslagstak.se/priser#breadcrumb");
    expect("about" in page).toBe(false);
  });

  it("startsidans WebPage handlar om organisationen", () => {
    const home = buildWebPageNode({ path: "/", name: "Start" });
    expect(home["@id"]).toBe("https://roslagstak.se/#webpage");
    expect(home.about?.["@id"]).toBe(ORG_ID);
  });

  it("brödsmulans @id kommer från sidans egen URL", () => {
    const crumbs = buildBreadcrumbNode([
      { name: "Start", path: "/" },
      { name: "Blogg", path: "/blogg" },
      { name: "Guide", path: "/blogg/guide" },
    ]);
    expect(crumbs["@id"]).toBe("https://roslagstak.se/blogg/guide#breadcrumb");
  });

  it("väljer sidtyp efter mall", () => {
    expect(webPageTypeFor("/blogg")).toBe("CollectionPage");
    expect(webPageTypeFor("/kontakt")).toBe("ContactPage");
    expect(webPageTypeFor("/priser")).toBe("WebPage");
  });

  it("Organization har inga obelagda fält", () => {
    const org = buildOrganizationNode() as Record<string, unknown>;
    expect(org.alternateName).toBeUndefined();
    expect(org.foundingLocation).toBeUndefined();
    expect(org["@id"]).toBe(ORG_ID);
  });

  it("BlogPosting hör till sidans WebPage och pekar på organisationen", () => {
    const post = blogPosts[0];
    const posting = buildBlogPostingSchema(post);
    const url = `https://roslagstak.se/blogg/${post.slug}`;
    expect(posting["@id"]).toBe(`${url}#article`);
    expect(posting.mainEntityOfPage["@id"]).toBe(`${url}#webpage`);
    expect(posting.author["@id"]).toBe(ORG_ID);
    expect(posting.publisher["@id"]).toBe(ORG_ID);
  });
});
