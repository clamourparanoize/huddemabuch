import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="bg-[var(--olive)] text-white">
      <div className="mx-auto flex h-[68px] max-w-[1080px] items-center justify-between gap-4 px-[18px] sm:px-6 md:h-[76px] lg:px-8">
        <Link href="/" className="flex items-center gap-3 md:gap-4">
          <Image
            src="/logo.webp"
            alt="So schwätzt ma in Huddene"
            width={1920}
            height={1080}
            priority
            sizes="100px"
            className="h-[42px] w-auto md:h-[52px]"
          />
          <span className="font-display text-[22px] leading-none font-extrabold tracking-[0.03em] md:text-[28px]">
            HUDDEMABUCH
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
