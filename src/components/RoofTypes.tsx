import { useState } from "react";
import { ChevronDown, ChevronUp, Shield, Droplets, Sun, Clock, Coins } from "lucide-react";

const roofTypes = [
  {
    id: "tp20",
    name: "TP20 Plåttak",
    shortDesc: "Trapetsprofilerad stålplåt — Sveriges mest använda takplåt.",
    fullDesc: "TP20 (även kallat TRP20) är en trapetsprofilerad takplåt i förzinkad stålplåt. Siffran 20 anger profilens våghöjd i millimeter. Plåten levereras i långa skivor som sträcker sig från nock till takfot, vilket minimerar horisontella skarvar och minskar risken för läckage. TP20 är ett av de lättaste takmaterialen på marknaden med en vikt på ca 3–5 kg/m², vilket gör det lämpligt även för äldre byggnader med svagare takstolskonstruktion. Plåten finns i ett stort antal kulörer med plastisol- eller polyesterbeläggning.",
    pros: ["Mycket kostnadseffektivt", "Snabb montering — stora skivor", "Låg vikt (ca 3–5 kg/m²)", "Minimalt underhåll", "Brett färgutbud", "Minsta taklutning ca 14°"],
    cons: ["Kan ge resonansljud vid kraftigt regn utan ljuddämpning", "Enklare estetik jämfört med falsad plåt", "Kondens kan uppstå utan korrekt ventilation och underlagspapp"],
    lifespan: "40–50 år",
    priceRange: "Från 1 200 kr/m²",
    bestFor: "Villor, fritidshus, ekonomibyggnader, garage",
  },
  {
    id: "tegelplat",
    name: "Tegelplåttak",
    shortDesc: "Profilerad plåt som efterliknar tegelpannors utseende.",
    fullDesc: "Tegelplåttak (även kallat takpanneplåt) är profilerade stålplåtskivor formade för att visuellt efterlikna traditionella tegelpannor. Varje skiva täcker flera 'pannor' vilket gör monteringen snabbare än verkliga tegelpannor. Plåten är förzinkad och ytbehandlad med plastisol eller polyester för lång hållbarhet. Det ger husägare möjligheten att få det klassiska tegelutseendet med plåtens fördelar: låg vikt, snabb montering och minimalt underhåll.",
    pros: ["Klassiskt tegelpanneliknande utseende", "Mycket lättare än riktigt tegel (ca 4–5 kg/m²)", "Snabbare montering än tegelpannor", "Underhållsfritt", "Tål kraftig vind väl"],
    cons: ["Inte lika autentiskt utseende som riktigt tegel", "Kan låta vid kraftigt regn", "Kräver minst 14° taklutning"],
    lifespan: "40–60 år",
    priceRange: "Från 1 200 kr/m²",
    bestFor: "Villor, sommarstugor, radhus",
  },
  {
    id: "pannplat",
    name: "Pannplåttak",
    shortDesc: "Svensk klassiker från tidigt 1900-tal med karaktäristisk vågprofil.",
    fullDesc: "Pannplåt är en genuint svensk takplåtstyp som först masstillverkades av Domnarvet i Borlänge i början av 1900-talet. Den har en karaktäristisk vågformad profil med rillor var 270:e mm som ger ett helt unikt utseende — pannplåten ska inte förväxlas med tegelplåt som imiterar tegelpannor. Pannplåten ger istället ett tidlöst, industriellt och genuint skandinaviskt uttryck. Den tillverkas i förzinkad stålplåt och finns i färger som svart, mörkröd, grafitgrå, tegelröd och ärggrön. Pannplåten passar lika bra på kulturminnesmärkta byggnader, kyrkor och funkishus som på moderna villor och lantbruksbyggnader. Minsta taklutning är 8°.",
    pros: ["Unikt och karaktäristiskt utseende", "Svensk klassiker med lång tradition", "Passar kulturhistoriska byggnader", "Fungerar vid låga taklutningar (från 8°)", "Förzinkad för god rostbeständighet", "Lätt material"],
    cons: ["Mer begränsat färgutbud än modern profilerad plåt", "Kräver korrekt underlag (råspont + underlagspapp)"],
    lifespan: "40–60 år",
    priceRange: "Från 1 200 kr/m²",
    bestFor: "Kulturbyggnader, äldre villor, funkishus, lantbruksbyggnader, kyrkor",
  },
  {
    id: "dubbelfalsat",
    name: "Dubbelfalsat plåttak (Bandtäckning)",
    shortDesc: "Premiummaterialet — elegant bandtäckning utan synliga fästdon.",
    fullDesc: "Dubbelfalsat plåttak, även kallat bandtäckning, är den mest exklusiva formen av plåttak. Plåtbanden löper i hela längder från nock till takfot och falsas ihop med dubbla stående falsar — helt utan genomgående skruvar eller fästdon. Detta ger ett helt vattentätt tak som fungerar ner till mycket låga taklutningar (från ca 6°). Materialet kan vara förzinkad stålplåt, koppar, zink, rostfritt stål eller aluminium. Koppar och zink utvecklar en naturlig patina med åren. Bandtäckning har använts i Sverige sedan 1500-talet på kyrkor och herrgårdar och anses fortfarande vara det förnämsta taktäckningsmaterialet.",
    pros: ["Helt vattentätt — inga genomgående skruvar", "Extremt lång livslängd", "Fungerar vid låg taklutning (från 6°)", "Exklusivt och tidlöst utseende", "Materialval: koppar, zink, stål, aluminium", "Åldras vackert (koppar/zink)"],
    cons: ["Högsta materialkostnaden", "Kräver specialiserad plåtslagare", "Längre monteringstid", "Koppar och zink har högre kvadratmeterpris"],
    lifespan: "60–100+ år",
    priceRange: "Från 2 000 kr/m²",
    bestFor: "Exklusiva kustvillor, herrgårdar, kyrkor, kulturbyggnader",
  },
  {
    id: "lertegel",
    name: "Lertegeltak",
    shortDesc: "Naturmaterial med hundraårig tradition — åldras vackert.",
    fullDesc: "Lertegelpannor bränns i ugn vid hög temperatur och har använts som takmaterial i Sverige i flera hundra år. Varje panna får en unik, naturlig färgvariation som åldras vackert med tiden. Lertegel är ett tungt takmaterial (ca 40–50 kg/m²) som kräver en dimensionerad takstol, men belönar med oöverträffad charm och livslängd. Pannorna är brandsäkra, ger utmärkt ljudisolering och andas naturligt vilket minskar kondens. Lertegel är känsligt för frostsprängning om fukt tränger in, varför kvaliteten på pannorna och korrekt läggning är avgörande.",
    pros: ["Tidlöst och autentiskt utseende", "Naturligt och miljövänligt material", "Utmärkt ljud- och värmeisolering", "Åldras med värdighet", "Brandsäkert (obrännbart)", "Lång livslängd vid rätt underhåll"],
    cons: ["Tungt — kräver dimensionerad takstol (40–50 kg/m²)", "Risk för frostsprängning vid dålig kvalitet", "Enstaka pannor kan behöva bytas med åren", "Mossa och lav kan växa på skuggiga sidor", "Kräver minst 22° taklutning"],
    lifespan: "80–100+ år",
    priceRange: "Från 1 500 kr/m²",
    bestFor: "Äldre villor, kulturhistoriska byggnader, herrgårdar, skärgårdshus med karaktär",
  },
  {
    id: "betongpanne",
    name: "Betongpannetak",
    shortDesc: "Sveriges vanligaste takpanna — robust, prisvärt och tillförlitligt.",
    fullDesc: "Betongpannor är det vanligaste takmaterialet i Sverige och har dominerat villamarknaden sedan 1950-talet. De tillverkas genom att gjuta en blandning av cement, sand och vatten i formar och härdas sedan. Pannorna finns i ett stort utbud av profiler (tvåkupig, enkupig, plan) och färger. De är tyngre än plåttak (ca 40–45 kg/m²) men lättare än lertegel. Betongpannor ger bra ljudisolering, är brandsäkra och har en bevisad livslängd i nordiskt klimat. Med åren kan ytan bli porös och mossa kan fästa, särskilt på norrsidan.",
    pros: ["Prisvärt jämfört med lertegel", "Brett utbud av profiler och färger", "God ljud- och värmeisolering", "Brandsäkert", "Svensk tillverkning (bl.a. Benders, Monier)"],
    cons: ["Tungt material (40–45 kg/m²)", "Ytan kan bli porös och absorbera fukt med åren", "Mossa och alger kan växa, kräver taktvätt", "Färgen kan blekna med tiden", "Kräver minst 22° taklutning"],
    lifespan: "50–70 år",
    priceRange: "Från 1 200 kr/m²",
    bestFor: "Villor, radhus, parhus — det trygga och beprövade valet",
  },
  {
    id: "glacerade",
    name: "Glacerade pannor (Glaserade)",
    shortDesc: "Tegelpannor med glasyrbeläggning — exklusivt och självrengörande.",
    fullDesc: "Glacerade (glaserade) pannor är lertegelpannor som fått en tunn glasyrbeläggning inbränd vid hög temperatur. Glasyren ger en slät, glansig yta som gör att vatten, smuts, mossa och alger har mycket svårare att fästa. Detta ger en självrengörande effekt — taket behåller sitt utseende betydligt längre än obehandlat tegel. Glaserade pannor finns i ett brett färgspektrum, från klassiskt svart och rött till blått, grönt och vitt. Tack vare den slutna ytan absorberar de inte fukt, vilket eliminerar risken för frostsprängning.",
    pros: ["Exklusivt glansigt utseende", "Självrengörande — mossa och smuts fastnar inte", "Ingen risk för frostsprängning (sluten yta)", "Färgbeständigt — bleknar inte", "Brett färgutbud", "Samma livslängd som lertegel"],
    cons: ["Dyrare än vanligt lertegel och betongpannor", "Tungt material (ca 40–50 kg/m²)", "Glasyren kan i sällsynta fall spricka vid hård mekanisk påverkan", "Kräver minst 22° taklutning"],
    lifespan: "80–100+ år",
    priceRange: "Från 1 800 kr/m²",
    bestFor: "Exklusiva villor, representativa fastigheter, skärgårdshus",
  },
  {
    id: "papptak",
    name: "Papptak (Ytpapp)",
    shortDesc: "Ekonomiskt och smidigt — för låglutande tak och enklare byggnader.",
    fullDesc: "Takpapp (ytpapp) är ett asfaltbaserat takmaterial som rullas ut på ett underlag av råspont. Modern takpapp består av en stomme av glasfiberväv eller polyester som impregnerats med bitumen (asfalt). Det finns i flera kvaliteter, från enkel ytpapp till mer avancerad SBS-modifierad papp med bättre flexibilitet i kyla. Takpapp är det lättaste och billigaste takmaterialet och fungerar utmärkt på tak med låg lutning. Det används ofta som underlagspapp under andra takmaterial, men fungerar också som slutbeläggning på uthus, garage, friggebodar och ekonomibyggnader. OBS: Takpapp ska inte förväxlas med takshingel, som är en annan produkt.",
    pros: ["Mycket prisvärt", "Lätt material", "Fungerar vid mycket låg taklutning (från 3°)", "Flexibelt — anpassar sig efter underlaget", "Enkel att lägga om"],
    cons: ["Kortare livslängd än övriga material", "Kräver regelbundet underhåll och omslagning", "Känsligt för UV-strålning — åldras av sol", "Mindre estetiskt tilltalande", "Kan bli spröd i extrem kyla"],
    lifespan: "15–30 år",
    priceRange: "Från 900 kr/m²",
    bestFor: "Garage, uthus, friggebodar, ekonomibyggnader, låglutande tak",
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
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors animate-subtle-pulse"
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
