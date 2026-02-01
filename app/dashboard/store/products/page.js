'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    TbSearch,
    TbPlus,
    TbDotsVertical,
    TbTrash,
    TbEdit,
    TbFilter,
    TbPackage,
    TbCurrencyLira,
    TbTag
} from 'react-icons/tb';

// Placeholder for future functions import
// import { formatPrice } from '@/lib/functions'; 

export default function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([
        { id: 1, name: "Premium Leather Wallet", category: "Accessories", price: 499.99, stock: 120, status: "Active", image: "https://images.unsplash.com/photo-1627123424574-181ce5171c98?q=80&w=1000&auto=format&fit=crop" },
        { id: 2, name: "Wireless Noise-Canceling Headphones", category: "Electronics", price: 2499.00, stock: 45, status: "Active", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop" },
        { id: 3, name: "Minimalist Desk Lamp", category: "Home & Office", price: 850.00, stock: 0, status: "Out of Stock", image: "https://images.unsplash.com/photo-1507473888900-52e1adad54cd?q=80&w=1000&auto=format&fit=crop" },
        { id: 4, name: "Organic Cotton T-Shirt", category: "Clothing", price: 299.90, stock: 500, status: "Active", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop" },
        { id: 5, name: "Ceramic Coffee Mug Set", category: "Kitchen", price: 349.50, stock: 85, status: "Draft", image: "https://images.unsplash.com/photo-1514228742587-6b1557360500?q=80&w=1000&auto=format&fit=crop" },
    ]);
    const [selectedAction, setSelectedAction] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
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
                        Products
                    </h1>
                </div>
                <button className="group flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-unbounded font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform">
                    <TbPlus className="text-lg" />
                    <span>Add Product</span>
                </button>
            </div>

            {/* Toolbar section */}
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-white dark:bg-black rounded-[2rem] border border-neutral-100 dark:border-neutral-800">
                <div className="relative flex-1">
                    <TbSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-lg" />
                    <input
                        type="text"
                        placeholder="Search products by name or category..."
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

            {/* Products Table / Grid */}
            <div className="bg-white dark:bg-black rounded-[2.5rem] border border-neutral-100 dark:border-neutral-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-neutral-100 dark:border-neutral-800">
                                <th className="p-6 font-unbounded text-xs font-extrabold text-neutral-400 uppercase tracking-wider">Product</th>
                                <th className="p-6 font-unbounded text-xs font-extrabold text-neutral-400 uppercase tracking-wider">Category</th>
                                <th className="p-6 font-unbounded text-xs font-extrabold text-neutral-400 uppercase tracking-wider">Price</th>
                                <th className="p-6 font-unbounded text-xs font-extrabold text-neutral-400 uppercase tracking-wider">Stock</th>
                                <th className="p-6 font-unbounded text-xs font-extrabold text-neutral-400 uppercase tracking-wider">Status</th>
                                <th className="p-6 font-unbounded text-xs font-extrabold text-neutral-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product, index) => (
                                <motion.tr
                                    key={product.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors border-b border-neutral-50 dark:border-neutral-900 last:border-0"
                                >
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center overflow-hidden shrink-0 border border-neutral-200 dark:border-neutral-800">
                                                {product.image ? (
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <TbPackage className="text-2xl text-neutral-400" />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-unbounded font-bold text-sm text-neutral-900 dark:text-white leading-tight mb-1">{product.name}</h3>
                                                <span className="text-[10px] font-mono text-neutral-400">ID: #{product.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                                                <TbTag className="text-xs" />
                                            </div>
                                            <span className="font-medium text-sm text-neutral-600 dark:text-neutral-300">{product.category}</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className="font-unbounded font-bold text-sm text-neutral-900 dark:text-white">
                                            ₺{product.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <span className={`text-xs font-bold font-unbounded ${product.stock > 0 ? 'text-neutral-600 dark:text-neutral-300' : 'text-red-500'}`}>
                                            {product.stock} units
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-unbounded font-bold uppercase tracking-wide
                                            ${product.status === 'Active' ? 'text-green-600 dark:text-green-400' :
                                                product.status === 'Draft' ? 'text-neutral-500' :
                                                    'text-red-500'}
                                         `}>
                                            <span className={`w-1.5 h-1.5 rounded-full 
                                                ${product.status === 'Active' ? 'bg-green-500' :
                                                    product.status === 'Draft' ? 'bg-neutral-400' :
                                                        'bg-red-500'}
                                            `} />
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => { setSelectedProduct(product); setSelectedAction('edit'); }} className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                                <TbEdit className="text-lg" />
                                            </button>
                                            <button onClick={() => { setSelectedProduct(product); setSelectedAction('delete'); }} className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                                <TbTrash className="text-lg" />
                                            </button>
                                            <button className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 rounded-lg transition-colors">
                                                <TbDotsVertical className="text-lg" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredProducts.length === 0 && (
                        <div className="p-12 text-center">
                            <TbPackage className="text-4xl text-neutral-300 dark:text-neutral-700 mx-auto mb-4" />
                            <h3 className="font-unbounded font-bold text-neutral-900 dark:text-white">No Products Found</h3>
                            <p className="text-sm text-neutral-500 mt-1">Try adjusting your search terms or add a new product.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* 
                TODO: Add Modals
                - AddProductModal
                - EditProductModal
                - DeleteProductModal
            */}
        </div>
    );
}
