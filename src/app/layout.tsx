import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Huttenheimer Wörterbuch",
  description:
    "Wörter und Ausdrücke aus dem Huttenheimer Dialekt - gesammelt, damit sie nicht verloren gehen.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
