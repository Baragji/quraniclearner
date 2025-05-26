 // app/layout.tsx
import type React from "react";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Indlæs arabisk font
const scheherazade = localFont({
  src: [
    {
      path: "../public/fonts/ScheherazadeNew-Regular.ttf", // Sti til regular font
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ScheherazadeNew-Bold.ttf",   // Sti til bold font
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "أتعلم العربية | Ata'allam al-Arabiya | Lær Arabisk",
  description: "En avanceret læringsplatform til at lære arabisk og Quran",
  manifest: "/manifest.json", // Sørg for at denne fil findes i /public
  themeColor: "#047857", // Emerald-700 farve
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Quranic Arabic Trainer",
  },
  formatDetection: {
    telephone: false,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  // generator: "v0.dev", // Kan fjernes hvis ikke relevant
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="da"
      dir="ltr"
      suppressHydrationWarning // Nyttig for at undgå hydration fejl med server-renderet indhold og client-side logik som temaer
      className={`${inter.variable} ${scheherazade.variable}`} // Gør font variable tilgængelige globalt
    >
      <body className="font-sans antialiased"> {/* Anvender Inter som standard font */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // Sæt standard tema til lys
          enableSystem // Tillad system præference for tema
          disableTransitionOnChange // Undgå overgange ved tema skift for at forhindre flimmer
        >
          {children}
        </ThemeProvider>
        {/* Script til registrering af Service Worker for PWA funktionalitet */}
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then( // Sørg for at sw.js er i /public
                  function(registration) {
                    console.log('Service Worker registration successful with scope: ', registration.scope);
                  },
                  function(err) {
                    console.log('Service Worker registration failed: ', err);
                  }
                );
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}