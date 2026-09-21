import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle, Loader2, Mail, Phone } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedLinks from "@/components/RelatedLinks";
import FaqSection from "@/components/FaqSection";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { supabase } from "@/integrations/supabase/client";
import { locationIndex } from "@/data/location-index";
import { brfLocationSlugs } from "@/data/brf-locations";
import { toast } from "@/hooks/use-toast";
import heroImg from "@/assets/roof-brf-hero.jpg";

const facts = [
  { label: "Utförande", value: "10 års garanti" },
  { label: "Material", value: "30 års garanti på plåttak" },
  { label: "Företaget", value: "F-skatt och ansvarsförsäkring" },
  { label: "Standard", value: "Arbete enligt AMA Hus" },
];

const steps = [
  {
    title: "Takbesiktning",
    text: "Vi går igenom taket på plats, fotograferar och bedömer skick, underlag och vilka åtgärder som behövs. Besiktningen är kostnadsfri.",
  },
  {
    title: "Åtgärdsförslag och fast offert",
    text: "Ni får en skriftlig offert med fast pris. Vill styrelsen jämföra material tar vi fram alternativ, så att beslutet vilar på jämförbara underlag.",
  },
  {
    title: "Beslut i föreningen",
    text: "Styrelsen och stämman fattar beslutet. Vi svarar på frågor om underlag, material och tidplan innan ni bestämmer er.",
  },
  {
    title: "Planering",
    text: "Startdatum, ställning, etablering och tidplan stäms av med styrelsen. Föreningen får en fast kontaktperson hos oss under hela projektet.",
  },
  {
    title: "Genomförande",
    text: "Rivning, underlag, nytt tak och plåtdetaljer. Varje moment dokumenteras med foton och arbetsplatsen städas löpande.",
  },
  {
    title: "Slutbesiktning och garantibevis",
    text: "Vi går igenom arbetet tillsammans med er och lämnar garantihandlingar och fotodokumentation som styrelsen kan spara till nästa mandatperiod.",
  },
];

const boende = [
  {
    title: "Tidplan som stäms av",
    text: "Ställning, etablering och de moment som märks mest planeras tillsammans med styrelsen, så att informationen till de boende kan komma i god tid.",
  },
  {
    title: "Skydd av fasad och mark",
    text: "Vi reser ställning och skyddar fasad, planteringar och uteplatser innan arbetet börjar.",
  },
  {
    title: "Ordning på arbetsplatsen",
    text: "Arbetsplatsen städas löpande och lämnas ren efter slutbesiktningen, med bortforsling av det gamla taket.",
  },
  {
    title: "En fast kontaktperson",
    text: "Styrelsen har en person att ringa under hela projektet, från besiktning till slutbesiktning.",
  },
];

const brfFaqs = [
  {
    question: "Hur går ett takbyte till för en bostadsrättsförening?",
    answer:
      "Det börjar med en kostnadsfri takbesiktning, därefter får föreningen en skriftlig offert med fast pris som styrelsen och stämman kan besluta på. När beslutet är taget planerar vi start, ställning och tidplan tillsammans med styrelsen. Arbetet dokumenteras med foton och avslutas med slutbesiktning och garantihandlingar.",
  },
  {
    question: "Behöver föreningen en besiktning före ett takbyte?",
    answer:
      "Vi rekommenderar det. En besiktning visar takets skick, om det räcker med reparation eller om taket behöver bytas, och ger styrelsen ett underlag för underhållsplan och budget. Vår besiktning är kostnadsfri och förpliktar inte till något.",
  },
  {
    question: "Vad kostar ett takbyte för en BRF?",
    answer:
      "Priset beror på takyta, taktyp, lutning, antal genomföringar och underlagets skick. Vi lämnar alltid fast pris efter kostnadsfri besiktning, så att styrelsen har ett konkret underlag att besluta på. Riktpriser per material finns på sidan Priser.",
  },
  {
    question: "Vilken garanti får föreningen?",
    answer:
      "Vi lämnar 10 års utförandegaranti och 30 års materialgaranti på plåttak. Garantihandlingar och fotodokumentation lämnas efter slutbesiktning, så att de går att spara i föreningens arkiv.",
  },
  {
    question: "Kan ni ta hand om takservice och snöskottning löpande?",
    answer:
      "Ja. Vi erbjuder serviceavtal med regelbunden takkontroll, rengöring och snöskottning. Upplägg och pris anpassas efter föreningens byggnader, så kontakta oss för en genomgång.",
  },
  {
    question: "Har ni F-skatt och ansvarsförsäkring?",
    answer:
      "Ja, RoslagsTak har F-skatt och ansvarsförsäkring. Har föreningen krav på ytterligare dokumentation vid upphandling är ni välkomna att höra av er.",
  },
  {
    question: "Hur minimerar ni störningen för de boende?",
    answer:
      "Vi planerar ställning och tidplan tillsammans med styrelsen, skyddar fasad och mark, städar löpande och ger föreningen en fast kontaktperson under hela projektet.",
  },
  {
    question: "Vilka områden arbetar ni i?",
    answer:
      "Vi arbetar i Storstockholm, Roslagen och Mälardalen. På sidan Områden ser du de orter vi arbetar i.",
  },
];

export interface BrfPlace {
  slug: string;
  name: string;
  prep: string;
  region: string;
  paragraphs: string[];
  nearby: { slug: string; name: string }[];
}

const inputClass =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring";
const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

const initialForm = {
  forening: "",
  name: "",
  phone: "",
  email: "",
  address: "",
  buildings: "",
  area: "",
  topic: "Takbesiktning",
  message: "",
};

const BrfForm = ({ place }: { place?: BrfPlace }) => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof typeof initialForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const message = [
      "BRF-förfrågan",
      `Förening: ${form.forening.trim()}`,
      place ? `Ort (sida /brf/${place.slug}): ${place.name}` : null,
      `Gäller: ${form.topic}`,
      form.buildings ? `Antal byggnader: ${form.buildings}` : null,
      form.area.trim() ? `Ungefärlig takyta: ${form.area.trim()}` : null,
      form.message.trim() ? `\n${form.message.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const { error } = await supabase.from("quote_requests").insert({
      mode: "consultation",
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      address: form.address.trim() || null,
      message,
    });

    setSubmitting(false);

    if (error) {
      console.error("BRF request error:", error);
      toast({
        title: "Något gick fel",
        description: "Försök igen eller ring oss direkt på 070-154 36 39.",
        variant: "destructive",
      });
      return;
    }

    setSubmitted(true);
    setForm(initialForm);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-8 md:p-10" role="status">
        <CheckCircle className="h-8 w-8 text-accent" aria-hidden="true" />
        <h3 className="font-display text-2xl text-foreground">Tack, vi har tagit emot förfrågan.</h3>
        <p className="max-w-md leading-relaxed text-muted-foreground">
          Vi återkommer inom 24 timmar för att stämma av tid för besiktning. Vill ni prata direkt går det bra att
          ringa 070-154 36 39.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-2 text-sm font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4"
        >
          Skicka en ny förfrågan
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Förfrågan från bostadsrättsförening"
      className="space-y-5 rounded-2xl border border-border bg-card p-6 md:p-10"
    >
      <div>
        <label htmlFor="brf-forening" className={labelClass}>Bostadsrättsförening</label>
        <input id="brf-forening" required value={form.forening} onChange={set("forening")} className={inputClass} placeholder="Föreningens namn" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="brf-name" className={labelClass}>Kontaktperson</label>
          <input id="brf-name" required autoComplete="name" value={form.name} onChange={set("name")} className={inputClass} placeholder="Namn" />
        </div>
        <div>
          <label htmlFor="brf-phone" className={labelClass}>Telefon</label>
          <input id="brf-phone" type="tel" required autoComplete="tel" value={form.phone} onChange={set("phone")} className={inputClass} placeholder="070-000 00 00" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="brf-email" className={labelClass}>E-post</label>
          <input id="brf-email" type="email" required autoComplete="email" value={form.email} onChange={set("email")} className={inputClass} placeholder="namn@förening.se" />
        </div>
        <div>
          <label htmlFor="brf-address" className={labelClass}>Adress eller ort</label>
          <input id="brf-address" required value={form.address} onChange={set("address")} className={inputClass} placeholder="Gatuadress, ort" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="brf-topic" className={labelClass}>Gäller</label>
          <select id="brf-topic" value={form.topic} onChange={set("topic")} className={inputClass}>
            <option>Takbesiktning</option>
            <option>Takbyte</option>
            <option>Takrenovering</option>
            <option>Serviceavtal</option>
            <option>Vet ej än</option>
          </select>
        </div>
        <div>
          <label htmlFor="brf-buildings" className={labelClass}>Antal byggnader</label>
          <select id="brf-buildings" value={form.buildings} onChange={set("buildings")} className={inputClass}>
            <option value="">Vet ej</option>
            <option>1</option>
            <option>2–3</option>
            <option>4–9</option>
            <option>10 eller fler</option>
          </select>
        </div>
        <div>
          <label htmlFor="brf-area" className={labelClass}>Takyta (ca m²)</label>
          <input id="brf-area" value={form.area} onChange={set("area")} className={inputClass} placeholder="Om ni vet" />
        </div>
      </div>
      <div>
        <label htmlFor="brf-message" className={labelClass}>Meddelande <span className="font-normal text-muted-foreground">(valfritt)</span></label>
        <textarea id="brf-message" rows={4} value={form.message} onChange={set("message")} className={`${inputClass} resize-none`} placeholder="Taktyp, ålder, kända problem eller när ni vill komma igång." />
      </div>
      <button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-[16px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Skickar
          </>
        ) : (
          <>
            Skicka förfrågan <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>
      <p className="text-center text-[13px] text-muted-foreground">
        Vi svarar inom 24 timmar. Besiktning och offert är kostnadsfria och förpliktar inte till något.
      </p>
    </form>
  );
};

const BrfPage = ({ place }: { place?: BrfPlace }) => {
  const location = useLocation();
  const inPlace = place ? ` ${place.prep} ${place.name}` : "";
  const pagePath = place ? `/brf/${place.slug}` : "/brf";
  const faqs = place
    ? [
        {
          question: `Tar ni uppdrag från bostadsrättsföreningar${inPlace}?`,
          answer: `Ja. Vi tar uppdrag från bostadsrättsföreningar${inPlace} och närområdet. Vi börjar med en kostnadsfri takbesiktning och lämnar ett skriftligt underlag med fast pris som styrelsen kan besluta på. Efter slutbesiktning får föreningen garantibevis och fotodokumentation.`,
        },
        ...brfFaqs,
      ]
    : brfFaqs;
  const brfPlaces = brfLocationSlugs
    .map((slug) => locationIndex.find((l) => l.slug === slug))
    .filter((l): l is (typeof locationIndex)[number] => Boolean(l));

  useEffect(() => {
    if (!location.hash) return;
    const t = window.setTimeout(() => {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
    return () => window.clearTimeout(t);
  }, [location.hash]);

  return (
    <>
      <SEOHead
        title={place ? `Takbyte BRF${inPlace} — bostadsrättsföreningar` : "Takbyte för BRF — bostadsrättsföreningar"}
        description={
          place
            ? `Takbyte, takbesiktning och serviceavtal för bostadsrättsföreningar${inPlace}. Fast pris efter kostnadsfri besiktning, 10 års utförandegaranti, F-skatt och ansvarsförsäkring.`
            : "Takbyte, takbesiktning och serviceavtal för bostadsrättsföreningar i Storstockholm, Roslagen och Mälardalen. Fast pris, 10 års utförandegaranti, F-skatt och ansvarsförsäkring."
        }
        canonical={`https://roslagstak.se${pagePath}`}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Hem", path: "/" },
          { name: "BRF & fastigheter", path: "/brf" },
          ...(place ? [{ name: `BRF${inPlace}`, path: pagePath }] : []),
        ])}
      />
      <Header />
      <main>
        <div className="pt-24">
          <Breadcrumbs
            items={[
              { name: "Hem", path: "/" },
              place ? { name: "BRF & fastigheter", path: "/brf" } : { name: "BRF & fastigheter", path: "/brf" },
              ...(place ? [{ name: `BRF${inPlace}` }] : []),
            ]}
            withSchema={false}
          />
        </div>

        {/* Hero */}
        <section className="border-b border-border bg-secondary" aria-labelledby="brf-heading">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="mb-6 text-[13px] font-bold uppercase tracking-[0.16em] text-primary">
                {place ? `BRF${inPlace}` : "BRF & fastigheter"}
              </p>
              <h1
                id="brf-heading"
                className="max-w-[21ch] font-display text-[clamp(2.2rem,4.4vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.025em] text-balance text-foreground"
              >
                Takbyte för bostadsrättsföreningar{inPlace},{" "}
                <span className="italic text-accent">med underlag styrelsen kan besluta på.</span>
              </h1>
              <p className="mt-7 max-w-[52ch] text-[18px] leading-relaxed text-muted-foreground md:text-[19px]">
                Från kostnadsfri takbesiktning och fast offert till slutbesiktning och garantibevis. Vi arbetar i
                {place ? `${place.name} och närområdet` : "Storstockholm, Roslagen och Mälardalen"}.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#forfragan"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-[16px] font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
                >
                  Boka kostnadsfri takbesiktning <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="tel:0701543639"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary/20 px-7 py-4 text-[16px] font-semibold text-foreground transition-colors hover:bg-background"
                >
                  <Phone className="h-4 w-4 text-accent" aria-hidden="true" /> 070-154 36 39
                </a>
              </div>
            </div>
            <figure className="m-0 lg:col-span-5">
              <img
                src={heroImg}
                alt="Nylagt tegelpanneliknande tak med snörasskydd i Roslagens skärgård"
                width={1400}
                height={940}
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/3] w-full rounded-2xl object-cover lg:aspect-[4/5]"
              />
              <figcaption className="mt-3 text-[13px] text-muted-foreground">
                Snörasskydd på nylagt tak, Roslagens skärgård.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Fakta */}
        <section className="border-b border-border bg-background" aria-label="Trygghet och villkor">
          <dl className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className={`px-6 py-8 ${i % 2 === 1 ? "border-l" : ""} ${i >= 2 ? "border-t lg:border-t-0" : ""} ${i > 0 ? "lg:border-l" : ""} border-border`}
              >
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{f.label}</dt>
                <dd className="mt-2 font-display text-[1.2rem] leading-snug text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Intro */}
        <section className="bg-background py-24 md:py-32" aria-labelledby="brf-intro-heading">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <h2
                id="brf-intro-heading"
                className="font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-balance text-foreground"
              >
                Ett takbyte är ett föreningsbeslut, inte bara ett hantverk.
              </h2>
            </Reveal>
            <Reveal className="lg:col-span-6" delay={0.1}>
              <p className="text-[18px] leading-relaxed text-muted-foreground">
                Taket är en stor post i underhållsplanen och ett beslut som ska hålla inför både medlemmar och nästa
                styrelse. Därför bygger vi vårt arbete på tre underlag som går att spara och jämföra.
              </p>
              <ul className="mt-8 border-t border-border">
                {[
                  ["Besiktningsrapport", "Takets skick dokumenterat med foton, som grund för underhållsplan och beslut."],
                  ["Fast offert", "Ett skriftligt pris som gäller, med tydligt vad som ingår."],
                  ["Garantihandlingar", "Fotodokumentation och garantibevis efter slutbesiktning."],
                ].map(([title, text]) => (
                  <li key={title} className="grid gap-1 border-b border-border py-5 sm:grid-cols-[13rem_1fr] sm:gap-6">
                    <span className="font-display text-lg text-foreground">{title}</span>
                    <span className="text-muted-foreground">{text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {place && (
          <section className="border-t border-border bg-background pb-24 md:pb-28" aria-labelledby="brf-place-heading">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:gap-16">
              <h2
                id="brf-place-heading"
                className="font-display text-[clamp(1.6rem,2.8vw,2.2rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-balance text-foreground lg:col-span-5"
              >
                Takbyte för bostadsrättsföreningar{inPlace}
              </h2>
              <div className="space-y-5 text-[18px] leading-relaxed text-muted-foreground lg:col-span-7">
                {place.paragraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
                <p className="text-[16px]">
                  <Link to={`/taklaggare-${place.slug}`} className="font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4">
                    Takläggare{inPlace}
                  </Link>
                  {place.nearby.length > 0 && (
                    <>
                      {" "}· Närliggande:{" "}
                      {place.nearby.map((n, i) => (
                        <span key={n.slug}>
                          {i > 0 && ", "}
                          <Link to={`/brf/${n.slug}`} className="text-primary underline underline-offset-4 hover:no-underline">
                            {n.name}
                          </Link>
                        </span>
                      ))}
                    </>
                  )}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Process */}
        <section className="border-y border-border bg-secondary py-24 md:py-32" aria-labelledby="brf-process-heading">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
              <p className="mb-6 text-[13px] font-bold uppercase tracking-[0.16em] text-primary">Processen</p>
              <h2
                id="brf-process-heading"
                className="font-display text-[clamp(1.9rem,3.4vw,2.7rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-balance text-foreground"
              >
                Så går ett takbyte till i en förening
              </h2>
              <p className="mt-6 max-w-[42ch] text-[17px] leading-relaxed text-muted-foreground">
                Sex steg från första besiktningen till garantibevis. Beslutet ligger hos föreningen, och vi ser till
                att underlaget finns när det behövs.
              </p>
            </div>
            <ol className="lg:col-span-7">
              {steps.map((step, i) => (
                <li key={step.title} className="border-t border-foreground/15 last:border-b">
                  <Reveal className="grid gap-x-8 gap-y-2 py-8 sm:grid-cols-[3.5rem_1fr]" delay={Math.min(i, 3) * 0.05}>
                    <span className="font-display text-3xl leading-none text-accent tabular-nums">{i + 1}</span>
                    <div>
                      <h3 className="font-display text-[1.4rem] leading-snug text-foreground">{step.title}</h3>
                      <p className="mt-2 max-w-[56ch] leading-relaxed text-muted-foreground">{step.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Två sätt att arbeta */}
        <section className="bg-primary py-24 text-primary-foreground md:py-32" aria-labelledby="brf-offer-heading">
          <div className="mx-auto max-w-7xl px-6">
            <p className="mb-6 text-[13px] font-bold uppercase tracking-[0.16em] text-primary-foreground/60">
              Tjänster för föreningen
            </p>
            <h2
              id="brf-offer-heading"
              className="max-w-[22ch] font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-balance"
            >
              Två sätt att arbeta med föreningens tak
            </h2>

            <div className="mt-14 grid gap-14 border-t border-primary-foreground/20 pt-14 md:grid-cols-2 md:gap-0 md:divide-x md:divide-primary-foreground/20">
              <div className="md:pr-14">
                <h3 className="font-display text-[1.9rem] leading-tight">Takbyte och takrenovering</h3>
                <p className="mt-4 max-w-[46ch] leading-relaxed text-primary-foreground/75">
                  Komplett takbyte eller renovering, från besiktning till slutbesiktning. Vi lämnar fast pris efter
                  kostnadsfri besiktning.
                </p>
                <ul className="mt-8 border-t border-primary-foreground/20 text-primary-foreground/90">
                  {[
                    "Takomläggning i plåt, betongpannor och tegel",
                    "Takrenovering och reparation",
                    "Takavvattning och plåtarbeten",
                    "Taksäkerhet på det nya taket",
                  ].map((item) => (
                    <li key={item} className="border-b border-primary-foreground/20 py-3.5">{item}</li>
                  ))}
                </ul>
                <Link
                  to="/tjanster/takomlaggning"
                  className="mt-8 inline-flex items-center gap-2 font-semibold text-accent underline decoration-2 underline-offset-[6px] hover:text-primary-foreground"
                >
                  Läs om takomläggning <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="md:pl-14">
                <h3 className="font-display text-[1.9rem] leading-tight">Serviceavtal</h3>
                <p className="mt-4 max-w-[46ch] leading-relaxed text-primary-foreground/75">
                  Taket sköts löpande under ett avtal i stället för när något redan gått fel. Upplägg och pris
                  anpassas efter föreningens byggnader.
                </p>
                <ul className="mt-8 border-t border-primary-foreground/20 text-primary-foreground/90">
                  {["Regelbunden takkontroll", "Rengöring av taket", "Snöskottning"].map((item) => (
                    <li key={item} className="border-b border-primary-foreground/20 py-3.5">{item}</li>
                  ))}
                </ul>
                <p className="mt-6 text-[15px] leading-relaxed text-primary-foreground/60">
                  Vi har utfört pannbyten och takbesiktningar på flerbostadshus.
                </p>
                <a
                  href="#forfragan"
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-accent underline decoration-2 underline-offset-[6px] hover:text-primary-foreground"
                >
                  Fråga om serviceavtal <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Ekonomi */}
        <section className="bg-background py-24 md:py-32" aria-labelledby="brf-economy-heading">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="mb-6 text-[13px] font-bold uppercase tracking-[0.16em] text-primary">Planering och ekonomi</p>
              <h2
                id="brf-economy-heading"
                className="font-display text-[clamp(1.9rem,3.4vw,2.7rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-balance text-foreground"
              >
                Planera taket i underhållsplanen, inte först när det läcker
              </h2>
            </div>
            <div className="space-y-6 text-[18px] leading-relaxed text-muted-foreground lg:col-span-7">
              <p>
                Ett tak som byts i tid går att planera in i budget och underhållsplan. Ett akut takbyte blir en
                oplanerad kostnad som styrelsen måste lösa snabbt. Med en besiktning i god tid vet ni vad taket
                kräver och när.
              </p>
              <p>
                Takbyten finansieras ofta via föreningens underhållsfond, lån eller en justering av avgiften. Vi
                lämnar ett fast, skriftligt prisunderlag som styrelsen kan ta med i ekonomin och till förvaltare eller
                bank.
              </p>
              <p>
                Osäker på när det är dags? Boka en kostnadsfri besiktning så får ni ett besked om takets skick, utan
                förpliktelser.
              </p>
            </div>
          </div>
        </section>

        {/* Boende */}
        <section className="border-y border-border bg-secondary py-24 md:py-32" aria-labelledby="brf-residents-heading">
          <div className="mx-auto max-w-7xl px-6">
            <p className="mb-6 text-[13px] font-bold uppercase tracking-[0.16em] text-primary">För de boende</p>
            <h2
              id="brf-residents-heading"
              className="max-w-[24ch] font-display text-[clamp(1.9rem,3.4vw,2.7rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-balance text-foreground"
            >
              Så begränsar vi störningen under arbetet
            </h2>
            <div className="mt-14 grid border-t border-foreground/15 md:grid-cols-2">
              {boende.map((item, i) => (
                <div
                  key={item.title}
                  className={`border-b border-foreground/15 py-8 ${i % 2 === 0 ? "md:pr-12" : "md:border-l md:pl-12"}`}
                >
                  <h3 className="font-display text-[1.3rem] text-foreground">{item.title}</h3>
                  <p className="mt-2 max-w-[48ch] leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Förfrågan */}
        <section id="forfragan" className="scroll-mt-24 bg-background py-24 md:py-32" aria-labelledby="brf-form-heading">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="mb-6 text-[13px] font-bold uppercase tracking-[0.16em] text-primary">Kom igång</p>
              <h2
                id="brf-form-heading"
                className="font-display text-[clamp(1.9rem,3.4vw,2.7rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-balance text-foreground"
              >
                Boka kostnadsfri takbesiktning
              </h2>
              <p className="mt-6 max-w-[42ch] text-[17px] leading-relaxed text-muted-foreground">
                Berätta kort om föreningen och taket. Vi återkommer inom 24 timmar och bokar en tid som passar
                styrelsen.
              </p>
              <ul className="mt-10 space-y-4 border-t border-border pt-8 text-[17px]">
                <li>
                  <a href="tel:0701543639" className="inline-flex items-center gap-3 font-semibold text-foreground hover:text-primary">
                    <Phone className="h-5 w-5 text-accent" aria-hidden="true" /> 070-154 36 39
                  </a>
                </li>
                <li>
                  <a href="mailto:info@roslagstak.se" className="inline-flex items-center gap-3 text-foreground hover:text-primary">
                    <Mail className="h-5 w-5 text-accent" aria-hidden="true" /> info@roslagstak.se
                  </a>
                </li>
              </ul>
              <p className="mt-8 text-[15px] leading-relaxed text-muted-foreground">
                Vi arbetar i Storstockholm, Roslagen och Mälardalen.{" "}
                <Link to="/omraden" className="font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4">
                  Se alla områden
                </Link>
              </p>
            </div>
            <div className="lg:col-span-7">
              <BrfForm place={place} />
            </div>
          </div>
        </section>

        {!place && (
          <section className="border-t border-border bg-secondary py-16 md:py-20" aria-labelledby="brf-places-heading">
            <div className="mx-auto max-w-7xl px-6">
              <h2 id="brf-places-heading" className="font-display text-2xl text-foreground md:text-3xl">
                Bostadsrättsföreningar i Storstockholm, Roslagen och Mälardalen
              </h2>
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
                {brfPlaces.map((l) => (
                  <li key={l.slug}>
                    <Link to={`/brf/${l.slug}`} className="text-[16px] text-foreground underline decoration-accent/50 decoration-2 underline-offset-4 hover:text-primary hover:decoration-accent">
                      BRF {l.isIsland ? "på" : "i"} {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <FaqSection
          title="Frågor från styrelser om takbyte"
          intro="Process, pris, garanti och vad som händer under arbetet."
          faqs={faqs}
          path={pagePath}
        />
        <RelatedLinks currentPath={pagePath} title="Läs vidare" />
      </main>
      <Footer />
    </>
  );
};

export default BrfPage;
