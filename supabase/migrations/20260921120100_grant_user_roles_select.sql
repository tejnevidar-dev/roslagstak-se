-- Adminpanelen (src/hooks/use-auth.tsx) läser user_roles direkt som inloggad användare.
-- Utan tabellrättighet nekas läsningen och ingen kan identifieras som admin.
-- RLS-policyn "Admins can view roles" begränsar redan raderna till admins.
GRANT SELECT ON public.user_roles TO authenticated;
