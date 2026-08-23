import { z } from "zod";

/**
 * Bewusst großzügig (max-Längen statt strenger Formate) - die
 * Zielgruppe des Formulars sind ältere, wenig technikaffine Personen,
 * die Fehlermeldungen sollen die absolute Ausnahme sein, nicht die Regel.
 */
export const einreichungSchema = z.object({
  wort: z.string().trim().min(1, "Bitte trag ein Wort ein.").max(200),
  uebersetzung: z
    .string()
    .trim()
    .min(1, "Bitte trag eine Übersetzung ein.")
    .max(500),
  beispielsatz: z.string().trim().max(1000).optional().or(z.literal("")),
  beispielsatzUebersetzung: z
    .string()
    .trim()
    .max(1000)
    .optional()
    .or(z.literal("")),
  wortart: z.string().trim().max(50).optional().or(z.literal("")),
  aussprachehinweis: z.string().trim().max(300).optional().or(z.literal("")),
  anmerkung: z.string().trim().max(1000).optional().or(z.literal("")),
  eingereichtVon: z.string().trim().max(200).optional().or(z.literal("")),
  turnstileToken: z.string().optional().or(z.literal("")),
});

export type EinreichungInput = z.infer<typeof einreichungSchema>;

export const bearbeitungSchema = z.object({
  id: z.string().uuid(),
  wort: z.string().trim().min(1).max(200),
  uebersetzung: z.string().trim().min(1).max(500),
  beispielsatz: z.string().trim().max(1000).optional().or(z.literal("")),
  beispielsatzUebersetzung: z
    .string()
    .trim()
    .max(1000)
    .optional()
    .or(z.literal("")),
  wortart: z.string().trim().max(50).optional().or(z.literal("")),
  aussprachehinweis: z.string().trim().max(300).optional().or(z.literal("")),
  anmerkung: z.string().trim().max(1000).optional().or(z.literal("")),
  interneNotiz: z.string().trim().max(1000).optional().or(z.literal("")),
});
