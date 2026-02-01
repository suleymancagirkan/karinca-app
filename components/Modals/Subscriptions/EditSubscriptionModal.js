
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbX, TbCalendar, TbDeviceFloppy, TbRepeat, TbCheck, TbInfoCircle } from 'react-icons/tb';
import toast from 'react-hot-toast';

export default function EditSubscriptionModal({ isOpen, onClose, subscription, onSave }) {
    const [formData, setFormData] = useState({
        status: '',
        period: '',
        endDate: ''
    });

    useEffect(() => {
        if (subscription) {
            setFormData({
                status: subscription.status || '',
                period: subscription.period || '',
                endDate: subscription.endDate ? new Date(subscription.endDate).toISOString().split('T')[0] : ''
            });
        }
    }, [subscription]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...subscription, ...formData });
    };

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
                        className="relative w-full max-w-lg bg-white dark:bg-black rounded-[2rem] border border-neutral-100 dark:border-neutral-800 shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-6 border-b border-neutral-100 dark:border-neutral-800">
                            <div>
                                <h2 className="font-unbounded font-bold text-xl text-neutral-900 dark:text-white">Edit Subscription</h2>
                                <p className="text-xs text-neutral-500 mt-1 font-medium">Update status and validity</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
                            >
                                <TbX className="text-xl" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {/* Status */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Status</label>
                                <div className="relative group">
                                    <TbInfoCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-lg" />
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none transition-all text-neutral-900 dark:text-white appearance-none"
                                    >
                                        <option value="ACTIVE">Active</option>
                                        <option value="EXPIRED">Expired</option>
                                        <option value="CANCELLED">Cancelled</option>
                                        <option value="PENDING">Pending</option>
                                    </select>
                                </div>
                            </div>

                            {/* Period */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Period</label>
                                <div className="relative group">
                                    <TbRepeat className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-lg" />
                                    <select
                                        name="period"
                                        value={formData.period}
                                        onChange={handleChange}
                                        className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none transition-all text-neutral-900 dark:text-white appearance-none"
                                    >
                                        <option value="Monthly">Monthly</option>
                                        <option value="Yearly">Yearly</option>
                                        <option value="Lifetime">Lifetime</option>
                                    </select>
                                </div>
                            </div>

                            {/* End Date */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Expiration Date</label>
                                <div className="relative group">
                                    <TbCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-lg" />
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none transition-all text-neutral-900 dark:text-white placeholder:text-neutral-400"
                                    />
                                </div>
                            </div>

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
                                    <span>Save Changes</span>
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
