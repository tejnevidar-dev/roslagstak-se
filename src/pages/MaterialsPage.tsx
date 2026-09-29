import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import { materials } from "@/data/materials";

const MaterialsPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Takmaterial",
    url: "https://roslagstak.se/material",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: materials.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://roslagstak.se${m.href}`,
        name: m.title,
      })),
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startsidan", item: "https://roslagstak.se/" },
      { "@type": "ListItem", position: 2, name: "Material", item: "https://roslagstak.se/material" },
    ],
  };

  return (
    <>
      <SEOHead
        title="Takmaterial – betongpannor, lertegel, plåt och falsat"
        description="Jämför takmaterial: betongpannor, lertegel, TP20-plåt och dubbelfalsat plåttak. Vikt, synliga skruvar och vad som passar ditt hus."
        canonical="https://roslagstak.se/material"
      />
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <div className="pt-24">
          <Breadcrumbs items={[{ name: "Hem", path: "/" }, { name: "Material" }]} withSchema={false} />
        </div>
        <PageHero
          compact
          eyebrow="Material"
          title="Takmaterial – vad passar ditt hus?"
          text="Betongpannor, lertegel, plåt eller falsat — materialet avgör utseende, vikt och underhåll. Här går vi igenom vad som skiljer dem åt, utan påhittade livslängder eller priser."
        />
        <div className="container mx-auto px-4 py-14">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {materials.map((m) => (
              <Link
                key={m.slug}
                to={m.href}
                className="group flex flex-col gap-2 rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-muted/40"
              >
                <h2 className="font-display text-lg text-card-foreground">{m.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{m.hubDescription}</p>
                <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Läs mer
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-3xl overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <caption className="mb-3 text-left text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Jämförelse
              </caption>
              <thead>
                <tr className="border-b border-border text-left text-foreground">
                  <th className="py-2 pr-4 font-semibold">Material</th>
                  <th className="py-2 pr-4 font-semibold">Vikt</th>
                  <th className="py-2 pr-4 font-semibold">Synliga skruvar</th>
                  <th className="py-2 font-semibold">Lägsta lutning</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((m) => (
                  <tr key={m.slug} className="border-b border-border text-muted-foreground">
                    <td className="py-2 pr-4 font-medium text-foreground">{m.title}</td>
                    <td className="py-2 pr-4">{m.weight}</td>
                    <td className="py-2 pr-4">{m.visibleScrews}</td>
                    <td className="py-2">{m.minLutning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mx-auto mt-8 max-w-3xl rounded-2xl bg-primary p-8 text-center text-primary-foreground">
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
      </main>
      <Footer />
    </>
  );
};

export default MaterialsPage;
