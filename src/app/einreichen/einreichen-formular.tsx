"use client";

import { useActionState } from "react";

import { eintragEinreichen, type EinreichenState } from "@/lib/dictionary/actions";

const anfangsZustand: EinreichenState = { status: "idle" };

const inputKlasse =
  "w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-lg outline-none focus:border-[var(--accent)]";
const labelKlasse = "mb-2 block text-lg font-semibold";

export function EinreichenFormular({
  turnstileSiteKey,
}: {
  turnstileSiteKey?: string;
}) {
  const [state, formAction, isPending] = useActionState(
    eintragEinreichen,
    anfangsZustand,
  );

  if (state.status === "erfolg") {
    return (
      <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 text-center">
        <p className="text-2xl font-bold text-[var(--accent-dark)]">
          Danke schön! 🎉
        </p>
        <p className="mt-3 text-lg">
          Dein Wort wird geprüft und bald im Wörterbuch veröffentlicht.
        </p>
        <a
          href="/einreichen"
          className="mt-6 inline-block text-lg font-semibold text-[var(--accent)] underline"
        >
          Noch ein Wort beisteuern
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-8">
      <div>
        <label htmlFor="wort" className={labelKlasse}>
          Das Wort oder der Ausdruck *
        </label>
        <input
          id="wort"
          name="wort"
          required
          maxLength={200}
          placeholder="z. B. Gschwelldi"
          className={inputKlasse}
        />
      </div>

      <div>
        <label htmlFor="uebersetzung" className={labelKlasse}>
          Was heißt das auf Hochdeutsch? *
        </label>
        <input
          id="uebersetzung"
          name="uebersetzung"
          required
          maxLength={500}
          placeholder="z. B. Pellkartoffel"
          className={inputKlasse}
        />
      </div>

      <details className="rounded-lg border border-[var(--border)] p-4">
        <summary className="cursor-pointer text-lg font-semibold">
          Noch mehr dazu erzählen (freiwillig)
        </summary>
        <div className="mt-6 space-y-6">
          <div>
            <label htmlFor="beispielsatz" className={labelKlasse}>
              Beispielsatz auf Dialekt
            </label>
            <textarea
              id="beispielsatz"
              name="beispielsatz"
              maxLength={1000}
              rows={2}
              placeholder="z. B. Gibt's heit Gschwelldi mit Quark?"
              className={inputKlasse}
            />
          </div>

          <div>
            <label htmlFor="beispielsatzUebersetzung" className={labelKlasse}>
              ...und auf Hochdeutsch
            </label>
            <textarea
              id="beispielsatzUebersetzung"
              name="beispielsatzUebersetzung"
              maxLength={1000}
              rows={2}
              placeholder="z. B. Gibt es heute Pellkartoffeln mit Quark?"
              className={inputKlasse}
            />
          </div>

          <div>
            <label htmlFor="wortart" className={labelKlasse}>
              Was für ein Wort ist das?
            </label>
            <input
              id="wortart"
              name="wortart"
              maxLength={50}
              placeholder="z. B. Nomen, Redewendung, Schimpfwort…"
              className={inputKlasse}
            />
          </div>

          <div>
            <label htmlFor="aussprachehinweis" className={labelKlasse}>
              Wie spricht man das aus?
            </label>
            <input
              id="aussprachehinweis"
              name="aussprachehinweis"
              maxLength={300}
              placeholder="Schreib es so, wie es klingt"
              className={inputKlasse}
            />
          </div>

          <div>
            <label htmlFor="anmerkung" className={labelKlasse}>
              Sonstige Anmerkung
            </label>
            <textarea
              id="anmerkung"
              name="anmerkung"
              maxLength={1000}
              rows={3}
              placeholder="z. B. woher das Wort kommt, wer es noch benutzt…"
              className={inputKlasse}
            />
          </div>

          <div>
            <label htmlFor="eingereichtVon" className={labelKlasse}>
              Dein Name
            </label>
            <input
              id="eingereichtVon"
              name="eingereichtVon"
              maxLength={200}
              placeholder="Darf auch leer bleiben"
              className={inputKlasse}
            />
          </div>
        </div>
      </details>

      {turnstileSiteKey && (
        <div
          className="cf-turnstile"
          data-sitekey={turnstileSiteKey}
          data-language="de"
        />
      )}

      {state.status === "fehler" && (
        <p className="rounded-lg bg-red-50 p-4 text-lg text-red-800">
          {state.fehler}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-[var(--accent)] px-6 py-4 text-xl font-bold text-white hover:bg-[var(--accent-dark)] disabled:opacity-60"
      >
        {isPending ? "Wird gesendet…" : "Absenden"}
      </button>
    </form>
  );
}
