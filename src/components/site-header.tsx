import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--background)]">
      <div className="mx-auto flex h-[72px] max-w-[1080px] items-center justify-between gap-6 px-[18px] sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" className="group leading-none">
          <span className="block text-xl font-bold tracking-tight text-[var(--foreground)] lg:text-2xl">
            HUDDEMABUCH
          </span>
          <span className="mt-0.5 block text-[11px] tracking-wide text-[var(--muted)] lg:text-xs">
            Huttenheimer Wörterbuch
          </span>
        </Link>

        <nav className="flex items-center gap-5 lg:gap-8">
          <Link
            href="/"
            className="hidden text-[15px] font-medium text-[var(--foreground)] transition-colors hover:text-[var(--accent)] sm:inline"
          >
            Wörterbuch
          </Link>
          <Link
            href="/einreichen"
            className="rounded-md bg-[var(--accent)] px-[18px] py-[11px] text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-dark)] sm:px-5"
          >
            Wort beisteuern
          </Link>
        </nav>
      </div>
    </header>
  );
}
