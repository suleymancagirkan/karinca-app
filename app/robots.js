
export default function robots() {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://karinca-app.vercel.app';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/dashboard/',
                '/api/',
                '/admin/',
                '/profile/',
            ],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
