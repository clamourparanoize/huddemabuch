import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";

import "./globals.css";

/**
 * Barlow (Fließtext/UI) und Barlow Condensed (Überschriften, Dialektwörter)
 * - angelehnt an die Schriften deutscher Verkehrs- und Ortsschilder. next/font
 * lädt/hostet beide zur Build-Zeit selbst, keine Laufzeit-Anfrage an Google.
 */
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
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
    <html lang="de" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body>{children}</body>
    </html>
  );
}
