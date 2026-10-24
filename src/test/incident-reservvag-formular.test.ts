/**
 * Incident 2026-10-24: formulären skickar via /api/forfragan (src/lib/skicka-forfragan.ts) i stället för sajtens Supabase.
 * Inga anrop mot live: fetch är en låtsasfunktion. Provar hjälparen och att alla fem formulär använder den, ritar fältfällan,
 * behåller felgren före trackLead och inte längre importerar Supabase-klienten.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { FORFRAGAN_VIA, skickaForfragan } from "@/lib/skicka-forfragan";

const rot = resolve(__dirname, "../..");
const kalla = (rel: string) => readFileSync(resolve(rot, rel), "utf8");
const FORMULAR_FILER = ["src/components/LeadForm.tsx", "src/components/BookingWidget.tsx", "src/components/QuoteConfigurator.tsx", "src/pages/BrfPage.tsx", "src/pages/ContactLanding.tsx"];
const svar = (status: number, kropp: unknown) => new Response(JSON.stringify(kropp), { status, headers: { "Content-Type": "application/json" } });
afterEach(() => vi.unstubAllGlobals());

const formMedFalla = (varde: string) => {
  const f = document.createElement("form");
  const i = document.createElement("input");
  i.name = "webbplats";
  i.value = varde;
  f.appendChild(i);
  return f;
};

describe("skickaForfragan", () => {
  it("reservvägen är på, och posten går till /api/forfragan som JSON med fältfällans värde", async () => {
    expect(FORFRAGAN_VIA).toBe("pages");
    const hamta = vi.fn(async () => svar(200, { ok: true }));
    vi.stubGlobal("fetch", hamta);
    const r = await skickaForfragan({ mode: "consultation", name: "Anna", phone: "0701112233" }, formMedFalla(""));
    expect(r).toEqual({ error: null, ignorerad: false });
    const [url, init] = hamta.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("/api/forfragan");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body as string)).toEqual({ mode: "consultation", name: "Anna", phone: "0701112233", webbplats: "" });
  });
  it("formulärets namn följer med i posten (för fällans loggrad), och alla fem formulär anger sitt namn", async () => {
    const hamta = vi.fn(async () => svar(200, { ok: true }));
    vi.stubGlobal("fetch", hamta);
    await skickaForfragan({ mode: "consultation", name: "Anna", phone: "0701112233" }, formMedFalla(""), "brf");
    expect(JSON.parse((hamta.mock.calls[0] as unknown as [string, RequestInit])[1].body as string).formular).toBe("brf");
    for (const fil of FORMULAR_FILER) expect(kalla(fil), fil).toMatch(/skickaForfragan\([\s\S]*?formular, /);
    expect(kalla("src/components/LeadForm.tsx")).toContain("}, formular, formName);");
    expect(kalla("src/pages/BrfPage.tsx")).toContain('}, formular, "brf");');
    expect(kalla("src/pages/ContactLanding.tsx")).toContain('}, formular, "kontakt_sida");');
    expect(kalla("src/components/QuoteConfigurator.tsx")).toContain('"offert_konfigurator" : "offert_radgivning"');
    expect(kalla("src/components/BookingWidget.tsx")).toContain('"callback" : "booking"');
  });
  it("en bot som fyllt i fällan skickar värdet vidare, och ett 'ignorerad'-svar ger ingen felgren men markeras", async () => {
    const hamta = vi.fn(async () => svar(200, { ok: true, ignorerad: true }));
    vi.stubGlobal("fetch", hamta);
    const r = await skickaForfragan({ mode: "consultation", name: "Bot", phone: "0701112233" }, formMedFalla("http://spam.example"));
    expect(JSON.parse((hamta.mock.calls[0] as unknown as [string, RequestInit])[1].body as string).webbplats).toBe("http://spam.example");
    expect(r).toEqual({ error: null, ignorerad: true });
  });
  it.each([400, 413, 415, 500, 502])("status %i ger error (formulärets felgren och telefonnumret), aldrig lyckat", async (status) => {
    vi.stubGlobal("fetch", vi.fn(async () => svar(status, { ok: false, fel: "x" })));
    const r = await skickaForfragan({ mode: "consultation", name: "Anna", phone: "0701112233" }, formMedFalla(""));
    expect(r.error).toBeInstanceOf(Error);
  });
  it("nätverksfel och ett svar utan ok:true ger error", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new TypeError("fetch failed"); }));
    expect((await skickaForfragan({ mode: "consultation", name: "A", phone: "0701112233" })).error).toBeInstanceOf(Error);
    vi.stubGlobal("fetch", vi.fn(async () => new Response("<html>", { status: 200 })));
    expect((await skickaForfragan({ mode: "consultation", name: "A", phone: "0701112233" })).error).toBeInstanceOf(Error);
  });
});

const FORMULAR = ["src/components/LeadForm.tsx", "src/components/BookingWidget.tsx", "src/components/QuoteConfigurator.tsx", "src/pages/BrfPage.tsx", "src/pages/ContactLanding.tsx"];

describe("de fem formulären", () => {
  it.each(FORMULAR)("%s: skickar via skickaForfragan, ritar <Falla />, importerar inte Supabase och räknar lead först efter felgrenen", (fil) => {
    const s = kalla(fil);
    expect(s).toContain("skickaForfragan(");
    expect(s).toContain("<Falla />");
    expect(s).not.toMatch(/integrations\/supabase/);
    expect(s).not.toMatch(/\.from\("quote_requests"\)/);
    const iAnrop = s.indexOf("trackLead(");
    expect(s.split("trackLead(").length - 1).toBe(1);
    expect(s.slice(s.lastIndexOf("if (error)", iAnrop), iAnrop)).toContain("return;");
    expect(s.slice(s.lastIndexOf("\n", iAnrop), iAnrop)).toContain("if (!ignorerad)");
  });
  it("formulärets värden hämtas från formuläret innan första await (React nollar currentTarget efter händelsen)", () => {
    for (const fil of FORMULAR) {
      const s = kalla(fil);
      expect(s.indexOf("const formular = e.currentTarget"), fil).toBeGreaterThan(-1);
      expect(s.indexOf("const formular = e.currentTarget"), fil).toBeLessThan(s.indexOf("await skickaForfragan"));
    }
  });
});

describe("Pages-funktionen", () => {
  it("har ingen hemlighet i koden och läser den bara ur env", () => {
    const s = kalla("functions/api/forfragan.ts");
    expect(s).toContain("env.ROSLAGSTAK_WEBHOOK_SECRET");
    expect(s).not.toMatch(/ROSLAGSTAK_WEBHOOK_SECRET\s*[:=]\s*["'`]/);
    expect(s).not.toMatch(/console\.(log|error|warn)\([^)]*(request|body|text|payload|indata)/);
  });
  it("sajtens JS (src/) innehåller varken hemligheten eller webhook-adressen med hemlighet", () => {
    for (const fil of [...FORMULAR, "src/lib/skicka-forfragan.ts", "src/components/Falla.tsx"]) expect(kalla(fil), fil).not.toMatch(/X-Webhook-Secret|ROSLAGSTAK_WEBHOOK_SECRET/);
  });
});
