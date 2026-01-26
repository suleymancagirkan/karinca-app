'use client';

/**
 * @component FAQ
 * @description A minimalist FAQ section designed to address common client queries.
 * Features a clean, centered layout with distinct accordion interaction styles using Unbounded font.
 * 
 * @example
 * <FAQ />
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbChevronDown } from 'react-icons/tb';

const faqs = [
    {
        question: "What industries do you specialize in?",
        answer: "While we have extensive experience in SaaS, FinTech, and E-commerce, our agnostic approach allows us to adapt to any industry. We focus on solving problems, regardless of the sector."
    },
    {
        question: "How long does a typical project take?",
        answer: "Project timelines vary significantly based on scope. A branding project might take 2-4 weeks, while a full-scale web application could take 3-6 months. We provide detailed timelines during our discovery phase."
    },
    {
        question: "Do you provide ongoing support?",
        answer: "Absolutely. We believe in long-term partnerships. We offer various maintenance and support packages to ensure your digital product remains secure, up-to-date, and optimized."
    },
    {
        question: "What is your pricing model?",
        answer: "We offer both fixed-price project based engagements and monthly retainer models, depending on your needs. Transparency is key, so we'll agree on all costs upfront."
    },
    {
        question: "Can you work with our existing team?",
        answer: "Yes! We often collaborate with internal product teams, providing specialized expertise in design or development to accelerate your roadmap."
    }
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section className="py-24 md:py-32 bg-white dark:bg-[#050505] text-neutral-900 dark:text-white relative">
            <div className="max-w-4xl mx-auto px-6">

                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-unbounded font-black text-4xl md:text-6xl tracking-tighter mb-4"
                    >
                        COMMON <br /> QUESTIONS
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="font-unbounded text-neutral-500 text-sm md:text-base"
                    >
                        Everything you need to know about working with us.
                    </motion.p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-colors"
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left bg-neutral-50/50 dark:bg-neutral-900/30"
                            >
                                <span className="font-unbounded font-bold text-sm md:text-lg pr-8 leading-tight">
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`shrink-0 text-2xl ${activeIndex === index ? 'text-blue-600' : 'text-neutral-400'}`}
                                >
                                    <TbChevronDown />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 md:p-8 pt-0 text-neutral-600 dark:text-neutral-400 leading-relaxed font-unbounded text-sm md:text-base border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black">
                                            <div className="pt-6">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};
