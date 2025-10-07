'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TbTools, TbBrandTwitter, TbBrandLinkedin, TbBrandGithub, TbRocket, TbCheck, TbBrandInstagram, TbBrandInstagramFilled, TbBrandLinkedinFilled, TbBrandGithubFilled } from 'react-icons/tb';
import { polysans } from '@/app/fonts/polysans';
import { tasaOrbiter } from '@/app/fonts/tasaorbiter';

export default function Maintenance() {
    const upcomingFeatures = [
        { icon: <TbRocket />, title: "Enhanced Performance", description: "Lightning-fast loading times" },
        { icon: <TbTools />, title: "New Dashboard", description: "Redesigned user interface" },
        { icon: <TbCheck />, title: "Advanced Analytics", description: "Detailed insights and reports" },
    ];

    const socialLinks = [
        { icon: <TbBrandInstagramFilled />, href: 'https://www.instagram.com/appkarinca/', label: 'Instagram' },
        { icon: <TbBrandLinkedinFilled />, href: 'https://www.linkedin.com/in/cgrkn', label: 'LinkedIn' },
        { icon: <TbBrandGithubFilled />, href: 'https://github.com/suleymancagirkan', label: 'GitHub' },
    ];

    return (
        <div className={`${polysans.className} min-h-screen bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden`}>
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 pattern-cross pattern-white pattern-bg-transparent pattern-size-4 pattern-opacity-5"></div>
            
            <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto text-center">
                {/* Logo/Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="mb-8"
                >
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <TbTools className="text-4xl text-white" />
                    </div>
                </motion.div>

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-12"
                >
                    <h1 className="text-6xl md:text-7xl font-black text-neutral-900 dark:text-white mb-6 tracking-tight">
                        We are <span className="text-blue-500">upgrading</span>
                    </h1>
                    <p className={`${tasaOrbiter.className} text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto leading-relaxed`}>
                        We are working hard to bring you something amazing. Our platform is temporarily under maintenance while we implement exciting new features.
                    </p>
                </motion.div>


                {/* What is Coming */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-12 w-full max-w-4xl"
                >
                    <div className="flex items-center justify-center gap-x-2 mb-8">
                        <TbRocket className="text-2xl text-blue-500" />
                        <span className={`${tasaOrbiter.className} text-2xl font-bold text-white`}>
                            What is Coming
                        </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {upcomingFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
                            >
                                <div className="flex items-center gap-x-3 mb-4">
                                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                                        {feature.icon}
                                    </div>
                                    <h3 className={`${tasaOrbiter.className} text-lg font-semibold text-white`}>
                                        {feature.title}
                                    </h3>
                                </div>
                                <p className="text-neutral-300 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex items-center gap-x-6"
                >
                    <span className={`${tasaOrbiter.className} text-neutral-600 dark:text-neutral-400`}>
                        Follow us for updates:
                    </span>
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={social.label}
                            href={social.href}
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                            aria-label={social.label}
                        >
                            {social.icon}
                        </motion.a>
                    ))}
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-700 w-full"
                >
                    <p className={`${tasaOrbiter.className} text-neutral-500 dark:text-neutral-500 text-sm`}>
                        © 2024 Karınca. All rights reserved. | 
                        <span className="ml-2 text-blue-500 hover:underline cursor-pointer">Contact Support</span>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
