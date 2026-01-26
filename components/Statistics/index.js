'use client';

/**
 * @component Statistics
 * @description A clean, typographic statistics section focusing on "Big Numbers".
 * Uses a grid layout with vertical dividers and Unbounded font for maximum impact.
 * Includes a simple counting animation on view.
 * 
 * @example
 * <Statistics />
 */

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
    { label: "Successful Projects", value: "120", suffix: "+" },
    { label: "Years of Experience", value: "10", suffix: "+" },
    { label: "Revenue Generated", value: "50", suffix: "M" },
    { label: "Client Satisfaction", value: "99", suffix: "%" },
];

export default function Statistics() {
    return (
        <section className="py-20 border-y border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#080808]">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-y-0">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`relative flex flex-col items-center justify-center text-center ${index !== stats.length - 1 ? 'md:border-r border-neutral-200 dark:border-neutral-800' : ''
                                }`}
                        >
                            <div className="relative mb-2">
                                <h3 className="font-unbounded font-black text-5xl md:text-7xl text-neutral-900 dark:text-white tracking-tighter">
                                    {stat.value}
                                    <span className="text-blue-600 text-3xl md:text-5xl align-top ml-1 font-bold">{stat.suffix}</span>
                                </h3>
                                {/* Decorative underline on hover (optional) */}
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-1 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                            </div>
                            <p className="font-unbounded text-xs md:text-sm font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mt-2">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
