import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--olive)] text-white">
      <div className="mx-auto flex max-w-[1080px] flex-col gap-6 px-[18px] py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p className="font-display text-[26px] font-extrabold tracking-[0.04em] text-[var(--green)]">
          HUDDEMABUCH
        </p>

        <nav className="flex flex-wrap gap-x-7 gap-y-2 text-[16px]">
          <Link href="/" className="transition-colors hover:text-[var(--green)]">
            Wörterbuch
          </Link>
          <Link
            href="/einreichen"
            className="transition-colors hover:text-[var(--green)]"
          >
            Wort beisteuern
          </Link>
          <Link
            href="/impressum"
            className="transition-colors hover:text-[var(--green)]"
          >
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            className="transition-colors hover:text-[var(--green)]"
          >
            Datenschutz
          </Link>
        </nav>
      </div>
    </footer>
  );
}
