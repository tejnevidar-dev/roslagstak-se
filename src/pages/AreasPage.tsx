import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Anchor, ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedLinks from "@/components/RelatedLinks";
import JsonLd from "@/components/JsonLd";
import { locationIndex } from "@/data/location-index";
import { regionOrder, regionIntros } from "@/data/regions";

const AreasPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const groups = regionOrder
    .map((region) => ({
      region,
      intro: regionIntros[region] ?? "",
      places: locationIndex.filter((l) => l.region === region),
    }))
    .filter((g) => g.places.length > 0);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Orter där RoslagsTak utför takarbeten",
    numberOfItems: locationIndex.length,
    itemListElement: locationIndex.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Takläggare ${l.isIsland ? "på" : "i"} ${l.name}`,
      url: `https://roslagstak.se/taklaggare-${l.slug}`,
    })),
  };

  return (
    <>
      <SEOHead
        title="Områden — takläggare i Roslagen & Storstockholm"
        description={`Takläggare i ${locationIndex.length} orter i Roslagen och Storstockholm. Välj din ort för priser, taktyper och kostnadsfri besiktning med fast pris.`}
        canonical="https://roslagstak.se/omraden"
      />
      <JsonLd data={itemListSchema} />
      <Header />
      <main className="pt-24 pb-20">
        <Breadcrumbs items={[{ name: "Startsidan", path: "/" }, { name: "Områden", path: "/omraden" }]} />

        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl py-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
              <MapPin className="h-3 w-3" aria-hidden="true" /> Verksamhetsområde
            </span>
            <h1 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.1] text-foreground">
              Takläggare i Roslagen och hela Storstockholm
            </h1>
            <p className="mt-6 text-lg font-light leading-relaxed text-muted-foreground">
              Vi utför takbyte, takomläggning, takrenovering, plåtarbeten och takvård i{" "}
              {locationIndex.length} orter — från ytterskärgårdens öar till Stockholms innerstad.
              Välj din ort nedan för lokala priser, vanliga taktyper och hur ett takprojekt går till
              just där.
            </p>
          </div>

          <div className="space-y-12 pb-10">
            {groups.map((group) => (
              <section key={group.region} aria-labelledby={`omrade-${group.region}`}>
                <h2
                  id={`omrade-${group.region}`}
                  className="flex items-center gap-3 font-display text-2xl font-bold text-foreground"
                >
                  <Anchor className="h-5 w-5 text-accent" aria-hidden="true" />
                  {group.region}
                </h2>
                {group.intro && (
                  <p className="mt-3 max-w-3xl text-[16px] font-light leading-relaxed text-muted-foreground">
                    {group.intro}
                  </p>
                )}
                <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.places.map((place) => (
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
            ))}
          </div>

          <RelatedLinks
            title="Nästa steg"
            links={[
              { to: "/priser", label: "Prislista per kvadratmeter", description: "Riktpriser för plåt, tegel och betongpannor." },
              { to: "/taktyper", label: "Jämför taktyper", description: "Livslängd, lutning och pris för varje material." },
              { to: "/hur-det-gar-till", label: "Så går ett takbyte till", description: "Från besiktning till slutkontroll, steg för steg." },
              { to: "/offert", label: "Kostnadsfri offert", description: "Fast pris efter besiktning på plats." },
            ]}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AreasPage;
