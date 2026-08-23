"use client";

import { useActionState } from "react";

import { WORTARTEN } from "@/lib/dictionary/types";
import {
  eintragEinreichen,
  type EinreichenState,
} from "@/lib/dictionary/actions";

const anfangsZustand: EinreichenState = { status: "idle" };

const feldKlasse =
  "h-[52px] w-full rounded-[7px] border border-[var(--border)] bg-white px-4 text-base outline-none transition-colors duration-150 focus:border-[var(--accent)]";
const textareaKlasse =
  "w-full rounded-[7px] border border-[var(--border)] bg-white px-4 py-3 text-base outline-none transition-colors duration-150 focus:border-[var(--accent)]";

function Feld({
  label,
  hinweis,
  htmlFor,
  children,
}: {
  label: string;
  hinweis?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block">
        <span className="text-[15px] font-semibold">{label}</span>
        {hinweis && (
          <span className="mt-0.5 block text-sm text-[var(--muted)]">
            {hinweis}
          </span>
        )}
      </label>
      <div className="mt-[7px]">{children}</div>
    </div>
  );
}

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
      <div className="border-t border-[var(--border)] pt-8">
        <p className="font-serif-display text-3xl font-semibold text-[var(--accent)]">
          Dank schee!
        </p>
        <p className="mt-3 text-lg">Dein Wort ist bei uns angekommen.</p>
        <p className="mt-1 text-[15px] text-[var(--muted)]">
          Nach einer kurzen Prüfung erscheint es im Huddemabuch.
        </p>
        <a
          href="/einreichen"
          className="mt-6 inline-block text-[15px] font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
        >
          Noch ein Wort beisteuern
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <Feld
        label="Dialektwort *"
        hinweis="Wie sagt man es in Huttenheim?"
        htmlFor="wort"
      >
        <input
          id="wort"
          name="wort"
          required
          maxLength={200}
          placeholder="z. B. Gschwelldi"
          className={feldKlasse}
        />
      </Feld>

      <Feld
        label="Bedeutung *"
        hinweis="Was bedeutet das Wort auf Hochdeutsch?"
        htmlFor="uebersetzung"
      >
        <input
          id="uebersetzung"
          name="uebersetzung"
          required
          maxLength={500}
          placeholder="z. B. Pellkartoffel"
          className={feldKlasse}
        />
      </Feld>

      <Feld
        label="Aussprache"
        hinweis="Wie spricht man es ungefähr aus?"
        htmlFor="aussprachehinweis"
      >
        <input
          id="aussprachehinweis"
          name="aussprachehinweis"
          maxLength={300}
          placeholder="Schreib es so, wie es klingt"
          className={feldKlasse}
        />
      </Feld>

      <Feld label="Wortart" htmlFor="wortart">
        <select id="wortart" name="wortart" defaultValue="" className={feldKlasse}>
          <option value="">Keine Angabe</option>
          {WORTARTEN.map((wortart) => (
            <option key={wortart} value={wortart}>
              {wortart}
            </option>
          ))}
        </select>
      </Feld>

      <Feld label="Beispielsatz im Dialekt" htmlFor="beispielsatz">
        <textarea
          id="beispielsatz"
          name="beispielsatz"
          maxLength={1000}
          rows={2}
          placeholder="z. B. Gibt's heit Gschwelldi mit Quark?"
          className={textareaKlasse}
        />
      </Feld>

      <Feld
        label="Übersetzung des Beispielsatzes"
        htmlFor="beispielsatzUebersetzung"
      >
        <textarea
          id="beispielsatzUebersetzung"
          name="beispielsatzUebersetzung"
          maxLength={1000}
          rows={2}
          placeholder="z. B. Gibt es heute Pellkartoffeln mit Quark?"
          className={textareaKlasse}
        />
      </Feld>

      <Feld label="Sonstige Anmerkung" htmlFor="anmerkung">
        <textarea
          id="anmerkung"
          name="anmerkung"
          maxLength={1000}
          rows={2}
          placeholder="z. B. woher das Wort kommt, wer es noch benutzt…"
          className={textareaKlasse}
        />
      </Feld>

      <Feld label="Dein Name" hinweis="Optional" htmlFor="eingereichtVon">
        <input
          id="eingereichtVon"
          name="eingereichtVon"
          maxLength={200}
          placeholder="Darf auch leer bleiben"
          className={feldKlasse}
        />
      </Feld>

      <div>
        <Feld label="E-Mail" hinweis="Optional" htmlFor="eingereichtEmail">
          <input
            id="eingereichtEmail"
            name="eingereichtEmail"
            type="email"
            maxLength={200}
            placeholder="Darf auch leer bleiben"
            className={feldKlasse}
          />
        </Feld>
        <p className="mt-2 text-[13px] text-[var(--muted)]">
          Deine E-Mail-Adresse wird nicht veröffentlicht.
        </p>
      </div>

      {turnstileSiteKey && (
        <div
          className="cf-turnstile"
          data-sitekey={turnstileSiteKey}
          data-language="de"
        />
      )}

      {state.status === "fehler" && (
        <p className="rounded-[7px] bg-red-50 p-4 text-[15px] text-red-800">
          {state.fehler}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-[var(--accent)] px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[var(--accent-dark)] disabled:opacity-60"
      >
        {isPending ? "Wird gesendet…" : "Wort einreichen"}
      </button>
    </form>
  );
}
