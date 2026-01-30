'use client';

/**
 * @component Header
 * @description The main navigation header of the application.
 * It features a responsive design with a glassmorphism effect on scroll,
 * interactive hover states for navigation links, a mega-menu for solutions,
 * and a side drawer for mobile navigation. It also manages theme toggling
 * and user profile access.
 * 
 * @example
 * <Header />
 */

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "@/public/logo.svg";
import { useTheme } from 'next-themes';
import {
    TbActivity,
    TbBuilding,
    TbDashboardFilled,
    TbDoorExit,
    TbMenu2,
    TbMoonFilled,
    TbPlane,
    TbSettingsFilled,
    TbShoe,
    TbSunFilled,
    TbUserFilled,
    TbX,
    TbCreditCardFilled,
    TbTicket,
    TbChevronDown,
    TbQuestionMark,
    TbDashboard
} from "react-icons/tb";
import { signOut, useSession } from 'next-auth/react';

export default function Header() {
    const [dropdown, setDropdown] = useState(null);
    const [mobileMenu, setMobileMenu] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredNav, setHoveredNav] = useState(null);
    const { data: session, status } = useSession()

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const items = [
        {
            name: 'Our Solutions',
            id: 'products',
            isButton: true,
            subItems: [
                { name: 'E-Commerce', description: 'Complete store infrastructure.', route: '/pricing/e-commerce', icon: <TbShoe /> },
                { name: 'Business', description: 'Streamline operations.', route: '/pricing/business', icon: <TbBuilding /> },
                { name: 'Analytics', description: 'Detailed insights.', route: '/pricing/analytics', icon: <TbActivity /> },
            ]
        },
        { name: 'Blogs', route: '/blogs', id: 'blogs' },
        { name: 'Team', route: '/team', id: 'team' },
        { name: 'Pricing', route: '/pricing', id: 'pricing' },
        { name: 'Demo', route: 'https://demo.karinca.app', id: 'demo' },
    ];

    const profileItems = [
        { name: 'Profile', route: '/profile', icon: <TbUserFilled className="text-lg" /> },
        { name: 'Settings', route: '/profile/settings', icon: <TbSettingsFilled className="text-lg" /> },
        { name: 'Billing', route: '/profile/billing', icon: <TbCreditCardFilled className="text-lg" /> },
        { name: 'Support', route: '/profile/support', icon: <TbTicket className="text-lg" /> },
    ];


    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'py-3 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/5 dark:border-white/10 shadow-sm'
                    : 'pt-5 pb-8 bg-transparent'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className='max-w-7xl mx-auto px-6 flex items-center justify-between'>

                    <div className='flex items-center gap-2'>
                        <Link href="/" className="relative group flex items-center gap-2">
                            <Image
                                width={36}
                                height={36}
                                alt='logo'
                                src={logo}
                                priority
                                className='transition-all duration-300 dark:invert-100 invert-0 group-hover:scale-110'
                            />
                            <span className="font-unbounded font-bold text-lg hidden md:block tracking-tight text-neutral-900 dark:text-white">
                                KARINCA
                            </span>
                        </Link>
                    </div>

                    <nav className='hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2'>
                        <div className='bg-black/5 dark:bg-white/5 backdrop-blur-md rounded-full px-2 py-1.5 border border-black/5 dark:border-white/10 flex items-center gap-1'>
                            {items.map((item) => (
                                <div
                                    key={item.id || item.name}
                                    className='relative'
                                    onMouseEnter={() => {
                                        setHoveredNav(item.id || item.name);
                                        if (item.subItems) setDropdown('products');
                                    }}
                                    onMouseLeave={() => {
                                        setHoveredNav(null);
                                    }}
                                >
                                    {item.isButton ? (
                                        <button
                                            onClick={() => setDropdown(dropdown === 'products' ? null : 'products')}
                                            className={`relative z-10 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 flex items-center gap-1 ${dropdown === 'products' ? 'text-black dark:text-white' : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                                                }`}
                                        >
                                            {item.name}
                                            <motion.span animate={{ rotate: dropdown === 'products' ? 180 : 0 }}>
                                                <TbChevronDown className='text-xs opacity-70' />
                                            </motion.span>
                                        </button>
                                    ) : (
                                        <Link
                                            href={item.route}
                                            className='relative z-10 block px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-200'
                                        >
                                            {item.name}
                                        </Link>
                                    )}

                                    {hoveredNav === (item.id || item.name) && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-white dark:bg-neutral-800 rounded-full shadow-sm z-0"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}

                                    <AnimatePresence>
                                        {item.subItems && dropdown === 'products' && (item.id || item.name) === hoveredNav && (
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[600px]" onMouseEnter={() => setDropdown('products')} onMouseLeave={() => setDropdown(null)}>
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                                    transition={{ type: "spring", duration: 0.4 }}
                                                    className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-neutral-200/50 dark:border-neutral-800/50 grid grid-cols-2 gap-4"
                                                >
                                                    {item.subItems.map((sub, idx) => (
                                                        <Link
                                                            key={idx}
                                                            href={sub.route}
                                                            className="group flex gap-4 p-4 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-all duration-200"
                                                        >
                                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                                                {sub.icon}
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-neutral-900 dark:text-neutral-100">{sub.name}</div>
                                                                <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{sub.description}</div>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                    <div className="col-span-2 mt-2 p-3 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 rounded-xl flex items-center justify-between">
                                                        <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Want to see more features?</span>
                                                        <Link href="/features" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">View all features</Link>
                                                    </div>
                                                </motion.div>
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </nav>

                    <div className='flex items-center justify-end gap-3'>

                        <div className="hidden md:flex items-center">
                            {mounted && (
                                <button
                                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                                    className="p-2.5 rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-95"
                                >
                                    {theme === 'light' ? <TbSunFilled className="text-lg" /> : <TbMoonFilled className="text-lg" />}
                                </button>
                            )}
                        </div>

                        {session ? (
                            <div className="relative" onMouseEnter={() => setDropdown('profile')} onMouseLeave={() => setDropdown(null)}>
                                <button className="flex items-center gap-2 pl-1 pr-3 py-1 bg-neutral-100 dark:bg-white/5 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 rounded-full transition-all duration-200">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                        {session?.user?.name.split(" ")[0][0] + session?.user?.name.split(" ")[1][0]}
                                    </div>
                                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">{session?.user?.username}</span>
                                </button>

                                <AnimatePresence>
                                    {dropdown === 'profile' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute top-full right-0 mt-2 w-56 z-50"
                                        >
                                            <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-neutral-200 dark:border-neutral-800">
                                                {profileItems.map((item, idx) => (
                                                    <Link
                                                        key={idx}
                                                        href={item.route}
                                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-sm text-neutral-600 dark:text-neutral-300"
                                                    >
                                                        {item.icon}
                                                        {item.name}
                                                    </Link>
                                                ))}
                                                <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-1" />
                                                {session?.user?.role === 'admin' && (
                                                    <Link href="/dashboard" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-500/10 text-blue-600 dark:text-blue-400 transition-colors text-sm">
                                                        <TbDashboard className="text-lg" />
                                                        Dashboard
                                                    </Link>
                                                )}
                                                <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 dark:text-red-400 transition-colors text-sm">
                                                    <TbDoorExit className="text-lg" />
                                                    Sign out
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link href="/login" className="flex items-center gap-2 pl-1 pr-3 py-1 bg-neutral-100 dark:bg-white/5 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 rounded-full transition-all duration-200">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-500 to-neutral-600 flex items-center justify-center text-white text-base font-bold shrink-0">
                                    <TbQuestionMark />
                                </div>
                                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">Login</span>
                            </Link>
                        )}
                        <button
                            className="lg:hidden p-2 text-2xl text-neutral-800 dark:text-neutral-200"
                            onClick={() => setMobileMenu(true)}
                        >
                            <TbMenu2 />
                        </button>
                    </div>
                </div>
            </motion.header>

            <AnimatePresence>
                {mobileMenu && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
                            onClick={() => setMobileMenu(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-full sm:w-[350px] z-[70] bg-white dark:bg-neutral-900 shadow-2xl border-l border-neutral-200 dark:border-neutral-800 flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800">
                                <div className='flex flex-row items-center justify-start gap-x-2'>
                                    <span className="font-bold text-lg">Menu</span>
                                    <button
                                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                                        className="p-2.5 rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-95"
                                    >
                                        {theme === 'light' ? <TbSunFilled className="text-lg" /> : <TbMoonFilled className="text-lg" />}
                                    </button>
                                </div>
                                <button onClick={() => setMobileMenu(false)} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors">
                                    <TbX className="text-2xl" />
                                </button>
                            </div>


                            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                                {items.map((item, idx) => (
                                    <div key={idx}>
                                        {item.subItems ? (
                                            <div className="space-y-3">
                                                <div className="font-semibold text-neutral-400 text-sm uppercase tracking-wider">{item.name}</div>
                                                <div className="flex flex-col gap-2">
                                                    {item.subItems.map((sub, sIdx) => (
                                                        <Link
                                                            key={sIdx}
                                                            href={sub.route}
                                                            className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                                        >
                                                            <div className="text-xl text-neutral-500">{sub.icon}</div>
                                                            <div>
                                                                <div className="font-medium text-neutral-900 dark:text-neutral-100">{sub.name}</div>
                                                                <div className="text-xs text-neutral-500">{sub.description}</div>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <Link href={item.route} className="block text-lg font-medium text-neutral-800 dark:text-neutral-200 hover:text-blue-600 transition-colors">
                                                {item.name}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {session?.user?.role === 'admin' && (
                                <div className="p-6 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
                                    <Link href="/dashboard" className="flex items-center justify-center gap-2 w-full py-3 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-xl font-medium hover:opacity-90 transition-opacity">
                                        <TbDashboardFilled />
                                        Go to Dashboard
                                    </Link>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
