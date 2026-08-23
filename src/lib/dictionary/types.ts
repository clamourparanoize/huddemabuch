import type { EintragStatus } from "@/lib/supabase/types";

export type { EintragStatus };

export type Eintrag = {
  id: string;
  wort: string;
  uebersetzung: string;
  beispielsatz: string | null;
  beispielsatzUebersetzung: string | null;
  wortart: string | null;
  aussprachehinweis: string | null;
  anmerkung: string | null;
  eingereichtVon: string | null;
  eingereichtEmail: string | null;
  status: EintragStatus;
  interneNotiz: string | null;
  createdAt: string;
  updatedAt: string;
};

export const WORTARTEN = [
  "Nomen",
  "Verb",
  "Adjektiv",
  "Redewendung",
  "Ausdruck",
  "Sonstiges",
] as const;
