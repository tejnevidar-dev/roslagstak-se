import { useEffect, useState, useCallback, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import SplashScreen, { shouldShowSplash } from "@/components/SplashScreen";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";

const RoofTypes = lazy(() => import("@/components/RoofTypes"));
const QuoteConfigurator = lazy(() => import("@/components/QuoteConfigurator"));
const FreeConsultation = lazy(() => import("@/components/FreeConsultation"));
const About = lazy(() => import("@/components/About"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const ServiceArea = lazy(() => import("@/components/ServiceArea"));
const IslandSpecialist = lazy(() => import("@/components/IslandSpecialist"));
const FAQ = lazy(() => import("@/components/FAQ"));
const GuidesTeaser = lazy(() => import("@/components/GuidesTeaser"));
const Contact = lazy(() => import("@/components/Contact"));
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(() => shouldShowSplash());

  const handleSplashDone = useCallback(() => setShowSplash(false), []);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.hash]);

  return (
    <>
      {showSplash && <SplashScreen onDone={handleSplashDone} />}
      <SEOHead
        title="Takläggare Roslagen — Takbyte & Takrenovering"
        description="RoslagsTak – takläggare i Roslagen. Takbyte, takrenovering & takomläggning på Blidö, Ljusterö, Vaxholm & Norrtälje. 10 års garanti ✓ ROT-avdrag ✓"
        canonical="https://roslagstak.se/"
      />
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Suspense fallback={null}>
          <RoofTypes />
          <QuoteConfigurator />
          <FreeConsultation />
          <About />
          <IslandSpecialist />
          <ServiceArea />
          <Testimonials />
          <GuidesTeaser />
          <FAQ />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default Index;