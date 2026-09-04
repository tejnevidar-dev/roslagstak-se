import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { execFileSync } from "child_process";

/** After build, write per-route HTML with canonical/robots already in the head. */
const staticHeads = () => ({
  name: "static-heads",
  apply: "build" as const,
  closeBundle() {
    execFileSync("node", ["scripts/generate-static-heads.mjs"], { stdio: "inherit" });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger(), staticHeads()].filter(Boolean),
  build: {
    // Dela ut tunga bibliotek i egna chunkar så att sidkoden kan cachas separat.
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom", "react-helmet-async"],
          motion: ["framer-motion"],
          charts: ["recharts"],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
}));
