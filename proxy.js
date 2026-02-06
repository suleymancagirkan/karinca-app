
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(request) {
    const { pathname } = request.nextUrl;

    // 1. Fetch Maintenance Mode Status from API (Since middleware runs on Edge/Node and can't access Prisma directly easily in all envs without Edge comp, but we can try fetching from internal API)
    // However, fetching in middleware is tricky for performance.
    // Ideally, we keep the config file approach or use Edge Config.
    // BUT user asked to "connect DB". The only performant way in Next.js middleware without Edge Config is to fetch an endpoint or use lightweight check.

    // Let's try to fetch the settings from our own API. 
    // IMPORTANT: This adds latency to every request. 
    // Optimization: Check maintenance only for non-admin potential paths? Or just do it.

    let maintenanceMode = false;
    try {
        // We use the absolute URL to fetch internally
        // Note: Fetching in middleware might affect performance.
        // A better approach usually is Edge Config or Redis, but let's try direct DB via API if requested, or keep the file injection.
        // The user specifically asked to "connect DB" because they store it there.
        // Direct Prisma usage in middleware is NOT supported in Vercel Edge Runtime, but works in Node runtime if not edge-constrained.
        // Next.js 13.4+ middleware runs on Edge Runtime. Prisma Client does not run there natively without complications suitable for middleware unless using Data Proxy.

        // Strategy: We will keep the file-injection strategy for performance BUT ensure it syncs correctly.
        // User claims: "proxyde bir değişkenle hala tutuluyor onu db ye bağlayalım"
        // Meaning they want to remove the hardcoded variable and fetch from DB.

        // Since we can't easily use Prisma in Middleware (Edge Runtime), we have to fetch from an external source or use the file-injection as a cache mechanism.
        // THE USER'S CURRENT SETUP updates `proxy.js` (now `middleware.js`) string content. This IS the DB connection in a way (DB update -> File Update).
        // If the user insists on "Direct DB", we must warn them about Edge Runtime limitations or use a fetch.

        // Let's implement the FETCH approach as requested, assuming the performance hit is acceptable or they are self-hosting (Node).

        const res = await fetch(`${request.nextUrl.origin}/api/public/maintenance`, { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            maintenanceMode = data.maintenanceMode;
        }
    } catch (e) {
        // Fallback or ignore
        // console.error('Maintenance check failed', e);
    }

    // 2. Oturumu (Token) Manuel Olarak Çekiyoruz
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: process.env.NODE_ENV === 'production',
    });

    const isAuth = !!token;
    const role = token?.role;

    // 3. Bakım Modu Mantığı
    if (maintenanceMode
        && !pathname.startsWith('/maintenance')
        && !pathname.startsWith('/login')
        && !pathname.startsWith('/register')
        && !pathname.startsWith('/api/auth')
        && !pathname.startsWith('/_next') // Don't block assets
        && !pathname.startsWith('/api/public') // Don't block the maintenance check API itself
        && role !== 'admin') {
        return NextResponse.redirect(new URL('/maintenance', request.url));
    }

    // ... (Rest of logic)

    // 4. Oturum Kontrolü
    if (pathname.startsWith('/dashboard') && !isAuth) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 5. Giriş yapmış kullanıcı login/register'a ulaşamasın
    if ((pathname === '/login' || pathname === '/register') && isAuth) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // 6. Giriş yapmamış kullanıcı profile/dashboard'a ulaşamasın
    if ((pathname === '/profile' || pathname === '/dashboard') && !isAuth) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 7. Yetkisiz giriş
    if (pathname.startsWith('/dashboard') && role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
