'use client';

/**
 * @component CTA
 * @description A high-impact Call to Action section designed to convert visitors.
 * Features a massive, interactive heading that acts as a link to the contact page.
 * Uses a magnetic hover effect and bold typography.
 * 
 * @example
 * <CTA />
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { TbArrowUpRight } from 'react-icons/tb';

export default function CTA() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const x = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <section ref={containerRef} className="py-32 md:py-48 overflow-hidden bg-white dark:bg-[#050505] text-neutral-900 dark:text-white relative">

            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">

                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-unbounded font-bold text-blue-600 tracking-widest uppercase mb-8"
                >
                    Ready to start?
                </motion.span>

                <Link href="/contact" className="group relative inline-block">
                    <h2 className="font-unbounded font-black text-[12vw] leading-[0.85] tracking-tighter transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600">
                        LET'S TALK
                    </h2>
                    <motion.div
                        initial={{ scale: 0, rotate: 45 }}
                        whileInView={{ scale: 1 }}
                        className="absolute -right-8 -top-8 md:-right-16 md:-top-16 text-6xl md:text-9xl text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-4 group-hover:-translate-y-4"
                    >
                        <TbArrowUpRight />
                    </motion.div>
                </Link>

                <p className="font-unbounded text-neutral-500 dark:text-neutral-400 mt-12 max-w-lg text-sm md:text-lg">
                    Have a project in mind? We'd love to hear about it.
                    Let's discuss how we can help your business grow.
                </p>

                <div className="mt-12 flex gap-4">
                    <Link href="/contact" className="px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-full font-unbounded font-bold text-sm hover:scale-105 transition-transform">
                        Get in Touch
                    </Link>
                    <Link href="mailto:hello@karinca.app" className="px-8 py-4 border border-neutral-200 dark:border-neutral-800 rounded-full font-unbounded font-bold text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
                        hello@karinca.app
                    </Link>
                </div>

            </div>

            {/* Sliding Text Background (Decoration) */}
            <div className="absolute bottom-10 left-0 w-full opacity-5 pointer-events-none select-none overflow-hidden">
                <motion.div style={{ x }} className="whitespace-nowrap font-unbounded font-black text-9xl text-neutral-900 dark:text-white">
                    DESIGN  DEVELOP  LAUNCH  SCALE  DESIGN  DEVELOP  LAUNCH  SCALE
                </motion.div>
            </div>

        </section>
    );
};
