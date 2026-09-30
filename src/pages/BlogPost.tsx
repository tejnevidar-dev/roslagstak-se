import { useParams, Link } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { Calendar, Clock, ArrowRight, Phone } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBlogPostBySlug, blogPosts } from "@/data/blog-posts";
import QuickContactFacts from "@/components/QuickContactFacts";
import NotFound from "./NotFound";
import { INLINE_MD, isHeading, stripInlineMd } from "@/lib/inline-md";

/** Renderar [text](/l\u00E4nk) som intern l\u00E4nk och **text** som fet, resten som vanlig text. */
const renderInline = (text: string) =>
  text.split(INLINE_MD).map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link)
      return link[2].startsWith("/") ? (
        <Link key={i} to={link[2]} className="text-primary underline underline-offset-4 hover:no-underline">
          {link[1]}
        </Link>
      ) : (
        link[1]
      );
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={i} className="font-semibold text-foreground">{bold[1]}</strong>;
    return part;
  });

/** Tjänstesida som passar artikelns ämne bäst (första träff vinner), för internlänkning från blogg till tjänst. */
const serviceForSlug = (slug: string): { to: string; label: string } | null => {
  const rules: [RegExp, { to: string; label: string }][] = [
    [/kupa/, { to: "/tjanster/takkupor", label: "Takkupor" }],
    [/eternit|asbest/, { to: "/tjanster/eternit-asbest", label: "Eternit och asbest" }],
    [/mossa|takmalning|tvatt/, { to: "/tjanster/taktvatt", label: "Takvård och taktvätt" }],
    [/hangrannor|stupror|avrinning/, { to: "/tjanster/takavvattning", label: "Takavvattning" }],
    [/inspektion|hur-lange|tecken/, { to: "/tjanster/takinspektion", label: "Takinspektion" }],
    [/plat|bandtack|epdm|snorasskydd|vindskivor|takstege|falsad/, { to: "/tjanster/platarbeten", label: "Plåtarbeten" }],
    [/renovering|papp|ventilation/, { to: "/tjanster/takrenovering", label: "Takrenovering" }],
    [/byta|takbyte|tak-pa|lagga-om|forbered|kostnad|material/, { to: "/tjanster/takomlaggning", label: "Takomläggning" }],
  ];
  return rules.find(([re]) => re.test(slug))?.[1] ?? null;
};

/** Länk till takbyte-ort-sidan när artikeln handlar om en specifik ort. */
const locationForSlug = (slug: string): { to: string; label: string } | null => {
  const rules: [RegExp, { to: string; label: string }][] = [
    [/norrtalje/, { to: "/takbyte-norrtalje", label: "Takbyte i Norrtälje" }],
    [/-taby-|-taby$/, { to: "/takbyte-taby", label: "Takbyte i Täby" }],
    [/ljustero/, { to: "/takbyte-ljustero", label: "Takbyte på Ljusterö" }],
    [/blido/, { to: "/takbyte-blido", label: "Takbyte på Blidö" }],
    [/vaxholm/, { to: "/takbyte-vaxholm", label: "Takbyte i Vaxholm" }],
    [/husaro|finnhamn/, { to: "/taklaggare-husaro", label: "Takläggare på Husarö" }],
    [/radmanso|vato/, { to: "/taklaggare-radmanso", label: "Takläggare på Rådmansö" }],
    [/-stockholm/, { to: "/taklaggare-stockholm", label: "Takläggare i Stockholm" }],
  ];
  return rules.find(([re]) => re.test(slug))?.[1] ?? null;
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) return <NotFound />;

  const url = `https://roslagstak.se/blogg/${post.slug}`;
  const articleBody = post.content.map(stripInlineMd).join("\n\n");
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
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Brödsmulor">
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
              <QuickContactFacts />
            </header>

            <div className="space-y-5">
              {post.content.map((paragraph, i) => {
                const lead = paragraph.match(/^(Steg \d+ — [^:]{2,70}|Vanliga misstag|Så kan RoslagsTak hjälpa): /);
                return (
                  <Fragment key={i}>
                  {i === 3 && post.content.length > 6 && (
                    <aside className="rounded-2xl border border-border bg-card p-5" aria-label="Kostnadsfri takkontroll">
                      <p className="text-sm text-card-foreground">
                        <strong className="font-semibold">Osäker på hur ditt tak mår?</strong> Vi gör en kostnadsfri takkontroll på plats, utan förbindelser.
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                        <Link to="/takkontroll" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
                          Boka takkontroll <ArrowRight className="w-3 h-3" />
                        </Link>
                        <a href="tel:0701543639" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
                          <Phone className="w-3 h-3" /> 070-154 36 39
                        </a>
                      </div>
                    </aside>
                  )}
                  {isHeading(paragraph) ? (
                    <h2 className="font-display text-xl text-foreground pt-2">{paragraph.slice(3)}</h2>
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">
                      {lead ? (
                        <>
                          <strong className="font-semibold text-foreground">{lead[1]}.</strong>{" "}
                          {renderInline(paragraph.slice(lead[0].length))}
                        </>
                      ) : (
                        renderInline(paragraph)
                      )}
                    </p>
                  )}
                  </Fragment>
                );
              })}
            </div>

            {/* Internal links */}
            <div className="bg-card border border-border rounded-2xl p-6 mt-10">
              <h2 className="font-display text-lg text-card-foreground mb-3">Läs mer om tak i Roslagen</h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {serviceForSlug(post.slug) && (
                  <Link to={serviceForSlug(post.slug)!.to} className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline sm:col-span-2">
                    <ArrowRight className="w-3 h-3" /> Om vår tjänst: {serviceForSlug(post.slug)!.label}
                  </Link>
                )}
                {locationForSlug(post.slug) && (
                  <Link to={locationForSlug(post.slug)!.to} className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline sm:col-span-2">
                    <ArrowRight className="w-3 h-3" /> {locationForSlug(post.slug)!.label}
                  </Link>
                )}
                <Link to="/tjanster/takomlaggning" className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <ArrowRight className="w-3 h-3" /> Takomläggning
                </Link>
                <Link to="/tjanster/takrenovering" className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <ArrowRight className="w-3 h-3" /> Takrenovering
                </Link>
                <Link to="/brf" className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <ArrowRight className="w-3 h-3" /> Takbyte för BRF
                </Link>
                <Link to="/priser" className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <ArrowRight className="w-3 h-3" /> Se prislista
                </Link>
                <Link to="/takkontroll" className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <ArrowRight className="w-3 h-3" /> Kostnadsfri takkontroll
                </Link>
                <Link to="/takreparation" className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <ArrowRight className="w-3 h-3" /> Takreparation
                </Link>
                <Link to="/rot-avdrag" className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <ArrowRight className="w-3 h-3" /> ROT-avdrag på tak
                </Link>
                <Link to="/taklaggare-blido" className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <ArrowRight className="w-3 h-3" /> Takläggare på Blidö
                </Link>
                <Link to="/taklaggare-ljustero" className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <ArrowRight className="w-3 h-3" /> Takläggare på Ljusterö
                </Link>
                <Link to="/recensioner" className="flex items-center gap-1 text-sm text-primary hover:underline">
                  <ArrowRight className="w-3 h-3" /> Omdömen på Google
                </Link>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-primary/10 rounded-2xl p-8 mt-8 text-center">
              <h2 className="font-display text-xl text-foreground mb-2">Behöver du hjälp med ditt tak?</h2>
              <p className="text-muted-foreground text-sm mb-4">Kostnadsfri offert — vi återkopplar inom 24 timmar.</p>
              <Link
                to="/offert"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors hover:animate-subtle-pulse"
              >
                Konfigurera din offert <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
                <a href="tel:0701543639" className="inline-flex items-center gap-2 font-semibold text-foreground hover:text-primary">
                  <Phone className="w-4 h-4" /> Ring 070-154 36 39
                </a>
                <Link to="/takkontroll" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
                  Boka kostnadsfri takkontroll <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
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
                    className="group bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-shadow"
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
