
'use client';

import React, { useEffect, useState } from 'react';
import { TbActivity, TbClock, TbUser, TbFileText, TbAlertCircle, TbCheck, TbRefresh } from 'react-icons/tb';
import toast from 'react-hot-toast';

export default function LogsPage() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLogs = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/logs');
            const data = await res.json();
            if (res.ok) {
                setLogs(data);
            } else {
                toast.error('Failed to fetch logs');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error loading logs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    // Helper to determine icon/color based on action type
    const getActionStyle = (action) => {
        if (action.includes('CREATE')) return { icon: <TbCheck />, color: 'text-green-500 bg-green-50 dark:bg-green-900/20' };
        if (action.includes('UPDATE')) return { icon: <TbRefresh />, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' };
        if (action.includes('DELETE')) return { icon: <TbAlertCircle />, color: 'text-red-500 bg-red-50 dark:bg-red-900/20' };
        if (action.includes('LOGIN')) return { icon: <TbUser />, color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20' };
        if (action.includes('SETTINGS')) return { icon: <TbActivity />, color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20' };
        return { icon: <TbFileText />, color: 'text-neutral-500 bg-neutral-100 dark:bg-neutral-800' };
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black font-unbounded text-black dark:text-white mb-2">
                        System Logs
                    </h1>
                    <p className="text-neutral-500 font-medium">
                        Audit trail of recent system activities.
                    </p>
                </div>
                <button
                    onClick={fetchLogs}
                    className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                    <TbRefresh className={loading ? 'animate-spin' : ''} />
                </button>
            </div>

            <div className="bg-white dark:bg-[#111] rounded-[2rem] border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                {logs.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
                                <tr>
                                    <th className="p-6 font-unbounded text-xs font-bold text-neutral-500 uppercase tracking-widest">
                                        Action
                                    </th>
                                    <th className="p-6 font-unbounded text-xs font-bold text-neutral-500 uppercase tracking-widest">
                                        User
                                    </th>
                                    <th className="p-6 font-unbounded text-xs font-bold text-neutral-500 uppercase tracking-widest">
                                        Details
                                    </th>
                                    <th className="p-6 font-unbounded text-xs font-bold text-neutral-500 uppercase tracking-widest text-right">
                                        Time
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                {logs.map((log) => {
                                    const style = getActionStyle(log.action);
                                    return (
                                        <tr key={log.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/20 transition-colors">
                                            <td className="p-6">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${style.color}`}>
                                                        {style.icon}
                                                    </div>
                                                    <span className="font-bold text-sm text-neutral-900 dark:text-white">
                                                        {log.action}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                {log.user ? (
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-neutral-200 overflow-hidden">
                                                            {log.user.image ? (
                                                                <img src={log.user.image} alt={log.user.fullname} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-xs font-bold">
                                                                    {log.user.fullname?.charAt(0) || 'U'}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-neutral-900 dark:text-white">
                                                                {log.user.fullname || 'Unknown'}
                                                            </span>
                                                            <span className="text-xs text-neutral-500">
                                                                {log.user.email}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-neutral-400 font-mono">System / Guest</span>
                                                )}
                                            </td>
                                            <td className="p-6">
                                                <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-sm truncate">
                                                    {log.details || '-'}
                                                </p>
                                            </td>
                                            <td className="p-6 text-right">
                                                <div className="flex items-center justify-end gap-2 text-xs text-neutral-500 font-medium">
                                                    <TbClock />
                                                    {new Date(log.createdAt).toLocaleString()}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-12 text-center">
                        <div className="inline-flex p-4 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-400 mb-4">
                            <TbFileText size={32} />
                        </div>
                        <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-2">No logs found</h3>
                        <p className="text-neutral-500 text-sm">System activities will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
