/** Cookie-samtycke (Google Consent Mode v2). Google Analytics laddas först när besökaren godkänner statistik. */
const STORAGE_KEY = "rt_consent_v1";
const GA_ID = "G-2XTVMBMSWY";

export interface ConsentChoice {
  analytics: boolean;
  marketing: boolean;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export const CONSENT_CHANGED_EVENT = "rt-consent-changed";
export const OPEN_CONSENT_EVENT = "rt-open-consent";

export const readConsent = (): ConsentChoice | null => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentChoice>;
    return { analytics: parsed.analytics === true, marketing: parsed.marketing === true };
  } catch {
    return null;
  }
};

export const hasAnalyticsConsent = () => readConsent()?.analytics === true;

const ensureGtag = () => {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      // gtag.js kräver arguments-objektet, inte en vanlig array
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  }
};

let scriptLoaded = false;

const loadGoogleAnalytics = () => {
  if (scriptLoaded) return;
  scriptLoaded = true;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
  window.gtag?.("js", new Date());
  window.gtag?.("config", GA_ID);
};

const removeAnalyticsCookies = () => {
  const host = window.location.hostname;
  const domains = [host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  document.cookie
    .split(";")
    .map((c) => c.trim().split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_") || name === "_gid")
    .forEach((name) => {
      domains.forEach((domain) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
      });
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
};

const applyConsent = (choice: ConsentChoice) => {
  ensureGtag();
  window.gtag?.("consent", "update", {
    analytics_storage: choice.analytics ? "granted" : "denied",
    ad_storage: choice.marketing ? "granted" : "denied",
    ad_user_data: choice.marketing ? "granted" : "denied",
    ad_personalization: choice.marketing ? "granted" : "denied",
  });
  if (choice.analytics) loadGoogleAnalytics();
  else removeAnalyticsCookies();
};

/** Körs en gång vid start: allt nekas som standard, sparat val återställs. */
export const initConsent = () => {
  ensureGtag();
  window.gtag?.("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  const saved = readConsent();
  if (saved) applyConsent(saved);
  else removeAnalyticsCookies(); // cookies från tiden före samtycke
};

export const saveConsent = (choice: ConsentChoice) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(choice));
  } catch {
    /* privat läge: valet gäller bara denna sidvisning */
  }
  applyConsent(choice);
  window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
};

export const openConsentSettings = () => {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
};
