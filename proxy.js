
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(request) {
    const { pathname } = request.nextUrl;

    // 0. PERFORMANCE & SAFETY: Skip middleware entirely for API routes (except if needed)
    // This prevents the "maintenance check fetch" from triggering middleware recursively (Infinite Loop).
    if (pathname.startsWith('/api') || pathname.startsWith('/_next')) {
        return NextResponse.next();
    }

    // 1. Fetch Maintenance Mode Status from API
    let maintenanceMode = false;
    try {
        // Fetch from internal API (DB connected)
        const res = await fetch(`${request.nextUrl.origin}/api/public/maintenance`, { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            maintenanceMode = data.maintenanceMode;
        }
    } catch (e) {
        // console.error('Maintenance check failed', e);
    }

    // 2. Session Token
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: process.env.NODE_ENV === 'production',
    });

    const isAuth = !!token;
    const role = token?.role;

    // 3. Maintenance Mode Logic
    if (maintenanceMode
        && !pathname.startsWith('/maintenance')
        && !pathname.startsWith('/login')
        && !pathname.startsWith('/register')
        && !pathname.startsWith('/api/auth')
        && role !== 'admin') {
        return NextResponse.redirect(new URL('/maintenance', request.url));
    }

    // 3.5 If Maintenance is OFF, prevent access to maintenance page
    if (!maintenanceMode && pathname.startsWith('/maintenance')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // 4. Unauthorized Dashboard Access
    if (pathname.startsWith('/dashboard') && !isAuth) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 5. Auth User trying to access auth pages
    if ((pathname === '/login' || pathname === '/register') && isAuth) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // 6. Guest trying to access protected user pages
    if ((pathname === '/profile' || pathname === '/dashboard') && !isAuth) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 7. Role-based Access (Dashboard is Admin only?)
    // Note: The previous logic redirected if role !== 'admin'. Ensure this is intended.
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
