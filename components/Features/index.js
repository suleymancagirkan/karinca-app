import React from 'react'
import { TbUser, TbWorld, TbChartLine, TbPalette, TbSettings, TbRocket } from 'react-icons/tb'

const features = [
    {
        title: 'What You Want',
        description: 'Build and showcase your website with no coding.',
        icon: <TbUser />,
        color: 'bg-blue-100 text-blue-800',
    },
    {
        title: 'Global Sharing',
        description: 'Share your website with a unique, sharable link worldwide.',
        icon: <TbWorld />,
        color: 'bg-green-100 text-green-800',
    },
    {
        title: 'Real-Time Analytics',
        description: 'Track visits and interactions with detailed analytics.',
        icon: <TbChartLine />,
        color: 'bg-purple-100 text-purple-800',
    },
    {
        title: 'Theme Customization',
        description: 'Switch between multiple themes and personalize your style.',
        icon: <TbPalette />,
        color: 'bg-pink-100 text-pink-800',
    },
    {
        title: 'Easy Settings',
        description: 'Manage your website settings easily from one dashboard.',
        icon: <TbSettings />,
        color: 'bg-yellow-100 text-yellow-800',
    },
    {
        title: 'Fast Deployment',
        description: 'Go live instantly with our optimized deployment system.',
        icon: <TbRocket />,
        color: 'bg-red-100 text-red-800',
    },
]

export default function Features() {
    return (
        <div className="flex flex-col items-center justify-center gap-y-4 xl:px-30 xl:py-10 p-8 mt-20">
            <span className="font-black text-black text-7xl">Everything You Need</span>
            <span className="font-extralight italic relative text-black text-7xl origin-top scale-y-115 -mt-4">
                <span className="z-10">in one place</span>
                <div className="bg-blue-400 z-0 rounded-none -rotate-4 h-4 w-90 absolute -right-5" />
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-30 w-full">
                {features.map((item, index) => (
                    <div key={index} className="flex flex-col items-center justify-center gap-y-3 text-center">
                        <span className={`p-3 rounded-full text-3xl ${item.color}`}>
                            {item.icon}
                        </span>
                        <span className="text-black font-semibold text-2xl tracking-tight">
                            {item.title}
                        </span>
                        <span className="text-black/65 font-light">{item.description}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
