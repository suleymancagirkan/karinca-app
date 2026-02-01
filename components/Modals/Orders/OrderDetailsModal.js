
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbX, TbReceipt, TbCreditCard, TbUser, TbCalendar, TbCopy, TbCheck, TbInfoCircle } from 'react-icons/tb';

export default function OrderDetailsModal({ isOpen, onClose, order }) {
    const [copiedStates, setCopiedStates] = useState({});

    if (!order) return null;

    const handleCopy = (key, text) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopiedStates(prev => ({ ...prev, [key]: true }));
        setTimeout(() => setCopiedStates(prev => ({ ...prev, [key]: false })), 2000);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'PAID': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 border border-green-200 dark:border-green-900';
            case 'PENDING': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900';
            case 'FAILED': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 border border-red-200 dark:border-red-900';
            default: return 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700';
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-white dark:bg-black rounded-[2rem] border border-neutral-100 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-neutral-100 dark:border-neutral-800 shrink-0">
                            <div>
                                <h2 className="font-unbounded font-bold text-xl text-neutral-900 dark:text-white">Order Details</h2>
                                <p className="text-xs text-neutral-500 mt-1 font-medium flex items-center gap-2">
                                    <span>#{order.id}</span>
                                    <button
                                        onClick={() => handleCopy('orderId', order.id)}
                                        className="text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                                        title="Copy Order ID"
                                    >
                                        {copiedStates['orderId'] ? <TbCheck className="text-green-500" /> : <TbCopy />}
                                    </button>
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
                            >
                                <TbX className="text-xl" />
                            </button>
                        </div>

                        {/* Body - Scrollable */}
                        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">

                            {/* Status Banner */}
                            <div className={`p-4 rounded-2xl flex items-center justify-between ${getStatusColor(order.status)}`}>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                        <TbInfoCircle className="text-lg" />
                                    </div>
                                    <span className="font-unbounded font-bold text-sm tracking-wide">
                                        PAYMENT {order.status}
                                    </span>
                                </div>
                                <span className="font-mono text-xs font-semibold opacity-80 bg-white/20 px-2 py-1 rounded-md">
                                    {new Date(order.createdAt).toLocaleString()}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Customer Info */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1 flex items-center gap-2">
                                        <TbUser className="text-sm" /> Customer
                                    </label>
                                    <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-100 dark:border-neutral-800 h-full">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-12 rounded-2xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 flex items-center justify-center font-bold text-lg text-neutral-700 dark:text-neutral-300">
                                                {order.user?.fullname?.[0] || 'G'}
                                            </div>
                                            <div>
                                                <p className="font-unbounded font-bold text-sm text-neutral-900 dark:text-white mb-0.5">
                                                    {order.user?.fullname || 'Guest User'}
                                                </p>
                                                <p className="text-xs text-neutral-500 font-medium">
                                                    {order.user?.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Summary */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1 flex items-center gap-2">
                                        <TbReceipt className="text-sm" /> Summary
                                    </label>
                                    <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-100 dark:border-neutral-800 h-full">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs font-medium text-neutral-500">Plan</span>
                                            <span className="font-unbounded text-xs font-bold text-neutral-900 dark:text-white text-right">{order.tierName}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2 mt-auto border-t border-neutral-200 dark:border-neutral-800">
                                            <span className="text-xs font-bold text-neutral-900 dark:text-white">Total Paid</span>
                                            <span className="font-unbounded font-black text-lg text-neutral-900 dark:text-white">₺{order.price?.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Technical / Payment Details */}
                            <div className="space-y-3 pt-5">
                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1 flex items-center gap-2">
                                    <TbCreditCard className="text-sm" /> Payment Metadata
                                </label>
                                <div className="bg-neutral-50 dark:bg-neutral-900 p-1 rounded-2xl border border-neutral-100 dark:border-neutral-800">
                                    <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                                        {[
                                            { label: 'Payment ID', value: order.paymentId },
                                            { label: 'Conversation ID', value: order.conversationId },
                                            { label: 'Token', value: order.token, truncate: true }
                                        ].map((item, i) => (
                                            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-3 gap-2 hover:bg-white dark:hover:bg-neutral-800/50 rounded-xl transition-colors group">
                                                <span className="text-xs font-medium text-neutral-500">{item.label}</span>
                                                <div className="flex items-center gap-2 max-w-full md:max-w-[70%]">
                                                    <code className={`text-[10px] font-mono bg-white dark:bg-black px-2 py-1 rounded border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 w-full ${item.truncate ? 'truncate' : ''}`}>
                                                        {item.value || 'N/A'}
                                                    </code>
                                                    {item.value && (
                                                        <button
                                                            onClick={() => handleCopy(item.label, item.value)}
                                                            className="text-neutral-400 hover:text-black dark:hover:text-white opacity-0 group-hover:opacity-100 transition-all shrink-0"
                                                        >
                                                            {copiedStates[item.label] ? <TbCheck className="text-green-500" /> : <TbCopy />}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-neutral-100 dark:border-neutral-800 flex justify-end gap-3 bg-neutral-50/50 dark:bg-neutral-900/50 shrink-0">
                            <button
                                onClick={onClose}
                                className="px-6 py-3 rounded-xl text-xs font-bold font-unbounded text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
