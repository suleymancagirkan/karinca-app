'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TbSearch,
    TbPlus,
    TbDotsVertical,
    TbTrash,
    TbEdit,
    TbFilter,
    TbTicket,
    TbCalendar,
    TbUsers,
    TbCopy,
    TbX
} from 'react-icons/tb';
import toast from 'react-hot-toast';
import AddCouponModal from '@/components/Modals/Coupons/AddCouponModal';
import EditCouponModal from '@/components/Modals/Coupons/EditCouponModal';
import DeleteCouponModal from '@/components/Modals/Coupons/DeleteCouponModal';

export default function CouponsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAction, setSelectedAction] = useState(null);
    const [selectedCoupon, setSelectedCoupon] = useState(null);

    // Fetch Coupons
    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const response = await fetch('/api/admin/coupons');
                if (response.ok) {
                    const data = await response.json();
                    setCoupons(data);
                } else {
                    toast.error('Failed to load coupons');
                }
            } catch (error) {
                console.error('Fetch error:', error);
                toast.error('An error occurred loading coupons');
            } finally {
                setLoading(false);
            }
        };

        fetchCoupons();
    }, []);

    const handleCreateCoupon = async (couponData) => {
        try {
            const response = await fetch('/api/admin/coupons', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(couponData)
            });

            if (response.ok) {
                const newCoupon = await response.json();
                setCoupons(prev => [newCoupon, ...prev]);
                setSelectedAction(null);
                toast.success('Coupon created successfully!');
            } else {
                const error = await response.text();
                toast.error(error);
            }
        } catch (error) {
            console.error('Create error:', error);
            toast.error('Failed to create coupon');
        }
    };

    const handleUpdateCoupon = async (couponData) => {
        try {
            const response = await fetch('/api/admin/coupons', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(couponData)
            });

            if (response.ok) {
                const updatedCoupon = await response.json();
                setCoupons(prev => prev.map(c => c.id === updatedCoupon.id ? updatedCoupon : c));
                setSelectedAction(null);
                setSelectedCoupon(null);
                toast.success('Coupon updated successfully!');
            } else {
                const error = await response.text();
                toast.error(error);
            }
        } catch (error) {
            console.error('Update error:', error);
            toast.error('Failed to update coupon');
        }
    };

    const handleDeleteCoupon = async (coupon) => {
        try {
            const response = await fetch(`/api/admin/coupons?id=${coupon.id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setCoupons(prev => prev.filter(c => c.id !== coupon.id));
                setSelectedAction(null);
                setSelectedCoupon(null);
                toast.success('Coupon deleted successfully!');
            } else {
                const error = await response.text();
                toast.error(error);
            }
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('Failed to delete coupon');
        }
    };

    const filteredCoupons = coupons.filter(coupon =>
        coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (coupon.description && coupon.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code);
        toast.success('Coupon code copied!');
    };

    // Helper to format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <span className="font-unbounded font-bold text-xs uppercase tracking-widest text-neutral-400 mb-2 block">
                        Store
                    </span>
                    <h1 className="font-unbounded font-black text-3xl md:text-4xl text-neutral-900 dark:text-neutral-100 leading-tight">
                        Coupons
                    </h1>
                </div>
                <button onClick={() => setSelectedAction('add')} className="group flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-unbounded font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform">
                    <TbPlus className="text-lg" />
                    <span>Create Coupon</span>
                </button>
            </div>

            {/* Toolbar section */}
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-white dark:bg-black rounded-[2rem] border border-neutral-100 dark:border-neutral-800">
                <div className="relative flex-1">
                    <TbSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-lg" />
                    <input
                        type="text"
                        placeholder="Search coupons by code..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none transition-colors"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-5 py-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl font-unbounded text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
                        <TbFilter className="text-lg" />
                        <span>Filter</span>
                    </button>
                </div>
            </div>

            {/* Coupons Grid - Ticket Style */}
            {loading ? (
                <div className="text-center py-20 text-neutral-500">Loading coupons...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredCoupons.map((coupon, index) => (
                            <motion.div
                                key={coupon.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.05 }}
                                className="group relative flex overflow-hidden rounded-[2rem] bg-white dark:bg-black border border-neutral-100 dark:border-neutral-800 hover:border-violet-500 dark:hover:border-violet-500 transition-all"
                            >
                                {/* Left Side (Decorative) */}
                                <div className="w-16 bg-neutral-50 dark:bg-neutral-900 border-r border-dashed border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center gap-2 py-4 relative">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-neutral-100 dark:bg-black border border-neutral-200 dark:border-neutral-800 z-10" />
                                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-neutral-100 dark:bg-black border border-neutral-200 dark:border-neutral-800 z-10" />
                                    <span className="rotate-180 text-[10px] font-unbounded font-bold uppercase tracking-widest text-neutral-300 dark:text-neutral-700 whitespace-nowrap" style={{ writingMode: 'vertical-rl' }}>
                                        Coupon Ticket
                                    </span>
                                </div>

                                {/* Main Content */}
                                <div className="flex-1 p-6 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-300 px-4 py-1.5 rounded-lg border border-violet-100 dark:border-violet-900/30 flex items-center gap-2 cursor-pointer hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-colors group/code" onClick={() => copyToClipboard(coupon.code)}>
                                            <TbTicket className="text-lg" />
                                            <span className="font-mono font-bold text-sm tracking-wider">{coupon.code}</span>
                                            <TbCopy className="opacity-0 group-hover/code:opacity-100 transition-opacity text-xs" />
                                        </div>
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-unbounded font-bold uppercase tracking-wide
                                            ${coupon.status === 'active' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'}
                                        `}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${coupon.status === 'active' ? 'bg-green-500' : 'bg-neutral-400'}`} />
                                            {coupon.status}
                                        </span>
                                    </div>

                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-1">
                                            <span className="font-unbounded font-black text-4xl text-neutral-900 dark:text-white">
                                                {coupon.discountType === 'percent' ? `${coupon.discount}%` : `₺${coupon.discount}`}
                                            </span>
                                            <span className="font-unbounded text-sm font-bold text-neutral-400 uppercase">OFF</span>
                                        </div>
                                        <p className="text-xs text-neutral-500 mt-1 line-clamp-1">{coupon.description}</p>
                                    </div>

                                    <div className="mt-auto space-y-3">
                                        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                                            <div className="flex items-center gap-1.5">
                                                <TbCalendar className="text-neutral-400" />
                                                <span>Expires {formatDate(coupon.expiresAt)}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                                            <div className="flex items-center gap-1.5">
                                                <TbUsers className="text-neutral-400" />
                                                <span>{coupon.limit} max uses</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="absolute top-20 right-6 flex flex-col gap-2 translate-x-10 group-hover:translate-x-0 transition-transform duration-300">
                                        <button
                                            className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors shadow-sm"
                                            onClick={() => { setSelectedCoupon(coupon); setSelectedAction('edit'); }}
                                        >
                                            <TbEdit />
                                        </button>
                                        <button
                                            className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors shadow-sm"
                                            onClick={() => { setSelectedCoupon(coupon); setSelectedAction('delete'); }}
                                        >
                                            <TbTrash />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {selectedAction === 'add' && (
                <AddCouponModal
                    isOpen={selectedAction === 'add'}
                    onClose={() => setSelectedAction(null)}
                    onSave={handleCreateCoupon}
                />
            )}

            {selectedAction === 'edit' && (
                <EditCouponModal
                    isOpen={selectedAction === 'edit'}
                    onClose={() => { setSelectedAction(null); setSelectedCoupon(null); }}
                    coupon={selectedCoupon}
                    onSave={handleUpdateCoupon}
                />
            )}

            {selectedAction === 'delete' && (
                <DeleteCouponModal
                    isOpen={selectedAction === 'delete'}
                    onClose={() => { setSelectedAction(null); setSelectedCoupon(null); }}
                    coupon={selectedCoupon}
                    onConfirm={handleDeleteCoupon}
                />
            )}
        </div>
    );
}
