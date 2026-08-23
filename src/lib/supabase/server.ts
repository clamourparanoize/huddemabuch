import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import type { Database } from "./types";

/**
 * Supabase-Client (anon-Key) für Server Components und Server Actions.
 * Unterliegt den RLS-Policies wie ein normaler Besucher - sieht also
 * z. B. nur freigegebene Einträge (siehe supabase/migrations/0001_init.sql).
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Aufruf aus einer Server Component ohne Schreibrechte auf
            // Cookies - unkritisch, es gibt hier keine Login-Session,
            // die erneuert werden müsste.
          }
        },
      },
    },
  );
}
