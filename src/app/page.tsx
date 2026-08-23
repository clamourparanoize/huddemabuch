import { SiteHeader } from "@/components/site-header";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getFreigegebeneEintraege } from "@/lib/dictionary/queries";

export const dynamic = "force-dynamic";

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
        <main className="mx-auto max-w-3xl px-6 py-16">
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

  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <p className="mb-8 text-lg text-[var(--muted)]">
          Wörter und Ausdrücke aus dem Huttenheimer Dialekt, gesammelt von
          Dorfbewohnern - damit sie nicht in Vergessenheit geraten.
        </p>

        <form method="GET" className="mb-10 flex gap-3">
          <input
            type="search"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Wort oder Übersetzung suchen…"
            className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-lg outline-none focus:border-[var(--accent)]"
          />
          <button
            type="submit"
            className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-5 py-3 text-lg font-semibold hover:bg-black/5"
          >
            Suchen
          </button>
        </form>

        {eintraege.length === 0 ? (
          <p className="text-lg text-[var(--muted)]">
            {q
              ? "Keine Einträge gefunden."
              : "Noch keine Einträge freigegeben. Sei der/die Erste und steuere ein Wort bei!"}
          </p>
        ) : (
          <ul className="space-y-6">
            {eintraege.map((eintrag) => (
              <li
                key={eintrag.id}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="text-2xl font-bold">{eintrag.wort}</h2>
                  {eintrag.wortart && (
                    <span className="rounded-full bg-black/5 px-3 py-0.5 text-sm text-[var(--muted)]">
                      {eintrag.wortart}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xl text-[var(--accent-dark)]">
                  {eintrag.uebersetzung}
                </p>
                {eintrag.aussprachehinweis && (
                  <p className="mt-2 text-base text-[var(--muted)] italic">
                    Aussprache: {eintrag.aussprachehinweis}
                  </p>
                )}
                {eintrag.beispielsatz && (
                  <blockquote className="mt-3 border-l-4 border-[var(--border)] pl-4 text-lg">
                    „{eintrag.beispielsatz}“
                    {eintrag.beispielsatzUebersetzung && (
                      <span className="mt-1 block text-base text-[var(--muted)]">
                        {eintrag.beispielsatzUebersetzung}
                      </span>
                    )}
                  </blockquote>
                )}
                {eintrag.anmerkung && (
                  <p className="mt-3 text-base text-[var(--muted)]">
                    {eintrag.anmerkung}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
