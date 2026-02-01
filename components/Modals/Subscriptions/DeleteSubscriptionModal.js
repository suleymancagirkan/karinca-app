
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbAlertTriangle, TbTrash, TbX } from 'react-icons/tb';

export default function DeleteSubscriptionModal({ isOpen, onClose, subscription, onConfirm }) {
    if (!subscription) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-white dark:bg-black rounded-[2rem] border border-neutral-100 dark:border-neutral-800 shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-500 flex items-center justify-center mx-auto mb-6">
                                <TbAlertTriangle className="text-3xl" />
                            </div>

                            <h2 className="font-unbounded font-bold text-xl text-neutral-900 dark:text-white mb-2">
                                Terminate Subscription?
                            </h2>
                            <p className="text-sm text-neutral-500 mb-8 max-w-[80%] mx-auto">
                                Are you sure you want to delete this subscription for <span className="font-bold text-neutral-900 dark:text-white">{subscription.user?.fullname || subscription.user?.email}</span>? This action cannot be undone.
                            </p>

                            <div className="flex gap-3 justify-center">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-3 rounded-xl text-xs font-bold font-unbounded text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => onConfirm(subscription)}
                                    className="px-6 py-3 rounded-xl text-xs font-bold font-unbounded bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg shadow-red-600/20"
                                >
                                    <TbTrash />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
