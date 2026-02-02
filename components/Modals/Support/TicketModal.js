
'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbX, TbSend, TbLoader, TbTicket } from 'react-icons/tb';
import toast from 'react-hot-toast';

export default function TicketModal({ isOpen, onClose, onSuccess }) {
    const [priority, setPriority] = useState('medium');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetchingCategories, setFetchingCategories] = useState(false);

    // Fetch Categories when modal opens
    useEffect(() => {
        if (isOpen) {
            const fetchCategories = async () => {
                try {
                    setFetchingCategories(true);
                    const res = await fetch('/api/v1/support/categories');
                    const data = await res.json();
                    if (res.ok) {
                        setCategories(data);
                        if (data.length > 0) setCategoryId(data[0].id);
                    } else {
                        toast.error("Failed to load categories");
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    setFetchingCategories(false);
                }
            };
            fetchCategories();
        }
    }, [isOpen]);

    const handleSubmit = async () => {
        if (!subject || !message || !categoryId) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            setLoading(true);
            const res = await fetch('/api/v1/support/tickets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subject,
                    message,
                    priority,
                    categoryId
                })
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Ticket created successfully!');
                setSubject('');
                setMessage('');
                setPriority('medium');
                if (onSuccess) onSuccess();
                onClose();
            } else {
                toast.error(data.error || 'Failed to create ticket');
            }
        } catch (error) {
            toast.error('Something went wrong');
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
                    className="bg-white dark:bg-[#111] w-full max-w-lg rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col"
                >
                    <div className="flex justify-between items-center p-6 border-b border-neutral-100 dark:border-neutral-800">
                        <h3 className="font-unbounded font-bold text-lg text-neutral-900 dark:text-white flex items-center gap-2">
                            <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600">
                                <TbTicket size={20} />
                            </div>
                            Submit a Ticket
                        </h3>
                        <button onClick={onClose} className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                            <TbX size={24} />
                        </button>
                    </div>

                    <div className="p-6 space-y-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800 text-sm text-blue-800 dark:text-blue-200">
                            Our team typically responds within <strong>24 hours</strong>. For urgent matters, please use Live Chat.
                        </div>

                        {/* Subject */}
                        <div>
                            <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-1">Subject</label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Briefly describe the issue..."
                                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm font-medium"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-1">Category</label>
                            {fetchingCategories ? (
                                <div className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-400">Loading categories...</div>
                            ) : (
                                <select
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm font-medium appearance-none cursor-pointer"
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                    {categories.length === 0 && <option value="">No categories available</option>}
                                </select>
                            )}
                        </div>

                        {/* Priority */}
                        <div>
                            <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-1">Priority</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['low', 'medium', 'high'].map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setPriority(p)}
                                        className={`py-2 rounded-lg text-sm font-bold capitalize transition-all border ${priority === p
                                            ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600'
                                            : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-500'
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-1">Message</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Provide detailed information..."
                                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm min-h-[120px] resize-none"
                            ></textarea>
                        </div>
                    </div>

                    <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0A0A0A] flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 text-neutral-500 hover:text-black dark:hover:text-white font-bold text-sm transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading || categories.length === 0}
                            className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-orange-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <TbLoader className="animate-spin" /> : <TbSend />} Submit Ticket
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
