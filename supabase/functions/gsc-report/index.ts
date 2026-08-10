import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
const TARGET = "https://roslagstak.se/";

type SiteEntry = { siteUrl: string; permissionLevel?: string };

function coversTarget(siteUrl: string, target: URL) {
  if (siteUrl.startsWith("sc-domain:")) {
    const domain = siteUrl.slice("sc-domain:".length).toLowerCase();
    const host = target.hostname.toLowerCase();
    return host === domain || host.endsWith(`.${domain}`);
  }
  try {
    return target.href.startsWith(new URL(siteUrl).href);
  } catch {
    return false;
  }
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader) return json({ error: "Unauthorized" }, 401);

    const anonClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: userData } = await anonClient.auth.getUser();
    const user = userData?.user;
    if (!user) return json({ error: "Unauthorized" }, 401);

    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const { data: isAdmin } = await adminClient.rpc("has_role", {
      _user_id: user.id,
      _role: "admin",
    });
    if (!isAdmin) return json({ error: "Forbidden" }, 403);

    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    const connectionApiKey = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");
    if (!lovableApiKey || !connectionApiKey) {
      return json({ error: "Search Console är inte kopplad" }, 500);
    }
    const headers = {
      Authorization: `Bearer ${lovableApiKey}`,
      "X-Connection-Api-Key": connectionApiKey,
    };

    let selectedSiteUrl: string | undefined;
    if (req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      if (typeof body?.siteUrl === "string") selectedSiteUrl = body.siteUrl;
    }

    const sitesRes = await fetch(`${GATEWAY}/webmasters/v3/sites`, { headers });
    if (!sitesRes.ok) {
      const details = await sitesRes.text();
      return json({ error: "Kunde inte lista GSC-egenskaper", status: sitesRes.status, details }, sitesRes.status);
    }
    const { siteEntry = [] } = (await sitesRes.json()) as { siteEntry?: SiteEntry[] };
    const target = new URL(TARGET);
    const matches = siteEntry.filter(
      (e) => e.permissionLevel !== "siteUnverifiedUser" && coversTarget(e.siteUrl, target),
    );
    if (matches.length === 0) return json({ error: "Ingen verifierad GSC-egenskap hittades" }, 404);

    let siteUrl: string;
    if (selectedSiteUrl) {
      const found = matches.find((m) => m.siteUrl === selectedSiteUrl);
      if (!found) return json({ error: "Vald egenskap är inte verifierad" }, 400);
      siteUrl = found.siteUrl;
    } else if (matches.length === 1) {
      siteUrl = matches[0].siteUrl;
    } else {
      return json({ status: "selection_required", candidates: matches.map((m) => m.siteUrl) }, 409);
    }

    const end = new Date(Date.now() - 3 * 86400000).toISOString().slice(0, 10);
    const start = new Date(Date.now() - 94 * 86400000).toISOString().slice(0, 10);

    const query = async (payload: Record<string, unknown>) => {
      const res = await fetch(
        `${GATEWAY}/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
        { method: "POST", headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify(payload) },
      );
      if (!res.ok) {
        const details = await res.text();
        throw new Error(`[${res.status}]: ${details}`);
      }
      const data = await res.json();
      return (data.rows ?? []) as Array<{ keys?: string[]; clicks: number; impressions: number; ctr: number; position: number }>;
    };

    const base = { startDate: start, endDate: end, rowLimit: 25000 };
    const [daily, queries, pages] = await Promise.all([
      query({ ...base, dimensions: ["date"] }),
      query({ ...base, dimensions: ["query"], rowLimit: 25 }),
      query({ ...base, dimensions: ["page"], rowLimit: 25 }),
    ]);

    // Aggregate daily rows into ISO weeks
    const weekMap = new Map<string, { clicks: number; impressions: number; positionSum: number; days: number }>();
    for (const row of daily) {
      const date = new Date(`${row.keys?.[0]}T00:00:00Z`);
      const day = (date.getUTCDay() + 6) % 7; // monday = 0
      const monday = new Date(date);
      monday.setUTCDate(date.getUTCDate() - day);
      const key = monday.toISOString().slice(0, 10);
      const cur = weekMap.get(key) ?? { clicks: 0, impressions: 0, positionSum: 0, days: 0 };
      cur.clicks += row.clicks;
      cur.impressions += row.impressions;
      cur.positionSum += row.position;
      cur.days += 1;
      weekMap.set(key, cur);
    }
    const weeks = [...weekMap.entries()]
      .sort((a, b) => (a[0] < b[0] ? 1 : -1))
      .map(([weekStart, v]) => ({
        weekStart,
        clicks: v.clicks,
        impressions: v.impressions,
        ctr: v.impressions ? v.clicks / v.impressions : 0,
        position: v.days ? v.positionSum / v.days : 0,
      }));

    // Homepage indexing state
    let indexing: Record<string, unknown> | null = null;
    const inspectRes = await fetch(`${GATEWAY}/v1/urlInspection/index:inspect`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ inspectionUrl: TARGET, siteUrl }),
    });
    if (inspectRes.ok) {
      const data = await inspectRes.json();
      const r = data?.inspectionResult?.indexStatusResult ?? {};
      indexing = {
        verdict: r.verdict ?? null,
        coverageState: r.coverageState ?? null,
        robotsTxtState: r.robotsTxtState ?? null,
        indexingState: r.indexingState ?? null,
        lastCrawlTime: r.lastCrawlTime ?? null,
        googleCanonical: r.googleCanonical ?? null,
        userCanonical: r.userCanonical ?? null,
      };
    } else {
      indexing = { error: `[${inspectRes.status}]: ${await inspectRes.text()}` };
    }

    const totals = weeks.reduce(
      (acc, w) => ({ clicks: acc.clicks + w.clicks, impressions: acc.impressions + w.impressions }),
      { clicks: 0, impressions: 0 },
    );

    return json({
      status: "ok",
      siteUrl,
      period: { start, end },
      totals: {
        ...totals,
        ctr: totals.impressions ? totals.clicks / totals.impressions : 0,
        position: weeks.length ? weeks.reduce((s, w) => s + w.position, 0) / weeks.length : 0,
      },
      weeks,
      topQueries: queries.map((r) => ({ key: r.keys?.[0] ?? "", clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position })),
      topPages: pages.map((r) => ({ key: r.keys?.[0] ?? "", clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position })),
      indexing,
    });
  } catch (e) {
    console.error("gsc-report failed:", e);
    return json({ error: e instanceof Error ? e.message : "Okänt fel" }, 500);
  }
});