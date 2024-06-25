import { Inter as FontSans } from "next/font/google"
import "./globals.css";

import { cn } from "@/lib/utils"
import Header from "./_components/Header";
import GoogleAdsense from "./_components/GoogleAdsense";
import Script from "next/script";
import Footer from "./_components/Footer";
import AdSense from "@/components/AdSense/AdSense";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "MMM : Movie - Magic - Mania",
  description: "MMM : Movie - Magic - Mania",
  template: '%s | MMM : Movie - Magic - Mania',
  default: 'MMM : Movie - Magic - Mania',
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};



export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      {process.env.NODE_ENV === 'production' && <head>
        <meta name="google-site-verification" content="sKCF8N5RL_s-B01eLKxvcM-rWyjyDEQ8-yPNqQ8dIWU" />
        <meta name="google-adsense-account" content="ca-pub-6282693958918202" />
        <meta name="yandex-verification" content="7cf59f716d6ee84b" />
        {/* <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6282693958918202" crossOrigin="anonymous" strategy="afterInteractive" /> */}
        {/* <AdSense pId="ca-pub-6282693958918202" /> */}
      </head>}
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <div className="flex flex-col min-h-[100dvh]">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        {/* <GoogleAdsense /> */}
      </body>
    </html>
  );
}
