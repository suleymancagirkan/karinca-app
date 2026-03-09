'use client';

/**
 * @component Footer
 * @description A comprehensive and modern footer component featuring a multi-column layout.
 * It includes company branding, social media links, navigation links organized by category (Product, Company, Resources, Legal),
 * and an email subscription form. The design utilizes a large container with responsive grid spacing,
 * stylized links with hover effects, and a copyright notice.
 * 
 * @example
 * <Footer />
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    TbBrandTwitterFilled,
    TbBrandLinkedinFilled,
    TbBrandGithubFilled,
    TbBrandInstagramFilled,
    TbMail,
    TbMapPin,
    TbArrowRight
} from 'react-icons/tb';
import logo from '@/public/logo.svg';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        product: [
            { name: 'Features', href: '/features' },
            { name: 'Pricing', href: '/pricing' },
            { name: 'Integrations', href: '/integrations' },
            { name: 'API Reference', href: '/api' },
        ],
        company: [
            { name: 'About Us', href: '/about' },
            { name: 'Careers', href: '/careers', badge: 'HIRING' },
            { name: 'Blog', href: '/blogs' },
            { name: 'Contact', href: '/contact' },
        ],
        // resources: [
        //     { name: 'Documentation', href: '/docs' },
        //     { name: 'Help Center', href: '/help' },
        //     { name: 'Community', href: '/community' },
        //     { name: 'Status', href: '/status' },
        // ],
        legal: [
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms of Service', href: '/terms' },
            { name: 'Cookie Policy', href: '/cookies' },
            { name: 'Check Licence', href: '/check-licence' },
        ]
    };

    const socialLinks = [
        { icon: <TbBrandInstagramFilled className="text-xl" />, href: 'https://www.instagram.com/appkarinca', label: 'Instagram' },
        { icon: <TbBrandLinkedinFilled className="text-xl" />, href: 'https://www.linkedin.com/in/cgrkn', label: 'LinkedIn' },
        { icon: <TbBrandGithubFilled className="text-xl" />, href: 'https://github.com/suleymancagirkan', label: 'GitHub' },
        { icon: <TbBrandTwitterFilled className="text-xl" />, href: 'https://twitter.com/appkarinca', label: 'Twitter' },
    ];

    return (
        <footer className="relative bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800 pt-20 pb-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Top Section: Brand & Newsletter */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16">
                    <div className="space-y-6">
                        <Link href="/" className="inline-flex items-center gap-3">
                            <Image
                                width={48}
                                height={48}
                                alt="Karınca Logo"
                                src={logo}
                                className="dark:invert-100 invert-0"
                            />
                            <span className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                                Karinca
                            </span>
                        </Link>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-md leading-relaxed">
                            Building the future of SaaS, one block at a time. Empowering developers to launch faster and scale smarter.
                        </p>
                        <div className="flex items-center gap-4 text-neutral-500 dark:text-neutral-500">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <TbMail className="text-lg" />
                                hello@karinca.app
                            </div>
                            <div className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <TbMapPin className="text-lg" />
                                Manisa, Turkey
                            </div>
                        </div>
                    </div>

                    <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-3xl p-8 border border-neutral-100 dark:border-neutral-800">
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                            Stay up to date
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-sm">
                            Subscribe to our newsletter for the latest updates, tips, and exclusive offers.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-black/50 border border-neutral-200 dark:border-neutral-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-neutral-400"
                            />
                            <button className="px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                                Subscribe
                                <TbArrowRight />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="w-full h-px bg-neutral-200 dark:bg-neutral-800 mb-16" />

                {/* Middle Section: Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    <div>
                        <h4 className="font-bold text-neutral-900 dark:text-neutral-100 mb-6">Product</h4>
                        <ul className="space-y-4">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-neutral-900 dark:text-neutral-100 mb-6">Company</h4>
                        <ul className="space-y-4">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="group flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors">
                                        {link.name}
                                        {link.badge && (
                                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                                                {link.badge}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* 
                    <div>
                        <h4 className="font-bold text-neutral-900 dark:text-neutral-100 mb-6">Resources</h4>
                        <ul className="space-y-4">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div> */}

                    <div>
                        <h4 className="font-bold text-neutral-900 dark:text-neutral-100 mb-6">Legal</h4>
                        <ul className="space-y-4">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Section: Copyright & Socials */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                    <p className="text-neutral-500 dark:text-neutral-500 text-sm font-medium">
                        © {currentYear} Karinca Inc. All rights reserved.
                    </p>

                    <div className="flex items-center gap-2">
                        {socialLinks.map((social) => (
                            <Link
                                key={social.label}
                                href={social.href}
                                aria-label={social.label}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300"
                            >
                                {social.icon}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-full overflow-hidden pointer-events-none z-0 opacity-40 dark:opacity-20">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen" />
            </div>
        </footer>
    );
}
