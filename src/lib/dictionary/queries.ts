import "server-only";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Database, EintragStatus } from "@/lib/supabase/types";
import type { Eintrag } from "./types";

type Row = Database["public"]["Tables"]["eintraege"]["Row"];

function mapRow(row: Row): Eintrag {
  return {
    id: row.id,
    wort: row.wort,
    uebersetzung: row.uebersetzung,
    beispielsatz: row.beispielsatz,
    beispielsatzUebersetzung: row.beispielsatz_uebersetzung,
    wortart: row.wortart,
    aussprachehinweis: row.aussprache_hinweis,
    anmerkung: row.anmerkung,
    eingereichtVon: row.eingereicht_von,
    status: row.status,
    interneNotiz: row.interne_notiz,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/** Öffentliche Liste - nur freigegebene Einträge (RLS erzwingt das ohnehin, siehe Migration). */
export async function getFreigegebeneEintraege(suche?: string) {
  const supabase = await createClient();
  let query = supabase
    .from("eintraege")
    .select("*")
    .eq("status", "freigegeben")
    .order("wort", { ascending: true });

  if (suche && suche.trim()) {
    const term = suche.trim();
    query = query.or(
      `wort.ilike.%${term}%,uebersetzung.ilike.%${term}%,beispielsatz.ilike.%${term}%`,
    );
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(mapRow);
}

/** Admin: Einträge nach Status, standardmäßig die wartenden zuerst. */
export async function getEintraegeFuerAdmin(status?: EintragStatus) {
  const supabase = createAdminClient();
  let query = supabase
    .from("eintraege")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(mapRow);
}
