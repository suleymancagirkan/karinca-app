'use client';

/**
 * @page SupportPage
 * @description A dedicated support center aligned with the 'Unbounded' design system.
 * Features a knowledge base search, quick ticket creation, and categorization of help topics.
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
    TbSearch,
    TbBook,
    TbLifebuoy,
    TbChevronRight,
    TbMessage,
    TbMail,
    TbMessageCircle
} from 'react-icons/tb';

export default function SupportPage() {

    const categories = [
        { title: "Getting Started", desc: "Setting up your account and first steps.", icon: <TbRocket className="text-blue-500" /> },
        { title: "Billing & Plans", desc: "Invoices, payments and subscription management.", icon: <TbCreditCard className="text-green-500" /> },
        { title: "Account Security", desc: "2FA, password reset and login issues.", icon: <TbShieldLock className="text-red-500" /> },
        { title: "Technical Issues", desc: "API errors, downtime and bug reports.", icon: <TbServer className="text-purple-500" /> },
    ];

    const popularArticles = [
        "How to upgrade my subscription plan?",
        "Where can I find my API keys?",
        "Configuring custom domains",
        "Transferring ownership of a project"
    ];

    return (
        <div className="w-full max-w-5xl mx-auto">

            {/* Header */}
            <div className="mb-12 text-center md:text-left">
                <span className="font-unbounded font-bold text-xs uppercase tracking-widest text-neutral-500 mb-2 block">
                    Help Center
                </span>
                <h1 className="font-unbounded font-black text-4xl md:text-5xl text-neutral-900 dark:text-white mb-6">
                    HOW CAN WE <br className="hidden md:block" /> HELP YOU?
                </h1>

                {/* Search Bar */}
                <div className="relative max-w-2xl">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <TbSearch className="text-xl text-neutral-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for articles, guides, or troubleshooting..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all font-unbounded text-sm placeholder:font-sans"
                    />
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {/* Live Chat */}
                <div className="p-8 rounded-[2rem] bg-blue-600 text-white flex flex-col justify-between group cursor-pointer hover:scale-[1.02] transition-transform">
                    <TbMessageCircle className="text-4xl mb-4" />
                    <div>
                        <h3 className="font-unbounded font-bold text-lg mb-1">Live Chat</h3>
                        <p className="text-xs font-unbounded opacity-80 mb-4">Chat with our support team in real-time.</p>
                        <div className="flex items-center gap-2 font-bold text-xs font-unbounded bg-white/20 w-fit px-3 py-1.5 rounded-full">
                            Start Chat <TbChevronRight />
                        </div>
                    </div>
                </div>

                {/* Submit Ticket */}
                <div className="p-8 rounded-[2rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between group cursor-pointer hover:border-black dark:hover:border-white transition-colors">
                    <TbMail className="text-4xl mb-4 text-neutral-900 dark:text-white" />
                    <div>
                        <h3 className="font-unbounded font-bold text-lg mb-1">Email Support</h3>
                        <p className="text-xs text-neutral-500 mb-4">Get a response within 24 hours.</p>
                        <button className="text-xs font-unbounded font-bold underline">Submit a Ticket</button>
                    </div>
                </div>

                {/* Documentation */}
                <div className="p-8 rounded-[2rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between group cursor-pointer hover:border-black dark:hover:border-white transition-colors">
                    <TbBook className="text-4xl mb-4 text-neutral-900 dark:text-white" />
                    <div>
                        <h3 className="font-unbounded font-bold text-lg mb-1">Documentation</h3>
                        <p className="text-xs text-neutral-500 mb-4">Browse detailed guides and API docs.</p>
                        <button className="text-xs font-unbounded font-bold underline">View Docs</button>
                    </div>
                </div>
            </div>

            {/* Content Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Categories */}
                <div className="lg:col-span-2">
                    <h2 className="font-unbounded font-bold text-sm uppercase tracking-wider text-neutral-500 mb-8">Browse Topics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categories.map((cat, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer group">
                                <div className="text-xl mb-3 group-hover:scale-110 transition-transform origin-left">
                                    {cat.icon}
                                </div>
                                <h4 className="font-unbounded font-bold text-sm mb-1">{cat.title}</h4>
                                <p className="text-xs text-neutral-500">{cat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Popular Articles */}
                <div>
                    <h2 className="font-unbounded font-bold text-sm uppercase tracking-wider text-neutral-500 mb-8">Popular Articles</h2>
                    <div className="space-y-4">
                        {popularArticles.map((article, i) => (
                            <a key={i} href="#" className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 transition-colors group">
                                <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white transition-colors">{article}</span>
                                <TbChevronRight className="text-neutral-400 group-hover:text-blue-500" />
                            </a>
                        ))}
                    </div>

                    <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 text-center">
                        <TbLifebuoy className="text-3xl mx-auto mb-3 text-neutral-500" />
                        <h4 className="font-unbounded font-bold text-xs mb-1">Still stuck?</h4>
                        <p className="text-[10px] text-neutral-500 mb-4">Our community forum might have the answer.</p>
                        <button className="px-4 py-2 bg-white dark:bg-black rounded-lg text-xs font-bold font-unbounded shadow-sm">Visit Community</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

// Icons for category map
import { TbRocket, TbCreditCard, TbShieldLock, TbServer } from 'react-icons/tb';
