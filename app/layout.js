import { Unbounded } from "next/font/google";
import "@/public/globals.css";
import HeaderHero from "@/components/HeaderHero";
import { SITE } from "@/lib/data";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  display: "swap",
});

// ─── metadataBase — tüm relative URL'ler için temel ────────────────────────
export const metadataBase = new URL(SITE.siteUrl);

// ─── Kalıp — her sayfa kendi başlığını tanımlayabilir ──────────────────────
export const metadata = {
  metadataBase: new URL(SITE.siteUrl),

  // ── Başlık ───────────────────────────────────────────────────────────────
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },

  // ── Açıklama & Anahtar Kelimeler ─────────────────────────────────────────
  description: SITE.description,
  keywords: SITE.seoKeywords,

  // ── Yazar / Yayıncı ──────────────────────────────────────────────────────
  authors: [{ name: SITE.name, url: SITE.siteUrl }],
  creator: SITE.name,
  publisher: SITE.name,

  // ── Canonical ────────────────────────────────────────────────────────────
  alternates: {
    canonical: SITE.siteUrl,
    languages: { "tr-TR": SITE.siteUrl },
  },

  // ── Robots ───────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── OpenGraph ─────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE.siteUrl,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.tagline}`,
        type: "image/jpeg",
      },
    ],
  },

  // ── Twitter / X Cards ────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [SITE.ogImage],
    creator: SITE.twitterHandle,
    site: SITE.twitterHandle,
  },

  // ── Uygulama Bilgileri ────────────────────────────────────────────────────
  applicationName: SITE.name,
  category: "Web Ajansı",

  // ── Themed Renk ───────────────────────────────────────────────────────────
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#000000" },
  ],

  // ── Viewport ─────────────────────────────────────────────────────────────
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },

  // ── Manifest ─────────────────────────────────────────────────────────────
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={`${unbounded.className} antialiased`}>
        <HeaderHero />
        {children}
      </body>
    </html>
  );
}
