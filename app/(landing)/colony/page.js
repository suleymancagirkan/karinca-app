'use client';

/**
 * @page Colony (Easter Egg)
 * @description A hidden interactive simulation of 'ants' (particles) that follow the user's cursor.
 * Represents the "Karınca" (Ant) spirit of the project.
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function ColonyPage() {
    const canvasRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [found, setFound] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        // Ant Class
        class Ant {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.color = Math.random() > 0.95 ? '#3B82F6' : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#ffffff' : '#000000'); // Some blue leader ants
            }

            update(targetX, targetY) {
                // Calculate distance to target (mouse)
                const dx = targetX - this.x;
                const dy = targetY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // If close to 'food' (mouse), accelerate towards it
                if (distance < 300) {
                    this.speedX += dx * 0.0005;
                    this.speedY += dy * 0.0005;
                } else {
                    // Random wander logic
                    this.speedX += (Math.random() - 0.5) * 0.1;
                    this.speedY += (Math.random() - 0.5) * 0.1;
                }

                // Friction
                this.speedX *= 0.98;
                this.speedY *= 0.98;

                // Max speed cap
                const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
                if (speed > 4) {
                    this.speedX = (this.speedX / speed) * 4;
                    this.speedY = (this.speedY / speed) * 4;
                }

                this.x += this.speedX;
                this.y += this.speedY;

                // Boundary wrap
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const ants = Array.from({ length: 300 }, () => new Ant());
        let animationFrameId;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            ants.forEach(ant => {
                ant.update(mouse.x, mouse.y);
                ant.draw();
            });

            requestAnimationFrame(animate);
        };

        // Mouse Tracker inside Effect
        let mouse = { x: width / 2, y: height / 2 };
        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            if (!found) setFound(true);
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 bg-white dark:bg-[#050505] cursor-none overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 block" />

            <motion.div
                className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center mix-blend-difference"
                initial={{ opacity: 0 }}
                animate={{ opacity: found ? 1 : 0 }}
                transition={{ duration: 2 }}
            >
                <h1 className="font-unbounded font-black text-6xl md:text-9xl text-white tracking-tighter">
                    THE COLONY
                </h1>
                <p className="font-unbounded text-white/70 mt-4 uppercase tracking-widest text-xs">
                    You have disturbed the nest. They are watching.
                </p>
                <p className="font-mono text-white/50 text-[10px] mt-24">
                    /colony detected. easter egg unlocked.
                </p>
            </motion.div>

            {/* Custom Mouse Cursor */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-blue-500 pointer-events-none -translate-x-1/2 -translate-y-1/2 z-50 mix-blend-difference"
                animate={{ x: mousePos.x, y: mousePos.y }}
                transition={{ type: "tween", ease: "linear", duration: 0 }}
            >
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" />
            </motion.div>
        </div>
    );
};
