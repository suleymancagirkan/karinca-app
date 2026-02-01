
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TbPlus, TbEdit, TbTrash, TbSearch, TbFileText, TbCalendar, TbUser, TbCategory } from 'react-icons/tb';
import toast from 'react-hot-toast';
import PostModal from '@/components/Modals/Blogs/PostModal';
import Image from 'next/image';

export default function BlogPostsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/admin/blogs/posts');
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (error) {
            console.error('Failed to fetch posts:', error);
            toast.error('Failed to load posts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            const res = await fetch(`/api/admin/blogs/posts/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                toast.success('Post deleted');
                fetchPosts();
            } else {
                throw new Error('Failed to delete');
            }
        } catch (error) {
            toast.error('Delete failed');
        }
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 max-w-[1600px] mx-auto pb-32">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-unbounded font-bold text-neutral-900 dark:text-white">
                        Blog Posts
                    </h1>
                    <p className="text-neutral-500 font-mono text-sm mt-1">
                        Create and manage your blog content
                    </p>
                </div>
                <button
                    onClick={() => { setSelectedPost(null); setIsModalOpen(true); }}
                    className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold font-unbounded text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                    <TbPlus size={18} />
                    Create Post
                </button>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <TbSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none focus:border-blue-500 transition-colors text-neutral-900 dark:text-white"
                />
            </div>

            {/* List */}
            {loading ? (
                <div className="text-center py-12 text-neutral-500">Loading posts...</div>
            ) : filteredPosts.length === 0 ? (
                <div className="text-center py-20 text-neutral-500 bg-neutral-50 dark:bg-neutral-900/50 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800">
                    <TbFileText className="text-4xl mx-auto mb-4 opacity-20" />
                    <p>No posts found. Start writing!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredPosts.map((post) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center gap-6 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors group"
                        >
                            {/* Image Thumbnail */}
                            <div className="w-full md:w-32 h-20 bg-neutral-100 dark:bg-neutral-900 rounded-lg overflow-hidden flex-shrink-0 relative">
                                {post.image ? (
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-neutral-300">
                                        <TbFileText size={24} />
                                    </div>
                                )}
                            </div>

                            {/* Content Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-lg text-neutral-900 dark:text-white truncate">
                                    {post.title}
                                </h3>
                                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs font-mono text-neutral-500">
                                    <span className="flex items-center gap-1">
                                        <TbCategory /> {post.category?.name || 'Uncategorized'}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <TbUser /> {post.author?.fullname || 'Unknown'}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <TbCalendar /> {new Date(post.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity self-end md:self-center">
                                <button
                                    onClick={() => { setSelectedPost(post); setIsModalOpen(true); }}
                                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
                                    title="Edit"
                                >
                                    <TbEdit size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg text-neutral-500 hover:text-red-500 transition-colors"
                                    title="Delete"
                                >
                                    <TbTrash size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <PostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchPosts}
                post={selectedPost}
            />
        </div>
    );
}
