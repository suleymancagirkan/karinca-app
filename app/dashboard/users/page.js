'use client';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
    TbSearch,
    TbPlus,
    TbDotsVertical,
    TbTrash,
    TbEdit,
    TbFilter,
    TbUser,
    TbShieldLock
} from 'react-icons/tb';
import { formatDate, UserBadge } from '@/lib/functions';
import EditUserModal from '@/components/Modals/Users/EditUserModal';
import DeleteUserModal from '@/components/Modals/Users/DeleteUserModal';
import AddUserModal from '@/components/Modals/Users/AddUserModal';

export default function UsersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedAction, setSelectedAction] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    // Dummy Data
    // const users = [
    //     { id: 1, name: "Süleyman Çağırkan", username: "cgrkn", email: "suleyman@example.com", role: "Admin", status: "Active", image: "https://minotar.net/avatar/suleymannn", joined: "24 Jan 2024" },
    //     { id: 2, name: "Ahmet Yılmaz", email: "ahmet@example.com", role: "Customer", status: "Active", image: null, joined: "20 Jan 2024" },
    //     { id: 3, name: "Mehmet Demir", email: "mehmet@example.com", role: "User", status: "Inactive", image: null, joined: "15 Jan 2024" },
    //     { id: 4, name: "Ayşe Kaya", email: "ayse@example.com", role: "User", status: "Active", image: null, joined: "10 Jan 2024" },
    //     { id: 5, name: "Fatma Çelik", email: "fatma@example.com", role: "User", status: "Active", image: null, joined: "05 Jan 2024" },
    // ];

    useEffect(() => {
        async function fetchUsers() {
            const response = await fetch('/api/admin/users');
            const data = await response.json();
            setUsers(data);
        }
        fetchUsers();
    }, [])

    const filteredUsers = users.filter(user =>
        user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="space-y-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <span className="font-unbounded font-bold text-xs uppercase tracking-widest text-neutral-400 mb-2 block">
                            Management
                        </span>
                        <h1 className="font-unbounded font-black text-3xl md:text-4xl text-neutral-900 dark:text-neutral-100 leading-tight">
                            Users
                        </h1>
                    </div>
                    <button onClick={() => setSelectedAction('add')} className="group flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-unbounded font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform">
                        <TbPlus className="text-lg" />
                        <span>Add User</span>
                    </button>
                </div>

                {/* Toolbar section */}
                <div className="flex flex-col md:flex-row gap-4 p-4 bg-white dark:bg-black rounded-[2rem] border border-neutral-100 dark:border-neutral-800">
                    <div className="relative flex-1">
                        <TbSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 text-lg" />
                        <input
                            type="text"
                            placeholder="Search users by name or email..."
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

                {/* Users Table / Grid */}
                <div className="bg-white dark:bg-black rounded-[2.5rem] border border-neutral-100 dark:border-neutral-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                                    <th className="p-6 font-unbounded text-xs font-extrabold text-neutral-400 uppercase tracking-wider">User</th>
                                    <th className="p-6 font-unbounded text-xs font-extrabold text-neutral-400 uppercase tracking-wider">Username</th>
                                    <th className="p-6 font-unbounded text-xs font-extrabold text-neutral-400 uppercase tracking-wider">Role</th>
                                    <th className="p-6 font-unbounded text-xs font-extrabold text-neutral-400 uppercase tracking-wider">Status</th>
                                    <th className="p-6 font-unbounded text-xs font-extrabold text-neutral-400 uppercase tracking-wider hidden md:table-cell">Joined</th>
                                    <th className="p-6 font-unbounded text-xs font-extrabold text-neutral-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user, index) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors border-b border-neutral-50 dark:border-neutral-900 last:border-0"
                                    >
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center overflow-hidden shrink-0">
                                                    {user.image ? (
                                                        <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <TbUser className="text-xl text-neutral-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-unbounded font-bold text-sm text-neutral-900 dark:text-white leading-tight">{user?.fullname}</h3>
                                                    <p className="text-xs text-neutral-500 font-sans">{user?.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='p-6'>
                                            <h3 className="font-unbounded font-bold text-sm text-neutral-900 dark:text-white leading-tight">{user.username}</h3>
                                        </td>
                                        <td className="p-6">
                                            <UserBadge role={user?.role} />
                                        </td>
                                        <td className="p-6">
                                            <span className={`inline-flex items-center gap-1.5 text-[10px] font-unbounded font-bold uppercase tracking-wide
                                            ${user ? 'text-green-500' : 'text-red-500'}
                                         `}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${user ? 'bg-green-500' : 'bg-red-500'}`} />
                                                {user ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="p-6 hidden md:table-cell">
                                            <span className="text-xs font-medium text-neutral-500">{formatDate(user?.createdAt)}</span>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => { setSelectedUser(user); setSelectedAction('edit'); }} className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                                    <TbEdit className="text-lg" />
                                                </button>
                                                <button onClick={() => { setSelectedUser(user); setSelectedAction('delete'); }} className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                                    <TbTrash className="text-lg" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredUsers.length === 0 && (
                            <div className="p-12 text-center">
                                <TbSearch className="text-4xl text-neutral-300 dark:text-neutral-700 mx-auto mb-4" />
                                <h3 className="font-unbounded font-bold text-neutral-900 dark:text-white">No Users Found</h3>
                                <p className="text-sm text-neutral-500 mt-1">Try adjusting your search terms.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
            {selectedAction === 'edit' && (
                <EditUserModal
                    isOpen={selectedAction === 'edit'}
                    onClose={() => { setSelectedAction(null); setSelectedUser(null); }}
                    user={selectedUser}
                    onSave={async (updatedUser) => {
                        const updatePromise = (async () => {
                            const response = await fetch('/api/admin/users', {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(updatedUser)
                            });
                            if (!response.ok) throw new Error(await response.text());
                            return response.json();
                        })();

                        toast.promise(updatePromise, {
                            loading: 'Updating user...',
                            success: 'User updated successfully!',
                            error: (err) => err.message || 'Failed to update user',
                        });

                        try {
                            const data = await updatePromise;
                            setUsers(prev => prev.map(u => u.id === data.id ? data : u));
                            setSelectedAction(null);
                            setSelectedUser(null);
                        } catch (error) {
                            console.error(error);
                        }
                    }}
                />
            )}
            {selectedAction === 'delete' && (
                <DeleteUserModal
                    isOpen={selectedAction === 'delete'}
                    onClose={() => { setSelectedAction(null); setSelectedUser(null); }}
                    user={selectedUser}
                    onConfirm={async (user) => {
                        const deletePromise = (async () => {
                            const response = await fetch(`/api/admin/users?id=${user.id}`, {
                                method: 'DELETE',
                            });
                            if (!response.ok) throw new Error(await response.text());
                            return response.json();
                        })();

                        toast.promise(deletePromise, {
                            loading: 'Deleting user...',
                            success: 'User deleted successfully!',
                            error: (err) => err.message || 'Failed to delete user',
                        });

                        try {
                            await deletePromise;
                            setUsers(prev => prev.filter(u => u.id !== user.id));
                            setSelectedAction(null);
                            setSelectedUser(null);
                        } catch (error) {
                            console.error(error);
                        }
                    }}
                />
            )}
            {selectedAction === 'add' && (
                <AddUserModal
                    isOpen={selectedAction === 'add'}
                    onClose={() => setSelectedAction(null)}
                    onSave={async (newUser) => {
                        const createPromise = (async () => {
                            const response = await fetch('/api/admin/users', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(newUser)
                            });
                            if (!response.ok) {
                                const errorText = await response.text();
                                // Remove quotes if it's a simple string response
                                throw new Error(errorText.replace(/"/g, ''));
                            }
                            return response.json();
                        })();

                        toast.promise(createPromise, {
                            loading: 'Creating user...',
                            success: 'User created successfully!',
                            error: (err) => err.message || 'Failed to create user',
                        });

                        try {
                            const data = await createPromise;
                            setUsers(prev => [data, ...prev]);
                            setSelectedAction(null);
                        } catch (error) {
                            console.error(error);
                        }
                    }}
                />
            )}
        </>
    );
}
