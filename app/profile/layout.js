import ProfileSidebar from '@/components/ProfileSidebar';
import React from 'react';

export default function ProfileLayout({ children }) {
    return (
        <div className="flex min-h-screen xl:px-40 xl:pt-25 p-8">
            <ProfileSidebar />
            <div className="flex-1">
                <div className="p-8">
                    {children}
                </div>
            </div>
        </div>
    );
};