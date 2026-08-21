import { useEffect, useState, useCallback, lazy, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import SplashScreen, { shouldShowSplash } from "@/components/SplashScreen";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import QuickAccess from "@/components/QuickAccess";

const About = lazy(() => import("@/components/About"));
const ServiceArea = lazy(() => import("@/components/ServiceArea"));
const GuidesTeaser = lazy(() => import("@/components/GuidesTeaser"));
import Footer from "@/components/Footer";

/* Sektioner som flyttat till egna sidor — gamla hash-länkar skickas vidare dit */
const hashRoutes: Record<string, string> = {
  "#offert": "/offert",
  "#radgivning": "/offert#radgivning",
  "#taktyper": "/taktyper",
  "#o-specialist": "/taktyper#o-specialist",
  "#hur-det-gar-till": "/hur-det-gar-till",
  "#faq": "/offert#faq",
  "#kontakt": "/kontakt",
};

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(() => shouldShowSplash());

  const handleSplashDone = useCallback(() => setShowSplash(false), []);

  useEffect(() => {
    if (!location.hash) return;
    const target = hashRoutes[location.hash];
    if (target) {
      navigate(target, { replace: true });
      return;
    }
    const t = window.setTimeout(() => {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => window.clearTimeout(t);
  }, [location.hash, navigate]);

  return (
    <>
      {showSplash && <SplashScreen onDone={handleSplashDone} />}
      <SEOHead
        title="Takläggare Roslagen — Takbyte & Takrenovering"
        description="RoslagsTak – takläggare i Roslagen. Takbyte, takrenovering & takomläggning på Blidö, Ljusterö, Vaxholm & Norrtälje. 10 års utförandegaranti + 30 års materialgaranti ✓ ROT-avdrag ✓"
        canonical="https://roslagstak.se/"
      />
      <Header />
      <main>
        <Hero />
        <QuickAccess />
        <Services />

        <Suspense fallback={null}>
          <About />
          <ServiceArea />
          <GuidesTeaser />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default Index;
