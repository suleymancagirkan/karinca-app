
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbX, TbUser, TbTrash, TbExternalLink, TbMessageCircle } from 'react-icons/tb';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function CommentModal({ isOpen, onClose, comment, onDelete }) {
    if (!isOpen || !comment) return null;

    const handleDelete = async () => {
        if (!confirm('Are you definitely sure you want to delete this comment?')) return;
        onDelete(comment.id);
    };

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
                            <TbMessageCircle /> Comment Detail
                        </h3>
                        <button onClick={onClose} className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                            <TbX size={24} />
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* User Info */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center text-neutral-500">
                                <TbUser size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-sm text-neutral-900 dark:text-white">{comment.user?.fullname || 'Anonymous'}</p>
                                <p className="text-xs text-neutral-500">@{comment.user?.username || 'user'}</p>
                            </div>
                            <div className="ml-auto text-xs text-neutral-400 font-mono">
                                {new Date(comment.createdAt).toLocaleString()}
                            </div>
                        </div>

                        {/* Blog Context */}
                        <div className="bg-neutral-50 dark:bg-neutral-900/50 p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
                            <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Posted On</span>
                            <Link
                                href={`/blogs/${comment.blog?.slug}`}
                                target="_blank"
                                className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"
                            >
                                {comment.blog?.title} <TbExternalLink size={14} />
                            </Link>
                        </div>

                        {/* Content */}
                        <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 text-sm leading-relaxed whitespace-pre-wrap text-neutral-700 dark:text-neutral-300 max-h-[300px] overflow-y-auto">
                            {comment.content}
                        </div>
                    </div>

                    <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-[#0A0A0A] flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-neutral-500 hover:text-black dark:hover:text-white font-medium text-sm transition-colors"
                        >
                            Close
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold text-sm flex items-center gap-2 transition-colors shadow-lg shadow-red-500/20"
                        >
                            <TbTrash size={16} /> Delete Comment
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
