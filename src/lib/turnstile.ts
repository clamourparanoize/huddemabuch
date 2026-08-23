/**
 * Cloudflare Turnstile - Bot-Schutz für das öffentliche Einreichen-
 * Formular (siehe src/lib/dictionary/actions.ts). Läuft nur serverseitig
 * (Secret Key darf nie in den Browser).
 *
 * Fehlt `TURNSTILE_SECRET_KEY`, wird die Prüfung übersprungen - lokal
 * ohne echte Keys testbar. WICHTIG: ohne gesetzten Key hat das Formular
 * in Produktion KEINEN Bot-Schutz - der Key sollte vor dem Teilen des
 * Links breit gesetzt sein.
 */
export function isTurnstileConfigured(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string,
): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) return true;
  if (!token) return false;

  const body = new URLSearchParams({ secret: secretKey, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body },
    );
    if (!response.ok) return false;
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    // Cloudflare nicht erreichbar - im Zweifel ablehnen statt ein
    // kaputtes Formular als "bestanden" durchzulassen.
    return false;
  }
}
