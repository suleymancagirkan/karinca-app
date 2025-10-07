'use client'

import { polysans } from '@/app/fonts/polysans';
import { ThemeProvider } from 'next-themes';
import { usePathname } from 'next/navigation';
import React from 'react';
import Header from '../Header';

export default function CustomLayout({ children }) {
    let path = usePathname();

    if (path.startsWith('/maintenance')) {
        return (
            <html lang="tr" suppressHydrationWarning>
                <body className={`${polysans.className} antialiased`}>
                    <ThemeProvider defaultTheme='system' enableSystem={true}>
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        )
    } else {
        return (
            <html lang="tr" suppressHydrationWarning>
                <body className={`${polysans.className} antialiased`}>
                    <ThemeProvider defaultTheme='system' enableSystem={true}>
                        <Header />
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        );

    }
};