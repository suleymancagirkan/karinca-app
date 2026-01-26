'use client';

/**
 * @page NotFound (404)
 * @description A visually unique 404 page that aligns with the "Art House / Unbounded" aesthetic.
 * Features a glitched text effect, minimalist layout, and helpful navigation shortcuts.
 */

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TbArrowRight, TbHome, TbSearch } from 'react-icons/tb';

export default function NotFound() {
    return (
        <main className="min-h-screen bg-white dark:bg-[#050505] text-neutral-900 dark:text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Background Texture */}
            <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <div className="relative z-10 max-w-2xl w-full text-center">

                {/* Glitched 404 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative mb-8"
                >
                    <h1 className="font-unbounded font-black text-[12rem] leading-none tracking-tighter select-none opacity-10 absolute top-0 left-1/2 -translate-x-1/2 blur-lg">
                        404
                    </h1>
                    <h1 className="font-unbounded font-black text-[12rem] leading-none tracking-tighter select-none relative z-10 mix-blend-difference dark:mix-blend-normal">
                        404
                    </h1>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h2 className="font-unbounded font-bold text-2xl md:text-4xl mb-6">
                        LOST IN THE VOID?
                    </h2>
                    <p className="font-unbounded text-neutral-500 dark:text-neutral-400 text-sm md:text-base leading-relaxed mb-12">
                        The page you are looking for has been moved, deleted, or possibly never existed.
                    </p>
                </motion.div>

                {/* Navigation Options */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link href="/" className="w-full sm:w-auto px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-unbounded font-bold text-sm hover:scale-105 transition-transform flex items-center justify-center gap-2">
                        <TbHome className="text-lg" /> Return Home
                    </Link>
                    <Link href="/contact" className="w-full sm:w-auto px-8 py-4 border border-neutral-200 dark:border-neutral-800 rounded-full font-unbounded font-bold text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors flex items-center justify-center gap-2">
                        Contact Support <TbArrowRight className="text-lg" />
                    </Link>
                </motion.div>

                {/* Footer Decor */}
                <div className="absolute top-[200%] left-1/2 -translate-x-1/2 w-full flex justify-center opacity-20 pointer-events-none">
                    <span className="font-unbounded text-xs font-bold uppercase tracking-[0.5em]">System Error</span>
                </div>

            </div>
        </main>
    );
};
