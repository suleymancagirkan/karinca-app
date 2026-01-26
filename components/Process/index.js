'use client';

/**
 * @component Process
 * @description A vertical accordion-style process section showcasing the agency's workflow.
 * Uses large typography numbers and smooth expansion animations using Framer Motion.
 * Focuses on 'Discovery', 'Design', 'Development', and 'Launch'.
 * 
 * @example
 * <Process />
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbPlus, TbMinus } from 'react-icons/tb';

const steps = [
    {
        id: "01",
        title: "Discovery & Strategy",
        description: "We start by diving deep into your business goals, target audience, and market landscape. This foundation ensures every decision is data-driven and purposeful."
    },
    {
        id: "02",
        title: "Visual Design",
        description: "Our design team translates your brand essence into a stunning visual identity. We focus on usability, aesthetics, and creating an emotional connection with your users."
    },
    {
        id: "03",
        title: "Development",
        description: "We build robust, scalable, and high-performance solutions using the latest technologies. Clean code and best practices are at the core of our engineering."
    },
    {
        id: "04",
        title: "Launch & Scale",
        description: "The launch is just the beginning. We support you through the go-live process and provide ongoing optimization to ensure your product grows with your business."
    }
];

export default function Process() {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <section className="py-24 md:py-32 bg-neutral-900 text-white relative overflow-hidden">

            {/* Background Texture */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Left: Sticky Header */}
                <div className="lg:sticky lg:top-32 h-fit">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="font-unbounded text-blue-500 font-bold tracking-widest uppercase text-sm mb-4 block"
                    >
                        Methodology
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-unbounded font-black text-5xl md:text-7xl leading-none tracking-tighter mb-8"
                    >
                        HOW WE <br /> WORK
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="font-unbounded text-neutral-400 text-sm md:text-base max-w-md leading-relaxed"
                    >
                        Our proven process is designed to bring transparency, efficiency, and excellence to every project we touch.
                    </motion.p>
                </div>

                {/* Right: Accordion Steps */}
                <div className="flex flex-col">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            onClick={() => setActiveStep(index)}
                            className="group border-b border-neutral-800 cursor-pointer"
                        >
                            <div className="py-8 flex items-start md:items-center justify-between gap-6">
                                <div className="flex items-start md:items-center gap-6 md:gap-10">
                                    <span className={`font-unbounded font-bold text-2xl md:text-3xl transition-colors duration-300 ${activeStep === index ? 'text-blue-500' : 'text-neutral-700'}`}>
                                        {step.id}
                                    </span>
                                    <h3 className={`font-unbounded font-bold text-xl md:text-3xl transition-colors duration-300 ${activeStep === index ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-300'}`}>
                                        {step.title}
                                    </h3>
                                </div>
                                <div className={`p-2 rounded-full border transition-all duration-300 ${activeStep === index ? 'border-blue-500 bg-blue-500 text-white' : 'border-neutral-700 text-neutral-500 group-hover:border-neutral-500'}`}>
                                    {activeStep === index ? <TbMinus /> : <TbPlus />}
                                </div>
                            </div>

                            <AnimatePresence>
                                {activeStep === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pl-[3.5rem] md:pl-[5.5rem] pb-8 pr-8">
                                            <p className="font-unbounded text-sm md:text-base text-neutral-400 leading-relaxed max-w-lg">
                                                {step.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
