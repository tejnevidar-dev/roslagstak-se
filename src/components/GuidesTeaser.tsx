import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";

const GuidesTeaser = () => {
  const featured = blogPosts.slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Guider och råd om tak i Roslagen",
    itemListElement: featured.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://roslagstak.se/blogg/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <section id="guider" className="py-20 md:py-28 bg-warm" aria-labelledby="guides-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Guider & råd</p>
          <h2 id="guides-heading" className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Kunskap om tak — skrivet av takläggare i Roslagen
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Läs våra guider om material, kostnader, ROT-avdrag och underhåll innan du bestämmer dig för ditt takprojekt.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((post) => (
            <Link
              key={post.slug}
              to={`/blogg/${post.slug}`}
              className="group card-lift bg-card border border-border rounded-lg p-7 hover:border-primary/40 flex flex-col"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-4">
                <BookOpen className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                {post.readTime} läsning
              </div>
              <h3 className="font-display text-xl text-card-foreground mb-3 leading-snug">{post.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">{post.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                Läs guiden <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/blogg"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary px-7 py-3.5 rounded-md text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Se alla guider <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GuidesTeaser;