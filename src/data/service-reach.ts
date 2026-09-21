/** Vår bas: Norrtälje. Används för att välja rätt formulering om avstånd i ortstexterna. */
const BASE = { lat: 59.7586, lng: 18.7014 };

/** Orter inom denna radie (km fågelvägen) beskrivs som nära vår bas. */
const NEAR_BASE_KM = 50;

const toRad = (deg: number) => (deg * Math.PI) / 180;

export const distanceFromBaseKm = (loc: { lat: number; lng: number }) => {
  const dLat = toRad(loc.lat - BASE.lat);
  const dLng = toRad(loc.lng - BASE.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(BASE.lat)) * Math.cos(toRad(loc.lat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export const isNearBase = (loc: { lat: number; lng: number }) => distanceFromBaseKm(loc) <= NEAR_BASE_KM;

/** Väljer text efter avstånd: `near` för orter nära Norrtälje, annars `far`. */
export const byDistance = <T>(loc: { lat: number; lng: number }, near: T, far: T): T =>
  isNearBase(loc) ? near : far;
