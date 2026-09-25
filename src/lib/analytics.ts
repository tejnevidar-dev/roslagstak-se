import { hasAnalyticsConsent } from "@/lib/consent";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Skickar en GA4-händelse. Gör ingenting om taggen inte är laddad (t.ex. blockerad eller i test). */
export const trackEvent = (name: string, params: EventParams = {}) => {
  if (!hasAnalyticsConsent()) return;
  try {
    window.gtag?.("event", name, { page_path: window.location.pathname, ...params });
  } catch {
    /* mätning får aldrig störa sidan */
  }
};

/** Räknar klick på telefonnummer och e-postlänkar var de än ligger på sajten. */
export const initClickTracking = () => {
  document.addEventListener(
    "click",
    (event) => {
      const link = (event.target as Element | null)?.closest?.("a[href^='tel:'], a[href^='mailto:']");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      trackEvent(href.startsWith("tel:") ? "phone_click" : "email_click", { link_url: href });
    },
    { capture: true },
  );
};
