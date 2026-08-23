"use client";

import { useActionState } from "react";

import type { Eintrag } from "@/lib/dictionary/types";
import {
  eintragAblehnen,
  eintragBearbeiten,
  eintragFreigeben,
  eintragZurueckstellen,
  type BearbeitenState,
} from "@/lib/dictionary/actions";

const anfangsZustand: BearbeitenState = { status: "idle" };

const inputKlasse =
  "w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-base outline-none focus:border-[var(--accent)]";
const labelKlasse = "mb-1 block text-sm font-semibold text-[var(--muted)]";

const statusFarbe: Record<Eintrag["status"], string> = {
  eingereicht: "bg-amber-100 text-amber-900",
  freigegeben: "bg-green-100 text-green-900",
  abgelehnt: "bg-red-100 text-red-900",
};

const statusText: Record<Eintrag["status"], string> = {
  eingereicht: "Wartet",
  freigegeben: "Freigegeben",
  abgelehnt: "Abgelehnt",
};

export function EintragZeile({ eintrag }: { eintrag: Eintrag }) {
  const [state, formAction, isPending] = useActionState(
    eintragBearbeiten,
    anfangsZustand,
  );

  return (
    <li className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-baseline gap-2">
            <h3 className="text-xl font-bold">{eintrag.wort}</h3>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusFarbe[eintrag.status]}`}
            >
              {statusText[eintrag.status]}
            </span>
          </div>
          <p className="text-lg text-[var(--accent-dark)]">
            {eintrag.uebersetzung}
          </p>
          {eintrag.eingereichtVon && (
            <p className="mt-1 text-sm text-[var(--muted)]">
              Eingereicht von: {eintrag.eingereichtVon}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {eintrag.status !== "freigegeben" && (
            <form action={eintragFreigeben.bind(null, eintrag.id)}>
              <button
                type="submit"
                className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
              >
                Freigeben
              </button>
            </form>
          )}
          {eintrag.status !== "abgelehnt" && (
            <form action={eintragAblehnen.bind(null, eintrag.id)}>
              <button
                type="submit"
                className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
              >
                Ablehnen
              </button>
            </form>
          )}
          {eintrag.status !== "eingereicht" && (
            <form action={eintragZurueckstellen.bind(null, eintrag.id)}>
              <button
                type="submit"
                className="rounded-lg border border-[var(--border)] px-4 py-2 font-semibold hover:bg-black/5"
              >
                Zurückstellen
              </button>
            </form>
          )}
        </div>
      </div>

      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-semibold text-[var(--accent)]">
          Bearbeiten / Details
        </summary>

        <form action={formAction} className="mt-4 space-y-4">
          <input type="hidden" name="id" value={eintrag.id} />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelKlasse}>Wort</label>
              <input
                name="wort"
                defaultValue={eintrag.wort}
                required
                className={inputKlasse}
              />
            </div>
            <div>
              <label className={labelKlasse}>Übersetzung</label>
              <input
                name="uebersetzung"
                defaultValue={eintrag.uebersetzung}
                required
                className={inputKlasse}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelKlasse}>Beispielsatz</label>
              <textarea
                name="beispielsatz"
                defaultValue={eintrag.beispielsatz ?? ""}
                rows={2}
                className={inputKlasse}
              />
            </div>
            <div>
              <label className={labelKlasse}>
                Beispielsatz-Übersetzung
              </label>
              <textarea
                name="beispielsatzUebersetzung"
                defaultValue={eintrag.beispielsatzUebersetzung ?? ""}
                rows={2}
                className={inputKlasse}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelKlasse}>Wortart</label>
              <input
                name="wortart"
                defaultValue={eintrag.wortart ?? ""}
                className={inputKlasse}
              />
            </div>
            <div>
              <label className={labelKlasse}>Aussprache-Hinweis</label>
              <input
                name="aussprachehinweis"
                defaultValue={eintrag.aussprachehinweis ?? ""}
                className={inputKlasse}
              />
            </div>
          </div>

          <div>
            <label className={labelKlasse}>Anmerkung (öffentlich sichtbar)</label>
            <textarea
              name="anmerkung"
              defaultValue={eintrag.anmerkung ?? ""}
              rows={2}
              className={inputKlasse}
            />
          </div>

          <div>
            <label className={labelKlasse}>Interne Notiz (nur für dich)</label>
            <textarea
              name="interneNotiz"
              defaultValue={eintrag.interneNotiz ?? ""}
              rows={2}
              className={inputKlasse}
            />
          </div>

          {state.status === "fehler" && (
            <p className="text-sm text-red-700">{state.fehler}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-[var(--accent)] px-4 py-2 font-semibold text-white hover:bg-[var(--accent-dark)] disabled:opacity-60"
          >
            {isPending ? "Speichert…" : "Speichern"}
          </button>
        </form>
      </details>
    </li>
  );
}
