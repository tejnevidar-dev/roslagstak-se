/**
 * Bokning av kostnadsfri takkontroll: öppettider, SLA-text och feature-flagg.
 * Öppettider (CRM/Vidars beslut, sprint-offensiv-2026-09-28): mån–fre 07–20, lör–sön 09–19.
 * Tiderna avläses i besökarens lokala tid (sajten riktar sig bara till Sverige).
 */

/** Av som standard tills designen är visad för och godkänd av Vidar. Slå på i en egen commit. */
export const BOOKING_ENABLED = false;

const OPEN: Record<number, [number, number]> = {
  0: [9, 19], // söndag
  1: [7, 20],
  2: [7, 20],
  3: [7, 20],
  4: [7, 20],
  5: [7, 20],
  6: [9, 19], // lördag
};

export const isWithinOpeningHours = (now: Date = new Date()): boolean => {
  const [open, close] = OPEN[now.getDay()];
  const h = now.getHours() + now.getMinutes() / 60;
  return h >= open && h < close;
};

const weekday = new Intl.DateTimeFormat("sv-SE", { weekday: "long" });
const pad = (n: number) => String(n).padStart(2, "0");

/** Nästa tidpunkt sajten är öppen, för texten när "ring mig inom 1 h" inte kan visas. */
export const nextOpening = (now: Date = new Date()): Date => {
  for (let add = 0; add < 8; add++) {
    const d = new Date(now);
    d.setDate(d.getDate() + add);
    const [open] = OPEN[d.getDay()];
    d.setHours(open, 0, 0, 0);
    if (d.getTime() > now.getTime()) return d;
  }
  return now;
};

const isSameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();

export const nextOpeningLabel = (now: Date = new Date()): string => {
  const next = nextOpening(now);
  const time = `${pad(next.getHours())}:${pad(next.getMinutes())}`;
  if (isSameDay(next, now)) return `kl ${time} idag`;
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (isSameDay(next, tomorrow)) return `kl ${time} imorgon`;
  return `kl ${time} på ${weekday.format(next)}`;
};

/**
 * Text att visa på tackskärmen direkt efter att formuläret skickats in (vi skickar inget
 * mail/sms från CRM). Vi lovar bara svar inom 24 h (beslut.md) — inget kortare tidslöfte
 * här förrän Vidar beslutat om bemanning/tider för det.
 */
export const confirmationText = (kind: "ring_mig" | "boka", now: Date = new Date()): string => {
  if (isWithinOpeningHours(now)) {
    return kind === "ring_mig"
      ? "Vi ringer dig så snart som möjligt, från 070-154 36 39."
      : "Vi hör av oss för att bekräfta tiden, från 070-154 36 39.";
  }
  return `Vi hör av oss ${nextOpeningLabel(now)}, från 070-154 36 39.`;
};
