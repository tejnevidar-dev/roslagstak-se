import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { LogOut, Mail, Phone, MapPin, MessageSquare, Trash2, RefreshCw, BarChart3 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type QuoteStatus = "ny" | "kontaktad" | "offert_skickad" | "avslutad" | "forlorad";

interface QuoteRequest {
  id: string;
  created_at: string;
  updated_at: string;
  status: QuoteStatus;
  mode: "configure" | "consultation";
  name: string;
  phone: string;
  email: string;
  address: string | null;
  current_roof: string | null;
  new_roof: string | null;
  raspont: string | null;
  gangbrygga: boolean | null;
  takstege: boolean | null;
  avvattning: string | null;
  floors: string | null;
  message: string | null;
  admin_notes: string | null;
}

const statusLabels: Record<QuoteStatus, string> = {
  ny: "Ny",
  kontaktad: "Kontaktad",
  offert_skickad: "Offert skickad",
  avslutad: "Avslutad (vunnen)",
  forlorad: "Förlorad",
};

const statusVariants: Record<QuoteStatus, string> = {
  ny: "bg-primary text-primary-foreground",
  kontaktad: "bg-blue-500 text-white",
  offert_skickad: "bg-amber-500 text-white",
  avslutad: "bg-green-600 text-white",
  forlorad: "bg-muted text-muted-foreground",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut } = useAuth();
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [fetching, setFetching] = useState(true);
  const [filter, setFilter] = useState<"all" | QuoteStatus>("all");
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login", { replace: true });
    }
  }, [user, isAdmin, loading, navigate]);

  const loadRequests = async () => {
    setFetching(true);
    const { data, error } = await supabase
      .from("quote_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Kunde inte hämta", description: error.message, variant: "destructive" });
    } else {
      setRequests((data ?? []) as QuoteRequest[]);
    }
    setFetching(false);
  };

  useEffect(() => {
    if (user && isAdmin) loadRequests();
  }, [user, isAdmin]);

  const filtered = useMemo(
    () => (filter === "all" ? requests : requests.filter((r) => r.status === filter)),
    [requests, filter],
  );

  const counts = useMemo(() => {
    const base: Record<string, number> = { all: requests.length };
    (Object.keys(statusLabels) as QuoteStatus[]).forEach((s) => {
      base[s] = requests.filter((r) => r.status === s).length;
    });
    return base;
  }, [requests]);

  const updateStatus = async (id: string, status: QuoteStatus) => {
    const { error } = await supabase.from("quote_requests").update({ status }).eq("id", id);
    if (error) {
      toast({ title: "Fel", description: error.message, variant: "destructive" });
      return;
    }
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    toast({ title: "Status uppdaterad" });
  };

  const saveNotes = async (id: string) => {
    const notes = notesDraft[id] ?? "";
    const { error } = await supabase
      .from("quote_requests")
      .update({ admin_notes: notes })
      .eq("id", id);
    if (error) {
      toast({ title: "Fel", description: error.message, variant: "destructive" });
      return;
    }
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, admin_notes: notes } : r)));
    toast({ title: "Anteckning sparad" });
  };

  const deleteRequest = async (id: string) => {
    const { error } = await supabase.from("quote_requests").delete().eq("id", id);
    if (error) {
      toast({ title: "Fel", description: error.message, variant: "destructive" });
      return;
    }
    setRequests((prev) => prev.filter((r) => r.id !== id));
    toast({ title: "Förfrågan raderad" });
  };

  if (loading || (!user && !loading)) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Laddar...</p>
      </main>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin – Offertförfrågningar | RoslagsTak</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <main className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="font-display text-xl text-foreground">Offertförfrågningar</h1>
              <p className="text-xs text-muted-foreground">Inloggad som {user?.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/admin/seo">
                  <BarChart3 className="w-4 h-4" />
                  SEO-dashboard
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={loadRequests} disabled={fetching}>
                <RefreshCw className={`w-4 h-4 ${fetching ? "animate-spin" : ""}`} />
                Uppdatera
              </Button>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="w-4 h-4" />
                Logga ut
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${
                filter === "all"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border hover:border-primary/50"
              }`}
            >
              Alla ({counts.all})
            </button>
            {(Object.keys(statusLabels) as QuoteStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${
                  filter === s
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border hover:border-primary/50"
                }`}
              >
                {statusLabels[s]} ({counts[s] ?? 0})
              </button>
            ))}
          </div>

          {fetching && requests.length === 0 ? (
            <p className="text-sm text-muted-foreground">Hämtar förfrågningar...</p>
          ) : filtered.length === 0 ? (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <p className="text-muted-foreground">Inga förfrågningar att visa.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((r) => (
                <article
                  key={r.id}
                  className="bg-card border border-border rounded-lg p-5 space-y-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h2 className="font-semibold text-foreground">{r.name}</h2>
                        <Badge className={statusVariants[r.status]}>
                          {statusLabels[r.status]}
                        </Badge>
                        <Badge variant="outline">
                          {r.mode === "configure" ? "Konfigurator" : "Rådgivning"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Inkommen{" "}
                        {new Date(r.created_at).toLocaleString("sv-SE", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select
                        value={r.status}
                        onValueChange={(v) => updateStatus(r.id, v as QuoteStatus)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {(Object.keys(statusLabels) as QuoteStatus[]).map((s) => (
                            <SelectItem key={s} value={s}>
                              {statusLabels[s]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" aria-label="Radera">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Radera förfrågan?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Detta kan inte ångras. Förfrågan från {r.name} raderas permanent.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Avbryt</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteRequest(r.id)}>
                              Radera
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  {/* Kontakt */}
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <a
                      href={`tel:${r.phone}`}
                      className="flex items-center gap-2 text-foreground hover:text-primary"
                    >
                      <Phone className="w-4 h-4 text-primary" />
                      {r.phone}
                    </a>
                    <a
                      href={`mailto:${r.email}`}
                      className="flex items-center gap-2 text-foreground hover:text-primary"
                    >
                      <Mail className="w-4 h-4 text-primary" />
                      {r.email}
                    </a>
                    {r.address && (
                      <div className="flex items-center gap-2 text-foreground sm:col-span-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        {r.address}
                      </div>
                    )}
                  </div>

                  {/* Konfiguration */}
                  {r.mode === "configure" && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm bg-muted/40 rounded-md p-4">
                      <Field label="Befintligt tak" value={r.current_roof} />
                      <Field label="Önskat tak" value={r.new_roof} />
                      <Field label="Råspontbyte" value={r.raspont} />
                      <Field label="Avvattning" value={r.avvattning} />
                      <Field label="Antal våningar" value={r.floors} />
                      <Field
                        label="Taksäkerhet"
                        value={
                          [r.gangbrygga && "Gångbrygga", r.takstege && "Takstege"]
                            .filter(Boolean)
                            .join(", ") || "Nej"
                        }
                      />
                    </div>
                  )}

                  {r.mode === "consultation" && r.message && (
                    <div className="bg-muted/40 rounded-md p-4 text-sm">
                      <p className="font-semibold text-foreground mb-1 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-primary" />
                        Meddelande
                      </p>
                      <p className="text-foreground whitespace-pre-wrap">{r.message}</p>
                    </div>
                  )}

                  {/* Anteckningar */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase text-muted-foreground">
                      Interna anteckningar
                    </p>
                    <Textarea
                      placeholder="Anteckningar (syns endast för admins)..."
                      defaultValue={r.admin_notes ?? ""}
                      rows={2}
                      onChange={(e) =>
                        setNotesDraft((prev) => ({ ...prev, [r.id]: e.target.value }))
                      }
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => saveNotes(r.id)}
                      disabled={
                        notesDraft[r.id] === undefined ||
                        notesDraft[r.id] === (r.admin_notes ?? "")
                      }
                    >
                      Spara anteckning
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

const Field = ({ label, value }: { label: string; value: string | null | undefined }) => (
  <div>
    <p className="text-xs uppercase font-semibold text-muted-foreground mb-0.5">{label}</p>
    <p className="text-foreground">{value || "—"}</p>
  </div>
);

export default AdminDashboard;