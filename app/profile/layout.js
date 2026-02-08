import ProfileSidebar from '@/components/ProfileSidebar';
import React from 'react';

export default function ProfileLayout({ children }) {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen pt-24 lg:pt-32 px-4 md:px-8 xl:px-40 gap-8">
            <ProfileSidebar />
            <div className="flex-1 w-full">
                <div className="py-8">
                    {children}
                </div>
            </div>
        </div>
    );
};