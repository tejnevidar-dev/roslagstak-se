import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import Reveal from "@/components/Reveal";
import roofMacro from "@/assets/roof-layers-macro.jpg";

/* Guider i nautisk asymmetri: roterat uppslag till vänster, hairline-lista till höger */
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
    <section id="guider" className="bg-card py-20 lg:py-28" aria-labelledby="guides-heading">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-12 items-end gap-8">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
              Guider &amp; råd
            </p>
            <h2
              id="guides-heading"
              className="mt-5 font-display text-[clamp(1.9rem,3.2vw,2.8rem)] font-bold leading-[1.15] text-foreground"
            >
              Kunskap om tak —{" "}
              <span className="italic text-accent">skrivet av takläggare.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:text-right">
            <Link
              to="/blogg"
              className="inline-flex items-center gap-3 text-[17px] font-semibold text-foreground underline decoration-seafoam decoration-2 underline-offset-[6px] hover:text-accent"
            >
              Se alla guider <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-12 gap-10 lg:gap-16">
          {lead && (
            <Reveal className="col-span-12 lg:col-span-5">
              <Link to={`/blogg/${lead.slug}`} className="group block">
                <figure className="relative m-0 rotate-1 overflow-hidden border-[10px] border-background bg-secondary shadow-[0_40px_90px_-55px_rgba(12,35,64,0.75)]">
                  <img
                    src={roofMacro}
                    alt="Närbild på takkonstruktion med läkt och pannor"
                    width={900}
                    height={675}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <figcaption className="absolute bottom-0 left-0 bg-primary px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-seafoam">
                    Mest läst · {lead.readTime} läsning
                  </figcaption>
                </figure>
                <h3 className="mt-8 font-display text-[clamp(1.4rem,2.1vw,1.9rem)] font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
                  {lead.title}
                </h3>
                <p className="mt-4 text-[17px] font-light leading-relaxed text-muted-foreground">
                  {lead.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-display text-[16px] italic text-accent">
                  Läs guiden
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          )}

          <ul className="col-span-12 lg:col-span-6 lg:col-start-7">
            {rest.map((post, i) => (
              <li key={post.slug} className="border-t border-border last:border-b">
                <Reveal delay={Math.min(i, 4) * 0.05}>
                  <Link
                    to={`/blogg/${post.slug}`}
                    className="group relative flex items-start gap-6 overflow-hidden py-7"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-0 bg-secondary/70 transition-[width] duration-500 ease-out group-hover:w-full"
                    />
                    <span className="relative w-10 shrink-0 pt-1 font-display text-[12px] tabular-nums tracking-[0.24em] text-accent">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <span className="relative flex-1">
                      <span className="block font-display text-[1.3rem] font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
                        {post.title}
                      </span>
                      <span className="mt-2 block text-[16px] font-light leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </span>
                      <span className="mt-3 block text-[10px] font-semibold uppercase tracking-[0.24em] text-marine">
                        {post.readTime} läsning
                      </span>
                    </span>
                    <ArrowUpRight
                      className="relative mt-1 h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
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
