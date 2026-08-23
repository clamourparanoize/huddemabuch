import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import type { Database } from "./types";

/**
 * Supabase-Client mit dem service_role-Key - umgeht bewusst alle
 * RLS-Policies. Ausschließlich für den Admin-Bereich (/admin) nutzen,
 * und dort erst NACHDEM checkAdminBasicAuth() (siehe src/lib/basic-auth.ts)
 * die Anfrage freigegeben hat. Niemals in Client Components importieren.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Supabase-Admin-Client: NEXT_PUBLIC_SUPABASE_URL oder " +
        "SUPABASE_SERVICE_ROLE_KEY fehlt in .env.local.",
    );
  }

  return createSupabaseClient<Database>(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
