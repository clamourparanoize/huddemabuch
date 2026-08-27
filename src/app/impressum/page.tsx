import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function ImpressumSeite() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[700px] flex-1 px-[18px] py-16 sm:px-6 lg:px-8">
        <h1 className="font-serif-display text-3xl font-semibold">
          Impressum
        </h1>

        <div className="mt-10 space-y-10 text-[15px] leading-relaxed text-[var(--foreground)]">
          <section>
            <h2 className="text-base font-semibold">
              Angaben gemäß § 5 DDG
            </h2>
            <p className="mt-2">
              Faschingsfreunde Huddene e.V.
              <br />
              Philippsburgerstr. 97
              <br />
              76661 Philippsburg
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold">Vertreten durch</h2>
            <p className="mt-2">
              Matthias Wittemann
              <br />
              Florian Wittemann
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold">Registereintrag</h2>
            <p className="mt-2">
              Eintragung im Vereinsregister.
              <br />
              Registergericht: Mannheim
              <br />
              Registernummer: VR 250405
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold">
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </h2>
            <p className="mt-2">
              Matthias Wittemann
              <br />
              Philippsburgerstr. 97
              <br />
              76661 Philippsburg
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold">
              Haftungsausschluss
            </h2>

            <h3 className="mt-6 text-[15px] font-semibold">
              Haftung für Inhalte
            </h3>
            <p className="mt-2 text-[var(--muted)]">
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt
              erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität
              der Inhalte können wir jedoch keine Gewähr übernehmen. Als
              Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
              gespeicherte fremde Informationen zu überwachen oder nach
              Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
              hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
              Nutzung von Informationen nach den allgemeinen Gesetzen
              bleiben hiervon unberührt. Eine diesbezügliche Haftung ist
              jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
              Rechtsverletzung möglich. Bei Bekanntwerden von
              entsprechenden Rechtsverletzungen werden wir diese Inhalte
              umgehend entfernen.
            </p>

            <h3 className="mt-6 text-[15px] font-semibold">
              Haftung für Links
            </h3>
            <p className="mt-2 text-[var(--muted)]">
              Unser Angebot enthält Links zu externen Webseiten Dritter,
              auf deren Inhalte wir keinen Einfluss haben. Deshalb können
              wir für diese fremden Inhalte auch keine Gewähr übernehmen.
              Für die Inhalte der verlinkten Seiten ist stets der
              jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung
              auf mögliche Rechtsverstöße überprüft. Rechtswidrige
              Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten
              ist jedoch ohne konkrete Anhaltspunkte einer
              Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
              Rechtsverletzungen werden wir derartige Links umgehend
              entfernen.
            </p>

            <h3 className="mt-6 text-[15px] font-semibold">Urheberrecht</h3>
            <p className="mt-2 text-[var(--muted)]">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke
              auf diesen Seiten unterliegen dem deutschen Urheberrecht.
              Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
              der Verwertung außerhalb der Grenzen des Urheberrechtes
              bedürfen der schriftlichen Zustimmung des jeweiligen Autors
              bzw. Erstellers. Downloads und Kopien dieser Seite sind nur
              für den privaten, nicht kommerziellen Gebrauch gestattet.
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber
              erstellt wurden, werden die Urheberrechte Dritter beachtet.
              Insbesondere werden Inhalte Dritter als solche
              gekennzeichnet. Sollten Sie trotzdem auf eine
              Urheberrechtsverletzung aufmerksam werden, bitten wir um
              einen entsprechenden Hinweis. Bei Bekanntwerden von
              Rechtsverletzungen werden wir derartige Inhalte umgehend
              entfernen.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold">Datenschutz</h2>
            <p className="mt-2 text-[var(--muted)]">
              Die Nutzung unserer Webseite ist in der Regel ohne Angabe
              personenbezogener Daten möglich. Soweit auf unseren Seiten
              personenbezogene Daten (beispielsweise Name, Anschrift oder
              E-Mail-Adressen) erhoben werden, erfolgt dies, soweit
              möglich, stets auf freiwilliger Basis. Diese Daten werden
              ohne Ihre ausdrückliche Zustimmung nicht an Dritte
              weitergegeben.
            </p>
            <p className="mt-4 text-[var(--muted)]">
              Wir weisen darauf hin, dass die Datenübertragung im
              Internet (z. B. bei der Kommunikation per E-Mail)
              Sicherheitslücken aufweisen kann. Ein lückenloser Schutz
              der Daten vor dem Zugriff durch Dritte ist nicht möglich.
            </p>
            <p className="mt-4 text-[var(--muted)]">
              Der Nutzung von im Rahmen der Impressumspflicht
              veröffentlichten Kontaktdaten durch Dritte zur Übersendung
              von nicht ausdrücklich angeforderter Werbung und
              Informationsmaterialien wird hiermit ausdrücklich
              widersprochen. Die Betreiber der Seiten behalten sich
              ausdrücklich rechtliche Schritte im Falle der unverlangten
              Zusendung von Werbeinformationen, etwa durch Spam-Mails,
              vor.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold">Technische Umsetzung</h2>
            <p className="mt-2">
              Clamour Paranoize, Inh. Julian Baader
              <br />
              Hubert-Heil-Str. 31
              <br />
              76661 Philippsburg
              <br />
              <a
                href="mailto:design@clamour-paranoize.de"
                className="text-[var(--accent)] underline-offset-4 hover:underline"
              >
                design@clamour-paranoize.de
              </a>
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
