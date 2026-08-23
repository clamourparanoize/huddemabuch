import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto flex max-w-[1080px] flex-col gap-6 px-[18px] py-10 sm:px-6 sm:py-12 md:flex-row md:items-start md:justify-between lg:px-8">
        <div>
          <p className="text-lg font-bold tracking-tight">HUDDEMABUCH</p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Das Huttenheimer Wörterbuch.
          </p>
          <p className="text-sm text-[var(--muted)]">
            Ein Projekt zum Erhalt unseres Dialekts.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link
            href="/"
            className="text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
          >
            Wörterbuch
          </Link>
          <Link
            href="/einreichen"
            className="text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
          >
            Wort beisteuern
          </Link>
          <Link
            href="/impressum"
            className="text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
          >
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            className="text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
          >
            Datenschutz
          </Link>
        </nav>
      </div>
    </footer>
  );
}
