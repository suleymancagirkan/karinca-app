import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbX, TbTemplate, TbDeviceFloppy, TbLink, TbPhoto } from 'react-icons/tb';

export default function EditThemeModal({ isOpen, onClose, theme, onSave, categories = [] }) {
    const [formData, setFormData] = useState({
        name: '',
        categoryId: '',
        description: '',
        url: '',
        icon: ''
    });

    useEffect(() => {
        if (theme) {
            setFormData({
                id: theme.id,
                name: theme.name,
                categoryId: theme.categoryId,
                description: theme.description || '',
                url: theme.url || '',
                icon: theme.icon || ''
            });
        }
    }, [theme]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
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
                                <h2 className="font-unbounded font-bold text-xl text-neutral-900 dark:text-white">Edit Theme</h2>
                                <p className="text-xs text-neutral-500 mt-1 font-medium">Update theme details</p>
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
                                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Theme Name</label>
                                    <div className="relative group">
                                        <TbTemplate className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors text-lg" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none transition-all text-neutral-900 dark:text-white placeholder:text-neutral-400"
                                        />
                                    </div>
                                </div>

                                {/* Category */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Category</label>
                                    <select
                                        name="categoryId"
                                        value={formData.categoryId}
                                        onChange={handleChange}
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

                                {/* URL */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Demo URL</label>
                                    <div className="relative group">
                                        <TbLink className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors text-lg" />
                                        <input
                                            type="url"
                                            name="url"
                                            value={formData.url}
                                            onChange={handleChange}
                                            placeholder="https://example.com"
                                            className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none transition-all text-neutral-900 dark:text-white placeholder:text-neutral-400"
                                        />
                                    </div>
                                </div>

                                {/* Icon */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Icon (Class Name or URL)</label>
                                    <div className="relative group">
                                        <TbPhoto className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors text-lg" />
                                        <input
                                            type="text"
                                            name="icon"
                                            value={formData.icon}
                                            onChange={handleChange}
                                            placeholder="e.g. TbGavel"
                                            className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none transition-all text-neutral-900 dark:text-white placeholder:text-neutral-400"
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
                                    rows={4}
                                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none transition-all text-neutral-900 dark:text-white placeholder:text-neutral-400 resize-none"
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
                                    <TbDeviceFloppy className="text-lg" />
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
