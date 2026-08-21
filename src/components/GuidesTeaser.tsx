import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

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
    <section id="guider" className="border-b border-border bg-warm py-24 md:py-36" aria-labelledby="guides-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          meta="Guider & råd"
          id="guides-heading"
          title={<>Kunskap om tak — <em className="font-normal italic text-primary">skrivet av takläggare</em></>}
          intro="Läs våra guider om material, kostnader, ROT-avdrag och underhåll innan du bestämmer dig för ditt takprojekt."
          className="mb-14 lg:mb-20"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-foreground/10">
          {featured.map((post, i) => (
            <Reveal key={post.slug} delay={Math.min(i, 5) * 0.06}>
              <Link
                to={`/blogg/${post.slug}`}
                className={`group h-full flex flex-col py-9 md:px-8 border-b border-foreground/10 transition-colors hover:bg-foreground/[0.03] ${
                  i % 3 !== 0 ? "lg:border-l lg:border-foreground/10" : "md:pl-0 lg:pl-0"
                }`}
              >
                <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6">
                  <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <BookOpen className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                  {post.readTime} läsning
                </div>
                <h3 className="font-display text-xl tracking-[-0.02em] text-foreground mb-3 leading-snug transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{post.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold transition-transform group-hover:translate-x-1">
                  Läs guiden <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12">
          <Link
            to="/blogg"
            className="inline-flex items-center gap-2 border border-foreground/20 text-foreground px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-accent hover:text-primary-foreground hover:border-accent transition-colors"
          >
            Se alla guider <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GuidesTeaser;