'use client';

/**
 * @component Features (Services)
 * @description A modern, responsive Bento Grid layout displaying the agency's core services.
 * Features high-contrast cards with refined Unbounded typography, hover states, 
 * and subtle motion effects. Designed to sit perfectly below the Hero section.
 * 
 * @example
 * <Features />
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
    TbDeviceDesktopCode,
    TbBrush,
    TbDeviceMobile,
    TbSeo,
    TbBrandGoogleAnalytics,
    TbArrowUpRight
} from 'react-icons/tb';

const services = [
    {
        title: "Web Development",
        description: "High-performance, scalable web applications built with cutting-edge technologies.",
        icon: <TbDeviceDesktopCode className="text-4xl" />,
        colSpan: "md:col-span-2",
        bg: "bg-neutral-900 text-white dark:bg-white dark:text-black"
    },
    {
        title: "UI/UX Design",
        description: "Crafting intuitive and aesthetically pleasing user experiences.",
        icon: <TbBrush className="text-4xl" />,
        colSpan: "md:col-span-1",
        bg: "bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
    },
    {
        title: "Mobile Solutions",
        description: "Native and cross-platform mobile apps for iOS and Android.",
        icon: <TbDeviceMobile className="text-4xl" />,
        colSpan: "md:col-span-1",
        bg: "bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
    },
    {
        title: "SEO & Growth",
        description: "Data-driven strategies to boost your online presence and reach.",
        icon: <TbSeo className="text-4xl" />,
        colSpan: "md:col-span-2",
        bg: "bg-blue-600 text-white"
    }
];

export default function Features() {
    return (
        <section className="py-24 md:py-32 bg-white dark:bg-[#050505] text-neutral-900 dark:text-white relative overflow-hidden">

            {/* Background Grid (Consistent with Hero) */}
            <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">

                {/* Section Header */}
                <div className="mb-20 md:flex md:items-end md:justify-between">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-unbounded font-black text-5xl md:text-7xl tracking-tighter mb-6"
                        >
                            OUR <br /> EXPERTISE
                        </motion.h2>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100px" }}
                            viewport={{ once: true }}
                            className="h-2 bg-blue-600"
                        />
                    </div>
                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 md:mt-0 font-unbounded text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-md text-right md:text-left"
                    >
                        We combine strategy, design, and technology to solve complex business challenges.
                    </motion.p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`group relative p-8 md:p-12 rounded-[2rem] flex flex-col justify-between h-[300px] md:h-[400px] hover:scale-[1.01] transition-transform duration-300 ${service.colSpan} ${service.bg}`}
                        >
                            <div className="flex justify-between items-start">
                                <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 inline-flex">
                                    {service.icon}
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <TbArrowUpRight className="text-3xl rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                </div>
                            </div>

                            <div>
                                <h3 className="font-unbounded font-bold text-2xl md:text-3xl mb-4 leading-tight">
                                    {service.title}
                                </h3>
                                <p className="font-unbounded text-sm md:text-base opacity-70 leading-relaxed max-w-xs">
                                    {service.description}
                                </p>
                            </div>

                            {/* Hover Gradient Overlay */}
                            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </motion.div>
                    ))}

                    {/* CTA Card (Always last) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="group relative p-8 md:p-12 rounded-[2rem] flex flex-col justify-center items-center text-center h-[300px] md:h-[400px] bg-neutral-50 dark:bg-[#0A0A0A] border-2 border-dashed border-neutral-300 dark:border-neutral-800 md:col-span-1 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
                    >
                        <div className="w-16 h-16 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <TbArrowUpRight className="text-3xl text-neutral-500 dark:text-neutral-400" />
                        </div>
                        <h3 className="font-unbounded font-bold text-xl mb-2">View All Services</h3>
                        <p className="font-unbounded text-xs text-neutral-500">Explore our full capabilities</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
