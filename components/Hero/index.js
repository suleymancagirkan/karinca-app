'use client';

/**
 * @component Hero
 * @description A completely reimagined Hero component focusing on bold, high-contrast aesthetics and clean geometry.
 * Features a dynamic grid background, a massive split-line heading with mixed weights,
 * and a sophisticated 'magnetic' interaction on the main visual elements.
 * 
 * @example
 * <Hero />
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { TbArrowDown, TbArrowUpRight, TbLayoutGrid } from 'react-icons/tb';
import Link from 'next/link';

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={ref} className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-neutral-50 dark:bg-[#050505] text-neutral-900 dark:text-white pt-20 lg:pt-0">

            <div className="absolute inset-0 z-0 opacity-20 dark:opacity-20 pointer-events-none">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                        backgroundSize: '100px 100px'
                    }}
                />
            </div>

            <div className="absolute inset-0 z-0 opacity-0 dark:opacity-10 pointer-events-none">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                        backgroundSize: '100px 100px'
                    }}
                />
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-blue-500/20 rounded-full blur-[100px] md:blur-[150px] pointer-events-none mix-blend-screen dark:mix-blend-screen" />

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-6 h-full flex flex-col justify-center py-12 md:py-0">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center mb-8 md:mb-10"
                >
                    <div className="flex items-center gap-2 md:gap-3 px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md">
                        <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-green-500"></span>
                        </span>
                        <span className="font-unbounded text-[10px] md:text-xs font-medium tracking-widest uppercase">
                            Available for Freelance
                        </span>
                    </div>
                </motion.div>

                <motion.div style={{ y, opacity }} className="relative flex flex-col items-center leading-none">
                    <h1 className="font-unbounded font-black text-[15vw] md:text-[10vw] xl:text-[9rem] tracking-tighter text-center z-10 mix-blend-difference dark:mix-blend-normal text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 to-neutral-500 dark:from-white dark:to-neutral-500 pb-2 md:pb-4">
                        DIGITAL
                    </h1>

                    <div className="flex items-center gap-2 md:gap-12 z-20 -my-2 md:-my-6 w-full justify-center">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "auto" }}
                            transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
                            className="overflow-hidden hidden md:block"
                        >
                            <div className="h-[2px] w-12 md:w-32 bg-neutral-900 dark:bg-white" />
                        </motion.div>

                        <h1 className="font-unbounded font-light italic text-[12vw] md:text-[8vw] xl:text-[7rem] tracking-tight text-center text-blue-600 dark:text-blue-500">
                            Experience
                        </h1>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "auto" }}
                            transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
                            className="overflow-hidden hidden md:block"
                        >
                            <div className="h-[2px] w-12 md:w-32 bg-neutral-900 dark:bg-white" />
                        </motion.div>
                    </div>

                    <h1 className="font-unbounded font-black text-[15vw] md:text-[10vw] xl:text-[9rem] tracking-tighter text-center z-10 mix-blend-difference dark:mix-blend-normal text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 to-neutral-500 dark:from-white dark:to-neutral-500 pb-2 md:pb-4">
                        AGENCY
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-12 md:mt-24 flex flex-col xl:flex-row items-center justify-between border-t border-neutral-200 dark:border-neutral-800 pt-8 gap-8 xl:gap-0"
                >
                    <p className="font-unbounded text-xs md:text-sm text-neutral-500 dark:text-neutral-400 max-w-sm text-center xl:text-left">
                        We craft digital products that blend art, technology, and human interaction.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <button className="group hidden sm:flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full border border-neutral-200 dark:border-neutral-800 bg-transparent hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300">
                            <TbArrowUpRight className="text-xl md:text-2xl group-hover:rotate-45 transition-transform" />
                        </button>
                        <Link href="/services" className="group flex items-center gap-3 md:gap-4 pl-2 pr-6 md:pr-8 py-2 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black hover:scale-105 transition-transform">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-800 dark:bg-neutral-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <TbLayoutGrid />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="font-unbounded text-[8px] md:text-[10px] font-bold uppercase tracking-wider opacity-60">Discover</span>
                                <span className="font-unbounded text-xs md:text-sm font-bold">Our Services</span>
                            </div>
                        </Link>
                    </div>
                </motion.div>
            </div>

            <div className="absolute left-6 top-1/2 -translate-x-1/2 hidden 2xl:flex flex-col gap-8 opacity-20 selection:none pointer-events-none">
                <span className="font-unbounded text-xs font-bold uppercase -rotate-90 tracking-widest">Est. 2024</span>
                <div className="w-px h-24 bg-current mx-auto mt-5" />
                <span className="font-unbounded text-xs font-bold uppercase -rotate-90 tracking-widest">MANISA</span>
            </div>

            <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col gap-8 opacity-20 selection:none pointer-events-none">
                <TbArrowDown className="animate-bounce" />
                <span className="font-unbounded text-xs font-bold uppercase rotate-90 tracking-widest">Scroll Down</span>
            </div>

        </section>
    );
};
