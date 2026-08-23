import Script from "next/script";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { EinreichenFormular } from "./einreichen-formular";

export default function EinreichenSeite() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="border-b border-[var(--border)]">
          <div className="mx-auto max-w-[1080px] px-[18px] pb-10 pt-14 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold tracking-[0.14em] text-[var(--accent)]">
              MITMACHEN
            </p>
            <h1 className="font-serif-display mt-4 max-w-[700px] text-[38px] font-semibold leading-[1.1] sm:text-5xl">
              Kennschd noch ä Wort?
            </h1>
            <p className="mt-5 max-w-[680px] text-lg text-[var(--muted)]">
              Hilf mit, den Huttenheimer Dialekt zu bewahren. Trag ein Wort,
              eine Redewendung oder einen Ausdruck ein, den wir noch nicht im
              Huddemabuch haben.
            </p>
          </div>
        </section>

        {turnstileSiteKey && (
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
            async
            defer
          />
        )}

        <section className="mx-auto max-w-[700px] px-[18px] py-12 sm:px-6 lg:px-8">
          <EinreichenFormular turnstileSiteKey={turnstileSiteKey} />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
