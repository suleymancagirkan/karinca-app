'use client';

/**
 * @page FeaturesPage
 * @description A comprehensive showcase of the platform's capabilities.
 * Follows the 'Art House' / 'Unbounded' aesthetic with high-contrast sections,
 * architectural grids, and technical detailing.
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
    TbCpu,
    TbLayoutDashboard,
    TbCloudLock,
    TbDevices,
    TbCode,
    TbActivity,
    TbArrowRight,
    TbLayersIntersect,
    TbBolt
} from 'react-icons/tb';

export default function FeaturesPage() {

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const sections = [
        {
            category: "Core Architecture",
            features: [
                { title: "High Performance", desc: "Built on Next.js 15 with Turbopack for lightning-fast builds and page loads.", icon: <TbBolt /> },
                { title: "Edge Networks", desc: "Global content delivery ensuring low latency regardless of user location.", icon: <TbCpu /> },
                { title: "Secure by Design", desc: "Enterprise-grade encryption and automated threat detection.", icon: <TbCloudLock /> },
            ]
        },
        {
            category: "User Experience",
            features: [
                { title: "Responsive Interface", desc: "Fluid layouts that adapt perfectly to any screen size or device.", icon: <TbDevices /> },
                { title: "Interactive Dashboards", desc: "Real-time data visualization with customizable widget layouts.", icon: <TbLayoutDashboard /> },
                { title: "Motion System", desc: "Silky smooth animations powered by Framer Motion.", icon: <TbActivity /> },
            ]
        },
        {
            category: "Developer Tools",
            features: [
                { title: "API First", desc: "Comprehensive REST and GraphQL APIs for seamless integration.", icon: <TbCode /> },
                { title: "Modern Stack", desc: "TypeScript, Tailwind CSS, and React Server Components.", icon: <TbLayersIntersect /> },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-[#050505] text-neutral-900 dark:text-white relative overflow-x-hidden pt-32 pb-24">

            {/* Background Grid */}
            <div className="fixed inset-0 z-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
                        backgroundSize: '80px 80px'
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="mb-32 max-w-4xl"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <span className="h-px w-12 bg-black dark:bg-white" />
                        <span className="font-unbounded font-bold text-xs uppercase tracking-widest text-neutral-500">System Capabilities</span>
                    </div>

                    <h1 className="font-unbounded font-black text-6xl md:text-8xl mb-8 leading-[0.9] tracking-tighter">
                        ENGINEERED FOR <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">EXCELLENCE</span>
                    </h1>

                    <p className="font-unbounded text-neutral-500 text-lg md:text-xl max-w-2xl leading-relaxed">
                        A systematic breakdown of the technologies and design architectures that power our platform.
                    </p>
                </motion.div>

                {/* Feature Categories */}
                <div className="space-y-32">
                    {sections.map((section, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black dark:border-white pb-6 mb-12">
                                <h2 className="font-unbounded font-bold text-3xl md:text-4xl uppercase tracking-tighter">
                                    {section.category}
                                    <span className="text-blue-600 ml-1">.</span>
                                </h2>
                                <span className="font-mono text-xs opacity-50 mb-2 md:mb-0">0{idx + 1} / 03</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {section.features.map((feature, fIdx) => (
                                    <div key={fIdx} className="group p-8 rounded-3xl bg-neutral-50 dark:bg-white/5 border border-transparent hover:border-neutral-200 dark:hover:border-white/10 transition-colors">
                                        <div className="w-12 h-12 rounded-full bg-white dark:bg-black border border-neutral-200 dark:border-white/20 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
                                            {feature.icon}
                                        </div>
                                        <h3 className="font-unbounded font-bold text-lg mb-3">{feature.title}</h3>
                                        <p className="text-sm text-neutral-500 leading-relaxed">
                                            {feature.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="mt-32 p-12 md:p-24 bg-black dark:bg-white text-white dark:text-black rounded-[3rem] text-center relative overflow-hidden"
                >
                    {/* Abstract shape */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[120px] pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center">
                        <h2 className="font-unbounded font-black text-4xl md:text-6xl mb-8 tracking-tighter">
                            READY TO DEPLOY?
                        </h2>
                        <button className="px-10 py-5 bg-white dark:bg-black text-black dark:text-white rounded-full font-unbounded font-bold text-sm flex items-center gap-2 hover:scale-105 transition-transform">
                            Get Started Now <TbArrowRight />
                        </button>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};
