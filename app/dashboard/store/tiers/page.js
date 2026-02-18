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
    TbCurrencyLira,
    TbCheck,
    TbX,
    TbTemplate,
    TbEye
} from 'react-icons/tb';
import toast from 'react-hot-toast';
import EditTierModal from '@/components/Modals/Tiers/EditTierModal';
import DeleteTierModal from '@/components/Modals/Tiers/DeleteTierModal';
import AddTierModal from '@/components/Modals/Tiers/AddTierModal';

export default function TiersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [tiers, setTiers] = useState([]);
    const [selectedAction, setSelectedAction] = useState(null);
    const [selectedTier, setSelectedTier] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Tiers
                const tiersRes = await fetch('/api/admin/tiers');
                if (tiersRes.ok) {
                    const tiersData = await tiersRes.json();
                    setTiers(tiersData);
                } else {
                    console.error('Failed to fetch tiers');
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

    const handleAddTier = async (newTier) => {
        try {
            const response = await fetch('/api/admin/tiers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTier),
            });

            if (response.ok) {
                const savedTier = await response.json();
                setTiers(prev => [savedTier, ...prev]);
                setSelectedAction(null);
                toast.success('Tier created successfully!');
            } else {
                toast.error('Failed to create tier');
            }
        } catch (error) {
            console.error('Add Tier Error:', error);
            toast.error('Error creating tier');
        }
    };

    const handleUpdateTier = async (updatedTier) => {
        try {
            const response = await fetch('/api/admin/tiers', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTier),
            });

            if (response.ok) {
                const savedTier = await response.json();
                setTiers(prev => prev.map(t => t.id === savedTier.id ? savedTier : t));
                setSelectedAction(null);
                setSelectedTier(null);
                toast.success('Tier updated successfully!');
            } else {
                toast.error('Failed to update tier');
            }
        } catch (error) {
            console.error('Update Tier Error:', error);
            toast.error('Error updating tier');
        }
    };

    const handleDeleteTier = async (tier) => {
        try {
            const response = await fetch(`/api/admin/tiers?id=${tier.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setTiers(prev => prev.filter(t => t.id !== tier.id));
                setSelectedAction(null);
                setSelectedTier(null);
                toast.success('Tier deleted successfully!');
            } else {
                toast.error('Failed to delete tier');
            }
        } catch (error) {
            console.error('Delete Tier Error:', error);
            toast.error('Error deleting tier');
        }
    };

    const filteredTiers = tiers.filter(tier =>
        tier.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return <div className="p-8 text-center text-neutral-500">Loading tiers...</div>;
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
                        Tiers
                    </h1>
                </div>
                <button onClick={() => setSelectedAction('add')} className="group flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-unbounded font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform">
                    <TbPlus className="text-lg" />
                    <span>Add Tier</span>
                </button>
            </div>

            {/* Toolbar section */}
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-white dark:bg-black rounded-[2rem] border border-neutral-100 dark:border-neutral-800">
                <div className="relative flex-1">
                    <TbSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-lg" />
                    <input
                        type="text"
                        placeholder="Search tiers by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none transition-colors"
                    />
                </div>
            </div>

            {/* Tiers Grid/Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                    {filteredTiers.map((tier, index) => (
                        <motion.div
                            key={tier.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative p-6 rounded-[2rem] bg-white dark:bg-black border border-neutral-100 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all flex flex-col"
                        >
                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="font-unbounded font-bold text-xl text-neutral-900 dark:text-white leading-tight">
                                        {tier.name}
                                    </h3>
                                </div>
                            </div>

                            <p className="text-xs text-neutral-500 mb-4 line-clamp-2 min-h-[32px]">
                                {tier.description || 'No description provided.'}
                            </p>

                            {/* Price */}
                            <div className="mb-6">
                                <div className="flex items-end gap-1 mb-1">
                                    <span className="font-unbounded font-black text-3xl text-neutral-900 dark:text-white">
                                        ₺{tier.priceMonthly}
                                    </span>
                                    <span className="font-unbounded text-xs text-neutral-500 dark:text-neutral-400 mb-1.5">/mo</span>
                                </div>
                                <div className="text-xs text-neutral-400 font-medium">
                                    ₺{tier.priceYearly} / yr
                                </div>
                                {tier.priceLifetime && (
                                    <div className="text-xs text-neutral-400 font-medium">
                                        ₺{tier.priceLifetime} / life
                                    </div>
                                )}
                            </div>

                            {/* Features Preview */}
                            <div className="flex-1 space-y-3 mb-8">
                                {tier.features.slice(0, 3).map((feature, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                                        <TbCheck className="text-blue-500" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                                {tier.features.length > 3 && (
                                    <div className="text-xs text-neutral-400 pl-6 italic">
                                        +{tier.features.length - 3} more features
                                    </div>
                                )}
                            </div>

                            {/* Actions Overlay / Bottom */}
                            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex gap-2">
                                <button
                                    onClick={() => { setSelectedTier(tier); setSelectedAction('edit'); }}
                                    className="flex-1 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white font-unbounded text-xs font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                                >
                                    <TbEdit /> Edit
                                </button>
                                <button
                                    onClick={() => { setSelectedTier(tier); setSelectedAction('delete'); }}
                                    className="p-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                                >
                                    <TbTrash />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {selectedAction === 'edit' && (
                <EditTierModal
                    isOpen={selectedAction === 'edit'}
                    onClose={() => { setSelectedAction(null); setSelectedTier(null); }}
                    tier={selectedTier}
                    onSave={handleUpdateTier}
                />
            )}

            {selectedAction === 'delete' && (
                <DeleteTierModal
                    isOpen={selectedAction === 'delete'}
                    onClose={() => { setSelectedAction(null); setSelectedTier(null); }}
                    tier={selectedTier}
                    onConfirm={handleDeleteTier}
                />
            )}

            {selectedAction === 'add' && (
                <AddTierModal
                    isOpen={selectedAction === 'add'}
                    onClose={() => setSelectedAction(null)}
                    onSave={handleAddTier}
                />
            )}
        </div>
    );
}
