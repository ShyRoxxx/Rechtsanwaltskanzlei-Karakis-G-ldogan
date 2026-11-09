import type { Metadata, Viewport } from "next";
import { Young_Serif, Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import { SITE_URL, firm } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThumbBar from "@/components/ThumbBar";
import Motion from "@/components/Motion";
import JsonLd from "@/components/JsonLd";
import { legalServiceLd } from "@/lib/seo";

const young = Young_Serif({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-young",
  display: "swap",
  adjustFontFallback: true,
});
const atkinson = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-atkinson",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${firm.name} · Hannover`,
    template: `%s · ${firm.short}`,
  },
  description:
    "Rechtsanwältin Penbe Güldogan am Mühlenbergzentrum in Hannover: Arbeits-, Familien-, Verkehrs-, Miet- und Erbrecht. Beratung auf Deutsch und Türkisch.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: firm.name,
    title: `${firm.name} · Hannover`,
    description:
      "Ihre Anwältin am Mühlenberger Markt: Arbeit, Familie, Verkehr, Miete, Erbe — auf Deutsch und Türkisch.",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f4f6f5",
  width: "device-width",
  initialScale: 1,
};

const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('reduce-motion');})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${young.variable} ${atkinson.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a href="#inhalt" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3">
          Zum Inhalt springen
        </a>
        <Header />
        <main id="inhalt">{children}</main>
        <Footer />
        <ThumbBar />
        <Motion />
        <JsonLd data={legalServiceLd()} />
      </body>
    </html>
  );
}
