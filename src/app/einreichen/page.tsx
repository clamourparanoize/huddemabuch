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
        <section className="mx-auto max-w-[1080px] px-[18px] pb-6 pt-12 sm:px-6 lg:px-8">
          <p className="font-display inline-block bg-[#111] px-3 py-0.5 text-lg font-semibold tracking-[0.14em] text-[var(--green)] uppercase">
            Mitmachen
          </p>
          <h1 className="font-display mt-4 max-w-[760px] text-[48px] leading-[1.02] font-extrabold sm:text-[68px]">
            Kennsch noch ä Wort?
          </h1>
          <div className="mt-5 h-[6px] w-28 bg-[var(--green)]" />
          <p className="mt-6 max-w-[680px] text-xl leading-[1.45] font-medium">
            Hilf mit, den Huttenheimer Dialekt zu bewahren. Trag ein Wort,
            eine Redewendung oder einen Ausdruck ein, den wir noch nicht im
            Huddemabuch haben.
          </p>
        </section>

        {turnstileSiteKey && (
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
            async
            defer
          />
        )}

        <section className="mx-auto max-w-[1080px] px-[18px] pb-16 pt-6 sm:px-6 lg:px-8">
          <div className="max-w-[720px]">
            <EinreichenFormular turnstileSiteKey={turnstileSiteKey} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
