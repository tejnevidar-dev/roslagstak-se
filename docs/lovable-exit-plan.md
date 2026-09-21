# Exit-plan: bort från Lovable Cloud och Lovable-beroenden

Status: **påbörjad.** Kodstädning genomförd, databas/hosting/domän kvarstår.
Senast uppdaterad: 2026-09-08.

Mål (samma resa som CRM:et, `admin.vt6` — se `../crm/docs/lovable-exit-plan.md`):
webbsidan ska köras utan beroende av Lovable Cloud eller Lovables hosting. Eget
Supabase-konto med migrerad data, egen hosting, Lovables GitHub-synk bortkopplad.

Skillnaden mot CRM:et: **betydligt mindre yta.** Ingen AI-gateway, ingen
e-postgateway, ingen Twilio, inga schemalagda jobb, inget `wrangler.jsonc` sedan
tidigare (fritt val av hosting).

---

## 1. Fullständig inventering: vad är Lovable-beroende

### 1.1 Backend / databas
- Supabase-projekt `skadowjpoagaygozpnzy`, hanteras via **Lovable Cloud** — bekräftat
  2026-09-08 genom att lista projekt i användarens eget Supabase-konto
  (org `tejnevidar-dev's Org`, Free Plan): det innehåller bara **ett** projekt
  (`xkyygppcatpkxiyyfeiy`, som är CRM:ets redan migrerade projekt). Webbsidans
  projekt-id finns inte där → inte migrerat än.
- 4 migrationsfiler i `supabase/migrations/` — ren Postgres/RLS, flyttar rakt av till
  ett nytt Supabase-projekt, samma metod som CRM:et använde.
- En Supabase Edge Function: `supabase/functions/gsc-report/index.ts`.

### 1.2 Byggverktyg — KLART 2026-09-08
- `lovable-tagger` (devDependency, `componentTagger()`-pluginet i dev-läge) —
  **borttaget** ur `package.json` och `vite.config.ts`. Inget annat i byggkedjan var
  Lovable-specifikt (ingen `@lovable.dev/vite-*-config` som i CRM:et — den här sidan
  hade redan en handskriven `vite.config.ts`).
- **Kvarstår:** kör `npm install` (eller `bun install` — se anmärkning i §5 om
  blandade lockfiles) lokalt så `package-lock.json`/`bun.lock(b)` uppdateras utan
  paketet. Kunde inte köras härifrån — ingen `npm`/`bun`/`node` tillgänglig i den här
  sessionens miljö.

### 1.3 Google Search Console via `connector-gateway.lovable.dev` — PAUSAD 2026-09-08
- `supabase/functions/gsc-report/index.ts` anropade Lovables gateway för GSC-data
  (Lovable sköter Google-OAuth). **Pausad** på samma sätt som CRM:ets `gsc.server.ts`:
  kastar ett tydligt fel istället för att nå en död Lovable-URL, med en kommentar om
  vilka riktiga Google-endpoints som ska användas när en riktig OAuth2-uppsättning
  finns (`googleapis.com/webmasters/v3/...` och
  `searchconsole.googleapis.com/v1/urlInspection/index:inspect` — samma path-format
  som gatewayen redan använde).
- Måste **redeployas** till Supabase (`supabase functions deploy gsc-report`) för att
  pausningen ska gälla i produktion — filändringen i repot räcker inte själv.

### 1.4 Auth / förhandsvisning — lågrisk, inte städat
- `src/integrations/supabase/previewAuthStorage.ts`: brokerar inloggningssessionen
  till Lovables editor via `postMessage`, men bara på Lovables preview-domäner
  (`lovableproject.com`, `lovable.app` m.fl.). Faller redan tillbaka till vanlig
  `localStorage` på alla andra domäner — **samma fil, samma bedömning som i CRM:et:**
  automatiskt dött/ofarligt så fort sidan hostas någon annanstans, kan städas bort i
  fas 7 för tydlighets skull, inget som blockerar.

### 1.5 Hosting & synk
- Live på `roslagstak-se.lovable.app` (Lovables hosting), med `roslagstak.se` som
  ansluten anpassad domän ovanpå.
- Lovables GitHub-app är kopplad till repot (`tejnevidar-dev/roslagstak-se`) och
  synkar automatiskt vid varje push till `main` — måste kopplas bort.
- Inget CI (`.github/workflows` saknas), ingen `wrangler.jsonc`/`netlify.toml`/
  `vercel.json` — fritt val av ny hosting, **beslutat: Cloudflare Pages** (se §2).

### 1.6 Övrigt — KLART 2026-09-08
- `README.md` nämnde Lovable och länkade till editorn — **skrivet om.**
- `src/pages/AdminLogin.tsx`: hjälptexten "Skapa det via Lovable Cloud → Users" —
  **ändrad** till "Supabase Dashboard → Authentication → Users" (stämmer oavsett vilket
  Supabase-projekt som används, gamla eller nya).

---

## 2. Beslut som styr planen

- **Hosting:** Cloudflare Pages (bekräftat av användaren 2026-09-08). Motivering:
  gratis för en statisk Vite-SPA, samma leverantör som CRM:et redan siktar mot.
- **Google Search Console:** pausad nu, byggs om senare mot en riktig Google Cloud
  OAuth2-uppsättning (samma beslut och samma skäl som CRM:ets `ga4`/`gsc`-pausning).
- **Databasmigrering:** samma metod som CRM:et — Lovable Cloud exponerar varken en
  Postgres connection-sträng eller service-role-nyckeln, så: Lovables SQL editor →
  CSV-export/genererade INSERT-satser → import i det **nya** projektets SQL editor.
  Se `../crm/docs/postgres-migration-plan.md` för den fullständiga, redan beprövade
  metoden (ordning: schema via `supabase db push` mot nya projektet → `auth.users` →
  `auth.identities` → övriga tabeller i beroendeordning → Storage-filer).
- **Supabase-konto:** samma konto/org som CRM:et redan flyttats till
  (`tejnevidar-dev's Org`), som ett **nytt eget projekt** — inte samma projekt som
  CRM:et. Två separata Supabase-projekt, ett per app, håller RLS-policyer och roller
  ostörda av varandra.

## 3. Status per fas

1. ✅ **Repo klonat** från GitHub (`roslagstak-se`) in i det lokala projektet
   (2026-09-08).
2. ✅ **`lovable-tagger` borttaget** ur build-kedjan (2026-09-08) — väntar bara på att
   `npm install` körs lokalt.
3. ✅ **GSC-integrationen pausad** i koden (2026-09-08) — väntar på redeploy till
   Supabase.
4. ✅ **Kosmetisk städning** — README, admin-inloggningens hjälptext (2026-09-08).
5. ✅ **Databas + Storage migrerade, HELT KLART** (2026-09-12): eget Supabase-projekt
   `roslagstak-se` (ref `yrxvkslqfertydvrfymb`, region West EU, samma org som CRM:et).
   Schema (`supabase db push`, alla 4 migrationsfiler), och all data migrerad och
   radantal-verifierad mot källan: `quote_requests` (35), `webhook_config` (2),
   `user_roles` (1), `auth.users` (1), `auth.identities` (1). Metod: genererade
   INSERT-satser via SQL editor (samma teknik som CRM:et, men med en mer generell
   `is_generated = 'NEVER'`-filtrering istället för att hårdkoda kolumnnamn som
   `confirmed_at`/`identities.email` — funkade rakt av utan att träffa några
   generated-column-fel). `auth.users`/`auth.identities` kördes av användaren själv
   (lösenordshashar syntes aldrig i chatten); de tre vanliga tabellerna hämtades och
   applicerades av Claude direkt via Lovables SQL editor (Chrome) + `supabase db query`/
   `db push` mot målprojektet (ingen CSV-fil-omväg behövdes).
   **Viktig upptäckt under migreringen:** `quote_requests` har en
   `AFTER INSERT`-trigger (`trg_notify_saljtak_on_new_quote`) som skickar en webhook
   till säljsystemet vid varje ny rad. Triggern stängdes av
   (`ALTER TABLE ... DISABLE TRIGGER`) under backfillen av de 35 historiska raderna och
   slogs på igen efteråt — annars hade importen skickat 35 falska "ny lead"-webhooks.
   **Ingen Storage-data att migrera** — inga filer/buckets användes av webbsidan utöver
   standardschemat.
6. ✅ **`.env`/`.env.example`/`supabase/config.toml` uppdaterade** (2026-09-12) att
   peka mot det nya projektet (`yrxvkslqfertydvrfymb`, nya `sb_publishable_...`-formatet
   på nyckeln, hämtad via Project Settings → API Keys) istället för Lovable Cloud
   (`skadowjpoagaygozpnzy`). `.env` avstädad från git (`git rm --cached .env` +
   `.gitignore` uppdaterad med `.env` och `supabase/.temp`) — den låg incheckad i ett
   publikt repo innan, se `README.md`-historiken/tidigare chatt-anteckning.
7. ✅ **`bun install` kört** (2026-09-12) — `lovable-tagger` borttagen, 500 paket,
   lockfile uppdaterad. `bun run build:dev` verifierat grönt (exit 0, 1355
   prerendrade sidor genererade, inga fel).
8. ✅ **Cloudflare Pages kopplat och live** (2026-09-12): projekt `roslagstak-se`,
   Cloudflare GitHub App installerad scoped till bara detta repo (least privilege),
   build command `bun run build`, output `dist`, `VITE_SUPABASE_*` satta mot nya
   projektet. Live på `https://roslagstak-se.pages.dev` — verifierat: startsidan och
   `/admin/login` renderar korrekt, inga konsolfel.
   **Riktig bugg hittad och fixad under uppsättningen:** `prebuild`/`predev`-scripten
   körde `tsx ...`, men `tsx` var aldrig ett riktigt beroende i `package.json` — bara
   ett verktyg som råkade finnas globalt i Lovables/utvecklingsmiljön. Detta hade
   **aldrig testats lokalt heller**: `bun run build:dev` (som verifierades tidigare)
   triggar inte `prebuild`-hooken, bara `bun run build` gör det (npm/bun-konventionen
   är att `preX`/`postX` bara kopplas till scriptet som exakt heter `X`). Fixat genom
   att byta `tsx scripts/....ts` → `bun scripts/....ts` överallt (Bun kör TypeScript
   nativt, inget separat tsx-paket behövs), inte genom att lägga till `tsx` som
   beroende (det gav ett annat fel, en trasig Bun/tsx-shim-interaktion — `bun` direkt
   är den enklare, mer robusta lösningen).
   Committat och pushat till `main` (`9d5a5ba`) efter godkännande — samma commit
   innehåller env-cutover, tsx-fixen och all tidigare kodstädning.
9. 🔶 **DNS-cutover pågår** (2026-09-13): hela zonen `roslagstak.se` flyttad till
   Cloudflares DNS (krävdes för att kunna lägga root-domänen som Custom Domain på
   Pages — Cloudflare kräver att zonen ligger hos dem för apex-domäner). Process:
   - Cloudflares automatiska skanning missade 6 poster som Simplys zon faktiskt hade
     (jämfört mot en fullständig manuell genomgång av Simplys DNS-lista): CNAME
     `simplycom1._domainkey`/`simplycom2._domainkey` (Simplys egen DKIM),
     `bounce-zem` (ZeptoMail/Zoho bounce-hantering), samt SRV `_autodiscover._tcp`,
     `_caldavs._tcp`, `_carddavs._tcp` (Zoho-mejlklienters auto-konfiguration/CalDAV/
     CardDAV). Alla 6 tillagda manuellt i Cloudflare och verifierade, DNS-only
     (oproxade) eftersom de är mejl-relaterade, inte webbtrafik.
   - **Medvetet uteslutet:** TXT `10143357._domainkey` (ytterligare en Simply-DKIM-
     nyckel) — värdet är för långt/tvetydigt att transkribera för hand utan risk för
     fel; en felaktig DKIM-nyckel ger bara att den signeringskedjan misslyckas, inte
     att domänen eller huvud-e-posten slutar fungera. Kan läggas till senare genom
     att kopiera värdet direkt Simply → Cloudflare (urklipp, inte avläsning).
     TXT `_lovable.www` (Lovables domänverifiering) — uteslöts avsiktligt, blir
     irrelevant när Lovable kopplas bort.
   - **DNSSEC stängdes av hos Simply** innan namnserverbytet (obligatoriskt —
     annars kan hela domänen sluta svara helt, inte bara e-posten, eftersom det nya
     DNSSEC-nyckelparet på Cloudflare inte matchar de gamla DS-posterna hos
     registraren).
   - **Namnservrar bytta hos Simply**: `ns1/ns2/ns3.simply.com` → Cloudflares
     `lewis.ns.cloudflare.com` + `mariah.ns.cloudflare.com`. Simply bekräftar bytet
     mottaget; Cloudflare visar "Waiting for your registrar to propagate your new
     nameservers" (typiskt 1–2 timmar, kan ta upp till 24 timmar).
   - ✅ **Namnservrar spridda** (2026-09-14, klart inom ett par timmar — snabbare än
     de utlovade 1–2h/24h). `roslagstak.se` som Custom Domain tillagt på Pages-
     projektet, aktiverat och verifierat: sajten svarar på `https://roslagstak.se`
     med giltigt SSL, korrekt titel/innehåll, inga konsolfel på start- eller
     offertsidan. **DNS-cutovern är HELT KLAR.**
   - Kvarstår: ev. `www.roslagstak.se` som alias (inte gjort, inte begärt).
10. ❌ **Koppla bort Lovables GitHub-app**, städa bort `previewAuthStorage.ts` om du
    vill (lågrisk, inte blockerande). `gsc-report`-pausningen måste också redeployas
    (`supabase functions deploy gsc-report`) för att gälla i produktion — funktionen
    är aldrig deployad mot det nya projektet över huvud taget än.

**Nästa konkreta steg:** #9, DNS-cutover av `roslagstak.se` — när användaren är redo
(kort driftavbrott möjligt, så bör göras medvetet, inte i förbigående).
