'use client'

import Image from 'next/image';
import React, { useState } from 'react';

import logo from "@/public/logo.svg";
import { TbBallpenFilled, TbChevronDown, TbChevronRight, TbDashboardFilled, TbLayoutSidebarLeftExpand, TbLifebuoyFilled, TbMoonFilled, TbRadarFilled, TbSettingsFilled, TbShoppingCartFilled, TbSunFilled, TbUserFilled } from 'react-icons/tb';
import Link from 'next/link';

export default function DashboardSidebar({ isOpen = false, onClose = () => {} }) {
    const [selectedItem, setSelectedItem] = useState('')

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
                { name: 'Roles', route: '/dashboard/users/roles' },
            ]
        },
        {
            name: 'Store',
            icon: <TbShoppingCartFilled className='text-xl ml-2' />,
            subItems: [
                { name: 'Products', route: '/dashboard/store/products' },
                { name: 'Categories', route: '/dashboard/store/categories' },
                { name: 'Coupons', route: '/dashboard/store/coupons' },
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
                { name: 'Categories', route: '/dashboard/support/categories' },
                { name: 'Comments', route: '/dashboard/support/comments' },
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
                { name: 'General', route: '/dashboard/setting/general' },
                { name: 'System', route: '/dashboard/settings/system' },
                { name: 'SEO', route: '/dashboard/settings/general' },
                { name: 'Languages', route: '/dashboard/settings/languages' },
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
                w-64 bg-white h-screen dark:bg-black p-2 px-3 shadow-lg ring-1 ring-neutral-200 dark:ring-neutral-800 backdrop-blur-sm flex flex-col
            `}>
                <div className='flex flex-row items-center justify-between w-full'>
                    <div className='flex flex-row items-center justify-start gap-x-2'>
                        <Image width={25} height={30} alt='logo' src={logo} priority className='dark:invert-100 invert-0' />
                        <span className='text-base text-white tracking-tight font-medium'>Karinca</span>
                    </div>
                    <button className='text-xl text-black dark:text-white p-1.5 rounded-xl ring-1 ring-transparent hover:ring-neutral-700 hover:bg-neutral-800'>
                        <TbMoonFilled />
                    </button>
                </div>
                <div className='flex flex-col items-start justify-between gap-y-2 px-1 mt-3 flex-1'>
                    <div className='flex-1 w-full'>
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
                    <button className='flex flex-row items-center justify-start gap-x-2 w-full text-black/80 dark:text-white/80 hover:bg-neutral-200 dark:hover:bg-neutral-800 p-2 rounded-lg transition'>
                        <img src="https://minotar.net/avatar/cgrkn" className='w-9 rounded-xl' />
                        <div className='flex flex-col items-start justify-start gap-y-1'>
                            <span className='text-sm text-white'>cgrkn</span>
                            <span className='px-2 rounded-md dark:bg-red-500/25 dark:text-red-500 tracking-tight text-xs'>Admin</span>
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
};