import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(request) {
    const maintenanceMode = false;
    const { pathname } = request.nextUrl;

    // 1. Oturumu (Token) Manuel Olarak Çekiyoruz
    // ÖNEMLİ: secret anahtarın .env dosyasındaki ile aynı olmalı
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: process.env.NODE_ENV === 'production',
    });

    const isAuth = !!token;
    const role = token?.role;

    // 2. Bakım Modu Mantığı
    // Adminler bakım modundan etkilenmez
    // Login ve Register sayfaları da erişilebilir olmalı (Admin girişi için)
    if (maintenanceMode
        && !pathname.startsWith('/maintenance')
        && !pathname.startsWith('/login')
        && !pathname.startsWith('/register')
        && !pathname.startsWith('/api/auth')
        && role !== 'admin') {
        return NextResponse.redirect(new URL('/maintenance', request.url));
    }

    // 3. Oturum Kontrolü (Özel Proxy Logic)
    // Örn: Dashboard'a girmeye çalışan yetkisiz kullanıcıyı postala
    if (pathname.startsWith('/dashboard') && !isAuth) {
        return NextResponse.json(
            { error: 'Unauthorized Access - Please Login' },
            { status: 401 }
        );
        // Ya da redirect istersen:
        // return NextResponse.redirect(new URL('/login', request.url));
    }

    // 4. Giriş yapmış kullanıcı login/register'a ulaşamasın
    if ((pathname === '/login' || pathname === '/register') && isAuth) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // 5. Giriş yapmamış kullanıcı profile'a ulaşamasın
    if ((pathname === '/profile') && !isAuth) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 6. Giriş yapmamış kullanıcı dashboard'a ulaşamasın
    if ((pathname === '/dashboard' && !isAuth)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 7.Giriş yapmış ama yetkisi yoksa dashboard
    if ((pathname === '/dashboard' && role !== 'admin')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};