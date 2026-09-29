import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const eternitFaqs = [
  {
    question: "Vad kostar det att riva ett eternittak?",
    answer: "Kostnaden beror på takets storlek, mängden asbesthaltigt material och åtkomligheten, och sätts av den saneringsfirma vi samordnar med. Vi tar fram en offert på hela projektet — sanering och nytt tak — efter en kostnadsfri takkontroll.",
  },
  {
    question: "Får man riva eternittak själv?",
    answer: "Nej. Rivning av asbesthaltigt material, till exempel eternitplattor, kräver tillstånd från Arbetsmiljöverket och särskild utbildning. Asbesten är farligt avfall. Anlita alltid ett företag som har Arbetsmiljöverkets tillstånd för asbestrivning.",
  },
  {
    question: "Hur vet jag om mitt eternittak innehåller asbest?",
    answer: "Eternitplattor tillverkade före 1977 innehåller nästan alltid asbest. Plattor från 1977–1986 kan innehålla asbest. Är du osäker kan vi ta ett materialprov och skicka det till laboratorium för analys — helt kostnadsfritt vid takkontroll.",
  },
  {
    question: "Kan ni hjälpa till med eternitsanering på öar i skärgården?",
    answer: "Ja, på till exempel Blidö, Ljusterö, Svartlöga, Ingmarsö och Finnhamn. Vi samordnar hela projektet — takkontroll, sanering via ett företag med Arbetsmiljöverkets tillstånd och sjötransport av nytt material — och håller ihop det som en kontaktperson.",
  },
  {
    question: "Vad händer med det rivna eternitmaterialet?",
    answer: "Allt asbestinnehållande material emballeras i godkända säckar och märks som farligt avfall. Saneringsfirman transporterar materialet till en godkänd deponi, och du får dokumentation på att saneringen utförts enligt gällande regler.",
  },
  {
    question: "Kan jag få ROT-avdrag för eternitsanering?",
    answer: "Ja, arbetskostnaden för både sanering och nytt tak berättigar till ROT-avdrag (30% skattereduktion, max 50 000 kr per person och år). Vi hjälper dig med ansökan och pappersarbete.",
  },
  {
    question: "Hur lång tid tar det att sanera och byta ett eternittak?",
    answer: "Ett normalt villatak tar ca 3–5 arbetsdagar för sanering och nytt tak. På öar kan det ta 1–2 dagar extra beroende på logistik och väderförhållanden. Vi planerar projektet noggrant för att minimera störningar.",
  },
  {
    question: "Vilka hälsorisker innebär eternittak med asbest?",
    answer: "Asbest är cancerframkallande vid inandning av fibrer. Intakta eternitplattor är inte farliga, men vid rivning, borrning eller slipning frigörs mikroskopiska fibrer. Därför måste allt arbete ske med fullständig skyddsutrustning, slussystem och undertryck.",
  },
];

const EternitSEOContent = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: eternitFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* Extended SEO content */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className="font-display text-2xl text-foreground mb-4">
          Eternittak och asbest — vad behöver du veta?
        </h2>
        <p className="text-foreground leading-relaxed mb-4">
          Eternit är ett byggmaterial som var mycket vanligt i Sverige mellan 1930- och 1970-talet. Eternitplattor användes som takbeläggning på villor, fritidshus och ekonomibyggnader — inte minst i Roslagen och skärgården. Materialet består av cement blandat med asbestfibrer, vilket gör det extremt hållbart men också hälsofarligt vid rivning.
        </p>
        <p className="text-foreground leading-relaxed mb-4">
          Om ditt hus är byggt före 1977 och har plattbeläggning på taket är sannolikheten stor att det är eternitplattor med asbest. Från 1977 ersattes asbesten successivt med andra fibrer, men plattor tillverkade fram till 1986 kan fortfarande innehålla asbest. Det enda sättet att vara helt säker är att låta ett laboratorium analysera ett materialprov.
        </p>
        <h3 className="font-display text-xl text-foreground mb-3 mt-8">
          Varför ska man byta eternittak?
        </h3>
        <p className="text-foreground leading-relaxed mb-4">
          Många eternittak i Roslagen är nu 50–70 år gamla och börjar bli porösa, spruckna eller mossbevuxna. Ett åldrat eternittak läcker ofta vid genomföringar och nockbeslag. Dessutom sänker ett eternittak husets marknadsvärde, och försäkringsbolag kan ha synpunkter på byggnader med asbesthaltigt material. Genom att sanera och byta till modernt takmaterial — exempelvis plåttak, betongpannor eller tegeltak — får du ett säkrare, tätare och snyggare tak med 30–50 års livslängd.
        </p>
        <h3 className="font-display text-xl text-foreground mb-3 mt-8">
          Eternitsanering i skärgården — specialkompetens krävs
        </h3>
        <p className="text-foreground leading-relaxed mb-4">
          Att sanera eternittak på en ö utan broförbindelse kräver extra planering. Farligt avfall måste emballeras säkert och transporteras med båt till godkänd deponi på fastlandet. Vi samordnar transporten även till avlägsna öar.
        </p>
        <h3 className="font-display text-xl text-foreground mb-3 mt-8">
          Sanering görs alltid av ett företag med tillstånd
        </h3>
        <p className="text-foreground leading-relaxed mb-4">
          Rivning av eternit som innehåller asbest får bara göras av ett företag med tillstånd från Arbetsmiljöverket. Vi utför inte asbestsanering själva. Vi hjälper dig att planera hela takbytet och samordnar saneringen med ett företag som har rätt tillstånd, så att rivning, emballering, transport och deponering sker enligt gällande regler. Du som kund får en enda kontaktperson hos oss genom hela processen.
        </p>
      </div>

      {/* FAQ section with JSON-LD */}
      <div className="mb-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <h2 className="font-display text-2xl text-foreground mb-6">
          Vanliga frågor om eternittak och asbestsanering
        </h2>
        <Accordion type="single" collapsible className="space-y-3">
          {eternitFaqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`eternit-faq-${index}`}
              className="bg-card border border-border rounded-2xl px-6"
            >
              <AccordionTrigger className="text-left font-semibold text-sm text-card-foreground hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Extra internal links specific to eternit */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-8">
        <h2 className="font-display text-lg text-card-foreground mb-3">
          Eternittak i din kommun
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Vi hjälper dig med eternittak i hela Roslagen — från Vaxholm till Arholma — och samordnar saneringen.
        </p>
        <div className="grid sm:grid-cols-3 gap-2">
          <Link to="/taklaggare-blido" className="flex items-center gap-1 text-sm text-primary hover:underline">
            <ArrowRight className="w-3 h-3" /> Eternittak Blidö
          </Link>
          <Link to="/taklaggare-ljustero" className="flex items-center gap-1 text-sm text-primary hover:underline">
            <ArrowRight className="w-3 h-3" /> Eternittak Ljusterö
          </Link>
          <Link to="/taklaggare-norrtalje" className="flex items-center gap-1 text-sm text-primary hover:underline">
            <ArrowRight className="w-3 h-3" /> Eternittak Norrtälje
          </Link>
          <Link to="/taklaggare-vaxholm" className="flex items-center gap-1 text-sm text-primary hover:underline">
            <ArrowRight className="w-3 h-3" /> Eternittak Vaxholm
          </Link>
          <Link to="/taklaggare-furusund" className="flex items-center gap-1 text-sm text-primary hover:underline">
            <ArrowRight className="w-3 h-3" /> Eternittak Furusund
          </Link>
          <Link to="/taklaggare-husaro" className="flex items-center gap-1 text-sm text-primary hover:underline">
            <ArrowRight className="w-3 h-3" /> Eternittak Husarö
          </Link>
        </div>
      </div>
    </>
  );
};

export default EternitSEOContent;
