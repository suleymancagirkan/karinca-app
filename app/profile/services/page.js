'use client';

/**
 * @page MyServices
 * @description A page listing the user's active subscriptions and services.
 * Features a clean, high-contrast list view with status indicators and management options.
 * Aligned with the 'Unbounded' design system.
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TbServer,
    TbDatabase,
    TbBrush,
    TbChartDots,
    TbPlus,
    TbDotsVertical,
    TbCalendarTime,
    TbArrowUpRight,
    TbExternalLink,
    TbSettings,
    TbBox
} from 'react-icons/tb';
import Link from 'next/link';

export default function ServicesPage() {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch('/api/v1/users/subscriptions');
                if (res.ok) {
                    const data = await res.json();
                    setServices(data);
                }
            } catch (error) {
                console.error('Failed to load services:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchServices();
    }, []);

    const getIconForCategory = (categoryName) => {
        const lower = (categoryName || '').toLowerCase();
        if (lower.includes('hosting')) return <TbServer />;
        if (lower.includes('database')) return <TbDatabase />;
        if (lower.includes('design')) return <TbBrush />;
        if (lower.includes('marketing')) return <TbChartDots />;
        return <TbBox />;
    };

    return (
        <div className="w-full max-w-5xl mx-auto px-6 py-12">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <span className="font-unbounded font-bold text-xs uppercase tracking-widest text-neutral-500 mb-2 block">
                        Management
                    </span>
                    <h1 className="font-unbounded font-black text-4xl md:text-5xl text-neutral-900 dark:text-white">
                        MY SERVICES
                    </h1>
                </div>

                <Link href="/pricing">
                    <button className="flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full hover:scale-105 transition-transform group shadow-lg shadow-neutral-200 dark:shadow-neutral-800">
                        <TbPlus className="text-lg" />
                        <span className="font-unbounded font-bold text-xs">New Service</span>
                    </button>
                </Link>
            </div>

            {/* Active Services List */}
            {isLoading ? (
                <div className="p-12 text-center text-neutral-500 font-unbounded text-sm">
                    Loading services...
                </div>
            ) : services.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-16 bg-neutral-50 dark:bg-neutral-900 rounded-[2rem] border border-neutral-100 dark:border-neutral-800 text-center">
                    <TbBox className="text-4xl text-neutral-300 mb-4" />
                    <h3 className="font-unbounded font-bold text-lg text-neutral-900 dark:text-white mb-2">No Active Services</h3>
                    <p className="text-neutral-500 max-w-sm mx-auto mb-8">
                        You don't have any active subscriptions yet. Explore our plans to get started.
                    </p>
                    <Link href="/pricing">
                        <span className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold font-unbounded text-xs hover:bg-blue-700 transition-colors">
                            Browse Plans
                        </span>
                    </Link>
                </div>
            ) : (
                <div className="mb-16">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <h2 className="font-unbounded font-bold text-sm uppercase tracking-wider text-neutral-500">Active Subscriptions</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <AnimatePresence>
                            {services.map((service, i) => (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group relative p-6 md:p-8 rounded-[1.5rem] bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all flex flex-col md:flex-row items-center gap-6"
                                >
                                    {/* Icon */}
                                    <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-2xl text-neutral-600 dark:text-neutral-400 shrink-0">
                                        {getIconForCategory(service.category?.name)}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0 flex flex-col gap-1 w-full text-center md:text-left">
                                        <div className="flex items-center justify-center md:justify-start gap-3">
                                            <h3 className="font-unbounded font-bold text-lg leading-tight truncate text-neutral-900 dark:text-white">
                                                {service.category?.name || 'Service'}
                                            </h3>
                                            <span className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-[10px] font-unbounded font-bold uppercase text-neutral-600 dark:text-neutral-400 shrink-0">
                                                {service.tier?.name}
                                            </span>
                                        </div>

                                        {/* Meta Info */}
                                        <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 text-xs font-medium text-neutral-400">
                                            <span className="flex items-center gap-1">
                                                <TbCalendarTime className="text-sm" /> Renews: {new Date(service.endDate).toLocaleDateString()}
                                            </span>
                                            {service.theme?.name && (
                                                <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                                                    <TbBrush className="text-sm" /> Theme: {service.theme.name}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0 justify-center md:justify-end shrink-0">

                                        <button className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-xl font-unbounded font-bold text-xs hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
                                            <TbArrowUpRight className="text-lg rotate-180" /> Download
                                        </button>

                                        {service.theme?.url ? (
                                            <a
                                                href={service.theme.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-xl font-unbounded font-bold text-xs hover:scale-105 active:scale-95 transition-all shadow-lg shadow-neutral-500/10"
                                            >
                                                Launch <TbExternalLink className="text-lg" />
                                            </a>
                                        ) : (
                                            <button className="flex items-center gap-2 px-4 py-2 border border-neutral-200 dark:border-neutral-800 text-neutral-400 dark:text-neutral-500 rounded-xl font-unbounded font-bold text-xs cursor-not-allowed opacity-50">
                                                <TbSettings className="text-lg" /> Setup Pending
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            )}

            {/* Note: Past services section removed for now as we don't have expired/cancelled fetch API yet, can be added later */}

        </div>
    );
};
