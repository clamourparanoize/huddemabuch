# Huttenheimer Wörterbuch

Digitales Wörterbuch für Wörter und Ausdrücke aus dem Huttenheimer Dialekt.
Besucher reichen Einträge über ein einfaches Formular ohne Login ein, ein
Admin-Bereich dient zur Prüfung und Freischaltung.

## Ziel

Dialektwörter und -ausdrücke sammeln, bevor sie in Vergessenheit geraten -
mit besonderem Augenmerk auf eine sehr einfache Bedienung des
Einreichen-Formulars, da viele Beitragende ältere, wenig technikaffine
Personen sind.

## Ersteinrichtung

### 1. Abhängigkeiten installieren

```bash
npm install
```

### 2. Supabase-Projekt einrichten

1. Neues Projekt auf [supabase.com](https://supabase.com) anlegen (eigenes
   Projekt, nicht das der Vereinschronik mitbenutzen).
2. **SQL Editor** öffnen und den Inhalt von
   `supabase/migrations/0001_init.sql` einmal ausführen.
3. Unter **Project Settings → Data API**: Projekt-URL und `anon`/`public`
   Key kopieren.
4. Unter **Project Settings → API Keys**: `service_role` Key kopieren
   (wird für den Admin-Bereich gebraucht, niemals im Client verwenden).

### 3. Umgebungsvariablen setzen

```bash
cp .env.local.example .env.local
```

Dann `.env.local` mit den Werten aus Schritt 2 sowie einem selbst
gewählten Admin-Nutzernamen/Passwort füllen (siehe Kommentare in der
Datei). Turnstile-Keys sind optional, aber empfohlen, sobald der Link
öffentlich geteilt wird.

### 4. Lokal starten

```bash
npm run dev
```

- Öffentliche Seite: http://localhost:3000
- Formular: http://localhost:3000/einreichen
- Admin-Bereich (Basic-Auth-geschützt): http://localhost:3000/admin

## Aufbau

- `src/app/page.tsx` - öffentliche Liste + Suche (nur freigegebene Einträge)
- `src/app/einreichen/` - öffentliches Einreichen-Formular
- `src/app/admin/` - Prüfung/Freischaltung/Bearbeitung (Basic-Auth)
- `src/lib/dictionary/` - Datenmodell, Validierung, Server Actions
- `supabase/migrations/` - Datenbankschema

Der Admin-Bereich läuft bewusst nicht über ein volles Login-System,
sondern über einfache HTTP-Basic-Auth (`ADMIN_BASIC_AUTH_USER`/
`ADMIN_BASIC_AUTH_PASSWORD`) - es gibt nur einen Prüfer, ein Login mit
Nutzerverwaltung wäre unnötiger Aufwand.

## Deployment

Wie das Chronik-Projekt lässt sich das hier direkt auf
[Vercel](https://vercel.com) deployen - Repo verbinden, die gleichen
Umgebungsvariablen aus `.env.local` in den Vercel-Projekteinstellungen
setzen, fertig.

## Später denkbar

- Audio-Aussprache-Uploads (Sprachmemo statt Text)
- Wort der Woche auf der Startseite
- Druckbare PDF-Version für Leute ohne Internet
- QR-Code auf's Einreichen-Formular für Aushänge im Dorf
