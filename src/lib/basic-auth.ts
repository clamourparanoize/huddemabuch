import type { NextRequest } from "next/server";

/**
 * Zugriffsschutz für den Admin-Bereich (/admin) per HTTP Basic Auth.
 * Bewusst simpel gehalten (ein gemeinsames Passwort, kein Nutzerverwaltung)
 * - es gibt nur einen Prüfer. Greift nur, wenn beide Umgebungsvariablen
 * gesetzt sind (siehe .env.local.example). Ohne gesetzte Werte ist der
 * Admin-Bereich UNGESCHÜTZT - vor dem Live-Gang unbedingt setzen.
 */
function getAdminCredentials(): { user: string; password: string } | null {
  const user = process.env.ADMIN_BASIC_AUTH_USER;
  const password = process.env.ADMIN_BASIC_AUTH_PASSWORD;

  if (!user || !password) return null;
  return { user, password };
}

const UNAUTHORIZED_RESPONSE = new Response("Zugriff geschützt.", {
  status: 401,
  headers: {
    "WWW-Authenticate":
      'Basic realm="Huttenheimer Woerterbuch Admin", charset="UTF-8"',
  },
});

/** Gibt eine 401-Response zurück, wenn die Basic-Auth fehlt/falsch ist - sonst null. */
export function checkAdminBasicAuth(request: NextRequest): Response | null {
  const credentials = getAdminCredentials();
  if (!credentials) return null;

  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) {
    return UNAUTHORIZED_RESPONSE;
  }

  const decoded = atob(header.slice("Basic ".length));
  const separatorIndex = decoded.indexOf(":");
  const user = decoded.slice(0, separatorIndex);
  const password = decoded.slice(separatorIndex + 1);

  if (user !== credentials.user || password !== credentials.password) {
    return UNAUTHORIZED_RESPONSE;
  }

  return null;
}
