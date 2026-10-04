import { Anchor, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { locationIndex as locations } from "@/data/location-index";
import { regionIntros, regionOrder } from "@/data/regions";

const areas = regionOrder
  .filter((region) => locations.some((l) => l.region === region))
  .map((region) => ({
    region,
    locations: locations.filter((l) => l.region === region),
    description: regionIntros[region] ?? "",
  }));

/* Marin geografisektion: teal fält, vit sifferpanel och regioner som sjökortsrader */
const ServiceArea = () => {
  return (
    <section id="omraden" className="bg-marine py-20 text-marine-foreground lg:py-28" aria-labelledby="area-heading">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-16">
          <div className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
                Vart finns vi
              </p>
              <h2
                id="area-heading"
                className="mt-6 font-display text-[clamp(1.9rem,3.2vw,2.8rem)] font-bold leading-[1.14]"
              >
                Från Stockholms innerstad till{" "}
                <span className="italic text-accent">ytterskärgårdens öar.</span>
              </h2>
              <p className="mt-6 text-[17px] font-light leading-relaxed text-marine-foreground/80">
                Vi utför takbyte, takrenovering, takvård och plåtarbeten i {areas.length} områden i
                Roslagen och hela Storstockholm. Vi tar också uppdrag i skärgården och har gjort
                kompletta takbyten på Blidö och Singö.
              </p>


              <div className="mt-10 bg-card p-8 text-foreground shadow-[0_30px_70px_-50px_rgba(12,35,64,0.7)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Verksamhetsområde
                </p>
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="font-display text-6xl font-bold tabular-nums leading-none text-accent">
                    {areas.length}
                  </span>
                  <span className="font-display text-xl font-semibold text-foreground">
                    områden
                  </span>
                </div>
                <p className="mt-5 text-[15px] font-light leading-relaxed text-muted-foreground">
                  Samma arbetssätt: kostnadsfri takkontroll och fast pris i offerten.
                </p>
                <p className="mt-6 border-t border-border pt-5 text-[14px] leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">Hus på en ö?</span> Vi tar uppdrag i
                  skärgården. Förutsättningarna går vi igenom vid den kostnadsfria takkontrollen.
                </p>

              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            {areas.map((area, i) => (
              <div
                key={area.region}
                className="border-t border-marine-foreground/20 py-9 last:border-b"
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-display text-[12px] tabular-nums tracking-[0.24em] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="flex items-center gap-3 font-display text-[clamp(1.35rem,2vw,1.8rem)] font-bold leading-tight">
                      <Anchor className="h-5 w-5 text-accent" aria-hidden="true" />
                      {area.region}
                    </h3>
                    <p className="mt-3 max-w-2xl text-[16px] font-light leading-relaxed text-marine-foreground/80">
                      {area.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[14px] text-marine-foreground/70">
                      {area.locations.map((place) => (
                        <li key={place.slug}>
                          <Link
                            to={`/taklaggare-${place.slug}`}
                            className="underline decoration-marine-foreground/25 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                          >
                            {place.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
            <Link
              to="/omraden"
              className="mt-9 inline-flex items-center gap-2 text-[15px] font-semibold text-accent transition-colors hover:text-marine-foreground"
            >
              Se alla orter vi arbetar i
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* SEO-text i ljus panel som bryter det marina fältet */}
        <div className="mt-16 bg-card px-6 py-12 text-foreground shadow-[0_40px_90px_-60px_rgba(12,35,64,0.8)] sm:px-12 lg:mt-20 lg:px-16 lg:py-16">
          <div className="grid grid-cols-12 gap-y-8 lg:gap-16">
            <div className="col-span-12 lg:col-span-4">
              <span
                aria-hidden="true"
                className="mb-6 block h-1 w-12 bg-accent"
              />
              <h3 className="font-display text-[clamp(1.4rem,2vw,1.9rem)] font-bold leading-snug text-foreground">
                Din lokala takläggare i Roslagen
              </h3>
            </div>
            <div className="col-span-12 space-y-5 text-[16px] font-light leading-relaxed text-marine lg:col-span-8 lg:columns-2 lg:gap-10 lg:space-y-0 [&>p]:mb-5">
              <p>
                Behöver du en <strong className="font-semibold">takläggare i Roslagen</strong> eller <strong className="font-semibold">takläggare i Stockholm</strong>? RoslagsTak utför alla typer av takarbeten — från
                <strong className="font-semibold"> takbyte på Blidö</strong> och <strong className="font-semibold">takrenovering på Ljusterö</strong> till
                <strong className="font-semibold"> takomläggning i Norrtälje</strong> och <strong className="font-semibold">plåttak på Yxlan</strong>. Vi tar också uppdrag
                på <strong className="font-semibold">öar i norra skärgården</strong>.
              </p>
              <p>
                Vi tar uppdrag för <strong className="font-semibold">takbyte på öar i skärgården</strong>,
                till exempel på Husarö, Finnhamn och Ingmarsö, liksom Svartlöga, Söderöra, Norröra,
                Humlö och Gräskö.
                Högmarsö och Arholma tillhör också vårt verksamhetsområde, liksom Furusund, Rådmansö och Vätö.
              </p>
              <p>
                Längs kusten arbetar vi i Spillersboda, Bergshamra och Svartnö. På Väddö och upp mot
                Singö, Grisslehamn och Arholma tar vi också uppdrag. I Vaxholm och Norrtälje tar
                vi uppdrag på villor, fritidshus och radhus.
              </p>
              <p>
                I <strong className="font-semibold">hela Storstockholm</strong> — från <strong className="font-semibold">takbyte i Solna</strong> och <strong className="font-semibold">bandtäckning i Danderyd</strong> till
                <strong className="font-semibold"> takrenovering i Nacka</strong> och <strong className="font-semibold">plåttak i Bromma</strong> — är vi din takläggare. Vi arbetar i Stockholm stad och Södermalm, Östermalm,
                Kungsholmen och Vasastan; norrort i Solna, Sundbyberg, Danderyd, Sollentuna och Upplands Väsby; nordväst i Järfälla, Upplands-Bro och Sigtuna; västerort i Bromma, Hässelby, Vällingby och Spånga;
                österut på Lidingö, i Nacka och Värmdö; sydöst i Tyresö, Haninge, Vendelsö, Vega och Nynäshamn; söderut i Huddinge, Älvsjö, Enskede, Farsta, Skarpnäck och Skärholmen; samt sydväst på Ekerö och i Botkyrka, Salem och Södertälje.
              </p>
              <p>
                Oavsett om du söker <strong className="font-semibold">takbyte i Stockholm</strong>, <strong className="font-semibold">takbyte i Roslagen</strong>, behöver en <strong className="font-semibold">takläggare på en ö utan bro</strong> eller
                vill ha en <strong className="font-semibold">takrenovering på Väddö</strong> — kontakta oss för en kostnadsfri takkontroll. Vi återkopplar inom 24 timmar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
