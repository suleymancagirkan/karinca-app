'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbX, TbLoader, TbWorld, TbCheck } from 'react-icons/tb';

export default function SetupServiceModal({ isOpen, onClose, onSave, service }) {
    const [formData, setFormData] = useState({
        siteUrl: service?.siteUrl || '',
    });
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(formData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-neutral-100 dark:border-neutral-800">
                            <h3 className="text-xl font-bold font-unbounded text-neutral-900 dark:text-white">
                                Setup Your Service
                            </h3>
                            <button
                                onClick={onClose}
                                className="p-2 text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                            >
                                <TbX className="text-xl" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div>
                                <label className="block text-xs font-bold font-unbounded text-neutral-500 uppercase tracking-wider mb-2">
                                    Website URL
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <TbWorld className="text-neutral-400 text-lg" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        placeholder="example.com"
                                        value={formData.siteUrl}
                                        onChange={(e) => {
                                            let val = e.target.value;
                                            // Optional: real-time cleanup or just allow typing and clean on blur?
                                            // Let's just update value here, and clean on helper or blur.
                                            setFormData({ ...formData, siteUrl: val })
                                        }}
                                        onBlur={() => {
                                            let val = formData.siteUrl;
                                            let clean = val.replace(/(^\w+:|^)\/\//, '').replace(/\/+$/, '');
                                            setFormData({ ...formData, siteUrl: clean });
                                        }}
                                        className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-medium"
                                    />
                                </div>
                                <p className="mt-2 text-xs text-neutral-400">
                                    Enter the live URL where this license will be used.
                                </p>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-3 text-sm font-bold font-unbounded text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold font-unbounded rounded-xl shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <TbLoader className="animate-spin text-lg" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <TbCheck className="text-lg" />
                                            Save & Launch
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
