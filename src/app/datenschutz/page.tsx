import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function DatenschutzSeite() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-[700px] flex-1 px-[18px] py-16 sm:px-6 lg:px-8">
        <h1 className="font-serif-display text-3xl font-semibold">
          Datenschutz
        </h1>
        <p className="mt-6 text-[var(--muted)]">
          Hier trägst du deine Datenschutzerklärung ein (u. a. zur
          Verarbeitung der beim Einreichen-Formular angegebenen Daten) -
          Platzhalter, noch nicht final ausgefüllt.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
