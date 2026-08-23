/**
 * Handgeschriebene Datenbanktypen für Phase 1.
 *
 * Sobald das echte Supabase-Projekt existiert, können diese Typen durch
 * generierte Typen ersetzt werden:
 *
 *   npx supabase gen types typescript --project-id <projekt-id> > src/lib/supabase/types.ts
 *
 * Bis dahin wird dieses Modell manuell parallel zur Migration unter
 * `supabase/migrations` gepflegt.
 */

export type EintragStatus = "eingereicht" | "freigegeben" | "abgelehnt";

export type Database = {
  public: {
    Tables: {
      eintraege: {
        Row: {
          id: string;
          wort: string;
          uebersetzung: string;
          beispielsatz: string | null;
          beispielsatz_uebersetzung: string | null;
          wortart: string | null;
          aussprache_hinweis: string | null;
          anmerkung: string | null;
          eingereicht_von: string | null;
          eingereicht_email: string | null;
          status: EintragStatus;
          interne_notiz: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          wort: string;
          uebersetzung: string;
          beispielsatz?: string | null;
          beispielsatz_uebersetzung?: string | null;
          wortart?: string | null;
          aussprache_hinweis?: string | null;
          anmerkung?: string | null;
          eingereicht_von?: string | null;
          eingereicht_email?: string | null;
          status?: EintragStatus;
          interne_notiz?: string | null;
        };
        Update: {
          wort?: string;
          uebersetzung?: string;
          beispielsatz?: string | null;
          beispielsatz_uebersetzung?: string | null;
          wortart?: string | null;
          aussprache_hinweis?: string | null;
          anmerkung?: string | null;
          eingereicht_von?: string | null;
          eingereicht_email?: string | null;
          status?: EintragStatus;
          interne_notiz?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
