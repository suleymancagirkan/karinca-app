'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbX, TbTrash, TbAlertTriangle } from 'react-icons/tb';

export default function DeleteCategoryModal({ isOpen, onClose, category, onDelete }) {
    const [loading, setLoading] = useState(false);

    if (!isOpen || !category) return null;

    const handleDelete = async () => {
        setLoading(true);
        await onDelete(category.id);
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
                            <TbTrash className="text-red-500" /> Delete Category
                        </h3>
                        <button onClick={onClose} className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                            <TbX size={24} />
                        </button>
                    </div>

                    <div className="p-6 space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-xl text-red-600 dark:text-red-400">
                            <TbAlertTriangle size={24} className="shrink-0" />
                            <p className="text-sm font-medium">
                                Warning: This action cannot be undone.
                            </p>
                        </div>

                        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                            Are you sure you want to delete the category <span className="font-bold text-neutral-900 dark:text-white">"{category.name}"</span>?
                            This might affect existing tickets associated with this category.
                        </p>
                    </div>

                    <div className="flex justify-end gap-3 p-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0A0A0A]">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-neutral-500 hover:text-black dark:hover:text-white font-medium text-sm transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold text-sm flex items-center gap-2 transition-colors disabled:cursor-not-allowed"
                        >
                            {loading ? 'Deleting...' : 'Delete Permanently'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
