import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AIAssistant } from "@/components/ai/AIAssistant";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://studiofurniture.demo"),
  title: {
    default: "STUDIO — Minimalist Furniture & Home Essentials",
    template: "%s | STUDIO Furniture",
  },
  description: "Discover curated, minimalist furniture and home essentials designed for modern living. Featuring AI-powered shopping assistance and personalized recommendations.",
  keywords: [
    "furniture",
    "minimalist furniture",
    "modern furniture",
    "home decor",
    "interior design",
    "AI shopping assistant",
    "contemporary furniture",
    "designer furniture",
    "sustainable furniture",
  ],
  authors: [{ name: "STUDIO Furniture" }],
  creator: "STUDIO Furniture",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://studiofurniture.demo",
    siteName: "STUDIO Furniture",
    title: "STUDIO — Minimalist Furniture & Home Essentials",
    description: "Discover curated, minimalist furniture and home essentials designed for modern living.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "STUDIO Furniture - Minimalist Furniture for Modern Living",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "STUDIO — Minimalist Furniture & Home Essentials",
    description: "Discover curated, minimalist furniture and home essentials designed for modern living.",
    images: ["/og-image.jpg"],
    creator: "@studiofurniture",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

import { WebVitals } from "./web-vitals";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body className="antialiased">
        {process.env.NODE_ENV === 'development' && <WebVitals />}
        {children}
        <AIAssistant />
        <Toaster />
      </body>
    </html>
  );
}
