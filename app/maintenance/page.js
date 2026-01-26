'use client';

/**
 * @page Maintenance
 * @description A sleek, technical maintenance page aligned with the 'Unbounded' design system.
 * Features a minimalist construction theme, progress indicators, and direct contact options.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { TbTools, TbRocket, TbClock, TbMail, TbBrandTwitter, TbBrandInstagram, TbBrandLinkedin } from 'react-icons/tb';

export default function Maintenance() {
    return (
        <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Architectural Grid Background */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            {/* Spotlight Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-3xl w-full text-center">

                {/* Icon */}
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", duration: 0.8 }}
                    className="w-24 h-24 mx-auto mb-12 bg-white text-black rounded-3xl flex items-center justify-center"
                >
                    <TbTools className="text-5xl" />
                </motion.div>

                {/* Typography */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <span className="h-px w-12 bg-white/50" />
                        <span className="font-unbounded font-bold text-blue-500 uppercase tracking-widest text-sm">
                            System Update
                        </span>
                        <span className="h-px w-12 bg-white/50" />
                    </div>

                    <h1 className="font-unbounded font-black text-5xl md:text-7xl mb-6 tracking-tighter">
                        UNDER <br /> CONSTRUCTION
                    </h1>

                    <p className="font-unbounded text-neutral-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-12">
                        We are currently performing scheduled maintenance to improve our systems.
                        We should be back shortly. Thank you for your patience.
                    </p>
                </motion.div>

                {/* Progress / Status Features */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
                >
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                        <TbRocket className="text-2xl text-blue-500 mb-3 mx-auto" />
                        <h3 className="font-unbounded font-bold text-sm mb-1">Performance</h3>
                        <p className="text-xs text-neutral-500">Optimizing core systems</p>
                    </div>
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                        <TbClock className="text-2xl text-blue-500 mb-3 mx-auto" />
                        <h3 className="font-unbounded font-bold text-sm mb-1">Estimated Time</h3>
                        <p className="text-xs text-neutral-500">~2 Hours Remaining</p>
                    </div>
                    <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                        <div className="relative w-6 h-6 mx-auto mb-3">
                            <span className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
                            <span className="relative block w-6 h-6 bg-green-500 rounded-full" />
                        </div>
                        <h3 className="font-unbounded font-bold text-sm mb-1">Status</h3>
                        <p className="text-xs text-neutral-500">Deployment in progress</p>
                    </div>
                </motion.div>

                {/* Footer / Socials */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col items-center gap-6"
                >
                    <span className="font-unbounded text-xs font-bold text-neutral-500">FOLLOW US FOR UPDATES</span>
                    <div className="flex gap-4">
                        {[
                            { icon: <TbBrandInstagram />, href: "#" },
                            { icon: <TbBrandTwitter />, href: "#" },
                            { icon: <TbBrandLinkedin />, href: "#" }
                        ].map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                className="p-3 rounded-full bg-white/5 hover:bg-white hover:text-black transition-all duration-300"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>

                    <a href="mailto:support@karinca.app" className="font-unbounded text-sm font-bold flex items-center gap-2 mt-4 hover:text-blue-500 transition-colors">
                        <TbMail /> Contact Support
                    </a>
                </motion.div>

            </div>
        </main>
    );
};
