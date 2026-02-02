
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    TbArrowLeft,
    TbSend,
    TbPaperclip,
    TbCheck,
    TbClock,
    TbDotsVertical,
    TbUser,
    TbHeadset,
    TbLoader,
    TbTrash
} from 'react-icons/tb';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

export default function AdminTicketDetail() {
    const params = useParams();
    const router = useRouter();
    const { data: session } = useSession();

    // Unwrapping params for Next.js 15+ compatibility if needed, though simpler params.id usually works in client components
    // But let's assume standard behavior. 
    const ticketId = params.id;

    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState('');
    const [sending, setSending] = useState(false);

    const fetchTicket = async () => {
        try {
            const res = await fetch(`/api/admin/support/tickets/${ticketId}`);
            const data = await res.json();
            if (res.ok) {
                setTicket(prev => {
                    if (JSON.stringify(prev) === JSON.stringify(data)) return prev;
                    return data;
                });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!ticketId) return;

        fetchTicket();

        const interval = setInterval(() => {
            fetchTicket();
        }, 3000);

        return () => clearInterval(interval);
    }, [ticketId]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            setSending(true);
            const res = await fetch(`/api/admin/support/tickets/${ticketId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: newMessage })
            });
            const data = await res.json();

            if (res.ok) {
                setTicket(prev => ({
                    ...prev,
                    messages: [...prev.messages, data],
                    status: prev.status === 'open' ? 'in_progress' : prev.status
                }));
                setNewMessage('');
            } else {
                toast.error('Failed to send message');
            }
        } catch (error) {
            toast.error('Error sending message');
        } finally {
            setSending(false);
        }
    };

    const handleUpdateStatus = async (status) => {
        try {
            const res = await fetch(`/api/admin/support/tickets/${ticketId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });

            if (res.ok) {
                setTicket(prev => ({ ...prev, status }));
                toast.success(`Ticket marked as ${status.replace('_', ' ')}`);
            } else {
                toast.error('Failed to update status');
            }
        } catch (error) {
            toast.error('Error updating status');
        }
    };

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <TbLoader className="animate-spin text-neutral-400" size={32} />
            </div>
        );
    }

    if (!ticket) return <div className="p-8 text-center">Ticket not found</div>;

    return (
        <div className="flex flex-col h-[calc(100vh-100px)] max-w-5xl mx-auto md:px-6 md:py-8">

            {/* Header / Top Bar */}
            <div className="flex-none bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-t-2xl md:rounded-2xl md:mb-6 shadow-sm z-10">
                <div className="flex items-center justify-between mb-4">
                    <Link
                        href="/dashboard/support/tickets"
                        className="flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
                    >
                        <TbArrowLeft /> Back to List
                    </Link>
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs font-mono text-neutral-500">
                            #{ticket.id.slice(-8).toUpperCase()}
                        </span>
                        <div className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1 
                            ${ticket.status === 'open' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                ticket.status === 'closed' ? 'bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400' :
                                    'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'}`}>
                            {ticket.status === 'closed' ? <TbCheck size={14} /> : <TbClock size={14} />}
                            {ticket.status.replace('_', ' ')}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="font-unbounded font-black text-xl md:text-2xl text-neutral-900 dark:text-white mb-2 leading-tight">
                            {ticket.subject}
                        </h1>
                        <div className="flex items-center gap-2 text-xs text-neutral-500">
                            <span>User: <strong className="text-neutral-900 dark:text-white">{ticket.user?.fullname}</strong> ({ticket.user?.email})</span>
                            <span>•</span>
                            <span>Created on {new Date(ticket.createdAt).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>Priority: <span className={`font-bold capitalize ${ticket.priority === 'high' ? 'text-red-500' : 'text-orange-500'}`}>{ticket.priority}</span></span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {ticket.status !== 'closed' && (
                            <button
                                onClick={() => handleUpdateStatus('closed')}
                                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-bold rounded-lg transition-colors flex items-center gap-2"
                            >
                                <TbCheck size={16} /> Close Ticket
                            </button>
                        )}
                        {ticket.status === 'closed' && (
                            <button
                                onClick={() => handleUpdateStatus('open')}
                                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-bold rounded-lg transition-colors"
                            >
                                Reopen
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-neutral-50 dark:bg-[#0A0A0A] md:rounded-2xl border-x md:border border-neutral-200 dark:border-neutral-800 overflow-hidden flex flex-col relative">

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col">
                    {ticket.messages.map((msg) => {
                        const isMe = msg.senderId === session?.user?.id; // Current admin
                        // Alternatively, check role: const isStaff = msg.sender?.role === 'admin';
                        // But sticking to "Me" on the right is standard. 

                        return (
                            <div key={msg.id} className={`flex gap-4 ${isMe ? 'justify-end' : 'justify-start'}`}>

                                {/* Avatar for Other (User or other Admin) */}
                                {!isMe && (
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 
                                        ${msg.sender?.role === 'admin' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' : 'bg-neutral-200 text-neutral-500 dark:bg-neutral-800'}`}>
                                        {msg.sender?.role === 'admin' ? <TbHeadset size={16} /> : <TbUser size={16} />}
                                    </div>
                                )}

                                <div className={`max-w-[80%] md:max-w-[70%] space-y-1 ${isMe ? 'items-end flex flex-col' : 'items-start'}`}>
                                    <span className="text-[10px] font-bold text-neutral-400 ml-1 block">
                                        {msg.sender?.fullname || 'Unknown'} {msg.sender?.role === 'admin' && '(Staff)'}
                                    </span>

                                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${!isMe
                                        ? 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-tl-none'
                                        : 'bg-black dark:bg-white text-white dark:text-black rounded-tr-none shadow-lg'
                                        }`}>
                                        {msg.content}
                                    </div>

                                    <span className="text-[10px] text-neutral-400 font-medium opacity-70 px-1">
                                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>

                                {/* Avatar for Me */}
                                {isMe && (
                                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 shrink-0 mt-1">
                                        <TbHeadset size={16} />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
                    <form onSubmit={handleSendMessage} className="relative flex items-end gap-2 max-w-4xl mx-auto">
                        <button
                            type="button"
                            className="p-3 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
                        >
                            <TbPaperclip size={20} />
                        </button>

                        <div className="flex-1 bg-neutral-50 dark:bg-[#0A0A0A] rounded-xl border border-neutral-200 dark:border-neutral-800 focus-within:ring-2 focus-within:ring-black dark:focus-within:ring-white transition-all overflow-hidden">
                            <textarea
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage(e);
                                    }
                                }}
                                placeholder="Type your reply..."
                                className="w-full max-h-32 p-3 bg-transparent outline-none text-sm resize-none"
                                rows="1"
                                disabled={sending}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!newMessage.trim() || sending}
                            className="p-3 bg-black dark:bg-white text-white dark:text-black rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                        >
                            {sending ? <TbLoader className="animate-spin" size={20} /> : <TbSend size={20} />}
                        </button>
                    </form>
                    <p className="text-center text-[10px] text-neutral-400 mt-2">
                        Press Enter to send. Shift + Enter for new line.
                    </p>
                </div>

            </div>
        </div>
    );
}
