import { MapPin, Anchor } from "lucide-react";
import { Link } from "react-router-dom";

const locationSlugMap: Record<string, string> = {
  "Arholma": "arholma",
  "Svartlöga": "svartloga",
  "Norröra": "norrora",
  "Söderöra": "sodorora",
  "Humlö": "humlo",
  "Gräskö": "grasko",
  "Singö": "singo",
  "Grisslehamn": "grisslehamn",
  "Blidö": "blido",
  "Yxlan": "yxlan",
  "Furusund": "furusund",
  "Finnhamn": "finnhamn",
  "Ingmarsö": "ingmarso",
  "Husarö": "husaro",
  "Högmarsö": "hogmarso",
  "Norrtälje": "norrtalje",
  "Vaxholm": "vaxholm",
  "Ljusterö": "ljustero",
  "Rådmansö": "radmanso",
  "Vätö": "vato",
  "Väddö": "vaddo",
  "Spillersboda": "spillersboda",
  "Bergshamra": "bergshamra",
  "Svartnö": "svartno",
};

const areas = [
  {
    region: "Norra skärgården",
    locations: ["Arholma", "Svartlöga", "Norröra", "Söderöra", "Humlö", "Gräskö", "Singö", "Grisslehamn"],
    description: "Takbyte och takrenovering i ytterskärgården. Vi tar oss ut till öar dit andra inte når — med material, verktyg och erfarenhet.",
  },
  {
    region: "Mellersta skärgården",
    locations: ["Blidö", "Yxlan", "Furusund", "Finnhamn", "Ingmarsö", "Husarö", "Högmarsö"],
    description: "Takläggare med lång erfarenhet av takprojekt på öar i mellersta Roslagen. Från sommarstugor till permanentboenden.",
  },
  {
    region: "Kusten & fastlandet",
    locations: ["Norrtälje", "Vaxholm", "Ljusterö", "Rådmansö", "Vätö", "Väddö", "Spillersboda", "Bergshamra", "Svartnö"],
    description: "Takomläggning, takrenovering och plåtarbeten längs hela Roslagens kustlinje och på fastlandet runt Norrtälje.",
  },
];

const allLocations = areas.flatMap(a => a.locations);

const ServiceArea = () => {
  return (
    <section id="omraden" className="py-20 md:py-28 bg-warm" aria-labelledby="area-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            Vårt verksamhetsområde
          </p>
          <h2 id="area-heading" className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Takläggare i hela Roslagen — från kust till ytterskärgård
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Vi utför takbyte, takrenovering och takomläggning på {allLocations.length}+ platser i Roslagens skärgård och längs kusten. 
            Oavsett om du bor på en ö utan bro eller i en kuststad — vi tar oss dit och levererar tak av högsta kvalitet.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {areas.map((area) => (
            <div key={area.region} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Anchor className="w-5 h-5 text-primary" />
                <h3 className="font-display text-lg text-card-foreground">{area.region}</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{area.description}</p>
              <div className="flex flex-wrap gap-2">
                {area.locations.map((loc) => {
                  const slug = locationSlugMap[loc];
                  return slug ? (
                    <Link
                      key={loc}
                      to={`/taklaggare-${slug}`}
                      className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full hover:bg-primary/20 transition-colors"
                    >
                      <MapPin className="w-3 h-3" />
                      {loc}
                    </Link>
                  ) : (
                    <span
                      key={loc}
                      className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full"
                    >
                      <MapPin className="w-3 h-3" />
                      {loc}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* SEO-rich text block with natural keyword integration */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-8 md:p-10">
            <h3 className="font-display text-xl text-card-foreground mb-4">
              Din lokala takläggare i Roslagen
            </h3>
            <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
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
