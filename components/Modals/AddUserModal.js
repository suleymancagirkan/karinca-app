import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbX, TbUser, TbMail, TbId, TbLock, TbCheck } from 'react-icons/tb';

export default function AddUserModal({ isOpen, onClose, onSave }) {
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        role: 'user',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-white dark:bg-black rounded-[2rem] border border-neutral-100 dark:border-neutral-800 shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-neutral-100 dark:border-neutral-800">
                            <div>
                                <h2 className="font-unbounded font-bold text-xl text-neutral-900 dark:text-white">Add New User</h2>
                                <p className="text-xs text-neutral-500 mt-1 font-medium">Create a new account with permissions</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
                            >
                                <TbX className="text-xl" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Full Name</label>
                                <div className="relative group">
                                    <TbUser className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors text-lg" />
                                    <input
                                        type="text"
                                        name="fullname"
                                        value={formData.fullname}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        required
                                        className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium focus:outline-none transition-all text-neutral-900 dark:text-white placeholder:text-neutral-400"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Username */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Username</label>
                                    <div className="relative group">
                                        <TbId className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors text-lg" />
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            placeholder="johndoe"
                                            required
                                            className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium focus:outline-none transition-all text-neutral-900 dark:text-white placeholder:text-neutral-400"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Email</label>
                                    <div className="relative group">
                                        <TbMail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors text-lg" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            required
                                            className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium focus:outline-none transition-all text-neutral-900 dark:text-white placeholder:text-neutral-400"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Password</label>
                                <div className="relative group">
                                    <TbLock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors text-lg" />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                        minLength={6}
                                        className="w-full bg-neutral-50 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium focus:outline-none transition-all text-neutral-900 dark:text-white placeholder:text-neutral-400"
                                    />
                                </div>
                            </div>

                            {/* Role Selection */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Role</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['user', 'admin', 'customer'].map((role) => (
                                        <div
                                            key={role}
                                            onClick={() => setFormData(prev => ({ ...prev, role }))}
                                            className={`
                                                cursor-pointer relative overflow-hidden rounded-xl border-2 p-3 transition-all duration-200
                                                ${formData.role === role
                                                    ? 'border-black dark:border-white bg-neutral-50 dark:bg-neutral-900'
                                                    : 'border-transparent bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                                                }
                                            `}
                                        >
                                            <div className="flex flex-col items-center gap-1">
                                                <span className={`text-xs font-bold font-unbounded uppercase ${formData.role === role ? 'text-black dark:text-white' : 'text-neutral-500'}`}>
                                                    {role}
                                                </span>
                                            </div>
                                            {formData.role === role && (
                                                <div className="absolute top-1 right-1">
                                                    <TbCheck className="text-black dark:text-white text-xs" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-3 rounded-xl text-xs font-bold font-unbounded text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-3 rounded-xl text-xs font-bold font-unbounded bg-black dark:bg-white text-white dark:text-black hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/20 dark:shadow-white/20"
                                >
                                    Create User
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
