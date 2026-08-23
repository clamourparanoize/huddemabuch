-- 0001_init.sql
--
-- Huttenheimer Wörterbuch: Kernmodell.
--
-- Öffentliche Besucher reichen Wörter/Ausdrücke per Formular ohne Login
-- ein (siehe src/app/einreichen/). Jede Einreichung landet zunächst mit
-- status = 'eingereicht' in der Tabelle und ist NICHT öffentlich
-- sichtbar. Erst nach Prüfung im Admin-Bereich (Basic-Auth-geschützt,
-- läuft über den service_role-Key statt Supabase Auth - siehe
-- src/lib/supabase/admin.ts) wird ein Eintrag auf 'freigegeben' gesetzt
-- und erscheint in der öffentlichen Liste/Suche.

create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.eintraege (
  id uuid primary key default gen_random_uuid(),
  wort text not null,
  uebersetzung text not null,
  beispielsatz text,
  beispielsatz_uebersetzung text,
  wortart text,
  aussprache_hinweis text,
  anmerkung text,
  eingereicht_von text,
  status text not null default 'eingereicht'
    check (status in ('eingereicht', 'freigegeben', 'abgelehnt')),
  interne_notiz text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.eintraege is
  'Wörter/Ausdrücke des Huttenheimer Dialekts. Öffentlich einreichbar '
  'ohne Login, erst nach Prüfung (status = freigegeben) öffentlich sichtbar.';

create index eintraege_status_idx on public.eintraege (status);
create index eintraege_wort_idx on public.eintraege (lower(wort));

create trigger set_eintraege_updated_at
  before update on public.eintraege
  for each row
  execute function public.set_updated_at();

alter table public.eintraege enable row level security;

-- Anonyme Besucher dürfen NUR anlegen (nie lesen/ändern/löschen), und
-- nur mit Status 'eingereicht' - kein Weg, über das Formular direkt
-- einen bereits freigegebenen/abgelehnten Eintrag zu erzeugen. Die
-- Spalte interne_notiz bleibt beim Einreichen zwangsläufig leer, da sie
-- hier nicht Teil des Inserts von außen ist (with check greift nur auf
-- status, das Formular selbst setzt interne_notiz nie).
create policy "Anonyme Besucher reichen Einträge ein"
  on public.eintraege for insert
  to anon
  with check (status = 'eingereicht');

-- Anonyme Besucher (und der Admin-Bereich über den anon-Client) sehen
-- ausschließlich freigegebene Einträge. Der Admin-Bereich selbst nutzt
-- für Prüfung/Bearbeitung den service_role-Key, der RLS ohnehin umgeht.
create policy "Freigegebene Einträge sind öffentlich lesbar"
  on public.eintraege for select
  to anon, authenticated
  using (status = 'freigegeben');
