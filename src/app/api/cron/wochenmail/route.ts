import { NextResponse } from "next/server";

import { getEintraegeFuerAdmin } from "@/lib/dictionary/queries";

export const dynamic = "force-dynamic";

const MAX_IN_MAIL = 20;

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/**
 * Wöchentliche Zusammenfassung der noch ungeprüften Einträge per Mail.
 * Wird von Vercel Cron aufgerufen (siehe vercel.json), Vercel sendet dabei
 * automatisch "Authorization: Bearer <CRON_SECRET>". Ohne passendes Secret
 * antwortet die Route mit 401 - sie ist öffentlich erreichbar, darf aber
 * nur durch den Cron ausgelöst werden.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new NextResponse("Nicht erlaubt.", { status: 401 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const empfaenger = process.env.ADMIN_NOTIFY_EMAIL;
  if (!apiKey || !empfaenger) {
    return NextResponse.json(
      { ok: false, grund: "RESEND_API_KEY oder ADMIN_NOTIFY_EMAIL fehlt." },
      { status: 500 },
    );
  }

  const wartend = await getEintraegeFuerAdmin("eingereicht");
  if (wartend.length === 0) {
    return NextResponse.json({ ok: true, gesendet: false });
  }

  const absender =
    process.env.MAIL_FROM ?? "Huddemabuch <onboarding@resend.dev>";
  const adminUrl = `${process.env.SITE_URL ?? "https://mundart.huddene.de"}/admin`;

  const sichtbar = wartend.slice(0, MAX_IN_MAIL);
  const weitere = wartend.length - sichtbar.length;
  const anzahlText =
    wartend.length === 1
      ? "1 Eintrag wartet"
      : `${wartend.length} Einträge warten`;

  const text = [
    `${anzahlText} im Huddemabuch auf Prüfung:`,
    "",
    ...sichtbar.map((e) => `- ${e.wort}: ${e.uebersetzung}`),
    ...(weitere > 0 ? [`... und ${weitere} weitere`] : []),
    "",
    `Zur Prüfung: ${adminUrl}`,
  ].join("\n");

  const html = `<p>${escapeHtml(anzahlText)} im Huddemabuch auf Prüfung:</p>
<ul>${sichtbar
    .map(
      (e) =>
        `<li><strong>${escapeHtml(e.wort)}</strong>: ${escapeHtml(e.uebersetzung)}</li>`,
    )
    .join("")}</ul>${weitere > 0 ? `<p>… und ${weitere} weitere</p>` : ""}
<p><a href="${adminUrl}">Zur Prüfung</a></p>`;

  const antwort = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: absender,
      to: [empfaenger],
      subject: `Huddemabuch: ${anzahlText} auf Prüfung`,
      text,
      html,
    }),
  });

  if (!antwort.ok) {
    console.error("wochenmail: Resend-Fehler", antwort.status);
    return NextResponse.json({ ok: false, grund: "Mailversand fehlgeschlagen." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, gesendet: true, anzahl: wartend.length });
}
