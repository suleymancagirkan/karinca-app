'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TbPlus, TbFolder, TbTicket, TbPencil, TbTrash, TbSearch } from 'react-icons/tb';
import toast from 'react-hot-toast';
import CreateCategoryModal from '@/components/Modals/Support/Categories/CreateCategoryModal';
import EditCategoryModal from '@/components/Modals/Support/Categories/EditCategoryModal';
import DeleteCategoryModal from '@/components/Modals/Support/Categories/DeleteCategoryModal';

export default function SupportCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Modal States
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [deletingCategory, setDeletingCategory] = useState(null);

    // Fetch Categories
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/admin/support/categories');
            const data = await response.json();

            if (response.ok) {
                setCategories(data);
            } else {
                toast.error(data.error || 'Failed to fetch categories');
            }
        } catch (error) {
            toast.error('An error occurred while fetching categories');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Handlers
    const handleCreate = async (data) => {
        try {
            const response = await fetch('/api/admin/support/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            if (response.ok) {
                toast.success('Category created successfully');
                fetchCategories(); // Refresh list
            } else {
                toast.error(result.error || 'Failed to create category');
            }
        } catch (error) {
            toast.error('Error creating category');
        }
    };

    const handleUpdate = async (id, data) => {
        try {
            const response = await fetch(`/api/admin/support/categories/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            if (response.ok) {
                toast.success('Category updated successfully');
                fetchCategories();
            } else {
                toast.error(result.error || 'Failed to update category');
            }
        } catch (error) {
            toast.error('Error updating category');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/admin/support/categories/${id}`, {
                method: 'DELETE',
            });
            const result = await response.json();

            if (response.ok) {
                toast.success('Category deleted successfully');
                fetchCategories();
            } else {
                toast.error(result.error || 'Failed to delete category');
            }
        } catch (error) {
            toast.error('Error deleting category');
        }
    };

    // Filtered Categories
    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <span className="font-unbounded font-bold text-xs uppercase tracking-widest text-neutral-400 mb-2 block">
                        Support Center
                    </span>
                    <h1 className="font-unbounded font-black text-3xl md:text-4xl text-neutral-900 dark:text-white leading-tight">
                        Ticket Categories
                    </h1>
                </div>
                <div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-white/95 text-black rounded-xl font-unbounded font-bold text-xs uppercase tracking-wider transition-all hover:-translate-y-1"
                    >
                        <TbPlus size={18} /> New Category
                    </button>
                </div>
            </div>

            {/* Content/Table Area */}
            <div className="bg-white dark:bg-black rounded-3xl border border-neutral-100 dark:border-neutral-800 overflow-hidden min-h-[400px]">

                {/* Toolbar */}
                <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-64">
                        <TbSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                        />
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20 text-neutral-400 gap-4">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <p className="font-unbounded text-xs font-bold uppercase tracking-widest">Loading...</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && filteredCategories.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-neutral-400 gap-4">
                        <div className="w-16 h-16 bg-neutral-50 dark:bg-neutral-900 rounded-full flex items-center justify-center">
                            <TbFolder size={32} className="opacity-50" />
                        </div>
                        <p className="font-medium text-sm">No categories found.</p>
                    </div>
                )}

                {/* List */}
                {!loading && filteredCategories.length > 0 && (
                    <div className="w-full">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-neutral-100 dark:border-neutral-800 text-xs font-unbounded font-bold text-neutral-500 uppercase tracking-wider bg-neutral-50/50 dark:bg-neutral-900/50">
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4 text-center">Tickets</th>
                                        <th className="px-6 py-4 md:table-cell hidden">Created At</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                    {filteredCategories.map((category) => (
                                        <tr key={category.id} className="group hover:bg-neutral-50 dark:hover:bg-neutral-900/20 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                                        <TbFolder size={16} />
                                                    </div>
                                                    <span className="font-bold text-sm text-neutral-900 dark:text-white">
                                                        {category.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-bold text-neutral-600 dark:text-neutral-400">
                                                    <TbTicket size={12} />
                                                    {category._count?.tickets || 0}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 md:table-cell hidden">
                                                <span className="text-xs font-medium text-neutral-500 font-mono">
                                                    {new Date(category.createdAt).toLocaleDateString()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => setEditingCategory(category)}
                                                        className="p-2 rounded-lg text-neutral-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <TbPencil size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => setDeletingCategory(category)}
                                                        className="p-2 rounded-lg text-neutral-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
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
                    </div>
                )}
            </div>

            {/* Modals */}
            <CreateCategoryModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSave={handleCreate}
            />

            <EditCategoryModal
                isOpen={!!editingCategory}
                onClose={() => setEditingCategory(null)}
                category={editingCategory}
                onUpdate={handleUpdate}
            />

            <DeleteCategoryModal
                isOpen={!!deletingCategory}
                onClose={() => setDeletingCategory(null)}
                category={deletingCategory}
                onDelete={handleDelete}
            />

        </div>
    );
}
