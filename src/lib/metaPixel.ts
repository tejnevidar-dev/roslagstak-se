/**
 * Meta-pixel (Facebook/Instagram), sprintpunkt 6 (`ledning/marknad/ads/09-retargeting.md`, beslut.md 2026-09-28).
 * Laddas ENDAST efter marknadsföringssamtycke OCH bara om ett pixel-ID finns ifyllt nedan.
 * Skickar aldrig formulärfält (namn, telefon, e-post) eller annan persondata – bara händelsenamnet,
 * så vi behöver ingen "advanced matching".
 */

/** Fylls i av Vidar när Meta Business-kontots pixel-ID finns. Tom sträng = pixeln laddas aldrig. */
export const META_PIXEL_ID = "";

type Fbq = ((...args: unknown[]) => void) & { queue?: unknown[][]; loaded?: boolean };

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

let pixelLoaded = false;

const injectPixelScript = () => {
  if (window.fbq) return;
  const fbq: Fbq = (...args: unknown[]) => {
    (fbq.queue = fbq.queue || []).push(args);
  };
  fbq.queue = [];
  fbq.loaded = true;
  window.fbq = fbq;
  window._fbq = fbq;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
};

/** Körs efter beviljat marknadsföringssamtycke. Gör ingenting utan pixel-ID. */
export const loadMetaPixel = () => {
  if (!META_PIXEL_ID || pixelLoaded) return;
  pixelLoaded = true;
  injectPixelScript();
  window.fbq?.("init", META_PIXEL_ID);
  window.fbq?.("track", "PageView");
};

/** Anropas vid varje ruttbyte i SPA:n (initial sidvisning sker redan i loadMetaPixel). */
export const trackPixelPageView = () => {
  if (!pixelLoaded) return;
  window.fbq?.("track", "PageView");
};

/** Anropas när ett lead sparats, i samma ögonblick som GA4:s generate_lead. Skickar bara händelsenamnet. */
export const trackPixelLead = () => {
  if (!pixelLoaded) return;
  window.fbq?.("track", "Lead");
};

/** Vid återkallat samtycke: pixeln laddas inte om förrän samtycke ges igen. */
export const resetMetaPixel = () => {
  pixelLoaded = false;
};
