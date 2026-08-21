import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBlogPostBySlug, blogPosts } from "@/data/blog-posts";
import NotFound from "./NotFound";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) return <NotFound />;

  const url = `https://roslagstak.se/blogg/${post.slug}`;
  const articleBody = post.content.join("\n\n");
  const wordCount = articleBody.split(/\s+/).filter(Boolean).length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "sv-SE",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    image: "https://roslagstak.se/og-image.jpg",
    wordCount,
    articleBody,
    keywords: post.keywords.join(", "),
    author: {
      "@type": "Organization",
      name: "RoslagsTak",
      url: "https://roslagstak.se/",
    },
    publisher: {
      "@type": "Organization",
      name: "RoslagsTak",
      url: "https://roslagstak.se/",
      logo: {
        "@type": "ImageObject",
        url: "https://roslagstak.se/og-image.jpg",
      },
    },
    about: { "@type": "Place", name: "Roslagen, Stockholm, Sverige" },
  };

  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startsidan", item: "https://roslagstak.se/" },
      { "@type": "ListItem", position: 2, name: "Blogg", item: "https://roslagstak.se/blogg" },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  // Topical relevance: rank other posts by shared keywords for better internal linking signals
  const otherPosts = (() => {
    const postKw = new Set(post.keywords.map((k) => k.toLowerCase()));
    return blogPosts
      .filter((p) => p.slug !== slug)
      .map((p) => ({
        post: p,
        score: p.keywords.reduce((s, k) => s + (postKw.has(k.toLowerCase()) ? 2 : 0), 0) +
          p.keywords.reduce(
            (s, k) =>
              s +
              (Array.from(postKw).some((pk) => pk.includes(k.toLowerCase()) || k.toLowerCase().includes(pk)) ? 1 : 0),
            0,
          ),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((x) => x.post);
  })();

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.excerpt}
        canonical={`https://roslagstak.se/blogg/${post.slug}`}
        type="article"
      />
      <Header />
      <main className="pt-24 pb-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
        />
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary transition-colors">Startsidan</Link>
            <span>/</span>
            <Link to="/blogg" className="hover:text-primary transition-colors">Blogg</Link>
            <span>/</span>
            <span className="text-foreground font-medium line-clamp-1">{post.title}</span>
          </nav>

          <article className="max-w-3xl mx-auto">
            <header className="mb-10">
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.date).toLocaleDateString("sv-SE")}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4">
                {post.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            </header>

            <div className="space-y-5">
              {post.content.map((paragraph, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Internal links */}
            <div className="bg-card border border-border rounded-lg p-6 mt-10">
              <h2 className="font-display text-lg text-card-foreground mb-3">Läs mer om tak i Roslagen</h2>
              <div className="grid sm:grid-cols-2 gap-2">
                <Link to="/tjanster/takomlaggning" className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <ArrowRight className="w-3 h-3" /> Takomläggning
                </Link>
                <Link to="/tjanster/takrenovering" className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <ArrowRight className="w-3 h-3" /> Takrenovering
                </Link>
                <Link to="/priser" className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <ArrowRight className="w-3 h-3" /> Se prislista
                </Link>
                <Link to="/taklaggare-blido" className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <ArrowRight className="w-3 h-3" /> Takläggare på Blidö
                </Link>
                <Link to="/taklaggare-ljustero" className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <ArrowRight className="w-3 h-3" /> Takläggare på Ljusterö
                </Link>
                <Link to="/recensioner" className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <ArrowRight className="w-3 h-3" /> Kundrecensioner
                </Link>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-primary/10 rounded-lg p-8 mt-8 text-center">
              <h2 className="font-display text-xl text-foreground mb-2">Behöver du hjälp med ditt tak?</h2>
              <p className="text-muted-foreground text-sm mb-4">Kostnadsfri offert — vi återkopplar inom 24 timmar.</p>
              <Link
                to="/offert"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors hover:animate-subtle-pulse"
              >
                Konfigurera din offert <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>

          {/* Related posts */}
          {otherPosts.length > 0 && (
            <div className="max-w-3xl mx-auto mt-16 pt-12 border-t border-border">
              <h2 className="font-display text-xl text-foreground mb-6">Relaterade artiklar om tak</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {otherPosts.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blogg/${p.slug}`}
                    className="group bg-card border border-border rounded-lg p-5 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-display text-sm text-card-foreground group-hover:text-primary transition-colors mb-2">
                      {p.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{p.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;
