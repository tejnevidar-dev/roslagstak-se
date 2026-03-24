import { useState } from "react";
import { ChevronDown, ChevronUp, Shield, Droplets, Sun, Clock, Coins } from "lucide-react";

const roofTypes = [
  {
    id: "tp20",
    name: "TP20 Plåttak",
    shortDesc: "Det vanligaste plåttaket i Sverige — trapetsprofilerat och kostnadseffektivt.",
    fullDesc: "TP20 är ett trapetsprofilerat plåttak som är Sveriges mest använda takplåt. Det passar utmärkt för både bostäder och ekonomibyggnader. Plåten levereras i långa längder vilket minimerar skarvar och risk för läckage. TP20 är lättare än tegel vilket minskar belastningen på takstolen.",
    pros: ["Kostnadseffektivt", "Snabb montering", "Lågt underhåll", "Lång livslängd (40–50 år)", "Lätt material"],
    cons: ["Kan ge ljud vid regn", "Enklare estetik", "Kondens kan uppstå utan rätt underlag"],
    lifespan: "40–50 år",
    priceRange: "Från 1 300 kr/m²",
    bestFor: "Ekonomibyggnader, villor, fritidshus längs kusten",
  },
  {
    id: "tegelplat",
    name: "Tegelplåttak",
    shortDesc: "Plåt som ser ut som tegel — kombinerar estetik med plåtens fördelar.",
    fullDesc: "Tegelplåttak (även kallat takpanneplåt) ger utseendet av ett klassiskt tegeltak men med alla fördelar som plåt erbjuder. Perfekt för kustmiljöer där saltstänk och fukt ställer höga krav. Plåten är formad för att efterlikna traditionella tegelpannor och finns i många färger.",
    pros: ["Vackert tegelliknande utseende", "Tåligt mot salt och fukt", "Lätt att montera", "Underhållsfritt", "Lång livslängd"],
    cons: ["Dyrare än TP20", "Kan inte läggas på för låg taklutning"],
    lifespan: "40–60 år",
    priceRange: "Från 1 300 kr/m²",
    bestFor: "Villor, sommarstuga vid kusten, skärgårdshus",
  },
  {
    id: "pannplat",
    name: "Pannplåttak",
    shortDesc: "Klassisk pannform i plåt — stilrent och hållbart för kustklimat.",
    fullDesc: "Pannplåttak är en modern plåtlösning som imiterar formen av traditionella takpannor. Det ger en klassisk och tidlös look samtidigt som det erbjuder plåtens överlägsenhet vad gäller vikt och hållbarhet. Idealiskt för Roslagens saltmättade havsbris.",
    pros: ["Klassiskt utseende", "Väderbeständigt", "Minimal underhåll", "Bra vindtålighet"],
    cons: ["Kräver fackmässig montering", "Något högre kostnad"],
    lifespan: "40–50 år",
    priceRange: "Från 1 300 kr/m²",
    bestFor: "Skärgårdsvillor, representativa bostäder",
  },
  {
    id: "dubbelfalsat",
    name: "Dubbelfalsat plåttak",
    shortDesc: "Premiummaterialet — elegant, vattentätt och tidlöst.",
    fullDesc: "Dubbelfalsat plåttak är den finaste formen av plåttak och används ofta på exklusiva villor och kulturbyggnader. Plåtarna falsas ihop i dubbla fält vilket ger ett helt vattentätt tak utan genomgående fästdon. Materialet kan vara zink, koppar, rostfritt stål eller lackerad plåt.",
    pros: ["Helt vattentätt", "Extremt lång livslängd", "Exklusivt utseende", "Inga synliga skruvar", "Fungerar vid låg taklutning"],
    cons: ["Högre kostnad", "Kräver specialiserad hantverkare", "Längre monteringstid"],
    lifespan: "60–100+ år",
    priceRange: "Från 2 000 kr/m²",
    bestFor: "Exklusiva kustvillor, herrgårdar, kulturbyggnader",
  },
  {
    id: "lertegel",
    name: "Lertegeltak",
    shortDesc: "Naturligt och tidlöst — det traditionella svenska taket.",
    fullDesc: "Lertegel har använts i hundratals år och ger en autentisk och varm känsla. Tegelpannorna bränns i ugn och får en naturlig färgvariation som åldras vackert. Lertegeltak är tunga och kräver en stabil takstol, men belönar med oöverträffad charm och lång livslängd.",
    pros: ["Tidlöst vackert", "Naturligt material", "Bra ljudisolering", "Åldras med värdighet", "Brandsäkert"],
    cons: ["Tungt — kräver förstärkt takstol", "Kan spricka vid frost", "Kräver regelbunden inspektion"],
    lifespan: "80–100+ år",
    priceRange: "Från 1 500 kr/m²",
    bestFor: "Äldre villor, kulturhistoriska byggnader, herrgårdar",
  },
  {
    id: "betongpanne",
    name: "Betongpannetak",
    shortDesc: "Robust och prisvärt — det populära valet för svenska villor.",
    fullDesc: "Betongpannor är det vanligaste takmaterialet i Sverige. De tillverkas av cement, sand och vatten och finns i ett brett utbud av färger och profiler. Betongpannor är prisvärda, hållbara och ger god ljudisolering. De tål det nordiska klimatet utmärkt.",
    pros: ["Prisvärt", "Brett färgutbud", "God ljudisolering", "Brandsäkert", "Tillverkas i Sverige"],
    cons: ["Tungt material", "Kan få mossväxt", "Färgen kan blekna med tiden"],
    lifespan: "50–70 år",
    priceRange: "Från 400 kr/m²",
    bestFor: "Villor, radhus, ekonomibyggnader",
  },
  {
    id: "glacerade",
    name: "Glacerade pannor",
    shortDesc: "Glaserade tegelpannor — lyxig finish som stöter bort smuts och mossa.",
    fullDesc: "Glacerade (glaserade) pannor är tegelpannor med en glasyrbeläggning som ger ett glansigt och exklusivt utseende. Glasyren gör att vatten, smuts och mossa har svårare att fästa, vilket ger ett tak som behåller sitt utseende längre. Finns i en mängd färger från klassiskt svart till rött och blått.",
    pros: ["Exklusivt utseende", "Självrenande effekt", "Mossresistent", "Färgbeständigt", "Lång livslängd"],
    cons: ["Dyrare än vanligt tegel", "Tungt", "Glasyren kan skadas vid hård mekanisk påverkan"],
    lifespan: "80–100+ år",
    priceRange: "Från 750 kr/m²",
    bestFor: "Exklusiva villor, representativa fastigheter, skärgårdshus",
  },
  {
    id: "papptak",
    name: "Papptak",
    shortDesc: "Ekonomiskt och flexibelt — för låglutande tak och ekonomibyggnader.",
    fullDesc: "Takpapp (eller shingel) är ett ekonomiskt takmaterial som fungerar utmärkt på låglutande tak och enklare byggnader. Modern takpapp är betydligt bättre än äldre varianter och finns i flera kvaliteter. Ofta används på uthus, garage, friggebodar och som underlagsmaterial.",
    pros: ["Mycket prisvärt", "Lätt att lägga", "Flexibelt material", "Funkar på låg lutning"],
    cons: ["Kortare livslängd", "Kräver regelbundet underhåll", "Känsligt för UV-ljus", "Mindre estetiskt tilltalande"],
    lifespan: "15–30 år",
    priceRange: "Från 200 kr/m²",
    bestFor: "Garage, uthus, friggebodar, ekonomibyggnader",
  },
];

const RoofTypes = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="taktyper" className="py-20 md:py-28 bg-warm" aria-labelledby="rooftypes-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Taktyper</p>
          <h2 id="rooftypes-heading" className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Allt du behöver veta om olika taktyper
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Klicka på en taktyp för att läsa mer om material, livslängd, fördelar och nackdelar. 
            Osäker? <a href="#radgivning" className="text-primary underline hover:no-underline">Boka kostnadsfri rådgivning</a> så hjälper vi dig välja.
          </p>
        </div>

        <div className="grid gap-4 max-w-4xl mx-auto">
          {roofTypes.map((roof) => {
            const isExpanded = expandedId === roof.id;
            return (
              <article
                key={roof.id}
                className="bg-card border border-border rounded-lg overflow-hidden transition-shadow hover:shadow-md"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : roof.id)}
                  className="w-full flex items-center justify-between p-6 text-left"
                  aria-expanded={isExpanded}
                >
                  <div>
                    <h3 className="font-display text-xl text-card-foreground">{roof.name}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{roof.shortDesc}</p>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-primary flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 ml-4" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-border pt-6 space-y-6">
                    <p className="text-foreground leading-relaxed">{roof.fullDesc}</p>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">Livslängd:</span>
                        <span className="font-semibold text-foreground">{roof.lifespan}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Coins className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">Pris:</span>
                        <span className="font-semibold text-foreground">{roof.priceRange}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Sun className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">Bäst för:</span>
                        <span className="font-semibold text-foreground">{roof.bestFor}</span>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-primary" /> Fördelar
                        </h4>
                        <ul className="space-y-1">
                          {roof.pros.map((p) => (
                            <li key={p} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-1">✓</span> {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-2">
                          <Droplets className="w-4 h-4 text-muted-foreground" /> Nackdelar
                        </h4>
                        <ul className="space-y-1">
                          {roof.cons.map((c) => (
                            <li key={c} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-muted-foreground mt-1">–</span> {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <a
                      href="#offert"
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Få offert för {roof.name.toLowerCase()}
                    </a>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RoofTypes;