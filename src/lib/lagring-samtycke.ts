/**
 * Lagring i webbläsaren kräver samtycke (juristens besked 2026-10-09, också sessionStorage och också utan personuppgifter).
 * Landningssidan (rt_attribution_v1) och kampanjkällan (rt_utm_v1) sparas därför bara efter godkänd statistik:
 *  - inget val eller "Endast nödvändiga": inget skrivs, och redan sparade nycklar (från en session före den här ändringen) tas bort;
 *  - godkänner besökaren mitt i besöket börjar lagringen då (första sidan blir sidan där valet gjordes);
 *  - tar besökaren tillbaka valet tas nycklarna bort.
 * Körs vid appstart och vid varje samtyckesändring (CONSENT_CHANGED_EVENT från saveConsent).
 */
import { CONSENT_CHANGED_EVENT, hasAnalyticsConsent } from "./consent";
import { captureAttribution, clearAttribution } from "./attribution";
import { captureUtm, clearUtm } from "./utm";

export const syncStorageWithConsent = () => {
  if (hasAnalyticsConsent()) {
    captureUtm();
    captureAttribution();
  } else {
    clearUtm();
    clearAttribution();
  }
};

export const initConsentStorage = () => {
  syncStorageWithConsent();
  window.addEventListener(CONSENT_CHANGED_EVENT, syncStorageWithConsent);
};
