import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbX } from 'react-icons/tb';

export default function EditTierModal({ isOpen, onClose, tier, onSave, categories = [] }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        categoryId: '',
        priceMonthly: 0,
        priceYearly: 0,
        features: '',
    });

    useEffect(() => {
        if (tier) {
            setFormData({
                ...tier,
                features: tier.features ? tier.features.join('\n') : ''
            });
        }
    }, [tier]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTier = {
            ...formData,
            priceMonthly: Number(formData.priceMonthly),
            priceYearly: Number(formData.priceYearly),
            features: formData.features.split('\n').filter(f => f.trim() !== '')
        };
        onSave(updatedTier);
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
                                <h2 className="font-unbounded font-bold text-xl text-neutral-900 dark:text-white">Edit Tier</h2>
                                <p className="text-xs text-neutral-500 mt-1 font-medium">Update subscription details</p>
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Tier Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none transition-all text-neutral-900 dark:text-white placeholder:text-neutral-400"
                                    />
                                </div>

                                {/* Category Selection */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Category</label>
                                    <select
                                        name="categoryId"
                                        value={formData.categoryId}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none transition-all text-neutral-900 dark:text-white"
                                    >
                                        <option value="" disabled>Select Category</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Monthly Price */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Monthly Price (₺)</label>
                                    <input
                                        type="number"
                                        name="priceMonthly"
                                        value={formData.priceMonthly}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.01"
                                        required
                                        className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none transition-all text-neutral-900 dark:text-white placeholder:text-neutral-400"
                                    />
                                </div>

                                {/* Yearly Price */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Yearly Price (₺)</label>
                                    <input
                                        type="number"
                                        name="priceYearly"
                                        value={formData.priceYearly}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.01"
                                        required
                                        className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none transition-all text-neutral-900 dark:text-white placeholder:text-neutral-400"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description || ''}
                                    onChange={handleChange}
                                    placeholder="Brief description..."
                                    rows="2"
                                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none transition-all text-neutral-900 dark:text-white placeholder:text-neutral-400 resize-none"
                                />
                            </div>

                            {/* Features */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Features (One per line)</label>
                                <textarea
                                    name="features"
                                    value={formData.features}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none transition-all text-neutral-900 dark:text-white placeholder:text-neutral-400 resize-none"
                                />
                            </div>

                            {/* Footer */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-2.5 rounded-xl text-neutral-500 hover:text-black dark:hover:text-white font-bold text-xs font-unbounded transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-xs font-unbounded hover:scale-105 transition-transform shadow-lg shadow-black/10 dark:shadow-white/10"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
