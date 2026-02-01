import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbAlertTriangle, TbX } from 'react-icons/tb';

export default function DeleteTierModal({ isOpen, onClose, tier, onConfirm }) {
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
                        className="relative w-full max-w-md bg-white dark:bg-black rounded-[2rem] border border-neutral-100 dark:border-neutral-800 shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Content */}
                        <div className="flex flex-col items-center justify-center pt-8 pb-4 px-6 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-4 text-red-500 dark:text-red-400">
                                <TbAlertTriangle className="text-3xl" />
                            </div>
                            <h2 className="font-unbounded font-bold text-xl text-neutral-900 dark:text-white mb-2">Delete Tier?</h2>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-[250px]">
                                Are you sure you want to delete the <span className="font-bold text-neutral-900 dark:text-white">"{tier?.name}"</span> tier? This action cannot be undone.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="p-6 pt-2">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={onClose}
                                    className="flex-1 px-6 py-3 rounded-xl text-xs font-bold font-unbounded text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => onConfirm(tier)}
                                    className="flex-1 px-6 py-3 rounded-xl text-xs font-bold font-unbounded bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 transition-all hover:scale-105 active:scale-95"
                                >
                                    Delete Tier
                                </button>
                            </div>
                        </div>

                        {/* Top Left Close Button (Design consistency with DeleteUserModal) */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 left-4 p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
                        >
                            <TbX className="text-xl" />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
