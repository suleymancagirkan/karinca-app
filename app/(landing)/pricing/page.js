'use client';

/**
 * @page Pricing
 * @description A premium, architectural pricing page aligned with the Unbounded design system.
 * Features high-contrast cards, sector-based filtering, and a clean technical aesthetic.
 * Preserves all original functionality while upgrading the UI.
 */

import React, { useState } from 'react';
import { TbCheck, TbX, TbArrowUpRight, TbBuilding, TbShoppingCart, TbDeviceGamepad2, TbCloudComputing } from 'react-icons/tb';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import PurchaseModal from '@/components/Purchase/PurchaseModal';

export default function Pricing() {
    const router = useRouter();
    const [method, setMethod] = useState('Monthly');
    const [selectedSector, setSelectedSector] = useState('Corporate');
    const [selectedSubs, setSelectedSubs] = useState();
    const [billingAddress, setBillingAddress] = useState(null);

    const billingTabs = [
        { id: 'Monthly', label: 'Monthly' },
        { id: 'Yearly', label: 'Yearly' },
    ];

    const sectorTabs = [
        { id: 'Corporate', label: 'Corporate', icon: <TbBuilding /> },
        { id: 'Ecommerce', label: 'E-commerce', icon: <TbShoppingCart /> },
        { id: 'Gaming', label: 'Gaming', icon: <TbDeviceGamepad2 /> },
        { id: 'SaaS', label: 'SaaS', icon: <TbCloudComputing /> },
    ];

    const pricingData = {
        Corporate: [
            {
                title: 'Starter',
                description: 'Perfect for small businesses and startups looking to establish their online presence.',
                prices: [
                    { id: 'Monthly', amount: 99 },
                    { id: 'Yearly', amount: 899 },
                ],
                features: [
                    { text: 'Up to 5 pages', isGood: true },
                    { text: 'Responsive design', isGood: true },
                    { text: 'Basic SEO optimization', isGood: true },
                    { text: 'Contact form', isGood: true },
                    { text: 'Email support', isGood: true },
                    { text: 'Custom domain', isGood: false },
                ],
            },
            {
                title: 'Professional',
                description: 'Ideal for growing companies that need advanced features and better performance.',
                prices: [
                    { id: 'Monthly', amount: 199 },
                    { id: 'Yearly', amount: 1799 },
                ],
                features: [
                    { text: 'Up to 20 pages', isGood: true },
                    { text: 'Advanced SEO tools', isGood: true },
                    { text: 'Analytics dashboard', isGood: true },
                    { text: 'Custom branding', isGood: true },
                    { text: 'Priority support', isGood: true },
                    { text: 'SSL certificate', isGood: true },
                ],
            },
            {
                title: 'Enterprise',
                description: 'Complete solution for large organizations with complex requirements.',
                prices: [
                    { id: 'Monthly', amount: 399 },
                    { id: 'Yearly', amount: 3599 },
                ],
                features: [
                    { text: 'Unlimited pages', isGood: true },
                    { text: 'Custom integrations', isGood: true },
                    { text: 'Advanced security', isGood: true },
                    { text: 'Dedicated account manager', isGood: true },
                    { text: '24/7 phone support', isGood: true },
                    { text: 'White-label solution', isGood: true },
                ],
            },
        ],
        Ecommerce: [
            {
                title: 'Basic Store',
                description: 'Start selling online with essential e-commerce features.',
                prices: [
                    { id: 'Monthly', amount: 149 },
                    { id: 'Yearly', amount: 1349 },
                ],
                features: [
                    { text: 'Up to 100 products', isGood: true },
                    { text: 'Payment gateway integration', isGood: true },
                    { text: 'Inventory management', isGood: true },
                    { text: 'Order tracking', isGood: true },
                    { text: 'Basic analytics', isGood: true },
                    { text: 'Mobile responsive', isGood: true },
                ],
            },
            {
                title: 'Growth Store',
                description: 'Scale your business with advanced e-commerce tools and features.',
                prices: [
                    { id: 'Monthly', amount: 299 },
                    { id: 'Yearly', amount: 2699 },
                ],
                features: [
                    { text: 'Up to 1000 products', isGood: true },
                    { text: 'Advanced inventory management', isGood: true },
                    { text: 'Multi-channel selling', isGood: true },
                    { text: 'Customer reviews system', isGood: true },
                    { text: 'Email marketing tools', isGood: true },
                    { text: 'Advanced analytics', isGood: true },
                ],
            },
            {
                title: 'Enterprise Store',
                description: 'Complete e-commerce solution for large-scale businesses.',
                prices: [
                    { id: 'Monthly', amount: 599 },
                    { id: 'Yearly', amount: 5399 },
                ],
                features: [
                    { text: 'Unlimited products', isGood: true },
                    { text: 'Custom payment solutions', isGood: true },
                    { text: 'Advanced reporting', isGood: true },
                    { text: 'API access', isGood: true },
                    { text: 'Dedicated support', isGood: true },
                    { text: 'Custom integrations', isGood: true },
                ],
            },
        ],
        Gaming: [
            {
                title: 'Indie Developer',
                description: 'Perfect for indie game developers and small gaming projects.',
                prices: [
                    { id: 'Monthly', amount: 79 },
                    { id: 'Yearly', amount: 719 },
                ],
                features: [
                    { text: 'Basic game hosting', isGood: true },
                    { text: 'Player management system', isGood: true },
                    { text: 'Basic analytics', isGood: true },
                    { text: 'Community features', isGood: true },
                    { text: 'Email support', isGood: true },
                    { text: 'Up to 100 concurrent players', isGood: true },
                ],
            },
            {
                title: 'Studio Package',
                description: 'Advanced features for game studios and medium-scale projects.',
                prices: [
                    { id: 'Monthly', amount: 199 },
                    { id: 'Yearly', amount: 1799 },
                ],
                features: [
                    { text: 'Advanced game hosting', isGood: true },
                    { text: 'Player progression system', isGood: true },
                    { text: 'In-game purchases', isGood: true },
                    { text: 'Multiplayer support', isGood: true },
                    { text: 'Priority support', isGood: true },
                    { text: 'Up to 1000 concurrent players', isGood: true },
                ],
            },
            {
                title: 'Enterprise Gaming',
                description: 'Complete gaming infrastructure for large-scale games and studios.',
                prices: [
                    { id: 'Monthly', amount: 499 },
                    { id: 'Yearly', amount: 4499 },
                ],
                features: [
                    { text: 'Dedicated game servers', isGood: true },
                    { text: 'Advanced matchmaking', isGood: true },
                    { text: 'Real-time analytics', isGood: true },
                    { text: 'Custom game APIs', isGood: true },
                    { text: '24/7 dedicated support', isGood: true },
                    { text: 'Unlimited concurrent players', isGood: true },
                ],
            },
        ],
        SaaS: [
            {
                title: 'Startup',
                description: 'Essential tools for SaaS startups to get their product to market quickly.',
                prices: [
                    { id: 'Monthly', amount: 199 },
                    { id: 'Yearly', amount: 1799 },
                ],
                features: [
                    { text: 'User authentication', isGood: true },
                    { text: 'Basic dashboard', isGood: true },
                    { text: 'API endpoints', isGood: true },
                    { text: 'Email notifications', isGood: true },
                    { text: 'Basic analytics', isGood: true },
                    { text: 'Up to 1000 users', isGood: true },
                ],
            },
            {
                title: 'Scale',
                description: 'Advanced features for growing SaaS companies with expanding user bases.',
                prices: [
                    { id: 'Monthly', amount: 399 },
                    { id: 'Yearly', amount: 3599 },
                ],
                features: [
                    { text: 'Advanced user management', isGood: true },
                    { text: 'Custom dashboards', isGood: true },
                    { text: 'Webhook integrations', isGood: true },
                    { text: 'Advanced analytics', isGood: true },
                    { text: 'Priority support', isGood: true },
                    { text: 'Up to 10000 users', isGood: true },
                ],
            },
            {
                title: 'Enterprise',
                description: 'Complete SaaS infrastructure for large-scale applications.',
                prices: [
                    { id: 'Monthly', amount: 799 },
                    { id: 'Yearly', amount: 7199 },
                ],
                features: [
                    { text: 'Custom authentication', isGood: true },
                    { text: 'White-label solution', isGood: true },
                    { text: 'Advanced integrations', isGood: true },
                    { text: 'Real-time monitoring', isGood: true },
                    { text: 'Dedicated account manager', isGood: true },
                    { text: 'Unlimited users', isGood: true },
                ],
            },
        ],
    };

    return (
        <main className="min-h-screen bg-white dark:bg-[#050505] text-neutral-900 dark:text-white pt-24 pb-20 relative overflow-hidden">

            {/* Architectural Background */}
            <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <span className="font-unbounded font-bold text-blue-600 tracking-widest uppercase text-sm mb-4 block">
                            Invest in Growth
                        </span>
                        <h1 className="font-unbounded font-black text-6xl md:text-8xl tracking-tighter leading-none mb-6">
                            PRICING
                        </h1>
                        <p className="font-unbounded text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                            Transparent solutions tailored for every stage of your journey.
                            No hidden fees, just pure value.
                        </p>
                    </motion.div>

                    {/* Controls */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col md:flex-row items-center gap-6"
                    >
                        {/* Sector Selector */}
                        <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full">
                            {sectorTabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setSelectedSector(tab.id)}
                                    className={`relative px-4 py-2 rounded-full font-unbounded text-xs font-bold transition-all flex items-center gap-2 ${selectedSector === tab.id
                                            ? 'text-white'
                                            : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                                        }`}
                                >
                                    {selectedSector === tab.id && (
                                        <motion.div
                                            layoutId="activeSector"
                                            className="absolute inset-0 bg-neutral-900 dark:bg-white rounded-full"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className={`relative z-10 flex items-center gap-2 ${selectedSector === tab.id ? 'dark:text-black' : ''}`}>
                                        <span className="text-lg">{tab.icon}</span>
                                        {tab.label}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Billing Period */}
                        <div className="flex gap-2 p-1.5 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full">
                            {billingTabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setMethod(tab.id)}
                                    className={`relative px-6 py-2 rounded-full font-unbounded text-xs font-bold transition-all ${method === tab.id
                                            ? 'text-white'
                                            : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                                        }`}
                                >
                                    {method === tab.id && (
                                        <motion.div
                                            layoutId="activeMethod"
                                            className="absolute inset-0 bg-blue-600 rounded-full"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>


                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    <AnimatePresence mode='wait'>
                        {pricingData[selectedSector].map((item, index) => (
                            <motion.div
                                key={item.title + selectedSector}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                className="group relative p-8 rounded-[2rem] bg-white dark:bg-[#0A0A0A] border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors duration-300 flex flex-col"
                            >
                                <div className="mb-8">
                                    <h3 className="font-unbounded font-bold text-2xl mb-2">{item.title}</h3>
                                    <p className="font-unbounded text-xs text-neutral-500 dark:text-neutral-400 min-h-[3rem]">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-end gap-1 mb-1">
                                        <span className="font-unbounded font-black text-5xl tracking-tighter">
                                            ₺{item.prices.find((i) => i.id == method)?.amount}
                                        </span>
                                        <span className="font-unbounded text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                                            /{method === 'Monthly' ? 'mo' : 'yr'}
                                        </span>
                                    </div>
                                    {method === 'Yearly' && (
                                        <span className="inline-block px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] font-unbounded font-bold uppercase">
                                            Save 20%
                                        </span>
                                    )}
                                </div>

                                <div className="flex-1 space-y-4 mb-8">
                                    {item.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className={`mt-0.5 p-0.5 rounded-full ${feature.isGood ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-neutral-100 text-neutral-400 dark:bg-neutral-800'}`}>
                                                {feature.isGood ? <TbCheck className="text-xs" /> : <TbX className="text-xs" />}
                                            </div>
                                            <span className={`font-unbounded text-xs ${feature.isGood ? 'text-neutral-700 dark:text-neutral-300' : 'text-neutral-400 line-through'}`}>
                                                {feature.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setSelectedSubs(item)}
                                    className="w-full py-4 rounded-xl font-unbounded font-bold text-sm bg-neutral-900 dark:bg-white text-white dark:text-black hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:text-white dark:group-hover:text-white"
                                >
                                    Choose Plan <TbArrowUpRight className="text-lg" />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <PurchaseModal
                selectedSubs={selectedSubs}
                setSelectedSubs={setSelectedSubs}
                billingAddress={billingAddress}
                setBillingAddress={setBillingAddress}
                method={method}
            />
        </main>
    );
};
