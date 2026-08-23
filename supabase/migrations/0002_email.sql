-- 0002_email.sql
--
-- Ergänzt ein optionales, rein internes E-Mail-Feld am Einreichenden
-- (siehe Formular-Überarbeitung). Nullable, additiv - bestehende
-- Einträge bleiben unverändert gültig, keine Migration nötig.
--
-- Wichtig: KEINE eigene SELECT-Policy für anon nötig, da die
-- öffentliche Liste (siehe src/lib/dictionary/queries.ts) die Spalte
-- serverseitig nie in den an den Client zurückgegebenen Eintrag mappt -
-- die E-Mail bleibt ausschließlich im Admin-Bereich sichtbar.

alter table public.eintraege
  add column eingereicht_email text;

comment on column public.eintraege.eingereicht_email is
  'Optional, ausschließlich intern - wird nie öffentlich angezeigt.';
