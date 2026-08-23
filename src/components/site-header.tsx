import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--card)]">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        <Link href="/" className="text-2xl font-bold text-[var(--accent)]">
          Huttenheimer Wörterbuch
        </Link>
        <Link
          href="/einreichen"
          className="rounded-lg bg-[var(--accent)] px-5 py-3 text-lg font-semibold text-white hover:bg-[var(--accent-dark)]"
        >
          Wort beisteuern
        </Link>
      </div>
    </header>
  );
}
