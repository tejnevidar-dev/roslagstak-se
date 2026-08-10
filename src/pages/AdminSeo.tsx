import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, RefreshCw, MousePointerClick, Eye, Percent, TrendingUp, ShieldCheck } from "lucide-react";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Row {
  key: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface Week {
  weekStart: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface Report {
  siteUrl: string;
  period: { start: string; end: string };
  totals: { clicks: number; impressions: number; ctr: number; position: number };
  weeks: Week[];
  topQueries: Row[];
  topPages: Row[];
  indexing: Record<string, string | null> | null;
}

const nf = new Intl.NumberFormat("sv-SE");
const pct = (v: number) => `${(v * 100).toFixed(1)} %`;
const dateFmt = (d: string) => new Date(d).toLocaleDateString("sv-SE", { day: "numeric", month: "short" });

const AdminSeo = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [report, setReport] = useState<Report | null>(null);
  const [candidates, setCandidates] = useState<string[] | null>(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate("/admin/login", { replace: true });
  }, [user, isAdmin, loading, navigate]);

  const load = useCallback(async (siteUrl?: string) => {
    setFetching(true);
    setError(null);
    const { data, error: fnError } = await supabase.functions.invoke("gsc-report", {
      body: siteUrl ? { siteUrl } : {},
    });
    if (fnError) {
      let details = fnError.message;
      if (fnError instanceof FunctionsHttpError) {
        details = await fnError.context.text();
        try {
          const parsed = JSON.parse(details);
          if (parsed?.status === "selection_required") {
            setCandidates(parsed.candidates as string[]);
            setFetching(false);
            return;
          }
          details = parsed?.error ?? details;
        } catch {
          /* keep raw text */
        }
      }
      setError(details);
      toast({ title: "Kunde inte hämta Search Console-data", description: details, variant: "destructive" });
      setFetching(false);
      return;
    }
    setCandidates(null);
    setReport(data as Report);
    setFetching(false);
  }, []);

  useEffect(() => {
    if (user && isAdmin) load();
  }, [user, isAdmin, load]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Laddar...</p>
      </main>
    );
  }

  return (
    <>
      <Helmet>
        <title>SEO-dashboard – Search Console | RoslagsTak</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <main className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-3">
            <div>
              <h1 className="font-display text-xl text-foreground">SEO-dashboard</h1>
              <p className="text-xs text-muted-foreground">
                Google Search Console{report ? ` · ${report.siteUrl}` : ""}
                {report ? ` · ${dateFmt(report.period.start)}–${dateFmt(report.period.end)}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => load()} disabled={fetching}>
                <RefreshCw className={`w-4 h-4 ${fetching ? "animate-spin" : ""}`} />
                Uppdatera
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin">
                  <ArrowLeft className="w-4 h-4" />
                  Förfrågningar
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6 space-y-6">
          {candidates && (
            <section className="bg-card border border-border rounded-lg p-5">
              <h2 className="font-semibold text-foreground mb-1">Välj Search Console-egenskap</h2>
              <p className="text-sm text-muted-foreground mb-3">
                Flera verifierade egenskaper täcker roslagstak.se. Välj vilken som ska visas.
              </p>
              <div className="flex flex-wrap gap-2">
                {candidates.map((c) => (
                  <Button key={c} variant="outline" size="sm" onClick={() => load(c)}>
                    {c}
                  </Button>
                ))}
              </div>
            </section>
          )}

          {error && !candidates && (
            <section className="bg-card border border-destructive/40 rounded-lg p-5">
              <p className="text-sm text-foreground">{error}</p>
            </section>
          )}

          {fetching && !report && <p className="text-sm text-muted-foreground">Hämtar Search Console-data...</p>}

          {report && (
            <>
              <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Kpi icon={MousePointerClick} label="Klick (13 v)" value={nf.format(report.totals.clicks)} />
                <Kpi icon={Eye} label="Visningar (13 v)" value={nf.format(report.totals.impressions)} />
                <Kpi icon={Percent} label="CTR" value={pct(report.totals.ctr)} />
                <Kpi icon={TrendingUp} label="Snittposition" value={report.totals.position.toFixed(1)} />
              </section>

              <section className="bg-card border border-border rounded-lg p-5">
                <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  Indexeringsstatus (startsidan)
                </h2>
                {report.indexing?.error ? (
                  <p className="text-sm text-muted-foreground break-words">{report.indexing.error}</p>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                    <IndexField label="Utfall" value={report.indexing?.verdict} />
                    <IndexField label="Täckning" value={report.indexing?.coverageState} />
                    <IndexField label="Robots.txt" value={report.indexing?.robotsTxtState} />
                    <IndexField label="Indexering" value={report.indexing?.indexingState} />
                    <IndexField
                      label="Senast crawlad"
                      value={
                        report.indexing?.lastCrawlTime
                          ? new Date(report.indexing.lastCrawlTime).toLocaleString("sv-SE", {
                              dateStyle: "short",
                              timeStyle: "short",
                            })
                          : null
                      }
                    />
                    <IndexField label="Googles kanoniska" value={report.indexing?.googleCanonical} />
                  </div>
                )}
              </section>

              <section className="bg-card border border-border rounded-lg p-5">
                <h2 className="font-semibold text-foreground mb-3">Per vecka</h2>
                <Table
                  head={["Vecka", "Klick", "Visningar", "CTR", "Position"]}
                  rows={report.weeks.map((w) => [
                    `${dateFmt(w.weekStart)}`,
                    nf.format(w.clicks),
                    nf.format(w.impressions),
                    pct(w.ctr),
                    w.position.toFixed(1),
                  ])}
                  empty="Ingen rapporterad data för perioden."
                />
              </section>

              <section className="grid gap-6 lg:grid-cols-2">
                <div className="bg-card border border-border rounded-lg p-5">
                  <h2 className="font-semibold text-foreground mb-3">Toppsökningar</h2>
                  <Table
                    head={["Sökning", "Klick", "Visningar", "CTR", "Pos"]}
                    rows={report.topQueries.map((r) => [
                      r.key,
                      nf.format(r.clicks),
                      nf.format(r.impressions),
                      pct(r.ctr),
                      r.position.toFixed(1),
                    ])}
                    empty="Inga rapporterade sökningar."
                  />
                </div>
                <div className="bg-card border border-border rounded-lg p-5">
                  <h2 className="font-semibold text-foreground mb-3">Toppsidor</h2>
                  <Table
                    head={["Sida", "Klick", "Visningar", "CTR", "Pos"]}
                    rows={report.topPages.map((r) => [
                      r.key.replace(/^https?:\/\/[^/]+/, "") || "/",
                      nf.format(r.clicks),
                      nf.format(r.impressions),
                      pct(r.ctr),
                      r.position.toFixed(1),
                    ])}
                    empty="Inga rapporterade sidor."
                  />
                </div>
              </section>

              <p className="text-xs text-muted-foreground">
                Search Console kan släpa efter några dagar och utesluter sökningar med mycket låg volym. Tomma
                värden betyder "ingen rapporterad data", inte nödvändigtvis noll trafik.
              </p>
            </>
          )}
        </div>
      </main>
    </>
  );
};

const Kpi = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Eye;
  label: string;
  value: string;
}) => (
  <div className="bg-card border border-border rounded-lg p-5">
    <p className="text-xs uppercase font-semibold text-muted-foreground mb-2 flex items-center gap-2">
      <Icon className="w-4 h-4 text-primary" />
      {label}
    </p>
    <p className="font-display text-2xl text-foreground">{value}</p>
  </div>
);

const IndexField = ({ label, value }: { label: string; value?: string | null }) => (
  <div>
    <p className="text-xs uppercase font-semibold text-muted-foreground mb-0.5">{label}</p>
    {value ? <Badge variant="outline">{value}</Badge> : <p className="text-foreground">—</p>}
  </div>
);

const Table = ({
  head,
  rows,
  empty,
}: {
  head: string[];
  rows: string[][];
  empty: string;
}) => {
  if (rows.length === 0) return <p className="text-sm text-muted-foreground">{empty}</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase text-muted-foreground">
            {head.map((h) => (
              <th key={h} className="py-2 pr-4 font-semibold whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-border">
              {row.map((cell, j) => (
                <td key={j} className={`py-2 pr-4 ${j === 0 ? "text-foreground" : "text-muted-foreground whitespace-nowrap"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSeo;