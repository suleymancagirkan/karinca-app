import { polysans } from '@/app/fonts/polysans';
import { ThemeProvider } from 'next-themes';
import React from 'react';

export default function CustomLayout({ children }) {
    return (
        <html lang="tr" suppressHydrationWarning>
            <body className={`${polysans.className} antialiased`}>
                <ThemeProvider defaultTheme='system' enableSystem={true}>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
};