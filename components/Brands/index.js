'use client'

import React from 'react';
import { motion } from 'framer-motion';

export default function Brands({ isDark = false }) {
    let items = [
        'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
        'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
        'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
        'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
        'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
        'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    ]

    return (
        <div className='overflow-x-hidden'>
            <motion.div
                className='flex gap-14'
                animate={{ x: ['0%', '-100%'] }}
                transition={{
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'linear',
                    duration: 20,
                }}
            >
                {[...items, ...items].map((i, k) => (
                    <img key={k} src={i} className={`w-48 dark:brightness-1000000 brightness-0`} />
                ))}
            </motion.div>
        </div>
    );
};