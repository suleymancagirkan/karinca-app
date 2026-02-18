
'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TbSearch,
    TbRepeat,
    TbEdit,
    TbTrash
} from 'react-icons/tb';
import toast from 'react-hot-toast';
import SubscriptionDetailsModal from '@/components/Modals/Subscriptions/SubscriptionDetailsModal';
import EditSubscriptionModal from '@/components/Modals/Subscriptions/EditSubscriptionModal';
import DeleteSubscriptionModal from '@/components/Modals/Subscriptions/DeleteSubscriptionModal';

export default function SubscriptionsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [subscriptions, setSubscriptions] = useState([]);
    const [selectedSubscription, setSelectedSubscription] = useState(null);
    const [selectedAction, setSelectedAction] = useState(null); // 'view', 'edit', 'delete'
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const fetchSubscriptions = async () => {
        try {
            const response = await fetch('/api/admin/subscriptions');
            if (response.ok) {
                const data = await response.json();
                setSubscriptions(data);
            }
        } catch (error) {
            toast.error('Failed to load subscriptions');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateSubscription = async (updatedSub) => {
        try {
            const response = await fetch('/api/admin/subscriptions', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedSub)
            });

            if (response.ok) {
                const data = await response.json();
                setSubscriptions(prev => prev.map(s => s.id === data.id ? data : s));
                setSelectedAction(null);
                setSelectedSubscription(null);
                toast.success('Subscription updated');
            } else {
                toast.error('Failed to update subscription');
            }
        } catch (error) {
            toast.error('Error updating subscription');
        }
    };

    const handleDeleteSubscription = async (sub) => {
        try {
            const response = await fetch(`/api/admin/subscriptions?id=${sub.id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setSubscriptions(prev => prev.filter(s => s.id !== sub.id));
                setSelectedAction(null);
                setSelectedSubscription(null);
                toast.success('Subscription deleted');
            } else {
                toast.error('Failed to delete subscription');
            }
        } catch (error) {
            toast.error('Error deleting subscription');
        }
    };

    const filteredSubscriptions = subscriptions.filter(sub => {
        const matchesSearch =
            sub.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sub.user?.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sub.user?.email?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'ALL' || sub.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'ACTIVE': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'EXPIRED': return 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400';
            case 'CANCELLED': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400';
        }
    };

    if (isLoading) {
        return <div className="p-8 text-center text-neutral-500">Loading subscriptions...</div>;
    }

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <span className="font-unbounded font-bold text-xs uppercase tracking-widest text-neutral-400 mb-2 block">
                        Store
                    </span>
                    <h1 className="font-unbounded font-black text-3xl md:text-4xl text-neutral-900 dark:text-neutral-100 leading-tight">
                        Subscriptions
                    </h1>
                </div>
            </div>

            {/* Toolbar section */}
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-white dark:bg-black rounded-[2rem] border border-neutral-100 dark:border-neutral-800">
                <div className="relative flex-1">
                    <TbSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-lg" />
                    <input
                        type="text"
                        placeholder="Search subscriptions, customers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none transition-colors"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
                    {['ALL', 'ACTIVE', 'EXPIRED', 'CANCELLED'].map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-5 py-3 rounded-xl font-unbounded text-xs font-bold whitespace-nowrap transition-colors ${statusFilter === status
                                ? 'bg-neutral-900 text-white dark:bg-white dark:text-black'
                                : 'bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Subscription Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {filteredSubscriptions.length === 0 ? (
                        <div className="col-span-full p-12 text-center text-neutral-500 font-unbounded text-sm">
                            No subscriptions found matching your criteria.
                        </div>
                    ) : (
                        filteredSubscriptions.map((sub, index) => (
                            <motion.div
                                key={sub.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.05 }}
                                className="group p-6 rounded-[2rem] bg-white dark:bg-black border border-neutral-100 dark:border-neutral-800 hover:border-violet-500 dark:hover:border-violet-500 transition-all flex flex-col"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center text-neutral-500 dark:text-neutral-400 group-hover:bg-violet-50 dark:group-hover:bg-violet-900/20 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                                        <TbRepeat className="text-2xl" />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setSelectedSubscription(sub); setSelectedAction('edit'); }}
                                            className="p-2 rounded-xl text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                        >
                                            <TbEdit className="text-lg" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setSelectedSubscription(sub); setSelectedAction('delete'); }}
                                            className="p-2 rounded-xl text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                        >
                                            <TbTrash className="text-lg" />
                                        </button>
                                    </div>
                                </div>

                                <div
                                    className="mb-4 cursor-pointer"
                                    onClick={() => { setSelectedSubscription(sub); setSelectedAction('view'); }}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-unbounded font-bold text-lg text-neutral-900 dark:text-white truncate max-w-[70%]">
                                            {sub.tier?.name || 'Unknown Tier'}
                                        </h3>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-unbounded tracking-wide ${getStatusColor(sub.status)}`}>
                                            {sub.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                                        <div className="w-5 h-5 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-bold">
                                            {sub.user?.fullname?.[0] || '?'}
                                        </div>
                                        <span className="truncate">{sub.user?.fullname || 'Guest'}</span>
                                    </div>
                                </div>

                                <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between">
                                    <span className="text-xs font-medium text-neutral-400 flex items-center gap-1">
                                        Ends: {new Date(sub.endDate).toLocaleDateString()}
                                    </span>
                                    <span className="font-unbounded font-bold text-sm text-neutral-900 dark:text-white">
                                        {sub.period}
                                    </span>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {/* Modals */}
            {selectedAction === 'view' && (
                <SubscriptionDetailsModal
                    isOpen={selectedAction === 'view'}
                    onClose={() => { setSelectedAction(null); setSelectedSubscription(null); }}
                    subscription={selectedSubscription}
                />
            )}

            {selectedAction === 'edit' && (
                <EditSubscriptionModal
                    isOpen={selectedAction === 'edit'}
                    onClose={() => { setSelectedAction(null); setSelectedSubscription(null); }}
                    subscription={selectedSubscription}
                    onSave={handleUpdateSubscription}
                />
            )}

            {selectedAction === 'delete' && (
                <DeleteSubscriptionModal
                    isOpen={selectedAction === 'delete'}
                    onClose={() => { setSelectedAction(null); setSelectedSubscription(null); }}
                    subscription={selectedSubscription}
                    onConfirm={handleDeleteSubscription}
                />
            )}
        </div>
    );
}
