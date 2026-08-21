import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

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
      </main>
      <Footer />
    </>
  );
};

export default ProcessPage;
