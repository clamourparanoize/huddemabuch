/**
 * Zentrale Prüfung, ob Supabase-Zugangsdaten vorhanden sind. Solange kein
 * Supabase-Projekt eingerichtet ist (siehe README), zeigen die Seiten
 * einen freundlichen Hinweis statt eines technischen Fehlers.
 */
export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function isAdminConfigured() {
  return Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
}
