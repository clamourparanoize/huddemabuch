"use client";

import { useActionState } from "react";

import { WORTARTEN } from "@/lib/dictionary/types";
import {
  eintragEinreichen,
  type EinreichenState,
} from "@/lib/dictionary/actions";

const anfangsZustand: EinreichenState = { status: "idle" };

const feldKlasse =
  "h-[54px] w-full border-[3px] border-[#111] bg-white px-4 text-lg outline-none focus:shadow-[0_0_0_4px_var(--green)]";
const textareaKlasse =
  "w-full border-[3px] border-[#111] bg-white px-4 py-3 text-lg outline-none focus:shadow-[0_0_0_4px_var(--green)]";

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
        <span className="font-display text-[22px] font-bold tracking-[0.04em] uppercase">
          {label}
        </span>
        {hinweis && (
          <span className="block text-[15px] text-[var(--muted)]">
            {hinweis}
          </span>
        )}
      </label>
      <div className="mt-2">{children}</div>
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
      <div className="border-l-[10px] border-[var(--green)] py-1 pl-6">
        <p className="font-display text-5xl font-extrabold">Dank schee!</p>
        <p className="mt-3 text-2xl font-semibold">
          Dein Wort ist bei uns angekommen.
        </p>
        <p className="mt-1 text-[17px] text-[var(--muted)]">
          Nach einer kurzen Prüfung erscheint es im Huddemabuch.
        </p>
        <a
          href="/einreichen"
          className="font-display mt-6 inline-block border-b-[5px] border-[var(--green)] pb-0.5 text-xl font-bold tracking-[0.05em] uppercase transition-colors hover:border-[#111]"
        >
          Noch ein Wort beisteuern
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-7">
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
        <p className="mt-2 text-[14px] text-[var(--muted)]">
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
        <p className="border-[3px] border-red-700 bg-red-50 p-4 text-[16px] font-medium text-red-900">
          {state.fehler}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="font-display h-[58px] border-[3px] border-[#111] bg-[var(--green)] px-10 text-2xl font-extrabold tracking-[0.08em] text-[#111] uppercase transition-colors hover:bg-[#111] hover:text-[var(--green)] disabled:opacity-60"
      >
        {isPending ? "Wird gesendet…" : "Wort einreichen"}
      </button>
    </form>
  );
}
