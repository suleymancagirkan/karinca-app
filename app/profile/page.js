'use client';

/**
 * @page ProfileDashboard
 * @description The main overview page for the user's profile.
 * Redesigned to match the 'Art House' / 'Unbounded' aesthetic.
 * Features a high-contrast welcome section, status cards, and recent activity logs.
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
    TbActivity,
    TbShieldCheck,
    TbRocket,
    TbClock,
    TbArrowUpRight
} from 'react-icons/tb';

export default function Profile() {

    // Mock Data
    const stats = [
        { label: 'Status', value: 'Active', icon: <TbShieldCheck />, color: 'text-green-500' },
        { label: 'Plan', value: 'Standard', icon: <TbRocket />, color: 'text-blue-500' },
        { label: 'Uptime', value: '99.9%', icon: <TbActivity />, color: 'text-purple-500' },
        { label: 'Last Login', value: '2m ago', icon: <TbClock />, color: 'text-orange-500' },
    ];

    const activities = [
        { title: 'Project Created', desc: 'New marketing campaign initiated', time: '2 hours ago' },
        { title: 'Billing Updated', desc: 'Payment method successfully changed', time: '1 day ago' },
        { title: 'Security Alert', desc: 'New login detected from Istanbul', time: '3 days ago' },
    ];

    return (
        <div className="w-full">

            {/* Architectural Grid Background (Subtle) */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #808080 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                    }}
                />
            </div>

            {/* Header */}
            <header className="mb-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className="font-unbounded font-bold text-xs uppercase tracking-widest text-neutral-500 mb-2 block">
                        Overview
                    </span>
                    <h1 className="font-unbounded font-black text-4xl md:text-5xl text-neutral-900 dark:text-white mb-4">
                        WELCOME BACK, <br /> <span className="text-blue-600">JOHN</span>
                    </h1>
                    <p className="font-unbounded text-sm text-neutral-500 max-w-lg">
                        Here's what's happening with your account today.
                    </p>
                </motion.div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 relative z-10">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800"
                    >
                        <div className={`text-2xl mb-4 ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <div className="font-unbounded font-bold text-lg text-neutral-900 dark:text-white">
                            {stat.value}
                        </div>
                        <div className="font-unbounded text-xs text-neutral-500 uppercase tracking-wide">
                            {stat.label}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">

                {/* Recent Activity */}
                <div className="lg:col-span-2 p-8 rounded-[2rem] bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-unbounded font-bold text-lg">Recent Activity</h3>
                        <button className="text-xs font-unbounded font-bold text-blue-600 hover:underline">View All</button>
                    </div>

                    <div className="space-y-6">
                        {activities.map((act, i) => (
                            <div key={i} className="flex items-start gap-4 group">
                                <div className="mt-1 w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-700 group-hover:bg-blue-500 transition-colors" />
                                <div>
                                    <h4 className="font-unbounded font-bold text-sm text-neutral-900 dark:text-white">
                                        {act.title}
                                    </h4>
                                    <p className="text-xs text-neutral-500 mt-1">
                                        {act.desc}
                                    </p>
                                </div>
                                <span className="ml-auto text-[10px] font-unbounded text-neutral-400">
                                    {act.time}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions Card */}
                <div className="p-8 rounded-[2rem] bg-blue-600 text-white flex flex-col justify-between">
                    <div>
                        <h3 className="font-unbounded font-black text-2xl mb-4">
                            UNLOCK <br /> PREMIUM
                        </h3>
                        <p className="font-unbounded text-xs opacity-80 mb-8 leading-relaxed">
                            Upgrade your plan to access advanced analytics, unlimited projects, and priority support.
                        </p>
                    </div>

                    <button className="w-full py-4 bg-white text-blue-600 rounded-xl font-unbounded font-bold text-sm flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                        Upgrade Now <TbArrowUpRight className="text-lg" />
                    </button>
                </div>

            </div>
        </div>
    );
}