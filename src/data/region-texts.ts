/**
 * Godkända regiontexter (genererad av scripts/import-region.ts ur ledning/marknad/innehall/regiontexter/).
 * Redigera inte för hand: ändra briefen och kör importen. Ersätter regionens ingress och
 * "Takens förutsättningar"-text i regions.ts för de regioner som finns här.
 */
export interface RegionText {
  title: string;
  description: string;
  intro: string;
  /** Stycken; rader som börjar med "## " är rubriker, [text](/länk) och **fet** renderas av inline-md. */
  body: string[];
}

export const regionTexts: Record<string, RegionText> = {
  "Mälardalen": {
    title: "Takbyte i Mälardalen – fast pris i offerten",
    description: "Takbyte och takomläggning i Mälardalen, från Uppsala och Enköping till Strängnäs och Nykvarn. Kostnadsfri takkontroll och fast pris i offerten.",
    intro: "Mälardalen är området runt Mälaren. Enligt Wikipedia omfattar det landet från Mälarens västra ände till utloppet vid Östersjön, ungefär sydvästra Uppland, sydöstra Västmanland och norra Södermanland. Dit räknas städer som Västerås, Eskilstuna, Enköping och Strängnäs, och ibland också Uppsala. Mälardalen har aldrig varit en officiell region, och Wikipedia beskriver gränsdragningen som flytande. Storstockholm räknas i regel in, men de orterna har egna sidor hos oss.",
    body: [
      "På den här sidan samlar vi de orter väster och söder om Storstockholm där vi tar uppdrag: från Uppsala, Knivsta och Bålsta i norr, över Enköping, Västerås, Eskilstuna, Strängnäs och Mariefred, till Nykvarn, Gnesta, Trosa och Nyköping i söder. Vi har vår bas i Norrtälje och tar uppdrag i Roslagen, Storstockholm och Mälardalen.",
      "## Vad det betyder för taket",
      "Mälardalen rymmer städer, stationssamhällen och landsbygd, och husen är byggda under mycket olika tider. Det går därför inte att säga något gemensamt om taken i regionen. På ett äldre hus kan taket redan ha lagts om, och då är det skicket på underlagspapp, läkt, plåtdetaljer och hängrännor som avgör vad som behöver göras, inte husets byggår.",
      "Ett takbyte börjar alltid med att någon tittar på taket på plats. Först då syns takets form, antalet genomföringar, underlagets skick och hur man kommer åt huset, och först då går det att lämna ett fast pris. Om ett byte av material eller kulör kräver lov eller anmälan avgör kommunen där huset ligger. Varje hus får en egen takkontroll och ett eget pris.",
      "## Så går det till",
      "1. **Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
      "2. **Fast pris** i offerten.",
      "3. **Utförande enligt AMA.**",
      "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
      "Bor du i Mälardalen och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
    ],
  },
  "Norra skärgården": {
    title: "Takbyte i Norra skärgården – Singö till Arholma",
    description: "Takbyte och takomläggning i Norrtälje norra skärgård: Singö, Grisslehamn, Arholma, Svartlöga, Norröra och Söderöra. Kostnadsfri takkontroll.",
    intro: "Norra skärgården är Norrtälje kommuns öar och kustorter från Blidöarkipelagens ytterskärgård upp till Singö. Vi har vår bas i Norrtälje och har bytt tak här: på Singö lade vi i september 2026 ett nytt tak med röda betongpannor och röd TP20-plåt.",
    body: [
      "Singö ligger i norra Roslagen, nära gränsen till Uppsala län. Ön har enligt Wikipedia omkring 300 bofasta och mellan 3 000 och 4 000 fritidsboende. Sex byar är kända sedan medeltiden, kyrkan byggdes 1753, och bron till fastlandet invigdes 1955. Närmaste tätort är Grisslehamn på Väddö, en hamn vid Ålands hav som flyttades till sin nuvarande plats efter en brand 1754. Sedan 1960 går färjan till Eckerö på Åland härifrån.",
      "Arholma har omkring 50 bofasta, som på sommaren blir omkring 500. Enligt Wikipedia finns här många rester av skärgårdsbebyggelse, främst från 1800-talet, sedan all äldre bebyggelse brändes under rysshärjningarna 1719. Större delen av ön är naturreservat, och hit kommer man med passagerarbåt från Simpnäs på Björkö.",
      "Längre söderut, i Blidö socken, ligger Svartlöga. Ön har aldrig anslutits till elnätet från fastlandet. Byn och sjövistet med sina timrade bodar är riksintresse. Norröra blev känd genom filmerna om Saltkråkan. Byn återuppbyggdes på sin nuvarande plats efter 1719, och flera av de äldsta husen är enligt Wikipedia ditflyttade från Svartlöga. På Söderöra finns omkring 180 fritidshus.",
      "## Vad det betyder för taket",
      "I skärgården står hus från flera sekler: gårdar och stugor från 1700- och 1800-talen, och fritidshus från senare tid. Husets ålder säger därför lite om takets skick. På de äldre husen kan taket ha lagts om flera gånger, och det som räknas är hur underlag, läkt, plåtdetaljer och hängrännor ser ut i dag.",
      "På en ö utan bro behöver material, ställning och bortforsling planeras efter båt och brygga, och det går vi igenom innan arbetet börjar. På en gård finns ofta fler tak än bostadshusets, till exempel sjöbod och uthus, och de kan ses över vid samma tillfälle. Om ett byte av material eller kulör kräver lov eller anmälan avgör Norrtälje kommun. Varje hus får en egen takkontroll och ett eget pris.",
      "## Så går det till",
      "1. **Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
      "2. **Fast pris** i offerten.",
      "3. **Utförande enligt AMA.**",
      "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
      "Har du hus i Norra skärgården och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
    ],
  },
  "Rådmansöhalvön": {
    title: "Takbyte på Rådmansöhalvön – Gräddö och Kapellskär",
    description: "Takbyte och takomläggning på Rådmansöhalvön öster om Norrtälje: Gräddö, Räfsnäs och Kapellskär. Kostnadsfri takkontroll och fast pris i offerten.",
    intro: "Rådmansö är en halvö omkring en mil öster om Norrtälje. Enligt Wikipedia ligger bland annat Kapellskär, Gräddö och Räfsnäs här, och Rådmansö socken omfattar halvöns östra del, där E18 slutar i Kapellskär. Vi har vår bas i Norrtälje, så Rådmansöhalvön ligger nära för oss.",
    body: [
      "Längst ut ligger Kapellskär, en udde omkring 90 kilometer nordost om Stockholm. Platsen nämns första gången 1555, och härifrån har sjöfart bedrivits på Åland och Finland sedan medeltiden. År 1959 startade Viking Line trafik på Finland med Gräddö som svensk hamn, och redan året därpå flyttades trafiken till Kapellskär. En ny väg ut till hamnen invigdes 1979 och en ny terminal 1981, och sedan 1991 hör hamnen till Stockholms Hamnar.",
      "Gräddö by omtalas första gången 1547. Vid slutet av 1800-talet blev Gräddö enligt Wikipedia ett populärt turistmål, och en mängd tornförsedda sommarhus uppfördes i området. Flera pensionat startades, och orten fick ett varmbadhus. Gräddö båtvarv grundades 1924. Sedan 2015 räknar SCB Nabbo, Gräddö och Rävsnäs som en gemensam tätort.",
      "## Vad det betyder för taket",
      "Sommarhusen från slutet av 1800-talet är i dag över 120 år gamla, och på halvön finns också hus från långt senare tid. På så gamla hus kan taket redan ha lagts om, kanske flera gånger, och husets ålder säger därför lite om takets skick. Det som avgör är hur underlagspapp, läkt, plåtdetaljer och hängrännor ser ut i dag.",
      "Ett hus med torn, verandor eller andra utbyggnader har ett tak med många vinklar och anslutningar, och det är där plåtarbetet avgör hur tätt taket blir. Har ett sommarhus byggts om för att bo i året om möts ofta tak från olika tider, och skarven mellan dem är värd en extra titt. Om ett byte av material eller kulör kräver lov eller anmälan avgör Norrtälje kommun. Varje hus får en egen takkontroll och ett eget pris.",
      "## Så går det till",
      "1. **Kostnadsfri takkontroll utan förpliktelser.** En av våra säljare tittar på taket på plats, ungefär 1–2 timmar. Du betalar inget och binder dig inte.",
      "2. **Fast pris** i offerten.",
      "3. **Utförande enligt AMA.**",
      "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti via MATAKI. Som privatperson får du ROT-avdrag på 30 % av arbetskostnaden, och vi drar av det direkt på fakturan.",
      "Bor du på Rådmansöhalvön och funderar på taket? Boka en kostnadsfri takkontroll på roslagstak.se/takkontroll eller ring 070-154 36 39. Vi svarar inom 24 timmar.",
    ],
  },
};
