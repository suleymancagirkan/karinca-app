'use client'

import { ThemeProvider } from 'next-themes';
import { usePathname } from 'next/navigation';
import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

export default function CustomLayout({ children }) {
    let path = usePathname();

    // Maintenance veya Dashboard gibi özel layour gerektiren sayfalar için kontrol
    const isSpecialPage = path.startsWith('/maintenance') || path.startsWith('/dashboard');

    if (isSpecialPage) {
        return (
            <SessionProvider>
                <ThemeProvider defaultTheme='system' enableSystem={true}>
                    <Toaster />
                    {children}
                </ThemeProvider>
            </SessionProvider>
        )
    }

    // Varsayılan Layout (Header + Footer içeren)
    return (
        <SessionProvider>
            <ThemeProvider defaultTheme='system' enableSystem={true}>
                <Toaster />
                <Header />
                <main className="min-h-screen">
                    {children}
                </main>
                <Footer />
            </ThemeProvider>
        </SessionProvider>
    );
};