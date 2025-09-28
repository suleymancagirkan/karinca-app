'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import { TbArrowLeft } from "react-icons/tb";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-gradient-to-br from-background to-muted">
            {/* 404 Animasyonu */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-8xl font-extrabold tracking-tight text-foreground"
            >
                404
            </motion.h1>

            {/* Mesaj */}
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 text-lg text-muted-foreground max-w-md"
            >
                Üzgünüz, aradığınız sayfa bulunamadı.
                Yanlış bir bağlantıya tıklamış olabilirsiniz.
            </motion.p>

            {/* Ana Sayfaya Dön */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <Link
                    href="/"
                    className="mt-8 inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-2xl 
                            backdrop-blur-xl border border-border
                            bg-white/10 hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20
                            transition-all duration-300 shadow-md">
                    <TbArrowLeft size={20} />
                    Ana Sayfaya Dön
                </Link>
            </motion.div>
        </div>
    );
}
