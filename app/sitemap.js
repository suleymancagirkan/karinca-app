import { SITE } from "@/lib/data";

/**
 * app/sitemap.js
 * Next.js 16 App Router — native XML sitemap üretimi.
 * Otomatik olarak /sitemap.xml adresinde sunulur.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap() {
  const baseUrl = SITE.siteUrl;
  const now = new Date();

  return [
    // ── Ana sayfa ───────────────────────────────────────────
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },

    // ── Hizmetler bölümü ────────────────────────────────────
    {
      url: `${baseUrl}/#hizmetler`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // ── Portfolyo bölümü ────────────────────────────────────
    {
      url: `${baseUrl}/#portfolyo`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },

    // ── Hakkımızda bölümü ───────────────────────────────────
    {
      url: `${baseUrl}/#hakkimizda`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // ── İletişim bölümü ─────────────────────────────────────
    {
      url: `${baseUrl}/#iletisim`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
