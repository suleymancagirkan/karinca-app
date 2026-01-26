'use client';

/**
 * @page LoginPage
 * @description A high-fidelity 'Art House' authentication interface integrated with NextAuth & Prisma backend.
 * Features a centralized 'Technical Access Card' design with brutalist/architectural elements.
 * Uses the 'Unbounded' design system with sharp borders, technical markers, and bold typography.
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { TbArrowRight, TbMail, TbLock, TbEye, TbEyeOff, TbBrandGoogle, TbBrandApple, TbScan, TbCornerUpLeft, TbCornerDownRight } from 'react-icons/tb';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        signIn('credentials', {
            email,
            password,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success('Logged in successfully!');
                router.refresh();
                router.push('/'); // Redirect to main app page
            }

            if (callback?.error) {
                toast.error(callback.error);
            }
        });
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-neutral-100 dark:bg-[#050505] text-neutral-900 dark:text-white relative overflow-hidden p-4 pt-20">

            {/* Background Architecture */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Large Grid */}
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

                {/* Ambient Glows */}
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen" />

                {/* Vertical Decorative Lines */}
                <div className="absolute left-12 top-0 bottom-0 w-[1px] bg-neutral-200 dark:bg-neutral-800 hidden md:block" />
                <div className="absolute right-12 top-0 bottom-0 w-[1px] bg-neutral-200 dark:bg-neutral-800 hidden md:block" />
            </div>

            {/* Main Auth Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-[480px] relative z-10"
            >
                {/* Tech Card Container */}
                <div className="relative bg-white dark:bg-[#0A0A0A] border-2 border-neutral-900 dark:border-white/10 p-8 md:p-12 shadow-2xl shadow-black/5 dark:shadow-black/50 overflow-hidden">

                    {/* Corner Accents (Technical Markers) */}
                    <TbCornerUpLeft className="absolute top-2 left-2 text-2xl text-neutral-900 dark:text-white opacity-20" />
                    <TbCornerDownRight className="absolute bottom-2 right-2 text-2xl text-neutral-900 dark:text-white opacity-20" />

                    {/* Animated Scanning Line (Top) */}
                    <motion.div
                        initial={{ left: '-100%' }}
                        animate={{ left: '200%' }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
                        className="absolute top-0 h-[2px] w-1/2 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-50"
                    />

                    {/* Header */}
                    <div className="mb-10 text-center relative">
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-neutral-200 dark:border-white/10 rounded-full bg-neutral-50 dark:bg-white/5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="font-unbounded text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Secure Gateway</span>
                        </div>
                        <h1 className="font-unbounded font-black text-4xl mb-2 tracking-tighter">
                            ACCESS <span className="text-stroke-1 text-transparent bg-clip-text bg-gradient-to-b from-black to-neutral-400 dark:from-white dark:to-neutral-600">CONTROL</span>
                        </h1>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-6">

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="flex items-center justify-between text-[11px] font-unbounded font-bold uppercase tracking-wider text-neutral-400">
                                <span>EMAIL</span>
                                {focusedField === 'email' && <span className="text-blue-600 animate-pulse">● ACTIVE</span>}
                            </label>
                            <div className={`relative group transition-all duration-300 ${focusedField === 'email' ? 'transform scale-[1.02]' : ''}`}>
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <TbMail className={`text-lg transition-colors ${focusedField === 'email' ? 'text-blue-600' : 'text-neutral-400'}`} />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full py-4 pl-12 pr-4 bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-white/10 focus:border-blue-600 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-black outline-none transition-all font-medium placeholder:text-neutral-400 text-sm"
                                    placeholder="Type Email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="flex items-center justify-between text-[11px] font-unbounded font-bold uppercase tracking-wider text-neutral-400">
                                <span>PASSWORD</span>
                                {focusedField === 'password' && <span className="text-blue-600 animate-pulse">● ACTIVE</span>}
                            </label>
                            <div className={`relative group transition-all duration-300 ${focusedField === 'password' ? 'transform scale-[1.02]' : ''}`}>
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <TbLock className={`text-lg transition-colors ${focusedField === 'password' ? 'text-blue-600' : 'text-neutral-400'}`} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full py-4 pl-12 pr-12 bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-white/10 focus:border-blue-600 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-black outline-none transition-all font-medium placeholder:text-neutral-400 text-sm"
                                    placeholder="••••••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                                >
                                    {showPassword ? <TbEyeOff className="text-lg" /> : <TbEye className="text-lg" />}
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-2">
                            <Link href="/forgot-password" className="font-unbounded text-[10px] font-bold text-neutral-400 hover:text-blue-600 transition-colors uppercase tracking-wide">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-5 bg-black dark:bg-white text-white dark:text-black font-unbounded font-black text-xs uppercase tracking-widest hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all flex items-center justify-center gap-3 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {isLoading ? "VERIFYING..." : "LOGIN"}
                                {!isLoading && <TbArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />}
                            </span>
                            {/* Hover slide effect */}
                            <div className="absolute inset-0 bg-blue-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0 opacity-10" />
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-200 dark:border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white dark:bg-[#0A0A0A] text-neutral-400 font-unbounded text-[10px] font-bold uppercase tracking-widest">
                                Alternative Access
                            </span>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 py-3 border border-neutral-200 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors font-bold text-xs uppercase tracking-wider group">
                            <TbBrandGoogle className="text-lg text-neutral-400 group-hover:text-black dark:group-hover:text-white" />
                            <span className="text-neutral-500 group-hover:text-black dark:group-hover:text-white">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 py-3 border border-neutral-200 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors font-bold text-xs uppercase tracking-wider group">
                            <TbBrandApple className="text-lg text-neutral-400 group-hover:text-black dark:group-hover:text-white" />
                            <span className="text-neutral-500 group-hover:text-black dark:group-hover:text-white">Apple</span>
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center border-t border-neutral-100 dark:border-white/5 pt-6">
                        <p className="text-[10px] font-unbounded text-neutral-400 uppercase tracking-wider">
                            No credentials?{' '}
                            <Link href="/register" className="text-black dark:text-white font-bold hover:text-blue-600 transition-colors ml-1">
                                Request Access
                            </Link>
                        </p>
                    </div>
                </div>

            </motion.div>
        </div>
    );
}
