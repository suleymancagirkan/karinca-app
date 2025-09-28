'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function CTA() {
    return (
        <div className="bg-[#1a1919] w-full rounded-t-[5rem] mt-25 flex flex-col justify-start items-start py-30 gap-y-5 overflow-hidden relative">
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-white rounded-full translate-x-[-50%] translate-y-[50%]" />
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-white rounded-full translate-x-[50%] translate-y-[50%]" />

            <motion.div
                className="flex whitespace-nowrap gap-x-16 "
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'linear',
                    duration: 20,
                }}
            >
                <span className="text-white text-9xl font-black">
                    Start Building Your{' '}
                    <span
                        className="text-transparent font-black"
                        style={{
                            WebkitTextStroke: '2px white',
                            textStroke: '2px white'
                        }}
                    >
                        Website
                    </span>{' '}
                    Today
                </span>
                <span className="text-white text-9xl font-black">
                    Start Building Your{' '}
                    <span
                        className="text-transparent font-black"
                        style={{
                            WebkitTextStroke: '2px white',
                            textStroke: '2px white'
                        }}
                    >
                        Website
                    </span>{' '}
                    Today
                </span>
            </motion.div>
        </div>
    )
}
