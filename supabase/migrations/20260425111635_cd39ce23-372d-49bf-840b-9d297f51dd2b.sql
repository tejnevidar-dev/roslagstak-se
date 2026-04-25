
-- Roller
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Admins can view roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Status enum för förfrågningar
CREATE TYPE public.quote_status AS ENUM ('ny', 'kontaktad', 'offert_skickad', 'avslutad', 'forlorad');

-- Mode enum
CREATE TYPE public.quote_mode AS ENUM ('configure', 'consultation');

-- Tabell för offertförfrågningar
CREATE TABLE public.quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status public.quote_status NOT NULL DEFAULT 'ny',
  mode public.quote_mode NOT NULL,
  -- Kontaktuppgifter
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT,
  -- Konfigurations-data
  current_roof TEXT,
  new_roof TEXT,
  raspont TEXT,
  gangbrygga BOOLEAN DEFAULT false,
  takstege BOOLEAN DEFAULT false,
  avvattning TEXT,
  floors TEXT,
  -- Rådgivningsmeddelande
  message TEXT,
  -- Admin-noteringar
  admin_notes TEXT
);

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Vem som helst (även anonym) får skapa en förfrågan
CREATE POLICY "Anyone can submit quote requests"
ON public.quote_requests FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Endast admins kan läsa
CREATE POLICY "Admins can view all quote requests"
ON public.quote_requests FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Endast admins kan uppdatera
CREATE POLICY "Admins can update quote requests"
ON public.quote_requests FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Endast admins kan radera
CREATE POLICY "Admins can delete quote requests"
ON public.quote_requests FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger för updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_updated_at_quote_requests
BEFORE UPDATE ON public.quote_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Index för sortering
CREATE INDEX idx_quote_requests_created_at ON public.quote_requests(created_at DESC);
CREATE INDEX idx_quote_requests_status ON public.quote_requests(status);
