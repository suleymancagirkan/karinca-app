import localFont from 'next/font/local';

export const polysans = localFont({
    src: [
        { path: './PolySans/PolySansTrial-Bulky.woff2', weight: '900', style: 'normal' },
        { path: './PolySans/PolySansTrial-BulkyMono.woff2', weight: '500', style: 'normal' },
        { path: './PolySans/PolySansTrial-BulkyWide.woff2', weight: '500', style: 'normal' }, // Resimden eklendi
        { path: './PolySans/PolySansTrial-Median.woff2', weight: '600', style: 'normal' },
        { path: './PolySans/PolySansTrial-MedianMono.woff2', weight: '600', style: 'normal' }, // Resimden eklendi
        { path: './PolySans/PolySansTrial-MedianWide.woff2', weight: '600', style: 'normal' }, // Resimden eklendi
        { path: './PolySans/PolySansTrial-Neutral.woff2', weight: '400', style: 'normal' },
        { path: './PolySans/PolySansTrial-NeutralMono.woff2', weight: '400', style: 'normal' },
        { path: './PolySans/PolySansTrial-NeutralWide.woff2', weight: '400', style: 'normal' },
        { path: './PolySans/PolySansTrial-Slim.woff2', weight: '300', style: 'normal' },
        { path: './PolySans/PolySansTrial-SlimMono.woff2', weight: '300', style: 'normal' },
        { path: './PolySans/PolySansTrial-SlimWide.woff2', weight: '300', style: 'normal' },

        { path: './PolySans/PolySansItalicTrial-BulkyItalic.woff2', weight: '900', style: 'italic' },
        { path: './PolySans/PolySansItalicTrial-BulkyMonoItalic.woff2', weight: '900', style: 'italic' },
        { path: './PolySans/PolySansItalicTrial-BulkyWideItalic.woff2', weight: '900', style: 'italic' },
        { path: './PolySans/PolySansItalicTrial-MedianItalic.woff2', weight: '600', style: 'italic' },
        { path: './PolySans/PolySansItalicTrial-MedianMonoItalic.woff2', weight: '600', style: 'italic' },
        { path: './PolySans/PolySansItalicTrial-MedianWideItalic.woff2', weight: '600', style: 'italic' },
        { path: './PolySans/PolySansItalicTrial-NeutralItalic.woff2', weight: '400', style: 'italic' },
        { path: './PolySans/PolySansItalicTrial-NeutralMonoItalic.woff2', weight: '400', style: 'italic' },
        { path: './PolySans/PolySansItalicTrial-NeutralWideItalic.woff2', weight: '400', style: 'italic' },
        { path: './PolySans/PolySansItalicTrial-SlimItalic.woff2', weight: '300', style: 'italic' },
        { path: './PolySans/PolySansItalicTrial-SlimMonoItalic.woff2', weight: '300', style: 'italic' },
        { path: './PolySans/PolySansItalicTrial-SlimWideItalic.woff2', weight: '300', style: 'italic' },
    ],
    variable: '--font-polysans',
    display: 'swap',
    fallback: ['sans-serif'],
});