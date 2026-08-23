import { Search } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getFreigegebeneEintraege } from "@/lib/dictionary/queries";
import type { Eintrag } from "@/lib/dictionary/types";

export const dynamic = "force-dynamic";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Duden-übliche Einsortierung von Umlauten unter dem Grundbuchstaben,
// nur für die Gruppierung/Navigation - die Anzeige des Worts selbst
// bleibt unverändert.
function ersterBuchstabe(wort: string): string {
  const rein = wort.trim().charAt(0).toUpperCase();
  const umlaute: Record<string, string> = { Ä: "A", Ö: "O", Ü: "U" };
  return umlaute[rein] ?? rein;
}

function gruppiereNachBuchstabe(eintraege: Eintrag[]) {
  const gruppen = new Map<string, Eintrag[]>();
  for (const eintrag of eintraege) {
    const buchstabe = ersterBuchstabe(eintrag.wort);
    if (!gruppen.has(buchstabe)) gruppen.set(buchstabe, []);
    gruppen.get(buchstabe)!.push(eintrag);
  }
  return gruppen;
}

export default async function StartSeite({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  if (!isSupabaseConfigured()) {
    return (
      <div>
        <SiteHeader />
        <main className="mx-auto max-w-[1080px] px-[18px] py-16 sm:px-6 lg:px-8">
          <p className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 text-lg">
            Supabase ist noch nicht eingerichtet. Trag
            <code className="mx-1 rounded bg-black/5 px-1.5 py-0.5">
              NEXT_PUBLIC_SUPABASE_URL
            </code>
            und
            <code className="mx-1 rounded bg-black/5 px-1.5 py-0.5">
              NEXT_PUBLIC_SUPABASE_ANON_KEY
            </code>
            in <code>.env.local</code> ein (siehe README).
          </p>
        </main>
      </div>
    );
  }

  const eintraege = await getFreigegebeneEintraege(q);
  // A-Z-Leiste bezieht sich immer auf den kompletten Bestand, nicht nur
  // auf eine gerade aktive Suche - sonst würde ein Suchfilter die
  // Navigation selbst verändern, was verwirrend wäre.
  const alleEintraege = q ? await getFreigegebeneEintraege() : eintraege;
  const vorhandeneBuchstaben = new Set(
    alleEintraege.map((e) => ersterBuchstabe(e.wort)),
  );
  const gruppen = gruppiereNachBuchstabe(eintraege);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[var(--border)]">
          <span
            aria-hidden
            className="hero-wasserzeichen font-serif-display absolute -right-6 -top-10 hidden text-[220px] font-semibold leading-none text-[var(--foreground)] opacity-[0.04] md:block lg:text-[280px]"
          >
            HUDDENE
          </span>
          <div className="relative mx-auto max-w-[1080px] px-[18px] pb-[50px] pt-[70px] sm:px-6 lg:px-8">
            <p className="text-sm font-semibold tracking-[0.14em] text-[var(--accent)]">
              HUTTENHEIMER DIALEKT
            </p>
            <h1 className="font-serif-display mt-4 max-w-[700px] text-[38px] font-semibold leading-[1.1] text-[var(--foreground)] sm:text-5xl lg:text-6xl">
              So schwätzt Huddene.
            </h1>
            <p className="mt-5 max-w-[680px] text-lg text-[var(--muted)]">
              Wörter und Ausdrücke aus dem Huttenheimer Dialekt, gesammelt von
              Dorfbewohnern – damit sie nicht in Vergessenheit geraten.
            </p>
          </div>
        </section>

        {/* Suche */}
        <section className="border-b border-[var(--border)] bg-[var(--background)]">
          <div className="mx-auto max-w-[1080px] px-[18px] py-8 sm:px-6 lg:px-8">
            <form method="GET" id="wortliste" className="buchstaben-anker">
              <label
                htmlFor="suche"
                className="mb-2 block text-sm font-semibold tracking-wide text-[var(--muted)]"
              >
                Im Huddemabuch suchen
              </label>
              <div className="relative">
                <Search
                  aria-hidden
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted)]"
                />
                <input
                  id="suche"
                  type="search"
                  name="q"
                  defaultValue={q ?? ""}
                  placeholder="Dialektwort oder Bedeutung suchen …"
                  className="h-[58px] w-full rounded-lg border border-[var(--border)] bg-white pl-12 pr-4 text-base outline-none focus:border-[var(--accent)] sm:h-16 sm:pr-36 sm:text-lg"
                />
                <button
                  type="submit"
                  className="mt-3 h-12 w-full rounded-md bg-[var(--accent)] px-6 text-base font-semibold text-white transition-colors hover:bg-[var(--accent-dark)] sm:absolute sm:right-2 sm:top-2 sm:mt-0 sm:h-12 sm:w-auto"
                >
                  Suchen
                </button>
              </div>
            </form>

            {/* A-Z-Navigation */}
            <nav
              aria-label="Alphabetische Navigation"
              className="az-leiste mt-7 flex items-baseline gap-4 overflow-x-auto whitespace-nowrap pb-1"
            >
              <a
                href="#wortliste"
                className="text-[15px] font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
              >
                Alle
              </a>
              {ALPHABET.map((buchstabe) => {
                const vorhanden = vorhandeneBuchstaben.has(buchstabe);
                return vorhanden ? (
                  <a
                    key={buchstabe}
                    href={`#buchstabe-${buchstabe}`}
                    className="text-[15px] font-medium text-[var(--foreground)] underline-offset-4 hover:text-[var(--accent)] hover:underline"
                  >
                    {buchstabe}
                  </a>
                ) : (
                  <span
                    key={buchstabe}
                    className="text-[15px] font-medium text-[var(--border)]"
                  >
                    {buchstabe}
                  </span>
                );
              })}
            </nav>
          </div>
        </section>

        {/* Wörterbuch */}
        <section className="mx-auto max-w-[1080px] px-[18px] py-10 sm:px-6 lg:px-8">
          <div className="mb-2 flex items-baseline justify-between border-b border-[var(--border)] pb-4">
            <h2 className="text-xl font-bold">Wörterbuch</h2>
            <p className="text-sm text-[var(--muted)]">
              {eintraege.length}{" "}
              {eintraege.length === 1 ? "Begriff" : "Begriffe"}
            </p>
          </div>

          {eintraege.length === 0 ? (
            <p className="py-10 text-lg text-[var(--muted)]">
              {q
                ? "Keine Einträge gefunden."
                : "Noch keine Einträge freigegeben. Sei der/die Erste und steuere ein Wort bei!"}
            </p>
          ) : (
            <div className="mx-auto max-w-[900px]">
              {Array.from(gruppen.entries()).map(([buchstabe, gruppe]) => (
                <div key={buchstabe}>
                  <h3
                    id={`buchstabe-${buchstabe}`}
                    className="buchstaben-anker font-serif-display pt-12 text-5xl font-semibold text-[var(--accent)] first:pt-0 sm:text-6xl"
                  >
                    {buchstabe}
                  </h3>
                  <ul>
                    {gruppe.map((eintrag) => (
                      <li
                        key={eintrag.id}
                        className="border-b border-[var(--border)] py-8 last:border-b-0"
                      >
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h4 className="font-serif-display text-[27px] font-bold leading-tight sm:text-[32px]">
                            {eintrag.wort}
                          </h4>
                          {eintrag.wortart && (
                            <span className="rounded-[4px] bg-[var(--accent)]/[0.08] px-2 py-0.5 text-xs font-semibold tracking-wide text-[var(--accent)] uppercase">
                              {eintrag.wortart}
                            </span>
                          )}
                        </div>

                        <p className="mt-2 text-[21px] font-medium text-[var(--foreground)]">
                          {eintrag.uebersetzung}
                        </p>

                        {eintrag.aussprachehinweis && (
                          <p className="mt-2 text-[15px] text-[var(--muted)]">
                            Aussprache:{" "}
                            <span className="text-[var(--foreground)]">
                              {eintrag.aussprachehinweis}
                            </span>
                          </p>
                        )}

                        {eintrag.beispielsatz && (
                          <blockquote className="mt-6 border-l-[3px] border-[var(--accent)] py-0.5 pl-5">
                            <p className="text-[17px] leading-relaxed italic sm:text-[18px]">
                              „{eintrag.beispielsatz}“
                            </p>
                            {eintrag.beispielsatzUebersetzung && (
                              <p className="mt-1.5 text-[14px] text-[var(--muted)] sm:text-[15px]">
                                {eintrag.beispielsatzUebersetzung}
                              </p>
                            )}
                          </blockquote>
                        )}

                        {eintrag.anmerkung && (
                          <p className="mt-4 text-[15px] text-[var(--muted)]">
                            {eintrag.anmerkung}
                          </p>
                        )}

                        {eintrag.eingereichtVon && (
                          <p className="mt-5 text-[13px] text-[var(--muted)]">
                            Eingereicht von {eintrag.eingereichtVon}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
