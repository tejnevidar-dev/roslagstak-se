-- KLAR ATT KÖRA. Motsvarar 20260928120000_booking_webhook_prepared.sql (samma innehåll, bara
-- okommenterat) — den filen ändras inte, den är kvar som granskningsunderlag/historik.
-- Kör i SQL-editorn för webbsidans Supabase-projekt. Görs av Vidar/IT-stöd, inte av en agent.
--
-- ORDNING (Driftchefens villkor 2026-09-29): kör DENNA fil FÖRST, före
-- 20260929140000_attribution_columns_ready.sql. Den filen bygger vidare på funktionerna som
-- skapas här.

-- ============================================================================
-- STEG 0 — VERIFIERA FÖRE KÖRNING
-- ============================================================================
-- Kör dessa två rader FÖRST och jämför resultatet mot funktionskropparna i STEG 2 nedan.
-- Funktionen notify_saljtak_on_new_quote har ändrats flera gånger (triggerfix m.m.) sedan
-- den skrevs ursprungligen (migration 20260429084646) — om nuvarande produktionsversion
-- skiljer sig från det STEG 2 förväntar sig, STOPPA och fråga Agent – Hemsida & SEO att
-- basera om migrationen innan ni fortsätter, annars skrivs en nyare ändring över.
--
--   select pg_get_functiondef('public.notify_saljtak_on_new_quote'::regproc);
--
-- (notify_booking_webhook finns inte än — den skapas första gången i STEG 3 nedan, så det
-- finns inget att jämföra mot för den ännu.)

-- ============================================================================
-- STEG 1 — Strukturerade kolumner för bokningsdata (additiv, påverkar inga befintliga rader).
-- ============================================================================
ALTER TABLE public.quote_requests
  ADD COLUMN IF NOT EXISTS booking_slot TEXT,   -- 'formiddag' | 'eftermiddag' | 'ring_mig'
  ADD COLUMN IF NOT EXISTS booking_date DATE;   -- null när booking_slot = 'ring_mig'

-- ============================================================================
-- STEG 2 — Uteslut bokningar ur den BEFINTLIGA leadwebhooken (CRM:s fynd 1). Samma
-- funktionskropp som produktionen har idag (om STEG 0 stämmer), bara det nya IF-blocket
-- allra överst är nytt.
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
    RETURN NEW; -- bokningar går via trg_notify_booking_webhook i stället, se nedan
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
      'message', NEW.message, 'created_at', NEW.created_at::text
    )
  );
  RETURN NEW;
END;
$$;

-- ============================================================================
-- STEG 3 — Ny trigger: bara bokningar, till CRM:s dedikerade endpoint, med 'slot'/'date'
-- (CRM:s fynd 2 — slot är obligatoriskt i deras zod-validering). utm läses ur message-raden
-- tills BookingWidget.tsx skickar strukturerade utm-fält direkt (se
-- 20260929140000_attribution_columns_ready.sql, som körs EFTER denna fil och lägger till det).
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
    RAISE WARNING 'Bokning utan booking_slot - hoppar över webhook (uppdatera BookingWidget.tsx enligt steg 3 ovan)';
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
      'message', NEW.message, 'created_at', NEW.created_at::text
      -- 'utm', jsonb_build_object(...) -- läggs till av nästa migration (attribution_columns)
    )
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_booking_webhook ON public.quote_requests;
CREATE TRIGGER trg_notify_booking_webhook
  AFTER INSERT ON public.quote_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_booking_webhook();

-- ============================================================================
-- EFTER KÖRNING (görs separat, inte i denna fil):
-- ============================================================================
-- 1. INSERT/UPDATE en rad i webhook_config: key='booking_url',
--    value='https://admin-vt6.tejnevidar.workers.dev/api/public/booking-request'.
--    (Hemligheten är redan satt som saljtak_secret och återanvänds, inget nytt secret.)
-- 2. Kör därefter 20260929140000_attribution_columns_ready.sql (efter att CRM:s migration 4b
--    är deployad, per Driftchefens villkor 3).
-- 3. Uppdatera BookingWidget.tsx så att insert-anropet fyller booking_slot/booking_date +
--    attributionFields()/utmFields() (görs av Agent – Hemsida & SEO efter STEG 2 ovan).
-- 4. Live-testa en bokning och bekräfta i CRM att lead_id + sla_promised_at kommer tillbaka,
--    och att INGEN dubblettlead skapas i den vanliga leadlistan.
-- 5. Sätt BOOKING_ENABLED = true i webbsida/src/lib/booking.ts (egen commit, efter att
--    designen visats för och godkänts av Vidar) och slå på länkar till /boka-takkontroll.
