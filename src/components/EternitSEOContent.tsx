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
    answer: "Sanering av eternittak kostar från ca 400 kr/m². Totalkostnaden inkl. nytt tak ligger vanligtvis på 1 200–1 800 kr/m² beroende på takets storlek, materialval och åtkomlighet. För ett normalt villatak (ca 150 m²) hamnar totalkostnaden ofta på 180 000–270 000 kr före ROT-avdrag.",
  },
  {
    question: "Får man riva eternittak själv?",
    answer: "Nej. Eternitplattor som innehåller asbest klassas som farligt avfall. Enligt Arbetsmiljöverkets föreskrifter (AFS 2006:1) krävs utbildning, skyddsutrustning och en godkänd saneringsplan. Rivning ska anmälas till Arbetsmiljöverket minst 7 dagar i förväg. Anlita alltid ett certifierat företag.",
  },
  {
    question: "Hur vet jag om mitt eternittak innehåller asbest?",
    answer: "Eternitplattor tillverkade före 1977 innehåller nästan alltid asbest. Plattor från 1977–1986 kan innehålla asbest. Är du osäker kan vi ta ett materialprov och skicka det till laboratorium för analys — helt kostnadsfritt vid besiktning.",
  },
  {
    question: "Kan ni sanera eternittak på öar i skärgården?",
    answer: "Ja, vi har lång erfarenhet av att sanera eternittak på öar utan broförbindelse i Roslagens skärgård — t.ex. Blidö, Ljusterö, Svartlöga, Ingmarsö och Finnhamn. Vi ordnar all sjötransport av material och farligt avfall.",
  },
  {
    question: "Vad händer med det rivna eternitmaterialet?",
    answer: "Allt asbestinnehållande material emballeras i godkända säckar och märks som farligt avfall. Vi transporterar materialet till en godkänd deponi. Du får dokumentation på att saneringen utförts enligt gällande regler.",
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
          Att sanera eternittak på en ö utan broförbindelse kräver extra planering. Farligt avfall måste emballeras säkert och transporteras med båt till godkänd deponi på fastlandet. Vi har genomfört eternitsaneringar på öar som Blidö, Ljusterö, Svartlöga, Ingmarsö, Finnhamn och Husarö. Vår erfarenhet av sjöburen logistik gör att vi kan genomföra projektet effektivt även på de mest avlägsna platserna.
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
              className="bg-card border border-border rounded-lg px-6"
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
      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <h2 className="font-display text-lg text-card-foreground mb-3">
          Eternitsanering i din kommun
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Vi utför eternitsanering i hela Roslagen — från Vaxholm till Arholma.
        </p>
        <div className="grid sm:grid-cols-3 gap-2">
          <Link to="/taklaggare-blido" className="flex items-center gap-1 text-sm text-primary hover:underline">
            <ArrowRight className="w-3 h-3" /> Eternitsanering Blidö
          </Link>
          <Link to="/taklaggare-ljustero" className="flex items-center gap-1 text-sm text-primary hover:underline">
            <ArrowRight className="w-3 h-3" /> Eternitsanering Ljusterö
          </Link>
          <Link to="/taklaggare-norrtalje" className="flex items-center gap-1 text-sm text-primary hover:underline">
            <ArrowRight className="w-3 h-3" /> Eternitsanering Norrtälje
          </Link>
          <Link to="/taklaggare-vaxholm" className="flex items-center gap-1 text-sm text-primary hover:underline">
            <ArrowRight className="w-3 h-3" /> Eternitsanering Vaxholm
          </Link>
          <Link to="/taklaggare-furusund" className="flex items-center gap-1 text-sm text-primary hover:underline">
            <ArrowRight className="w-3 h-3" /> Eternitsanering Furusund
          </Link>
          <Link to="/taklaggare-husaro" className="flex items-center gap-1 text-sm text-primary hover:underline">
            <ArrowRight className="w-3 h-3" /> Eternitsanering Husarö
          </Link>
        </div>
      </div>
    </>
  );
};

export default EternitSEOContent;
