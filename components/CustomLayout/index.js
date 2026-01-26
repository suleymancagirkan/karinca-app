'use client'

import { ThemeProvider } from 'next-themes';
import { usePathname } from 'next/navigation';
import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Syne, Unbounded } from 'next/font/google';

const unbounded = Unbounded({
    subsets: ['latin'],
    variable: '--font-unbounded',
    weight: ['400', '500', '600', '700', '800', '900'],
    display: 'swap',
});

export default function CustomLayout({ children }) {
    let path = usePathname();

    if (path.startsWith('/maintenance')) {
        return (
            <html lang="tr" suppressHydrationWarning>
                <body className={`${unbounded.className} font-sans antialiased`}>
                    <ThemeProvider defaultTheme='system' enableSystem={true}>
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        )
    } else if (path.startsWith('/dashboard')) {
        return (
            <html lang="tr" suppressHydrationWarning>
                <body className={`${unbounded.className} font-sans antialiased`}>
                    <ThemeProvider defaultTheme='system' enableSystem={true}>
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        )
    } else {
        return (
            <html lang="tr" suppressHydrationWarning>
                <body className={`${unbounded.className} font-sans antialiased`}>
                    <ThemeProvider defaultTheme='system' enableSystem={true}>
                        <Header />
                        {children}
                        <Footer />
                    </ThemeProvider>
                </body>
            </html>
        );
    }
};