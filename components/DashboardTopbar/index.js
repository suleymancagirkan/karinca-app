'use client'

import React, { useState } from 'react';
import Breadcrumbs from '../Breadcrumbs';
import { TbBellFilled, TbHomeFilled, TbZoomFilled, TbLayoutSidebarLeftExpand, TbX, TbSettingsFilled } from 'react-icons/tb';
import Link from 'next/link';

export default function DashboardTopbar({ onMenuToggle = () => { } }) {
    const [hoveredItem, setHoveredItem] = useState('')
    const [searchModal, setSearchModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <>
            <div className='sticky top-0 z-20 flex flex-row items-center justify-between w-full px-4 sm:px-6 md:px-8 lg:px-10 py-4 md:py-6 bg-white/60 dark:bg-black/40 backdrop-blur supports-backdrop-blur:border-b supports-backdrop-blur:border-neutral-200/50 dark:supports-backdrop-blur:border-neutral-800/50'>
                <div className='flex items-center gap-x-3'>
                    <button onClick={onMenuToggle} className='lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl ring-1 ring-transparent hover:ring-neutral-300 dark:hover:ring-neutral-700 text-neutral-700 dark:text-neutral-200 bg-white/50 dark:bg-neutral-900/50'>
                        <TbLayoutSidebarLeftExpand className='text-xl' />
                    </button>
                    <Breadcrumbs />
                </div>
                <div className='py-2 md:py-3 px-4 md:px-5 rounded-2xl bg-neutral-900 flex flex-row items-center justify-start gap-x-6 md:gap-x-10'>
                    <div className='relative flex flex-col items-center'>
                        <button
                            onMouseEnter={() => setHoveredItem('zoom')}
                            onMouseLeave={() => setHoveredItem('')}
                            onClick={() => setSearchModal(true)}
                            className='text-xl text-neutral-400 hover:text-neutral-200 transition-colors'
                        >
                            <TbZoomFilled />
                        </button>

                        {hoveredItem === 'zoom' && (
                            <div className='flex flex-col items-center absolute left-1/2 top-full mt-5 -translate-x-1/2 z-30'>
                                <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-neutral-100" />
                                <div className='p-1.5 rounded-xl text-xs bg-neutral-100 text-black tracking-tight shadow'>
                                    Search
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='relative flex flex-col items-center'>
                        <Link
                            href={"/"}
                            onMouseEnter={() => setHoveredItem('visit')}
                            onMouseLeave={() => setHoveredItem('')}
                            className='text-xl text-neutral-400 hover:text-neutral-200 transition-colors'
                        >
                            <TbHomeFilled />
                        </Link>

                        {hoveredItem === 'visit' && (
                            <div className='flex flex-col items-center absolute left-1/2 top-full mt-5 -translate-x-1/2 z-30 whitespace-nowrap'>
                                <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-neutral-100" />
                                <div className='p-1.5 rounded-xl text-xs bg-neutral-100 text-black tracking-tight shadow'>
                                    Visit Website
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='relative flex flex-col items-center'>
                        <button
                            onMouseEnter={() => setHoveredItem('notification')}
                            onMouseLeave={() => setHoveredItem('')}
                            className='text-xl text-neutral-400 hover:text-neutral-200 transition-colors'
                        >
                            <TbBellFilled />
                        </button>

                        {hoveredItem === 'notification' && (
                            <div className='flex flex-col items-center absolute left-1/2 top-full mt-5 -translate-x-1/2 z-30'>
                                <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-neutral-100" />
                                <div className='p-1.5 rounded-xl text-xs bg-neutral-100 text-black tracking-tight shadow'>
                                    Notifications
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {searchModal && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
                    <div className='bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-lg w-full max-w-xl flex flex-col items-start justift-start w-full'>
                        <div className='flex flex-row items-center justify-between w-full mb-4'>
                            <span className='text-black dark:text-white text-base font-semibold'>Search</span>
                            <button onClick={() => setSearchModal(false)} className='text-neutral-400 hover:text-neutral-200 transition-colors'>
                                <TbX className='text-xl' />
                            </button>
                        </div>
                        <input onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="How can I help you?" className='w-full p-2 border border-neutral-200 dark:border-neutral-800 rounded-xl' />
                        <div className='w-full flex flex-col items-start justify-start gap-y-1.5'>
                            {searchQuery.length > 2 && (
                                <div className='w-full flex flex-col items-start justify-start gap-y-1.5 mt-7'>
                                    <div className='text-sm text-neutral-500 dark:text-neutral-400'>Search Results</div>
                                    <div className='w-full flex flex-col items-start justify-start gap-y-1.5 mt-3'>
                                        <div className='flex flex-row items-center justify-start gap-x-2'>
                                            <TbSettingsFilled className='text-2xl '/>
                                            <div className='flex flex-col items-start justify-start gap-y-0.5'>
                                                <span className='text-white text-sm font-semibold'>Settings</span>
                                                <div className='text-sm'><Breadcrumbs /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};