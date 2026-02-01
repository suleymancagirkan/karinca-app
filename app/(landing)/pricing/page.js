'use client';

/**
 * @page Pricing
 * @description A premium, architectural pricing page aligned with the Unbounded design system.
 * Features high-contrast cards, sector-based filtering, and a clean technical aesthetic.
 * Preserves all original functionality while upgrading the UI.
 */

import React, { useState, useEffect, Suspense } from 'react';
import { TbCheck, TbX, TbArrowUpRight, TbBuilding, TbShoppingCart, TbDeviceGamepad2, TbCloudComputing } from 'react-icons/tb';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import PurchaseModal from '@/components/Purchase/PurchaseModal';
import ThemeSelectionModal from '@/components/Purchase/ThemeSelectionModal';

function PricingContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [method, setMethod] = useState('Monthly');
    const [selectedSector, setSelectedSector] = useState(null);
    const [selectedSubs, setSelectedSubs] = useState();
    const [billingAddress, setBillingAddress] = useState(null);
    const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
    const [pendingSubs, setPendingSubs] = useState(null);

    const [paymentStatus, setPaymentStatus] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');

    const [categories, setCategories] = useState([]);
    const [tiers, setTiers] = useState([]);
    const [userSubscriptions, setUserSubscriptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const billingTabs = [
        { id: 'Monthly', label: 'Monthly' },
        { id: 'Yearly', label: 'Yearly' },
    ];

    useEffect(() => {
        if (searchParams) {
            const status = searchParams.get('payment_status');
            const reason = searchParams.get('reason');
            if (status) {
                setPaymentStatus(status);
                setStatusMessage(reason ? decodeURIComponent(reason) : (status === 'success' ? 'Your payment was completed successfully.' : 'There was an issue with your payment.'));
                const newUrl = window.location.pathname;
                window.history.replaceState({}, '', newUrl);
            }
        }
    }, [searchParams]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catsRes, tiersRes, subsRes] = await Promise.all([
                    fetch('/api/admin/categories'),
                    fetch('/api/admin/tiers'),
                    fetch('/api/user/subscriptions').catch(err => ({ ok: false })) // Fail gracefully if not logged in
                ]);

                if (catsRes.ok && tiersRes.ok) {
                    const catsData = await catsRes.json();
                    const tiersData = await tiersRes.json();

                    if (subsRes.ok) {
                        const subsData = await subsRes.json();
                        setUserSubscriptions(subsData);
                    }

                    setCategories(catsData);


                    // Map DB tiers to UI structure
                    const mappedTiers = tiersData.map(tier => ({
                        id: tier.id,
                        title: tier.name,
                        description: tier.description || 'No description available',
                        prices: [
                            { id: 'Monthly', amount: tier.priceMonthly },
                            { id: 'Yearly', amount: tier.priceYearly },
                        ],
                        features: (tier.features || []).map(f => ({ text: f, isGood: true })),
                        categoryId: tier.categoryId,
                        categoryName: tier.category?.name
                    }));

                    setTiers(mappedTiers);

                    if (catsData.length > 0) {
                        setSelectedSector(catsData[0].id);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch pricing data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const getCategoryIcon = (name) => {
        const lowerName = (name || '').toLowerCase();
        if (lowerName.includes('ecommerce') || lowerName.includes('shop')) return <TbShoppingCart />;
        if (lowerName.includes('game') || lowerName.includes('gaming')) return <TbDeviceGamepad2 />;
        if (lowerName.includes('saas') || lowerName.includes('cloud')) return <TbCloudComputing />;
        return <TbBuilding />;
    };

    const filteredTiers = selectedSector
        ? tiers.filter(t => t.categoryId === selectedSector)
        : [];

    return (
        <main className="min-h-screen bg-white dark:bg-[#050505] text-neutral-900 dark:text-white pt-24 pb-20 relative overflow-hidden">
            {/* Status Modal */}
            <AnimatePresence>
                {paymentStatus && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
                            onClick={() => setPaymentStatus(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            className="bg-white dark:bg-neutral-900 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-neutral-100 dark:border-neutral-800 relative z-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-6 ${paymentStatus === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
                                {paymentStatus === 'success' ? <TbCheck /> : <TbX />}
                            </div>
                            <h3 className="font-unbounded font-bold text-2xl mb-3 text-neutral-900 dark:text-white">
                                {paymentStatus === 'success' ? 'Payment Successful!' : 'Payment Failed'}
                            </h3>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8 font-medium leading-relaxed">
                                {statusMessage}
                            </p>
                            <button
                                onClick={() => setPaymentStatus(null)}
                                className="w-full py-4 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black font-bold font-unbounded text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-neutral-900/20"
                            >
                                Continue
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

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
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedSector(cat.id)}
                                    className={`relative px-4 py-2 rounded-full font-unbounded text-xs font-bold transition-all flex items-center gap-2 ${selectedSector === cat.id
                                        ? 'text-white'
                                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                                        }`}
                                >
                                    {selectedSector === cat.id && (
                                        <motion.div
                                            layoutId="activeSector"
                                            className="absolute inset-0 bg-neutral-900 dark:bg-white rounded-full"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className={`relative z-10 flex items-center gap-2 ${selectedSector === cat.id ? 'dark:text-black' : ''}`}>
                                        {cat.name}
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
                    {isLoading ? (
                        <div className="col-span-full text-center py-20 text-neutral-500">Loading pricing plans...</div>
                    ) : (
                        <AnimatePresence mode='wait'>
                            {filteredTiers.reverse().map((item, index) => {
                                // Find if user has subscription in this category
                                const activeSub = userSubscriptions.find(sub => sub.tier.categoryId === item.categoryId);
                                const isCurrentPlan = activeSub?.tier?.id === item.id;

                                // Determine pricing logic
                                const currentPrice = item.prices.find((i) => i.id == method)?.amount || 0;
                                const activePrice = activeSub ? (method === 'Monthly' ? activeSub.tier.priceMonthly : activeSub.tier.priceYearly) : 0;
                                const isUpgrade = activeSub && currentPrice > activePrice;
                                const isDowngrade = activeSub && currentPrice < activePrice;

                                return (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: index * 0.1, duration: 0.4 }}
                                        className={`group relative p-8 rounded-[2rem] border transition-all duration-300 flex flex-col ${isCurrentPlan
                                            ? 'bg-neutral-50 dark:bg-neutral-900/50 border-blue-500 dark:border-blue-500'
                                            : 'bg-white dark:bg-[#0A0A0A] border-neutral-200 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500'
                                            }`}
                                    >
                                        {isCurrentPlan && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-[10px] font-bold font-unbounded rounded-full uppercase tracking-wider">
                                                Current Plan
                                            </div>
                                        )}

                                        <div className="mb-8">
                                            <h3 className="font-unbounded font-bold text-2xl mb-2">{item.title}</h3>
                                            <p className="font-unbounded text-xs text-neutral-500 dark:text-neutral-400 min-h-[3rem]">
                                                {item.description}
                                            </p>
                                        </div>

                                        <div className="mb-8">
                                            <div className="flex items-end gap-1 mb-1">
                                                <span className="font-unbounded font-black text-5xl tracking-tighter">
                                                    ₺{currentPrice}
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
                                            onClick={() => {
                                                if (isCurrentPlan || isDowngrade) return;

                                                const currentCat = categories.find(c => c.id === selectedSector);
                                                if (currentCat && currentCat.name === 'Corporate') {
                                                    setPendingSubs(item);
                                                    setIsThemeModalOpen(true);
                                                } else {
                                                    setSelectedSubs(item);
                                                }
                                            }}
                                            disabled={isCurrentPlan || isDowngrade}
                                            className={`w-full py-4 rounded-xl font-unbounded font-bold text-sm flex items-center justify-center gap-2 transition-transform ${isCurrentPlan
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 cursor-default'
                                                : isDowngrade
                                                    ? 'bg-neutral-100 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500 cursor-not-allowed'
                                                    : 'bg-neutral-900 dark:bg-white text-white dark:text-black hover:scale-[1.02] active:scale-[0.98] group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:text-white dark:group-hover:text-white'
                                                }`}
                                        >
                                            {isCurrentPlan ? (
                                                <>Active Plan <TbCheck className="text-lg" /></>
                                            ) : isDowngrade ? (
                                                <>Downgrade Unavailable</>
                                            ) : isUpgrade ? (
                                                <>Upgrade Plan <TbArrowUpRight className="text-lg" /></>
                                            ) : (
                                                <>Choose Plan <TbArrowUpRight className="text-lg" /></>
                                            )}
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    )}
                </div>
            </div>

            <PurchaseModal
                selectedSubs={selectedSubs}
                setSelectedSubs={setSelectedSubs}
                billingAddress={billingAddress}
                setBillingAddress={setBillingAddress}
                method={method}
            />

            <ThemeSelectionModal
                isOpen={isThemeModalOpen}
                onClose={() => setIsThemeModalOpen(false)}
                onSelect={(theme) => {
                    if (pendingSubs) {
                        setSelectedSubs({ ...pendingSubs, theme: theme });
                        setIsThemeModalOpen(false);
                    }
                }}
            />
        </main>
    );
};

export default function Pricing() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#050505] text-neutral-500 font-unbounded">Loading...</div>}>
            <PricingContent />
        </Suspense>
    );
}
