'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TbSearch,
    TbPlus,
    TbDotsVertical,
    TbTrash,
    TbEdit,
    TbFilter,
    TbTemplate,
    TbEye,
    TbCheck,
    TbX,
    TbLink
} from 'react-icons/tb';
import { toast } from 'react-hot-toast';
import AddThemeModal from '@/components/Modals/Themes/AddThemeModal';
import EditThemeModal from '@/components/Modals/Themes/EditThemeModal';
import DeleteThemeModal from '@/components/Modals/Themes/DeleteThemeModal';

export default function ThemesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [themes, setThemes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAction, setSelectedAction] = useState(null);
    const [selectedTheme, setSelectedTheme] = useState(null);

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Categories
                const categoriesRes = await fetch('/api/admin/categories');
                if (categoriesRes.ok) {
                    const categoriesData = await categoriesRes.json();
                    setCategories(categoriesData);
                } else {
                    console.error('Failed to fetch categories');
                }

                // Fetch Themes
                const themesRes = await fetch('/api/admin/themes');
                if (themesRes.ok) {
                    const themesData = await themesRes.json();
                    setThemes(themesData);
                } else {
                    console.error('Failed to fetch themes');
                }
            } catch (error) {
                console.error('Fetch Data Error:', error);
                toast.error('Failed to load data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Handlers
    const handleAddTheme = async (formData) => {
        try {
            const response = await fetch('/api/admin/themes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const newTheme = await response.json();
                setThemes(prev => [newTheme, ...prev]);
                setSelectedAction(null);
                toast.success('Theme created successfully');
            } else {
                const error = await response.text();
                toast.error(error);
            }
        } catch (error) {
            console.error('Create Theme Error:', error);
            toast.error('Failed to create theme');
        }
    };

    const handleUpdateTheme = async (formData) => {
        try {
            const response = await fetch('/api/admin/themes', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const updatedTheme = await response.json();
                setThemes(prev => prev.map(t => t.id === updatedTheme.id ? updatedTheme : t));
                setSelectedAction(null);
                setSelectedTheme(null);
                toast.success('Theme updated successfully');
            } else {
                const error = await response.text();
                toast.error(error);
            }
        } catch (error) {
            console.error('Update Theme Error:', error);
            toast.error('Failed to update theme');
        }
    };

    const handleDeleteTheme = async (theme) => {
        try {
            const response = await fetch(`/api/admin/themes?id=${theme.id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setThemes(prev => prev.filter(t => t.id !== theme.id));
                setSelectedAction(null);
                setSelectedTheme(null);
                toast.success('Theme deleted successfully');
            } else {
                const error = await response.text();
                toast.error(error);
            }
        } catch (error) {
            console.error('Delete Theme Error:', error);
            toast.error('Failed to delete theme');
        }
    };

    const filteredThemes = themes.filter(theme =>
        theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (theme.category?.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <span className="font-unbounded font-bold text-xs uppercase tracking-widest text-neutral-400 mb-2 block">
                        Store
                    </span>
                    <h1 className="font-unbounded font-black text-3xl md:text-4xl text-neutral-900 dark:text-neutral-100 leading-tight">
                        Themes
                    </h1>
                </div>
                <button onClick={() => setSelectedAction('add')} className="group flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-unbounded font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform">
                    <TbPlus className="text-lg" />
                    <span>Add Theme</span>
                </button>
            </div>

            {/* Toolbar section */}
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-white dark:bg-black rounded-[2rem] border border-neutral-100 dark:border-neutral-800">
                <div className="relative flex-1">
                    <TbSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-lg" />
                    <input
                        type="text"
                        placeholder="Search themes by name or category..."
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

            {/* Themes Grid/Cards */}
            {isLoading ? (
                <div className="text-center py-20 text-neutral-500">Loading themes...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredThemes.map((theme, index) => (
                            <motion.div
                                key={theme.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.05 }}
                                className="group relative bg-white dark:bg-black rounded-[2rem] border border-neutral-100 dark:border-neutral-800 overflow-hidden hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                            >
                                {/* Preview Area (Mockup) */}
                                <div className="aspect-[16/9] bg-neutral-100 dark:bg-neutral-900 w-full relative group-hover:bg-neutral-50 dark:group-hover:bg-neutral-800 transition-colors flex items-center justify-center">
                                    {/* Placeholder Content */}
                                    <div className="text-neutral-300 dark:text-neutral-700 flex flex-col items-center gap-2">
                                        <TbTemplate className="text-4xl opacity-50" />
                                        <span className="text-[10px] font-unbounded tracking-widest uppercase opacity-70">Preview</span>
                                    </div>

                                    {/* URL Badge if exists */}
                                    {theme.url && (
                                        <div className="absolute top-4 right-4">
                                            <a
                                                href={theme.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-unbounded font-bold uppercase tracking-wide bg-white dark:bg-black shadow-sm text-blue-500 hover:text-blue-600"
                                            >
                                                <TbLink /> Demo
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Info Area */}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <span className="text-blue-600 dark:text-blue-400 text-xs font-bold font-unbounded uppercase mb-1 block">
                                                {theme.category?.name || 'Uncategorized'}
                                            </span>
                                            <h3 className="font-unbounded font-bold text-xl text-neutral-900 dark:text-white leading-tight">
                                                {theme.name}
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6 line-clamp-2 h-10">
                                        {theme.description || 'No description provided.'}
                                    </p>

                                    {/* Actions */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => { setSelectedTheme(theme); setSelectedAction('edit'); }}
                                            className="py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-unbounded text-xs font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <TbEdit /> Customize
                                        </button>
                                        <button
                                            onClick={() => { setSelectedTheme(theme); setSelectedAction('delete'); }}
                                            className="py-3 rounded-xl bg-white dark:bg-black border border-neutral-100 dark:border-neutral-800 text-red-500 font-unbounded text-xs font-bold hover:bg-red-50 dark:hover:bg-red-900/10 hover:border-red-200 dark:hover:border-red-900/30 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <TbTrash /> Delete
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {
                selectedAction === 'add' && (
                    <AddThemeModal
                        isOpen={selectedAction === 'add'}
                        onClose={() => setSelectedAction(null)}
                        onSave={handleAddTheme}
                        categories={categories}
                    />
                )
            }

            {
                selectedAction === 'edit' && (
                    <EditThemeModal
                        isOpen={selectedAction === 'edit'}
                        onClose={() => { setSelectedAction(null); setSelectedTheme(null); }}
                        theme={selectedTheme}
                        onSave={handleUpdateTheme}
                        categories={categories}
                    />
                )
            }

            {
                selectedAction === 'delete' && (
                    <DeleteThemeModal
                        isOpen={selectedAction === 'delete'}
                        onClose={() => { setSelectedAction(null); setSelectedTheme(null); }}
                        theme={selectedTheme}
                        onConfirm={handleDeleteTheme}
                    />
                )
            }
        </div >
    );
}
