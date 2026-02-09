'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TbArrowRight, TbEye } from 'react-icons/tb';

/**
 * @component CrystalCTA
 * @description A premium CTA component with floating 3D elements and a dark aesthetic.
 * 
 * @param {string} title - The main heading text
 * @param {string} description - The subtext description
 * @param {string} primaryBtnText - Text for the primary white button
 * @param {string} primaryBtnLink - URL for the primary button
 * @param {string} secondaryBtnText - Text for the secondary transparent button
 * @param {string} secondaryBtnLink - URL for the secondary button
 * @param {string} leftImageSrc - Path to the left 3D image (default: /assets/crystal-left.png)
 * @param {string} rightImageSrc - Path to the right 3D image (default: /assets/crystal-right.png)
 */
export default function CrystalCTA({
    title = "Siteni hemen şimdi oluştur!",
    description = "Sadece birkaç tıklama ile oyun sunucunuz için etkileyici bir web sitesi oluşturun ve sunucunuzdan para kazanmaya başlayın.",
    primaryBtnText = "Hemen Satın Al",
    primaryBtnLink = "/pricing",
    secondaryBtnText = "Demo'yu İncele",
    secondaryBtnLink = "/demo",
    leftImageSrc = "/assets/cta-1.png",
    rightImageSrc = "/assets/cta-2.png"
}) {
    return (
        <section className="relative w-full overflow-hidden bg-[#020202] py-24 md:py-32 flex items-center justify-center">

            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent hidden md:block" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent hidden md:block" />

            <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

                {/* Left Floating Element */}
                <motion.div
                    animate={{ y: [-15, 15, -15], rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="hidden lg:block w-64 h-64 xl:w-80 xl:h-80 relative shrink-0 order-1"
                >
                    {/* Glow */}
                    <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full transform scale-75" />
                    {/* Image Placeholder if src fails or is default */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        <img
                            src={leftImageSrc}
                            alt=""
                            className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        {/* Fallback Shape */}
                        <div className="absolute inset-0 hidden items-center justify-center">
                            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-3xl transform rotate-45 shadow-[0_0_50px_rgba(59,130,246,0.5)] border border-white/20" />
                        </div>
                    </div>
                </motion.div>

                {/* Center Content */}
                <div className="text-center max-w-3xl mx-auto order-2 lg:flex-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 font-unbounded tracking-tighter leading-[1.1]">
                            {title}
                        </h2>
                        <p className="text-neutral-400 text-base md:text-lg mb-10 font-medium leading-relaxed max-w-2xl mx-auto">
                            {description}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href={primaryBtnLink} className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold font-unbounded text-sm hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                    {primaryBtnText}
                                </button>
                            </Link>
                            <Link href={secondaryBtnLink} className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto px-8 py-4 bg-neutral-900 border border-neutral-700 text-white rounded-full font-bold font-unbounded text-sm hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2">
                                    {secondaryBtnText}
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Right Floating Element */}
                <motion.div
                    animate={{ y: [15, -15, 15], rotate: [0, -5, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="hidden lg:block w-64 h-64 xl:w-80 xl:h-80 relative shrink-0 order-3"
                >
                    {/* Glow */}
                    <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full transform scale-75" />
                    <div className="relative w-full h-full flex items-center justify-center">
                        <img
                            src={rightImageSrc}
                            alt=""
                            className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        {/* Fallback Shape */}
                        <div className="absolute inset-0 hidden items-center justify-center">
                            <div className="w-32 h-32 bg-gradient-to-bl from-purple-500 to-pink-500 rounded-full shadow-[0_0_50px_rgba(168,85,247,0.5)] border border-white/20" />
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    )
}
