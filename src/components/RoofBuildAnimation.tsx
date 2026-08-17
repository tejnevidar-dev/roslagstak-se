import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Phone, Play, RotateCcw } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import roofRaspont from "@/assets/roof-build-01-raspont.jpg";
import roofPapp from "@/assets/roof-build-02-papp.jpg";
import roofRannor from "@/assets/roof-build-03-rannor.jpg";
import roofVindskivor from "@/assets/roof-build-04-vindskivor.jpg";
import roofLakt from "@/assets/roof-build-05-lakt.jpg";
import roofPannor from "@/assets/roof-build-06-pannor.jpg";
import roofBeslag from "@/assets/roof-build-07-beslag.jpg";
import roofSnorasskydd from "@/assets/roof-build-08-snorasskydd.jpg";
import roofPoster from "@/assets/roof-build-poster.jpg";

interface Step {
  id: string;
  label: string;
  title: string;
  body: string;
  detail: string;
  image: string;
  alt: string;
}

const STEPS: Step[] = [
  {
    id: "raspont",
    label: "Råspont",
    title: "Råspont & underlagstak",
    body: "Vi river det gamla taket, kontrollerar takstolarna och lägger ny råspont där virket är skadat.",
    detail: "Kontroll av bärande konstruktion, ventilerad luftspalt och fukttäta anslutningar.",
    image: roofRaspont,
    alt: "Fotorealistisk 3D-visualisering av ett skärgårdstak med nylagd råspont",
  },
  {
    id: "papp",
    label: "Underlagspapp",
    title: "Underlagspapp — Mataki Haloten PRO",
    body: "Vi lägger Mataki Haloten PRO i förband över hela ytan — det är underlagstaket som håller vattnet ute.",
    detail: "Överlapp enligt Matakis anvisning, extra tätning vid genomföringar och skorsten.",
    image: roofPapp,
    alt: "Fotorealistisk 3D-visualisering av ett tak täckt med Mataki Haloten PRO underlagspapp",
  },
  {
    id: "rannor",
    label: "Hängrännor",
    title: "Fotplåt & hängrännor",
    body: "Fotplåt, rännkrokar och hängrännor monteras så att vattnet leds bort från fasad och grund.",
    detail: "Rätt fall mot stuprör, dimensionerat för skärgårdens slagregn.",
    image: roofRannor,
    alt: "Fotorealistisk 3D-visualisering av fotplåt och nya hängrännor",
  },
  {
    id: "vindskivor",
    label: "Vindskivor",
    title: "Vindskivor & gavelbeslag",
    body: "Nya vindskivor och gavelbeslag skyddar takets kanter mot vind, regn och röta.",
    detail: "Grundmålat virke eller underhållsfri plåt — du väljer.",
    image: roofVindskivor,
    alt: "Fotorealistisk 3D-visualisering av monterade vindskivor och gavelbeslag",
  },
  {
    id: "lakt",
    label: "Läkt",
    title: "Ströläkt & bärläkt",
    body: "Ströläkt ger luftspalten, bärläkten sätts på exakt centrumavstånd för din pannmodell.",
    detail: "Millimeterinmätning så att sista raden hamnar rätt vid nock.",
    image: roofLakt,
    alt: "Fotorealistisk 3D-visualisering av ströläkt och bärläkt på ett tak",
  },
  {
    id: "pannor",
    label: "Takpannor",
    title: "Takpannor eller plåt",
    body: "Betongpannor, tegel eller falsad plåt läggs rad för rad — första raden hänger ut till mitten av hängrännan.",
    detail: "Stormklammer i utsatta lägen — standard på öar och kustnära tak.",
    image: roofPannor,
    alt: "Fotorealistisk 3D-visualisering av nylagda mörka takpannor",
  },
  {
    id: "beslag",
    label: "Plåtbeslag",
    title: "Nockpannor & plåtbeslag",
    body: "Nock, valmar, skorstensbeslag och genomföringar tätas. Gavelbeslagen läggs över pannorna.",
    detail: "Täta anslutningar hela vägen runt takets kanter och genomföringar.",
    image: roofBeslag,
    alt: "Fotorealistisk 3D-visualisering av nockpannor och plåtbeslag på ett skärgårdstak",
  },
  {
    id: "snorasskydd",
    label: "Snörasskydd",
    title: "Snörasskydd & slutbesiktning",
    body: "Sist monteras snörasskydden ovanför takfoten — sedan städning, dokumentation och slutbesiktning.",
    detail: "Du får garantibevis och en genomgång av hela taket på plats.",
    image: roofSnorasskydd,
    alt: "Fotorealistisk 3D-visualisering av monterat snörasskydd på ett färdigt skärgårdstak",
  },
];

const AUTOPLAY_MS = 2400;

const RoofBuildAnimation = () => {
  const reduce = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting) && !started.current) {
          started.current = true;
          setPlaying(!reduce);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [reduce]);

  useEffect(() => {
    if (!playing) return;
    const timeout = window.setTimeout(() => {
      setStep((current) => {
        if (current === STEPS.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(timeout);
  }, [playing, step]);

  const goTo = (index: number) => {
    setPlaying(false);
    setStep(Math.max(0, Math.min(STEPS.length - 1, index)));
  };

  const restart = useCallback(() => {
    setStep(0);
    setPlaying(!reduce);
  }, [reduce]);

  const current = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <section id="hur-det-gar-till" aria-label="Så går ett takbyte till" className="relative overflow-hidden bg-ink py-28 text-ink-foreground lg:py-44">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/15 to-transparent" />
      <div ref={sectionRef} className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <div className="mb-16 grid items-end gap-10 border-b border-ink-foreground/15 pb-10 lg:mb-24 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeading
              meta="Metodik"
              index="02 / 04"
              tone="dark"
              title={<>Sju lager mellan dig och <em className="font-normal italic text-ink-foreground/55">skärgårdens väder</em></>}
              intro="Följ ett komplett takbyte lager för lager — visualiserat i samma filmiska miljö som resten av RoslagsTak."
            />
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <div className="font-display text-[clamp(4rem,11vw,9rem)] font-medium leading-[0.78] tabular-nums text-ink-foreground">
              {String(step + 1).padStart(2, "0")}<span className="text-ink-foreground/25">/{String(STEPS.length).padStart(2, "0")}</span>
            </div>
            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.4em] text-ink-foreground/50">{current.label}</p>
          </div>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <figure className="relative m-0 overflow-hidden rounded-2xl border border-ink-foreground/15 bg-ink-foreground/[0.04] shadow-elevated">
              <figcaption className="flex items-center justify-between gap-4 border-b border-ink-foreground/12 px-5 py-5 sm:px-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink-foreground/50">Takbyte — visuell arbetsgång</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] tabular-nums text-ink-foreground/35">RT / 0{step + 1}</span>
              </figcaption>

              <div className="relative aspect-[3/2] overflow-hidden bg-ink">
                {STEPS.map((item, index) => (
                  <motion.img
                    key={item.id}
                    src={item.image}
                    alt={item.alt}
                    width={1536}
                    height={1024}
                    loading={index === 0 ? "eager" : "lazy"}
                    aria-hidden={index === step ? undefined : true}
                    initial={false}
                    animate={{ opacity: index <= step ? 1 : 0 }}
                    transition={{ duration: reduce ? 0.12 : 1.1, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ zIndex: index }}
                  />
                ))}
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-ink/85 via-transparent to-ink/15" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-6 sm:p-9">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.4em] text-ink-foreground/55">Steg {String(step + 1).padStart(2, "0")}</p>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.h3
                      key={current.title}
                      initial={reduce ? undefined : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="max-w-2xl font-display text-3xl font-medium sm:text-5xl"
                    >
                      {current.title}
                    </motion.h3>
                  </AnimatePresence>
                </div>
              </div>

              <div className="border-t border-ink-foreground/12 px-5 py-7 sm:px-8">
                <div className="h-px overflow-hidden bg-ink-foreground/15">
                  <motion.div className="h-full bg-ink-foreground" animate={{ width: `${progress}%` }} transition={{ duration: 0.6 }} />
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="button" aria-label="Föregående steg" onClick={() => goTo(step - 1)} disabled={step === 0} className="inline-flex min-h-12 items-center gap-3 rounded-full border border-ink-foreground/20 px-6 text-sm font-medium transition-colors hover:bg-ink-foreground hover:text-ink disabled:pointer-events-none disabled:opacity-30">
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Föregående
                  </button>
                  <button type="button" onClick={() => goTo(step + 1)} disabled={step === STEPS.length - 1} className="inline-flex min-h-12 items-center gap-3 rounded-full bg-ink-foreground px-6 text-sm font-medium text-ink transition-opacity hover:opacity-85 disabled:pointer-events-none disabled:opacity-30">
                    Nästa steg <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => step === STEPS.length - 1 ? restart() : setPlaying((value) => !value)} className="inline-flex min-h-12 items-center gap-3 rounded-full border border-ink-foreground/20 px-6 text-sm font-medium transition-colors hover:bg-ink-foreground hover:text-ink">
                    {step === STEPS.length - 1 ? <><RotateCcw className="h-4 w-4" /> Spela om</> : playing ? <><Pause className="h-4 w-4" /> Pausa</> : <><Play className="h-4 w-4" /> Spela</>}
                  </button>
                </div>
              </div>
            </figure>
          </div>

          <div className="lg:col-span-4">
            <ol className="border-t border-ink-foreground/15">
              {STEPS.map((item, index) => {
                const selected = index === step;
                return (
                  <li key={item.id} className="border-b border-ink-foreground/15">
                    <button type="button" onClick={() => goTo(index)} aria-current={selected ? "step" : undefined} className="group relative w-full py-5 text-left">
                      {selected && <motion.span layoutId="step-line" className="absolute inset-y-0 left-0 w-0.5 bg-ink-foreground" />}
                      <div className="flex items-baseline gap-4 pl-5">
                        <span className={`text-[10px] font-bold tabular-nums tracking-[0.3em] ${selected ? "text-ink-foreground" : "text-ink-foreground/35"}`}>{String(index + 1).padStart(2, "0")}</span>
                        <span className={`font-display text-lg font-medium sm:text-xl ${selected ? "text-ink-foreground" : "text-ink-foreground/55 group-hover:text-ink-foreground"}`}>{item.title}</span>
                      </div>
                      <AnimatePresence initial={false}>
                        {selected && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <p className="pl-14 pr-3 pt-4 text-base font-light leading-relaxed text-ink-foreground/70">{item.body}</p>
                            <p className="pl-14 pr-3 pt-3 text-sm leading-relaxed text-ink-foreground/45">{item.detail}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="mt-10 flex flex-col gap-3">
              <a href="#offert" className="inline-flex items-center justify-center gap-3 rounded-full bg-primary px-9 py-4 font-medium text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95 animate-subtle-pulse">Räkna på ditt takbyte <ArrowRight className="h-4 w-4" /></a>
              <a href="tel:0701543639" className="inline-flex items-center justify-center gap-3 rounded-full border border-ink-foreground/20 px-9 py-4 font-medium text-ink-foreground transition-colors hover:bg-ink-foreground hover:text-ink"><Phone className="h-4 w-4" />070-154 36 39</a>
            </div>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "HowTo", name: "Så går ett takbyte till – steg för steg", description: "RoslagsTaks arbetsgång vid takbyte: råspont, underlagspapp, hängrännor, vindskivor, läkt, takpannor och plåtbeslag.", step: STEPS.map((item, index) => ({ "@type": "HowToStep", position: index + 1, name: item.title, text: `${item.body} ${item.detail}` })) }) }} />
    </section>
  );
};

export default RoofBuildAnimation;