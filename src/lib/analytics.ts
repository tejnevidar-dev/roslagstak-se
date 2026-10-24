import { hasAnalyticsConsent, hasMarketingConsent } from "@/lib/consent";
import { trackPixelLead } from "@/lib/metaPixel";
import { attributionFields } from "@/lib/attribution";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Enhetstyp för trattmätningen (grov indelning på skärmbredd, inget fingeravtryck). */
const deviceType = (): string => {
  try {
    if (window.matchMedia("(max-width: 767px)").matches) return "mobil";
    if (window.matchMedia("(max-width: 1023px)").matches) return "surfplatta";
  } catch {
    /* matchMedia saknas i testmiljö */
  }
  return "dator";
};

/**
 * Skickar en GA4-händelse. Gör ingenting om taggen inte är laddad (t.ex. blockerad eller i test).
 * Ett lead speglas även till Meta-pixeln (bara händelsenamnet "Lead", aldrig formulärfälten i `params`).
 */
export const trackEvent = (name: string, params: EventParams = {}) => {
  if (name === "generate_lead" && hasMarketingConsent()) {
    const form = params.form;
    trackPixelLead(typeof form === "string" ? form : undefined);
  }
  if (!hasAnalyticsConsent()) return;
  try {
    const { landing_path, referrer_category } = attributionFields();
    window.gtag?.("event", name, {
      page_path: window.location.pathname,
      landing_path: landing_path ?? undefined,
      referrer_category: referrer_category ?? undefined,
      device: deviceType(),
      ...params,
    });
  } catch {
    /* mätning får aldrig störa sidan */
  }
};

/**
 * P0-4 (seo-audit/06): generate_lead räknas exakt en gång per riktigt inskick.
 *  - Testinskick (e-post på example/test-domän eller sajtens egen domän, namn som börjar på "test", "testinskick" i texten) filtreras bort och skickar varken GA4- eller Meta-händelse.
 *  - Samma formulär får inte räknas två gånger inom 60 sekunder (dubbelklick, dubbel inlämning, inlämning som återförsöks): en andra händelse för samma formulär och samma telefon/e-post släpps.
 * Alla fem formulär (LeadForm, BookingWidget, QuoteConfigurator, BrfPage, ContactLanding) går via trackLead; ingen annan kod skickar generate_lead (provas i src/test/p0-4-generate-lead.test.ts).
 */
const TEST_EPOST = /@(example\.(com|org|net|se)|test\.[a-z]+|testmail\.[a-z]+|mailinator\.com|roslagstak\.se)$/i;
export const arTestinskick = (f: { name?: string; email?: string; phone?: string; message?: string }): boolean => {
  const namn = (f.name ?? "").trim();
  const epost = (f.email ?? "").trim();
  const text = `${namn} ${f.message ?? ""}`;
  return TEST_EPOST.test(epost) || /^(test|testsson|testperson|provsson|asdf)\b/i.test(namn) || /testinskick|\[test\]/i.test(text);
};

const senasteLeads = new Map<string, number>();
/** Nollställer dubbletthållningen (provens skull). */
export const nollstallLeadMinne = () => senasteLeads.clear();

/** Skickar generate_lead för ett riktigt inskick, annars ingenting. Returnerar true om händelsen skickades. */
export const trackLead = (
  form: string,
  fields: { name?: string; email?: string; phone?: string; message?: string },
  params: EventParams = {},
  nu: number = Date.now(),
): boolean => {
  if (arTestinskick(fields)) return false;
  const nyckel = `${form}|${(fields.phone ?? "").replace(/\D/g, "")}|${(fields.email ?? "").trim().toLowerCase()}`;
  const forra = senasteLeads.get(nyckel);
  if (forra !== undefined && nu - forra < 60_000) return false;
  senasteLeads.set(nyckel, nu);
  trackEvent("generate_lead", { form, ...params });
  return true;
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

/**
 * Mätning av stegen före ett skickat formulär, utifrån (formulärkomponenterna rörs inte):
 *  - form_view: ett formulär med telefon- eller e-postfält har varit minst hälften synligt (en gång per formulär och sidvisning)
 *  - form_start: första fältet i formuläret har fått fokus (en gång per formulär)
 *  - generate_lead (skickat) och phone_click finns sedan tidigare
 * Bara formulärets namn (aria-label) skickas, aldrig fältvärden.
 */
export const initFormFunnelTracking = () => {
  if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;
  const isLeadForm = (form: Element) => !!form.querySelector('input[type="tel"], input[type="email"]');
  const label = (form: Element) => form.getAttribute("aria-label") || form.id || "formulär";
  const started = new WeakSet<Element>();
  const watched = new WeakSet<Element>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        trackEvent("form_view", { form: label(e.target) });
      }
    },
    { threshold: 0.5 },
  );
  const watch = (root: ParentNode) => {
    root.querySelectorAll("form").forEach((form) => {
      if (watched.has(form) || !isLeadForm(form)) return;
      watched.add(form);
      io.observe(form);
    });
  };
  watch(document);
  new MutationObserver((records) => {
    for (const r of records) r.addedNodes.forEach((n) => n instanceof Element && (n.matches("form") ? watch(n.parentNode ?? document) : watch(n)));
  }).observe(document.body, { childList: true, subtree: true });
  document.addEventListener(
    "focusin",
    (event) => {
      const form = (event.target as Element | null)?.closest?.("form");
      if (!form || started.has(form) || !isLeadForm(form)) return;
      started.add(form);
      trackEvent("form_start", { form: label(form) });
    },
    { capture: true },
  );
};
