import type { Metadata } from "next";
import { Fraunces } from "next/font/google";

import "./globals.css";

/**
 * Serifenschrift ausschließlich für die großen Dialektwörter und die
 * Buchstaben-Abschnittsüberschriften (siehe Design-Vorgabe "Duden +
 * Dorfchronik") - überall sonst (UI, Navigation, Fließtext) bleibt der
 * System-Sans-Stack in globals.css, keine zusätzliche Abhängigkeit
 * nötig. next/font lädt/hostet die Schrift selbst zur Build-Zeit, keine
 * Laufzeit-Anfrage an Google.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Huddemabuch – Huttenheimer Wörterbuch",
  description:
    "Wörter und Ausdrücke aus dem Huttenheimer Dialekt - gesammelt, damit sie nicht verloren gehen.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={fraunces.variable}>
      <body>{children}</body>
    </html>
  );
}
