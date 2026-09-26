import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initClickTracking } from "./lib/analytics";
import { initConsent } from "./lib/consent";
import { captureUtm } from "./lib/utm";

captureUtm();
initConsent();
initClickTracking();
createRoot(document.getElementById("root")!).render(<App />);
