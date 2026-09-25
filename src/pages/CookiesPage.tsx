import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import { openConsentSettings } from "@/lib/consent";

const sections = [
  {
    title: "Nödvändig lagring",
    text: "För att sajten ska fungera och komma ihåg ditt cookieval sparar vi en post i webbläsarens lokala lagring (rt_consent_v1). Den innehåller bara ditt val, ingen persondata, och behövs inte något samtycke för.",
  },
  {
    title: "Statistik (Google Analytics)",
    text: "Om du godkänner statistik laddar vi Google Analytics 4. Det sätter cookies med namn som _ga och _ga_ följt av ett id, och används för att räkna besök, se vilka sidor som används och mäta hur många som ringer eller skickar en förfrågan. Uppgifterna behandlas av Google. Utan ditt godkännande laddas Google Analytics inte alls och inga statistikcookies sätts.",
  },
  {
    title: "Uppgifter du lämnar i formulär",
    text: "När du skickar en förfrågan sparas namn, telefon, e-post, adress och ditt meddelande i vårt kundsystem, så att vi kan svara dig och lämna offert. Du kan när som helst be om att få se eller radera dina uppgifter genom att kontakta oss.",
  },
];

const CookiesPage = () => (
  <>
    <SEOHead
      title="Cookies och integritet"
      description="Så använder roslagstak.se cookies och vilka uppgifter vi sparar när du kontaktar oss. Du väljer själv om statistik ska vara på."
      canonical="https://roslagstak.se/cookies"
    />
    <Header />
    <main>
      <div className="pt-24">
        <Breadcrumbs items={[{ name: "Hem", path: "/" }, { name: "Cookies och integritet" }]} />
      </div>
      <PageHero
        eyebrow="Integritet"
        title="Cookies och integritet"
        text="Här ser du vad vi sparar, varför, och hur du ändrar ditt val."
      />
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-12">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="font-display text-2xl text-foreground">{s.title}</h2>
                <p className="mt-3 text-[17px] leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            ))}
            <div>
              <h2 className="font-display text-2xl text-foreground">Ändra ditt val</h2>
              <p className="mt-3 text-[17px] leading-relaxed text-muted-foreground">
                Du kan när som helst godkänna eller stänga av statistik.
              </p>
              <button
                type="button"
                onClick={openConsentSettings}
                className="mt-5 rounded-full bg-primary px-7 py-3.5 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Öppna cookieinställningar
              </button>
            </div>
            <div>
              <h2 className="font-display text-2xl text-foreground">Kontakt</h2>
              <p className="mt-3 text-[17px] leading-relaxed text-muted-foreground">
                Frågor om hur vi hanterar dina uppgifter? Mejla{" "}
                <a href="mailto:info@roslagstak.se" className="text-primary underline underline-offset-4">
                  info@roslagstak.se
                </a>{" "}
                eller ring 070-154 36 39.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default CookiesPage;
