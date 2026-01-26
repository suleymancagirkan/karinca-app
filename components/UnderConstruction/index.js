'use client';

/**
 * @component UnderConstruction
 * @description A modern, abstract representation of 'building'.
 * Instead of literal construction tools, it uses a 'System Assembly' aesthetic.
 * Features a rotating, self-assembling geometric structure and blueprint grids.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UnderConstruction({
    title = "System Assembly",
    message = "This module is currently being compiled.",
    fullScreen = true
}) {
    const [step, setStep] = useState(0);
    const words = ["DESIGNING", "CODING", "RENDERING", "DEPLOYING"];

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % words.length);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={`flex flex-col items-center justify-center bg-white dark:bg-[#050505] text-neutral-900 dark:text-white relative overflow-hidden ${fullScreen ? 'min-h-[80vh] w-full' : 'p-12 border border-neutral-200 dark:border-neutral-800 rounded-3xl'}`}>

            {/* Dynamic Grid Background */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: 'linear-gradient(90deg, #888 1px, transparent 1px), linear-gradient(#888 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                >
                    {/* Scanning Line */}
                    <motion.div
                        className="w-full h-[2px] bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                        animate={{ top: ["0%", "100%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                </div>
            </div>

            {/* Abstract 3D Cube Assembly */}
            <div className="relative z-10 w-48 h-48 mb-12 flex items-center justify-center perspective-1000">
                <motion.div
                    className="relative w-24 h-24"
                    animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Core Cube Faces */}
                    {[
                        "translateZ(48px)",
                        "rotateY(180deg) translateZ(48px)",
                        "rotateY(90deg) translateZ(48px)",
                        "rotateY(-90deg) translateZ(48px)",
                        "rotateX(90deg) translateZ(48px)",
                        "rotateX(-90deg) translateZ(48px)"
                    ].map((transform, i) => (
                        <div
                            key={i}
                            className="absolute inset-0 border-2 border-blue-600 bg-blue-500/10 backdrop-blur-sm"
                            style={{ transform }}
                        />
                    ))}

                    {/* Orbiting Particles */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-4 h-4 bg-black dark:bg-white rounded-full"
                        animate={{
                            x: [60, -60, 60],
                            y: [0, 60, -60, 0],
                            z: [40, -40, 40],
                            scale: [1, 0.5, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-500 rounded-full"
                        animate={{
                            x: [-60, 60, -60],
                            y: [0, -60, 60, 0],
                            z: [-40, 40, -40],
                            scale: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
            </div>

            {/* Typography & Status */}
            <div className="relative z-10 text-center max-w-lg px-6">

                {/* Changing Status Text */}
                <div className="h-8 mb-2 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="font-mono text-xs text-blue-600 font-bold tracking-[0.2em] uppercase"
                        >
                            // {words[step]}...
                        </motion.div>
                    </AnimatePresence>
                </div>

                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="font-unbounded font-black text-4xl md:text-5xl uppercase tracking-tighter mb-6"
                >
                    {title}
                </motion.h2>

                <p className="font-unbounded text-sm text-neutral-500 max-w-sm mx-auto mb-8">
                    {message}
                </p>

                {/* Technical Divider */}
                <div className="flex items-center justify-center gap-4 opacity-30">
                    <span className="w-16 h-px bg-current" />
                    <span className="w-2 h-2 border border-current rotate-45" />
                    <span className="w-16 h-px bg-current" />
                </div>
            </div>
        </div>
    );
};
