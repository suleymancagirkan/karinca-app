'use client'

import Image from 'next/image';
import React, { useState } from 'react';

import logo from "@/public/logo.svg";
import { TbBallpenFilled, TbChevronDown, TbChevronRight, TbDashboardFilled, TbHomeFilled, TbLayoutSidebarLeftExpand, TbLifebuoyFilled, TbMoonFilled, TbRadarFilled, TbSettingsFilled, TbShoppingCartFilled, TbSunFilled, TbUserFilled } from 'react-icons/tb';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { UserBadge } from '@/lib/functions';

export default function DashboardSidebar({ isOpen = false, onClose = () => { } }) {
    const [selectedItem, setSelectedItem] = useState('');
    const { data: session } = useSession();

    const items = [
        {
            name: 'Dashboard',
            icon: <TbDashboardFilled className='text-xl ml-2' />,
            route: '/dashboard'
        },
        {
            name: 'Users',
            icon: <TbUserFilled className='text-xl ml-2' />,
            subItems: [
                { name: 'Manage Users', route: '/dashboard/users' },
            ]
        },
        {
            name: 'Store',
            icon: <TbShoppingCartFilled className='text-xl ml-2' />,
            subItems: [
                { name: 'Tiers', route: '/dashboard/store/tiers' },
                { name: 'Categories', route: '/dashboard/store/categories' },
                { name: 'Themes', route: '/dashboard/store/themes' },
                { name: 'Coupons', route: '/dashboard/store/coupons' },
                { name: 'Subscriptions', route: '/dashboard/store/subscriptions' },
                { name: 'Orders', route: '/dashboard/store/orders' },
            ]
        },
        {
            name: 'Support',
            icon: <TbLifebuoyFilled className='text-xl ml-2' />,
            subItems: [
                { name: 'Tickets', route: '/dashboard/support/tickets' },
                { name: 'Categories', route: '/dashboard/support/categories' },
            ]
        },
        {
            name: 'Blogs',
            icon: <TbBallpenFilled className='text-xl ml-2' />,
            subItems: [
                { name: 'Posts', route: '/dashboard/blogs/posts' },
                { name: 'Categories', route: '/dashboard/blogs/categories' },
                { name: 'Comments', route: '/dashboard/blogs/comments' },
            ]
        },
        {
            name: 'Logs',
            icon: <TbRadarFilled className='text-xl ml-2' />,
            route: '/dashboard/logs'
        },
        {
            name: 'Settings',
            icon: <TbSettingsFilled className='text-xl ml-2' />,
            subItems: [
                { name: 'General', route: '/dashboard/settings/general' },
                { name: 'SEO', route: '/dashboard/settings/seo' },
            ]
        },
    ]

    return (
        <>
            {isOpen && (
                <div onClick={onClose} className='fixed inset-0 bg-black/40 lg:hidden z-30' />
            )}
            <div className={`
                fixed inset-y-0 left-0 z-40 lg:z-auto lg:static
                transform transition-transform duration-300
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
                w-64 bg-white h-full dark:bg-black p-4 shadow-lg ring-1 ring-neutral-200 dark:ring-neutral-800 lg:ring-0 backdrop-blur-sm flex flex-col lg:rounded-[2rem] lg:bg-transparent lg:dark:bg-transparent lg:shadow-none
            `}>
                {/* HEADER */}
                <div className='flex flex-row items-center justify-between w-full mb-6 px-2 shrink-0'>
                    <div className='flex flex-row items-center justify-start gap-x-3'>
                        <Image width={28} height={28} alt='logo' src={logo} priority className='dark:invert invert-0' />
                        <span className='text-lg text-black dark:text-white tracking-tight font-bold font-unbounded'>Karinca</span>
                    </div>
                    <Link href="/" className='text-lg text-black dark:text-white p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors'>
                        <TbHomeFilled />
                    </Link>
                </div>

                {/* SCROLLABLE MENU AREA (Takes all remaining space) */}
                <div className='flex-1 w-full overflow-y-auto overflow-x-hidden space-y-1'>
                    {items.map((item, index) => (
                        item.route ? (
                            <Link key={index} href={item.route} className='flex flex-row mt-2 items-center justify-start gap-x-2 w-full text-black/80 dark:text-white/80 hover:bg-neutral-200 dark:hover:bg-neutral-800 py-2 rounded-lg transition'>
                                {item.icon}
                                <span className='text-sm'>{item.name}</span>
                            </Link>
                        ) : (
                            <div key={index} className='flex flex-col items-start mt-2 justify-start w-full'>
                                <button onClick={() => setSelectedItem(selectedItem === item.name ? null : item.name)} className='flex flex-row items-center justify-between w-full text-black/80 dark:text-white/80 hover:bg-neutral-200 dark:hover:bg-neutral-800 py-2 rounded-lg transition'>
                                    <div className='flex flex-row items-center justify-start gap-x-2'>
                                        {item.icon}
                                        <span className='text-sm'>{item.name}</span>
                                    </div>
                                    {selectedItem === item.name ? <TbChevronDown className='text-xl mr-2' /> : <TbChevronRight className='text-xl mr-2' />}
                                </button>
                                {selectedItem === item.name && (
                                    <div className='flex flex-col items-start justify-start w-full border-l border-neutral-800 ml-4'>
                                        {item.subItems?.map((it, ind) => (
                                            <Link key={ind} href={it.route} className='flex flex-row border-l border-neutral-800 hover:border-neutral-600 items-center justify-start gap-x-2 pl-4 w-full text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white py-2 transition'>
                                                <span className='text-xs'>{it.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    ))}
                </div>

                {/* PROFILE SECTION (Pinned to bottom) */}
                <div className='mt-4 w-full pt-4 border-t border-neutral-100 dark:border-neutral-800 shrink-0'>
                    <button className='flex flex-row items-center justify-start gap-x-3 w-full text-black/80 dark:text-white/80 hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2.5 rounded-xl transition-all group'>
                        <div className="relative">
                            {session?.user?.image ? (
                                <img src={session.user.image} className='w-10 h-10 rounded-full group-hover:scale-105 transition-transform object-cover' alt="User Avatar" />
                            ) : (
                                <img src="https://minotar.net/avatar/suleymannn" className='w-10 h-10 rounded-xl group-hover:scale-105 transition-transform' alt="Default Avatar" />
                            )}
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-black"></div>
                        </div>
                        <div className='flex flex-col items-start justify-start gap-y-0.5'>
                            <span className='text-sm font-bold font-unbounded text-black dark:text-white truncate max-w-[120px]'>
                                {session?.user?.username || 'Guest User'}
                            </span>
                            <UserBadge role={session?.user?.role} />
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
}