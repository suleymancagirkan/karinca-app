'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbX, TbEdit } from 'react-icons/tb';

export default function EditCategoryModal({ isOpen, onClose, category, onUpdate }) {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (category) {
            setName(category.name);
        }
    }, [category]);

    if (!isOpen || !category) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onUpdate(category.id, { name });
        setLoading(false);
        onClose();
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white dark:bg-[#111] w-full max-w-md rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col"
                >
                    <div className="flex justify-between items-center p-6 border-b border-neutral-100 dark:border-neutral-800">
                        <h3 className="font-unbounded font-bold text-lg text-neutral-900 dark:text-white flex items-center gap-2">
                            <TbEdit /> Edit Category
                        </h3>
                        <button onClick={onClose} className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                            <TbX size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">
                                Category Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-3 text-sm font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-neutral-400"
                                required
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-neutral-500 hover:text-black dark:hover:text-white font-medium text-sm transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-white hover:bg-white/95 text-black rounded-lg font-bold text-sm flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
