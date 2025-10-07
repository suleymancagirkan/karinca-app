'use client';

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
    TbX
} from "react-icons/tb";

export default function Header() {
    const [dropdown, setDropdown] = useState(null);
    const [mobileMenu, setMobileMenu] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const items = [
        {
            name: 'Our Solutions',
            onClick: () => setDropdown(dropdown === 'products' ? null : 'products'),
            isButton: true,
            subItems: [
                { name: 'E-Commerce', description: 'Modern and fast online sales infrastructure.', route: '/pricing/e-commerce', icon: <TbShoe /> },
                { name: 'Bus & Plane Ticket', description: 'Track your data and optimize your growth.', route: '/pricing/ticket', icon: <TbPlane /> },
                { name: 'Institutional', description: 'Manage your customer relations from a single point.', route: '/pricing/institutional', icon: <TbBuilding /> },
            ]
        },
        { name: 'Blogs', route: '/blogs' },
        { name: 'References', route: '/references' },
        { name: 'Premium', route: '/premium' },
    ];

    const profileItems = [
        { name: 'Profile', route: '/profile', icon: <TbUserFilled className="text-lg" /> },
        { name: 'Settings', route: '/profile/settings', icon: <TbSettingsFilled className="text-lg" /> },
        { name: 'Activity', route: '/profile/activity', icon: <TbActivity className="text-lg" /> },
    ];

    useEffect(() => setMounted(true), []);

    return (
        <>
            <div className='px-6 py-4 xl:flex hidden flex-row items-center justify-between'>
                <Link href="/">
                    <Image width={48} height={48} alt='logo' src={logo} priority className='dark:invert-0 invert'/>
                </Link>

                {/* Desktop Menu */}
                <div className='flex flex-row items-center justify-center space-x-2 relative'>
                    {items.map((item, index) => (
                        item.isButton !== true ? (
                            <Link
                                key={index}
                                href={item.route}
                                className='px-2 py-1 rounded-xl text-base font-medium hover:bg-neutral-100 hover:ring-1 hover:ring-neutral-200/65 dark:hover:bg-neutral-900 dark:hover:ring-neutral-800/65'
                            >
                                {item.name}
                            </Link>
                        ) : (
                            <div key={index} className='relative'>
                                <button
                                    onClick={item.onClick}
                                    className='px-2 py-1 rounded-xl text-base font-medium hover:bg-neutral-100 hover:ring-1 hover:ring-neutral-200/65 dark:hover:bg-neutral-900 dark:hover:ring-neutral-800/65'
                                >
                                    {item.name}
                                </button>

                                <AnimatePresence>
                                    {dropdown === 'products' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className='absolute top-12 left-0 min-w-[500px] z-50'
                                        >
                                            <div className="absolute -top-2 left-6 w-0 h-0 
                                                border-l-8 border-r-8 border-b-8 
                                                border-transparent border-b-neutral-100 dark:border-b-neutral-900">
                                            </div>

                                            <div className='p-4 rounded-xl grid grid-cols-2 gap-3 bg-neutral-100 ring-1 ring-neutral-200/65 dark:bg-neutral-900 dark:ring-neutral-800/65'>
                                                {item.subItems.map((it, ind) => (
                                                    <Link
                                                        href={it.route}
                                                        key={ind}
                                                        className='flex flex-row items-start justify-start gap-x-2 hover:bg-neutral-200/50 dark:hover:bg-neutral-800 p-2 rounded-lg transition'
                                                    >
                                                        <div className='p-2 rounded-xl bg-white dark:bg-black/85 dark:text-white/85 text-2xl text-black ring-1 ring-neutral-200 dark:ring-neutral-800'>
                                                            {it.icon}
                                                        </div>
                                                        <div className='flex flex-col items-start justify-start gap-y-1'>
                                                            <span className='text-sm text-black dark:text-white font-medium tracking-tight'>
                                                                {it.name}
                                                            </span>
                                                            <span className='text-xs text-black/75 dark:text-white/75 tracking-tight'>
                                                                {it.description}
                                                            </span>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )
                    ))}
                </div>

                {/* Desktop Theme & Profile */}
                <div className='flex flex-row items-center justify-start gap-x-2'>
                    {mounted && (
                        theme === 'light' ? (
                            <button
                                onClick={() => setTheme('dark')}
                                className="p-2 rounded-xl text-xl hover:bg-neutral-100 hover:ring-1 hover:ring-neutral-200/65 dark:hover:bg-neutral-900 dark:hover:ring-neutral-800/65"
                            >
                                <TbSunFilled />
                            </button>
                        ) : (
                            <button
                                onClick={() => setTheme('light')}
                                className="p-2 rounded-xl text-xl hover:bg-neutral-100 hover:ring-1 hover:ring-neutral-200/65 dark:hover:bg-neutral-900 dark:hover:ring-neutral-800/65"
                            >
                                <TbMoonFilled />
                            </button>
                        )
                    )}

                    {/* Profile Dropdown */}
                    <div className='relative'>
                        <button
                            onClick={() => setDropdown(dropdown === 'profile' ? null : 'profile')}
                            className='p-2 flex flex-row items-center justify-start gap-x-1 rounded-xl text-base hover:bg-neutral-100 hover:ring-1 hover:ring-neutral-200/65 dark:hover:bg-neutral-900 dark:hover:ring-neutral-800/65'
                        >
                            <TbUserFilled className='text-xl' />
                            <span className='italic'>cgrkn</span>
                        </button>
                        <AnimatePresence>
                            {dropdown === 'profile' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className='absolute top-12 right-0 w-48 z-50'
                                >
                                    <div className="absolute -top-2 right-6 w-0 h-0 
                                        border-l-8 border-r-8 border-b-8 
                                        border-transparent border-b-neutral-100 dark:border-b-neutral-900">
                                    </div>

                                    <div className='p-4 rounded-xl flex flex-col items-center w-full justify-start bg-neutral-100 ring-1 ring-neutral-200/65 dark:bg-neutral-900 dark:ring-neutral-800/65'>
                                        {profileItems.map((item, index) => (
                                            <Link
                                                href={item.route}
                                                key={index}
                                                className="flex items-center gap-x-2 w-full px-3 py-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800"
                                            >
                                                {item.icon}
                                                <span className="text-sm">{item.name}</span>
                                            </Link>
                                        ))}
                                        <Link href='/dashboard' className='flex items-center gap-x-2 w-full px-3 py-2 text-sm text-blue-700 hover:bg-blue-100 dark:hover:bg-blue-500/10 rounded-lg'>
                                            <TbDashboardFilled className="text-lg" />
                                            <span>Dashboard</span>
                                        </Link>
                                        <button className="flex items-center gap-x-2 w-full px-3 py-2 text-sm text-red-700 hover:bg-red-100 dark:hover:bg-red-500/10 rounded-lg">
                                            <TbDoorExit className="text-lg" />
                                            Logout
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Mobile Header */}
            <div className="flex xl:hidden items-center justify-between px-6 py-4">
                <button onClick={() => setMobileMenu(true)} className="p-2 text-2xl">
                    <TbMenu2 />
                </button>
                <Link href="/">
                    <Image width={40} height={40} alt='logo' src={logo} priority className='dark:invert-0 invert'/>
                </Link>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenu && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/50"
                        onClick={() => setMobileMenu(false)}
                    >
                        <motion.div
                            initial={{ x: -250 }}
                            animate={{ x: 0 }}
                            exit={{ x: -250 }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="absolute top-0 left-0 w-3/4 max-w-xs h-full bg-white dark:bg-neutral-900 p-6 flex flex-col gap-y-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button onClick={() => setMobileMenu(false)} className="self-end text-2xl">
                                <TbX />
                            </button>

                            {items.map((item, index) => (
                                item.isButton !== true ? (
                                    <Link
                                        key={index}
                                        href={item.route}
                                        className='py-2 text-lg font-medium'
                                    >
                                        {item.name}
                                    </Link>
                                ) : (
                                    <div key={index} className='flex flex-col'>
                                        <button
                                            onClick={item.onClick}
                                            className='py-2 text-lg font-medium text-left'
                                        >
                                            {item.name}
                                        </button>
                                        <AnimatePresence>
                                            {dropdown === 'products' && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className='ml-4 flex flex-col gap-y-2'
                                                >
                                                    {item.subItems.map((sub, i) => (
                                                        <Link
                                                            key={i}
                                                            href={sub.route}
                                                            className='flex items-center gap-x-2 text-sm py-1'
                                                        >
                                                            {sub.icon}
                                                            <span>{sub.name}</span>
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )
                            ))}

                            <hr className="my-4 border-neutral-300 dark:border-neutral-700" />

                            {/* Profile in mobile */}
                            <div className='flex flex-col gap-y-2'>
                                <button
                                    onClick={() => setDropdown(dropdown === 'profile' ? null : 'profile')}
                                    className="flex items-center gap-x-2 py-2"
                                >
                                    <TbUserFilled className="text-xl" /> cgrkn
                                </button>
                                <AnimatePresence>
                                    {dropdown === 'profile' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="ml-4 flex flex-col gap-y-2"
                                        >
                                            {profileItems.map((item, index) => (
                                                <Link key={index} href={item.route} className="flex items-center gap-x-2 text-sm">
                                                    {item.icon} {item.name}
                                                </Link>
                                            ))}
                                            <Link href='/dashboard' className="flex items-center gap-x-2 text-blue-600 text-sm">
                                                <TbDashboardFilled /> Dashboard
                                            </Link>
                                            <button className="flex items-center gap-x-2 text-red-600 text-sm">
                                                <TbDoorExit /> Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
