'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    TbShield, 
    TbShieldCheck, 
    TbKey, 
    TbLock, 
    TbEye, 
    TbEyeOff, 
    TbDeviceDesktop, 
    TbPhone, 
    TbTrash, 
    TbAlertTriangle,
    TbCheck,
    TbX,
    TbRefresh,
    TbDownload,
    TbQrcode,
    TbCopy,
    TbClock,
    TbMapPin,
    TbBrowser
} from 'react-icons/tb';

export default function SecuritySettings() {
    const [showPassword, setShowPassword] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    const securityStatus = {
        passwordStrength: 'strong',
        twoFactorEnabled: true,
        lastPasswordChange: '2024-01-10',
        securityScore: 95
    };

    const activeSessions = [
        {
            id: 1,
            device: 'MacBook Pro',
            browser: 'Chrome 120.0',
            location: 'San Francisco, CA',
            ip: '192.168.1.100',
            lastActive: '2 hours ago',
            isCurrent: true,
            icon: <TbDeviceDesktop className="text-2xl" />
        },
        {
            id: 2,
            device: 'iPhone 15',
            browser: 'Safari Mobile',
            location: 'San Francisco, CA',
            ip: '192.168.1.101',
            lastActive: '1 day ago',
            isCurrent: false,
            icon: <TbPhone className="text-2xl" />
        },
        {
            id: 3,
            device: 'Windows PC',
            browser: 'Edge 120.0',
            location: 'New York, NY',
            ip: '203.0.113.1',
            lastActive: '3 days ago',
            isCurrent: false,
            icon: <TbDeviceDesktop className="text-2xl" />
        }
    ];

    const securityEvents = [
        {
            type: 'login',
            description: 'Successful login from new device',
            location: 'San Francisco, CA',
            time: '2 hours ago',
            status: 'success'
        },
        {
            type: 'password_change',
            description: 'Password changed successfully',
            location: 'San Francisco, CA',
            time: '1 week ago',
            status: 'success'
        },
        {
            type: '2fa_enabled',
            description: 'Two-factor authentication enabled',
            location: 'San Francisco, CA',
            time: '2 weeks ago',
            status: 'success'
        },
        {
            type: 'failed_login',
            description: 'Failed login attempt',
            location: 'Unknown',
            time: '1 month ago',
            status: 'warning'
        }
    ];

    const tabs = [
        { id: 'overview', label: 'Overview', icon: <TbShield className="text-lg" /> },
        { id: 'password', label: 'Password', icon: <TbKey className="text-lg" /> },
        { id: '2fa', label: 'Two-Factor Auth', icon: <TbShieldCheck className="text-lg" /> },
        { id: 'sessions', label: 'Active Sessions', icon: <TbDeviceDesktop className="text-lg" /> },
        { id: 'activity', label: 'Security Activity', icon: <TbClock className="text-lg" /> }
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'success': return <TbCheck className="text-green-600" />;
            case 'warning': return <TbAlertTriangle className="text-yellow-600" />;
            case 'error': return <TbX className="text-red-600" />;
            default: return <TbCheck className="text-neutral-600" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'success': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
            case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
            case 'error': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
            default: return 'text-neutral-600 bg-neutral-100 dark:bg-neutral-900/20';
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
            >
                <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
                    Security Settings
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                    Manage your account security and privacy settings.
                </p>
            </motion.div>

            {/* Security Score */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-8"
            >
                <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Security Score</h3>
                            <p className="text-green-100">Your account is well protected</p>
                        </div>
                        <div className="text-right">
                            <div className="text-4xl font-bold">{securityStatus.securityScore}</div>
                            <div className="text-green-100">out of 100</div>
                        </div>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                        <div 
                            className="bg-white rounded-full h-3 transition-all duration-1000"
                            style={{ width: `${securityStatus.securityScore}%` }}
                        ></div>
                    </div>
                </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
            >
                <div className="flex flex-wrap gap-2 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                activeTab === tab.id
                                    ? 'bg-white dark:bg-neutral-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                            }`}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Content */}
            {activeTab === 'overview' && (
                <div className="space-y-8">
                    {/* Security Status Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
                                    <TbShieldCheck className="text-2xl text-green-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-black dark:text-white">Two-Factor Auth</h4>
                                    <p className="text-green-600 text-sm font-medium">✓ Enabled</p>
                                </div>
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                Extra security layer for your account
                            </p>
                        </div>

                        <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                                    <TbKey className="text-2xl text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-black dark:text-white">Password</h4>
                                    <p className="text-green-600 text-sm font-medium">Strong</p>
                                </div>
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                Last changed {securityStatus.lastPasswordChange}
                            </p>
                        </div>

                        <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
                                    <TbDeviceDesktop className="text-2xl text-purple-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-black dark:text-white">Active Sessions</h4>
                                    <p className="text-blue-600 text-sm font-medium">{activeSessions.length} devices</p>
                                </div>
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                Manage your logged-in devices
                            </p>
                        </div>
                    </motion.div>

                    {/* Recent Security Events */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-8"
                    >
                        <h3 className="text-2xl font-bold text-black dark:text-white mb-6">
                            Recent Security Activity
                        </h3>
                        <div className="space-y-4">
                            {securityEvents.map((event, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                                    <div className={`p-2 rounded-lg ${getStatusColor(event.status)}`}>
                                        {getStatusIcon(event.status)}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-black dark:text-white">
                                            {event.description}
                                        </h4>
                                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                            {event.location} • {event.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            )}

            {activeTab === 'password' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-8"
                >
                    <h3 className="text-2xl font-bold text-black dark:text-white mb-6">
                        Change Password
                    </h3>
                    
                    <div className="max-w-md space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-black dark:text-white mb-2">
                                Current Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="w-full px-4 py-3 pr-12 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                                >
                                    {showPassword ? <TbEyeOff className="text-xl" /> : <TbEye className="text-xl" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black dark:text-white mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black dark:text-white mb-2">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-900 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                            <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Password Requirements:</h4>
                            <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                                <li>• At least 8 characters long</li>
                                <li>• Contains uppercase and lowercase letters</li>
                                <li>• Contains at least one number</li>
                                <li>• Contains at least one special character</li>
                            </ul>
                        </div>

                        <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                            Update Password
                        </button>
                    </div>
                </motion.div>
            )}

            {activeTab === '2fa' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-6"
                >
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800 p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
                                <TbShieldCheck className="text-3xl text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    Two-Factor Authentication Enabled
                                </h3>
                                <p className="text-green-600 dark:text-green-400">
                                    Your account is protected with an extra layer of security
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl">
                                <h4 className="font-semibold text-black dark:text-white mb-4">Authenticator App</h4>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                                    Use an authenticator app like Google Authenticator or Authy
                                </p>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    Configure
                                </button>
                            </div>

                            <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl">
                                <h4 className="font-semibold text-black dark:text-white mb-4">Backup Codes</h4>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                                    Download backup codes for emergency access
                                </p>
                                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                    <TbDownload className="inline mr-2" />
                                    Download
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {activeTab === 'sessions' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-8"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-black dark:text-white">
                            Active Sessions
                        </h3>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                            End All Other Sessions
                        </button>
                    </div>

                    <div className="space-y-4">
                        {activeSessions.map((session, index) => (
                            <div key={index} className="flex items-center justify-between p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                                        {session.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-black dark:text-white">
                                            {session.device}
                                        </h4>
                                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                            {session.browser} • {session.location}
                                        </p>
                                        <p className="text-neutral-500 dark:text-neutral-500 text-xs">
                                            IP: {session.ip} • Last active: {session.lastActive}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {session.isCurrent && (
                                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                                            Current Session
                                        </span>
                                    )}
                                    {!session.isCurrent && (
                                        <button className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors">
                                            End Session
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {activeTab === 'activity' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-8"
                >
                    <h3 className="text-2xl font-bold text-black dark:text-white mb-6">
                        Security Activity Log
                    </h3>
                    
                    <div className="space-y-4">
                        {securityEvents.map((event, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                                <div className={`p-2 rounded-lg ${getStatusColor(event.status)}`}>
                                    {getStatusIcon(event.status)}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-black dark:text-white">
                                        {event.description}
                                    </h4>
                                    <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                                        <span className="flex items-center gap-1">
                                            <TbMapPin className="text-xs" />
                                            {event.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <TbClock className="text-xs" />
                                            {event.time}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
