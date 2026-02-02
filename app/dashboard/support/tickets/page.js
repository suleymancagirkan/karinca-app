
'use client';
import React, { useState, useEffect } from 'react';
import {
    TbSearch,
    TbFilter,
    TbCheck,
    TbX,
    TbLoader,
    TbExternalLink,
    TbTrash,
    TbEye
} from 'react-icons/tb';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminTicketsPage() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/support/tickets');
            const data = await res.json();
            if (res.ok) {
                setTickets(data);
            } else {
                toast.error('Failed to load tickets');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error loading tickets');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this ticket?')) return;

        try {
            const res = await fetch(`/api/admin/support/tickets/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                toast.success('Ticket deleted');
                setTickets(prev => prev.filter(t => t.id !== id));
            } else {
                toast.error('Failed to delete ticket');
            }
        } catch (error) {
            toast.error('Error deleting ticket');
        }
    };

    const filteredTickets = tickets.filter(ticket => {
        const matchesSearch =
            ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
            ticket.user?.fullname?.toLowerCase().includes(search.toLowerCase()) ||
            ticket.id.toLowerCase().includes(search.toLowerCase());

        const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    const getPriorityColor = (p) => {
        switch (p) {
            case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
            case 'medium': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800';
            case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
            default: return 'bg-neutral-100 text-neutral-600';
        }
    };

    const getStatusBadge = (s) => {
        switch (s) {
            case 'open': return <span className="px-2 py-1 rounded text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Open</span>;
            case 'closed': return <span className="px-2 py-1 rounded text-xs font-bold bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">Closed</span>;
            case 'in_progress': return <span className="px-2 py-1 rounded text-xs font-bold bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">In Progress</span>;
            default: return null;
        }
    }

    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black font-unbounded text-black dark:text-white mb-2">
                        Support Tickets
                    </h1>
                    <p className="text-neutral-500 font-medium">Manage and respond to user inquiries</p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-2 flex items-center gap-2 shadow-sm">
                        <span className="text-sm font-bold text-neutral-500">Total:</span>
                        <span className="text-sm font-black text-black dark:text-white">{tickets.length}</span>
                    </div>
                    {/* Refresh Button */}
                    <button
                        onClick={fetchTickets}
                        className="bg-black dark:bg-white text-white dark:text-black rounded-xl px-4 py-2 text-sm font-bold hover:opacity-80 transition-opacity"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <TbSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search tickets by ID, subject, or user..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                    />
                </div>

                <div className="flex items-center bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-xl p-1">
                    {['all', 'open', 'in_progress', 'closed'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${filterStatus === status
                                ? 'bg-black dark:bg-white text-white dark:text-black shadow-sm'
                                : 'text-neutral-500 hover:text-black dark:hover:text-white'
                                }`}
                        >
                            {status.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-[#111] rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm min-h-[400px]">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <TbLoader className="animate-spin text-neutral-400" size={32} />
                        <p className="font-bold text-sm text-neutral-400">Loading tickets...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-neutral-50 dark:bg-[#0A0A0A] border-b border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                                    <th className="px-6 py-4">Ticket ID</th>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Subject</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Priority</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-900">
                                {filteredTickets.map((ticket) => (
                                    <tr key={ticket.id} className="group hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                                        <td className="px-6 py-4 text-xs font-mono text-neutral-500">
                                            {ticket.id.slice(-8).toUpperCase()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xs font-bold uppercase">
                                                    {ticket.user?.fullname ? ticket.user.fullname[0] : '?'}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-neutral-900 dark:text-white leading-none mb-1">
                                                        {ticket.user?.fullname || 'Unknown User'}
                                                    </p>
                                                    <p className="text-xs text-neutral-500">{ticket.user?.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-neutral-900 dark:text-white truncate max-w-[200px]">
                                                {ticket.subject}
                                            </p>
                                            {ticket.category && (
                                                <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded mt-1 inline-block">
                                                    {ticket.category.name}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(ticket.status)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${getPriorityColor(ticket.priority)}`}>
                                                {ticket.priority}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-neutral-500 whitespace-nowrap">
                                            {new Date(ticket.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/dashboard/support/tickets/${ticket.id}`}
                                                    className="p-2 text-neutral-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <TbEye size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(ticket.id)}
                                                    className="p-2 text-neutral-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                    title="Delete Ticket"
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
                )}

                {!loading && filteredTickets.length === 0 && (
                    <div className="p-12 text-center text-neutral-500">
                        <TbCheck size={32} className="mx-auto mb-3 opacity-20" />
                        <p>No tickets found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
