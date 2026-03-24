import { useState } from "react";
import { ArrowRight, CheckCircle, Home } from "lucide-react";

const roofTypeOptions = [
  "TP20 Plåttak",
  "Tegelplåttak",
  "Pannplåttak",
  "Dubbelfalsat plåttak",
  "Lertegeltak",
  "Betongpannetak",
  "Glacerade pannor",
  "Papptak",
  "Vet ej / Behöver rådgivning",
];

const QuoteConfigurator = () => {
  const [currentRoof, setCurrentRoof] = useState("");
  const [newRoof, setNewRoof] = useState("");
  const [raspont, setRaspont] = useState("");
  const [gangbrygga, setGangbrygga] = useState(false);
  const [takstege, setTakstege] = useState(false);
  const [avvattning, setAvvattning] = useState("");
  const [floors, setFloors] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="offert" className="py-20 md:py-28 bg-background" aria-labelledby="quote-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-primary mx-auto" />
            <h2 className="font-display text-3xl text-foreground">Tack för din förfrågan!</h2>
            <p className="text-muted-foreground">Vi återkommer inom 24 timmar med en kostnadsfri offert baserad på dina val.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="offert" className="py-20 md:py-28 bg-background" aria-labelledby="quote-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Konfigurera offert</p>
          <h2 id="quote-heading" className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Få en skräddarsydd offert på 2 minuter
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Filtrera in dina val nedan så kontaktar vi dig med ett prisförslag. Helt kostnadsfritt och utan förbindelser.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-card border border-border rounded-lg p-8 space-y-8">
          {/* Current roof */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              <Home className="w-4 h-4 inline mr-2 text-primary" />
              Befintlig taktyp
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {roofTypeOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setCurrentRoof(opt)}
                  className={`px-3 py-2.5 rounded-md text-sm border transition-colors ${
                    currentRoof === opt
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border text-foreground hover:border-primary/50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* New roof */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">Önskad ny taktyp</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {roofTypeOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setNewRoof(opt)}
                  className={`px-3 py-2.5 rounded-md text-sm border transition-colors ${
                    newRoof === opt
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border text-foreground hover:border-primary/50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Råspontbyte */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">Råspontbyte (underlagsbyte)</label>
            <div className="flex gap-3">
              {["Ja", "Nej", "Vet ej"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setRaspont(opt)}
                  className={`px-6 py-2.5 rounded-md text-sm border transition-colors ${
                    raspont === opt
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border text-foreground hover:border-primary/50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Taksäkerhet */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">Taksäkerhet</label>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setGangbrygga(!gangbrygga)}
                className={`px-5 py-2.5 rounded-md text-sm border transition-colors ${
                  gangbrygga
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border text-foreground hover:border-primary/50"
                }`}
              >
                Gångbrygga
              </button>
              <button
                type="button"
                onClick={() => setTakstege(!takstege)}
                className={`px-5 py-2.5 rounded-md text-sm border transition-colors ${
                  takstege
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border text-foreground hover:border-primary/50"
                }`}
              >
                Takstege
              </button>
            </div>
          </div>

          {/* Avvattning */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">Byte av avvattning (hängrännor & stuprör)</label>
            <div className="flex gap-3">
              {["Ja", "Nej", "Vet ej"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setAvvattning(opt)}
                  className={`px-6 py-2.5 rounded-md text-sm border transition-colors ${
                    avvattning === opt
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border text-foreground hover:border-primary/50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Antal våningar */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">Antal våningar</label>
            <div className="flex gap-3">
              {["1", "1.5", "2", "2.5", "3+"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setFloors(opt)}
                  className={`px-5 py-2.5 rounded-md text-sm border transition-colors ${
                    floors === opt
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border text-foreground hover:border-primary/50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Kontaktuppgifter */}
          <div className="border-t border-border pt-6">
            <label className="block text-sm font-semibold text-foreground mb-4">Dina kontaktuppgifter</label>
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Namn"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="tel"
                placeholder="Telefon"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="email"
                placeholder="E-post"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="text"
                placeholder="Adress / Ö (t.ex. Ljusterö)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground px-6 py-4 rounded-md font-semibold text-base hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            Skicka offertförfrågan
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-xs text-muted-foreground text-center">Helt kostnadsfritt. Vi återkommer inom 24 timmar.</p>
        </form>
      </div>
    </section>
  );
};

export default QuoteConfigurator;