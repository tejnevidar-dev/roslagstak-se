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
import { regionTexts } from "@/data/region-texts";
import { isHeading, renderInline } from "@/lib/inline-md";
import NotFound from "./NotFound";
import { villaAreasByPage, VILLA_AREAS_SOURCE } from "@/data/villa-areas";

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
  const text = regionTexts[region];
  const intro = text?.intro ?? regionIntros[region] ?? "";

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
        title={text?.title ?? `Takläggare i ${region} — takbyte & takrenovering`}
        description={text?.description ?? `Takläggare i ${region}: takbyte, takomläggning, plåtarbeten och takvård i ${places.length} orter. Kostnadsfri takkontroll, fast pris och 10 års utförandegaranti.`}
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
              {text?.h1 ?? `Takläggare i ${region}`}
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

          {text && (
            <section className="max-w-3xl border-t border-border pt-10">
              {text.body.map((p, i) =>
                isHeading(p) ? (
                  <h2 key={i} className="mt-10 font-display text-2xl font-bold text-foreground first:mt-0">
                    {p.slice(3)}
                  </h2>
                ) : (
                  <p key={i} className="mt-4 text-[16px] font-light leading-relaxed text-muted-foreground">
                    {renderInline(p)}
                  </p>
                ),
              )}
            </section>
          )}

          {!text && paragraphs.length > 0 && (
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

          <div className="max-w-3xl">
                {/* Villaområden i kommunen (villaområden våg 0, #1m) — samma <dl>-stil som faktarutan */}
                {villaAreasByPage[regionSlugs[region]] && (
                  <section aria-labelledby="villaomraden">
                    <h3 id="villaomraden" className="mt-10 font-display text-xl text-foreground mb-3">
                      Villaområden i {villaAreasByPage[regionSlugs[region]].municipality}
                    </h3>
                    <dl className="mb-3 grid gap-x-6 gap-y-3 rounded-2xl border border-border bg-card p-5 sm:grid-cols-2">
                      {villaAreasByPage[regionSlugs[region]].areas.map((area) => (
                        <div key={area.name}>
                          <dt className="text-xs font-semibold uppercase tracking-wider text-primary">
                            {area.href ? (
                              <Link to={area.href} className="underline underline-offset-4 hover:no-underline">
                                {area.name}
                              </Link>
                            ) : (
                              area.name
                            )}
                          </dt>
                          <dd className="text-sm text-muted-foreground">
                            {area.note ?? `${area.types}. ${area.period}.`}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mb-6 text-xs text-muted-foreground">{VILLA_AREAS_SOURCE}</p>
                  </section>
                )}
          </div>

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
