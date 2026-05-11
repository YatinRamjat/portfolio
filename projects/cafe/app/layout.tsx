import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Chai & Chowk | Modern Indian Café in Pune",
  description: "Artisan chai and fusion Indian street food in the heart of Koregaon Park, Pune. Experience the warm neighbourhood vibe at Chai & Chowk.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${dmSans.variable} font-sans bg-cream text-espresso antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
