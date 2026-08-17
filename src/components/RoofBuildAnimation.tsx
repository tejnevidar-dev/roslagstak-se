import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, ArrowRight, ArrowLeft, Phone } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

/* ---------------------------------------------------------------- geometry */

const APEX_X = 450;
const APEX_Y = 118;
const EAVE_Y = 322;
const LEFT_X = 108;
const RIGHT_X = 792;

/** Roof triangle offset outwards by `o` px (thickness of the build-up). */
const roofPoly = (o: number) =>
  `${APEX_X},${APEX_Y - o * 1.35} ${LEFT_X - o * 0.9},${EAVE_Y - o} ${RIGHT_X + o * 0.9},${EAVE_Y - o}`;

/** Horizontal line inside the triangle at a given height ratio (0 = eave, 1 = apex). */
const rowAt = (t: number, o: number) => {
  const y = EAVE_Y - o - t * (EAVE_Y - APEX_Y - o * 0.35);
  const halfBase = (RIGHT_X - LEFT_X) / 2 + o * 0.9;
  const half = halfBase * (1 - t);
  return { y, x1: APEX_X - half, x2: APEX_X + half };
};

const plankRows = [0.08, 0.2, 0.32, 0.44, 0.56, 0.68, 0.8, 0.9];
const battenRows = [0.06, 0.19, 0.32, 0.45, 0.58, 0.71, 0.84];
const tileRows = [0.04, 0.17, 0.3, 0.43, 0.56, 0.69, 0.82, 0.93];

/* ------------------------------------------------------------------- steps */

interface Step {
  id: string;
  label: string;
  title: string;
  body: string;
  detail: string;
}

const STEPS: Step[] = [
  {
    id: "raspont",
    label: "Råspont",
    title: "1. Råspont & underlagstak",
    body: "Vi river det gamla taket, kontrollerar takstolarna och lägger ny råspont där virket är skadat.",
    detail: "Kontroll av bärande konstruktion, ventilerad luftspalt och fukttäta anslutningar.",
  },
  {
    id: "papp",
    label: "Underlagspapp",
    title: "2. Underlagspapp",
    body: "Papp eller underlagsduk spikas i förband över hela ytan — det är taket som håller vattnet ute.",
    detail: "Överlapp enligt tillverkarens anvisning, extra tätning vid genomföringar.",
  },
  {
    id: "rannor",
    label: "Hängrännor",
    title: "3. Fotplåt & hängrännor",
    body: "Fotplåt, rännkrokar och hängrännor monteras så att vattnet leds bort från fasad och grund.",
    detail: "Rätt fall mot stuprör, dimensionerat för skärgårdens slagregn.",
  },
  {
    id: "vindskivor",
    label: "Vindskivor",
    title: "4. Vindskivor & gavelbeslag",
    body: "Nya vindskivor och gavelbeslag skyddar takets kanter mot vind, regn och röta.",
    detail: "Grundmålat virke eller underhållsfri plåt — du väljer.",
  },
  {
    id: "lakt",
    label: "Läkt",
    title: "5. Ströläkt & bärläkt",
    body: "Ströläkt ger luftspalten, bärläkten sätts på exakt centrumavstånd för din pannmodell.",
    detail: "Millimeterinmätning så att sista raden hamnar rätt vid nock.",
  },
  {
    id: "pannor",
    label: "Takpannor",
    title: "6. Takpannor eller plåt",
    body: "Betongpannor, tegel eller falsad plåt läggs, klipps och stormsäkras rad för rad.",
    detail: "Stormklammer i utsatta lägen — standard på öar och kustnära tak.",
  },
  {
    id: "beslag",
    label: "Plåtbeslag",
    title: "7. Nockpannor & plåtbeslag",
    body: "Nock, valmar, skorstensbeslag och genomföringar tätas — sedan städning och slutbesiktning.",
    detail: "Du får dokumentation, garantibevis och en genomgång på plats.",
  },
];

/* ------------------------------------------------------------------ layers */

const layerTransition = {
  type: "spring" as const,
  stiffness: 90,
  damping: 14,
  mass: 0.7,
};

const flyIn = (from: { x?: number; y?: number }) => ({
  hidden: { opacity: 0, x: from.x ?? 0, y: from.y ?? -90, scale: 0.97 },
  visible: { opacity: 1, x: 0, y: 0, scale: 1, transition: layerTransition },
});

interface LayerProps {
  active: boolean;
  from: { x?: number; y?: number };
  children: React.ReactNode;
  reduce: boolean;
}

const Layer = ({ active, from, children, reduce }: LayerProps) => (
  <motion.g
    variants={reduce ? undefined : flyIn(from)}
    initial={reduce ? undefined : "hidden"}
    animate={active ? "visible" : "hidden"}
    style={{ opacity: reduce ? (active ? 1 : 0) : undefined }}
  >
    {children}
  </motion.g>
);

/* --------------------------------------------------------------- component */

const RoofBuildAnimation = () => {
  const reduce = !!useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const started = useRef(false);

  // Starta när sektionen kommer i vy (robust IntersectionObserver).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Autostart once the section is on screen.
  useEffect(() => {
    if (inView && !started.current) {
      started.current = true;
      setStep(0);
      setPlaying(!reduce);
    }
  }, [inView, reduce]);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => {
      setStep((s) => {
        if (s >= STEPS.length - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, 2600);
    return () => window.clearTimeout(id);
  }, [playing, step]);

  const restart = useCallback(() => {
    setStep(0);
    setPlaying(true);
  }, []);

  const current = step < 0 ? 0 : step;
  const active = (i: number) => step >= i;
  const progress = ((current + 1) / STEPS.length) * 100;
  const goto = (i: number) => {
    setPlaying(false);
    setStep(Math.max(0, Math.min(STEPS.length - 1, i)));
  };

  return (
    <section
      id="hur-det-gar-till"
      aria-label="Så går ett takbyte till"
      className="relative overflow-hidden bg-ink text-ink-foreground py-28 lg:py-44"
    >
      {/* hairline drafting grid — technical, entreprenad */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--ink-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--ink-foreground)) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/15 to-transparent"
      />

      <div ref={sectionRef} className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-16 lg:mb-24 pb-10 border-b border-ink-foreground/15">
          <div className="lg:col-span-8">
            <SectionHeading
              meta="Metodik"
              index="02 / 04"
              tone="dark"
              title={
                <>
                  Sju lager mellan dig och{" "}
                  <em className="font-normal italic text-ink-foreground/55">skärgårdens väder</em>
                </>
              }
              intro="Följ ett komplett takbyte lager för lager — från bar råspont till färdiga plåtbeslag. Samma ordning på varje projekt, varje gång."
            />
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <div className="font-display text-[clamp(4rem,11vw,9rem)] font-medium leading-[0.78] tracking-[-0.06em] tabular-nums text-ink-foreground">
              {String(current + 1).padStart(2, "0")}
              <span className="text-ink-foreground/25">/{String(STEPS.length).padStart(2, "0")}</span>
            </div>
            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.4em] text-ink-foreground/50">
              {STEPS[current].label}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* ---------------------------------------------------- animation */}
          <div className="lg:col-span-7">
            <figure className="relative m-0 overflow-hidden rounded-2xl border border-ink-foreground/12 bg-ink-foreground/[0.04]">
              {/* ritningshuvud — entreprenadkänsla */}
              <figcaption className="flex items-center justify-between gap-4 px-5 sm:px-8 py-5 border-b border-ink-foreground/12">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink-foreground/50">
                  Takuppbyggnad — sektion A–A
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] tabular-nums text-ink-foreground/35">
                  RT-01
                </span>
              </figcaption>
              <div className="px-3 py-6 sm:px-8 sm:py-10">
              <svg
                viewBox="0 0 900 540"
                className="w-full h-auto"
                role="img"
                aria-label={`Illustration av takets uppbyggnad, steg ${current + 1} av ${STEPS.length}: ${STEPS[current].label}`}
              >
                <defs>
                  <clipPath id="roofClip">
                    <polygon points={roofPoly(0)} />
                  </clipPath>
                  <clipPath id="battenClip">
                    <polygon points={roofPoly(10)} />
                  </clipPath>
                  <clipPath id="tileClip">
                    <polygon points={roofPoly(18)} />
                  </clipPath>
                  <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D8A972" />
                    <stop offset="100%" stopColor="#B07B44" />
                  </linearGradient>
                  <linearGradient id="felt" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#33383F" />
                    <stop offset="55%" stopColor="#22262C" />
                    <stop offset="100%" stopColor="#2C3138" />
                  </linearGradient>
                  <linearGradient id="tile" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4A5260" />
                    <stop offset="100%" stopColor="#2E3542" />
                  </linearGradient>
                  <linearGradient id="metal" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#E7ECF4" />
                    <stop offset="45%" stopColor="#B9C4D4" />
                    <stop offset="100%" stopColor="#DDE4EE" />
                  </linearGradient>
                </defs>

                {/* ground shadow */}
                <ellipse cx="450" cy="512" rx="330" ry="16" fill="#000" opacity="0.45" />

                {/* house body */}
                <g>
                  <rect x="128" y="320" width="644" height="182" rx="6" fill="#FFFFFF" opacity="0.07" />
                  <rect x="128" y="320" width="644" height="182" rx="6" fill="none" stroke="#FFFFFF" strokeOpacity="0.2" />
                  <rect x="214" y="366" width="86" height="98" rx="4" fill="#FFFFFF" opacity="0.14" />
                  <rect x="600" y="366" width="86" height="98" rx="4" fill="#FFFFFF" opacity="0.14" />
                  <rect x="410" y="392" width="80" height="110" rx="4" fill="#FFFFFF" opacity="0.22" />
                  {/* rafters visible before boarding */}
                  <polygon points={roofPoly(0)} fill="#FFFFFF" opacity="0.06" />
                  {plankRows.map((t) => {
                    const r = rowAt(t, 0);
                    return (
                      <line
                        key={`rafter-${t}`}
                        x1={r.x1}
                        y1={r.y}
                        x2={r.x2}
                        y2={r.y}
                        stroke="#FFFFFF"
                        strokeOpacity="0.22"
                        strokeWidth="2"
                      />
                    );
                  })}
                </g>

                {/* 1 — råspont */}
                <Layer active={active(0)} from={{ y: -70 }} reduce={reduce}>
                  <polygon points={roofPoly(0)} fill="url(#wood)" />
                  <g clipPath="url(#roofClip)">
                    {plankRows.map((t) => {
                      const r = rowAt(t, 0);
                      return (
                        <line
                          key={`plank-${t}`}
                          x1={r.x1}
                          y1={r.y}
                          x2={r.x2}
                          y2={r.y}
                          stroke="#8A5A28"
                          strokeOpacity="0.35"
                          strokeWidth="2.5"
                        />
                      );
                    })}
                  </g>
                  <polygon points={roofPoly(0)} fill="none" stroke="#7A4E22" strokeOpacity="0.5" strokeWidth="2" />
                </Layer>

                {/* 2 — underlagspapp */}
                <Layer active={active(1)} from={{ y: -110 }} reduce={reduce}>
                  <polygon points={roofPoly(5)} fill="url(#felt)" />
                  <g clipPath="url(#battenClip)">
                    {[0.14, 0.36, 0.58, 0.78].map((t) => {
                      const r = rowAt(t, 5);
                      return (
                        <line
                          key={`felt-${t}`}
                          x1={r.x1}
                          y1={r.y}
                          x2={r.x2}
                          y2={r.y}
                          stroke="#FFFFFF"
                          strokeOpacity="0.1"
                          strokeWidth="3"
                        />
                      );
                    })}
                  </g>
                </Layer>

                {/* 3 — fotplåt & hängrännor */}
                <Layer active={active(2)} from={{ x: -140, y: 40 }} reduce={reduce}>
                  <rect x="96" y="316" width="708" height="13" rx="6" fill="url(#metal)" />
                  <rect x="96" y="329" width="708" height="6" rx="3" fill="#8E9AAC" />
                  <rect x="112" y="335" width="16" height="168" rx="6" fill="url(#metal)" />
                  <rect x="772" y="335" width="16" height="168" rx="6" fill="url(#metal)" />
                </Layer>

                {/* 5 — läkt */}
                <Layer active={active(4)} from={{ x: 150, y: -60 }} reduce={reduce}>
                  <g clipPath="url(#battenClip)">
                    {battenRows.map((t) => {
                      const r = rowAt(t, 9);
                      return (
                        <rect
                          key={`batten-${t}`}
                          x={r.x1}
                          y={r.y - 5}
                          width={r.x2 - r.x1}
                          height="9"
                          rx="2"
                          fill="#C9A06A"
                        />
                      );
                    })}
                  </g>
                </Layer>

                {/* 6 — takpannor */}
                <Layer active={active(5)} from={{ y: -170 }} reduce={reduce}>
                  <g clipPath="url(#tileClip)">
                    <polygon points={roofPoly(16)} fill="url(#tile)" />
                    {tileRows.map((t, ri) => {
                      const r = rowAt(t, 16);
                      const width = r.x2 - r.x1 + 40;
                      const count = Math.max(4, Math.round(width / 46));
                      const w = width / count;
                      const x0 = r.x1 - 20;
                      return (
                        <g key={`tilerow-${t}`}>
                          <rect x={x0} y={r.y - 24} width={width} height="28" fill="url(#tile)" />
                          {Array.from({ length: count }).map((_, i) => (
                            <line
                              key={i}
                              x1={x0 + i * w + (ri % 2 ? w / 2 : 0)}
                              y1={r.y - 24}
                              x2={x0 + i * w + (ri % 2 ? w / 2 : 0)}
                              y2={r.y + 4}
                              stroke="#0B1030"
                              strokeOpacity="0.45"
                              strokeWidth="2"
                            />
                          ))}
                          <line x1={x0} y1={r.y + 3} x2={x0 + width} y2={r.y + 3} stroke="#0B1030" strokeOpacity="0.4" strokeWidth="3" />
                        </g>
                      );
                    })}
                  </g>
                </Layer>

                {/* 4 — vindskivor (ritas ovanpå pannorna, syns som takets kanter) */}
                <Layer active={active(3)} from={{ y: -140 }} reduce={reduce}>
                  <line x1={APEX_X} y1={APEX_Y - 26} x2={LEFT_X - 22} y2={EAVE_Y - 14} stroke="#F7F9FC" strokeWidth="14" strokeLinecap="round" />
                  <line x1={APEX_X} y1={APEX_Y - 26} x2={RIGHT_X + 22} y2={EAVE_Y - 14} stroke="#F7F9FC" strokeWidth="14" strokeLinecap="round" />
                  <line x1={APEX_X} y1={APEX_Y - 26} x2={LEFT_X - 22} y2={EAVE_Y - 14} stroke="#0B1030" strokeOpacity="0.1" strokeWidth="2" />
                  <line x1={APEX_X} y1={APEX_Y - 26} x2={RIGHT_X + 22} y2={EAVE_Y - 14} stroke="#0B1030" strokeOpacity="0.1" strokeWidth="2" />
                </Layer>

                {/* 7 — nock & plåtbeslag + skorsten */}
                <Layer active={active(6)} from={{ y: -200 }} reduce={reduce}>
                  <rect x="352" y={APEX_Y - 24} width="196" height="16" rx="8" fill="url(#metal)" />
                  <rect x="352" y={APEX_Y - 11} width="196" height="4" rx="2" fill="#8E9AAC" opacity="0.7" />
                  <g>
                    <rect x="566" y="126" width="52" height="82" rx="4" fill="#E9EDF4" />
                    <rect x="558" y="118" width="68" height="13" rx="5" fill="url(#metal)" />
                    <polygon points="556,196 630,196 638,212 550,212" fill="url(#metal)" />
                  </g>
                </Layer>
              </svg>
              </div>

              {/* tydliga, stora kontroller — enkla att använda */}
              <div className="border-t border-ink-foreground/12 px-5 sm:px-8 py-7">
                <div className="h-px bg-ink-foreground/15 overflow-hidden">
                  <motion.div
                    className="h-full bg-ink-foreground"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.4em] text-ink-foreground/50">
                  Steg {String(current + 1).padStart(2, "0")} — {STEPS[current].label}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => goto(current - 1)}
                    disabled={current === 0}
                    className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-ink-foreground/20 text-sm font-medium transition-colors hover:bg-ink-foreground hover:text-accent disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    Föregående
                  </button>
                  <button
                    type="button"
                    onClick={() => goto(current + 1)}
                    disabled={current >= STEPS.length - 1}
                    className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-ink-foreground text-ink text-sm font-medium transition-opacity hover:opacity-85 disabled:opacity-30 disabled:pointer-events-none"
                  >
                    Nästa steg
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => (step >= STEPS.length - 1 ? restart() : setPlaying((p) => !p))}
                    className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-ink-foreground/20 text-sm font-medium transition-colors hover:bg-ink-foreground hover:text-ink"
                  >
                    {step >= STEPS.length - 1 ? (
                      <>
                        <RotateCcw className="w-4 h-4" aria-hidden="true" />
                        Spela om
                      </>
                    ) : playing ? (
                      <>
                        <Pause className="w-4 h-4" aria-hidden="true" />
                        Pausa
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" aria-hidden="true" />
                        Spela
                      </>
                    )}
                  </button>
                </div>
              </div>
            </figure>
          </div>

          {/* ------------------------------------------------------- stepper */}
          <div className="lg:col-span-5">
            <ol className="border-t border-ink-foreground/15">
              {STEPS.map((s, i) => {
                const isCurrent = i === current;
                return (
                  <li
                    key={s.id}
                    className={`border-b border-ink-foreground/15 transition-colors ${
                      isCurrent ? "bg-ink-foreground/[0.06]" : "hover:bg-ink-foreground/[0.03]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setPlaying(false);
                        setStep(i);
                      }}
                      aria-current={isCurrent ? "step" : undefined}
                      className="relative w-full text-left px-1 py-6 transition-colors group"
                    >
                      {isCurrent && (
                        <motion.span
                          layoutId="stepIndicator"
                          className="absolute left-0 top-0 bottom-0 w-[2px] bg-ink-foreground"
                          aria-hidden="true"
                        />
                      )}
                      <div className="flex items-baseline gap-5 pl-5">
                        <span
                          className={`text-[10px] font-bold tabular-nums tracking-[0.3em] transition-colors ${
                            step >= i ? "text-ink-foreground/70" : "text-ink-foreground/30"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`font-display text-xl sm:text-2xl font-medium tracking-[-0.03em] transition-colors ${
                            isCurrent
                              ? "text-ink-foreground"
                              : "text-ink-foreground/55 group-hover:text-ink-foreground"
                          }`}
                        >
                          {s.title.replace(/^\d+\.\s*/, "")}
                        </span>
                      </div>
                      <AnimatePresence initial={false}>
                        {isCurrent && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <p className="pt-4 pl-14 pr-4 text-base sm:text-lg font-light leading-relaxed text-ink-foreground/70">
                              {s.body}
                            </p>
                            <p className="pt-3 pl-14 pr-4 text-sm leading-relaxed text-ink-foreground/45">
                              {s.detail}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="#offert"
                className="inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-primary text-primary-foreground font-medium transition-transform hover:scale-[1.02] active:scale-95 animate-subtle-pulse"
              >
                Räkna på ditt takbyte
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:0701543639"
                className="inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full border border-ink-foreground/20 text-ink-foreground font-medium transition-colors hover:bg-ink-foreground hover:text-ink"
              >
                <Phone className="w-4 h-4" />
                070-154 36 39
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* HowTo schema for the build process */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Så går ett takbyte till – steg för steg",
            description:
              "RoslagsTaks arbetsgång vid takbyte: råspont, underlagspapp, hängrännor, vindskivor, läkt, takpannor och plåtbeslag.",
            step: STEPS.map((s, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: s.title.replace(/^\d+\.\s*/, ""),
              text: `${s.body} ${s.detail}`,
            })),
          }),
        }}
      />
    </section>
  );
};

export default RoofBuildAnimation;
