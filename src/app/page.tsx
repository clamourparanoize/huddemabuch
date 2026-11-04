import { Search } from "lucide-react";
import Image from "next/image";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import {
  getAnzahlInPruefung,
  getFreigegebeneEintraege,
} from "@/lib/dictionary/queries";
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
          <p className="border-[3px] border-[#111] bg-white p-6 text-lg">
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
  const inPruefung = await getAnzahlInPruefung();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Ortsschild */}
        <section className="mx-auto flex max-w-[1080px] flex-col gap-8 px-[18px] pb-10 pt-10 sm:px-6 md:flex-row md:items-center md:gap-14 md:pt-14 lg:px-8">
          <h1 className="w-full shrink-0 md:w-[560px]">
            <Image
              src="/logo.webp"
              alt="So schwätzt ma in Huddene"
              width={1920}
              height={1080}
              priority
              sizes="(min-width: 768px) 560px, 100vw"
              className="h-auto w-full"
            />
          </h1>

          <div className="min-w-0 flex-1">
            <p className="text-xl leading-[1.45] font-medium md:text-2xl">
              Wörter und Ausdrücke aus dem Huttenheimer Dialekt, gesammelt von
              Dorfbewohnern, damit sie nicht in Vergessenheit geraten.
            </p>
            <a
              href="/einreichen"
              className="font-display mt-6 inline-block border-b-[6px] border-[var(--green)] pb-0.5 text-[22px] font-bold tracking-[0.05em] uppercase transition-colors hover:border-[#111]"
            >
              Kennsch noch ä Wort? →
            </a>
          </div>
        </section>

        {/* Suche + A-Z */}
        <section className="mx-auto max-w-[1080px] px-[18px] sm:px-6 lg:px-8">
          <form method="GET" id="wortliste" className="buchstaben-anker">
            <label
              htmlFor="suche"
              className="font-display mb-2 block text-xl font-bold tracking-[0.1em] uppercase"
            >
              Im Huddemabuch suchen
            </label>
            <div className="flex flex-col sm:flex-row">
              <div className="relative flex-1">
                <Search
                  aria-hidden
                  className="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-[#111]"
                />
                <input
                  id="suche"
                  type="search"
                  name="q"
                  defaultValue={q ?? ""}
                  placeholder="Dialektwort oder Bedeutung …"
                  className="h-[60px] w-full border-[3px] border-[#111] bg-white pl-14 pr-4 text-lg outline-none focus:shadow-[0_0_0_4px_var(--green)] sm:h-[68px] sm:border-r-0 sm:text-[22px]"
                />
              </div>
              <button
                type="submit"
                className="font-display h-[56px] border-[3px] border-[#111] bg-[var(--green)] px-10 text-2xl font-extrabold tracking-[0.08em] text-[#111] uppercase transition-colors hover:bg-[#111] hover:text-[var(--green)] sm:h-[68px]"
              >
                Suchen
              </button>
            </div>
          </form>

          <nav
            aria-label="Alphabetische Navigation"
            className="az-leiste font-display mt-6 flex items-center gap-1 overflow-x-auto whitespace-nowrap pb-1 text-[30px] font-bold"
          >
            <a
              href="#wortliste"
              className="mr-2 bg-[#111] px-2 text-[var(--green)]"
            >
              ALLE
            </a>
            {ALPHABET.map((buchstabe) => {
              const vorhanden = vorhandeneBuchstaben.has(buchstabe);
              return vorhanden ? (
                <a
                  key={buchstabe}
                  href={`#buchstabe-${buchstabe}`}
                  className="px-2 transition-colors hover:bg-[var(--green)]"
                >
                  {buchstabe}
                </a>
              ) : (
                <span key={buchstabe} className="px-2 text-[#cfcabb]">
                  {buchstabe}
                </span>
              );
            })}
          </nav>
        </section>

        {/* Wörterbuch */}
        <section className="mx-auto max-w-[1080px] px-[18px] py-10 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b-4 border-[#111] pb-2">
            <h2 className="font-display text-4xl font-extrabold tracking-[0.04em] uppercase">
              Wörterbuch
            </h2>
            <p className="font-display text-xl font-semibold tracking-[0.06em] uppercase">
              {eintraege.length}{" "}
              {eintraege.length === 1 ? "Begriff" : "Begriffe"}
              {inPruefung > 0 && <> · {inPruefung} in Prüfung</>}
            </p>
          </div>

          {eintraege.length === 0 ? (
            <p className="py-10 text-lg text-[var(--muted)]">
              {q
                ? "Keine Einträge gefunden."
                : "Noch keine Einträge freigegeben. Sei der/die Erste und steuere ein Wort bei!"}
            </p>
          ) : (
            <div>
              {Array.from(gruppen.entries()).map(([buchstabe, gruppe]) => (
                <div
                  key={buchstabe}
                  id={`buchstabe-${buchstabe}`}
                  className="buchstaben-anker flex flex-col gap-4 pt-8 md:flex-row md:gap-10"
                >
                  <div className="font-display flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[10px] bg-[#111] text-[48px] font-extrabold text-[var(--green)] md:h-[68px] md:w-[68px] md:text-[54px]">
                    {buchstabe}
                  </div>

                  <ul className="min-w-0 flex-1">
                    {gruppe.map((eintrag) => (
                      <li
                        key={eintrag.id}
                        className="grid gap-4 border-b-2 border-[#111] pb-8 pt-0 not-first:pt-8 last:border-b-0 md:grid-cols-[280px_minmax(0,1fr)] md:gap-10"
                      >
                        <div>
                          <h3 className="font-display text-[44px] leading-none font-extrabold break-words md:text-[56px]">
                            {eintrag.wort}
                          </h3>
                          {eintrag.wortart && (
                            <span className="font-display mt-3 inline-block bg-[#111] px-2.5 py-0.5 text-[15px] font-semibold tracking-[0.14em] text-white uppercase">
                              {eintrag.wortart}
                            </span>
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="text-[26px] leading-[1.2] font-semibold md:text-[30px]">
                            {eintrag.uebersetzung}
                          </p>

                          {eintrag.aussprachehinweis && (
                            <p className="mt-2 text-[17px] text-[var(--muted)]">
                              Aussprache:{" "}
                              <span className="font-semibold text-[#111]">
                                {eintrag.aussprachehinweis}
                              </span>
                            </p>
                          )}

                          {eintrag.beispielsatz && (
                            <blockquote className="mt-5 border-l-[10px] border-[var(--green)] py-0.5 pl-5">
                              <p className="text-xl leading-[1.4] font-medium md:text-[22px]">
                                „{eintrag.beispielsatz}“
                              </p>
                              {eintrag.beispielsatzUebersetzung && (
                                <p className="mt-2 text-[16px] text-[var(--muted)] md:text-[17px]">
                                  {eintrag.beispielsatzUebersetzung}
                                </p>
                              )}
                            </blockquote>
                          )}

                          {eintrag.anmerkung && (
                            <p className="mt-4 text-[16px] text-[var(--muted)]">
                              {eintrag.anmerkung}
                            </p>
                          )}

                          {eintrag.eingereichtVon && (
                            <p className="mt-4 text-[14px] text-[var(--muted)]">
                              Eingereicht von {eintrag.eingereichtVon}
                            </p>
                          )}
                        </div>
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
