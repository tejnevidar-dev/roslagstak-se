/** Vår bas: Norrtälje. Används för att välja rätt formulering om avstånd i ortstexterna. */
const BASE = { lat: 59.7586, lng: 18.7014 };

/** Täby — andra referenspunkten för Storstockholm (annonsort, se locations.ts). */
const TABY = { lat: 59.4439, lng: 18.0686 };

/** Orter inom denna radie (km fågelvägen) beskrivs som nära vår bas. */
const NEAR_BASE_KM = 50;

const toRad = (deg: number) => (deg * Math.PI) / 180;

export const distanceKm = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
};

export const distanceFromBaseKm = (loc: { lat: number; lng: number }) => distanceKm(BASE, loc);
export const distanceFromTabyKm = (loc: { lat: number; lng: number }) => distanceKm(TABY, loc);

export const isNearBase = (loc: { lat: number; lng: number }) => distanceFromBaseKm(loc) <= NEAR_BASE_KM;

/** Väljer text efter avstånd: `near` för orter nära Norrtälje, annars `far`. */
export const byDistance = <T>(loc: { lat: number; lng: number }, near: T, far: T): T =>
  isNearBase(loc) ? near : far;
