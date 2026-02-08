'use client';

import React, { useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import { TbMenu2 } from 'react-icons/tb';

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-white dark:bg-black xl:px-8 xl:py-8 p-4 gap-8">
            {/* Mobile Sidebar Overlay & Logic */}
            <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <div className="lg:hidden flex items-center justify-between mb-6">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400"
                    >
                        <TbMenu2 className="text-xl" />
                    </button>
                    <span className="font-unbounded font-bold text-sm">Dashboard</span>
                    <div className="w-10" /> {/* Spacer for centering */}
                </div>

                <main className="flex-1 w-full max-w-[1600px] mx-auto rounded-[2.5rem] bg-neutral-50 dark:bg-[#0a0a0a] border border-neutral-100 dark:border-neutral-900 p-6 md:p-12 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
