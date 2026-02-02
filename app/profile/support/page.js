
'use client';
/**
 * @page SupportPage
 * @description Simplified Support Dashboard.
 * Features quick actions for Live Chat/New Ticket and a list of the user's recent support tickets.
 */

import React, { useState, useEffect } from 'react';
import {
    TbMessageCircle,
    TbTicket,
    TbSearch,
    TbLoader,
    TbClock,
    TbCheck,
    TbInfoCircle,
    TbChevronRight
} from 'react-icons/tb';
import TicketModal from '@/components/Modals/Support/TicketModal';
import Link from 'next/link';

export default function SupportPage() {
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, open, closed
    const [searchQuery, setSearchQuery] = useState('');

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/v1/support/tickets');
            const data = await res.json();
            if (res.ok) {
                setTickets(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'open': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
            case 'closed': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'in_progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            default: return 'bg-neutral-100 text-neutral-600';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'open': return <TbClock size={16} />;
            case 'closed': return <TbCheck size={16} />;
            default: return <TbInfoCircle size={16} />;
        }
    };

    const filteredTickets = tickets.filter(ticket => {
        if (filter !== 'all' && ticket.status !== filter) return false;
        if (searchQuery && !ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) && !ticket.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="w-full max-w-5xl mx-auto py-8">

            {/* Header */}
            <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <span className="font-unbounded font-bold text-xs uppercase tracking-widest text-neutral-400 mb-2 block">
                        Support Center
                    </span>
                    <h1 className="font-unbounded font-black text-3xl md:text-5xl text-neutral-900 dark:text-white leading-tight">
                        SUPPORT <span className="text-neutral-300 dark:text-neutral-700">HUB</span>
                    </h1>
                </div>

                {/* Search */}
                <div className="relative w-full md:w-64">
                    <TbSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Search tickets..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-neutral-100 dark:bg-neutral-900 rounded-lg text-sm outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                    />
                </div>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">

                {/* Live Chat */}
                <div className="p-8 rounded-3xl bg-blue-600 text-white flex items-center justify-between group cursor-pointer hover:shadow-xl hover:shadow-blue-600/20 transition-all">
                    <div className="flex flex-col gap-2">
                        <TbMessageCircle size={32} />
                        <div>
                            <h3 className="font-unbounded font-bold text-xl">Live Chat (SOON)</h3>
                            <p className="opacity-80 text-sm">Talk to an agent now</p>
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-colors">
                        <TbChevronRight size={20} />
                    </div>
                </div>

                {/* Create Ticket */}
                <button
                    onClick={() => setIsTicketModalOpen(true)}
                    className="p-8 rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-transparent hover:border-black dark:hover:border-white transition-all text-left flex items-center justify-between group"
                >
                    <div className="flex flex-col gap-2">
                        <TbTicket size={32} className="text-neutral-900 dark:text-white" />
                        <div>
                            <h3 className="font-unbounded font-bold text-xl text-neutral-900 dark:text-white">Create Ticket</h3>
                            <p className="text-neutral-500 text-sm">Submit a detailed request</p>
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <TbChevronRight size={20} className="text-neutral-900 dark:text-white" />
                    </div>
                </button>

            </div>

            {/* My Tickets List */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-unbounded font-bold text-xl text-neutral-900 dark:text-white">My Tickets</h2>
                    <div className="flex bg-neutral-100 dark:bg-neutral-900 rounded-lg p-1">
                        {['all', 'open', 'closed'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-1.5 rounded-md text-xs font-bold capitalize transition-all ${filter === f ? 'bg-white dark:bg-neutral-800 shadow-sm text-black dark:text-white' : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden min-h-[300px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-neutral-400 gap-4">
                            <TbLoader size={32} className="animate-spin" />
                            <p className="font-medium text-sm">Loading tickets...</p>
                        </div>
                    ) : filteredTickets.length > 0 ? (
                        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {filteredTickets.map((ticket) => (
                                <Link href={`/profile/support/${ticket.id}`} key={ticket.id}>
                                    <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer group">
                                        <div className="flex items-start gap-4">
                                            <div className={`mt-1 p-2 rounded-lg ${getStatusColor(ticket.status)}`}>
                                                {getStatusIcon(ticket.status)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-neutral-900 dark:text-white text-sm mb-1 group-hover:text-blue-600 transition-colors">
                                                    {ticket.subject}
                                                </h4>
                                                <div className="flex items-center gap-3 text-xs text-neutral-500">
                                                    <span className="font-mono">{ticket.id.slice(-8).toUpperCase()}</span>
                                                    <span>•</span>
                                                    <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                                                    {ticket.category && (
                                                        <>
                                                            <span>•</span>
                                                            <span className="bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded text-neutral-600 dark:text-neutral-400 font-medium">
                                                                {ticket.category.name}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 pl-14 md:pl-0">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${ticket.priority === 'high' ? 'border-red-200 text-red-600 bg-red-50 dark:bg-red-900/10 dark:border-red-900' :
                                                ticket.priority === 'medium' ? 'border-orange-200 text-orange-600 bg-orange-50 dark:bg-orange-900/10 dark:border-orange-900' :
                                                    'border-green-200 text-green-600 bg-green-50 dark:bg-green-900/10 dark:border-green-900'
                                                }`}>
                                                {ticket.priority}
                                            </span>
                                            <TbChevronRight className="text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center text-neutral-500 flex flex-col items-center justify-center h-full min-h-[300px]">
                            <TbTicket size={32} className="mb-3 opacity-20" />
                            <p>No tickets found.</p>
                            {filter !== 'all' && (
                                <button onClick={() => setFilter('all')} className="text-xs text-blue-600 hover:underline mt-2">Clear filters</button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <TicketModal
                isOpen={isTicketModalOpen}
                onClose={() => setIsTicketModalOpen(false)}
                onSuccess={fetchTickets}
            />
        </div>
    );
}
