'use client';

/**
 * @page AccountSettings
 * @description Profile settings page aligned with 'Unbounded' design system.
 * Features typographic headers, clean input fields, custom toggles, and a structured tab system.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TbUser,
    TbShieldLock,
    TbBell,
    TbPalette,
    TbCamera
} from 'react-icons/tb';

export default function AccountSettings() {
    const [activeTab, setActiveTab] = useState('personal');

    const tabs = [
        { id: 'personal', label: 'Personal Info', icon: <TbUser /> },
        { id: 'security', label: 'Security', icon: <TbShieldLock /> },
        { id: 'notifications', label: 'Notifications', icon: <TbBell /> },
        { id: 'preferences', label: 'Preferences', icon: <TbPalette /> },
    ];

    return (
        <div className="w-full max-w-5xl mx-auto">

            {/* Page Header */}
            <div className="mb-12">
                <span className="font-unbounded font-bold text-xs uppercase tracking-widest text-neutral-500 mb-2 block">
                    Configuration
                </span>
                <h1 className="font-unbounded font-black text-4xl md:text-5xl text-neutral-900 dark:text-white">
                    SETTINGS
                </h1>
            </div>

            {/* Custom Tabs */}
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
                                className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-black dark:bg-white"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'personal' && <PersonalInfoTab />}
                    {activeTab === 'security' && <SecurityTab />}
                    {activeTab === 'notifications' && <NotificationsTab />}
                    {activeTab === 'preferences' && <PreferencesTab />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

// Sub-components for cleaner file structure

function PersonalInfoTab() {
    return (
        <div className="space-y-12">
            {/* Avatar Section */}
            <div className="flex items-center gap-8">
                <div className="relative w-24 h-24 rounded-full bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 flex items-center justify-center overflow-hidden group cursor-pointer">
                    <TbUser className="text-4xl text-neutral-400 group-hover:opacity-50 transition-opacity" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opal-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <TbCamera className="text-white text-2xl" />
                    </div>
                </div>
                <div>
                    <h3 className="font-unbounded font-bold text-lg mb-1">Profile Photo</h3>
                    <p className="text-xs text-neutral-500 max-w-xs">
                        This will be displayed on your profile and public posts.
                    </p>
                    <div className="flex gap-4 mt-4">
                        <button className="text-xs font-unbounded font-bold text-blue-600">Upload New</button>
                        <button className="text-xs font-unbounded font-bold text-red-500">Remove</button>
                    </div>
                </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <Input label="First Name" defaultValue="John" />
                <Input label="Last Name" defaultValue="Doe" />
                <Input label="Email" defaultValue="john.doe@email.com" type="email" />
                <Input label="Phone" defaultValue="+1 (555) 000-0000" type="tel" />
                <div className="col-span-full">
                    <label className="block font-unbounded font-bold text-xs uppercase tracking-wider mb-2 text-neutral-500">Bio</label>
                    <textarea
                        rows={4}
                        className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-800 py-2 text-sm font-sans focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-none"
                        defaultValue="Senior Developer building the future of web."
                    />
                </div>
            </div>

            <div className="flex justify-end pt-8">
                <button className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-unbounded font-bold text-xs hover:scale-105 transition-transform">
                    Save Changes
                </button>
            </div>
        </div>
    );
}

function SecurityTab() {
    return (
        <div className="space-y-12 max-w-2xl">
            <div>
                <h3 className="font-unbounded font-bold text-lg mb-6">Password</h3>
                <div className="space-y-6">
                    <Input label="Current Password" type="password" />
                    <Input label="New Password" type="password" />
                    <div className="flex justify-end">
                        <button className="text-xs font-unbounded font-bold text-blue-600">Update Password</button>
                    </div>
                </div>
            </div>

            <div className="h-px bg-neutral-100 dark:bg-neutral-800" />

            <div>
                <h3 className="font-unbounded font-bold text-lg mb-6">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between p-6 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
                    <div>
                        <p className="font-bold text-sm mb-1">Authenticator App</p>
                        <p className="text-xs text-neutral-500">Secure your account with TOTP.</p>
                    </div>
                    <button className="px-4 py-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg text-xs font-bold font-unbounded">Setup</button>
                </div>
            </div>
        </div>
    );
}

function NotificationsTab() {
    const toggles = [
        { label: "Email Notifications", desc: "Receive updates about your account via email." },
        { label: "Marketing Emails", desc: "Receive news about products and features." },
        { label: "Security Alerts", desc: "Get notified about suspicious activity." },
    ];

    return (
        <div className="space-y-8 max-w-2xl">
            {toggles.map((item, i) => (
                <div key={i} className="flex items-start justify-between">
                    <div>
                        <h4 className="font-unbounded font-bold text-sm mb-1">{item.label}</h4>
                        <p className="text-xs text-neutral-500">{item.desc}</p>
                    </div>
                    <ToggleSwitch />
                </div>
            ))}
        </div>
    )
}

function PreferencesTab() {
    return (
        <div className="space-y-8 max-w-2xl">
            <div className="space-y-4">
                <label className="block font-unbounded font-bold text-xs uppercase tracking-wider mb-2 text-neutral-500">Language</label>
                <select className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-800 py-2 text-sm focus:outline-none">
                    <option>English (US)</option>
                    <option>Turkish (TR)</option>
                    <option>Spanish (ES)</option>
                </select>
            </div>

            <div className="space-y-4">
                <label className="block font-unbounded font-bold text-xs uppercase tracking-wider mb-2 text-neutral-500">Theme</label>
                <select className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-800 py-2 text-sm focus:outline-none">
                    <option>System Default</option>
                    <option>Light</option>
                    <option>Dark</option>
                </select>
            </div>

            <div className="pt-12">
                <button className="text-red-500 font-unbounded font-bold text-xs hover:underline">
                    Delete Account
                </button>
            </div>
        </div>
    )
}

// UI Helper Components
const Input = ({ label, type = "text", defaultValue }) => (
    <div className="flex flex-col">
        <label className="font-unbounded font-bold text-xs uppercase tracking-wider mb-2 text-neutral-500">{label}</label>
        <input
            type={type}
            defaultValue={defaultValue}
            className="bg-transparent border-b border-neutral-200 dark:border-neutral-800 py-2 text-sm font-sans focus:outline-none focus:border-black dark:focus:border-white transition-colors"
        />
    </div>
);

const ToggleSwitch = () => {
    const [isOn, setIsOn] = useState(true);
    return (
        <button
            className={`w-10 h-6 rounded-full p-1 transition-colors ${isOn ? 'bg-black dark:bg-white' : 'bg-neutral-200 dark:bg-neutral-700'}`}
            onClick={() => setIsOn(!isOn)}
        >
            <motion.div
                className={`w-4 h-4 rounded-full bg-white dark:bg-black shadow-sm`}
                animate={{ x: isOn ? 16 : 0 }}
            />
        </button>
    )
}
