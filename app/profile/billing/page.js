'use client';

/**
 * @page BillingPage
 * @description A comprehensive billing and invoicing page aligned with the 'Unbounded' design system.
 * Features payment method management, subscription details, and a tabular invoice history.
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
    TbCreditCard,
    TbDownload,
    TbPlus,
    TbReceipt,
    TbHistory,
    TbDots,
    TbBrandMastercard,
    TbBrandVisa
} from 'react-icons/tb';

export default function BillingPage() {

    const invoices = [
        { id: "INV-2024-001", date: "Oct 24, 2025", amount: "$199.00", status: "Paid", items: "Enterprise Hosting (Monthly)" },
        { id: "INV-2024-002", date: "Sep 24, 2025", amount: "$199.00", status: "Paid", items: "Enterprise Hosting (Monthly)" },
        { id: "INV-2024-003", date: "Aug 24, 2025", amount: "$199.00", status: "Paid", items: "Enterprise Hosting (Monthly)" },
    ];

    const cards = [
        { type: "visa", last4: "4242", expiry: "12/28", holder: "JOHN DOE", isDefault: true },
        { type: "mastercard", last4: "8899", expiry: "09/26", holder: "JOHN DOE", isDefault: false },
    ];

    return (
        <div className="w-full max-w-5xl mx-auto">

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
                    <button className="px-6 py-3 border border-neutral-200 dark:border-neutral-800 rounded-full font-unbounded font-bold text-xs hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors">
                        Billing Info
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">

                {/* Current Plan Card */}
                <div className="lg:col-span-2 p-8 rounded-[2rem] bg-gradient-to-br from-neutral-900 to-black text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-unbounded text-xs opacity-60 uppercase tracking-widest mb-1">Current Plan</p>
                                <h2 className="font-unbounded font-black text-3xl">ENTERPRISE</h2>
                            </div>
                            <span className="px-3 py-1 bg-green-500 text-black font-unbounded font-bold text-[10px] rounded-full uppercase">
                                Active
                            </span>
                        </div>

                        <div className="mt-8">
                            <div className="flex justify-between items-end mb-2">
                                <span className="font-unbounded font-bold text-4xl">$199<span className="text-sm opacity-60">/mo</span></span>
                                <span className="font-unbounded text-xs opacity-60">Renews on Nov 24, 2025</span>
                            </div>
                            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                                <div className="w-2/3 h-full bg-blue-500 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Balance / Next Invoice */}
                <div className="p-8 rounded-[2rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-center">
                    <p className="font-unbounded text-xs text-neutral-500 uppercase tracking-widest mb-1">Unpaid Balance</p>
                    <h2 className="font-unbounded font-black text-4xl text-neutral-900 dark:text-white mb-6">$0.00</h2>
                    <button className="w-full py-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-xl font-unbounded font-bold text-xs hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                        Payment History
                    </button>
                </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-16">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-unbounded font-bold text-sm uppercase tracking-wider text-neutral-500">Payment Methods</h2>
                    <button className="flex items-center gap-2 text-blue-600 font-unbounded font-bold text-xs hover:underline">
                        <TbPlus /> Add New
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cards.map((card, i) => (
                        <div key={i} className="p-6 rounded-[1.5rem] bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between group cursor-pointer hover:border-black dark:hover:border-white transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-8 rounded bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-2xl">
                                    {card.type === 'visa' ? <TbBrandVisa className="text-blue-600" /> : <TbBrandMastercard className="text-red-500" />}
                                </div>
                                <div>
                                    <p className="font-unbounded font-bold text-sm">•••• •••• •••• {card.last4}</p>
                                    <p className="text-xs text-neutral-500">Expires {card.expiry}</p>
                                </div>
                            </div>
                            {card.isDefault && (
                                <span className="text-[10px] bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded font-bold uppercase tracking-wider">Default</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Invoices */}
            <div>
                <h2 className="font-unbounded font-bold text-sm uppercase tracking-wider text-neutral-500 mb-6">Invoice History</h2>

                <div className="rounded-[1.5rem] border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
                            <tr>
                                <th className="p-6 font-unbounded font-bold text-xs uppercase text-neutral-500">Invoice ID</th>
                                <th className="p-6 font-unbounded font-bold text-xs uppercase text-neutral-500">Date</th>
                                <th className="p-6 font-unbounded font-bold text-xs uppercase text-neutral-500">Amount</th>
                                <th className="p-6 font-unbounded font-bold text-xs uppercase text-neutral-500">Status</th>
                                <th className="p-6 font-unbounded font-bold text-xs uppercase text-neutral-500 text-right">Download</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-black">
                            {invoices.map((inv) => (
                                <tr key={inv.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                                    <td className="p-6 font-mono text-sm">{inv.id}</td>
                                    <td className="p-6 text-sm text-neutral-600 dark:text-neutral-400">{inv.date}</td>
                                    <td className="p-6 font-unbounded font-bold text-sm">{inv.amount}</td>
                                    <td className="p-6">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-wide">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> {inv.status}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <button className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                                            <TbDownload className="text-neutral-500" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};
