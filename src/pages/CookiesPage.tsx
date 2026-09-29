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
    title: "Marknadsföring (Google Ads och Meta)",
    text: "Om du även godkänner marknadsföring kan Google Ads och Meta (Facebook/Instagram) se att du besökt sajten, så att vi kan visa relevant annonsering och mäta vilka annonser som ger förfrågningar. Google Ads sätter cookies som _gcl_au (lagras ca 90 dagar). Metas pixel sätter _fbp och, om du kommer via en annons, _fbc (lagras ca 90 dagar). Vi skickar aldrig namn, telefonnummer, e-post eller annat du skrivit i ett formulär till Google eller Meta – ingen \"advanced matching\" eller \"enhanced conversions\", bara att ett besök eller en förfrågan skett. Google och Meta kan föra över uppgifter till länder utanför EU, till exempel USA, med stöd av EU:s beslut om tillräcklig skyddsnivå eller standardavtalsklausuler. Har du kommit till oss via en Google-annons och godkänt marknadsföring, meddelar vi också Google när en takkontroll har genomförts eller ett avtal har signerats, och avtalets värde. Det sker med annonsens klick-id, aldrig med ditt namn, din telefon, din e-post eller din adress. Utan ditt godkännande laddas ingen av dessa och inga marknadsföringscookies sätts.",
  },
];

const CookiesPage = () => (
  <>
    <SEOHead
      title="Cookies och integritet"
      description="Så använder roslagstak.se cookies och vilka uppgifter vi sparar när du kontaktar oss. Du väljer själv om statistik och marknadsföring ska vara på."
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
              <h2 className="font-display text-2xl text-foreground">Dina personuppgifter</h2>

              <h3 className="mt-6 font-display text-lg text-foreground">Vem ansvarar för dina uppgifter?</h3>
              <p className="mt-2 text-[17px] leading-relaxed text-muted-foreground">
                Personuppgiftsansvarig är VT6 Invest AB (org.nr 559539-3595), som driver RoslagsTak, Stångholmsbacken
                77, 127 40 Skärholmen, vidar@roslagstak.se, 070-154 36 39.
              </p>

              <h3 className="mt-6 font-display text-lg text-foreground">Vilka uppgifter och varför</h3>
              <ul className="mt-2 space-y-2 text-[17px] leading-relaxed text-muted-foreground">
                <li>
                  <strong className="text-foreground">Förfrågan och takkontroll:</strong> namn, telefon, e-post,
                  adress och det du berättar om taket. Vi använder dem för att svara dig, boka takkontroll och ta
                  fram en offert. Du har själv bett om detta, så grunden är åtgärder innan ett avtal (artikel 6.1 b).
                </li>
                <li>
                  <strong className="text-foreground">Avtal och utförande:</strong> samma uppgifter plus foton av
                  taket. Grunden är att fullgöra avtalet (artikel 6.1 b).
                </li>
                <li>
                  <strong className="text-foreground">ROT-avdrag:</strong> personnummer och fastighetsbeteckning, som
                  vi lämnar till Skatteverket för att begära ROT. Grunden är avtalet och lagkrav (artikel 6.1 b och c).
                </li>
                <li>
                  <strong className="text-foreground">Bokföring:</strong> fakturor och underlag. Grunden är lagkrav
                  (artikel 6.1 c).
                </li>
                <li>
                  <strong className="text-foreground">Marknadsföring via sms eller mejl:</strong> bara om du har sagt
                  ja. Du kan när som helst ta tillbaka ditt samtycke.
                </li>
                <li>
                  <strong className="text-foreground">Google-annonsering:</strong> har du kommit till oss via en
                  Google-annons och godkänt marknadsföring, meddelar vi Google när en takkontroll har genomförts
                  eller ett avtal har signerats, och avtalets värde, kopplat till annonsens klick-id — aldrig med
                  ditt namn, din telefon, din e-post eller din adress. Grunden är ditt samtycke (artikel 6.1 a), och
                  du kan när som helst ta tillbaka det.
                </li>
              </ul>

              <h3 className="mt-6 font-display text-lg text-foreground">Vem vi delar uppgifterna med</h3>
              <p className="mt-2 text-[17px] leading-relaxed text-muted-foreground">
                Med våra säljare och de hantverkare (underentreprenörer) som utför arbetet, bara det som behövs för
                jobbet, med Skatteverket (ROT) och med våra IT-leverantörer (kundsystem, e-post och webbplats), som
                behandlar uppgifterna för vår räkning. Vi säljer aldrig dina uppgifter.
              </p>

              <h3 className="mt-6 font-display text-lg text-foreground">Hur länge vi sparar dina uppgifter</h3>
              <ul className="mt-2 space-y-2 text-[17px] leading-relaxed text-muted-foreground">
                <li>
                  <strong className="text-foreground">Förfrågningar som inte leder till avtal</strong> sparas i upp
                  till 24 månader efter vår senaste kontakt, så att vi kan följa upp din förfrågan. Därefter
                  anonymiseras de, så att de inte längre kan kopplas till dig. Har du sagt ja till att få erbjudanden
                  från oss sparar vi dina kontaktuppgifter tills du säger nej. Vi frågar dig igen om vi inte har haft
                  kontakt på tre år.
                </li>
                <li>
                  <strong className="text-foreground">Avtal och utförda jobb</strong> sparas i sin helhet i 11 år
                  efter avslutat arbete, eftersom du kan reklamera fel i upp till tio år. Därefter sparar vi bara de
                  uppgifter om fastigheten, arbetet och materialet som behövs för garantier som följer huset (till
                  exempel tillverkarens tätskiktsgaranti på upp till 30 år), dock längst 31 år. Namn, telefon, e-post
                  och priser tas då bort.
                </li>
                <li>
                  <strong className="text-foreground">Fakturor och bokföringsunderlag</strong>, inklusive underlag
                  för ROT-avdrag, sparas i 7 år enligt bokföringslagen.
                </li>
                <li>
                  <strong className="text-foreground">Dörrknackning:</strong> när vi knackar dörr sparar vi adressen
                  och om någon var hemma, för att inte knacka i onödan. Vi raderar det efter 6–12 månader. Vill du
                  inte ha besök sparar vi adressen som spärr. Säg till eller mejla{" "}
                  <a href="mailto:vidar@roslagstak.se" className="text-primary underline underline-offset-4">
                    vidar@roslagstak.se
                  </a>
                  .
                </li>
                <li>
                  Du kan när som helst invända mot att vi sparar dina uppgifter eller be oss radera dem. Då gör vi
                  det, utom när lag kräver att vi sparar dem.
                </li>
              </ul>
              <p className="mt-2 text-[17px] leading-relaxed text-muted-foreground">
                <strong className="text-foreground">Vi säljer aldrig dina uppgifter.</strong>
              </p>

              <h3 className="mt-6 font-display text-lg text-foreground">Dina rättigheter</h3>
              <p className="mt-2 text-[17px] leading-relaxed text-muted-foreground">
                Du har rätt att få veta vilka uppgifter vi har om dig, att få fel rättade, att få uppgifter raderade
                när vi inte längre behöver dem, att begära att behandlingen begränsas, att invända mot behandlingen
                och att få ut dina uppgifter (dataportabilitet). Kontakta oss på{" "}
                <a href="mailto:vidar@roslagstak.se" className="text-primary underline underline-offset-4">
                  vidar@roslagstak.se
                </a>
                . Är du missnöjd med hur vi hanterar dina uppgifter kan du klaga hos Integritetsskyddsmyndigheten
                (IMY),{" "}
                <a
                  href="https://www.imy.se"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline underline-offset-4"
                >
                  imy.se
                </a>
                .
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl text-foreground">Ändra ditt val</h2>
              <p className="mt-3 text-[17px] leading-relaxed text-muted-foreground">
                Du kan när som helst godkänna eller stänga av statistik och marknadsföring.
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
                <a href="mailto:vidar@roslagstak.se" className="text-primary underline underline-offset-4">
                  vidar@roslagstak.se
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
