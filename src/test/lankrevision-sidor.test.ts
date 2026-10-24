// @vitest-environment node
/**
 * Gren 205/205b, länkrevision av de ritade sidorna: ritar tjänst × ort-sidorna, ortssidorna och bloggguiderna på servern (renderToPipeableStream av själva sidkomponenterna i en StaticRouter, utan AppRoutes) och
 * kontrollerar att inga interna länkar går till en adress som ompekas med 301 (public/_redirects) eller till en sida utanför sajtkartan, och att listan "<tjänst> i alla orter" har kvar alla rader (ingen rad borttagen).
 * Sätt UT_LANK=<fil.json> för att skriva siffrorna.
 */
import { beforeAll, describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { PassThrough } from "node:stream";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { locations } from "../data/locations";
import { allServiceSlugs } from "../data/service-slugs";
import { comboOrtHref } from "../data/combo-ort-href";
import { isThinCombo } from "../data/thin-combos";
import { arOmpekad } from "../data/ompekade";

const rot = resolve(__dirname, "../..");
const regler = readFileSync(resolve(rot, "public/_redirects"), "utf8")
  .split(/\r?\n/)
  .map((r) => r.trim())
  .filter((r) => r && !r.startsWith("#"))
  .map((r) => r.split(/\s+/) as [string, string, string]);
const omdirigeras = (path: string): string | null => {
  for (const [k, m] of regler) {
    if (k.endsWith("*")) {
      if (path.startsWith(k.slice(0, -1))) return m.replace(":splat", path.slice(k.length - 1));
    } else if (k === path) return m;
  }
  return null;
};
const sitemap = readFileSync(resolve(rot, "public/sitemap.xml"), "utf8");
const sidor = [...sitemap.matchAll(/<loc>https:\/\/roslagstak\.se([^<]*)<\/loc>/g)].map((m) => (m[1] || "/").replace(/\/$/, "") || "/");
const iSitemap = new Set(sidor);
const TILLATNA = /^\/(admin|assets\/|images\/|offert\/|brf\/|tack|kontakt|boka|cookies|favicon|robots|sitemap|[^/]+\.(?:pdf|jpg|jpeg|png|webp|svg|ico|xml|txt|webmanifest))/;
const SERVICE_ORT = new RegExp(`^/(${allServiceSlugs.join("|")})-`);

const ritaServer = async (url: string, komponent: "combo" | "ort" | "blogg"): Promise<string> => {
  const { renderToPipeableStream } = await import("react-dom/server");
  const { StaticRouter, } = await import("react-router-dom/server");
  const { Routes, Route } = await import("react-router-dom");
  const { HelmetProvider } = await import("react-helmet-async");
  const { LazyMotion, domAnimation } = await import("framer-motion");
  const Sida = (await import(komponent === "combo" ? "../pages/ServiceLocationPage" : komponent === "ort" ? "../pages/LocationPage" : "../pages/BlogPost")).default;
  const path = komponent === "blogg" ? "/blogg/:slug" : "/:slug";
  const tree = createElement(HelmetProvider, null, createElement(LazyMotion, { features: domAnimation, strict: true }, createElement(StaticRouter, { location: url }, createElement(Routes, null, createElement(Route, { path, element: createElement(Sida) })))));
  return new Promise((res, rej) => {
    let html = "";
    const ut = new PassThrough();
    ut.on("data", (d) => (html += d.toString()));
    ut.on("end", () => res(html));
    const s = renderToPipeableStream(tree, { onAllReady: () => s.pipe(ut), onError: rej });
    setTimeout(() => rej(new Error("tidsgräns " + url)), 20000);
  });
};
const hrefar = (html: string) => {
  const set = new Set<string>();
  for (const m of html.replace(/<script[\s\S]*?<\/script>/g, " ").matchAll(/<a\s[^>]*href="(\/[^"#?]*)(?:[#?][^"]*)?"/g)) {
    const t = m[1].replace(/\/$/, "") || "/";
    if (!t.startsWith("//")) set.add(t);
  }
  return set;
};

describe("gren 205/205b: länkrevision av de ritade sidorna", () => {
  beforeAll(() => {
    vi.stubEnv("VITE_SUPABASE_URL", "https://prov.invalid");
    vi.stubEnv("VITE_SUPABASE_PUBLISHABLE_KEY", "prov-nyckel");
  });
  it("inga interna länkar till ompekade adresser eller till sidor utanför sajtkartan, och alla rader kvar i listan över alla orter", async () => {
    const ompekade: Record<string, string[]> = {};
    const utanforKartan: Record<string, string[]> = {};
    const mal: [string, "combo" | "ort" | "blogg"][] = [
      ...sidor.filter((u) => SERVICE_ORT.test(u) && locations.some((l) => u.endsWith(`-${l.slug}`) && allServiceSlugs.some((s) => u === `/${s}-${l.slug}`))).map((u) => [u, "combo"] as [string, "combo"]),
      ...sidor.filter((u) => /^\/taklaggare-/.test(u)).map((u) => [u, "ort"] as [string, "ort"]),
      ...["/blogg/takbyte-ljustero-guide-pris", "/blogg/takbyte-vaxholm-skargarden", "/blogg/basta-takmaterialet-blido"].map((u) => [u, "blogg"] as [string, "blogg"]),
    ];
    let lankar = 0;
    let omriktade = 0;
    for (const [url, typ] of mal) {
      const html = await ritaServer(url, typ);
      const set = hrefar(html);
      for (const t of set) {
        lankar++;
        if (omdirigeras(t)) (ompekade[t] ??= []).push(url);
        else if (!iSitemap.has(t) && !TILLATNA.test(t)) (utanforKartan[t] ??= []).push(url);
      }
      if (typ === "combo") {
        // listan "<tjänst> i alla orter": en rad per ort (alla 244 orter), med målen från comboOrtHref
        const svc = url.slice(1).split("-")[0];
        const ort = url.slice(svc.length + 2);
        const antalRader = [...html.matchAll(/class="inline-flex items-center gap-1 text-xs font-medium px-3 py-1\.5 rounded-full/g)].length;
        expect(antalRader, `${url}: raderna i listan över alla orter`).toBe(locations.length);
        for (const l of locations) {
          const h = comboOrtHref(svc, ort, l as { slug: string; region: string; lat: number; lng: number });
          if (h !== `/${svc}-${l.slug}`) omriktade++;
        }
      }
    }
    if (process.env.UT_LANK) writeFileSync(process.env.UT_LANK, JSON.stringify({ sidor: mal.length, lankar, omriktadeRader: omriktade, ompekade, utanforKartan }, null, 1));
    expect(Object.keys(ompekade), "länkar till ompekade adresser: " + JSON.stringify(ompekade).slice(0, 800)).toEqual([]);
    expect(Object.keys(utanforKartan), "länkar till sidor utanför sajtkartan: " + JSON.stringify(utanforKartan).slice(0, 800)).toEqual([]);
  }, 290000);

  it("comboOrtHref: sidan själv och orter med egen indexerbar text går till tjänst × ort-sidan, övriga till ortssidan, Finnhamn till Husarö", () => {
    const l = (slug: string) => locations.find((x) => x.slug === slug)!;
    expect(comboOrtHref("takbyte", "taby", l("taby"))).toBe("/takbyte-taby");
    expect(comboOrtHref("takbyte", "taby", l("vallentuna"))).toBe("/takbyte-vallentuna"); // egen text
    expect(comboOrtHref("takbyte", "taby", l("ljustero"))).toBe("/taklaggare-ljustero"); // tunn och ompekad
    expect(comboOrtHref("takbyte", "taby", l("finnhamn"))).toBe("/taklaggare-husaro");
    expect(comboOrtHref("takbyte", "taby", l("uppsala"))).toBe("/taklaggare-uppsala"); // region utan tjänst × ort-sidor
    for (const o of locations) {
      const h = comboOrtHref("takbyte", "taby", o as { slug: string; region: string; lat: number; lng: number });
      expect(omdirigeras(h), `${o.slug}: ${h}`).toBeNull();
      expect(iSitemap.has(h), `${o.slug}: ${h} står inte i sajtkartan`).toBe(true);
    }
    void isThinCombo;
    void arOmpekad;
  });
});
