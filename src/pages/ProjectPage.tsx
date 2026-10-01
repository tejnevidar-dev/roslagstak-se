import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, MapPin, Layers, CalendarDays } from "lucide-react";
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
};

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;

  if (!project) return <NotFound />;

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
        description={project.summary}
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

          <div className="mt-8 overflow-hidden rounded-2xl border border-border">
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
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                <Layers className="h-4 w-4" aria-hidden="true" /> Material
              </p>
              <p className="mt-2 text-sm text-foreground">{project.material}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.materialSlugs.map((slug) => {
                  const m = materials.find((mat) => mat.slug === slug);
                  if (!m) return null;
                  return (
                    <Link
                      key={slug}
                      to={m.href}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                      {m.title} <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                <CalendarDays className="h-4 w-4" aria-hidden="true" /> Utfört
              </p>
              <p className="mt-2 text-sm text-foreground">{project.period}</p>
            </div>
            <Link
              to={`/tjanster/${project.serviceSlug}`}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-muted/40"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Tjänst</p>
              <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                {project.serviceName}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </div>

          <div className="mt-10 space-y-5">
            {project.description.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-muted-foreground">
                {renderInline(paragraph)}
              </p>
            ))}
          </div>

          {project.gallery.length > 0 && (
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {project.gallery.map((img) => (
                <div key={img.src} className="overflow-hidden rounded-2xl border border-border">
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
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              to={`/taklaggare-${project.locationSlug}`}
              className="inline-flex items-center gap-2 rounded-full border border-primary/25 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Takläggare i {project.locationName}
            </Link>
            <Link
              to="/offert"
              className="inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-semibold text-cta-foreground transition-colors hover:bg-cta/90"
            >
              Begär kostnadsfri offert <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
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
