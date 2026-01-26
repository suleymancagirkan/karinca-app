'use client';

/**
 * @page MyServices
 * @description A page listing the user's active subscriptions and services.
 * Features a clean, high-contrast list view with status indicators and management options.
 * Aligned with the 'Unbounded' design system.
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
    TbServer,
    TbDatabase,
    TbBrush,
    TbChartDots,
    TbPlus,
    TbDotsVertical,
    TbCalendarTime,
    TbArrowUpRight
} from 'react-icons/tb';

export default function ServicesPage() {

    const activeServices = [
        {
            id: 1,
            name: "Corporate Website Hosting",
            type: "Hosting",
            plan: "Enterprise",
            status: "Active",
            renewal: "Oct 24, 2026",
            icon: <TbServer />,
            color: "text-blue-600"
        },
        {
            id: 2,
            name: "Database Cluster A",
            type: "Infrastructure",
            plan: "Standard",
            status: "Active",
            renewal: "Nov 01, 2025",
            icon: <TbDatabase />,
            color: "text-purple-600"
        },
        {
            id: 3,
            name: "Q4 Marketing Campaign",
            type: "Marketing",
            plan: "One-time",
            status: "In Progress",
            renewal: "Ends Dec 31",
            icon: <TbChartDots />,
            color: "text-orange-500"
        }
    ];

    const pastServices = [
        {
            id: 4,
            name: "Logo Redesign",
            type: "Design",
            status: "Completed",
            date: "Sep 15, 2025",
            icon: <TbBrush />,
            color: "text-neutral-400"
        }
    ];

    return (
        <div className="w-full max-w-5xl mx-auto">

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

                <button className="flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full hover:scale-105 transition-transform group">
                    <TbPlus className="text-lg" />
                    <span className="font-unbounded font-bold text-xs">New Service</span>
                </button>
            </div>

            {/* Active Services List */}
            <div className="mb-16">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <h2 className="font-unbounded font-bold text-sm uppercase tracking-wider text-neutral-500">Active Subscriptions</h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {activeServices.map((service, i) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative p-6 md:p-8 rounded-[2rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors flex flex-col md:flex-row items-start md:items-center gap-6"
                        >
                            {/* Icon */}
                            <div className={`w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-2xl ${service.color}`}>
                                {service.icon}
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-unbounded font-bold text-lg leading-tight">
                                        {service.name}
                                    </h3>
                                    <span className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-black border border-neutral-200 dark:border-neutral-800 text-[10px] font-unbounded font-bold uppercase text-neutral-500">
                                        {service.plan}
                                    </span>
                                </div>
                                <p className="font-unbounded text-xs text-neutral-500">
                                    {service.type}
                                </p>
                            </div>

                            {/* Status & Date */}
                            <div className="flex items-center gap-8 w-full md:w-auto mt-2 md:mt-0 justify-between md:justify-end">
                                <div className="text-right">
                                    <div className="flex items-center gap-1 justify-end text-neutral-900 dark:text-white font-unbounded font-bold text-xs">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                        {service.status}
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] text-neutral-400 font-unbounded mt-1">
                                        <TbCalendarTime /> Renews {service.renewal}
                                    </div>
                                </div>

                                <button className="p-2 -mr-2 text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                                    <TbDotsVertical className="text-xl" />
                                </button>
                            </div>

                            {/* Hover Action */}
                            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block pointer-events-none">
                                <TbArrowUpRight className="text-2xl text-blue-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Past / Completed Services */}
            <div>
                <h2 className="font-unbounded font-bold text-sm uppercase tracking-wider text-neutral-500 mb-6">Past Services</h2>
                <div className="grid grid-cols-1 gap-4 opacity-60">
                    {pastServices.map((service, i) => (
                        <div key={service.id} className="p-6 rounded-[1.5rem] bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 flex items-center gap-4">
                            <div className={`text-xl ${service.color}`}>
                                {service.icon}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-unbounded font-bold text-sm">{service.name}</h4>
                                <span className="text-xs text-neutral-500">{service.type}</span>
                            </div>
                            <div className="text-right">
                                <span className="font-unbounded font-bold text-xs block">{service.status}</span>
                                <span className="text-[10px] text-neutral-500">{service.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};
