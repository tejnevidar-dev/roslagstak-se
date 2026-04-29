-- Aktivera pg_net
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Settings-tabell för webhook-konfig (admin-only läsning)
CREATE TABLE IF NOT EXISTS public.webhook_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

ALTER TABLE public.webhook_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins read webhook_config" ON public.webhook_config;
CREATE POLICY "Admins read webhook_config" ON public.webhook_config
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Lägg in URL (secret läggs in separat efter migrationen)
INSERT INTO public.webhook_config (key, value) VALUES
  ('saljtak_url', 'https://project--f17461f8-b5e1-4cde-9866-906e2fce805f.lovable.app/api/public/roslagstak-webhook')
  ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Trigger-funktion
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
  SELECT value INTO v_url FROM public.webhook_config WHERE key = 'saljtak_url';
  SELECT value INTO v_secret FROM public.webhook_config WHERE key = 'saljtak_secret';

  IF v_url IS NULL OR v_secret IS NULL THEN
    RAISE WARNING 'Sälj tak webhook ej konfigurerad - hoppar över';
    RETURN NEW;
  END IF;

  PERFORM net.http_post(
    url := v_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'X-Webhook-Secret', v_secret
    ),
    body := jsonb_build_object(
      'id', NEW.id::text,
      'mode', NEW.mode::text,
      'name', NEW.name,
      'phone', NEW.phone,
      'email', NEW.email,
      'address', NEW.address,
      'current_roof', NEW.current_roof,
      'new_roof', NEW.new_roof,
      'raspont', NEW.raspont,
      'gangbrygga', NEW.gangbrygga,
      'takstege', NEW.takstege,
      'avvattning', NEW.avvattning,
      'floors', NEW.floors,
      'message', NEW.message,
      'created_at', NEW.created_at::text
    )
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_notify_saljtak_on_new_quote ON public.quote_requests;
CREATE TRIGGER trg_notify_saljtak_on_new_quote
  AFTER INSERT ON public.quote_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_saljtak_on_new_quote();