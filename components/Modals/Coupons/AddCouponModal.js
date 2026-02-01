import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbX, TbTicket, TbCalendar, TbUsers, TbPercentage, TbCurrencyLira, TbPlus } from 'react-icons/tb';

export default function AddCouponModal({ isOpen, onClose, onSave }) {
    const [formData, setFormData] = useState({
        code: '',
        discountType: 'percent',
        discount: '',
        expiresAt: '',
        limit: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            discount: Number(formData.discount),
            limit: Number(formData.limit)
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-white dark:bg-black rounded-[2rem] border border-neutral-100 dark:border-neutral-800 shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-neutral-100 dark:border-neutral-800">
                            <div>
                                <h2 className="font-unbounded font-bold text-xl text-neutral-900 dark:text-white">Create Coupon</h2>
                                <p className="text-xs text-neutral-500 mt-1 font-medium">Add a new discount code</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
                            >
                                <TbX className="text-xl" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {/* Code & Type Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Coupon Code</label>
                                    <div className="relative group">
                                        <TbTicket className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-violet-500 transition-colors text-lg" />
                                        <input
                                            type="text"
                                            name="code"
                                            value={formData.code}
                                            onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                                            placeholder="e.g. SUMMER2024"
                                            required
                                            className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3 pl-12 pr-4 text-sm font-bold font-mono tracking-wider focus:outline-none transition-all text-neutral-900 dark:text-white placeholder:text-neutral-400 uppercase"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Discount Type</label>
                                    <div className="flex bg-neutral-50 dark:bg-neutral-900 p-1.5 rounded-xl">
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, discountType: 'percent' }))}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold font-unbounded transition-all ${formData.discountType === 'percent'
                                                ? 'bg-white dark:bg-neutral-800 text-black dark:text-white shadow-sm'
                                                : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                                                }`}
                                        >
                                            <TbPercentage /> Percentage
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, discountType: 'fixed' }))}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold font-unbounded transition-all ${formData.discountType === 'fixed'
                                                ? 'bg-white dark:bg-neutral-800 text-black dark:text-white shadow-sm'
                                                : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                                                }`}
                                        >
                                            <TbCurrencyLira /> Fixed Amount
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Value & Limits Row */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Discount Value</label>
                                    <input
                                        type="number"
                                        name="discount"
                                        value={formData.discount}
                                        onChange={handleChange}
                                        placeholder={formData.discountType === 'percent' ? "20" : "100"}
                                        required
                                        min="0"
                                        className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none transition-all text-neutral-900 dark:text-white placeholder:text-neutral-400"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Usage Limit</label>
                                    <div className="relative group">
                                        <TbUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-lg" />
                                        <input
                                            type="number"
                                            name="limit"
                                            value={formData.limit}
                                            onChange={handleChange}
                                            placeholder="100"
                                            className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none transition-all text-neutral-900 dark:text-white placeholder:text-neutral-400"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Expiry Date</label>
                                    <div className="relative group">
                                        <TbCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-lg" />
                                        <input
                                            type="date"
                                            name="expiresAt"
                                            value={formData.expiresAt}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none transition-all text-neutral-900 dark:text-white placeholder:text-neutral-400 appearance-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none transition-all text-neutral-900 dark:text-white placeholder:text-neutral-400 resize-none"
                                    placeholder="Internal note or customer facing description..."
                                />
                            </div>

                            {/* Footer Actions */}
                            <div className="flex items-center justify-end gap-3 pt-6 mt-2 border-t border-neutral-100 dark:border-neutral-800">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-3 rounded-xl text-xs font-bold font-unbounded text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-3 rounded-xl text-xs font-bold font-unbounded bg-black dark:bg-white text-white dark:text-black hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/20 dark:shadow-white/20 flex items-center gap-2"
                                >
                                    <TbPlus className="text-lg" />
                                    <span>Create Coupon</span>
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
