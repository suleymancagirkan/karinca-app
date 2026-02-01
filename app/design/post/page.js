'use client';

import React, { useRef, useState, useEffect } from 'react';
import { toJpeg } from 'html-to-image';
import { TbDownload, TbBrandNextjs, TbBrandTailwind, TbBrandPrisma, TbArrowUpRight, TbCircleFilled } from 'react-icons/tb';
import toast from 'react-hot-toast';

export default function PostDesignPage() {
    const postRef = useRef(null);
    const [scale, setScale] = useState(0.4);

    useEffect(() => {
        const handleResize = () => {
            // Fit 1350px into roughly 80% of screen height
            const h = Math.min(window.innerHeight * 0.8, 900);
            setScale(h / 1350);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleDownload = async () => {
        if (!postRef.current) return;
        const toastId = toast.loading('Exporting Ultra-HD...');
        try {
            // Delay ensuring fonts connect
            await new Promise(resolve => setTimeout(resolve, 800));

            const dataUrl = await toJpeg(postRef.current, {
                quality: 1.0,
                pixelRatio: 3, // 3x scale for crisp text on mobile [1080x3 = 3240px wide]
                backgroundColor: '#030303',
            });

            const link = document.createElement('a');
            link.download = 'karinca-monolith-post.jpg';
            link.href = dataUrl;
            link.click();

            toast.success('Ready to post!', { id: toastId });
        } catch (error) {
            console.error('Export error:', error);
            toast.error('Export failed', { id: toastId });
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-8 gap-10 font-sans selection:bg-blue-500/30">

            {/* Header / Info */}
            <div className="text-center space-y-2 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
                <h1 className="text-3xl md:text-4xl font-bold font-unbounded text-white tracking-tight">
                    The Monolith
                </h1>
                <p className="text-neutral-500 font-mono text-xs uppercase tracking-[0.3em]">
                    Premium Social Asset • 1080 x 1350
                </p>
            </div>

            {/* PREVIEW CONTAINER */}
            <div className="relative group perspective-[2000px]">
                {/* Ambient Glow behind the card */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-orange-600/20 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                <div
                    style={{
                        width: `${1080 * scale}px`,
                        height: `${1350 * scale}px`
                    }}
                    className="relative bg-[#030303] shadow-2xl rounded-2xl overflow-hidden ring-1 ring-white/10 transition-transform duration-700 ease-out group-hover:scale-[1.02] group-hover:rotate-x-1"
                >
                    {/* SCALED NODE: 1080x1350 */}
                    <div
                        ref={postRef}
                        style={{
                            transform: `scale(${scale})`,
                            transformOrigin: 'top left',
                            width: '1080px',
                            height: '1350px'
                        }}
                        className="absolute top-0 left-0 bg-[#030303] flex flex-col overflow-hidden"
                    >
                        {/* -------------------------------------------------------------
                           DESIGN START: "THE MONOLITH"
                           A vertical composition focusing on scale, depth and typography.
                           ------------------------------------------------------------- */}

                        {/* BACKGROUND LAYER */}
                        <div className="absolute inset-0 z-0">
                            {/* Subtle Noise */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay"></div>

                            {/* Deep Atmospheric Glows - Carefully positioned */}
                            <div className="absolute -top-[20%] right-[-10%] w-[1000px] h-[1000px] bg-blue-900/10 rounded-full blur-[180px]"></div>
                            <div className="absolute bottom-[-10%] left-[-20%] w-[1200px] h-[1200px] bg-indigo-950/20 rounded-full blur-[200px]"></div>

                            {/* Architectural Grid Lines - Extremely faint */}
                            <div className="absolute inset-x-12 top-0 bottom-0 border-x border-white/[0.03]"></div>
                            <div className="absolute inset-x-0 top-12 h-px bg-white/[0.03]"></div>
                            <div className="absolute inset-x-0 bottom-32 h-px bg-white/[0.03]"></div>
                        </div>

                        {/* CONTENT LAYER */}
                        <div className="relative z-10 w-full h-full flex flex-col justify-between p-12">

                            {/* TOP: Brand & Date (Editorial Style) */}
                            <div className="flex justify-between items-start opacity-70">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-white font-unbounded font-medium tracking-wider text-xl">KARINCA</h3>
                                    <span className="text-neutral-500 font-mono text-sm tracking-widest uppercase">Series / 2026</span>
                                </div>
                                <div className="border border-white/10 rounded-full px-4 py-1 bg-white/5 backdrop-blur-md">
                                    <span className="text-xs font-mono text-white/80">VOL. 01</span>
                                </div>
                            </div>

                            {/* CENTER: The Visual Anchor */}
                            <div className="relative flex-1 flex flex-col justify-center items-center">

                                {/* 1. The Decorative "Portal" or "Chip" */}
                                <div className="relative w-[500px] h-[600px] mb-12">
                                    {/* Glass Panel */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/[0.01] rounded-[40px] border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col items-center justify-center overflow-hidden">

                                        {/* Inner Glow Orb */}
                                        <div className="w-[300px] h-[300px] bg-blue-500 rounded-full blur-[100px] opacity-20 absolute top-[-50px]"></div>

                                        {/* Icon/Logo Central */}
                                        <div className="relative z-10 flex flex-col items-center gap-8 text-center p-10">
                                            <div className="bg-white text-black w-24 h-24 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                                                <TbBrandNextjs className="text-6xl" />
                                            </div>

                                            <div className="space-y-4">
                                                <h2 className="text-5xl font-bold font-unbounded text-white tracking-tighter">
                                                    Next.js 15
                                                </h2>
                                                <div className="h-px w-20 bg-white/20 mx-auto"></div>
                                                <p className="text-xl text-neutral-400 font-light leading-relaxed max-w-xs">
                                                    The React Framework for the Web.
                                                    <br /><span className="text-blue-400">Reimagined.</span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* Floating Badge */}
                                        <div className="absolute bottom-8 px-6 py-2 bg-black/40 border border-white/5 rounded-full backdrop-blur-md">
                                            <span className="text-sm font-mono text-neutral-500 uppercase tracking-widest">Production Ready</span>
                                        </div>
                                    </div>

                                    {/* Depth Shadow */}
                                    <div className="absolute -bottom-10 left-10 right-10 h-10 bg-black/50 blur-xl rounded-[100%]"></div>
                                </div>

                                {/* 2. The Massive Background Text (Clipped) */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none mix-blend-color-dodge opacity-20 z-0">
                                    <h1 className="text-[350px] font-black font-unbounded text-white tracking-tighter leading-none whitespace-nowrap blur-sm">
                                        CORE
                                    </h1>
                                </div>
                            </div>

                            {/* BOTTOM: Footer Tech Specs */}
                            <div className="relative z-20">
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-8">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-xs font-mono text-neutral-600 uppercase tracking-widest">Framework</span>
                                            <div className="flex items-center gap-2 text-neutral-300">
                                                <TbBrandNextjs className="text-xl" />
                                                <span className="font-medium">Next.js 15 RC</span>
                                            </div>
                                        </div>
                                        <div className="w-px h-10 bg-white/10"></div>
                                        <div className="flex flex-col gap-2">
                                            <span className="text-xs font-mono text-neutral-600 uppercase tracking-widest">Styling</span>
                                            <div className="flex items-center gap-2 text-neutral-300">
                                                <TbBrandTailwind className="text-xl text-cyan-400" />
                                                <span className="font-medium">Tailwind v4</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Circle */}
                                    <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center group relative overflow-hidden bg-white/5 hover:bg-white hover:text-black transition-all duration-500">
                                        <TbArrowUpRight className="text-4xl relative z-10 transition-transform duration-500 group-hover:rotate-45" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* CONTROLS */}
            <div className=" opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-bold font-unbounded text-sm uppercase tracking-wider shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all duration-300"
                >
                    <TbDownload className="text-xl" />
                    Download Asset
                </button>
            </div>

        </div>
    );
}
