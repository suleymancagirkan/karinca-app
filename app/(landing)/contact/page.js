'use client';

/**
 * @page ContactPage
 * @description Contact page with a toggleable construction mode.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { TbMail, TbMapPin, TbPhone, TbSend, TbBrandTwitter, TbBrandInstagram, TbBrandLinkedin } from 'react-icons/tb';
import UnderConstruction from '@/components/UnderConstruction';

export default function Contact() {

    // TOGGLE THIS VARIABLE TO TEST
    const constructionMode = true;

    if (constructionMode) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex flex-col justify-center">
                <UnderConstruction
                    title="Under Construction"
                    message="We are setting up our new global support lines. Reach out via email in the meantime."
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[#050505] text-neutral-900 dark:text-white pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-24">
                    <span className="font-unbounded font-bold text-xs uppercase tracking-widest text-neutral-500 mb-4 block">
                        Get is touch
                    </span>
                    <h1 className="font-unbounded font-black text-6xl md:text-8xl mb-8 tracking-tighter">
                        LET'S <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">TALK</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-unbounded font-bold text-2xl uppercase mb-8">Contact Info</h3>

                        <div className="space-y-8 mb-16">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-xl shrink-0">
                                    <TbMail />
                                </div>
                                <div>
                                    <h4 className="font-unbounded font-bold text-sm mb-1">Email</h4>
                                    <p className="text-neutral-500 text-sm">hello@karinca.app</p>
                                    <p className="text-neutral-500 text-sm">support@karinca.app</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-xl shrink-0">
                                    <TbMapPin />
                                </div>
                                <div>
                                    <h4 className="font-unbounded font-bold text-sm mb-1">Office</h4>
                                    <p className="text-neutral-500 text-sm">123 Innovation Blvd</p>
                                    <p className="text-neutral-500 text-sm">Istanbul, Turkey 34000</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-xl shrink-0">
                                    <TbPhone />
                                </div>
                                <div>
                                    <h4 className="font-unbounded font-bold text-sm mb-1">Phone</h4>
                                    <p className="text-neutral-500 text-sm">+90 (555) 123 45 67</p>
                                    <p className="text-xs text-neutral-400 mt-1">Mon-Fri from 9am to 6pm</p>
                                </div>
                            </div>
                        </div>

                        <h3 className="font-unbounded font-bold text-2xl uppercase mb-6">Socials</h3>
                        <div className="flex gap-4">
                            {[<TbBrandTwitter key="tw" />, <TbBrandInstagram key="ig" />, <TbBrandLinkedin key="li" />].map((icon, i) => (
                                <button key={i} className="w-12 h-12 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center text-xl hover:scale-110 transition-transform">
                                    {icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-neutral-50 dark:bg-neutral-900 rounded-[2.5rem] p-8 md:p-12">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="font-unbounded font-bold text-xs uppercase text-neutral-500 ml-2">First Name</label>
                                    <input type="text" className="w-full bg-white dark:bg-black rounded-2xl px-6 py-4 border border-transparent focus:border-blue-500 focus:outline-none transition-colors" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-unbounded font-bold text-xs uppercase text-neutral-500 ml-2">Last Name</label>
                                    <input type="text" className="w-full bg-white dark:bg-black rounded-2xl px-6 py-4 border border-transparent focus:border-blue-500 focus:outline-none transition-colors" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="font-unbounded font-bold text-xs uppercase text-neutral-500 ml-2">Email</label>
                                <input type="email" className="w-full bg-white dark:bg-black rounded-2xl px-6 py-4 border border-transparent focus:border-blue-500 focus:outline-none transition-colors" placeholder="john@example.com" />
                            </div>

                            <div className="space-y-2">
                                <label className="font-unbounded font-bold text-xs uppercase text-neutral-500 ml-2">Message</label>
                                <textarea rows={4} className="w-full bg-white dark:bg-black rounded-2xl px-6 py-4 border border-transparent focus:border-blue-500 focus:outline-none transition-colors resize-none" placeholder="Tell us about your project..." />
                            </div>

                            <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-unbounded font-bold text-sm uppercase tracking-wider hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                                Send Message <TbSend />
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};
