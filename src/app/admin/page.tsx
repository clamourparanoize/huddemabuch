import { isAdminConfigured } from "@/lib/supabase/config";
import { getEintraegeFuerAdmin } from "@/lib/dictionary/queries";
import { EintragZeile } from "./eintrag-zeile";

export const dynamic = "force-dynamic";

export default async function AdminSeite() {
  if (!isAdminConfigured()) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <p className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 text-lg">
          <code className="rounded bg-black/5 px-1.5 py-0.5">
            SUPABASE_SERVICE_ROLE_KEY
          </code>{" "}
          fehlt in <code>.env.local</code> (siehe README).
        </p>
      </main>
    );
  }

  const [wartend, freigegeben, abgelehnt] = await Promise.all([
    getEintraegeFuerAdmin("eingereicht"),
    getEintraegeFuerAdmin("freigegeben"),
    getEintraegeFuerAdmin("abgelehnt"),
  ]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Admin: Wörterbuch prüfen</h1>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">
          Wartet auf Prüfung ({wartend.length})
        </h2>
        {wartend.length === 0 ? (
          <p className="text-lg text-[var(--muted)]">
            Nichts Neues - alles geprüft.
          </p>
        ) : (
          <ul className="space-y-4">
            {wartend.map((eintrag) => (
              <EintragZeile key={eintrag.id} eintrag={eintrag} />
            ))}
          </ul>
        )}
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">
          Freigegeben ({freigegeben.length})
        </h2>
        <ul className="space-y-4">
          {freigegeben.map((eintrag) => (
            <EintragZeile key={eintrag.id} eintrag={eintrag} />
          ))}
        </ul>
      </section>

      {abgelehnt.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-bold">
            Abgelehnt ({abgelehnt.length})
          </h2>
          <ul className="space-y-4">
            {abgelehnt.map((eintrag) => (
              <EintragZeile key={eintrag.id} eintrag={eintrag} />
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
