
'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TbSearch,
    TbFilter,
    TbReceipt,
    TbEye,
    TbUser,
    TbCalendar,
    TbCurrencyLira
} from 'react-icons/tb';
import toast from 'react-hot-toast';
import OrderDetailsModal from '@/components/Modals/Orders/OrderDetailsModal';

export default function OrdersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('/api/admin/orders');
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            }
        } catch (error) {
            toast.error('Failed to load orders');
        } finally {
            setIsLoading(false);
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.user?.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.user?.email?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'PAID': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'PENDING': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'FAILED': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400';
        }
    };

    if (isLoading) {
        return <div className="p-8 text-center text-neutral-500">Loading orders...</div>;
    }

    return (
        <div className="space-y-8">
            {/* Header Section matching Categories Page Style */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <span className="font-unbounded font-bold text-xs uppercase tracking-widest text-neutral-400 mb-2 block">
                        Store
                    </span>
                    <h1 className="font-unbounded font-black text-3xl md:text-4xl text-neutral-900 dark:text-neutral-100 leading-tight">
                        Orders
                    </h1>
                </div>
                {/* No 'Add Order' button typically needed for orders, but layout preserved for consistency if needed later */}
            </div>

            {/* Toolbar section */}
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-white dark:bg-black rounded-[2rem] border border-neutral-100 dark:border-neutral-800">
                <div className="relative flex-1">
                    <TbSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-lg" />
                    <input
                        type="text"
                        placeholder="Search orders, customers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none transition-colors"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
                    {['ALL', 'PAID', 'PENDING', 'FAILED'].map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-5 py-3 rounded-xl font-unbounded text-xs font-bold whitespace-nowrap transition-colors ${statusFilter === status
                                ? 'bg-neutral-900 text-white dark:bg-white dark:text-black'
                                : 'bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders Grid/List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {filteredOrders.length === 0 ? (
                        <div className="col-span-full p-12 text-center text-neutral-500 font-unbounded text-sm">
                            No orders found matching your criteria.
                        </div>
                    ) : (
                        filteredOrders.map((order, index) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.05 }}
                                className="group p-6 rounded-[2rem] bg-white dark:bg-black border border-neutral-100 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all flex flex-col cursor-pointer"
                                onClick={() => setSelectedOrder(order)}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center text-neutral-500 dark:text-neutral-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        <TbReceipt className="text-2xl" />
                                    </div>
                                    <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-unbounded tracking-wide ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h3 className="font-unbounded font-bold text-lg text-neutral-900 dark:text-white mb-1 truncate">
                                        {order.tierName || 'Unknown Item'}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                                        <div className="w-5 h-5 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[10px] font-bold">
                                            {order.user?.fullname?.[0] || '?'}
                                        </div>
                                        <span className="truncate">{order.user?.fullname || 'Guest'}</span>
                                    </div>
                                </div>

                                <div className="mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between">
                                    <span className="font-unbounded font-bold text-lg text-neutral-900 dark:text-white">
                                        ₺{order.price?.toFixed(2)}
                                    </span>
                                    <span className="text-xs font-medium text-neutral-400 flex items-center gap-1">
                                        <TbCalendar className="text-sm" />
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {/* Modal */}
            <OrderDetailsModal
                isOpen={!!selectedOrder}
                onClose={() => setSelectedOrder(null)}
                order={selectedOrder}
            />
        </div>
    );
}
