import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import Reveal from "@/components/Reveal";
import roofMacro from "@/assets/roof-layers-macro.jpg";

const GuidesTeaser = () => {
  const featured = blogPosts.slice(0, 6);
  const [lead, ...rest] = featured;

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
    <section id="guider" className="bg-background py-20 lg:py-28" aria-labelledby="guides-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 border-b border-border pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-primary">
              05 — Guider & råd
            </p>
            <h2
              id="guides-heading"
              className="mt-4 font-display text-[clamp(2rem,3.4vw,3rem)] font-extrabold leading-[1.03] tracking-[-0.038em] text-foreground text-balance"
            >
              Kunskap om tak — skrivet av takläggare
            </h2>
          </div>
          <Link
            to="/blogg"
            className="inline-flex shrink-0 items-center gap-2 text-[17px] font-bold text-foreground underline decoration-accent decoration-2 underline-offset-[6px] hover:text-primary"
          >
            Se alla guider <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Utvald guide med bild */}
          {lead && (
            <Reveal className="lg:col-span-5">
              <Link to={`/blogg/${lead.slug}`} className="group block pt-10">
                <div className="overflow-hidden rounded-3xl border border-border">
                  <img
                    src={roofMacro}
                    alt="Närbild på takkonstruktion med läkt och pannor"
                    width={900}
                    height={675}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Mest läst · {lead.readTime} läsning
                </p>
                <h3 className="mt-3 font-display text-[clamp(1.5rem,2.2vw,2rem)] font-bold leading-tight tracking-[-0.03em] text-foreground transition-colors group-hover:text-primary">
                  {lead.title}
                </h3>
                <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">{lead.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[16px] font-bold text-primary">
                  Läs guiden <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          )}

          {/* Övriga guider som hairline-lista */}
          <ul className="lg:col-span-7 lg:pt-10">
            {rest.map((post, i) => (
              <li key={post.slug} className="border-b border-border">
                <Reveal delay={Math.min(i, 4) * 0.05}>
                  <Link
                    to={`/blogg/${post.slug}`}
                    className="group relative flex items-start gap-6 overflow-hidden py-7"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-0 bg-secondary/60 transition-[width] duration-500 ease-out group-hover:w-full"
                    />
                    <span className="relative w-10 shrink-0 pt-1 text-[12px] font-bold tabular-nums tracking-[0.2em] text-muted-foreground/70">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <span className="relative flex-1">
                      <span className="block font-display text-[1.3rem] font-bold leading-snug tracking-[-0.025em] text-foreground transition-colors group-hover:text-primary">
                        {post.title}
                      </span>
                      <span className="mt-2 block text-[16px] leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </span>
                      <span className="mt-3 block text-[12px] font-bold uppercase tracking-[0.18em] text-accent">
                        {post.readTime} läsning
                      </span>
                    </span>
                    <ArrowUpRight
                      className="relative mt-1 h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      aria-hidden="true"
                    />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default GuidesTeaser;
