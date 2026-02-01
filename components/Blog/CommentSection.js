
'use client';

import React, { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { TbMessageCircle, TbSend, TbUser, TbLoader } from 'react-icons/tb';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommentSection({ blogId }) {
    const { data: session } = useSession();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const fetchComments = async () => {
        try {
            const res = await fetch(`/api/v1/comments?blogId=${blogId}`);
            if (res.ok) {
                const data = await res.json();
                setComments(data);
            }
        } catch (error) {
            console.error('Failed to fetch comments', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (blogId) {
            fetchComments();
        }
    }, [blogId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!session) {
            toast.error('Please login to comment');
            return;
        }
        if (!newComment.trim()) return;

        setSubmitting(true);
        try {
            const res = await fetch('/api/v1/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newComment, blogId }),
            });

            if (res.ok) {
                const addedComment = await res.json();
                setComments([addedComment, ...comments]); // Add to top
                setNewComment('');
                toast.success('Comment posted!');
            } else {
                toast.error('Failed to post comment');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error posting comment');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 border-t border-neutral-100 dark:border-neutral-900">
            <h3 className="text-2xl font-unbounded font-bold mb-8 flex items-center gap-2">
                <TbMessageCircle />
                Comments ({comments.length})
            </h3>

            {/* Input Area */}
            <div className="mb-12">
                {session ? (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <div className="shrink-0 hidden md:block">
                                {session.user.image ? (
                                    <img src={session.user.image} alt={session.user.name} className="w-10 h-10 rounded-full object-cover" />
                                ) : (
                                    <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center">
                                        <TbUser />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Write your thoughts..."
                                    className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 min-h-[120px] outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-y"
                                />
                                <div className="flex justify-end mt-2">
                                    <button
                                        type="submit"
                                        disabled={submitting || !newComment.trim()}
                                        className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {submitting ? <TbLoader className="animate-spin" /> : <TbSend />}
                                        Post Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-xl p-8 text-center border border-dashed border-neutral-200 dark:border-neutral-800">
                        <p className="text-neutral-500 mb-4">You need to be logged in to join the discussion.</p>
                        <button
                            onClick={() => signIn()}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors"
                        >
                            Login to Comment
                        </button>
                    </div>
                )}
            </div>

            {/* List */}
            <div className="space-y-8">
                {loading ? (
                    <div className="text-center py-8 text-neutral-500">Loading comments...</div>
                ) : comments.length === 0 ? (
                    <div className="text-center py-8 text-neutral-500 italic">No comments yet. Be the first to share your thoughts!</div>
                ) : (
                    <AnimatePresence>
                        {comments.map((comment) => (
                            <motion.div
                                key={comment.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex gap-4 group"
                            >
                                <div className="shrink-0">
                                    {comment.user?.image ? (
                                        <img src={comment.user.image} alt={comment.user.fullname} className="w-10 h-10 rounded-full object-cover" />
                                    ) : (
                                        <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center text-neutral-500">
                                            {comment.user?.fullname?.[0] || <TbUser />}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-sm text-neutral-900 dark:text-white">
                                            {comment.user?.fullname || 'Anonymous'}
                                        </span>
                                        <span className="text-xs text-neutral-500">
                                            {new Date(comment.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed whitespace-pre-wrap">
                                        {comment.content}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}
