import type { Metadata } from "next";
import { Nunito_Sans, Sora } from "next/font/google";
import "./globals.css";

const fontBody = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const fontDisplay = Sora({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vecino",
  description: "Marketplace hiperlocal Vecino",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${fontBody.variable} ${fontDisplay.variable}`}>
      <body className="min-h-screen bg-vecino-bg text-vecino-text">{children}</body>
    </html>
  );
}
