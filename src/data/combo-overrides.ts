/**
 * Utökad, unik text (≥500 ord) för /takbyte-<ort> på Storstockholms största kommuner
 * (sprint-offensiv-2026-09-28 punkt 3). Ersätter den korta mallgenererade texten i
 * service-location-combos.ts bara för dessa specifika tjänst+ort-kombinationer.
 * Bara allmänt belagd kunskap om kommunernas bebyggelse och taktyper — inga påhittade
 * projekt eller referenser. Lertegel och dubbelfalsat plåttak är belagda material (Vidars
 * beslut 2026-09-28). Eternit: vi samordnar sanering via behörig partner, utför inte själva.
 */
export interface ComboOverride {
  title: string;
  description: string;
  content: string[];
}

const PROCESS =
  "Processen är densamma oavsett kommun: en kostnadsfri takkontroll där vi går igenom tak, underlag, plåtdetaljer och avvattning, en skriftlig offert med fast pris — aldrig löpande timpris — utförande enligt AMA, och en slutbesiktning med skriftlig garanti och foton. Vi lämnar 10 års utförandegaranti och, för tätskiktet, 30 års garanti genom MATAKI. Du har en och samma kontaktperson från takkontroll till slutbesiktning, och du bestämmer alltid själv om och när du vill gå vidare efter takkontrollen — den är kostnadsfri och förpliktar inte till något.";

const ROT =
  "Som privatperson kan du använda ROT-avdrag på arbetskostnaden vid takbyte: 30 %, högst 50 000 kr per person och år. Äger ni bostaden tillsammans kan ni använda avdraget var för sig, så att ett par kan få upp till 100 000 kr sammanlagt om utrymmet finns kvar för året. Materialet ger inget avdrag, bara arbetskostnaden gör det, och vi drar av ROT direkt på fakturan så att du bara betalar din del.";

const INCLUDES = (name: string, prep: string) =>
  `Vad ingår i ett takbyte ${prep} ${name}? Rivning och bortforsling av det gamla takmaterialet, ny underlagspapp och ny läkt, nytt ytmaterial, nya plåtbeslag kring skorstenar och genomföringar, ny taksäkerhet (takstege, gångbrygga och snörasskydd) och, om du vill, nya hängrännor och stuprör. Skadad råspont byts där den behöver bytas — det syns aldrig förrän det gamla taket är rivet, och vi fotograferar och visar dig omfattningen innan vi fortsätter. Allt specificeras i offerten, så du vet exakt vad som ingår innan arbetet börjar.`;

const COMPARE = (name: string, prep: string) =>
  `Jämför offerter på rätt sätt när du ska byta tak ${prep} ${name}: titta på mer än slutsumman. Är priset fast, eller kan det bli tillägg om något oväntat hittas under det gamla taket? Står det tydligt vad som ingår — underlag, läkt, plåtdetaljer, bortforsling och städning? Vilka garantier får du, och hur länge gäller de? Har du en och samma kontaktperson genom hela processen, från takkontroll till slutbesiktning? Hos oss är svaret ja på alla fyra frågorna.`;

const CTA = (name: string, prep: string) =>
  `Boka en kostnadsfri takkontroll för ditt takbyte ${prep} ${name}. Ring 070-154 36 39 eller boka online — vi återkommer inom 24 timmar.`;

export const comboOverrides: Record<string, ComboOverride> = {
  nacka: {
    title: "Takbyte i Nacka — fast pris, 10 års utförandegaranti",
    description:
      "Takbyte i Nacka: villor, radhus och skärgårdsfastigheter. Kostnadsfri takkontroll, fast pris, 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI.",
    content: [
      "Nacka sträcker sig från tätbebyggda delar nära Stockholms innerstad till skärgårdsnära villaområden mot Saltsjön och Baggensfjärden. Bebyggelsen är blandad: villor och radhus från 1950- till 1980-talet i områden som Fisksätra, Saltsjö-Duvnäs och Älta, sekelskifteshus i de äldre delarna, och nyare flerbostadshus i centrala Nacka och Sickla. Den variationen gör att vi möter allt från enkla sadeltak till mer komplicerade tak med flera takfall, kupor och burspråk.",
      "Kustnära läge mot Saltsjön innebär att salt luft och slagregn från öster sliter mer på takmaterial och plåtbeslag än i inlandet. I kustnära lägen är frostsprängda betongpannor och rostangripna beslag vanliga på äldre villatak, särskilt på tak som vetter mot vattnet. Rätt materialval och korrekt utförda anslutningar vid skorstenar och genomföringar är avgörande för hur länge ett tak håller i det klimatet.",
      "Vi utför takbyte i Nacka med samtliga vanliga material: TP20-plåttak för fritidshus och enklare byggnader, dubbelfalsat plåttak (bandtäckning) för permanentboenden i exponerade lägen, betongpannor och tegelplåt för villor där ett traditionellt utseende är viktigt, samt lertegel för äldre och kulturhistoriskt intressanta hus. Materialvalet avgörs av takets lutning, husets karaktär och budget, och vi går igenom alternativen vid takkontrollen.",
      "Har fastigheten i Nacka ett äldre eternittak samordnar vi saneringen med en behörig saneringsfirma enligt Arbetsmiljöverkets föreskrifter, innan det nya taket läggs. Vi utför inte asbestsanering själva.",
      INCLUDES("Nacka", "i"),
      PROCESS,
      ROT,
      "Vad kostar ett takbyte i Nacka? Priset beror på takets storlek, lutning, material och underlagets skick — vi lämnar aldrig ett pris utan att först ha sett taket. Riktpriserna på vår prislista är en bra utgångspunkt inför budgeteringen.",
      COMPARE("Nacka", "i"),
      CTA("Nacka", "i"),
    ],
  },
  lidingo: {
    title: "Takbyte på Lidingö — fast pris, 10 års utförandegaranti",
    description:
      "Takbyte på Lidingö: villor och skärgårdsfastigheter nära vatten. Kostnadsfri takkontroll, fast pris, 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI.",
    content: [
      "Lidingö är en ö strax utanför Stockholms innerstad, med en villabebyggelse som sträcker sig från representativa sekelskifteshus i Gångsätra och Bodal till modernistiska villor från 1930- och 1940-talet och senare tillbyggda hus i Käppala, Larsberg och Högsätra. Många fastigheter har stora, väl synliga tak, vilket gör att takets material och utförande syns tydligt i gatubilden.",
      "Öns läge mellan Lilla Värtan och Kyrkviken innebär att husen på Lidingö utsätts för salt luft och kraftiga vindar från flera väderstreck, särskilt i de yttre delarna mot Elfvik och Käppala. Det ställer högre krav på plåtbeslag, infästningar och ventilation under takmaterialet än vid inlandsläge, och det är ofta beslag och anslutningar — inte själva takytan — som ger vika först på äldre tak.",
      "Vi utför takbyte på Lidingö med TP20-plåttak, dubbelfalsat plåttak, betongpannor, tegelplåt och lertegel. På de äldre villorna i de kulturhistoriskt värdefulla delarna av Lidingö används ofta lertegel eller falsad plåt för att bevara husets ursprungliga karaktär, medan nyare byggnader oftare får TP20 eller dubbelfalsat plåttak. Vi går igenom vad som passar just ditt hus vid takkontrollen.",
      "Byte av taktäckningsmaterial eller kulör kan i vissa fall vara anmälningspliktigt på Lidingö, särskilt i områden med kulturhistoriska värden. Vi hjälper dig kontrollera vad som gäller för din fastighet innan arbetet påbörjas.",
      "Har fastigheten ett äldre eternittak samordnar vi saneringen med en behörig saneringsfirma enligt Arbetsmiljöverkets föreskrifter, innan det nya taket läggs. Vi utför inte asbestsanering själva.",
      INCLUDES("Lidingö", "på"),
      PROCESS,
      ROT,
      COMPARE("Lidingö", "på"),
      CTA("Lidingö", "på"),
    ],
  },
  solna: {
    title: "Takbyte i Solna — fast pris, 10 års utförandegaranti",
    description:
      "Takbyte i Solna: från Råsunda och Bergshamra till Arenastaden. Kostnadsfri takkontroll, fast pris, 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI.",
    content: [
      "Solna är en av Stockholms mest tätbebyggda kommuner, med allt från flerbostadshus i Råsunda och Bergshamra till villaområden i Huvudsta och Ulriksdal och moderna nybyggnationer i Arenastaden. Den äldre bebyggelsen har ofta plåttak eller tegelpannor från 1900-talets första hälft, medan villaområdena från 1950- och 60-talet oftast har betongpannor eller äldre bandtäckt plåt.",
      "I Solnas tätbebyggda kvarter är det ofta logistiken snarare än själva takarbetet som avgör hur ett projekt planeras: ställning, materialupplag och avfallshantering måste samordnas med parkeringsregler, gårdsutrymmen och grannars behov. Vi går igenom logistikplanen med dig innan arbetet startar, så att projektet stör så lite som möjligt.",
      "Vi utför takbyte i Solna med TP20-plåttak, dubbelfalsat plåttak, betongpannor, tegelplåt och lertegel. På äldre flerbostadshus och villor i Råsunda och Huvudsta väljer många dubbelfalsad bandtäckning eller lertegel för att matcha den ursprungliga arkitekturen, medan nyare byggnation i Arenastaden och Ulriksdal oftare får moderna plåtlösningar med hög korrosionsklass.",
      "Har fastigheten ett äldre eternittak samordnar vi saneringen med en behörig saneringsfirma enligt Arbetsmiljöverkets föreskrifter, innan det nya taket läggs. Vi utför inte asbestsanering själva.",
      INCLUDES("Solna", "i"),
      PROCESS,
      ROT,
      "Vad kostar ett takbyte i Solna? Priset beror på takets storlek, lutning, material och underlagets skick. Riktpriserna på vår prislista är en bra utgångspunkt, men vi lämnar alltid ett fast pris efter besiktning.",
      COMPARE("Solna", "i"),
      CTA("Solna", "i"),
    ],
  },
  huddinge: {
    title: "Takbyte i Huddinge — fast pris, 10 års utförandegaranti",
    description:
      "Takbyte i Huddinge: villaområden och flerbostadshus från flera decennier. Kostnadsfri takkontroll, fast pris, 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI.",
    content: [
      "Huddinge har en varierad bebyggelse, från villaområden i Segeltorp och Snättringe med hus från 1950- till 1970-talet, till flerbostadshus från miljonprogramsåren i Flemingsberg och Vårby, och nyare bostadsområden i Storängen och Skogås. Den stora variationen i husens ålder gör att vi möter allt från originaltak som närmar sig slutet av sin livslängd till relativt nya tak som bara behöver punktinsatser.",
      "På villor från 1950- och 60-talet i Huddinge är det vanligt att betongpannorna börjar frostspränga och underlagspappen torkat ut, vilket gör en takomläggning till bättre ekonomi över tid än att fortsätta laga punktvis. Vi går igenom underlagets skick noggrant vid takkontrollen, eftersom det ofta är avgörande för om en renovering räcker eller om ett komplett takbyte är rätt val.",
      "Vi utför takbyte i Huddinge med TP20-plåttak, dubbelfalsat plåttak, betongpannor, tegelplåt och lertegel, och anpassar materialvalet efter husets ålder, taklutning och din budget. På villaområdena med enklare sadeltak är TP20 eller betongpannor ofta det mest kostnadseffektiva valet, medan dubbelfalsat plåttak passar bra på tak med mer komplicerad geometri.",
      "Har fastigheten ett äldre eternittak samordnar vi saneringen med en behörig saneringsfirma enligt Arbetsmiljöverkets föreskrifter, innan det nya taket läggs. Vi utför inte asbestsanering själva.",
      INCLUDES("Huddinge", "i"),
      PROCESS,
      ROT,
      COMPARE("Huddinge", "i"),
      CTA("Huddinge", "i"),
    ],
  },
  jarfalla: {
    title: "Takbyte i Järfälla — fast pris, 10 års utförandegaranti",
    description:
      "Takbyte i Järfälla: villaområden i Jakobsberg, Kallhäll och Barkarby. Kostnadsfri takkontroll, fast pris, 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI.",
    content: [
      "Järfälla har vuxit fram kring flera villa- och radhusområden — Jakobsberg, Kallhäll, Viksjö och det snabbt växande Barkarbystaden — med bebyggelse som spänner från 1960-talsvillor till helt nybyggda kvarter. De äldre villaområdena har ofta betongpannor eller äldre plåttak som nu närmar sig eller passerat sin förväntade livslängd, medan nyare områden som Barkarbystaden har moderna taklösningar från start.",
      "I Mälardalens inlandsklimat, som Järfälla tillhör, är det framför allt snölast och temperaturväxlingar mellan årstiderna som sliter på tak — snölast ställer krav på takstolarnas dimensionering och på snörasskyddens placering, medan upprepade frysningar och upptiningar påskyndar frostsprängning i äldre betongpannor. Vi kontrollerar alltid takstolarnas skick och att snörasskydd är rätt dimensionerade när vi byter tak i Järfälla.",
      "Vi utför takbyte i Järfälla med TP20-plåttak, dubbelfalsat plåttak, betongpannor, tegelplåt och lertegel. På villaområdena i Jakobsberg och Kallhäll är betongpannor och TP20 vanligast, medan dubbelfalsat plåttak eller lertegel oftare väljs på hus där ett mer exklusivt eller traditionellt utseende är prioriterat.",
      "Har fastigheten ett äldre eternittak samordnar vi saneringen med en behörig saneringsfirma enligt Arbetsmiljöverkets föreskrifter, innan det nya taket läggs. Vi utför inte asbestsanering själva.",
      INCLUDES("Järfälla", "i"),
      PROCESS,
      ROT,
      COMPARE("Järfälla", "i"),
      CTA("Järfälla", "i"),
    ],
  },
  "upplands-vasby": {
    title: "Takbyte i Upplands Väsby — fast pris & garanti",
    description:
      "Takbyte i Upplands Väsby: villor och radhus från 1970- och 80-talet. Kostnadsfri takkontroll, fast pris, 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI.",
    content: [
      "Upplands Väsby har en stor andel villa- och radhusbebyggelse från 1970- och 80-talet, samt nyare bostadsområden kring Väsby centrum och Runby. Många av kommunens hus har nu tak som är 30–50 år gamla, vilket är i det åldersspann där betongpannor ofta börjar frostspränga och underlagspappen torkar ut och spricker — de vanligaste tecknen på att det är dags att planera ett takbyte.",
      "Som inlandskommun i norra Storstockholm får Upplands Väsby framför allt sliten av snölast och temperaturväxlingar snarare än salt luft. Vi dimensionerar alltid snörasskydd över entréer och uteplatser och kontrollerar takstolarnas bärförmåga innan nytt, tyngre material som betongpannor monteras.",
      "Vi utför takbyte i Upplands Väsby med TP20-plåttak, dubbelfalsat plåttak, betongpannor, tegelplåt och lertegel. På den typiska villa- och radhusbebyggelsen från 1970- och 80-talet är betongpannor och TP20-plåt de vanligaste valen, och vi ger dig en ärlig rekommendation utifrån husets ålder, taklutning och budget.",
      "Har fastigheten ett äldre eternittak samordnar vi saneringen med en behörig saneringsfirma enligt Arbetsmiljöverkets föreskrifter, innan det nya taket läggs. Vi utför inte asbestsanering själva.",
      INCLUDES("Upplands Väsby", "i"),
      PROCESS,
      ROT,
      COMPARE("Upplands Väsby", "i"),
      CTA("Upplands Väsby", "i"),
    ],
  },
  stockholm: {
    title: "Takbyte i Stockholm — fast pris, 10 års utförandegaranti",
    description:
      "Takbyte i Stockholm: från innerstadens fastigheter till villaförorterna. Kostnadsfri takkontroll, fast pris, 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI.",
    content: [
      "Stockholm rymmer en stor spännvidd av bebyggelse: sekelskiftesfastigheter med bandtäckt plåt eller tegel i innerstadskvarteren, funktionalistiska flerbostadshus från 1930- och 40-talet, villaförorter från efterkrigstiden och moderna nyproduktionsområden. Ett takbyte i Stockholm handlar därför sällan om ett standardtak — takets historia, husets skyddsvärde och den omgivande bebyggelsen påverkar ofta materialval och utförande.",
      "Att byta tak i tätbebyggda delar av Stockholm ställer särskilda krav på logistik. Trånga gator, parkeringsregler, avspärrningar och grannhänsyn gör att ställning, materialupplag och avfallshantering måste planeras i detalj och ofta bokas i förväg med fastighetsägare eller bostadsrättsförening. Vi tar hand om den planeringen och håller löpande kontakt med dig genom hela projektet.",
      "Vi utför takbyte i Stockholm med samtliga vanliga material: TP20-plåttak, dubbelfalsat plåttak (bandtäckning), betongpannor, tegelplåt och lertegel. På äldre fastigheter i innerstaden och i kulturhistoriskt värdefulla villaområden används ofta dubbelfalsad bandtäckning eller lertegel för att bevara byggnadens ursprungliga uttryck, medan villaförorterna oftare har betongpannor eller TP20 från tidigare takbyten.",
      "Har fastigheten ett äldre eternittak samordnar vi saneringen med en behörig saneringsfirma enligt Arbetsmiljöverkets föreskrifter, innan det nya taket läggs. Vi utför inte asbestsanering själva.",
      INCLUDES("Stockholm", "i"),
      PROCESS,
      ROT,
      "Vad kostar ett takbyte i Stockholm? Priset beror på takets storlek, lutning, material, underlagets skick och fastighetens tillgänglighet. Riktpriserna på vår prislista är en bra utgångspunkt, men vi lämnar alltid ett fast pris efter besiktning.",
      COMPARE("Stockholm", "i"),
      CTA("Stockholm", "i"),
    ],
  },
};
