import type { Metadata } from "next";
import { Playfair_Display, Caveat, Work_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const workSans = Work_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Kind Notes — Magazines vol herinneringen",
  description:
    "Kind Notes maakt gepersonaliseerde magazines, kaarten en fotoboeken voor speciale gelegenheden. Begin met het Birthday Magazine: jouw foto's en boodschappen, opgemaakt als een echt tijdschrift.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${playfair.variable} ${caveat.variable} ${workSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
