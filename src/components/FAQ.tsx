import { withRotForbehall } from "@/data/prices";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from "@/components/SectionHeading";
import JsonLd from "@/components/JsonLd";
import { buildFaqSchema } from "@/lib/schema";

const faqs = [
  {
    question: "Vad kostar ett takbyte i Roslagen?",
    answer: withRotForbehall("Som riktpris, efter ROT-avdrag och inkl. moms: betongpannor och TP20-plåt från 1 200 kr/m², lertegel och pannplåt från 1 300 kr/m², dubbelfalsat plåttak ca 2 000 kr/m². Exakt pris beror på taktyp, storlek och materialval, och vi lämnar alltid ett fast pris efter en kostnadsfri takkontroll — aldrig innan. Offerten är alltid kostnadsfri — konfigurera din offert direkt på sidan eller kontakta oss för rådgivning."),
  },
  {
    question: "Lägger ni tak på öar i skärgården?",
    answer: "Ja! Vi utför takprojekt på öar och kuststäder i Roslagen — från Blidö, Ljusterö och Yxlan till Husarö, Finnhamn, Ingmarsö, Svartlöga och Arholma. På Blidö och Singö har vi gjort kompletta takbyten, se Projekt.",
  },
  {
    question: "Vilka taktyper erbjuder ni?",
    answer: "Vi arbetar med TP20 plåttak, dubbelfalsat plåttak (bandtäckning), pannplåttak, betongpannetak, lertegeltak och papptak. Vi hjälper dig välja rätt material baserat på ditt hus och din budget.",
  },
  {
    question: "Hur lång garanti ger ni på takarbeten?",
    answer: "Vi ger 10 års utförandegaranti på det arbete vi utför. Vid takbyte och takomläggning, när ett nytt tätskikt läggs, gäller dessutom 30 års tätskiktsgaranti genom MATAKI. Vi arbetar enligt AMA.",
  },
  {
    question: "Kan jag använda ROT-avdrag för takbyte?",
    answer: "Ja, takbyte och takrenovering berättigar till ROT-avdrag. Du kan få 30% skattereduktion på arbetskostnaden (max 50 000 kr per person och år). Vi hanterar ansökan mot Skatteverket och drar av avdraget på fakturan.",
  },
  {
    question: "Hur snabbt får jag svar på min förfrågan?",
    answer: "Vi återkopplar inom 24 timmar efter att du skickat in din förfrågan. Därefter kommer vi överens om en kostnadsfri takkontroll, och startdatum för arbetet bestäms tillsammans med dig i offerten.",
  },
  {
    question: "Utför ni takkontroll?",
    answer: "Ja, vi erbjuder en kostnadsfri takkontroll. En av våra säljare tittar på taket på plats, ca 1–2 timmar, bland annat på takmaterial, plåtdetaljer och avvattning, och på vinden när den går att komma åt. Efteråt får du en rapport om takets skick, och behöver taket åtgärdas får du en offert med fast pris.",
  },
  {
    question: "Vilka områden i Roslagen täcker ni?",
    answer: "Vi verkar i hela Roslagen — från Vaxholm i söder till Arholma i norr. Det inkluderar Norrtälje, Blidö, Ljusterö, Yxlan, Furusund, Husarö, Finnhamn, Ingmarsö, Högmarsö, Svartlöga, Söderöra, Norröra, Humlö, Gräskö, Spillersboda, Rådmansö, Bergshamra, Svartnö, Väddö, Vätö, Singö och Grisslehamn.",
  },
  {
    question: "Kan ni riva eternittak med asbest?",
    answer: "Nej. Vi river inte asbest och har inget tillstånd för det. Vi samordnar med en behörig saneringsfirma, som river det gamla taket. Vi lägger det nya. Boka en kostnadsfri takkontroll så går vi igenom ditt tak.",
  },
];

const FAQ = () => {

  return (
    <section id="faq" className="border-b border-border bg-background py-24 md:py-36" aria-labelledby="faq-heading">
      <JsonLd data={buildFaqSchema(faqs)} />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <SectionHeading
              meta="Vanliga frågor"
              id="faq-heading"
              title="Frågor om takbyte i Roslagen"
              intro="Svar på de vanligaste frågorna om takbyte, takrenovering och takläggning i skärgården."
            />
          </div>

          <div className="lg:col-span-7">
            <Accordion type="single" collapsible className="border-t border-border">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border-b border-border"
                >
                  <AccordionTrigger className="py-6 text-left font-display text-lg font-semibold tracking-[-0.02em] text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-7 text-[15px] leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
