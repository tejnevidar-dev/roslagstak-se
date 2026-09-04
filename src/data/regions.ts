/** Regionindelning som används av områdeshubben och ServiceArea-sektionen. */

export const regionOrder = [
  "Norra skärgården",
  "Mellersta skärgården",
  "Kusten",
  "Rådmansöhalvön",
  "Norra Roslagen",
  "Roslagens inland",
  "Österåker",
  "Stockholms stad",
  "Norra Stockholm",
  "Nordvästra Stockholm",
  "Västerort",
  "Östra Stockholm",
  "Sydöstra Stockholm",
  "Södra Stockholm",
  "Sydvästra Stockholm",
] as const;

export const regionIntros: Record<string, string> = {
  "Norra skärgården":
    "Takbyte och takrenovering i ytterskärgården. Vi tar oss ut till öar dit andra inte når — med material, verktyg och erfarenhet.",
  "Mellersta skärgården":
    "Takläggare med lång erfarenhet av takprojekt på öar i mellersta Roslagen. Från sommarstugor till permanentboenden.",
  Kusten:
    "Takomläggning, takrenovering och plåtarbeten längs hela Roslagens kustlinje och på fastlandet runt Norrtälje.",
  "Norra Roslagen":
    "Takbyte, plåttak och takrenovering i Hallstavik, Älmsta, Herräng och norra Roslagen — material valt för hårt kustklimat.",
  Rådmansöhalvön:
    "Bandtäckning, plåttak och takbyte i Gräddö och Kapellskär, där vind och saltluft ställer högsta krav på infästningar.",
  "Roslagens inland":
    "Takomläggning och takbyte i Rimbo, Edsbro, Riala, Vallentuna och Täby — snölast, ventilation och taksäkerhet enligt gällande krav.",
  Österåker:
    "Takbyte, takomläggning och bandtäckning i Åkersberga och Österskär — från 70-talsvillor till komplexa tak med kupor och torn.",
  "Stockholms stad":
    "Takarbeten på kulturhistoriska tak och bostadsrättsfastigheter i innerstadens tätbebyggda kvarter.",
  "Norra Stockholm":
    "Takbyte, takrenovering och plåtarbeten i norra Stockholms villabälte och bostadsrättsområden.",
  "Nordvästra Stockholm":
    "Från miljonprogramstak till villatak och kulturhistorisk bebyggelse i Sigtuna, Järfälla och Upplands-Bro.",
  Västerort:
    "Takbyte och takrenovering i västra Stockholms trädgårdsstäder och villaområden.",
  "Östra Stockholm":
    "Ö- och skärgårdskommuner öster om staden, där fukt och vind styr val av takmaterial.",
  "Sydöstra Stockholm":
    "Takbyte och takrenovering i sydöstra Stockholms kust- och skärgårdsområden.",
  "Södra Stockholm":
    "Villor, radhus och bostadsrättsfastigheter i södra Stockholm — plåt, tegel och betongpannor.",
  "Sydvästra Stockholm":
    "Sjönära villatak och kommunala takprojekt sydväst om Stockholm.",
};
