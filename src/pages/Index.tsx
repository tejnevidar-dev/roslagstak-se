import { useEffect, useState, useCallback, lazy, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SEOHead from "@/components/SEOHead";
import SplashScreen, { shouldShowSplash } from "@/components/SplashScreen";
import Header from "@/components/Header";
import Hero, { heroPosterSrcSet } from "@/components/Hero";
import Services from "@/components/Services";
import QuickAccess from "@/components/QuickAccess";
import TrustBar from "@/components/TrustBar";
import ReferenceCases from "@/components/ReferenceCases";
import DeferMount from "@/components/DeferMount";

const About = lazy(() => import("@/components/About"));
const ServiceArea = lazy(() => import("@/components/ServiceArea"));
const GuidesTeaser = lazy(() => import("@/components/GuidesTeaser"));
const FAQ = lazy(() => import("@/components/FAQ"));
import Footer from "@/components/Footer";

/* Sektioner som flyttat till egna sidor — gamla hash-länkar skickas vidare dit.
   #faq finns numera även direkt på startsidan (se <FAQ /> nedan), så den routas
   inte längre bort. */
const hashRoutes: Record<string, string> = {
  "#offert": "/offert",
  "#radgivning": "/offert#radgivning",
  "#taktyper": "/taktyper",
  "#o-specialist": "/taktyper#o-specialist",
  "#hur-det-gar-till": "/hur-det-gar-till",
  "#kontakt": "/kontakt",
};

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(() => shouldShowSplash());

  const handleSplashDone = useCallback(() => setShowSplash(false), []);

  /* Guide-teasern drar in hela blog-posts-datan (≈ 60 KB överfört). Den ligger under vecket, så den
     monteras först när webbläsaren är i vila (eller efter 3 s som tak), inte under första inläsningen. */
  const [showTeaser, setShowTeaser] = useState(false);
  useEffect(() => {
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const timer = window.setTimeout(() => setShowTeaser(true), 3000);
    const idle = ric ? ric(() => window.setTimeout(() => setShowTeaser(true), 1500), { timeout: 3000 }) : null;
    return () => {
      window.clearTimeout(timer);
      if (idle !== null) (window as unknown as { cancelIdleCallback?: (h: number) => void }).cancelIdleCallback?.(idle);
    };
  }, []);

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
        description="RoslagsTak – takläggare i Roslagen. Takbyte, takrenovering & takomläggning på Blidö, Ljusterö, Vaxholm & Norrtälje. 10 års utförandegaranti. Kostnadsfri takkontroll och fast pris."
        canonical="https://roslagstak.se/"
      />
      <Helmet>
        {/* Hero-bilden är LCP-elementet på mobil sedan cookie-bannern slutade blockera paint
            (#1ag punkt 1). Förladdar rätt AVIF-storlek innan React hunnit rendera <picture>. */}
        <link
          rel="preload"
          as="image"
          // @ts-expect-error -- imagesrcset/imagesizes stöds av moderna browsers men saknas i React:s typer
          imagesrcset={heroPosterSrcSet.avif}
          imagesizes={heroPosterSrcSet.sizes}
        />
      </Helmet>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        {/* Sektionerna under första skärmen får content-visibility:auto: webbläsaren hoppar över layout och målning av dem tills de
            närmar sig skärmen (blockeringstid på mobil). Utseendet är oförändrat, höjden reserveras med contain-intrinsic-size. */}
        {/* Varje sektion monteras i en egen ledig stund (DeferMount), så att startsidan inte renderas i en enda lång uppgift. */}
        <div className="cv-auto">
          <DeferMount minHeight={700}>
            <QuickAccess />
          </DeferMount>
        </div>
        <div className="cv-auto">
          <DeferMount minHeight={900}>
            <ReferenceCases />
          </DeferMount>
        </div>
        <div className="cv-auto">
          <DeferMount minHeight={1200}>
            <Services />
          </DeferMount>
        </div>

        <Suspense fallback={null}>
          <div className="cv-auto">
            <DeferMount minHeight={900}>
              <About />
            </DeferMount>
          </div>
          <div className="cv-auto">
            <DeferMount minHeight={700}>
              <ServiceArea />
            </DeferMount>
          </div>
          {showTeaser ? (
            <div className="cv-auto">
              <DeferMount minHeight={640}>
                <GuidesTeaser />
              </DeferMount>
            </div>
          ) : (
            <div aria-hidden="true" style={{ minHeight: 640 }} />
          )}
          <div className="cv-auto">
            <DeferMount minHeight={900}>
              <FAQ />
            </DeferMount>
          </div>
        </Suspense>
      </main>
      <div className="cv-auto">
        <DeferMount minHeight={600}>
          <Footer />
        </DeferMount>
      </div>
    </>
  );
};

export default Index;
