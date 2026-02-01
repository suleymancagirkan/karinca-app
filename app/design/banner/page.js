'use client';

import React, { useRef } from 'react';
import { toJpeg } from 'html-to-image';
import { TbDownload, TbBrandNextjs, TbBrandTailwind, TbBrandPrisma } from 'react-icons/tb';
import toast from 'react-hot-toast';

export default function HeaderPage() {
    const bannerRef = useRef(null);
    const banner2Ref = useRef(null);
    const banner3Ref = useRef(null);
    const banner4Ref = useRef(null);
    const banner5Ref = useRef(null);
    const banner6Ref = useRef(null);

    const handleDownload = async (ref, filename = 'karinca-banner.jpg') => {
        if (!ref.current) return;

        const toastId = toast.loading('Generating banner...');

        try {
            // Slight delay to ensure fonts/images are ready
            await new Promise((resolve) => setTimeout(resolve, 100));

            const dataUrl = await toJpeg(ref.current, {
                quality: 1.0,
                pixelRatio: 2, // 2x resolution for retina/high quality
                backgroundColor: '#000000', // Ensure no transparency issues
            });

            const link = document.createElement('a');
            link.download = filename;
            link.href = dataUrl;
            link.click();

            toast.success('Download started!', { id: toastId });
        } catch (error) {
            console.error('Banner generation failed:', error);
            toast.error('Failed to generate banner. Check console.', { id: toastId });
        }
    };

    return (
        <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center p-8 gap-8">
            <h1 className="text-white font-unbounded text-2xl">LinkedIn Banner Generator</h1>

            {/* Banner Container - 1584x396px is standard LinkedIn Background */}
            <div className="relative group overflow-hidden shadow-2xl rounded-xl border border-neutral-800">

                {/* Visual Banner Area */}
                <div
                    ref={bannerRef}
                    className="w-[1584px] h-[396px] bg-black relative flex items-center justify-between px-24 overflow-hidden"
                >
                    {/* Background Elements */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-violet-900/30 via-black to-black"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

                    {/* Animated Glow Orbs */}
                    <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2"></div>
                    <div className="absolute bottom-[-100px] right-1/4 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px]"></div>

                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                    {/* Content Left: Brand Info */}
                    <div className="relative z-10 flex flex-col gap-2">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white/80 text-xs font-mono border border-white/5 uppercase tracking-widest">
                                Full Stack Development
                            </span>
                        </div>
                        <h1 className="text-8xl font-black font-unbounded text-white tracking-tighter leading-none">
                            KARINCA<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">.</span>
                        </h1>
                        <p className="text-2xl font-light text-neutral-400 font-unbounded tracking-wide mt-2">
                            NEXT.JS SAAS STARTER KIT
                        </p>
                    </div>

                    {/* Content Right: Tech Stack or Abstract Visual */}
                    <div className="relative z-10 flex flex-col items-end gap-6 text-white/30">
                        {/* Tech Icons (Decorative) */}
                        <div className="flex gap-6">
                            <TbBrandNextjs className="text-6xl text-white opacity-80" />
                            <TbBrandTailwind className="text-6xl text-cyan-400 opacity-80" />
                            <TbBrandPrisma className="text-6xl text-white opacity-80" />
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-mono text-neutral-500 uppercase tracking-widest">
                                Build Faster • Scale Better
                            </p>
                        </div>
                    </div>

                    {/* Footer / URL */}
                    <div className="absolute bottom-8 left-24 text-neutral-500 font-mono text-sm">
                        karinca-series.dev
                    </div>
                </div>
            </div>

            {/* Controls Banner 1 */}
            <button
                onClick={() => handleDownload(bannerRef)}
                className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-xl font-bold font-unbounded hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/10"
            >
                <TbDownload className="text-xl" />
                Download Banner 1 (Dark)
            </button>

            <div className="w-full h-px bg-neutral-800 my-8"></div>

            {/* Banner 2 Container - Minimalist Blue Theme */}
            <div className="relative group overflow-hidden shadow-2xl rounded-xl border border-blue-900/50">
                <div
                    ref={banner2Ref}
                    className="w-[1584px] h-[396px] bg-black relative flex flex-col justify-center px-24 overflow-hidden"
                >
                    {/* Background - Clean & Deep */}
                    <div className="absolute inset-0 bg-blue-950"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a_0%,transparent_100%)] opacity-50"></div>

                    {/* Subtle Engineering Grid - Very faint */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

                    {/* Massive Abstract Shape - Minimalist */}
                    <div className="absolute -right-20 -top-40 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[180px] opacity-20"></div>

                    {/* Main Content - Left Aligned, Swiss Style */}
                    <div className="relative z-10 flex flex-col gap-6 max-w-4xl">

                        {/* Top Tagline */}
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-1 bg-blue-500"></div>
                            <span className="font-mono text-blue-200 tracking-widest uppercase text-sm font-medium">
                                Production Ready
                            </span>
                        </div>

                        {/* Huge Typography */}
                        <h1 className="text-[120px] font-black font-unbounded text-white leading-[0.85] tracking-tight stroke-text">
                            KARINCA<span className="text-blue-500">.</span>
                        </h1>

                        {/* Subline / Context */}
                        <div className="flex items-center gap-6 mt-2">
                            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
                                <img src="/logo.svg" alt="Logo" className="w-6 h-6 invert brightness-0 opacity-80" />
                                <span className="text-white/80 font-mono text-sm">v2.0</span>
                            </div>
                            <p className="text-xl text-neutral-400 font-light max-w-lg">
                                The ultimate Next.js SaaS starter kit for developers who value aesthetics and performance.
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Code / Tech Minimalist Visual */}
                    <div className="absolute right-24 top-1/2 -translate-y-1/2 hidden md:block opacity-40">
                        <div className="flex flex-col items-end gap-2 font-mono text-sm text-blue-300/50">
                            <span>import &#123; <span className="text-blue-200">Karinca</span> &#125; from '@core';</span>
                            <span>const app = <span className="text-yellow-200">new</span> Karinca();</span>
                            <span>app.<span className="text-blue-200">deploy</span>();</span>
                            <span className="text-green-400/60 mt-2">// Ready to ship 🚀</span>
                        </div>
                    </div>

                    {/* Bottom Bar Decoration */}
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-transparent"></div>
                </div>
            </div>

            {/* Controls Banner 2 */}
            <button
                onClick={() => handleDownload(banner2Ref, 'karinca-blue-banner.jpg')}
                className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold font-unbounded hover:bg-blue-500 active:scale-95 transition-all shadow-lg shadow-blue-600/25"
            >
                <TbDownload className="text-xl" />
                Download Banner 2 (Tech)
            </button>

            <div className="w-full h-px bg-neutral-800 my-8"></div>

            {/* Banner 3 Container - Ultra Minimalist / Brand Focus */}
            <div className="relative group overflow-hidden shadow-2xl rounded-xl border border-neutral-800">
                <div
                    ref={banner3Ref}
                    className="w-[1584px] h-[396px] bg-[#0a0a0a] relative flex items-center justify-center overflow-hidden"
                >
                    {/* Center Glow - Very Subtle */}
                    <div className="absolute top-1/2 left-1/2 w-[800px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>

                    {/* Content - Absolute Center */}
                    <div className="relative z-10 flex flex-col items-center gap-8">
                        {/* Logo Mark */}
                        <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 backdrop-blur-sm shadow-2xl">
                            <img src="/logo.svg" alt="Logo" className="w-12 h-12 invert brightness-0 opacity-90" />
                        </div>

                        {/* Typography */}
                        <div className="text-center">
                            <h1 className="text-7xl font-bold font-unbounded text-white tracking-tight mb-3">
                                Karınca<span className="text-blue-500">.</span>
                            </h1>
                            <p className="text-neutral-400 font-mono text-lg tracking-[0.2em] uppercase opacity-60">
                                The Next.js SaaS Kit
                            </p>
                        </div>
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-12 left-12 w-2 h-2 bg-neutral-800 rounded-full"></div>
                    <div className="absolute top-12 right-12 w-2 h-2 bg-neutral-800 rounded-full"></div>
                    <div className="absolute bottom-12 left-12 w-2 h-2 bg-neutral-800 rounded-full"></div>
                    <div className="absolute bottom-12 right-12 w-2 h-2 bg-neutral-800 rounded-full"></div>
                </div>
            </div>

            {/* Controls Banner 3 */}
            <button
                onClick={() => handleDownload(banner3Ref, 'karinca-minimal-banner.jpg')}
                className="flex items-center gap-2 px-8 py-4 bg-neutral-800 text-white rounded-xl font-bold font-unbounded hover:bg-neutral-700 active:scale-95 transition-all"
            >
                <TbDownload className="text-xl" />
                Download Banner 3 (Minimal)
            </button>

            <div className="w-full h-px bg-neutral-800 my-8"></div>

            {/* Banner 4 Container - Hyper Modern / No Frame */}
            <div className="relative group overflow-hidden shadow-2xl rounded-xl border border-neutral-800">
                <div
                    ref={banner4Ref}
                    className="w-[1584px] h-[396px] bg-[#050505] relative flex items-center justify-between px-32 overflow-hidden"
                >
                    {/* Architectural Grid - Very Faint */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:120px_120px]"></div>

                    {/* Left: Typography dominant */}
                    <div className="relative z-10 flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span className="font-mono text-neutral-500 text-sm tracking-[0.3em] uppercase">Architecture</span>
                        </div>
                        <h1 className="text-8xl font-black font-unbounded text-white tracking-tight leading-none">
                            KARINCA<br />
                            <span className="text-neutral-800">SERIES.</span>
                        </h1>
                    </div>

                    {/* Right: Floating Logo (No Frame) */}
                    <div className="relative z-10 scale-150 opacity-90 mix-blend-screen grayscale hover:grayscale-0 transition-all duration-700">
                        {/* Just the SVG, free floating, large */}
                        <img
                            src="/logo.svg"
                            alt="Karınca Abstract"
                            className="w-64 h-64 invert brightness-0 drop-shadow-[0_0_50px_rgba(59,130,246,0.3)]"
                        />
                    </div>

                    {/* Bottom Detail */}
                    <div className="absolute bottom-12 left-32 flex items-center gap-8 text-neutral-600 font-mono text-xs uppercase tracking-widest">
                        <span>EST. 2026</span>
                        <span>•</span>
                        <span>High Performance SaaS</span>
                    </div>

                    {/* Gradient Overlay for Mood */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-blue-900/10 pointer-events-none"></div>
                </div>
            </div>

            {/* Controls Banner 4 */}
            <button
                onClick={() => handleDownload(banner4Ref, 'karinca-architecture-banner.jpg')}
                className="flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white border border-neutral-800 rounded-xl font-bold font-unbounded hover:border-neutral-600 active:scale-95 transition-all"
            >
                <TbDownload className="text-xl" />
                Download Banner 4 (Hyper)
            </button>

            <div className="w-full h-px bg-neutral-800 my-8"></div>

            {/* Banner 5 Container - Zen / Pure Identity */}
            <div className="relative group overflow-hidden shadow-2xl rounded-xl border border-neutral-800">
                <div
                    ref={banner5Ref}
                    className="w-[1584px] h-[396px] bg-[#030303] relative flex items-center justify-center overflow-hidden"
                >
                    {/* Background - Subtle Vignette */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"></div>

                    {/* Central Composition */}
                    <div className="relative z-10 flex flex-row items-center gap-12">
                        {/* Logo - Pure */}
                        <div className="w-32 h-32 flex items-center justify-center">
                            <img
                                src="/logo.svg"
                                alt="Karınca Logo"
                                className="w-full h-full invert brightness-0 opacity-100 drop-shadow-2xl"
                            />
                        </div>

                        {/* Divider */}
                        <div className="w-[3px] rounded-xl h-24 bg-neutral-700"></div>

                        {/* Text - Minimal */}
                        <div className="flex flex-col justify-center">
                            <h1 className="text-6xl font-bold font-unbounded text-white tracking-tight leading-none">
                                Karınca<span className="text-blue-700">.</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls Banner 5 */}
            <button
                onClick={() => handleDownload(banner5Ref, 'karinca-zen-banner.jpg')}
                className="flex items-center gap-2 px-8 py-4 bg-black text-white border border-neutral-800 rounded-xl font-bold font-unbounded hover:bg-neutral-900 active:scale-95 transition-all"
            >
                <TbDownload className="text-xl" />
                Download Banner 5 (Zen)
            </button>

            <div className="w-full h-px bg-neutral-800 my-8"></div>

            {/* Banner 6 Container - Zen + Chroma */}
            <div className="relative group overflow-hidden shadow-2xl rounded-xl border border-neutral-800">
                <div
                    ref={banner6Ref}
                    className="w-[1584px] h-[396px] bg-[#050505] relative flex items-center justify-center overflow-hidden"
                >
                    {/* Background - Colored Ambient */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2"></div>

                    {/* Central Composition */}
                    <div className="relative z-10 flex flex-row items-center gap-12">
                        {/* Logo - With Glow */}
                        <div className="w-32 h-32 flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"></div>
                            <img
                                src="/logo.svg"
                                alt="Karınca Logo"
                                className="w-full h-full invert brightness-0 opacity-100 drop-shadow-2xl relative z-10"
                            />
                        </div>

                        {/* Divider - Gradient */}
                        <div className="w-[2px] h-24 bg-gradient-to-b from-blue-500 via-violet-500 to-purple-500 rounded-full"></div>

                        {/* Text - Minimal + Color */}
                        <div className="flex flex-col justify-center">
                            <h1 className="text-6xl font-bold font-unbounded text-white tracking-tight leading-none">
                                Karınca<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">.</span>
                            </h1>
                            <span className="text-sm font-mono text-neutral-500 tracking-[0.4em] uppercase mt-2 ml-1">
                                Series
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls Banner 6 */}
            <button
                onClick={() => handleDownload(banner6Ref, 'karinca-chroma-banner.jpg')}
                className="flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white border border-neutral-800 rounded-xl font-bold font-unbounded hover:border-blue-900/50 active:scale-95 transition-all"
            >
                <TbDownload className="text-xl" />
                Download Banner 6 (Chroma)
            </button>
        </div>
    );
}