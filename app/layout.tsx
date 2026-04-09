import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { logos } from "@/content/images";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";
import { Preloader } from "@/components/ui/Preloader";
import "./globals.css";

const italiana = localFont({
  src: "../public/fonts/Italiana-Regular.woff2",
  weight: "400",
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const cormorantGaramond = localFont({
  src: [
    {
      path: "../public/fonts/CormorantGaramond-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/CormorantGaramond-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/CormorantGaramond-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/CormorantGaramond-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/CormorantGaramond-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/CormorantGaramond-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-serif",
  display: "swap",
  preload: false,
});

const inter = localFont({
  src: [
    {
      path: "../public/fonts/Inter-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skyluxxe.ae"),
  title: {
    default: "Skyluxxe Concierge Travel",
    template: "%s — Skyluxxe Concierge Travel",
  },
  description:
    "The Art of Invisible Service. Abu Dhabi-based ultra-luxury concierge travel for the world's most discerning individuals.",
  icons: {
    icon: logos.monogramRoseGold,
    shortcut: logos.monogramRoseGold,
    apple: logos.monogramRoseGold,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${italiana.variable} ${cormorantGaramond.variable} ${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="font-body bg-midnight-aviation-navy text-off-white" suppressHydrationWarning>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Preloader />
        <SmoothScroll>
          <Cursor />
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
