import "./lib/safe-storage-init"; // först av allt: lagring som kastar (alla kakor blockerade) ska inte stoppa sidan eller formulären
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initClickTracking, initFormFunnelTracking } from "./lib/analytics";
import { initConsent } from "./lib/consent";
import { initConsentStorage } from "./lib/lagring-samtycke";

initConsentStorage();
initConsent();
initClickTracking();
initFormFunnelTracking();
/* Det fulla stilbladet laddas utan att blockera första målningen (paket 62, scripts/generate-static-heads.mjs). React ritar först när det är laddat (högst 3 s), så att inget ostylat syns. */
let startad = false;
const starta = () => {
  if (startad) return;
  startad = true;
  const lat = document.querySelector<HTMLLinkElement>("link[data-css-lazy]");
  if (lat) lat.media = "all";
  createRoot(document.getElementById("root")!).render(<App />);
};
const latCss = document.querySelector<HTMLLinkElement>("link[data-css-lazy]");
if (latCss && !latCss.sheet) {
  latCss.addEventListener("load", starta, { once: true });
  latCss.addEventListener("error", starta, { once: true });
  window.setTimeout(starta, 3000);
} else {
  starta();
}
