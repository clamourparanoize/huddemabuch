import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function DatenschutzSeite() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[700px] flex-1 px-[18px] py-16 sm:px-6 lg:px-8">
        <h1 className="font-display text-5xl font-extrabold uppercase">
          Datenschutzerklärung
        </h1>

        <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-[var(--foreground)]">
          <section>
            <h2 className="text-base font-semibold">
              1. Verantwortlicher
            </h2>
            <p className="mt-2 text-[var(--muted)]">
              Verantwortlich für die Datenverarbeitung auf dieser Website
              im Sinne der DSGVO ist:
            </p>
            <p className="mt-2">
              Faschingsfreunde Huddene e.V.
              <br />
              Matthias Wittemann
              <br />
              Philippsburgerstr. 97
              <br />
              76661 Philippsburg
            </p>
            <p className="mt-2 text-[var(--muted)]">
              Kontaktdaten siehe{" "}
              <a
                href="/impressum"
                className="text-[var(--accent)] underline-offset-4 hover:underline"
              >
                Impressum
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold">
              2. Allgemeines zur Datenverarbeitung
            </h2>
            <p className="mt-2 text-[var(--muted)]">
              Das Huddemabuch lässt sich vollständig nutzen (Wörterbuch
              durchsuchen, Einträge lesen), ohne dass du personenbezogene
              Daten angeben musst. Personenbezogene Daten fallen nur an,
              wenn du das Formular „Wort beisteuern“ nutzt und dabei
              freiwillig deinen Namen oder deine E-Mail-Adresse
              hinterlässt (siehe Punkt 4), sowie in Form technisch
              notwendiger Server-Zugriffsdaten (siehe Punkt 3).
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold">
              3. Hosting
            </h2>
            <p className="mt-2 text-[var(--muted)]">
              Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133,
              Walnut, CA 91789, USA, gehostet. Beim Aufruf der Website
              erhebt Vercel automatisch sogenannte Server-Logfiles, die
              dein Browser übermittelt. Dazu gehören z. B. IP-Adresse,
              Datum und Uhrzeit der Anfrage, aufgerufene Seite,
              Browsertyp und Betriebssystem. Diese Daten sind technisch
              erforderlich, um die Website auszuliefern und ihre
              Stabilität und Sicherheit zu gewährleisten (Art. 6 Abs. 1
              lit. f DSGVO).
            </p>
            <p className="mt-2 text-[var(--muted)]">
              Da Vercel Inc. ein US-amerikanisches Unternehmen ist, kann
              es dabei zu einer Datenübermittlung in die USA kommen.
              Vercel hat sich zur Einhaltung der EU-Standardvertrags-
              klauseln verpflichtet, die ein angemessenes
              Datenschutzniveau sicherstellen sollen.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold">
              4. Formular „Wort beisteuern“
            </h2>
            <p className="mt-2 text-[var(--muted)]">
              Wenn du über das Formular ein Dialektwort einreichst,
              verarbeiten wir die von dir eingegebenen Angaben (Wort,
              Bedeutung, Aussprache, Wortart, Beispielsatz sowie optional
              dein Name und deine E-Mail-Adresse), um den Eintrag zu
              prüfen und - nach Freigabe durch die Redaktion - im
              Wörterbuch zu veröffentlichen. Rechtsgrundlage ist Art. 6
              Abs. 1 lit. a DSGVO (Einwilligung durch aktives Absenden
              des Formulars), bei Redewendungen und Aussprachehinweisen
              ohne Personenbezug entfällt der DSGVO-Bezug ohnehin.
            </p>
            <p className="mt-2 text-[var(--muted)]">
              Name und E-Mail-Adresse sind ausdrücklich freiwillige
              Angaben. Wird ein Name angegeben, kann dieser bei
              Veröffentlichung des Eintrags als „Eingereicht von …“ öffentlich
              sichtbar sein - das geschieht nur, wenn du das Feld
              ausfüllst. Die E-Mail-Adresse wird ausschließlich intern zur
              Rückfrage bei der Prüfung genutzt und niemals veröffentlicht
              oder an Dritte weitergegeben.
            </p>
            <p className="mt-2 text-[var(--muted)]">
              Eingereichte Einträge werden bis zur Prüfung sowie nach
              Freigabe dauerhaft gespeichert, da sie den Zweck des
              Projekts (Erhalt des Dialekts) erfüllen. Nicht freigegebene
              oder abgelehnte Einträge kannst du jederzeit über die im
              Impressum genannten Kontaktdaten löschen lassen.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold">
              5. Datenbank (Supabase)
            </h2>
            <p className="mt-2 text-[var(--muted)]">
              Die im Formular eingegebenen Daten werden bei unserem
              Datenbank-Dienstleister Supabase Inc. gespeichert. Das
              zugehörige Datenbankprojekt läuft in der Region EU
              (Frankfurt am Main, Deutschland) - die Daten aus dem
              Formular verlassen dabei die EU nicht. Mit Supabase besteht
              ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold">
              6. Bot-Schutz (Cloudflare Turnstile)
            </h2>
            <p className="mt-2 text-[var(--muted)]">
              Um das Einreichen-Formular vor automatisiertem Missbrauch
              (Spam, Bots) zu schützen, setzen wir Cloudflare Turnstile
              der Cloudflare, Inc., 101 Townsend St, San Francisco, CA
              94107, USA, ein. Turnstile prüft im Hintergrund technische
              Merkmale deines Besuchs (u. a. IP-Adresse), um zwischen
              menschlichen Besuchern und automatisierten Zugriffen zu
              unterscheiden - im Regelfall ohne dass du aktiv etwas tun
              musst. Rechtsgrundlage ist unser berechtigtes Interesse an
              einem funktionsfähigen, missbrauchsfreien Formular (Art. 6
              Abs. 1 lit. f DSGVO). Weitere Informationen:{" "}
              <a
                href="https://www.cloudflare.com/de-de/privacypolicy/"
                target="_blank"
                rel="noreferrer"
                className="text-[var(--accent)] underline-offset-4 hover:underline"
              >
                Cloudflare-Datenschutzerklärung
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold">
              7. Cookies und Tracking
            </h2>
            <p className="mt-2 text-[var(--muted)]">
              Diese Website setzt aktuell keine Analyse- oder
              Marketing-Cookies ein und bindet keine Analysedienste wie
              Google Analytics ein. Es werden keine Nutzungsprofile
              erstellt.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold">
              8. Deine Rechte
            </h2>
            <p className="mt-2 text-[var(--muted)]">
              Du hast jederzeit das Recht auf Auskunft über die zu deiner
              Person gespeicherten Daten (Art. 15 DSGVO), auf Berichtigung
              unrichtiger Daten (Art. 16 DSGVO), auf Löschung (Art. 17
              DSGVO), auf Einschränkung der Verarbeitung (Art. 18 DSGVO),
              auf Datenübertragbarkeit (Art. 20 DSGVO) sowie auf
              Widerspruch gegen die Verarbeitung (Art. 21 DSGVO). Wende
              dich dazu an die im Impressum genannten Kontaktdaten.
            </p>
            <p className="mt-2 text-[var(--muted)]">
              Außerdem hast du das Recht, dich bei einer
              Datenschutz-Aufsichtsbehörde zu beschweren, z. B. beim
              Landesbeauftragten für den Datenschutz und die
              Informationsfreiheit Baden-Württemberg.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold">
              9. Änderungen dieser Erklärung
            </h2>
            <p className="mt-2 text-[var(--muted)]">
              Wir passen diese Datenschutzerklärung an, sobald sich die
              Website oder die zugrunde liegende Datenverarbeitung
              ändert. Es gilt jeweils die aktuell auf dieser Seite
              abrufbare Fassung.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
