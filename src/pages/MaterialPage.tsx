import { useParams, Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedLinks from "@/components/RelatedLinks";
import NotFound from "@/pages/NotFound";
import { getMaterial, type MaterialDetail } from "@/data/materials";
import { getProjectsByMaterial } from "@/data/projects";

const sections: { key: keyof MaterialDetail; heading: string }[] = [
  { key: "funktion", heading: "Funktion" },
  { key: "anvandning", heading: "Användning" },
  { key: "livslangd", heading: "Livslängd" },
  { key: "fordelar", heading: "Fördelar" },
  { key: "nackdelar", heading: "Nackdelar" },
  { key: "passarNar", heading: "Passar när" },
  { key: "underhall", heading: "Underhåll" },
  { key: "vanligaFel", heading: "Vanliga fel" },
  { key: "delAvTaksystemet", heading: "Del av taksystemet" },
];

const MaterialPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const material = slug ? getMaterial(slug) : undefined;

  if (!material || !material.detail) return <NotFound />;
  const { detail } = material;
  const relatedProjects = getProjectsByMaterial(material.slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startsidan", item: "https://roslagstak.se/" },
      { "@type": "ListItem", position: 2, name: "Material", item: "https://roslagstak.se/material" },
      { "@type": "ListItem", position: 3, name: material.title, item: `https://roslagstak.se${material.href}` },
    ],
  };

  return (
    <>
      <SEOHead
        title={detail.metaTitle}
        description={detail.metaDescription}
        canonical={`https://roslagstak.se${material.href}`}
      />
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <div className="pt-24">
          <Breadcrumbs
            items={[
              { name: "Hem", path: "/" },
              { name: "Material", path: "/material" },
              { name: material.title },
            ]}
            withSchema={false}
          />
        </div>

        <div className="mx-auto max-w-3xl px-6 pt-6 pb-16">
          <h1 className="font-display text-3xl text-foreground md:text-4xl">{material.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{detail.intro}</p>

          <div className="mt-10 space-y-8">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="font-display text-xl text-foreground">{s.heading}</h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">{detail[s.key] as string}</p>
              </div>
            ))}
            <div>
              <h2 className="font-display text-xl text-foreground">Kostnadsdrivare</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {detail.kostnadsdrivare}{" "}
                <Link to="/priser" className="font-semibold text-primary hover:underline">
                  Se riktpriser på /priser
                </Link>
                .
              </p>
            </div>
          </div>

          {detail.hallIsar && (
            <div className="mt-8 rounded-2xl border border-border bg-secondary/40 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Håll isär</p>
              <p className="mt-2 text-[15px] leading-relaxed text-foreground">{detail.hallIsar}</p>
            </div>
          )}

          {detail.hosOss && (
            <div className="mt-8 rounded-2xl border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Hos oss</p>
              <p className="mt-2 leading-relaxed text-muted-foreground">{detail.hosOss}</p>
              {relatedProjects.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {relatedProjects.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/projekt/${p.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-primary/25 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                    >
                      {p.title} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mt-8 rounded-2xl bg-primary p-8 text-center text-primary-foreground">
            <p className="leading-relaxed">
              Vilket material som passar ditt hus beror på taket, lutningen, huset och uttrycket du vill ha. Boka en
              kostnadsfri takkontroll utan förpliktelser. Vi går upp på taket, och sedan får du ett fast pris för det
              material du väljer.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link
                to="/takkontroll"
                className="inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-semibold text-cta-foreground transition-colors hover:bg-cta/90"
              >
                Boka kostnadsfri takkontroll <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="tel:0701543639"
                className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/40 px-6 py-3 text-sm font-semibold transition-colors hover:bg-primary-foreground/10"
              >
                <Phone className="h-4 w-4" aria-hidden="true" /> 070-154 36 39
              </a>
            </div>
          </div>
        </div>

        <RelatedLinks
          currentPath={material.href}
          title="Fler material"
          extraLinks={[{ to: "/material", label: "Alla material", description: "Jämför betongpannor, lertegel, plåt och falsat." }]}
        />
      </main>
      <Footer />
    </>
  );
};

export default MaterialPage;
