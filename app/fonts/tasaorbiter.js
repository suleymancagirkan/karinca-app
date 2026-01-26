import { Poppins } from "next/font/google";
import localFont from "next/font/local";


export const tasaOrbiter = localFont({
    src: [
        { path: './TASAOrbiter/TASAOrbiter-ExtraBold.ttf', weight: '800', style: 'normal' },
        { path: './TASAOrbiter/TASAOrbiter-Bold.ttf', weight: '700', style: 'normal' },
        { path: './TASAOrbiter/TASAOrbiter-SemiBold.ttf', weight: '600', style: 'normal' },
        { path: './TASAOrbiter/TASAOrbiter-Medium.ttf', weight: '500', style: 'normal' },
        { path: './TASAOrbiter/TASAOrbiter-Regular.ttf', weight: '400', style: 'normal' },
    ],
    variable: '--font-tasaorbiter',
    display: 'swap',
    fallback: ['sans-serif'],
})