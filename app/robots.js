import { SITE } from "@/lib/data";

/**
 * app/robots.js
 * Next.js 16 App Router — native robots.txt üretimi.
 * Otomatik olarak /robots.txt adresinde sunulur.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/admin/",
          "/*.json$",
        ],
      },
      {
        // Agresif arama motoru botlarını yavaşlat
        userAgent: "GPTBot",
        disallow: "/",
      },
    ],
    sitemap: `${SITE.siteUrl}/sitemap.xml`,
    host: SITE.siteUrl,
  };
}
