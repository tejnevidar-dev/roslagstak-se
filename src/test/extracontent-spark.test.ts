// @vitest-environment node
/**
 * Spärr för fältet extraContent (Marknadschefens ruta 2026-10-24 06:56, låg prioritet): ortsposterna i locations.ts har kvar gamla texter i extraContent med regelord ("Vi gör alltid en ärlig bedömning", "exklusiva tak", "besiktas var femte till tionde år").
 * De ritas inte i dag (mallen tömmer fältet). Provet fäller bygget om någon extraContent-text ritas på en ortssida: alla 243 ortssidor ritas på servern (React) och i serverns HTML (förrendering), och ingen ortspost får ha sin extraContent-text i någon av dem.
 */
import { beforeAll, describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { PassThrough } from "node:stream";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { locations } from "../data/locations";
import { prerenderContent } from "../../scripts/prerender-content";

const sitemap = readFileSync(resolve(__dirname, "../../public/sitemap.xml"), "utf8");
const sidor = [...sitemap.matchAll(/<loc>https:\/\/roslagstak\.se(\/taklaggare-[a-z0-9-]+)<\/loc>/g)].map((m) => m[1]);
const NYCKEL = (t: string) => t.replace(/\s+/g, " ").trim().slice(0, 70);
const texter = locations.map((l) => [l.slug, l.extraContent ?? ""] as const).filter(([, t]) => t.trim().length > 20);

const ritaServer = async (url: string): Promise<string> => {
  const { renderToPipeableStream } = await import("react-dom/server");
  const { StaticRouter } = await import("react-router-dom/server");
  const { Routes, Route } = await import("react-router-dom");
  const { HelmetProvider } = await import("react-helmet-async");
  const { LazyMotion, domAnimation } = await import("framer-motion");
  const Sida = (await import("../pages/LocationPage")).default;
  const tree = createElement(HelmetProvider, null, createElement(LazyMotion, { features: domAnimation, strict: true }, createElement(StaticRouter, { location: url }, createElement(Routes, null, createElement(Route, { path: "/:slug", element: createElement(Sida) })))));
  return new Promise((res, rej) => {
    let html = "";
    const ut = new PassThrough();
    ut.on("data", (d) => (html += d.toString()));
    ut.on("end", () => res(html));
    const s = renderToPipeableStream(tree, { onAllReady: () => s.pipe(ut), onError: rej });
    setTimeout(() => rej(new Error("tidsgräns " + url)), 20000);
  });
};
const avkoda = (h: string) => h.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/\s+/g, " ");

describe("spärr: extraContent ritas inte", () => {
  beforeAll(() => {
    vi.stubEnv("VITE_SUPABASE_URL", "https://prov.invalid");
    vi.stubEnv("VITE_SUPABASE_PUBLISHABLE_KEY", "prov-nyckel");
  });
  it("det finns ortsposter med gammal extraContent att skydda mot (annars kan spärren tas bort tillsammans med fältet)", () => {
    expect(texter.length).toBeGreaterThan(0);
  });
  it("ingen extraContent-text står i serverns HTML (förrenderingen) på någon ortssida", () => {
    for (const url of sidor) {
      const t = JSON.stringify(prerenderContent(url)?.paragraphs ?? []);
      for (const [slug, ex] of texter) expect(t.includes(JSON.stringify(NYCKEL(ex)).slice(1, -1)), `${url}: extraContent från ${slug} syns i serverns HTML`).toBe(false);
    }
  });
  it("ingen extraContent-text ritas av React på någon ortssida", async () => {
    for (const url of sidor) {
      const text = avkoda(await ritaServer(url));
      for (const [slug, ex] of texter) expect(text.includes(NYCKEL(ex)), `${url}: extraContent från ${slug} ritas av React`).toBe(false);
    }
  }, 280000);
});
