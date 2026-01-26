'use client';

/**
 * @page PremiumPage
 * @description A high-impact sales page for the Premium subscription.
 * Uses the 'Unbounded' aesthetic: bold typography, architectural grids, and stark contrast.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { TbCheck, TbCrown, TbStar, TbArrowRight, TbDiamonds, TbInfinity, TbRocket } from 'react-icons/tb';
import Link from 'next/link';

export default function Premium() {

    // Smooth scrolling animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <div className="min-h-screen bg-black text-white relative overflow-x-hidden selection:bg-blue-600 selection:text-white">

            {/* Architectural Grid Background */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">

                {/* Hero */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mb-32"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full bg-white/5 backdrop-blur-md mb-8">
                        <TbCrown className="text-yellow-400" />
                        <span className="font-unbounded font-bold text-xs uppercase tracking-widest text-neutral-300">Unlock Full Access</span>
                    </div>

                    <h1 className="font-unbounded font-black text-6xl md:text-8xl lg:text-9xl mb-8 leading-[0.9] tracking-tighter mix-blend-difference">
                        GO BEYOND <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">LIMITS</span>
                    </h1>

                    <p className="font-unbounded text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
                        Get unlimited access to premium features, priority support, and advanced analytics. Elevate your workflow to the next level.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button className="px-8 py-4 bg-white text-black rounded-full font-unbounded font-bold text-sm flex items-center gap-2 hover:scale-105 transition-transform">
                            Upgrade Now <TbArrowRight />
                        </button>
                        <Link href="/features" className="px-8 py-4 border border-white/30 text-white rounded-full font-unbounded font-bold text-sm hover:bg-white/10 transition-colors">
                            View Features
                        </Link>
                    </div>
                </motion.div>

                {/* Feature Marquee / Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    {[
                        { icon: <TbInfinity />, title: "Unlimited Access", desc: "No caps on projects or API usage." },
                        { icon: <TbRocket />, title: "2x Performance", desc: "Dedicated resources for your account." },
                        { icon: <TbDiamonds />, title: "Priority Support", desc: "Direct line to our engineering team." },
                    ].map((feat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="p-8 border border-white/10 bg-white/5 rounded-3xl backdrop-blur-sm"
                        >
                            <div className="text-4xl text-blue-500 mb-6">{feat.icon}</div>
                            <h3 className="font-unbounded font-bold text-xl mb-2">{feat.title}</h3>
                            <p className="text-neutral-400 text-sm">{feat.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Pricing Table (Single 'Pro' Focus) */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="max-w-4xl mx-auto bg-gradient-to-b from-neutral-900 to-black border border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden"
                >
                    {/* Glowing Effect */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

                    <div className="relative z-10 text-center mb-12">
                        <h2 className="font-unbounded font-bold text-3xl mb-4">PREMIUM MEMBERSHIP</h2>
                        <div className="flex items-start justify-center gap-2">
                            <span className="text-2xl mt-2">$</span>
                            <span className="font-unbounded font-black text-8xl">19</span>
                            <span className="text-neutral-500 self-end mb-4">/month</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 relative z-10 mb-12">
                        {[
                            "Unlimited Projects",
                            "Remove Watermark",
                            "4K Export Quality",
                            "Priority Email Support",
                            "Advanced Analytics",
                            "Custom Domains",
                            "Team Collaboration (3 Users)",
                            "API Access"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-black text-sm">
                                    <TbCheck />
                                </div>
                                <span className="font-unbounded font-medium text-sm text-neutral-300">{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="relative z-10 text-center">
                        <button className="w-full md:w-auto px-12 py-5 bg-blue-600 text-white rounded-full font-unbounded font-bold text-lg hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-shadow">
                            Start 14-Day Free Trial
                        </button>
                        <p className="text-neutral-500 text-xs mt-6 font-mono">Cancel anytime. No hidden fees.</p>
                    </div>

                </motion.div>

            </div>
        </div>
    );
};
