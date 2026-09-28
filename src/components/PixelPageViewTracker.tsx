import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPixelPageView } from "@/lib/metaPixel";

/**
 * Speglar Meta-pixelns PageView vid ruttbyte i SPA:n. Den allra första sidvisningen hoppas över här
 * eftersom loadMetaPixel() redan skickar den (antingen vid start, eller i det ögonblick besökaren
 * godkänner marknadsföring) – annars skulle den första sidan räknas dubbelt.
 */
const PixelPageViewTracker = () => {
  const { pathname } = useLocation();
  const isFirstRoute = useRef(true);

  useEffect(() => {
    if (isFirstRoute.current) {
      isFirstRoute.current = false;
      return;
    }
    trackPixelPageView();
  }, [pathname]);

  return null;
};

export default PixelPageViewTracker;
