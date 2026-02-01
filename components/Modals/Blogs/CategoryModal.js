
'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbX, TbDeviceFloppy, TbLoader } from 'react-icons/tb';
import toast from 'react-hot-toast';

export default function CategoryModal({ isOpen, onClose, onSuccess, category = null }) {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (category) {
            setName(category.name);
        } else {
            setName('');
        }
    }, [category, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = category
                ? `/api/admin/blogs/categories/${category.id}`
                : '/api/admin/blogs/categories';

            const method = category ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            });

            if (!res.ok) throw new Error('Failed to save category');

            toast.success(category ? 'Category updated' : 'Category created');
            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            toast.error('Operation failed');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white dark:bg-[#111] w-full max-w-md rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden"
                >
                    <div className="flex justify-between items-center p-6 border-b border-neutral-100 dark:border-neutral-800">
                        <h3 className="font-unbounded font-bold text-lg text-neutral-900 dark:text-white">
                            {category ? 'Edit Category' : 'New Category'}
                        </h3>
                        <button onClick={onClose} className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                            <TbX size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 mb-1">
                                Category Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-black text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="e.g. Technology"
                                required
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-bold flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                {loading ? <TbLoader className="animate-spin" /> : <TbDeviceFloppy />}
                                {category ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
