'use client';

/**
 * @page CareersPage
 * @description A high-end, professionally designed careers page.
 * Enhanced with complex layouts, rich visual textures, and interactive elements.
 * Adheres strictly to the 'Art House' / 'Unbounded' design system.
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
    TbArrowUpRight,
    TbUsers,
    TbHeartHandshake,
    TbBulb,
    TbWorld,
    TbCoffee,
    TbDeviceLaptop,
    TbMoodSmile
} from 'react-icons/tb';

export default function CareersPage() {

    const benefits = [
        { icon: <TbWorld />, title: "Remote-First", desc: "Work from anywhere. We trust you to do your best work, wherever you are." },
        { icon: <TbHeartHandshake />, title: "Comprehensive Health", desc: "Full medical, dental, and vision coverage for you and your family." },
        { icon: <TbDeviceLaptop />, title: "Top-Tier Gear", desc: "MacBook Pro, 4K monitors, and whatever else you need to succeed." },
        { icon: <TbCoffee />, title: "Wellness Stipend", desc: "Monthly budget for gym, therapy, or your favorite coffee beans." },
        { icon: <TbBulb />, title: "Learning Budget", desc: "$2k/year for conferences, courses, and books to level up your skills." },
        { icon: <TbMoodSmile />, title: "Unlimited PTO", desc: "Take the time you need to recharge. We insist on it." },
    ];

    const positions = [
        { role: "Senior Frontend Engineer", team: "Engineering", loc: "Remote (EU)", type: "Full-time", id: "fe-01" },
        { role: "Backend Architect", team: "Engineering", loc: "Remote (US/EU)", type: "Full-time", id: "be-02" },
        { role: "Product Designer", team: "Design", loc: "London / Remote", type: "Full-time", id: "pd-01" },
        { role: "Product Manager", team: "Product", loc: "New York", type: "Full-time", id: "pm-01" },
        { role: "DevOps Engineer", team: "Infrastructure", loc: "Remote", type: "Contract", id: "do-01" },
        { role: "Content Strategist", team: "Marketing", loc: "Remote", type: "Part-time", id: "cs-01" },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-[#050505] text-neutral-900 dark:text-white pt-24 pb-24 relative selection:bg-pink-500 selection:text-white">

            {/* Background Grain/Grid */}
            <div className="fixed inset-0 z-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            {/* Hero Section */}
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 mb-32 md:mb-48">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row justify-between items-end gap-12"
                >
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white dark:bg-white dark:text-black rounded-full mb-8">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="font-unbounded font-bold text-[10px] uppercase tracking-widest">We are hiring</span>
                        </div>
                        <h1 className="font-unbounded font-black text-7xl md:text-9xl leading-[0.85] tracking-tighter mb-8">
                            JOIN THE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">REVOLUTION</span>
                        </h1>
                        <p className="font-unbounded font-medium text-lg md:text-2xl text-neutral-500 max-w-2xl leading-relaxed">
                            We’re building the future of digital expression. <br />
                            And we need visionaries like you.
                        </p>
                    </div>

                    {/* Stats / Social Proof */}
                    <div className="hidden md:flex flex-col gap-8 text-right">
                        <div>
                            <h4 className="font-unbounded font-black text-5xl">40+</h4>
                            <span className="font-unbounded text-xs uppercase tracking-widest text-neutral-500">Global Team Members</span>
                        </div>
                        <div>
                            <h4 className="font-unbounded font-black text-5xl">$12M</h4>
                            <span className="font-unbounded text-xs uppercase tracking-widest text-neutral-500">Series A Funding</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Collage / Image Strip */}
            <div className="w-full overflow-hidden mb-32 relative z-10">
                <div className="flex gap-4 min-w-full pb-4 scroll-smooth overflow-x-auto no-scrollbar px-6 md:px-0 md:justify-center">
                    {[1, 2, 3, 4].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className={`shrink-0 w-72 h-96 md:w-96 md:h-[500px] rounded-[2rem] bg-neutral-100 dark:bg-neutral-900 relative overflow-hidden group ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 transition-transform duration-500`}
                        >
                            {/* Abstract Gradients as placeholders for photos */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${i === 1 ? 'from-blue-400 to-indigo-500' :
                                    i === 2 ? 'from-pink-400 to-rose-500' :
                                        i === 3 ? 'from-yellow-400 to-orange-500' :
                                            'from-green-400 to-emerald-500'
                                } opacity-80 group-hover:scale-110 transition-transform duration-700`} />

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="font-unbounded font-bold text-white text-xl">Life at Karınca</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Benefits & Culture Grid */}
            <div className="max-w-[1400px] mx-auto px-6 mb-32 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black dark:border-white pb-6 mb-16">
                    <h2 className="font-unbounded font-black text-4xl md:text-5xl uppercase tracking-tighter">
                        Why Join Us?
                    </h2>
                    <p className="font-unbounded text-xs md:text-sm uppercase tracking-widest text-neutral-500 max-w-sm text-right">
                        Perks that actually matter.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {benefits.map((benefit, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                                {benefit.icon}
                            </div>
                            <h3 className="font-unbounded font-bold text-xl mb-3">{benefit.title}</h3>
                            <p className="text-neutral-500 leading-relaxed text-sm">
                                {benefit.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Open Roles Table */}
            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="p-8 md:p-16 rounded-[3rem] bg-neutral-50 dark:bg-[#0A0A0A] border border-neutral-200 dark:border-neutral-900">

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                        <div>
                            <h2 className="font-unbounded font-black text-4xl md:text-6xl uppercase tracking-tighter mb-4">
                                Open Roles
                            </h2>
                            <p className="font-unbounded text-neutral-500">
                                Can't find what you're looking for? <a href="#" className="underline hover:text-black dark:hover:text-white">Email us.</a>
                            </p>
                        </div>

                        {/* Filters (Mock) */}
                        <div className="flex flex-wrap gap-2">
                            {['All', 'Engineering', 'Design', 'Product', 'Marketing'].map((filter, i) => (
                                <button key={i} className={`px-4 py-2 rounded-full font-unbounded text-xs font-bold uppercase tracking-wide border ${i === 0 ? 'bg-black text-white dark:bg-white dark:text-black border-transparent' : 'border-neutral-300 dark:border-neutral-800 hover:border-black dark:hover:border-white'}`}>
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        {positions.map((job, i) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative flex flex-col md:flex-row md:items-center justify-between p-8 rounded-3xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-all cursor-pointer overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out -z-10" />

                                <div className="flex flex-col gap-2 mb-4 md:mb-0">
                                    <h3 className="font-unbounded font-bold text-xl md:text-2xl group-hover:translate-x-2 transition-transform duration-300">
                                        {job.role}
                                    </h3>
                                    <div className="flex gap-3 text-xs font-mono text-neutral-500 uppercase">
                                        <span>{job.team}</span>
                                        <span>/</span>
                                        <span>{job.loc}</span>
                                        <span>/</span>
                                        <span>{job.type}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 self-start md:self-center">
                                    <span className="hidden md:block font-unbounded text-xs font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                                        Apply Now
                                    </span>
                                    <div className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                                        <TbArrowUpRight className="text-xl" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Footer Impact Stamenet */}
            <div className="text-center py-32 px-6">
                <p className="font-unbounded text-neutral-400 text-sm uppercase tracking-widest mb-6">Start your journey</p>
                <a href="mailto:careers@karinca.app" className="font-unbounded font-black text-4xl md:text-7xl hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 transition-all cursor-pointer">
                    careers@karinca.app
                </a>
            </div>

        </div>
    );
};
