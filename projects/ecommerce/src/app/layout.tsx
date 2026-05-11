import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ThreadsWala — Desi Style, Delivered Fast",
    template: "%s | ThreadsWala",
  },
  description:
    "Shop premium Indian ethnic and fusion clothing for men and women. Kurtas, sarees, lehengas, sherwanis & more. Free shipping above ₹999.",
  keywords: [
    "Indian clothing",
    "ethnic wear",
    "kurta",
    "saree",
    "lehenga",
    "sherwani",
    "fusion wear",
    "ThreadsWala",
  ],
  openGraph: {
    title: "ThreadsWala — Desi Style, Delivered Fast",
    description:
      "Shop premium Indian ethnic and fusion clothing for men and women.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col font-sans"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1C1C1C",
              color: "#FFF8F0",
              borderRadius: "12px",
              padding: "12px 20px",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#FF6B35",
                secondary: "#FFF8F0",
              },
            },
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
