import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import RelatedLinks from "@/components/RelatedLinks";
import { projects } from "@/data/projects";

const ProjectsPage = () => {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startsidan", item: "https://roslagstak.se/" },
      { "@type": "ListItem", position: 2, name: "Referensjobb", item: "https://roslagstak.se/projekt" },
    ],
  };

  return (
    <>
      <SEOHead
        title="Referensjobb — riktiga takprojekt i Roslagen"
        description="Se riktiga takprojekt vi utfört i Roslagen och Storstockholm, med bilder och fakta om material, omfattning och plats."
        canonical="https://roslagstak.se/projekt"
      />
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <div className="pt-24">
          <Breadcrumbs items={[{ name: "Hem", path: "/" }, { name: "Referensjobb" }]} withSchema={false} />
        </div>
        <PageHero
          eyebrow="Referensjobb"
          title="Riktiga takprojekt i Roslagen"
          text="Här visar vi jobb vi har utfört, med kundens samtycke. Riktiga bilder, riktiga material."
        />
        <div className="container mx-auto px-4 pb-20 pt-4">
          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            {projects.map((p) => (
              <Link
                key={p.slug}
                to={`/projekt/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-[var(--shadow-elevated)]"
              >
                <img
                  src={p.heroImage}
                  alt={p.heroAlt}
                  loading="lazy"
                  className="h-56 w-full object-cover"
                />
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {p.locationName}
                  </p>
                  <h2 className="font-display text-xl text-card-foreground">{p.title}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Se projektet
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <RelatedLinks currentPath="/projekt" title="Läs vidare" />
      </main>
      <Footer />
    </>
  );
};

export default ProjectsPage;
