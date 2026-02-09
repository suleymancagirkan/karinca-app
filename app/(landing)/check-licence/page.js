'use client';

import CrystalCTA from '@/components/CTA/CrystalCTA';
import React, { useState } from 'react';
import { TbCheck, TbX, TbLoader } from 'react-icons/tb';

export default function CheckLicencePage() {
    const [url, setUrl] = useState('');
    const [result, setResult] = useState(null); // null, 'loading', 'valid', 'invalid'
    const [details, setDetails] = useState(null);
    const [error, setError] = useState('');

    const handleCheck = async () => {
        if (!url) {
            setError('Please enter a URL.');
            return;
        }

        setError('');
        setResult('loading');
        setDetails(null);

        // Normalize before sending
        let cleanUrl = url.replace(/(^\w+:|^)\/\//, '').replace(/\/+$/, '');
        // e.g. "https://google.com/" -> "google.com"

        try {
            const res = await fetch('/api/v1/licence', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: cleanUrl })
            });

            const data = await res.json();

            if (data.valid) {
                setResult('valid');
                setDetails(data.details);
            } else {
                setResult('invalid');
                setError(data.message);
            }
        } catch (err) {
            console.error(err);
            setResult('error');
            setError('Connection failed. Please try again.');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCheck();
        }
    };

    return (
        <div className='min-h-screen bg-white dark:bg-[#050505] text-neutral-900 dark:text-white pt-48 flex flex-col items-center justify-center gap-y-8 relative overflow-hidden'>

            {/* Background elements (optional subtle) */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none" />

            <div className='flex flex-col items-center justify-start gap-y-2 z-10 text-center px-4'>
                <span className='text-black dark:text-white text-4xl md:text-5xl font-black tracking-tight font-unbounded'>Check Licence</span>
                <span className='text-black/60 dark:text-white/60 text-sm md:text-base font-medium tracking-tight font-unbounded'>Enter your website URL to verify your active license</span>
            </div>

            <div className='flex flex-col items-center mb-24 w-full max-w-lg px-4 gap-y-6 z-10'>

                {/* Status Alerts */}
                {result === 'valid' && (
                    <div className='ring-1 ring-green-500 text-green-600 bg-green-50 dark:bg-green-500/10 w-full rounded-2xl p-6 flex items-start gap-4 shadow-lg shadow-green-500/10 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500'>
                        <div className="bg-green-100 dark:bg-green-500/20 p-2 rounded-full shrink-0">
                            <TbCheck className="text-xl text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <h4 className='font-bold font-unbounded text-sm mb-1'>License verified successfully!</h4>
                            <p className='text-xs font-medium opacity-80 mb-2'>This domain has an active license.</p>
                            {details && (
                                <div className="mt-3 text-xs bg-white/50 dark:bg-black/20 p-3 rounded-lg flex flex-col gap-1">
                                    <span className="opacity-70">Plan: <strong className="opacity-100">{details.tier}</strong></span>
                                    <span className="opacity-70">Expires: <strong className="opacity-100">{new Date(details.expiresAt).toLocaleDateString()}</strong></span>
                                    <span className="opacity-70">Registered to: <strong className="opacity-100">{details.owner}</strong></span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {result === 'invalid' && (
                    <div className='ring-1 ring-red-500 text-red-600 bg-red-50 dark:bg-red-500/10 w-full rounded-2xl p-4 flex items-center gap-4 shadow-lg shadow-red-500/10 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500'>
                        <div className="bg-red-100 dark:bg-red-500/20 p-2 rounded-full shrink-0">
                            <TbX className="text-xl text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                            <h4 className='font-bold font-unbounded text-sm'>License not found</h4>
                            <p className='text-xs font-medium opacity-80'>{error || 'No active license found for this URL.'}</p>
                        </div>
                    </div>
                )}

                {result === 'error' && (
                    <div className='ring-1 ring-yellow-500 text-yellow-600 bg-yellow-50 dark:bg-yellow-500/10 w-full rounded-2xl p-4 flex items-center gap-4 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500'>
                        <div>
                            <h4 className='font-bold font-unbounded text-sm'>Error</h4>
                            <p className='text-xs font-medium opacity-80'>{error}</p>
                        </div>
                    </div>
                )}

                {/* Input Area */}
                <div className='w-full relative group'>
                    <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition-opacity duration-500' />
                    <div className='relative w-full bg-white dark:bg-[#0a0a0a] ring-1 ring-neutral-200 dark:ring-neutral-800 rounded-2xl p-1 flex items-center shadow-xl'>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder='domain.com'
                            className='flex-1 bg-transparent outline-none text-black dark:text-white px-4 py-3 font-medium placeholder-neutral-400 dark:placeholder-neutral-600'
                        />
                        <button
                            onClick={handleCheck}
                            disabled={result === 'loading'}
                            className='bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 px-6 py-3 rounded-xl font-bold font-unbounded text-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2'
                        >
                            {result === 'loading' ? <TbLoader className="animate-spin text-lg" /> : 'Check'}
                        </button>
                    </div>
                </div>

                <p className="text-xs text-neutral-400 text-center max-w-xs">
                    Please enter the domain exactly as it appears on your website (e.g. example.com).
                </p>

            </div>

            <CrystalCTA />
        </div>
    )
}