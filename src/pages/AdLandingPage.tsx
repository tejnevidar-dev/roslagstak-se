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
  "F-skatt och ansvarsförsäkring",
  "10 års utförandegaranti",
  "30 års tätskiktsgaranti (MATAKI)",
  "Arbete enligt AMA",
];

const steps = [
  {
    title: "Kostnadsfri besiktning",
    text: "Vi återkommer inom 24 timmar och bokar en tid. På plats går vi igenom taket, fotograferar och mäter.",
  },
  {
    title: "Skriftlig offert med fast pris",
    text: "Du får ett fast pris där rivning, material, arbete och bortforsling är specificerade. Inga dolda tillägg.",
  },
  {
    title: "Vi utför jobbet",
    text: "Vi sköter hela arbetet, städar och går igenom resultatet tillsammans med dig. Du får garantihandlingar och foton.",
  },
];

const prices = [
  { label: "TP20 plåttak", value: "från ca 1 200 kr/m²" },
  { label: "Betongpannor och tegelplåt", value: "från ca 1 300 kr/m²" },
  { label: "Dubbelfalsat plåttak (bandtäckning)", value: "från ca 2 000 kr/m²" },
];

const faqs = [
  {
    q: "Vad kostar ett takbyte?",
    a: "Priset beror på takets storlek, lutning, material och skick. Riktpriserna ovan är utgångspunkter, och efter den kostnadsfria besiktningen får du ett fast pris. Det priset gäller.",
  },
  {
    q: "Vad ingår i priset?",
    a: "Rivning och bortforsling av gamla taket, underlagspapp och läkt vid behov, tätskikt, plåtbeslag, taksäkerhet och städning. Hittar vi skadad råspont när gamla taket är rivet fotograferar vi, visar dig omfattningen och lämnar ett pris på tillägget innan vi fortsätter.",
  },
  {
    q: "Hur fungerar ROT-avdraget?",
    a: "ROT-avdraget ger 30 % skattereduktion på arbetskostnaden, upp till 50 000 kr per person och år. Arbetskostnaden specificeras separat i offerten, och beloppet dras av direkt på fakturan.",
  },
  {
    q: "Vilken garanti får jag?",
    a: "Vi lämnar 10 års utförandegaranti och 30 års tätskiktsgaranti genom MATAKI. Efter slutbesiktningen får du garantihandlingar och foton från arbetet.",
  },
  {
    q: "Behöver jag bygglov?",
    a: "Byter du till likvärdigt material och behåller takets utseende krävs normalt inget bygglov. Byter du kulör eller material, eller bygger takkupor, kan bygglov eller anmälan behövas. Vi kontrollerar vad som gäller i din kommun.",
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
        title={`Takbyte ${inPlace} — fast pris efter besiktning`}
        description={`Nytt tak ${inPlace}? Kostnadsfri besiktning och fast pris. 10 års utförandegaranti. Svar inom 24 timmar.`}
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
                <span className="italic text-accent">Fast pris efter kostnadsfri besiktning.</span>
              </h1>
              <p className="mt-5 max-w-[50ch] text-[18px] leading-relaxed text-muted-foreground">
                Vi besiktigar taket, lämnar ett skriftligt fast pris och sköter hela jobbet. Vi tar uppdrag i{" "}
                {landing.areas}.
              </p>
              <a
                href={PHONE_HREF}
                className="mt-7 inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-8 py-4 text-[18px] font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
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

        <section className="border-y border-border bg-secondary py-14 md:py-20" aria-labelledby="ad-price-heading">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <h2
                id="ad-price-heading"
                className="font-display text-[clamp(1.7rem,3.4vw,2.4rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-balance text-foreground"
              >
                Vad kostar ett takbyte?
              </h2>
              <p className="mt-4 max-w-[38ch] leading-relaxed text-muted-foreground">
                Riktpriser inklusive material och arbete. Efter besiktningen får du ett fast pris.
              </p>
            </div>
            <div className="lg:col-span-8">
              <ul className="border-t border-foreground/15">
                {prices.map((p) => (
                  <li key={p.label} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-foreground/15 py-4">
                    <span className="text-foreground">{p.label}</span>
                    <span className="font-display text-lg text-foreground">{p.value}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 max-w-[60ch] text-[15px] leading-relaxed text-muted-foreground">
                ROT-avdraget ger 30 % skattereduktion på arbetskostnaden, upp till 50 000 kr per person och år. Det
                dras av direkt på fakturan.
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
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[16px] font-semibold text-accent-foreground hover:bg-accent/90"
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
        RoslagsTak · F-skatt · Fullständigt försäkrade ·{" "}
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
          <Phone className="h-4 w-4" aria-hidden="true" /> Ring nu
        </a>
        <a
          href="#forfragan"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent py-3.5 text-[15px] font-semibold text-accent-foreground"
        >
          Få offert
        </a>
      </div>
    </>
  );
};

export default AdLandingPage;
