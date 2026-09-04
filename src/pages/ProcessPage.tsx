import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";

const processFaqs = [
  {
    question: "Hur lång tid tar ett takbyte?",
    answer:
      "Ett normalt villatak på 130–170 m² tar oftast 1–2 veckor från rivning till slutbesiktning, förutsatt att vädret tillåter. Behöver råsponten bytas eller taket har många genomföringar och kupor tar det längre tid. Du får en tidplan i offerten.",
  },
  {
    question: "Behöver jag bygglov för takbyte?",
    answer:
      "Byter du till likvärdigt material och behåller takets utseende krävs normalt inget bygglov. Byter du kulör, material eller gör takkupor kan bygglov eller anmälan behövas. Vi kontrollerar vad som gäller i din kommun och hjälper till med handlingarna.",
  },
  {
    question: "Vilka lager består ett tak av?",
    answer:
      "Underifrån: takstolar, råspont, underlagspapp, ströläkt och bärläkt, därefter takmaterialet — plåt, betongpannor eller tegel. Till det kommer plåtdetaljer som fotplåt, vindskivebeslag, skorstensbeslag samt hängrännor och stuprör.",
  },
  {
    question: "Kan jag bo kvar under takbytet?",
    answer:
      "Ja, i de allra flesta fall bor du kvar. Vi täcker in taket vid dagens slut och vid regn, håller uppfarten framkomlig och städar löpande. Är taket helt öppet en dag med varsel om kraftigt regn skjuter vi hellre på det momentet.",
  },
  {
    question: "Vad händer om ni hittar röta i råsponten?",
    answer:
      "Skadad råspont syns först när det gamla taket är rivet. Vi fotograferar, visar dig omfattningen och lämnar ett pris på tilläggsarbetet innan vi fortsätter. Inget extraarbete utförs utan att du godkänt det.",
  },
  {
    question: "Vad ingår i slutbesiktningen?",
    answer:
      "Vi går igenom taket tillsammans med dig: infästningar, plåtdetaljer, avvattning, taksäkerhet och städning av tomten. Du får garantibevis, materialdokumentation och bilder från arbetet.",
  },
];


const LayerIntro = lazy(() => import("@/components/LayerIntro"));
const RoofBuildAnimation = lazy(() => import("@/components/RoofBuildAnimation"));
const Testimonials = lazy(() => import("@/components/Testimonials"));

const ProcessPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const t = window.setTimeout(() => {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
    return () => window.clearTimeout(t);
  }, [location.hash]);

  return (
    <>
      <SEOHead
        title="Så går ett takbyte till — steg för steg | RoslagsTak"
        description="Följ ett takbyte steg för steg: råspont, underlagspapp, hängrännor, vindskivor, läkt, pannor och plåtbeslag. Se filmen och lär dig takets uppbyggnad."
        canonical="https://roslagstak.se/hur-det-gar-till"
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Hem", path: "/" },
          { name: "Så går det till", path: "/hur-det-gar-till" },
        ])}
      />
      <Header />
      <main>
        <PageHero
          eyebrow="Så går det till"
          title="Ett takbyte, steg för steg"
          text="Från råspont till färdigt plåtbeslag — se hur vi bygger upp ditt tak lager för lager."
        />
        <Suspense fallback={null}>
          <LayerIntro />
          <RoofBuildAnimation />
          <Testimonials />
        </Suspense>
        <FaqSection
          title="Frågor om hur ett takbyte går till"
          intro="Tidplan, bygglov, boende under arbetet och vad som händer när vi hittar skador under det gamla taket."
          faqs={processFaqs}
          path="/hur-det-gar-till"
        />
      </main>
      <Footer />
    </>
  );
};

export default ProcessPage;
