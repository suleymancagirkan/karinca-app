
'use client';
import React, { useState, useEffect } from 'react';
import { TbMessageCircle, TbSearch, TbLoader, TbTrash, TbEye } from 'react-icons/tb';
import toast from 'react-hot-toast';
import CommentModal from '@/components/Modals/Blogs/CommentModal';

export default function Comments() {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedComment, setSelectedComment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchComments = async () => {
        try {
            const res = await fetch('/api/admin/blogs/comments');
            if (res.ok) {
                const data = await res.json();
                setComments(data);
            }
        } catch (error) {
            console.error('Failed to fetch comments', error);
            toast.error('Failed to load comments');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/admin/blogs/comments/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                toast.success('Comment deleted successfully');
                setComments(prev => prev.filter(c => c.id !== id));
                setIsModalOpen(false);
            } else {
                toast.error('Failed to delete comment');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error deleting comment');
        }
    };

    const handleView = (comment) => {
        setSelectedComment(comment);
        setIsModalOpen(true);
    };

    const filteredComments = comments.filter(comment =>
        comment.content.toLowerCase().includes(search.toLowerCase()) ||
        comment.user?.fullname?.toLowerCase().includes(search.toLowerCase()) ||
        comment.blog?.title?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div className="p-8 max-w-8xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-black font-unbounded text-black dark:text-white mb-2">
                            Comments
                        </h1>
                        <p className="text-neutral-500 font-medium">Manage user discussions</p>
                    </div>
                </div>

                {/* Search */}
                <div className="relative">
                    <TbSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search comments, users, or posts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                    />
                </div>

                {/* List */}
                <div className="bg-white dark:bg-[#111] rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-neutral-500">
                            <TbLoader className="animate-spin mb-4" size={32} />
                            <p>Loading comments...</p>
                        </div>
                    ) : filteredComments.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-neutral-500">
                            <TbMessageCircle size={48} className="mb-4 opacity-20" />
                            <p>No comments found matching your criteria</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-neutral-50 dark:bg-[#0A0A0A] border-b border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4">Comment</th>
                                        <th className="px-6 py-4">Post</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-900">
                                    {filteredComments.map((comment) => (
                                        <tr key={comment.id} className="group hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xs font-bold">
                                                        {comment.user?.fullname?.[0] || 'A'}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm text-neutral-900 dark:text-white leading-none mb-1">
                                                            {comment.user?.fullname || 'Anonymous'}
                                                        </p>
                                                        <p className="text-xs text-neutral-500">@{comment.user?.username}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 max-w-md">
                                                <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
                                                    {comment.content}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 max-w-xs">
                                                <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                                                    {comment.blog?.title}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-neutral-500 whitespace-nowrap">
                                                {new Date(comment.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleView(comment)}
                                                        className="p-2 text-neutral-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                        title="View Details"
                                                    >
                                                        <TbEye size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            if (confirm('Delete this comment?')) handleDelete(comment.id);
                                                        }}
                                                        className="p-2 text-neutral-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <TbTrash size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <CommentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                comment={selectedComment}
                onDelete={handleDelete}
            /></>
    );
}
