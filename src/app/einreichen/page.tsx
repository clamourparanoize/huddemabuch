import Script from "next/script";

import { SiteHeader } from "@/components/site-header";
import { EinreichenFormular } from "./einreichen-formular";

export default function EinreichenSeite() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="mb-2 text-3xl font-bold">Ein Wort beisteuern</h1>
        <p className="mb-10 text-lg text-[var(--muted)]">
          Nur die ersten beiden Felder sind Pflicht. Alles Weitere ist
          freiwillig - lieber ein kurzer Eintrag als gar keiner!
        </p>
        {turnstileSiteKey && (
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
            async
            defer
          />
        )}
        <EinreichenFormular turnstileSiteKey={turnstileSiteKey} />
      </main>
    </div>
  );
}
