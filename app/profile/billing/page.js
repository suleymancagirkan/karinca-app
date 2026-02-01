'use client';

/**
 * @page BillingPage
 * @description A comprehensive billing and invoicing page aligned with the 'Unbounded' design system.
 * Features payment method management, subscription details, and a tabular invoice history.
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TbCreditCard,
    TbDownload,
    TbReceipt,
    TbHistory,
    TbBrandMastercard,
    TbBrandVisa,
    TbBox,
    TbShieldCheck,
    TbLock
} from 'react-icons/tb';

export default function BillingPage() {

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const cards = [
        { type: "visa", last4: "4242", expiry: "12/28", holder: "DEFAULT CARD", isDefault: true },
    ];

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('/api/v1/users/orders');
                if (res.ok) {
                    const data = await res.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error('Failed to load orders', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Helper to calculate total spent
    const totalSpent = orders.reduce((sum, order) => sum + (order.price || 0), 0);
    const lastOrder = orders.length > 0 ? orders[0] : null;

    return (
        <div className="w-full max-w-6xl mx-auto px-6 py-12">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <span className="font-unbounded font-bold text-xs uppercase tracking-widest text-neutral-500 mb-2 block">
                        Finance
                    </span>
                    <h1 className="font-unbounded font-black text-4xl md:text-5xl text-neutral-900 dark:text-white">
                        BILLING
                    </h1>
                </div>

                <div className="flex gap-3">
                    <button className="px-6 py-3 border border-neutral-200 dark:border-neutral-800 rounded-full font-unbounded font-bold text-xs hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors text-neutral-900 dark:text-white">
                        Billing Info
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">

                {/* Total Lifetime Spend Card */}
                <div className="lg:col-span-2 p-8 md:p-12 rounded-[2.5rem] bg-neutral-900 dark:bg-black text-white relative overflow-hidden flex flex-col justify-between min-h-[300px]">
                    {/* Background Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                    <div className="relative z-10">
                        <p className="font-unbounded text-xs font-bold opacity-60 uppercase tracking-widest mb-2">Total Lifetime Spend</p>
                        <h2 className="font-unbounded font-black text-5xl md:text-7xl tracking-tighter">
                            ₺{totalSpent.toFixed(2)}
                        </h2>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <span className="block text-[10px] text-neutral-400 uppercase font-bold tracking-wider mb-1">Last Payment</span>
                            <div className="font-unbounded font-bold text-xl">
                                {lastOrder ? `₺${lastOrder.price.toFixed(2)}` : '-'}
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <span className="block text-[10px] text-neutral-400 uppercase font-bold tracking-wider mb-1">Last Transaction Date</span>
                            <div className="font-unbounded font-bold text-xl">
                                {lastOrder ? new Date(lastOrder.createdAt).toLocaleDateString() : '-'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Secure Payment Info Card */}
                <div className="p-8 rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col shadow-xl shadow-neutral-100 dark:shadow-none relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <h2 className="font-unbounded font-bold text-xs uppercase tracking-widest text-neutral-500">Payment Security</h2>
                        <TbShieldCheck className="text-2xl text-green-500" />
                    </div>

                    <div className="flex-1 flex flex-col justify-center gap-6 relative z-10">
                        <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-black border border-neutral-100 dark:border-neutral-800 flex flex-col gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-900 flex items-center justify-center text-xl shadow-sm text-green-500">
                                <TbLock />
                            </div>
                            <p className="font-unbounded font-bold text-sm text-neutral-900 dark:text-white">
                                End-to-End Encryption
                            </p>
                            <p className="text-xs text-neutral-500 leading-relaxed">
                                Your payment details are processed securely. We do not store or save your credit card information on our servers.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            <TbBrandVisa className="text-3xl" />
                            <TbBrandMastercard className="text-3xl" />
                            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 ml-auto">Accepted</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order History Table */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-unbounded font-bold text-sm uppercase tracking-wider text-neutral-500">Transaction History</h2>
                    <button className="flex items-center gap-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white text-xs font-bold font-unbounded transition-colors">
                        <TbDownload /> Export All
                    </button>
                </div>

                {isLoading ? (
                    <div className="p-20 text-center text-neutral-400 font-unbounded text-sm bg-neutral-50 dark:bg-neutral-900 rounded-[2.5rem] animate-pulse">
                        Loading transaction history...
                    </div>
                ) : orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-20 border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] bg-neutral-50/50 dark:bg-neutral-900/20">
                        <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-3xl text-neutral-300 mb-4">
                            <TbReceipt />
                        </div>
                        <h3 className="font-unbounded font-bold text-neutral-900 dark:text-white mb-1">No Transactions Yet</h3>
                        <p className="text-neutral-500 font-medium text-sm">Your payment history will appear here once you make a purchase.</p>
                    </div>
                ) : (
                    <div className="rounded-[2.5rem] border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-black shadow-xl shadow-neutral-100 dark:shadow-none">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
                                    <tr>
                                        <th className="p-6 font-unbounded font-bold text-[10px] uppercase text-neutral-400 tracking-wider">Order ID</th>
                                        <th className="p-6 font-unbounded font-bold text-[10px] uppercase text-neutral-400 tracking-wider">Date</th>
                                        <th className="p-6 font-unbounded font-bold text-[10px] uppercase text-neutral-400 tracking-wider">Product / Service</th>
                                        <th className="p-6 font-unbounded font-bold text-[10px] uppercase text-neutral-400 tracking-wider">Amount</th>
                                        <th className="p-6 font-unbounded font-bold text-[10px] uppercase text-neutral-400 tracking-wider">Status</th>
                                        <th className="p-6 font-unbounded font-bold text-[10px] uppercase text-neutral-400 tracking-wider text-right">Invoice</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                    {orders.map((order, i) => (
                                        <motion.tr
                                            key={order.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-colors group"
                                        >
                                            <td className="p-6">
                                                <span className="font-mono text-xs font-medium text-neutral-500 bg-neutral-100 dark:bg-neutral-900 px-2 py-1 rounded-lg">
                                                    #{order.id.slice(-8).toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="p-6 text-xs text-neutral-600 dark:text-neutral-400 font-bold font-unbounded">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-6">
                                                <div className="flex flex-col">
                                                    <span className="font-unbounded font-bold text-sm text-neutral-900 dark:text-white">
                                                        {order.tierName}
                                                    </span>
                                                    {order.categoryName && (
                                                        <span className="text-[10px] text-neutral-500 font-medium mt-0.5">
                                                            {order.categoryName}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-6 font-unbounded font-black text-sm text-neutral-900 dark:text-white">
                                                ₺{order.price.toFixed(2)}
                                            </td>
                                            <td className="p-6">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 text-[10px] font-bold uppercase tracking-wide border border-green-200 dark:border-green-500/20">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> {order.status}
                                                </span>
                                            </td>
                                            <td className="p-6 text-right">
                                                <button className="p-2.5 rounded-xl text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
                                                    <TbDownload className="text-lg" />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};
