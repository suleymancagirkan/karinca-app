import React from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';

export default function DashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-white dark:bg-black xl:px-8 xl:py-8 p-4 gap-8">
            {/* Sidebar - Desktop visible */}
            <div className="hidden lg:block shrink-0 h-full">
                <DashboardSidebar />
            </div>

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-[1600px] mx-auto rounded-[2.5rem] bg-neutral-50 dark:bg-[#0a0a0a] border border-neutral-100 dark:border-neutral-900 p-8 md:p-12">
                {children}
            </main>
        </div>
    );
}
