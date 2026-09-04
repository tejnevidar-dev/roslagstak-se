import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedLinks from "@/components/RelatedLinks";
import PageHero from "@/components/PageHero";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";

const roofTypeFaqs = [
  {
    question: "Vilken taktyp håller längst?",
    answer:
      "Dubbelfalsad bandtäckning i plåt har längst teknisk livslängd — 60 år eller mer med rätt underhåll. Lertegel ligger på 50–80 år, betongpannor 40–50 år och TP20-plåt cirka 40 år. Underlagspappen är oftast det som avgör när taket behöver läggas om.",
  },
  {
    question: "Vad kostar de olika taktyperna per kvadratmeter?",
    answer:
      "Som riktpris: TP20-plåt från ca 1 200 kr/m², pannplåt och tegelprofilerad plåt 1 300–1 600 kr/m², betongpannor från ca 1 300 kr/m² och dubbelfalsad bandtäckning från ca 2 000 kr/m². Priset inkluderar rivning, underlagspapp, läkt, material och arbete.",
  },
  {
    question: "Plåttak eller betongpannor — vad passar bäst nära havet?",
    answer:
      "Nära kusten rekommenderar vi plåt med hög korrosionsklass eller lertegel. Saltluft och kraftig vind sliter på infästningar, och pannor kan lyfta i utsatta lägen. Vi går igenom takets vindlast och läge vid besiktningen.",
  },
  {
    question: "Kan jag lägga plåttak direkt på gamla betongpannor?",
    answer:
      "Nej. Ett nytt tak kräver att gamla pannor och läkt rivs så att underlagspappen kan bytas och råsponten kontrolleras. Att lägga nytt ovanpå gammalt döljer fuktskador och gör garantin verkningslös.",
  },
  {
    question: "Vilken taklutning krävs för de olika materialen?",
    answer:
      "Betongpannor och lertegel kräver normalt minst 14 graders lutning, profilerad plåt fungerar från ca 8 grader och bandtäckning eller papp/duk kan användas ned till flacka och helt platta tak.",
  },
  {
    question: "Hur låter ett plåttak vid regn?",
    answer:
      "Med underlagspapp, läkt och isolerad vind är skillnaden mot pannor liten i bostadsdelen. På oisolerade byggnader som garage och uthus hörs regnet tydligare.",
  },
];

const RoofTypes = lazy(() => import("@/components/RoofTypes"));
const IslandSpecialist = lazy(() => import("@/components/IslandSpecialist"));

const RoofTypesPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const t = window.setTimeout(() => {
      document
        .querySelector(location.hash)
        ?.scrollIntoView({ behavior: "smooth" });
    }, 150);
    return () => window.clearTimeout(t);
  }, [location.hash]);

  return (
    <>
      <SEOHead
        title="Taktyper — plåttak, tegel & betongpannor | RoslagsTak"
        description="Jämför taktyper: TP20, pannplåt, tegelplåt, dubbelfalsad bandtäckning, lertegel, betongpannor och papptak. Livslängd, för- och nackdelar och pris per m²."
        canonical="https://roslagstak.se/taktyper"
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Hem", path: "/" },
          { name: "Taktyper", path: "/taktyper" },
        ])}
      />
      <Header />
      <main>
        <Breadcrumbs items={[{ name: "Hem", path: "/" }, { name: "Taktyper", path: "/taktyper" }]} withSchema={false} />
        <PageHero
          eyebrow="Taktyper"
          title="Vilket tak passar ditt hus?"
          text="Vi arbetar med alla vanliga taktyper i Roslagen och skärgården. Här jämför du material, livslängd och kostnad."
        />
        <Suspense fallback={null}>
          <RoofTypes />
          <IslandSpecialist />
        </Suspense>
        <FaqSection
          title="Frågor om taktyper och material"
          intro="Livslängd, pris per kvadratmeter, taklutning och vad som fungerar bäst i kust- och skärgårdsmiljö."
          faqs={roofTypeFaqs}
          path="/taktyper"
        />
        <RelatedLinks currentPath="/taktyper" title="Mer om tak och pris" />
      </main>
      <Footer />
    </>
  );
};

export default RoofTypesPage;
