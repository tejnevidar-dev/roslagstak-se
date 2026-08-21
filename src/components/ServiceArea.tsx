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
};

const regionOrder = [
  "Norra skärgården",
  "Mellersta skärgården",
  "Kusten",
  "Rådmansöhalvön",
  "Norra Roslagen",
  "Roslagens inland",
  "Österåker",
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

const ServiceArea = () => {
  return (
    <section id="omraden" className="border-b border-border bg-warm py-24 md:py-36" aria-labelledby="area-heading">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-3xl">
          <p className="rule-label mb-4">Verksamhetsområde</p>
          <h2 id="area-heading" className="mb-5 font-display text-[clamp(2rem,3.4vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-foreground text-balance">
            Takläggare i hela Roslagen — från kust till ytterskärgård
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Vi utför takbyte, takrenovering och takomläggning på {allLocations.length}+ platser i Roslagens skärgård och längs kusten. 
            Oavsett om du bor på en ö utan bro eller i en kuststad — vi tar oss dit och levererar tak av högsta kvalitet.
          </p>
        </div>

        <div className="mb-14 grid border-t border-border md:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <div key={area.region} className="border-b border-r border-border bg-card p-7">
              <div className="mb-4 flex items-center gap-2">
                <Anchor className="h-4 w-4 text-primary" aria-hidden="true" />
                <h3 className="font-display text-lg font-semibold text-card-foreground">{area.region}</h3>
              </div>
              <p className="mb-5 text-[15px] leading-relaxed text-muted-foreground">{area.description}</p>
              <div className="flex flex-wrap gap-2">
                {area.locations.map((loc) => {
                  const slug = locationSlugMap[loc];
                  return slug ? (
                    <Link
                      key={loc}
                      to={`/taklaggare-${slug}`}
                      className="inline-flex items-center gap-1 border border-border bg-background px-2.5 py-1.5 text-[13px] font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      <MapPin className="h-3 w-3 text-primary" aria-hidden="true" />
                      {loc}
                    </Link>
                  ) : (
                    <span
                      key={loc}
                      className="inline-flex items-center gap-1 border border-border bg-background px-2.5 py-1.5 text-[13px] font-medium text-muted-foreground"
                    >
                      <MapPin className="h-3 w-3" aria-hidden="true" />
                      {loc}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* SEO-rich text block with natural keyword integration */}
        <div className="max-w-4xl">
          <div className="border-l-2 border-primary bg-card py-2 pl-8">
            <h3 className="mb-4 font-display text-xl font-semibold text-card-foreground">
              Din lokala takläggare i Roslagen
            </h3>
            <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                Behöver du en <strong>takläggare i Roslagen</strong>? RoslagsTak utför alla typer av takarbeten — från 
                <strong> takbyte på Blidö</strong> och <strong>takrenovering på Ljusterö</strong> till 
                <strong> takomläggning i Norrtälje</strong> och <strong>plåttak på Yxlan</strong>. Vi är den takläggare 
                som tar sig ut till öar i hela norra skärgården — <strong>även öar utan broförbindelse</strong>.
              </p>
              <p>
                Vi är specialiserade på <strong>takbyte på öar som bara nås med båt</strong>. 
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
                Oavsett om du söker <strong>takbyte i Roslagen</strong>, behöver en <strong>takläggare på en ö utan bro</strong> eller 
                vill ha en <strong>takrenovering på Väddö</strong> — kontakta oss för en kostnadsfri offert. Vi återkopplar inom 24 timmar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
