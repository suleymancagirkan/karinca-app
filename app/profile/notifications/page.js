'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    TbBell, 
    TbBellOff, 
    TbMail, 
    TbMessage, 
    TbPhone, 
    TbSettings, 
    TbCheck, 
    TbX, 
    TbTrash,
    TbEye,
    TbEyeOff,
    TbVolume,
    TbVolumeOff,
    TbCalendar,
    TbCreditCard,
    TbShield,
    TbStar,
    TbActivity,
    TbRefresh,
    TbDownload,
    TbEdit,
    TbSave
} from 'react-icons/tb';

export default function Notifications() {
    const [activeTab, setActiveTab] = useState('preferences');
    const [notifications, setNotifications] = useState({
        email: {
            accountUpdates: true,
            billingReminders: true,
            securityAlerts: true,
            marketingEmails: false,
            weeklyDigest: true,
            productUpdates: true
        },
        push: {
            newMessages: true,
            securityAlerts: true,
            systemMaintenance: false,
            featureAnnouncements: true
        },
        sms: {
            securityAlerts: true,
            billingAlerts: false,
            twoFactorCodes: true
        }
    });

    const notificationHistory = [
        {
            id: 1,
            type: 'security',
            title: 'New login detected',
            message: 'We detected a login from a new device in San Francisco, CA',
            time: '2 hours ago',
            read: false,
            icon: <TbShield className="text-xl" />,
            color: 'text-red-600',
            bgColor: 'bg-red-100 dark:bg-red-900/20'
        },
        {
            id: 2,
            type: 'billing',
            title: 'Payment successful',
            message: 'Your monthly subscription payment of $29.00 has been processed',
            time: '1 day ago',
            read: true,
            icon: <TbCreditCard className="text-xl" />,
            color: 'text-green-600',
            bgColor: 'bg-green-100 dark:bg-green-900/20'
        },
        {
            id: 3,
            type: 'system',
            title: 'System maintenance scheduled',
            message: 'Scheduled maintenance will occur on Sunday from 2-4 AM PST',
            time: '2 days ago',
            read: true,
            icon: <TbActivity className="text-xl" />,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100 dark:bg-blue-900/20'
        },
        {
            id: 4,
            type: 'feature',
            title: 'New feature available',
            message: 'Check out our new analytics dashboard with advanced insights',
            time: '1 week ago',
            read: true,
            icon: <TbStar className="text-xl" />,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100 dark:bg-purple-900/20'
        }
    ];

    const tabs = [
        { id: 'preferences', label: 'Preferences', icon: <TbSettings className="text-lg" /> },
        { id: 'history', label: 'Notification History', icon: <TbBell className="text-lg" /> },
        { id: 'channels', label: 'Delivery Channels', icon: <TbMail className="text-lg" /> }
    ];

    const handleNotificationChange = (category, key, value) => {
        setNotifications(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: value
            }
        }));
    };

    const markAsRead = (id) => {
        // Update notification as read
        console.log('Mark as read:', id);
    };

    const deleteNotification = (id) => {
        // Delete notification
        console.log('Delete notification:', id);
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
                    Notifications
                </h1>
                <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                    Manage your notification preferences and view your notification history.
                </p>
            </motion.div>

            {/* Notification Summary */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
            >
                <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                            <TbBell className="text-2xl text-blue-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-black dark:text-white">Total</h4>
                            <p className="text-2xl font-bold text-blue-600">{notificationHistory.length}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-xl">
                            <TbBell className="text-2xl text-red-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-black dark:text-white">Unread</h4>
                            <p className="text-2xl font-bold text-red-600">
                                {notificationHistory.filter(n => !n.read).length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
                            <TbMail className="text-2xl text-green-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-black dark:text-white">Email</h4>
                            <p className="text-2xl font-bold text-green-600">
                                {Object.values(notifications.email).filter(Boolean).length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
                            <TbMessage className="text-2xl text-purple-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-black dark:text-white">Push</h4>
                            <p className="text-2xl font-bold text-purple-600">
                                {Object.values(notifications.push).filter(Boolean).length}
                            </p>
                        </div>
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
            {activeTab === 'preferences' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="space-y-8"
                >
                    {/* Email Notifications */}
                    <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <TbMail className="text-2xl text-blue-600" />
                            <h3 className="text-2xl font-bold text-black dark:text-white">Email Notifications</h3>
                        </div>
                        
                        <div className="space-y-4">
                            {Object.entries(notifications.email).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                                    <div>
                                        <h4 className="font-semibold text-black dark:text-white capitalize">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </h4>
                                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                            {key === 'accountUpdates' && 'Get notified about account changes and updates'}
                                            {key === 'billingReminders' && 'Receive billing reminders and payment confirmations'}
                                            {key === 'securityAlerts' && 'Important security alerts and login notifications'}
                                            {key === 'marketingEmails' && 'Promotional content and product updates'}
                                            {key === 'weeklyDigest' && 'Weekly summary of your account activity'}
                                            {key === 'productUpdates' && 'New features and product announcements'}
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={value}
                                            onChange={(e) => handleNotificationChange('email', key, e.target.checked)}
                                            className="sr-only peer" 
                                        />
                                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Push Notifications */}
                    <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <TbMessage className="text-2xl text-purple-600" />
                            <h3 className="text-2xl font-bold text-black dark:text-white">Push Notifications</h3>
                        </div>
                        
                        <div className="space-y-4">
                            {Object.entries(notifications.push).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                                    <div>
                                        <h4 className="font-semibold text-black dark:text-white capitalize">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </h4>
                                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                            {key === 'newMessages' && 'Instant notifications for new messages'}
                                            {key === 'securityAlerts' && 'Critical security alerts and login attempts'}
                                            {key === 'systemMaintenance' && 'System maintenance and downtime notifications'}
                                            {key === 'featureAnnouncements' && 'New features and product updates'}
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={value}
                                            onChange={(e) => handleNotificationChange('push', key, e.target.checked)}
                                            className="sr-only peer" 
                                        />
                                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SMS Notifications */}
                    <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <TbPhone className="text-2xl text-green-600" />
                            <h3 className="text-2xl font-bold text-black dark:text-white">SMS Notifications</h3>
                        </div>
                        
                        <div className="space-y-4">
                            {Object.entries(notifications.sms).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
                                    <div>
                                        <h4 className="font-semibold text-black dark:text-white capitalize">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </h4>
                                        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                            {key === 'securityAlerts' && 'Critical security alerts via SMS'}
                                            {key === 'billingAlerts' && 'Billing and payment notifications'}
                                            {key === 'twoFactorCodes' && 'Two-factor authentication codes'}
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={value}
                                            onChange={(e) => handleNotificationChange('sms', key, e.target.checked)}
                                            className="sr-only peer" 
                                        />
                                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-neutral-600 peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}

            {activeTab === 'history' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-8"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-black dark:text-white">
                            Notification History
                        </h3>
                        <div className="flex items-center gap-3">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Mark All Read
                            </button>
                            <button className="px-4 py-2 bg-neutral-600 text-white rounded-lg hover:bg-neutral-700 transition-colors">
                                Clear All
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {notificationHistory.map((notification, index) => (
                            <motion.div
                                key={notification.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                                    notification.read 
                                        ? 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700' 
                                        : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                                }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-xl ${notification.bgColor} ${notification.color} flex-shrink-0`}>
                                        {notification.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h4 className="font-semibold text-black dark:text-white">
                                                {notification.title}
                                            </h4>
                                            {!notification.read && (
                                                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                            )}
                                        </div>
                                        <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                                            {notification.message}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-neutral-500 dark:text-neutral-500 text-sm">
                                                {notification.time}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                {!notification.read && (
                                                    <button 
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors text-sm"
                                                    >
                                                        Mark as Read
                                                    </button>
                                                )}
                                                <button 
                                                    onClick={() => deleteNotification(notification.id)}
                                                    className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
                                                >
                                                    <TbTrash className="text-lg" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {activeTab === 'channels' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-6"
                >
                    <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-8">
                        <h3 className="text-2xl font-bold text-black dark:text-white mb-6">
                            Delivery Channels
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <TbMail className="text-2xl text-blue-600" />
                                    <h4 className="font-semibold text-black dark:text-white">Email</h4>
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                                    Primary email: john.doe@email.com
                                </p>
                                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    Update Email
                                </button>
                            </div>

                            <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <TbPhone className="text-2xl text-green-600" />
                                    <h4 className="font-semibold text-black dark:text-white">SMS</h4>
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                                    Phone: +1 (555) 123-4567
                                </p>
                                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                    Update Phone
                                </button>
                            </div>

                            <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <TbMessage className="text-2xl text-purple-600" />
                                    <h4 className="font-semibold text-black dark:text-white">Push</h4>
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                                    Browser notifications enabled
                                </p>
                                <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                                    Manage Push
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
