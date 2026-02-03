'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
    TbActivity,
    TbTrendingUp,
    TbUsers,
    TbArrowUpRight,
    TbClock,
    TbTicket,
    TbCash
} from 'react-icons/tb';

export default function Dashboard() {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        stats: {
            users: 0,
            orders: 0,
            activeTickets: 0,
            revenue: 0
        },
        activities: []
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/admin/dashboard/stats');
                if (res.ok) {
                    const jsonData = await res.json();
                    setData(jsonData);
                }
            } catch (error) {
                console.error("Dashboard stats error:", error);
                // toast.error("Failed to load dashboard stats"); // Optional: don't annoy user on load
            } finally {
                setLoading(false);
            }
        };

        if (session?.user?.role === 'admin') {
            fetchStats();
        } else {
            setLoading(false);
        }
    }, [session]);

    // Format time ago
    const timeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    };

    // Construct Stats Array
    const statsItems = [
        {
            label: "Total Revenue",
            value: `${data.stats.revenue.toLocaleString()} ₺`,
            // change: "+12%", // We don't have historical data yet for change
            icon: <TbCash />,
            color: "bg-green-500"
        },
        {
            label: "Total Users",
            value: data.stats.users.toLocaleString(),
            // change: "+5%", 
            icon: <TbUsers />,
            color: "bg-blue-500"
        },
        {
            label: "Active Tickets",
            value: data.stats.activeTickets.toLocaleString(),
            // change: "+18%", 
            icon: <TbTicket />,
            color: "bg-red-500"
        },
    ];

    if (loading) {
        return <div className="p-8 text-center text-neutral-500">Loading dashboard...</div>;
    }

    return (
        <div className="space-y-12">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <span className="font-unbounded font-bold text-xs uppercase tracking-widest text-neutral-400 mb-2 block">
                        Overview
                    </span>
                    <h1 className="font-unbounded font-black text-3xl md:text-5xl text-neutral-900 dark:text-white leading-tight">
                        Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{session?.user?.name?.split(' ')[0] || session?.user?.fullname?.split(' ')[0] || 'Admin'}</span>.
                    </h1>
                </div>
                <div className="text-right hidden md:block">
                    <p className="font-unbounded text-xs font-bold text-neutral-400">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statsItems.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group p-6 rounded-[2rem] bg-white dark:bg-black border border-neutral-100 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors relative overflow-hidden"
                    >
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-neutral-50 dark:to-white/5 rounded-bl-[4rem] transition-transform group-hover:scale-110`} />

                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <div className={`p-3 rounded-2xl text-white ${stat.color} shadow-lg shadow-${stat.color.split('-')[1]}-500/30`}>
                                <span className="text-xl">{stat.icon}</span>
                            </div>
                            {/* <span className="flex items-center gap-1 font-unbounded text-[10px] font-bold text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                                {stat.change} <TbArrowUpRight />
                            </span> */}
                        </div>

                        <div className="relative z-10">
                            <h3 className="font-unbounded font-black text-3xl text-neutral-900 dark:text-white mb-1">
                                {stat.value}
                            </h3>
                            <p className="font-unbounded text-xs font-bold text-neutral-400 uppercase tracking-wide">
                                {stat.label}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Content Split: Chart (Placeholder) & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Content / Chart Placeholder */}
                <div className="lg:col-span-2 p-8 rounded-[2.5rem] bg-white dark:bg-black border border-neutral-100 dark:border-neutral-800 min-h-[300px] flex flex-col justify-between group">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-unbounded font-bold text-xl">Analytics</h3>
                        <button className="text-xs font-unbounded font-bold text-neutral-400 hover:text-black dark:hover:text-white transition-colors">View All</button>
                    </div>

                    {/* Visual Placeholder for a Chart */}
                    <div className="flex-1 flex items-end justify-between gap-2 px-4 pb-4">
                        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                className="w-full bg-neutral-100 dark:bg-neutral-900 rounded-t-xl group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-colors duration-500"
                            />
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="p-8 rounded-[2.5rem] bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                    <h3 className="font-unbounded font-bold text-lg mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {data.activities.length > 0 ? (
                            data.activities.map((item, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${item.type === 'user' ? 'bg-blue-500' : 'bg-green-500'}`} />
                                    <div>
                                        <p className="font-bold text-sm text-neutral-800 dark:text-neutral-200 leading-tight mb-1">
                                            {item.title}
                                        </p>
                                        <div className="flex items-center gap-1 text-xs text-neutral-400 font-medium">
                                            <TbClock className="text-base" />
                                            {timeAgo(item.time)}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-neutral-500 text-sm">No recent activity.</p>
                        )}
                    </div>
                    {/* <button className="w-full mt-8 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 font-unbounded text-xs font-bold hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
                        View History
                    </button> */}
                </div>
            </div>

        </div>
    );
}
