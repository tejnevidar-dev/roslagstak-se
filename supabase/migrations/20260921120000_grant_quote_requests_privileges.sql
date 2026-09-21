-- Det egna Supabase-projektet ger inte längre automatiska tabellrättigheter till anon/authenticated
-- på nya public-tabeller. RLS-policyerna finns redan (20260425111635_*) men utan GRANT nekas
-- alla förfrågningar med "permission denied for table quote_requests" (42501).
-- Webbformulären gör bara INSERT (utan select), så anon får enbart INSERT.

GRANT INSERT ON public.quote_requests TO anon, authenticated;

-- Admin-panelen (/admin) läser, uppdaterar och raderar som inloggad admin (RLS begränsar till admin-rollen).
GRANT SELECT, UPDATE, DELETE ON public.quote_requests TO authenticated;
