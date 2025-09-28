'use client'

import React from 'react'
import Brands from '../Brands'

export default function CTA2() {
    return (
        <div className=' xl:px-40 xl:py-10 p-8 mt-10'>
            <div className="bg-[#1a1919] w-full rounded-[5rem] p-6 py-15 flex flex-col justify-start items-center gap-y-7">
                <span className='text-lg text-white/90 tracking-widest font-extralight'>Call To Action</span>
                <span className='text-6xl text-white font-black tracking-tight mt-5'>Start Building Your <i>Brand</i> Today!</span>
                <span className='text-base text-white/90'>Create a stunning portfolio with <i>Zolio</i> in just a few steps. Showcase your skills and make your mark online</span>
                <button className='bg-white hover:bg-white/85 transition-colors p-3 rounded-xl text-black mt-7'>Get started now</button>
            </div>
        </div>
    )
}
