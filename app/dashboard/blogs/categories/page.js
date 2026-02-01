
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TbPlus, TbEdit, TbTrash, TbSearch, TbCategory } from 'react-icons/tb';
import toast from 'react-hot-toast';
import CategoryModal from '@/components/Modals/Blogs/CategoryModal';

export default function BlogCategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/admin/blogs/categories');
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            toast.error('Failed to load categories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this category?')) return;

        try {
            const res = await fetch(`/api/admin/blogs/categories/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                toast.success('Category deleted');
                fetchCategories();
            } else {
                throw new Error('Failed to delete');
            }
        } catch (error) {
            toast.error('Delete failed');
        }
    };

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-unbounded font-bold text-neutral-900 dark:text-white">
                        Blog Categories
                    </h1>
                    <p className="text-neutral-500 font-mono text-sm mt-1">
                        Manage categories for your blog posts
                    </p>
                </div>
                <button
                    onClick={() => { setSelectedCategory(null); setIsModalOpen(true); }}
                    className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold font-unbounded text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                    <TbPlus size={18} />
                    Add Category
                </button>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <TbSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none focus:border-blue-500 transition-colors text-neutral-900 dark:text-white"
                />
            </div>

            {/* List */}
            {loading ? (
                <div className="text-center py-12 text-neutral-500">Loading categories...</div>
            ) : filteredCategories.length === 0 ? (
                <div className="text-center py-12 text-neutral-500 bg-neutral-50 dark:bg-neutral-900/50 rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800">
                    No categories found. Create one to get started.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCategories.map((cat) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl">
                                    <TbCategory size={24} />
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => { setSelectedCategory(cat); setIsModalOpen(true); }}
                                        className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
                                    >
                                        <TbEdit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cat.id)}
                                        className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg text-neutral-500 hover:text-red-500 transition-colors"
                                    >
                                        <TbTrash size={18} />
                                    </button>
                                </div>
                            </div>
                            <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-1">
                                {cat.name}
                            </h3>
                            <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                                <span>/{cat.slug}</span>
                                <span className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-md">
                                    {cat._count?.blogs || 0} Posts
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchCategories}
                category={selectedCategory}
            />
        </div>
    );
}
