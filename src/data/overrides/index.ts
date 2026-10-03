/**
 * Innehållslager för SEO Command Center (S0): överstyrningar av sidmetadata som JSON i src/data/overrides/.
 * Läses vid bygget (React och statisk HTML använder SAMMA funktion, resolveMeta). Tomma filer = exakt samma
 * sajt som utan lagret. Bara relativa importer: modulen paketeras av esbuild utan "@"-alias.
 *
 * Format v1 (överenskommet med Agent – CRM 2026-10-03, ett id PER FÄLT så att titel och beskrivning kan ändras,
 * mätas och återställas var för sig):
 *   meta.json      { version: 1, poster: { "/sokvag": { title?: Falt, description?: Falt } } }
 *                  Falt = { id, text, andrad, orsak }
 *   _avstangd.json { alla: boolean, ider: string[] }   alla = true stänger av ALLA överstyrningar, ider ett fält var
 *   _logg.json     { version: 1, rader: [{ id, path, falt, fore, efter, tid }] }   append-only; fore kan vara null
 * Serialisering: 2 blanksteg, poster sorterade på sökväg, fast fältordning, LF och avslutande radbrytning
 * (serializeMetaFile/serializeLogg/serializeAvstangd). scripts/check-overrides.ts kräver exakt det formatet.
 */
import metaJson from "./meta.json";
import avstangdJson from "./_avstangd.json";

export interface MetaFalt {
  id: string;
  text: string;
  andrad: string;
  orsak: string;
}
export interface MetaPost {
  title?: MetaFalt;
  description?: MetaFalt;
}
export interface MetaFile {
  version: number;
  poster: Record<string, MetaPost>;
}
export interface Avstangd {
  alla: boolean;
  ider: string[];
}
export type FaltNamn = "title" | "description";
export const FALT: FaltNamn[] = ["title", "description"];

export const metaFile = metaJson as MetaFile;
export const avstangd = avstangdJson as Avstangd;

/** Kanonisk sökväg: gemener, utan query/hash och utan avslutande snedstreck ("/" för startsidan). */
export const overridePath = (path: string): string => {
  const p = path.split("#")[0].split("?")[0].toLowerCase().replace(/\/+$/, "");
  return p === "" ? "/" : p;
};

/** Aktiva poster: avstängda fält är bortsorterade, och poster utan aktiva fält försvinner. */
export const activeMetaPosts = (file: MetaFile = metaFile, off: Avstangd = avstangd): Record<string, MetaPost> => {
  if (off.alla) return {};
  const out: Record<string, MetaPost> = {};
  for (const [path, post] of Object.entries(file.poster)) {
    const aktiv: MetaPost = {};
    for (const f of FALT) {
      const falt = post[f];
      if (falt && !off.ider.includes(falt.id)) aktiv[f] = falt;
    }
    if (aktiv.title || aktiv.description) out[overridePath(path)] = aktiv;
  }
  return out;
};

const active = activeMetaPosts();

export interface BaseMeta {
  title: string;
  description: string;
}
export interface ResolvedMeta extends BaseMeta {
  /** Id:n för de fält som är överstyrda (tomt = ingen överstyrning). */
  overrideIds: string[];
  titleOverridden: boolean;
  descriptionOverridden: boolean;
}

/**
 * EN funktion för titel och beskrivning: bas (sidmallens värde) + överstyrning. Titeln är den råa titeln före
 * sajtens beskärning och suffix, så React (SEOHead) och statisk HTML (generate-static-heads) behandlar den lika.
 */
export const resolveMeta = (path: string, base: BaseMeta, posts: Record<string, MetaPost> = active): ResolvedMeta => {
  const post = posts[overridePath(path)];
  return {
    title: post?.title?.text ?? base.title,
    description: post?.description?.text ?? base.description,
    overrideIds: FALT.flatMap((f) => (post?.[f] ? [post[f]!.id] : [])),
    titleOverridden: Boolean(post?.title),
    descriptionOverridden: Boolean(post?.description),
  };
};

/* ---- Serialisering ---- */
const FALT_ORDER = ["id", "text", "andrad", "orsak"] as const;

export const serializeMetaFile = (file: MetaFile): string => {
  const poster: Record<string, Record<string, Record<string, string>>> = {};
  for (const path of Object.keys(file.poster).sort()) {
    const post = file.poster[path];
    const ordered: Record<string, Record<string, string>> = {};
    for (const f of FALT) {
      const falt = post[f] as unknown as Record<string, string> | undefined;
      if (!falt) continue;
      const o: Record<string, string> = {};
      for (const k of FALT_ORDER) if (falt[k] !== undefined) o[k] = falt[k];
      ordered[f] = o;
    }
    poster[path] = ordered;
  }
  return JSON.stringify({ version: file.version, poster }, null, 2) + "\n";
};

export interface LoggRad {
  id: string;
  path: string;
  falt: FaltNamn;
  fore: string | null;
  efter: string;
  tid: string;
}
export interface LoggFile {
  version: number;
  rader: LoggRad[];
}
const LOGG_ORDER = ["id", "path", "falt", "fore", "efter", "tid"] as const;

export const serializeLogg = (logg: LoggFile): string =>
  JSON.stringify(
    {
      version: logg.version,
      rader: logg.rader.map((r) => Object.fromEntries(LOGG_ORDER.map((k) => [k, (r as unknown as Record<string, unknown>)[k]]))),
    },
    null,
    2,
  ) + "\n";

export const serializeAvstangd = (a: Avstangd): string =>
  JSON.stringify({ alla: a.alla, ider: [...a.ider].sort() }, null, 2) + "\n";
