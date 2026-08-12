ALTER TABLE public.quote_requests
  ADD COLUMN IF NOT EXISTS property_designation TEXT,
  ADD COLUMN IF NOT EXISTS personal_number TEXT;