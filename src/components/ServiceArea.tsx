import { MapPin, Anchor } from "lucide-react";
import { Link } from "react-router-dom";

import { locations } from "@/data/locations";

const regionDescriptions: Record<string, string> = {
  "Norra skärgården":
    "Takbyte och takrenovering i ytterskärgården. Vi tar oss ut till öar dit andra inte når — med material, verktyg och erfarenhet.",
  "Mellersta skärgården":
    "Takläggare med lång erfarenhet av takprojekt på öar i mellersta Roslagen. Från sommarstugor till permanentboenden.",
  Kusten:
    "Takomläggning, takrenovering och plåtarbeten längs hela Roslagens kustlinje och på fastlandet runt Norrtälje.",
  "Norra Roslagen":
    "Takbyte, plåttak och takrenovering i Hallstavik, Älmsta, Herräng och norra Roslagen — material valt för hårt kustklimat.",
  Rådmansöhalvön:
    "Bandtäckning, plåttak och takbyte i Gräddö och Kapellskär, där vind och saltluft ställer högsta krav på infästningar.",
  "Roslagens inland":
    "Takomläggning och takbyte i Rimbo, Edsbro, Riala, Vallentuna och Täby — snölast, ventilation och taksäkerhet enligt gällande krav.",
  Österåker:
    "Takbyte, takomläggning och bandtäckning i Åkersberga och Österskär — från 70-talsvillor till komplexa tak med kupor och torn.",
  "Stockholms stad":
    "Takläggare i Stockholms innerstad — från Gamla stan och Södermalm till Östermalm, Kungsholmen och Vasastan. Takarbeten på kulturhistoriska tak och bostadsrättsfastigheter i tätbebyggda kvarter.",
  "Norra Stockholm":
    "Takbyte, takrenovering och plåtarbeten i Solna, Sundbyberg, Danderyd, Sollentuna och Upplands Väsby — norra Stockholms villabälte och bostadsrättsområden.",
  "Nordvästra Stockholm":
    "Takläggare i Järfälla, Upplands-Bro och Sigtuna — från miljonprogramstak till villatak och kulturhistorisk bebyggelse i Sigtuna.",
  Västerort:
    "Takbyte och takrenovering i Bromma, Hässelby, Vällingby och Spånga — västra Stockholms trädgårdsstäder och villaområden.",
  "Östra Stockholm":
    "Takläggare på Lidingö, i Nacka och Värmdö — östra Stockholms ö- och skärgårdskommuner med fukt- och vindkrav på takmaterial.",
  "Sydöstra Stockholm":
    "Takbyte och takrenovering i Tyresö, Haninge, Vendelsö, Vega och Nynäshamn — sydöstra Stockholms kust- och skärgårdsområden.",
  "Södra Stockholm":
    "Takläggare i Huddinge, Älvsjö, Enskede, Farsta, Skarpnäck och Skärholmen — södra Stockholms villor, radhus och bostadsrättsfastigheter.",
  "Sydvästra Stockholm":
    "Takbyte, takrenovering och plåtarbeten på Ekerö och i Botkyrka, Salem och Södertälje — sydvästra Stockholms sjönära och kommunala takprojekt.",
};

const regionOrder = [
  "Norra skärgården",
  "Mellersta skärgården",
  "Kusten",
  "Rådmansöhalvön",
  "Norra Roslagen",
  "Roslagens inland",
  "Österåker",
  "Stockholms stad",
  "Norra Stockholm",
  "Nordvästra Stockholm",
  "Västerort",
  "Östra Stockholm",
  "Sydöstra Stockholm",
  "Södra Stockholm",
  "Sydvästra Stockholm",
];

const areas = regionOrder
  .filter((region) => locations.some((l) => l.region === region))
  .map((region) => ({
    region,
    locations: locations.filter((l) => l.region === region).map((l) => l.name),
    description: regionDescriptions[region] ?? "",
  }));

const locationSlugMap: Record<string, string> = Object.fromEntries(
  locations.map((l) => [l.name, l.slug]),
);

const allLocations = areas.flatMap((a) => a.locations);

/* Marin geografisektion: teal fält, vit sifferpanel och regioner som sjökortsrader */
const ServiceArea = () => {
  return (
    <section id="omraden" className="bg-marine py-20 text-marine-foreground lg:py-28" aria-labelledby="area-heading">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-12 gap-10 lg:gap-16">
          <div className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-seafoam">
                Vart finns vi
              </p>
              <h2
                id="area-heading"
                className="mt-6 font-display text-[clamp(1.9rem,3.2vw,2.8rem)] font-bold leading-[1.14]"
              >
                Från kust till{" "}
                <span className="italic text-seafoam">ytterskärgård.</span>
              </h2>
              <p className="mt-6 text-[17px] font-light leading-relaxed text-marine-foreground/80">
                Vi utför takbyte, takrenovering och takomläggning på {allLocations.length}+ platser i
                Roslagens skärgård och längs kusten. Bor du på en ö utan bro tar vi oss dit sjövägen.
              </p>

              <dl className="mt-10 grid grid-cols-2 bg-card text-foreground shadow-[0_30px_70px_-50px_rgba(12,35,64,0.7)]">
                <div className="border-r border-border p-7">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    Orter
                  </dt>
                  <dd className="mt-2 font-display text-3xl font-bold tabular-nums text-accent">
                    {allLocations.length}+
                  </dd>
                </div>
                <div className="p-7">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    Områden
                  </dt>
                  <dd className="mt-2 font-display text-3xl font-bold tabular-nums text-accent">
                    {areas.length}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            {areas.map((area, i) => (
              <div
                key={area.region}
                className="border-t border-marine-foreground/20 py-9 last:border-b"
              >
                <div className="flex items-baseline gap-5">
                  <span className="font-display text-[12px] tabular-nums tracking-[0.24em] text-seafoam">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="flex items-center gap-3 font-display text-[clamp(1.35rem,2vw,1.8rem)] font-bold leading-tight">
                      <Anchor className="h-5 w-5 text-seafoam" aria-hidden="true" />
                      {area.region}
                    </h3>
                    <p className="mt-3 max-w-2xl text-[16px] font-light leading-relaxed text-marine-foreground/80">
                      {area.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                      {area.locations.map((loc) => {
                        const slug = locationSlugMap[loc];
                        return slug ? (
                          <Link
                            key={loc}
                            to={`/taklaggare-${slug}`}
                            className="group inline-flex items-center gap-1.5 text-[16px] font-semibold"
                          >
                            <MapPin className="h-3.5 w-3.5 text-seafoam" aria-hidden="true" />
                            <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-seafoam group-hover:text-seafoam">
                              {loc}
                            </span>
                          </Link>
                        ) : (
                          <span
                            key={loc}
                            className="inline-flex items-center gap-1.5 text-[16px] text-marine-foreground/70"
                          >
                            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                            {loc}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SEO-text i ljus panel som bryter det marina fältet */}
        <div className="mt-16 bg-card px-6 py-12 text-foreground shadow-[0_40px_90px_-60px_rgba(12,35,64,0.8)] sm:px-12 lg:mt-20 lg:px-16 lg:py-16">
          <div className="grid grid-cols-12 gap-8 lg:gap-16">
            <div className="col-span-12 lg:col-span-4">
              <span
                aria-hidden="true"
                className="mb-6 block h-1 w-12 bg-seafoam"
              />
              <h3 className="font-display text-[clamp(1.4rem,2vw,1.9rem)] font-bold leading-snug text-foreground">
                Din lokala takläggare i Roslagen
              </h3>
            </div>
            <div className="col-span-12 space-y-5 text-[16px] font-light leading-relaxed text-marine lg:col-span-8 lg:columns-2 lg:gap-10 lg:space-y-0 [&>p]:mb-5">
              <p>
                Behöver du en <strong className="font-semibold">takläggare i Roslagen</strong> eller <strong className="font-semibold">takläggare i Stockholm</strong>? RoslagsTak utför alla typer av takarbeten — från
                <strong className="font-semibold"> takbyte på Blidö</strong> och <strong className="font-semibold">takrenovering på Ljusterö</strong> till
                <strong className="font-semibold"> takomläggning i Norrtälje</strong> och <strong className="font-semibold">plåttak på Yxlan</strong>. Vi är den takläggare
                som tar sig ut till öar i hela norra skärgården — <strong className="font-semibold">även öar utan broförbindelse</strong>.
              </p>
              <p>
                Vi är specialiserade på <strong className="font-semibold">takbyte på öar som bara nås med båt</strong>.
                På Husarö, Finnhamn och Ingmarsö, liksom Svartlöga, Söderöra, Norröra, Humlö och Gräskö
                har vi genomfört takprojekt där allt material transporterats sjövägen.
                Högmarsö och Arholma tillhör också vårt verksamhetsområde, liksom Furusund, Rådmansö och Vätö.
              </p>
              <p>
                Längs kusten arbetar vi i Spillersboda, Bergshamra och Svartnö. På Väddö och upp mot
                Singö, Grisslehamn och Arholma hittar du oss regelbundet. I Vaxholm och Norrtälje har vi
                lagt tak på hundratals fastigheter genom åren.
              </p>
              <p>
                I <strong className="font-semibold">hela Storstockholm</strong> — från <strong className="font-semibold">takbyte i Solna</strong> och <strong className="font-semibold">bandtäckning i Danderyd</strong> till
                <strong className="font-semibold"> takrenovering i Nacka</strong> och <strong className="font-semibold">plåttak i Bromma</strong> — är vi din takläggare. Vi arbetar i Stockholm stad, Solna, Sundbyberg,
                Danderyd, Sollentuna, Lidingö, Nacka, Värmdö, Tyresö, Haninge, Ekerö, Järfälla, Huddinge, Sigtuna, Upplands Väsby och Nynäshamn.
              </p>
              <p>
                Oavsett om du söker <strong className="font-semibold">takbyte i Stockholm</strong>, <strong className="font-semibold">takbyte i Roslagen</strong>, behöver en <strong className="font-semibold">takläggare på en ö utan bro</strong> eller
                vill ha en <strong className="font-semibold">takrenovering på Väddö</strong> — kontakta oss för en kostnadsfri offert. Vi återkopplar inom 24 timmar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
