import { useLocation } from "react-router-dom";
import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import NotFound from "@/pages/NotFound";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LeadForm from "@/components/LeadForm";
import { getAdLanding, type AdLanding } from "@/data/ad-landings";
import logo from "@/assets/roslagstak-logo.png";

const PHONE_DISPLAY = "070-154 36 39";
const PHONE_HREF = "tel:0701543639";

const trust = [
  "10 års utförandegaranti",
  "30 års tätskiktsgaranti via MATAKI",
  "Arbete enligt AMA",
];

const steps = [
  {
    title: "Kostnadsfri takkontroll",
    text: "Vi svarar inom 24 timmar och bokar en tid. En av våra säljare tittar på taket på plats, det tar ungefär 1–2 timmar.",
  },
  {
    title: "Offert med fast pris",
    text: "Du får en offert med fast pris. Tillägg bara efter ditt godkännande.",
  },
  {
    title: "Vi utför jobbet",
    text: "Vi utför arbetet enligt AMA. När taket är klart går vi igenom det tillsammans med dig.",
  },
];

const faqs = [
  {
    q: "Vad kostar ett takbyte?",
    a: "Priset beror på takets storlek, lutning, material och skick. Efter den kostnadsfria takkontrollen får du en offert med fast pris. Tillägg görs bara efter ditt godkännande.",
  },
  {
    q: "Vad ingår i priset?",
    a: "Vad som ingår står alltid i offerten. Ett komplett takbyte omfattar normalt nytt underlag, ny läkt, nytt ytmaterial och nya plåtdetaljer, och byggställning ingår. Skadad råspont syns först när det gamla taket är rivet. Hittar vi något visar vi dig omfattningen och lämnar ett skriftligt pris på tillägget innan vi fortsätter. Inget extraarbete görs utan ditt godkännande. Det enda undantaget är om något akut måste skyddas mot skada, till exempel ett öppet tak inför regn, och vi inte får tag på dig. Då gör vi bara det som är nödvändigt.",
  },
  {
    q: "Hur fungerar ROT-avdraget?",
    a: "Som privatperson kan du få ROT-avdrag på 30 % av arbetskostnaden, högst 50 000 kr per person och år, om du äger bostaden och har utrymme kvar. ROT-avdraget dras direkt på fakturan.",
  },
  {
    q: "Vilken garanti får jag?",
    a: "Vi lämnar 10 års garanti på utförandet. Tätskiktet har 30 års garanti via tillverkaren MATAKI, på tillverkarens villkor. Vilka garantier som gäller för ditt tak står i offerten.",
  },
  {
    q: "Behöver jag bygglov?",
    a: "För småhus krävs normalt inget bygglov för att byta takmaterial eller kulör. Kommunen kan ha bestämt annat i detaljplanen eller för värdefulla miljöer, så fråga byggnadsnämnden om du är osäker.",
  },
];

const AdLandingPage = () => {
  const { pathname } = useLocation();
  const landing = getAdLanding(pathname.replace(/^\/offert\//, "").replace(/\/$/, ""));
  if (!landing) return <NotFound />;

  const inPlace = `${landing.prep} ${landing.name}`;

  return (
    <>
      <SEOHead
        title={`Takbyte ${inPlace} — fast pris efter takkontroll`}
        description={`Nytt tak ${inPlace}? Kostnadsfri takkontroll och fast pris. 10 års utförandegaranti. Svar inom 24 timmar.`}
        canonical={`https://roslagstak.se/offert/${landing.slug}`}
        noindex
      />

      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <img src={logo} alt="RoslagsTak" width={1437} height={535} className="h-9 w-auto" />
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">{PHONE_DISPLAY}</span>
            <span className="sm:hidden">Ring</span>
          </a>
        </div>
      </header>

      <main className="pb-28 md:pb-0">
        <section className="border-b border-border bg-secondary">
          <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 py-10 md:py-16 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.16em] text-primary">
                Takläggare {inPlace}
              </p>
              <h1 className="max-w-[20ch] font-display text-[clamp(2.1rem,6vw,3.4rem)] font-semibold leading-[1.07] tracking-[-0.025em] text-balance text-foreground">
                Nytt tak {inPlace}?{" "}
                <span className="italic text-accent">Fast pris efter kostnadsfri takkontroll.</span>
              </h1>
              <p className="mt-5 max-w-[50ch] text-[18px] leading-relaxed text-muted-foreground">
                Kostnadsfri takkontroll utan förpliktelser, en kontaktperson genom hela processen och fast pris i offerten. Takfirma med bas i Norrtälje.
                Vi lägger betongpannor, lertegel, TP20 och dubbelfalsat plåttak (bandtäckning). Vi tar uppdrag i {landing.areas}.
              </p>
              <a
                href={PHONE_HREF}
                className="mt-7 inline-flex items-center justify-center gap-2.5 rounded-full bg-cta px-8 py-4 text-[18px] font-semibold text-cta-foreground transition-colors hover:bg-cta/90"
              >
                <Phone className="h-5 w-5" aria-hidden="true" /> Ring {PHONE_DISPLAY}
              </a>
              <ul className="mt-8 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {trust.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[15px] text-foreground">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div id="forfragan" className="scroll-mt-24 lg:col-span-5">
              <LeadForm
                source={`Annonssida /offert/${landing.slug} (${landing.name})`}
                formName="annons"
                ort={landing.slug}
                addressPlaceholder={`Gatuadress, ${landing.name}`}
              />
            </div>
          </div>
        </section>

        <section className="bg-background py-14 md:py-20" aria-labelledby="ad-steps-heading">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-12 lg:gap-14">
            <h2
              id="ad-steps-heading"
              className="font-display text-[clamp(1.7rem,3.4vw,2.4rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-balance text-foreground lg:col-span-4"
            >
              Så går det till
            </h2>
            <ol className="lg:col-span-8">
              {steps.map((s, i) => (
                <li key={s.title} className="grid gap-x-6 border-t border-border py-6 last:border-b sm:grid-cols-[3rem_1fr]">
                  <span className="font-display text-3xl leading-none text-accent tabular-nums">{i + 1}</span>
                  <div>
                    <h3 className="font-display text-[1.25rem] text-foreground">{s.title}</h3>
                    <p className="mt-1.5 max-w-[56ch] leading-relaxed text-muted-foreground">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* TILLFÄLLIGT BORTTAG 2026-09-29 (Marknadschefen/juristen, #1l): prissektionen visade
            "från ca 1 200/1 300/2 000 kr/m²", under CRM:s golv (MFL 10 §, vilseledande).
            Återställ med riktpriser när Vidar beslutat P1 (ledning/jurist/prisjamforelse-mfl-bedomning.md) —
            se git-historiken för den borttagna `prices`-listan och <ul>-renderingen. */}
        <section className="border-y border-border bg-secondary py-14 md:py-20" aria-labelledby="ad-price-heading">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <h2
                id="ad-price-heading"
                className="font-display text-[clamp(1.7rem,3.4vw,2.4rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-balance text-foreground"
              >
                Vad kostar ett takbyte?
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="max-w-[60ch] text-[15px] leading-relaxed text-muted-foreground">
                Fast pris efter kostnadsfri takkontroll — utan förpliktelser. Som privatperson kan du få
                ROT-avdrag på 30 % av arbetskostnaden, högst 50 000 kr per person och år, om du äger bostaden och har
                utrymme kvar. ROT-avdraget dras direkt på fakturan.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-background py-14 md:py-20" aria-labelledby="ad-faq-heading">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-12 lg:gap-14">
            <h2
              id="ad-faq-heading"
              className="font-display text-[clamp(1.7rem,3.4vw,2.4rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-balance text-foreground lg:col-span-4"
            >
              Vanliga frågor
            </h2>
            <Accordion type="single" collapsible className="border-t border-border lg:col-span-8">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`f-${i}`} className="border-b border-border">
                  <AccordionTrigger className="py-5 text-left font-display text-lg text-foreground hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="bg-primary py-14 text-primary-foreground md:py-16">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-center">
            <h2 className="max-w-[24ch] font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight text-balance">
              Redo att få ett fast pris på ditt tak?
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cta px-7 py-3.5 text-[16px] font-semibold text-cta-foreground hover:bg-cta/90"
              >
                <Phone className="h-4 w-4" aria-hidden="true" /> {PHONE_DISPLAY}
              </a>
              <a
                href="#forfragan"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary-foreground/40 px-7 py-3.5 text-[16px] font-semibold hover:bg-primary-foreground/10"
              >
                Skicka förfrågan <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background px-5 py-6 text-center text-[13px] text-muted-foreground">
        RoslagsTak ·{" "}
        <a href="/" className="underline underline-offset-4 hover:text-foreground">
          roslagstak.se
        </a>{" "}
        ·{" "}
        <a href="/cookies" className="underline underline-offset-4 hover:text-foreground">
          Cookies
        </a>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 flex gap-3 border-t border-border bg-background/95 px-4 py-3 backdrop-blur md:hidden">
        <a
          href={PHONE_HREF}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-[15px] font-semibold text-primary-foreground"
        >
          <Phone className="h-4 w-4" aria-hidden="true" /> Ring
        </a>
        <a
          href="#forfragan"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-cta py-3.5 text-[15px] font-semibold text-cta-foreground"
        >
          Boka takkontroll
        </a>
      </div>
    </>
  );
};

export default AdLandingPage;
