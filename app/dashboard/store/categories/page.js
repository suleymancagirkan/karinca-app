'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TbSearch,
    TbPlus,
    TbDotsVertical,
    TbTrash,
    TbEdit,
    TbFilter,
    TbFolder,
    TbCategory,
    TbTag
} from 'react-icons/tb';
import toast from 'react-hot-toast';
import AddCategoryModal from '@/components/Modals/Categories/AddCategoryModal';
import EditCategoryModal from '@/components/Modals/Categories/EditCategoryModal';
import DeleteCategoryModal from '@/components/Modals/Categories/DeleteCategoryModal';

export default function CategoriesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedAction, setSelectedAction] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/admin/categories');
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            }
        } catch (error) {
            toast.error('Failed to load categories');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddCategory = async (newCategory) => {
        try {
            const response = await fetch('/api/admin/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCategory),
            });

            if (response.ok) {
                const savedCategory = await response.json();
                setCategories(prev => [savedCategory, ...prev]);
                setSelectedAction(null);
                toast.success('Category created successfully!');
            } else {
                toast.error('Failed to create category');
            }
        } catch (error) {
            console.error('Add Category Error:', error);
            toast.error('Error creating category');
        }
    };

    const handleUpdateCategory = async (updatedCategory) => {
        try {
            const response = await fetch('/api/admin/categories', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedCategory),
            });

            if (response.ok) {
                const savedCategory = await response.json();
                setCategories(prev => prev.map(c => c.id === savedCategory.id ? savedCategory : c));
                setSelectedAction(null);
                setSelectedCategory(null);
                toast.success('Category updated successfully!');
            } else {
                toast.error('Failed to update category');
            }
        } catch (error) {
            toast.error('Error updating category');
        }
    };

    const handleDeleteCategory = async (category) => {
        try {
            const response = await fetch(`/api/admin/categories?id=${category.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setCategories(prev => prev.filter(c => c.id !== category.id));
                setSelectedAction(null);
                setSelectedCategory(null);
                toast.success('Category deleted successfully!');
            } else {
                toast.error('Failed to delete category');
            }
        } catch (error) {
            toast.error('Error deleting category');
        }
    };

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cat.description && cat.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (isLoading) {
        return <div className="p-8 text-center text-neutral-500">Loading categories...</div>;
    }

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <span className="font-unbounded font-bold text-xs uppercase tracking-widest text-neutral-400 mb-2 block">
                        Store
                    </span>
                    <h1 className="font-unbounded font-black text-3xl md:text-4xl text-neutral-900 dark:text-neutral-100 leading-tight">
                        Categories
                    </h1>
                </div>
                <button
                    onClick={() => setSelectedAction('add')}
                    className="group flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-unbounded font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform"
                >
                    <TbPlus className="text-lg" />
                    <span>Add Category</span>
                </button>
            </div>

            {/* Toolbar section */}
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-white dark:bg-black rounded-[2rem] border border-neutral-100 dark:border-neutral-800">
                <div className="relative flex-1">
                    <TbSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-lg" />
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none transition-colors"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-5 py-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl font-unbounded text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
                        <TbFilter className="text-lg" />
                        <span>Filter</span>
                    </button>
                </div>
            </div>

            {/* Categories List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {filteredCategories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: index * 0.05 }}
                            className="group p-6 rounded-[2rem] bg-white dark:bg-black border border-neutral-100 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center text-neutral-500 dark:text-neutral-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    <TbCategory className="text-2xl" />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => { setSelectedCategory(category); setSelectedAction('edit'); }}
                                        className="p-2 rounded-xl text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                    >
                                        <TbEdit className="text-lg" />
                                    </button>
                                    <button
                                        onClick={() => { setSelectedCategory(category); setSelectedAction('delete'); }}
                                        className="p-2 rounded-xl text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                    >
                                        <TbTrash className="text-lg" />
                                    </button>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h3 className="font-unbounded font-bold text-lg text-neutral-900 dark:text-white mb-1">
                                    {category.name}
                                </h3>
                                <p className="text-sm text-neutral-500 line-clamp-2 min-h-[40px]">
                                    {category.description || 'No description provided.'}
                                </p>
                            </div>

                            <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between text-xs font-medium text-neutral-500">
                                <span className="flex items-center gap-1">
                                    <TbTag className="text-neutral-400" />
                                    {category.slug}
                                </span>
                                {/* Placeholder for item count since not yet linked to items */}
                                <span className="bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-lg">
                                    0 Items
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {selectedAction === 'add' && (
                <AddCategoryModal
                    isOpen={selectedAction === 'add'}
                    onClose={() => setSelectedAction(null)}
                    onSave={handleAddCategory}
                />
            )}

            {selectedAction === 'edit' && (
                <EditCategoryModal
                    isOpen={selectedAction === 'edit'}
                    onClose={() => { setSelectedAction(null); setSelectedCategory(null); }}
                    category={selectedCategory}
                    onSave={handleUpdateCategory}
                />
            )}

            {selectedAction === 'delete' && (
                <DeleteCategoryModal
                    isOpen={selectedAction === 'delete'}
                    onClose={() => { setSelectedAction(null); setSelectedCategory(null); }}
                    category={selectedCategory}
                    onConfirm={handleDeleteCategory}
                />
            )}
        </div>
    );
}
