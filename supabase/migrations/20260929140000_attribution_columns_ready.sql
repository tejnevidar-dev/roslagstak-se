-- KLAR ATT KÖRA. Motsvarar 20260929140000_attribution_columns_prepared.sql (samma innehåll,
-- bara okommenterat) — den filen ändras inte, den är kvar som granskningsunderlag/historik.
-- Kör i SQL-editorn för webbsidans Supabase-projekt. Görs av Vidar/IT-stöd, inte av en agent.
--
-- Driftchefens beslut 2026-09-29: VAL B — egna kolumner i quote_requests, egna JSON-fält i
-- webhook-payloaden till CRM (inte text i message).
--
-- ORDNING (Driftchefens villkor 2026-09-29, alla tre måste vara uppfyllda INNAN denna körs):
--   1. 20260928120000_booking_webhook_ready.sql är redan körd (skapar notify_booking_webhook
--      första gången, utan attributionsfälten — de läggs till här i STEG 3).
--   2. CRM:s egen migration + deploy (deras punkt 4b, samma dag) är redan klar, så CRM redan
--      tar emot landing_path/referrer_category/utm_* innan sajten börjar skicka dem.
--   3. STEG 0 nedan är körd och jämförd av Vidar/Driftchefen (inte av en agent — ingen agent
--      har läsåtkomst till produktionsdatabasen).

-- ============================================================================
-- STEG 0 — VERIFIERA FÖRE KÖRNING
-- ============================================================================
-- Kör dessa två rader och jämför resultatet mot funktionskropparna i STEG 2/3 nedan. Båda
-- funktionerna har ändrats flera gånger (triggerfix, bokningsuteslutning) sedan de skrevs
-- ursprungligen — om produktionsversionen skiljer sig från det STEG 2/3 förväntar sig,
-- STOPPA och fråga Agent – Hemsida & SEO att basera om migrationen, annars skrivs en nyare
-- ändring över utan att någon märker det.
--
--   select pg_get_functiondef('public.notify_saljtak_on_new_quote'::regproc);
--   select pg_get_functiondef('public.notify_booking_webhook'::regproc);

-- ============================================================================
-- STEG 1 — Strukturerade attributionskolumner (additiv, påverkar inga befintliga rader).
-- ============================================================================
ALTER TABLE public.quote_requests
  ADD COLUMN IF NOT EXISTS landing_path TEXT,
  ADD COLUMN IF NOT EXISTS referrer_category TEXT,
  ADD COLUMN IF NOT EXISTS utm_source TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
  ADD COLUMN IF NOT EXISTS utm_content TEXT;

-- ============================================================================
-- STEG 2 — Uppdatera leadwebhooken så attributionsfälten skickas som egna JSON-toppnivånycklar
-- till CRM (INTE inbäddat i message — CRM:s uttryckliga krav). Samma funktionskropp som
-- STEG 0 ska ha bekräftat (från 20260928120000), bara de sex nya nycklarna i body är nya.
-- ============================================================================
CREATE OR REPLACE FUNCTION public.notify_saljtak_on_new_quote()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, net
AS $$
DECLARE
  v_url TEXT;
  v_secret TEXT;
BEGIN
  IF NEW.message LIKE 'Bokning kostnadsfri takkontroll%' THEN
    RETURN NEW; -- bokningar går via trg_notify_booking_webhook i stället
  END IF;
  SELECT value INTO v_url FROM public.webhook_config WHERE key = 'saljtak_url';
  SELECT value INTO v_secret FROM public.webhook_config WHERE key = 'saljtak_secret';
  IF v_url IS NULL OR v_secret IS NULL THEN
    RAISE WARNING 'Sälj tak webhook ej konfigurerad - hoppar över';
    RETURN NEW;
  END IF;
  PERFORM net.http_post(
    url := v_url,
    headers := jsonb_build_object('Content-Type', 'application/json', 'X-Webhook-Secret', v_secret),
    body := jsonb_build_object(
      'id', NEW.id::text, 'mode', NEW.mode::text, 'name', NEW.name, 'phone', NEW.phone,
      'email', NEW.email, 'address', NEW.address, 'current_roof', NEW.current_roof,
      'new_roof', NEW.new_roof, 'raspont', NEW.raspont, 'gangbrygga', NEW.gangbrygga,
      'takstege', NEW.takstege, 'avvattning', NEW.avvattning, 'floors', NEW.floors,
      'message', NEW.message, 'created_at', NEW.created_at::text,
      'landing_path', NEW.landing_path, 'referrer_category', NEW.referrer_category,
      'utm_source', NEW.utm_source, 'utm_medium', NEW.utm_medium,
      'utm_campaign', NEW.utm_campaign, 'utm_content', NEW.utm_content
    )
  );
  RETURN NEW;
END;
$$;

-- ============================================================================
-- STEG 3 — Samma sex fält i bokningswebhooken. Denna CREATE OR REPLACE körs EFTER
-- 20260928120000_booking_webhook_ready.sql (som skapar funktionen första gången, utan dessa
-- fält eftersom kolumnerna inte finns än vid den tidpunkten).
-- ============================================================================
CREATE OR REPLACE FUNCTION public.notify_booking_webhook()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, net
AS $$
DECLARE
  v_url TEXT;
  v_secret TEXT;
BEGIN
  IF NEW.message NOT LIKE 'Bokning kostnadsfri takkontroll%' THEN
    RETURN NEW; -- bara riktiga bokningar
  END IF;
  IF NEW.booking_slot IS NULL THEN
    RAISE WARNING 'Bokning utan booking_slot - hoppar över webhook';
    RETURN NEW;
  END IF;
  SELECT value INTO v_url FROM public.webhook_config WHERE key = 'booking_url';
  SELECT value INTO v_secret FROM public.webhook_config WHERE key = 'saljtak_secret';
  IF v_url IS NULL OR v_secret IS NULL THEN
    RAISE WARNING 'Bokningswebhook ej konfigurerad - hoppar över';
    RETURN NEW;
  END IF;
  PERFORM net.http_post(
    url := v_url,
    headers := jsonb_build_object('Content-Type', 'application/json', 'X-Webhook-Secret', v_secret),
    body := jsonb_build_object(
      'id', NEW.id::text, 'name', NEW.name, 'phone', NEW.phone,
      'email', NULLIF(NEW.email, ''), 'municipality', NEW.address,
      'slot', NEW.booking_slot, 'date', NEW.booking_date::text,
      'message', NEW.message, 'created_at', NEW.created_at::text,
      'landing_path', NEW.landing_path, 'referrer_category', NEW.referrer_category,
      'utm_source', NEW.utm_source, 'utm_medium', NEW.utm_medium,
      'utm_campaign', NEW.utm_campaign, 'utm_content', NEW.utm_content
    )
  );
  RETURN NEW;
END;
$$;
-- (Ingen ny DROP/CREATE TRIGGER behövs — triggern pekar redan på funktionsnamnet, och
-- CREATE OR REPLACE FUNCTION byter kroppen utan att röra triggern.)

-- ============================================================================
-- EFTER KÖRNING (görs separat, inte i denna fil):
-- ============================================================================
-- 1. Live-testa ALLA publika formulär (regel 4): /offert, /takkontroll, /brf,
--    /boka-takkontroll, kontaktformuläret på ortssidorna — bekräfta att en rad skapas med
--    rätt landing_path/referrer_category/utm_* och att webhooken postar dem som egna
--    JSON-fält till CRM.
-- 2. Agent – Hemsida & SEO uppdaterar insert()-anropen i Contact.tsx, ContactLanding.tsx,
--    QuoteConfigurator.tsx, BookingWidget.tsx direkt, samt levererar diff #4 för den spärrade
--    LeadForm.tsx (ledning/marknad/leadform-diffar-hemsida.md) — görs EFTER att denna fil är
--    bekräftat körd, inte innan.
