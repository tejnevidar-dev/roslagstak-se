import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, MapPin, Layers, CalendarDays, Ruler, Phone } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { renderInline } from "@/lib/inline-md";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedLinks from "@/components/RelatedLinks";
import NotFound from "@/pages/NotFound";
import { getProject } from "@/data/projects";
import { materials } from "@/data/materials";

/* Stabila sökvägar under public/og/ (kopior av samma foton som heroImage) för og:image/
   twitter:image — Vite-hashade importsökvägar duger inte där, se prerender-content.ts som
   sätter samma bild i den statiska HTML:en (SEO-audit P2, 2026-09-29). */
const OG_IMAGES: Record<string, string> = {
  "takrenovering-blido": "/og/project-blido-hero.jpg",
  "takbyte-singo": "/og/project-singo-hero.jpg",
  "takbyte-grisslehamn": "/og/project-grisslehamn-hero.jpg",
};

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;

  if (!project) return <NotFound />;

  // Beskrivningen delas i sektioner efter fetstilta ledord ("**Råsponten.** …"). Ingen text skrivs här, bara ordning och rubriker.
  const placeShort = project.locationName.split(",")[0];
  const parts = project.description.map((p) => {
    const m = p.match(/^\*\*(.+?)\.\*\*\s*([\s\S]*)$/);
    return m ? { lead: m[1], body: m[2] } : { lead: null as string | null, body: p };
  });
  const intro = parts[0] && parts[0].lead === null ? parts[0] : null;
  const rest = parts.slice(intro ? 1 : 0);
  const SPECIAL = new Set(["Så jobbar vi", "Så arbetar vi", "Tre jobb att jämföra", "Fler jobb", "Vad som ingick"]);
  const included = rest.filter((p) => p.lead && !SPECIAL.has(p.lead));
  const includedNote = rest.find((p) => p.lead === "Vad som ingick");
  const compare = rest.find((p) => p.lead === "Tre jobb att jämföra");
  const process = rest.find((p) => p.lead === "Så jobbar vi" || p.lead === "Så arbetar vi");
  const moreJobs = rest.find((p) => p.lead === "Fler jobb");
  const closing = rest.filter((p) => !p.lead);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startsidan", item: "https://roslagstak.se/" },
      { "@type": "ListItem", position: 2, name: "Referensjobb", item: "https://roslagstak.se/projekt" },
      { "@type": "ListItem", position: 3, name: project.title, item: `https://roslagstak.se/projekt/${project.slug}` },
    ],
  };

  return (
    <>
      <SEOHead
        title={`${project.title} — referensjobb`}
        description={project.metaDescription ?? project.summary}
        canonical={`https://roslagstak.se/projekt/${project.slug}`}
        type="article"
        image={OG_IMAGES[project.slug]}
        imageAlt={project.heroAlt}
      />
      <Helmet>
        {/* LCP-bilden (#1h/#1k): förladdar rätt AVIF-storlek innan React hunnit rendera <picture>. */}
        <link
          rel="preload"
          as="image"
          // @ts-expect-error -- imagesrcset/imagesizes stöds av moderna browsers men saknas i React:s typer
          imagesrcset={project.heroResponsive.avifSrcSet}
          imagesizes="(min-width: 1024px) 896px, 100vw"
        />
      </Helmet>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <div className="pt-24">
          <Breadcrumbs
            items={[
              { name: "Hem", path: "/" },
              { name: "Referensjobb", path: "/projekt" },
              { name: project.title },
            ]}
            withSchema={false}
          />
        </div>

        <div className="mx-auto max-w-5xl px-6 pt-8">
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {project.locationName}
          </p>
          <h1 className="mt-3 font-display text-3xl text-foreground md:text-4xl">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{project.summary}</p>

          <figure className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
            <picture>
              <source type="image/avif" srcSet={project.heroResponsive.avifSrcSet} sizes="(min-width: 1024px) 896px, 100vw" />
              <source type="image/webp" srcSet={project.heroResponsive.webpSrcSet} sizes="(min-width: 1024px) 896px, 100vw" />
              <img
                src={project.heroImage}
                alt={project.heroAlt}
                width={project.heroResponsive.width}
                height={project.heroResponsive.height}
                fetchPriority="high"
                decoding="async"
                className="w-full object-cover"
              />
            </picture>
            <figcaption className="px-5 py-3 text-sm text-muted-foreground">{project.heroCaption ?? project.heroAlt}</figcaption>
          </figure>

          {/* Faktaruta: samma rader på alla referensjobb. Yta och period visas bara när de är uppgivna. */}
          <dl className="mt-8 grid overflow-hidden rounded-2xl border border-border bg-card sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(11rem,1fr))]">
            <div className="border-b border-border p-5 lg:border-b-0 lg:border-r">
              <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                <MapPin className="h-4 w-4" aria-hidden="true" /> Ort
              </dt>
              <dd className="mt-2 text-sm text-foreground">
                <Link to={`/taklaggare-${project.locationSlug}`} className="font-semibold hover:underline">{placeShort}</Link>, Norrtälje kommun
              </dd>
            </div>
            <div className="border-b border-border p-5 lg:border-b-0 lg:border-r">
              <dt className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Jobb</dt>
              <dd className="mt-2 text-sm text-foreground">
                <Link to={`/tjanster/${project.serviceSlug}`} className="inline-flex items-center gap-1.5 font-semibold hover:underline">
                  {project.serviceName} <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </dd>
            </div>
            {project.area && (
              <div className="border-b border-border p-5 lg:border-b-0 lg:border-r">
                <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  <Ruler className="h-4 w-4" aria-hidden="true" /> Yta
                </dt>
                <dd className="mt-2 text-sm text-foreground">{project.area}</dd>
              </div>
            )}
            <div className="border-b border-border p-5 lg:border-b-0 lg:border-r">
              <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                <Layers className="h-4 w-4" aria-hidden="true" /> Material
              </dt>
              <dd className="mt-2 text-sm text-foreground">{project.material}</dd>
              <dd className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                {project.materialSlugs.map((slug) => {
                  const m = materials.find((mat) => mat.slug === slug);
                  if (!m) return null;
                  return (
                    <Link key={slug} to={m.href} className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                      {m.title} <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  );
                })}
              </dd>
            </div>
            {project.facts?.map((fact) => (
              <div key={fact.label} className="border-b border-border p-5 lg:border-b-0 lg:border-r">
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{fact.label}</dt>
                <dd className="mt-2 text-sm text-foreground">{fact.value}</dd>
              </div>
            ))}
            {project.period && (
              <div className="p-5">
                <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" /> Utfört
                </dt>
                <dd className="mt-2 text-sm text-foreground">{project.period}</dd>
              </div>
            )}
          </dl>

          {intro && (
            <section className="mt-12" aria-labelledby="om-jobbet">
              <h2 id="om-jobbet" className="font-display text-2xl text-foreground">Om jobbet</h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{renderInline(intro.body)}</p>
            </section>
          )}

          {(included.length > 0 || includedNote) && (
            <section className="mt-12" aria-labelledby="vad-som-ingick">
              <h2 id="vad-som-ingick" className="font-display text-2xl text-foreground">Vad som ingick</h2>
              {includedNote && <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{renderInline(includedNote.body)}</p>}
              {included.length > 0 && (
                <ul className="mt-6 grid gap-4 md:grid-cols-2">
                  {included.map((p) => (
                    <li key={p.lead} className="rounded-2xl border border-border bg-card p-5">
                      <h3 className="font-display text-lg text-card-foreground">{p.lead}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{renderInline(p.body)}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {project.gallery.length > 0 && (
            <section className="mt-12" aria-labelledby="bilder">
              <h2 id="bilder" className="font-display text-2xl text-foreground">Bilder från jobbet</h2>
              <div className="mt-6 space-y-6">
                {project.gallery.map((img) => (
                  <figure key={img.src} className="overflow-hidden rounded-2xl border border-border bg-card">
                    <picture>
                      {img.webp && <source type="image/webp" srcSet={img.webp} />}
                      <img
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        loading="lazy"
                        decoding="async"
                        className="h-auto w-full object-cover"
                      />
                    </picture>
                    <figcaption className="px-5 py-3 text-sm text-muted-foreground">{img.alt}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          {compare && (
            <section className="mt-12" aria-labelledby="jamfor">
              <h2 id="jamfor" className="font-display text-2xl text-foreground">{compare.lead}</h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{renderInline(compare.body)}</p>
            </section>
          )}

          {process && (
            <section className="mt-12" aria-labelledby="sa-jobbar-vi">
              <h2 id="sa-jobbar-vi" className="font-display text-2xl text-foreground">{process.lead}</h2>
              <div className="mt-4 max-w-3xl space-y-4">
                {process.body.split("\n\n").map((para, i) => (
                  <p key={i} className="leading-relaxed text-muted-foreground">{renderInline(para)}</p>
                ))}
              </div>
            </section>
          )}

          {moreJobs && (
            <section className="mt-12" aria-labelledby="fler-jobb">
              <h2 id="fler-jobb" className="font-display text-2xl text-foreground">{moreJobs.lead}</h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{renderInline(moreJobs.body)}</p>
            </section>
          )}

          {closing.length > 0 && (
            <div className="mt-8 max-w-3xl space-y-4">
              {closing.map((p, i) => (
                <p key={i} className="leading-relaxed text-muted-foreground">{renderInline(p.body)}</p>
              ))}
            </div>
          )}

          {/* Bokning */}
          <section className="mt-12 rounded-2xl bg-primary p-8 text-primary-foreground md:p-10" aria-labelledby="boka">
            <h2 id="boka" className="font-display text-2xl">Boka en kostnadsfri takkontroll utan förpliktelser</h2>
            <p className="mt-3 max-w-xl text-primary-foreground/80">Svar inom 24 timmar.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/takkontroll"
                className="inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-semibold text-cta-foreground transition-colors hover:bg-cta/90"
              >
                Boka takkontroll <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="tel:+46701543639"
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                <Phone className="h-4 w-4" aria-hidden="true" /> Ring 070-154 36 39
              </a>
              <Link
                to={`/taklaggare-${project.locationSlug}`}
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                Takläggare i {placeShort}
              </Link>
              <Link
                to="/takbyte-norrtalje"
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                Byta tak i Norrtälje
              </Link>
            </div>
          </section>
        </div>

        <div className="mt-16">
          <RelatedLinks
            currentPath={`/projekt/${project.slug}`}
            title="Fler projekt och tjänster"
            extraLinks={[{ to: "/projekt", label: "Alla referensjobb", description: "Fler riktiga takprojekt vi utfört." }]}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProjectPage;
