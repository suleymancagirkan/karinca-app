'use client';

import { motion } from "framer-motion";
import { TbBrandGithub, TbBrandTwitter, TbBrandInstagram, TbMail } from "react-icons/tb";

export default function Footer() {
    return (
        <footer className="relative z-10 border-t border-border backdrop-blur-xl bg-background/60 dark:bg-background/50">
            <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                    {/* Logo ve Site İsmi */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center gap-3"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary/80 to-primary shadow-md flex items-center justify-center text-white font-bold">
                            A
                        </div>
                        <span className="text-lg font-semibold tracking-wide text-foreground">
                            AkılAI
                        </span>
                    </motion.div>

                    {/* Sosyal Medya İkonları */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="flex items-center gap-4"
                    >
                        <a
                            href="https://github.com/"
                            target="_blank"
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20 transition"
                        >
                            <TbBrandGithub size={20} />
                        </a>
                        <a
                            href="https://twitter.com/"
                            target="_blank"
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20 transition"
                        >
                            <TbBrandTwitter size={20} />
                        </a>
                        <a
                            href="https://instagram.com/"
                            target="_blank"
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20 transition"
                        >
                            <TbBrandInstagram size={20} />
                        </a>
                        <a
                            href="mailto:destek@akilai.space"
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20 transition"
                        >
                            <TbMail size={20} />
                        </a>
                    </motion.div>
                </div>

                {/* Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-8 text-center text-xs text-muted-foreground"
                >
                    © {new Date().getFullYear()} AkılAI. Tüm hakları saklıdır.
                </motion.div>
            </div>
        </footer>
    );
}
