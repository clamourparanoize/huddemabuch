import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="bg-[var(--olive)] text-white">
      <div className="mx-auto flex h-[68px] max-w-[1080px] items-center justify-between gap-4 px-[18px] sm:px-6 md:h-[76px] lg:px-8">
        <Link href="/" className="flex items-center gap-4">
          <span className="font-display rounded-md border-[3px] border-white bg-[var(--green)] px-3 py-0.5 text-[19px] leading-[1.15] sm:text-[24px] font-extrabold tracking-[0.02em] text-[#111] md:text-[28px]">
            HUDDEMABUCH
          </span>
          <span className="hidden text-[15px] text-[#d9ddcc] lg:inline">
            Wörterbuch für Huttenheim
          </span>
        </Link>

        <nav className="font-display flex items-center gap-6 text-[20px] font-semibold tracking-[0.06em] uppercase md:gap-9">
          <Link
            href="/"
            className="hidden transition-colors hover:text-[var(--green)] sm:inline"
          >
            Wörterbuch
          </Link>
          <Link
            href="/einreichen"
            className="whitespace-nowrap rounded bg-[var(--green)] px-3 py-2 text-[17px] font-bold sm:px-4 sm:text-[20px] text-[#111] transition-colors hover:bg-white md:px-5"
          >
            Wort beisteuern
          </Link>
        </nav>
      </div>
    </header>
  );
}
