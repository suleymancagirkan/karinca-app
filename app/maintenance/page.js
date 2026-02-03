'use client';

/**
 * @page Maintenance
 * @description A sleek, technical maintenance page aligned with the 'Unbounded' design system.
 * Features a minimalist construction theme, progress indicators, and direct contact options.
 */

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TbTools, TbCheck, TbMail, TbBrandTwitter, TbBrandInstagram, TbBrandLinkedin } from 'react-icons/tb';

export default function Maintenance() {

    const tasks = [
        { task: "Skeleton Designing", status: "completed" },
        { task: "Blog System Integration", status: "completed" },
        { task: "Support System Integration", status: "completed" },
        { task: "SEO Optimization", status: "in-progress" },
        { task: "Finalizing System", status: "pending" }
    ];

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

                {/* Maintenance Roadmap */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="max-w-2xl mx-auto w-full mb-16 px-6"
                >
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-unbounded font-bold text-lg">System Upgrade Status</h3>
                            <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                                v2.4.0
                            </span>
                        </div>

                        <div className="space-y-4">
                            {tasks.map((item, i) => (
                                <div key={i} className="flex items-center gap-4 group">
                                    <div className={`
                                        w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-300
                                        ${item.status === 'completed'
                                            ? 'bg-green-500 border-green-500 text-black'
                                            : item.status === 'in-progress'
                                                ? 'bg-blue-500/20 border-blue-500 text-blue-500 animate-pulse'
                                                : 'bg-transparent border-white/20 text-transparent'}
                                    `}>
                                        {item.status === 'completed' && <TbCheck className="text-sm" />}
                                        {item.status === 'in-progress' && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                                    </div>
                                    <span className={`
                                        font-medium text-sm transition-colors
                                        ${item.status === 'completed' ? 'text-white/40 line-through' : 'text-white'}
                                        ${item.status === 'in-progress' ? 'text-blue-400' : ''}
                                    `}>
                                        {item.task}
                                    </span>
                                    {item.status === 'in-progress' && (
                                        <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-blue-500 animate-pulse">
                                            Processing
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
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

                    <Link href="/login" className="text-[10px] font-mono text-neutral-600 hover:text-white transition-colors mt-8">
                        Staff Login
                    </Link>
                </motion.div>

            </div>
        </main>
    );
};
