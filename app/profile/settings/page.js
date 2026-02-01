'use client';

/**
 * @page AccountSettings
 * @description Consolidated Profile settings page with Tabs.
 * Features a tabbed interface where content switches dynamically.
 * Integrates useSession for automatic data population.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import {
    TbUser,
    TbShieldLock,
    TbBell,
    TbPalette,
    TbCamera,
    TbCheck
} from 'react-icons/tb';

export default function AccountSettings() {
    const { data: session, status, update } = useSession();

    const [activeTab, setActiveTab] = useState('personal');

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || '');
            setBio(session.user.bio || '');
        }
    }, [session]);


    const handleMainButton = () => {
        if (activeTab === 'security') {
            handleChangePassword();
        } else {
            handleSave();
        }
    };

    const handleSave = async () => {
        setIsLoading(true);

        try {
            const response = await fetch('/api/v1/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullname: name,
                    bio: bio
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update settings');
            }
            await update({
                ...session,
                user: {
                    ...session?.user,
                    name: name,
                    bio: bio
                }
            });

            toast.success("Settings updated successfully!");

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangePassword = async () => {
        setIsLoading(true);

        try {
            const response = await fetch('/api/v1/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentPassword: currentPassword,
                    newPassword: newPassword
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update settings');
            }
            await signOut({ callbackUrl: '/login' })

            toast.success("Changed password successfully!");

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    }

    if (status === 'loading') {
        return (
            <div className="min-h-[60vh] w-full flex items-center justify-center">
                <span className="font-unbounded text-xs font-bold animate-pulse text-neutral-400">LOADING PROFILE DATA...</span>
            </div>
        );
    }

    const tabs = [
        { id: 'personal', label: 'Personal Info', icon: <TbUser /> },
        { id: 'security', label: 'Security', icon: <TbShieldLock /> },
        { id: 'notifications', label: 'Notifications', icon: <TbBell /> },
        { id: 'preferences', label: 'Preferences', icon: <TbPalette /> },
    ];

    return (
        <div className="w-full max-w-4xl mx-auto pb-32">

            {/* Header */}
            <div className="mb-8 pt-6">
                <span className="font-unbounded font-bold text-xs uppercase tracking-widest text-neutral-500 mb-2 block">
                    Configuration
                </span>
                <h1 className="font-unbounded font-black text-4xl md:text-5xl text-neutral-900 dark:text-white">
                    ACCOUNT SETTINGS
                </h1>
            </div>

            {/* Tabs Navigation */}
            <div className="flex flex-wrap gap-2 mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative px-6 py-3 font-unbounded text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === tab.id
                            ? 'text-black dark:text-white'
                            : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
                            }`}
                    >
                        <div className="flex items-center gap-2 relative z-10">
                            <span className="text-lg">{tab.icon}</span>
                            {tab.label}
                        </div>
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-black dark:bg-white"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area with Animation */}
            <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* --- PERSONAL INFO TAB --- */}
                        {activeTab === 'personal' && (
                            <div className="space-y-8 max-w-2xl">
                                {/* Avatar Row */}
                                <div className="flex items-center gap-6">
                                    <div className="relative w-24 h-24 rounded-full bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 flex items-center justify-center overflow-hidden group cursor-pointer">
                                        {session?.user?.image ? (
                                            <img src={session?.user?.image} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <TbUser className="text-4xl text-neutral-300 dark:text-neutral-600" />
                                        )}
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <TbCamera className="text-white text-2xl" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-unbounded font-bold text-base">{name || 'User'}</h3>
                                        <p className="text-xs text-neutral-500 mb-2">{session?.user?.email}</p>
                                        <button className="text-[10px] font-unbounded font-bold uppercase tracking-wider text-blue-600 hover:underline">
                                            Upload New Photo
                                        </button>
                                    </div>
                                </div>

                                {/* Inputs */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <Input
                                        label="Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Doe"
                                    />
                                    <Input
                                        label="Email Address"
                                        value={session?.user?.email || ''}
                                        disabled={true}
                                        placeholder="user@example.com"
                                    />
                                    <div className="col-span-full">
                                        <label className="block font-unbounded font-bold text-xs uppercase tracking-wider mb-2 text-neutral-500">Bio</label>
                                        <textarea
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            rows={3}
                                            className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-800 py-2 text-sm font-sans focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-none placeholder:text-neutral-300 dark:placeholder:text-neutral-700"
                                            placeholder="Write a short bio..."
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- SECURITY TAB --- */}
                        {activeTab === 'security' && (
                            <div className="space-y-6 max-w-xl">
                                <Input
                                    label="Current Password"
                                    type="password"
                                    placeholder="••••••••••••"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                                <Input
                                    label="New Password"
                                    type="password"
                                    placeholder="••••••••••••"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <div className="flex justify-end pt-4">
                                    <button className="text-[10px] font-unbounded font-bold text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                                        Update Password Only
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* --- NOTIFICATIONS TAB --- */}
                        {activeTab === 'notifications' && (
                            <div className="space-y-6 max-w-xl">
                                <label className="block font-unbounded font-bold text-xs uppercase tracking-wider mb-4 text-neutral-500">(COMING SOON)</label>
                                <ToggleSwitch label="Email Updates" desc="Receive daily digests and activity summaries." />
                                <ToggleSwitch label="Marketing" desc="Receive product news and special offers." />
                                <ToggleSwitch label="Security Alerts" desc="Get notified about login attempts." />
                            </div>
                        )}

                        {/* --- PREFERENCES TAB --- */}
                        {activeTab === 'preferences' && (
                            <div className="space-y-6 max-w-xl">
                                <div className="space-y-2">
                                    <label className="block font-unbounded font-bold text-xs uppercase tracking-wider mb-2 text-neutral-500">Language (COMING SOON)</label>
                                    <select className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-800 py-2 text-sm focus:outline-none cursor-pointer">
                                        <option>English (United States)</option>
                                        <option>Turkish (Türkiye)</option>
                                    </select>
                                </div>
                                <div className="mt-12">
                                    <button className="text-red-500 font-unbounded font-bold text-xs uppercase tracking-wider hover:opacity-70">
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Floating Save Button */}
            <div className="fixed bottom-8 right-8 z-30">
                <button
                    onClick={handleMainButton}
                    disabled={isLoading}
                    className="group bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-unbounded font-bold text-xs uppercase tracking-widest shadow-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <TbCheck className="text-lg" />
                    )}
                    <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                </button>
            </div>

        </div>
    );
}

// UI Components Helpers

function Input({ label, type = "text", value, onChange, disabled, placeholder }) {
    return (
        <div className="flex flex-col group">
            <label className="font-unbounded font-bold text-xs uppercase tracking-wider mb-2 text-neutral-500 group-focus-within:text-blue-600 transition-colors">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                placeholder={placeholder}
                className="bg-transparent border-b border-neutral-200 dark:border-neutral-800 py-2 text-sm font-sans focus:outline-none focus:border-black dark:focus:border-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-neutral-300 dark:placeholder:text-neutral-700 w-full"
            />
        </div>
    );
}

function ToggleSwitch({ label, desc }) {
    const [isOn, setIsOn] = useState(true);
    return (
        <div className="flex items-start justify-between group cursor-pointer" onClick={() => setIsOn(!isOn)}>
            <div>
                <h4 className="font-unbounded font-bold text-sm mb-1 group-hover:text-blue-600 transition-colors">{label}</h4>
                <p className="text-[10px] md:text-xs text-neutral-500">{desc}</p>
            </div>
            <div className={`relative w-10 h-6 rounded-full p-1 transition-colors duration-300 ${isOn ? 'bg-black dark:bg-white' : 'bg-neutral-200 dark:bg-neutral-800'}`}>
                <motion.div
                    className={`w-4 h-4 rounded-full bg-white dark:bg-black shadow-sm`}
                    animate={{ x: isOn ? 16 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
            </div>
        </div>
    );
}
