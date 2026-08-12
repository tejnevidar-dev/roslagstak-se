import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { LogOut, Mail, Phone, MapPin, MessageSquare, Trash2, RefreshCw, BarChart3, Pencil, Home, IdCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  property_designation: string | null;
  personal_number: string | null;
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

  const saveDetails = async (
    id: string,
    values: { property_designation: string; personal_number: string },
  ) => {
    const payload = {
      property_designation: values.property_designation.trim() || null,
      personal_number: values.personal_number.trim() || null,
    };
    const { error } = await supabase.from("quote_requests").update(payload).eq("id", id);
    if (error) {
      toast({ title: "Fel", description: error.message, variant: "destructive" });
      return false;
    }
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, ...payload } : r)));
    toast({ title: "Uppgifter sparade" });
    return true;
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
                     <div className="flex flex-wrap items-center gap-2">
                       <DetailsDialog
                         request={r}
                         onSaveDetails={saveDetails}
                         onSaveNotes={async (id, notes) => {
                           const { error } = await supabase
                             .from("quote_requests")
                             .update({ admin_notes: notes })
                             .eq("id", id);
                           if (error) {
                             toast({ title: "Fel", description: error.message, variant: "destructive" });
                             return;
                           }
                           setRequests((prev) =>
                             prev.map((x) => (x.id === id ? { ...x, admin_notes: notes } : x)),
                           );
                           toast({ title: "Anteckning sparad" });
                         }}
                         onStatusChange={updateStatus}
                       />
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
                    {(r.property_designation || r.personal_number) && (
                      <div className="flex items-center gap-2 text-foreground sm:col-span-2">
                        <IdCard className="w-4 h-4 text-primary" />
                        {[r.property_designation, r.personal_number].filter(Boolean).join(" · ")}
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

const BigField = ({ label, value }: { label: string; value: string | null | undefined }) => (
  <div className="rounded-md border border-border bg-muted/30 p-3">
    <p className="text-xs uppercase font-semibold text-muted-foreground mb-1">{label}</p>
    <p className="text-base sm:text-lg text-foreground break-words">{value || "—"}</p>
  </div>
);

const DetailsDialog = ({
  request: r,
  onSaveDetails,
  onSaveNotes,
  onStatusChange,
}: {
  request: QuoteRequest;
  onSaveDetails: (
    id: string,
    values: { property_designation: string; personal_number: string },
  ) => Promise<boolean>;
  onSaveNotes: (id: string, notes: string) => Promise<void>;
  onStatusChange: (id: string, status: QuoteStatus) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [prop, setProp] = useState(r.property_designation ?? "");
  const [pnr, setPnr] = useState(r.personal_number ?? "");
  const [notes, setNotes] = useState(r.admin_notes ?? "");

  useEffect(() => {
    if (open) {
      setProp(r.property_designation ?? "");
      setPnr(r.personal_number ?? "");
      setNotes(r.admin_notes ?? "");
      setEditing(false);
    }
  }, [open, r]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <Home className="w-4 h-4" />
          Visa allt
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[100vw] w-screen h-[100dvh] sm:max-w-4xl sm:w-full sm:h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="text-left">
          <DialogTitle className="font-display text-2xl">{r.name}</DialogTitle>
          <DialogDescription>
            {r.mode === "configure" ? "Konfigurator" : "Rådgivning"} ·{" "}
            {new Date(r.created_at).toLocaleString("sv-SE", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={statusVariants[r.status]}>{statusLabels[r.status]}</Badge>
            <Select value={r.status} onValueChange={(v) => onStatusChange(r.id, v as QuoteStatus)}>
              <SelectTrigger className="w-[200px]">
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
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <a href={`tel:${r.phone}`} className="rounded-md border border-border bg-muted/30 p-3 hover:border-primary">
              <p className="text-xs uppercase font-semibold text-muted-foreground mb-1 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-primary" /> Telefon
              </p>
              <p className="text-base sm:text-lg text-foreground">{r.phone}</p>
            </a>
            <a href={`mailto:${r.email}`} className="rounded-md border border-border bg-muted/30 p-3 hover:border-primary">
              <p className="text-xs uppercase font-semibold text-muted-foreground mb-1 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-primary" /> E-post
              </p>
              <p className="text-base sm:text-lg text-foreground break-words">{r.email}</p>
            </a>
            <div className="sm:col-span-2">
              <BigField label="Adress" value={r.address} />
            </div>
          </div>

          {/* Fastighet & personnummer */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                <IdCard className="w-4 h-4 text-primary" /> Fastighet & personnummer
              </p>
              {!editing && (
                <Button size="sm" variant="outline" onClick={() => setEditing(true)}>
                  <Pencil className="w-4 h-4" />
                  Redigera
                </Button>
              )}
            </div>
            {editing ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor={`prop-${r.id}`}>Fastighetsbeteckning</Label>
                  <Input
                    id={`prop-${r.id}`}
                    value={prop}
                    onChange={(e) => setProp(e.target.value)}
                    placeholder="t.ex. Blidö 1:23"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`pnr-${r.id}`}>Personnummer</Label>
                  <Input
                    id={`pnr-${r.id}`}
                    value={pnr}
                    onChange={(e) => setPnr(e.target.value)}
                    placeholder="ÅÅÅÅMMDD-XXXX"
                  />
                </div>
                <div className="sm:col-span-2 flex gap-2">
                  <Button
                    size="sm"
                    disabled={saving}
                    onClick={async () => {
                      setSaving(true);
                      const ok = await onSaveDetails(r.id, {
                        property_designation: prop,
                        personal_number: pnr,
                      });
                      setSaving(false);
                      if (ok) setEditing(false);
                    }}
                  >
                    Spara uppgifter
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>
                    Avbryt
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                <BigField label="Fastighetsbeteckning" value={r.property_designation} />
                <BigField label="Personnummer" value={r.personal_number} />
              </div>
            )}
          </div>

          {r.mode === "configure" && (
            <div className="grid gap-3 sm:grid-cols-2">
              <BigField label="Befintligt tak" value={r.current_roof} />
              <BigField label="Önskat tak" value={r.new_roof} />
              <BigField label="Råspontbyte" value={r.raspont} />
              <BigField label="Avvattning" value={r.avvattning} />
              <BigField label="Antal våningar" value={r.floors} />
              <BigField
                label="Taksäkerhet"
                value={
                  [r.gangbrygga && "Gångbrygga", r.takstege && "Takstege"]
                    .filter(Boolean)
                    .join(", ") || "Nej"
                }
              />
            </div>
          )}

          {r.message && (
            <div className="rounded-md border border-border bg-muted/30 p-3">
              <p className="text-xs uppercase font-semibold text-muted-foreground mb-1 flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-primary" /> Meddelande
              </p>
              <p className="text-base text-foreground whitespace-pre-wrap">{r.message}</p>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">Interna anteckningar</p>
            <Textarea value={notes} rows={4} onChange={(e) => setNotes(e.target.value)} />
            <Button
              size="sm"
              variant="outline"
              disabled={notes === (r.admin_notes ?? "")}
              onClick={() => onSaveNotes(r.id, notes)}
            >
              Spara anteckning
            </Button>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Stäng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminDashboard;