"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isTurnstileConfigured, verifyTurnstileToken } from "@/lib/turnstile";
import { bearbeitungSchema, einreichungSchema } from "./validation";

export type EinreichenState = {
  status: "idle" | "erfolg" | "fehler";
  fehler?: string;
};

/**
 * Öffentliches Einreichen-Formular. Läuft ohne Login (anon-Client) - RLS
 * (siehe supabase/migrations/0001_init.sql) erlaubt nur INSERT mit
 * status = 'eingereicht', ein Umgehen der Prüfung ist von hier aus nicht
 * möglich.
 */
export async function eintragEinreichen(
  _prevState: EinreichenState,
  formData: FormData,
): Promise<EinreichenState> {
  const raw = {
    wort: formData.get("wort")?.toString() ?? "",
    uebersetzung: formData.get("uebersetzung")?.toString() ?? "",
    beispielsatz: formData.get("beispielsatz")?.toString() ?? "",
    beispielsatzUebersetzung:
      formData.get("beispielsatzUebersetzung")?.toString() ?? "",
    wortart: formData.get("wortart")?.toString() ?? "",
    aussprachehinweis: formData.get("aussprachehinweis")?.toString() ?? "",
    anmerkung: formData.get("anmerkung")?.toString() ?? "",
    eingereichtVon: formData.get("eingereichtVon")?.toString() ?? "",
    eingereichtEmail: formData.get("eingereichtEmail")?.toString() ?? "",
    turnstileToken: formData.get("cf-turnstile-response")?.toString() ?? "",
  };

  const parsed = einreichungSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "fehler",
      fehler: parsed.error.issues[0]?.message ?? "Bitte prüfe deine Eingabe.",
    };
  }

  if (isTurnstileConfigured()) {
    const headerList = await headers();
    const remoteIp = headerList.get("x-forwarded-for") ?? undefined;
    const gueltig = await verifyTurnstileToken(
      parsed.data.turnstileToken ?? "",
      remoteIp,
    );
    if (!gueltig) {
      return {
        status: "fehler",
        fehler: "Sicherheitsprüfung fehlgeschlagen. Bitte versuch's nochmal.",
      };
    }
  }

  const supabase = await createClient();
  const { error } = await supabase.from("eintraege").insert({
    wort: parsed.data.wort,
    uebersetzung: parsed.data.uebersetzung,
    beispielsatz: parsed.data.beispielsatz || null,
    beispielsatz_uebersetzung: parsed.data.beispielsatzUebersetzung || null,
    wortart: parsed.data.wortart || null,
    aussprache_hinweis: parsed.data.aussprachehinweis || null,
    anmerkung: parsed.data.anmerkung || null,
    eingereicht_von: parsed.data.eingereichtVon || null,
    eingereicht_email: parsed.data.eingereichtEmail || null,
  });

  if (error) {
    console.error("eintragEinreichen: Insert fehlgeschlagen", error);
    return {
      status: "fehler",
      fehler: "Da ist leider etwas schiefgelaufen. Bitte versuch's nochmal.",
    };
  }

  return { status: "erfolg" };
}

/**
 * Admin-Aktionen unten laufen ausschließlich über Routen unter /admin -
 * dort greift proxy.ts (checkAdminBasicAuth) vor jedem Request, auch vor
 * Server-Action-Aufrufen von dieser Seite aus. Der service_role-Key
 * umgeht bewusst die RLS-Policies (Admin muss auch nicht-freigegebene
 * Einträge sehen/bearbeiten können).
 */

export async function eintragFreigeben(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("eintraege")
    .update({ status: "freigegeben" })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function eintragAblehnen(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("eintraege")
    .update({ status: "abgelehnt" })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/admin");
}

export async function eintragZurueckstellen(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("eintraege")
    .update({ status: "eingereicht" })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/admin");
  revalidatePath("/");
}

export type BearbeitenState = {
  status: "idle" | "erfolg" | "fehler";
  fehler?: string;
};

export async function eintragBearbeiten(
  _prevState: BearbeitenState,
  formData: FormData,
): Promise<BearbeitenState> {
  const raw = {
    id: formData.get("id")?.toString() ?? "",
    wort: formData.get("wort")?.toString() ?? "",
    uebersetzung: formData.get("uebersetzung")?.toString() ?? "",
    beispielsatz: formData.get("beispielsatz")?.toString() ?? "",
    beispielsatzUebersetzung:
      formData.get("beispielsatzUebersetzung")?.toString() ?? "",
    wortart: formData.get("wortart")?.toString() ?? "",
    aussprachehinweis: formData.get("aussprachehinweis")?.toString() ?? "",
    anmerkung: formData.get("anmerkung")?.toString() ?? "",
    interneNotiz: formData.get("interneNotiz")?.toString() ?? "",
  };

  const parsed = bearbeitungSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "fehler",
      fehler: parsed.error.issues[0]?.message ?? "Bitte prüfe deine Eingabe.",
    };
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("eintraege")
    .update({
      wort: parsed.data.wort,
      uebersetzung: parsed.data.uebersetzung,
      beispielsatz: parsed.data.beispielsatz || null,
      beispielsatz_uebersetzung: parsed.data.beispielsatzUebersetzung || null,
      wortart: parsed.data.wortart || null,
      aussprache_hinweis: parsed.data.aussprachehinweis || null,
      anmerkung: parsed.data.anmerkung || null,
      interne_notiz: parsed.data.interneNotiz || null,
    })
    .eq("id", parsed.data.id);

  if (error) {
    console.error("eintragBearbeiten: Update fehlgeschlagen", error);
    return {
      status: "fehler",
      fehler: "Da ist leider etwas schiefgelaufen. Bitte versuch's nochmal.",
    };
  }

  revalidatePath("/admin");
  revalidatePath("/");
  return { status: "erfolg" };
}
