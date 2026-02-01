import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbX, TbCheck, TbTemplate } from 'react-icons/tb';
import * as TbIcons from 'react-icons/tb';
import Link from 'next/link';

export default function ThemeSelectionModal({ isOpen, onClose, onSelect }) {
    const [themes, setThemes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            fetch('/api/admin/themes')
                .then(res => res.json())
                .then(data => {
                    setThemes(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Failed to fetch themes:', err);
                    setLoading(false);
                });
        }
    }, [isOpen]);

    const getIcon = (iconName) => {
        if (iconName && TbIcons[iconName]) {
            const IconComponent = TbIcons[iconName];
            return <IconComponent className="text-3xl mb-3" />;
        }
        return <TbTemplate className="text-3xl mb-3" />;
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
                        className="relative w-full max-w-4xl bg-white dark:bg-black rounded-[2rem] border border-neutral-100 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-8 border-b border-neutral-100 dark:border-neutral-800 shrink-0">
                            <div>
                                <h2 className="font-unbounded font-bold text-2xl text-neutral-900 dark:text-white">Choose Your Theme</h2>
                                <p className="text-sm text-neutral-500 mt-1 font-medium">Select a starting template for your website</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
                            >
                                <TbX className="text-xl" />
                            </button>
                        </div>

                        {/* Themes Grid */}
                        <div className="p-8 overflow-y-auto">
                            {loading ? (
                                <div className="text-center py-10 text-neutral-500">Loading themes...</div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {themes.map((theme) => (
                                        <button
                                            key={theme.id}
                                            onClick={() => onSelect(theme)}
                                            className="group relative p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500 bg-neutral-50 dark:bg-neutral-900/50 text-left transition-all hover:shadow-lg hover:-translate-y-1"
                                        >
                                            <div className="text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">
                                                {getIcon(theme.icon)}
                                            </div>
                                            <h3 className="font-unbounded font-bold text-lg text-neutral-900 dark:text-white mb-2">{theme.name}</h3>
                                            <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">{theme.description}</p>

                                            <span className="inline-block mt-3 px-2 py-1 bg-neutral-200 dark:bg-neutral-800 rounded text-[10px] font-bold uppercase text-neutral-600 dark:text-neutral-400">
                                                {theme.category?.name || 'Theme'}
                                            </span>

                                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                                                    <TbCheck />
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <span className='text-xs text-neutral-800 dark:text-neutral-200 mt-2 font-medium text-center pb-3'>You can see all the templates in this <Link href='https://demo.karinca.app' target='_blank' className='underline hover:text-blue-600 transition-colors'>link</Link></span>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
