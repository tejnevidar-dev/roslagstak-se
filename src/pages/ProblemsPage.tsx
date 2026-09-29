import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import { problems, SAKERHETSRUTA } from "@/data/problems";

/* Marknadschefens instruktion 2026-09-29: hubb + 3 sidor publicerades först och verifierades live
   (build/validate/sitemap/link-audit gröna, 0 dubbletter/0 trasiga länkar). Nu publiceras resten. */
const published = problems;

const ProblemsPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Vanliga takproblem",
    url: "https://roslagstak.se/takproblem",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: published.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://roslagstak.se/takproblem/${p.slug}`,
        name: p.title,
      })),
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startsidan", item: "https://roslagstak.se/" },
      { "@type": "ListItem", position: 2, name: "Takproblem", item: "https://roslagstak.se/takproblem" },
    ],
  };

  return (
    <>
      <SEOHead
        title="Takproblem – tecken, orsaker och vad du gör"
        description="Läcker taket, mossa, fukt på vinden eller istappar? Här är de vanligaste takproblemen, hur du känner igen dem och när det är dags att ringa en takläggare."
        canonical="https://roslagstak.se/takproblem"
      />
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <div className="pt-24">
          <Breadcrumbs items={[{ name: "Hem", path: "/" }, { name: "Takproblem" }]} withSchema={false} />
        </div>
        <PageHero
          compact
          eyebrow="Takproblem"
          title="Vanliga takproblem – så känner du igen dem"
          text="Ett tak säger sällan ifrån förrän skadan har pågått ett tag. Här har vi samlat de vanligaste takproblemen villaägare upptäcker: hur de visar sig, vad de brukar bero på, vad du kan göra själv och när det är dags att låta en takläggare titta. Gå aldrig upp på taket själv — titta från marken och från vinden."
        />
        <div className="container mx-auto px-4 py-14">
          <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
            {published.map((p) => (
              <Link
                key={p.slug}
                to={`/takproblem/${p.slug}`}
                className="group flex flex-col gap-2 rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-muted/40"
              >
                <h2 className="font-display text-lg text-card-foreground">{p.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{p.intro}</p>
                <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Läs mer
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-secondary/40 p-6 text-center">
            <p className="text-[15px] leading-relaxed text-foreground">{SAKERHETSRUTA}</p>
          </div>

          <div className="mx-auto mt-8 max-w-3xl rounded-2xl bg-primary p-8 text-center text-primary-foreground">
            <p className="leading-relaxed">
              Osäker på vad du ser? Boka en kostnadsfri takkontroll utan förpliktelser. En av våra säljare
              går upp på taket, och behöver något göras får du ett fast pris. Vi arbetar enligt AMA och
              lämnar 10 års utförandegaranti.
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
      </main>
      <Footer />
    </>
  );
};

export default ProblemsPage;
