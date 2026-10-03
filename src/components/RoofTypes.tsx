import { ROT_FORBEHALL } from "@/data/prices";
import { useState } from "react";
import { ChevronDown, ChevronUp, Shield, Droplets, Sun, Clock, Coins } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import imgTp20 from "@/assets/roof-type-tp20.jpg";
import imgDubbelfalsat from "@/assets/roof-type-dubbelfalsat.jpg";
import imgLertegel from "@/assets/roof-type-lertegel.jpg";
import imgBetongpanne from "@/assets/roof-type-betongpanne.jpg";
import imgTegelplat from "@/assets/roof-type-tegelplat.jpg";
import imgPannplat from "@/assets/roof-type-pannplat.jpg";
import imgGlacerade from "@/assets/roof-type-glacerade.jpg";

type RoofType = {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  pros: string[];
  cons: string[];
  lifespan: string;
  priceRange: string;
  bestFor: string;
  image?: string;
  imageAlt?: string;
};

const roofTypes: RoofType[] = [
  {
    id: "tp20",
    name: "TP20 Plåttak",
    shortDesc: "Trapetsprofilerad stålplåt — Sveriges mest använda takplåt.",
    fullDesc: "TP20 (även kallat TRP20) är en trapetsprofilerad takplåt i förzinkad stålplåt. Siffran 20 anger profilens våghöjd i millimeter. Plåten levereras i långa skivor som sträcker sig från nock till takfot, vilket minimerar horisontella skarvar och minskar risken för läckage. TP20 är ett av de lättaste takmaterialen på marknaden med en vikt på ca 3–5 kg/m², vilket gör det lämpligt även för äldre byggnader med svagare takstolskonstruktion. Plåten finns i ett stort antal kulörer med plastisol- eller polyesterbeläggning.",
    pros: ["Mycket kostnadseffektivt", "Snabb montering — stora skivor", "Låg vikt (ca 3–5 kg/m²)", "Minimalt underhåll", "Brett färgutbud", "Fungerar även vid låg taklutning"],
    cons: ["Kan ge resonansljud vid kraftigt regn utan ljuddämpning", "Enklare estetik jämfört med falsad plåt", "Kondens kan uppstå utan korrekt ventilation och underlagspapp"],
    lifespan: "",
    priceRange: "Från 1 200 kr/m²",
    bestFor: "Villor, fritidshus, ekonomibyggnader, garage",
    image: imgTp20,
    imageAlt: "Närbild på trapetsprofilerad TP20-plåt",
  },
  {
    id: "tegelplat",
    name: "Tegelplåttak",
    shortDesc: "Profilerad plåt som efterliknar tegelpannors utseende.",
    fullDesc: "Tegelplåttak (även kallat takpanneplåt) är profilerade stålplåtskivor formade för att visuellt efterlikna traditionella tegelpannor. Varje skiva täcker flera 'pannor' vilket gör monteringen snabbare än verkliga tegelpannor. Plåten är förzinkad och ytbehandlad med plastisol eller polyester för lång hållbarhet. Det ger husägare möjligheten att få det klassiska tegelutseendet med plåtens fördelar: låg vikt, snabb montering och minimalt underhåll.",
    pros: ["Klassiskt tegelpanneliknande utseende", "Mycket lättare än riktigt tegel (ca 4–5 kg/m²)", "Snabbare montering än tegelpannor", "Underhållsfritt", "Tål kraftig vind väl"],
    cons: ["Inte lika autentiskt utseende som riktigt tegel", "Kan låta vid kraftigt regn", "Kräver en viss minsta taklutning"],
    lifespan: "",
    priceRange: "Från 1 300 kr/m²",
    bestFor: "Villor, sommarstugor, radhus",
    image: imgTegelplat,
    imageAlt: "Vått grått tak i tegelplåt med snörasskydd",
  },
  {
    id: "pannplat",
    name: "Pannplåttak",
    shortDesc: "Svensk klassiker från tidigt 1900-tal med karaktäristisk vågprofil.",
    fullDesc: "Pannplåt är en genuint svensk takplåtstyp som först masstillverkades av Domnarvet i Borlänge i början av 1900-talet. Den har en karaktäristisk vågformad profil med rillor var 270:e mm som ger ett helt unikt utseende — pannplåten ska inte förväxlas med tegelplåt som imiterar tegelpannor. Pannplåten ger istället ett tidlöst, industriellt och genuint skandinaviskt uttryck. Den tillverkas i förzinkad stålplåt och finns i färger som svart, mörkröd, grafitgrå, tegelröd och ärggrön. Pannplåten passar lika bra på kulturminnesmärkta byggnader, kyrkor och funkishus som på moderna villor och lantbruksbyggnader.",
    pros: ["Unikt och karaktäristiskt utseende", "Svensk klassiker med lång tradition", "Passar kulturhistoriska byggnader", "Fungerar vid låga taklutningar", "Förzinkad för god rostbeständighet", "Lätt material"],
    cons: ["Mer begränsat färgutbud än modern profilerad plåt", "Kräver korrekt underlag (råspont + underlagspapp)"],
    lifespan: "",
    priceRange: "Från 1 300 kr/m²",
    bestFor: "Kulturbyggnader, äldre villor, funkishus, lantbruksbyggnader, kyrkor",
    image: imgPannplat,
    imageAlt: "Svart pannplåt med karaktäristisk vågprofil",
  },
  {
    id: "dubbelfalsat",
    name: "Dubbelfalsat plåttak (Bandtäckning)",
    shortDesc: "Premiummaterialet — elegant bandtäckning utan synliga fästdon.",
    fullDesc: "Dubbelfalsat plåttak, även kallat bandtäckning, är den mest exklusiva formen av plåttak. Plåtbanden löper i hela längder från nock till takfot och falsas ihop med dubbla stående falsar — helt utan genomgående skruvar eller fästdon. Detta ger ett helt vattentätt tak som fungerar ner till mycket låga taklutningar. Materialet kan vara förzinkad stålplåt, koppar, zink, rostfritt stål eller aluminium. Koppar och zink utvecklar en naturlig patina med åren. Bandtäckning har använts i Sverige sedan 1500-talet på kyrkor och herrgårdar och anses fortfarande vara det förnämsta taktäckningsmaterialet.",
    pros: ["Helt vattentätt — inga genomgående skruvar", "Fungerar vid låg taklutning", "Exklusivt och tidlöst utseende", "Materialval: koppar, zink, stål, aluminium", "Åldras vackert (koppar/zink)"],
    cons: ["Högsta materialkostnaden", "Kräver specialiserad plåtslagare", "Längre monteringstid", "Koppar och zink har högre kvadratmeterpris"],
    lifespan: "",
    priceRange: "Ca 2 000 kr/m²",
    bestFor: "Exklusiva kustvillor, herrgårdar, kyrkor, kulturbyggnader",
    image: imgDubbelfalsat,
    imageAlt: "Dubbelfalsat plåttak i svart bandtäckning på modern timmerbyggnad",
  },
  {
    id: "lertegel",
    name: "Lertegeltak",
    shortDesc: "Naturmaterial med hundraårig tradition — åldras vackert.",
    fullDesc: "Lertegelpannor bränns i ugn vid hög temperatur och har använts som takmaterial i Sverige i flera hundra år. Varje panna får en unik, naturlig färgvariation som åldras vackert med tiden. Lertegel är ett tungt takmaterial (ca 40–50 kg/m²) som kräver en dimensionerad takstol, men belönar med charm. Pannorna är brandsäkra, ger utmärkt ljudisolering och andas naturligt vilket minskar kondens. Lertegel är känsligt för frostsprängning om fukt tränger in, varför kvaliteten på pannorna och korrekt läggning är avgörande.",
    pros: ["Tidlöst och autentiskt utseende", "Naturligt och miljövänligt material", "Utmärkt ljud- och värmeisolering", "Åldras med värdighet", "Brandsäkert (obrännbart)"],
    cons: ["Tungt — kräver dimensionerad takstol (40–50 kg/m²)", "Risk för frostsprängning vid dålig kvalitet", "Enstaka pannor kan behöva bytas med åren", "Mossa och lav kan växa på skuggiga sidor", "Kräver en viss minsta taklutning"],
    lifespan: "",
    priceRange: "Från 1 300 kr/m²",
    bestFor: "Äldre villor, kulturhistoriska byggnader, herrgårdar, skärgårdshus med karaktär",
    image: imgLertegel,
    imageAlt: "Närbild på tvåkupiga lertegelpannor i terrakotta",
  },
  {
    id: "betongpanne",
    name: "Betongpannetak",
    shortDesc: "Sveriges vanligaste takpanna — robust, prisvärt och tillförlitligt.",
    fullDesc: "Betongpannor är det vanligaste takmaterialet i Sverige och har dominerat villamarknaden sedan 1950-talet. De tillverkas genom att gjuta en blandning av cement, sand och vatten i formar och härdas sedan. Pannorna finns i ett stort utbud av profiler (tvåkupig, enkupig, plan) och färger. De är tyngre än plåttak (ca 40–45 kg/m²) men lättare än lertegel. Betongpannor ger bra ljudisolering och är brandsäkra. Med åren kan ytan bli porös och mossa kan fästa, särskilt på norrsidan.",
    pros: ["Prisvärt jämfört med lertegel", "Brett utbud av profiler och färger", "God ljud- och värmeisolering", "Brandsäkert", "Svensk tillverkning (bl.a. Benders, Monier)"],
    cons: ["Tungt material (40–45 kg/m²)", "Ytan kan bli porös och absorbera fukt med åren", "Mossa och alger kan växa, kräver taktvätt", "Färgen kan blekna med tiden", "Kräver en viss minsta taklutning"],
    lifespan: "",
    priceRange: "Från 1 200 kr/m²",
    bestFor: "Villor, radhus, parhus — det trygga och beprövade valet",
    image: imgBetongpanne,
    imageAlt: "Närbild på svart betongpannetak med vågprofil",
  },
  {
    id: "glacerade",
    name: "Glacerade pannor (Glaserade)",
    shortDesc: "Tegelpannor med glasyrbeläggning — exklusivt och självrengörande.",
    fullDesc: "Glacerade (glaserade) pannor är lertegelpannor som fått en tunn glasyrbeläggning inbränd vid hög temperatur. Glasyren ger en slät, glansig yta som gör att vatten, smuts, mossa och alger har mycket svårare att fästa. Detta ger en självrengörande effekt — taket behåller sitt utseende betydligt längre än obehandlat tegel. Glaserade pannor finns i ett brett färgspektrum, från klassiskt svart och rött till blått, grönt och vitt. Tack vare den slutna ytan absorberar de inte fukt, vilket eliminerar risken för frostsprängning.",
    pros: ["Exklusivt glansigt utseende", "Självrengörande — mossa och smuts fastnar inte", "Ingen risk för frostsprängning (sluten yta)", "Färgbeständigt — bleknar inte", "Brett färgutbud"],
    cons: ["Dyrare än vanligt lertegel och betongpannor", "Tungt material (ca 40–50 kg/m²)", "Glasyren kan i sällsynta fall spricka vid hård mekanisk påverkan", "Kräver en viss minsta taklutning"],
    lifespan: "",
    priceRange: "Fast pris efter takkontroll",
    bestFor: "Exklusiva villor, representativa fastigheter, skärgårdshus",
    image: imgGlacerade,
    imageAlt: "Närbild på glacerade takpannor i svart glansig glasyr",
  },
  {
    id: "papptak",
    name: "Papptak (Ytpapp)",
    shortDesc: "Ekonomiskt och smidigt — för låglutande tak och enklare byggnader.",
    fullDesc: "Takpapp (ytpapp) är ett asfaltbaserat takmaterial som rullas ut på ett underlag av råspont. Modern takpapp består av en stomme av glasfiberväv eller polyester som impregnerats med bitumen (asfalt). Det finns i flera kvaliteter, från enkel ytpapp till mer avancerad SBS-modifierad papp med bättre flexibilitet i kyla. Takpapp är det lättaste och billigaste takmaterialet och fungerar utmärkt på tak med låg lutning. Det används ofta som underlagspapp under andra takmaterial, men fungerar också som slutbeläggning på uthus, garage, friggebodar och ekonomibyggnader. OBS: Takpapp ska inte förväxlas med takshingel, som är en annan produkt.",
    pros: ["Mycket prisvärt", "Lätt material", "Fungerar vid mycket låg taklutning", "Flexibelt — anpassar sig efter underlaget", "Enkel att lägga om"],
    cons: ["Kräver regelbundet underhåll och omslagning", "Känsligt för UV-strålning — åldras av sol", "Mindre estetiskt tilltalande", "Kan bli spröd i extrem kyla"],
    lifespan: "",
    priceRange: "Ca 900 kr/m²",
    bestFor: "Garage, uthus, friggebodar, ekonomibyggnader, låglutande tak",
  },
];

const RoofTypes = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="taktyper" className="border-b border-border bg-warm py-24 md:py-36" aria-labelledby="rooftypes-heading">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          meta="Materialbibliotek"
          id="rooftypes-heading"
          title={<>Taktyper — <em className="font-normal italic text-primary">material och pris</em></>}
          intro={
            <>
              Öppna en taktyp för att läsa om material, fördelar och nackdelar. Osäker?{" "}
              <a href="/offert#radgivning" className="text-primary underline decoration-primary/40 hover:no-underline">
                Boka kostnadsfri takkontroll
              </a>{" "}
              så hjälper vi dig välja. Vi lämnar alltid fast pris efter kostnadsfri takkontroll.
            </>
          }
          className="mb-14 lg:mb-20"
        />

        <div className="border-t border-foreground/10">
          {roofTypes.map((roof, i) => {
            const isExpanded = expandedId === roof.id;
            return (
              <article
                key={roof.id}
                className="border-b border-foreground/10"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : roof.id)}
                  className="group w-full flex items-center justify-between gap-6 py-7 text-left"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-baseline gap-5">
                    <span className="text-[10px] font-semibold tabular-nums tracking-[0.2em] text-muted-foreground pt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl md:text-[1.75rem] tracking-[-0.02em] text-foreground transition-colors group-hover:text-primary">
                        {roof.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1.5 max-w-xl">{roof.shortDesc}</p>
                    </div>
                  </div>
                  <span
                    className={`w-10 h-10 shrink-0 rounded-full border flex items-center justify-center transition-colors ${
                      isExpanded ? "bg-accent text-primary-foreground border-accent" : "border-foreground/20 text-foreground group-hover:border-foreground/40"
                    }`}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isExpanded && (
                  <div className="pb-9 pt-2 md:pl-12 space-y-7 animate-fade-in">
                    <div className={roof.image ? "grid gap-7 sm:grid-cols-[minmax(0,15rem)_1fr] sm:items-start" : ""}>
                      {roof.image && (
                        <img
                          src={roof.image}
                          alt={roof.imageAlt}
                          width={480}
                          height={360}
                          loading="lazy"
                          className="aspect-[4/3] w-full rounded-2xl object-cover sm:max-w-[15rem]"
                        />
                      )}
                      <p className="text-foreground leading-relaxed">{roof.fullDesc}</p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      {roof.lifespan && (
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">Livslängd:</span>
                          <span className="font-semibold text-foreground">{roof.lifespan}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm">
                        <Coins className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">Pris (efter ROT, inkl. moms):</span>
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

                    <div className="flex flex-wrap gap-3">
                      <a
                        href="/offert"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors animate-subtle-pulse"
                      >
                        Boka takkontroll för {roof.name.toLowerCase()}
                      </a>
                      {roof.id === "lertegel" && (
                        <a
                          href="/tjanster/tegeltak"
                          className="inline-flex items-center gap-2 border border-foreground/20 text-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:border-foreground/40 transition-colors"
                        >
                          Läs mer om tegeltak i lertegel
                        </a>
                      )}
                      {roof.id === "dubbelfalsat" && (
                        <a
                          href="/tjanster/platarbeten#falsat"
                          className="inline-flex items-center gap-2 border border-foreground/20 text-foreground px-6 py-2.5 rounded-full text-sm font-semibold hover:border-foreground/40 transition-colors"
                        >
                          Läs mer om dubbelfalsat plåttak
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Vad kostar takbyte? */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <h3 className="font-display text-2xl text-foreground mb-4">
            Vad kostar takbyte?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Som riktpris, efter ROT-avdrag och inkl. moms: ca 900 kr/m² (papptak) upp till ca 2 000 kr/m²
            (dubbelfalsat plåttak). Vi lämnar alltid ett fast pris efter en kostnadsfri takkontroll — aldrig
            innan. Priset beror på materialval, takets storlek och skick, och inkluderar material, arbete,
            byggställning och avfallshantering. ROT-avdrag (30% på arbetskostnaden) dras av direkt på
            fakturan. {ROT_FORBEHALL}
          </p>
        </div>
      </div>
    </section>
  );
};

export default RoofTypes;
