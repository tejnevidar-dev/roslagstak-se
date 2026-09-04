import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin, Anchor, ArrowRight, Phone } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedLinks from "@/components/RelatedLinks";
import GoogleReviews from "@/components/GoogleReviews";
import JsonLd from "@/components/JsonLd";
import { locationIndex } from "@/data/location-index";
import { regionBySlug, regionIntros, regionLongText, regionSlugs } from "@/data/regions";
import NotFound from "./NotFound";

/** Hubbsida per område: /omraden/<region-slug> — samlar ortsidorna i regionen. */
const RegionPage = () => {
  const { region: regionSlug } = useParams<{ region: string }>();
  const region = regionSlug ? regionBySlug(regionSlug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [regionSlug]);

  if (!region) return <NotFound />;

  const path = `/omraden/${regionSlugs[region]}`;
  const places = locationIndex.filter((l) => l.region === region);
  const paragraphs = regionLongText[region] ?? [];
  const intro = regionIntros[region] ?? "";

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Orter i ${region} där RoslagsTak utför takarbeten`,
    numberOfItems: places.length,
    itemListElement: places.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Takläggare ${l.isIsland ? "på" : "i"} ${l.name}`,
      url: `https://roslagstak.se/taklaggare-${l.slug}`,
    })),
  };

  return (
    <>
      <SEOHead
        title={`Takläggare i ${region} — takbyte & takrenovering`}
        description={`Takläggare i ${region}: takbyte, takomläggning, plåtarbeten och takvård i ${places.length} orter. Kostnadsfri besiktning, fast pris och 10 års garanti.`}
        canonical={`https://roslagstak.se${path}`}
      />
      <JsonLd data={itemListSchema} />
      <Header />
      <main className="pt-24 pb-20">
        <Breadcrumbs
          items={[
            { name: "Startsidan", path: "/" },
            { name: "Områden", path: "/omraden" },
            { name: region, path },
          ]}
        />

        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl py-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
              <MapPin className="h-3 w-3" aria-hidden="true" /> {region}
            </span>
            <h1 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.1] text-foreground">
              Takläggare i {region}
            </h1>
            {intro && (
              <p className="mt-6 text-lg font-light leading-relaxed text-muted-foreground">{intro}</p>
            )}
            <a
              href="tel:+46701543639"
              className="mt-8 inline-flex items-center gap-2 bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> 070-154 36 39
            </a>
          </div>

          {paragraphs.length > 0 && (
            <section className="max-w-3xl border-t border-border pt-10">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Takens förutsättningar i {region}
              </h2>
              {paragraphs.map((p) => (
                <p key={p} className="mt-4 text-[16px] font-light leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </section>
          )}

          <section className="mt-14" aria-labelledby="orter">
            <h2
              id="orter"
              className="flex items-center gap-3 font-display text-2xl font-bold text-foreground"
            >
              <Anchor className="h-5 w-5 text-accent" aria-hidden="true" />
              Orter i {region}
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {places.map((place) => (
                <li key={place.slug}>
                  <Link
                    to={`/taklaggare-${place.slug}`}
                    className="group flex items-center justify-between gap-3 border border-border bg-card px-4 py-3 text-[15px] font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    <span>
                      Takläggare {place.isIsland ? "på" : "i"} {place.name}
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-14">
            <GoogleReviews variant="band" place={`i ${region}`} />
          </div>

          <RelatedLinks
            currentPath="/omraden"
            title="Nästa steg"
            intro="Priser, taktyper och hur ett takprojekt går till — oavsett vilken ort du bor i."
          />

          <p className="mt-10 text-sm text-muted-foreground">
            <Link to="/omraden" className="text-primary hover:underline">
              Se alla områden i Roslagen och Storstockholm
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RegionPage;
