import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initClickTracking, initFormFunnelTracking } from "./lib/analytics";
import { initConsent } from "./lib/consent";
import { captureUtm } from "./lib/utm";
import { captureAttribution } from "./lib/attribution";

captureUtm();
captureAttribution();
initConsent();
initClickTracking();
initFormFunnelTracking();
createRoot(document.getElementById("root")!).render(<App />);
