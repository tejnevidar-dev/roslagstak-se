// @vitest-environment node
/**
 * Incident 2026-10-24 (sajtens Supabase ger NXDOMAIN): reservvägen functions/api/forfragan.ts. Inga anrop mot live: fetch är en låtsasfunktion.
 * Provar validering, fältfälla, storleksgräns, origin, hemligheten (bara som header till CRM, aldrig i svar eller loggar), att inga persondata loggas,
 * samma id vid nytt försök och att svaren blir lyckade/misslyckade på det sätt formulären och trackLead förutsätter.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { hanteraForfragan, onRequest, rensa, MAX_KROPP_BYTES, STANDARD_WEBHOOK_URL } from "../../functions/api/forfragan";

const HEMLIGHET = "prov-hemlighet-som-aldrig-far-synas";
const env = { ROSLAGSTAK_WEBHOOK_SECRET: HEMLIGHET };
const giltig = {
  mode: "consultation",
  name: "Anna Provsson",
  phone: "070-111 22 33",
  email: "anna@gmail.com",
  address: "Storgatan 1, Norrtälje",
  message: "Taket läcker",
  landing_path: "/taklaggare-taby?utm_source=google#x",
  referrer_category: "ads",
  utm_source: "google",
};
const post = (kropp: unknown, huvuden: Record<string, string> = {}) =>
  new Request("https://roslagstak.se/api/forfragan", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...huvuden },
    body: typeof kropp === "string" ? kropp : JSON.stringify(kropp),
  });
const crm = (status: number) => vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status }));

let loggar: unknown[][];
beforeEach(() => {
  loggar = [];
  vi.spyOn(console, "error").mockImplementation((...a) => void loggar.push(a));
});
afterEach(() => vi.restoreAllMocks());

describe("reservvägen /api/forfragan", () => {
  it("ett giltigt inskick skickas en gång till CRM med hemligheten i headern och en fast fältlista", async () => {
    const hamta = crm(201);
    const r = await hanteraForfragan(post({ ...giltig, personal_number: "19900101-1234", okant_falt: "x", id: "klientens-id" }), env, hamta as unknown as typeof fetch);
    expect(r.status).toBe(200);
    expect(await r.json()).toEqual({ ok: true });
    expect(hamta).toHaveBeenCalledTimes(1);
    const [url, init] = hamta.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe(STANDARD_WEBHOOK_URL);
    expect((init.headers as Record<string, string>)["X-Webhook-Secret"]).toBe(HEMLIGHET);
    const kropp = JSON.parse(init.body as string);
    expect(Object.keys(kropp)).not.toContain("personal_number");
    expect(Object.keys(kropp)).not.toContain("okant_falt");
    expect(kropp.id).not.toBe("klientens-id");
    expect(kropp.id).toMatch(/^[0-9a-f-]{36}$/);
    expect(kropp).toMatchObject({ mode: "consultation", name: "Anna Provsson", phone: "070-111 22 33", landing_path: "/taklaggare-taby", referrer_category: "ads", utm_source: "google", gangbrygga: null });
    expect(new Date(kropp.created_at).getTime()).toBeGreaterThan(0);
  });
  it("200 från CRM (dubblett eller sammanslagen) räknas som lyckat, och en egen webhook-adress i miljön används", async () => {
    const hamta = crm(200);
    const r = await hanteraForfragan(post(giltig), { ...env, ROSLAGSTAK_WEBHOOK_URL: "https://annan.example/hook" }, hamta as unknown as typeof fetch);
    expect(r.status).toBe(200);
    expect((hamta.mock.calls[0] as unknown as [string])[0]).toBe("https://annan.example/hook");
  });
  it("konfiguratorns fält (booleans, tak, våningar) följer med, och bokningens tomma e-post blir null", async () => {
    const hamta = crm(201);
    await hanteraForfragan(post({ mode: "configure", name: "Bo", phone: "0701234567", email: "", current_roof: "Tegel", new_roof: "Plåt", raspont: "Ja", gangbrygga: true, takstege: false, avvattning: "Ja", floors: "2" }), env, hamta as unknown as typeof fetch);
    const kropp = JSON.parse(((hamta.mock.calls[0] as unknown as [string, RequestInit])[1].body) as string);
    expect(kropp).toMatchObject({ mode: "configure", email: null, current_roof: "Tegel", new_roof: "Plåt", gangbrygga: true, takstege: false, floors: "2" });
  });
  it("fältfällan: ett ifyllt dolt fält ger ett lyckat svar markerat ignorerad, och inget skickas", async () => {
    const hamta = crm(201);
    const r = await hanteraForfragan(post({ ...giltig, webbplats: "http://spam.example" }), env, hamta as unknown as typeof fetch);
    expect(r.status).toBe(200);
    expect(await r.json()).toEqual({ ok: true, ignorerad: true });
    expect(hamta).not.toHaveBeenCalled();
  });
  it("varje träff i fällan loggar EN rad med tid, formulär och 'falla', och aldrig fältvärden, IP eller user agent", async () => {
    const hamta = crm(201);
    const bot = { ...giltig, formular: "brf", webbplats: "http://spam.example/bot-lank" };
    await hanteraForfragan(post(bot, { "CF-Connecting-IP": "203.0.113.7", "X-Forwarded-For": "203.0.113.7", "User-Agent": "BotAgent/9.9" }), env, hamta as unknown as typeof fetch);
    expect(loggar.length).toBe(1);
    const rad = JSON.parse(String(loggar[0][0]));
    expect(rad).toMatchObject({ funktion: "forfragan", handelse: "falla", formular: "brf" });
    expect(new Date(rad.tid).getTime()).toBeGreaterThan(0);
    expect(Object.keys(rad).sort()).toEqual(["formular", "funktion", "handelse", "tid"]);
    const text = JSON.stringify(loggar);
    for (const k of ["Anna", "070-111", "gmail", "Storgatan", "spam.example", "203.0.113.7", "BotAgent", HEMLIGHET]) expect(text, k).not.toContain(k);
    expect(hamta).not.toHaveBeenCalled();
  });
  it("formulärnamnet i loggen är ett kort ord, annars 'okant', och det skickas aldrig vidare till CRM", async () => {
    for (const [namn, forvantat] of [["kontakt_sida", "kontakt_sida"], ["<script>alert(1)</script>", "okant"], [5, "okant"], [undefined, "okant"], ["a".repeat(41), "okant"]] as const) {
      loggar.length = 0;
      await hanteraForfragan(post({ ...giltig, formular: namn, webbplats: "x" }), env, crm(201) as unknown as typeof fetch);
      expect(JSON.parse(String(loggar[0][0])).formular).toBe(forvantat);
    }
    const hamta = crm(201);
    loggar.length = 0;
    await hanteraForfragan(post({ ...giltig, formular: "brf" }), env, hamta as unknown as typeof fetch);
    expect(Object.keys(JSON.parse(((hamta.mock.calls[0] as unknown as [string, RequestInit])[1].body) as string))).not.toContain("formular");
    expect(loggar.length).toBe(0);
  });
  it("ett tomt dolt fält är ett vanligt inskick", async () => {
    const hamta = crm(201);
    const r = await hanteraForfragan(post({ ...giltig, webbplats: "" }), env, hamta as unknown as typeof fetch);
    expect(await r.json()).toEqual({ ok: true });
    expect(hamta).toHaveBeenCalledTimes(1);
  });
  it.each([
    ["namn saknas", { ...giltig, name: "  " }, "namn_saknas"],
    ["telefon saknas", { ...giltig, phone: "" }, "telefon_ogiltig"],
    ["telefon för kort", { ...giltig, phone: "12-34" }, "telefon_ogiltig"],
    ["fel mode", { ...giltig, mode: "annat" }, "ogiltigt_mode"],
    ["fel typ på fält", { ...giltig, address: 5 }, "ogiltigt_address"],
    ["kroppen är en lista", [giltig], "ogiltig_kropp"],
  ])("avvisas med 400: %s", async (_namn, kropp, fel) => {
    const hamta = crm(201);
    const r = await hanteraForfragan(post(kropp), env, hamta as unknown as typeof fetch);
    expect(r.status).toBe(400);
    expect((await r.json()).fel).toBe(fel);
    expect(hamta).not.toHaveBeenCalled();
  });
  it("ogiltig JSON ger 400, fel Content-Type 415", async () => {
    const hamta = crm(201);
    expect((await hanteraForfragan(post("{inte json"), env, hamta as unknown as typeof fetch)).status).toBe(400);
    const r = await hanteraForfragan(new Request("https://roslagstak.se/api/forfragan", { method: "POST", headers: { "Content-Type": "text/plain" }, body: "x" }), env, hamta as unknown as typeof fetch);
    expect(r.status).toBe(415);
    expect(hamta).not.toHaveBeenCalled();
  });
  it("storleksgräns: för stor kropp ger 413 (både via Content-Length och faktisk storlek)", async () => {
    const hamta = crm(201);
    const stor = { ...giltig, message: "å".repeat(MAX_KROPP_BYTES) };
    expect((await hanteraForfragan(post(stor), env, hamta as unknown as typeof fetch)).status).toBe(413);
    expect((await hanteraForfragan(post(giltig, { "Content-Length": String(MAX_KROPP_BYTES + 1) }), env, hamta as unknown as typeof fetch)).status).toBe(413);
    expect(hamta).not.toHaveBeenCalled();
  });
  it("långa värden kortas till CRM:ets gränser i stället för att avvisas", () => {
    const r = rensa({ ...giltig, message: "x".repeat(9000), utm_source: "y".repeat(900), landing_path: "/" + "z".repeat(5000) });
    expect(r.ok).toBe(true);
    if ("payload" in r) {
      expect((r.payload.message as string).length).toBe(5000);
      expect((r.payload.utm_source as string).length).toBe(255);
      expect((r.payload.landing_path as string).length).toBe(2000);
    }
  });
  it("okänd källa ger null, inte ett gissat värde", () => {
    const r = rensa({ ...giltig, referrer_category: "tiktok" });
    expect(r.ok && r.payload.referrer_category).toBe(null);
  });
  it("origin: främmande webbplats ger 403, sajtens egna värdar och anrop utan Origin går igenom", async () => {
    const hamta = crm(201);
    expect((await hanteraForfragan(post(giltig, { Origin: "https://skadlig.example" }), env, hamta as unknown as typeof fetch)).status).toBe(403);
    expect((await hanteraForfragan(post(giltig, { Origin: "https://roslagstak.se" }), env, hamta as unknown as typeof fetch)).status).toBe(200);
    expect((await hanteraForfragan(post(giltig, { Origin: "https://www.roslagstak.se" }), env, hamta as unknown as typeof fetch)).status).toBe(200);
    expect(hamta).toHaveBeenCalledTimes(2);
  });
  it("saknad hemlighet i Pages ger 500 ej_konfigurerad och inget anrop", async () => {
    const hamta = crm(201);
    const r = await hanteraForfragan(post(giltig), {}, hamta as unknown as typeof fetch);
    expect(r.status).toBe(500);
    expect((await r.json()).fel).toBe("ej_konfigurerad");
    expect(hamta).not.toHaveBeenCalled();
  });
  it("CRM-fel: 5xx ger ett nytt försök med SAMMA id och sedan 502, 400/401 försöks inte om, nätverksfel ger två försök", async () => {
    const fem = crm(503);
    const r1 = await hanteraForfragan(post(giltig), env, fem as unknown as typeof fetch);
    expect(r1.status).toBe(502);
    expect(fem).toHaveBeenCalledTimes(2);
    const id = (a: number) => JSON.parse(((fem.mock.calls[a] as unknown as [string, RequestInit])[1].body) as string).id;
    expect(id(0)).toBe(id(1));
    for (const kod of [400, 401]) {
      const h = crm(kod);
      const r = await hanteraForfragan(post(giltig), env, h as unknown as typeof fetch);
      expect(r.status).toBe(502);
      expect(h).toHaveBeenCalledTimes(1);
    }
    const natverk = vi.fn(async () => {
      throw new TypeError("fetch failed");
    });
    const r3 = await hanteraForfragan(post(giltig), env, natverk as unknown as typeof fetch);
    expect(r3.status).toBe(502);
    expect((await r3.json()).fel).toBe("mottagaren_svarar_inte");
    expect(natverk).toHaveBeenCalledTimes(2);
  });
  it("ett första 503 följt av 201 ger ett lyckat svar", async () => {
    const hamta = vi.fn().mockResolvedValueOnce(new Response("{}", { status: 503 })).mockResolvedValueOnce(new Response("{}", { status: 201 }));
    const r = await hanteraForfragan(post(giltig), env, hamta as unknown as typeof fetch);
    expect(r.status).toBe(200);
    expect(hamta).toHaveBeenCalledTimes(2);
  });
  it("inga persondata eller hemligheten i loggar eller svar, vid något utfall", async () => {
    const svar: string[] = [];
    for (const kod of [201, 503, 401, 400]) svar.push(await (await hanteraForfragan(post(giltig), env, crm(kod) as unknown as typeof fetch)).text());
    svar.push(await (await hanteraForfragan(post(giltig), {}, crm(201) as unknown as typeof fetch)).text());
    svar.push(await (await hanteraForfragan(post({ ...giltig, phone: "1" }), env, crm(201) as unknown as typeof fetch)).text());
    const allt = JSON.stringify([loggar, svar]);
    for (const k of ["Anna", "070-111", "gmail", "Storgatan", "Taket läcker", HEMLIGHET]) expect(allt, k).not.toContain(k);
    expect(loggar.length).toBeGreaterThan(0);
  });
  it("andra metoder än POST ger 405", async () => {
    const r = onRequest();
    expect(r.status).toBe(405);
  });
});
