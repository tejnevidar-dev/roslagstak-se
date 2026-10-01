/**
 * Riktiga recensioner från RoslagsTaks Google-företagsprofil (idag: betyg 5,0, 2 omdömen).
 *
 * ORDAGRANNA. Aldrig omskrivna, sammanfattade eller förkortade — klistra in exakt den text,
 * det namn och det datum som visas på Google. Ingen recension får läggas till här utan att
 * den faktiskt finns på profilen (regel 5: aldrig påhittade recensioner).
 *
 * Juristens O5 (rapportmall-recensionskit-granskning.md): visa ALLA omdömen som finns på
 * Google, eller ett neutralt urval (de senaste) — aldrig bara ett urval av de bästa. Lägg
 * till nya recensioner i den ordning de kommer på Google, strunta i betyget.
 *
 * Tom lista = inga recensioner inklistrade ännu. GoogleReviews-komponenten visar då bara
 * länken till Google-profilen (som idag) — den hittar aldrig på recensioner för att fylla listan.
 */
export interface GoogleReview {
  /** Exakt som det står på Google — inget efternamn läggs till om Google bara visar förnamn. */
  author: string;
  /** 1–5, exakt betyg från recensionen. */
  rating: number;
  /** Exakt som Google visar det, t.ex. "för 2 månader sedan" eller ett datum om Google visar ett. */
  date: string;
  /** Ordagrann text, ingen omskrivning. */
  text: string;
}

export const googleReviews: GoogleReview[] = [];
