/**
 * Slug och titel för varje problemsida, utan texterna (de ligger i problems.ts, ca 20 KB komprimerat). Delas av
 * ortssidorna, som länkar till tre problemsidor var (G12), så att ortssidornas JavaScript inte drar in hela
 * problembiblioteket. src/test/problem-links.test.ts kräver att listan är identisk med problems.ts.
 */
export const problemIndex: { slug: string; title: string }[] = [
  { slug: "lackage-vid-skorsten", title: "Läckage vid skorstenen" },
  { slug: "trasiga-takpannor", title: "Trasiga eller förskjutna takpannor" },
  { slug: "mossa-pa-taket", title: "Mossa och påväxt på taket" },
  { slug: "rostig-plat", title: "Rostig plåt och rostiga beslag" },
  { slug: "fukt-pa-vinden", title: "Fukt eller mögel på vinden" },
  { slug: "igensatta-hangrannor", title: "Igensatta hängrännor" },
  { slug: "rutten-raspont", title: "Rutten eller skadad råspont" },
  { slug: "kondens-pa-vinden", title: "Kondens på vinden" },
  { slug: "dalig-underlagspapp", title: "Dålig underlagspapp eller undertak" },
  { slug: "istappar-pa-taket", title: "Istappar och isbildning vid takfoten" },
  { slug: "stormskador-pa-taket", title: "Stormskador på taket" },
  { slug: "lackage-vid-takfonster-och-genomforingar", title: "Läckage vid takfönster och genomföringar" },
  { slug: "svackor-i-taket", title: "Svackor eller buktande tak" },
  { slug: "lackande-ranndal", title: "Läckande ränndal" },
  { slug: "ruttna-vindskivor-och-takfot", title: "Ruttna vindskivor eller takfotsbrädor" },
  { slug: "lackande-plattak", title: "Läckande plåttak" },
  { slug: "skadad-takpapp-pa-papptak", title: "Blåsor och sprickor i takpappen" },
  { slug: "losa-nockpannor", title: "Lösa eller spruckna nockpannor" },
  { slug: "porosa-betongpannor", title: "Porösa eller vittrade betongpannor" },
  { slug: "lackage-vid-takkupa", title: "Läckage vid takkupa" },
  { slug: "lackande-hangrannor", title: "Hängrännor som läcker eller har släppt" },
  { slug: "lackage-mellan-tak-och-vagg", title: "Läckage där taket möter en vägg" },
  { slug: "rutten-lakt", title: "Rutten läkt och pannor som glider" },
  { slug: "alger-och-svarta-rander", title: "Svarta ränder och alger på taket" },
  { slug: "fuktflack-i-innertaket", title: "Fuktfläck i innertaket" },
  { slug: "yrsno-pa-vinden", title: "Snö som yr in på vinden" },
  { slug: "is-i-ranndalen", title: "Is i ränndalen" },
];
