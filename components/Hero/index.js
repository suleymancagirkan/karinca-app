import { tasaOrbiter } from '@/app/fonts/tasaorbiter';
import React from 'react';
import { TbActivity, TbBuilding, TbDashboard, TbDashboardFilled, TbPlane, TbSettings, TbSettingsFilled, TbShoe } from 'react-icons/tb';

export default function Hero() {

    const features = [
        { icon: <TbShoe />, text: "Lightning fast setup" },
        { icon: <TbActivity />, text: "Seamless integrations" },
        { icon: <TbBuilding />, text: "Reliable infrastructure" },
        { icon: <TbPlane />, text: "Cross-platform support" },
        { icon: <TbSettings />, text: "Customizable workflows" },
        { icon: <TbDashboard />, text: "Insightful analytics" },
    ];

    return (
        <div className='flex flex-col items-center justify-start gap-y-5 p-24 pattern-cross pattern-white-500 pattern-bg-white pattern-size-4 pattern-opacity-40'>
            <span className={`text-6xl font-medium text-center`}><span className='text-blue-500'>Karinca.</span> Build smarter, <br></br>launch faster.</span>
            <span className={`${tasaOrbiter.className} text-base text-neutral-700 dark:text-neutral-300 tracking-tight font-semibold`}>From idea to live product, Karınca empowers <br />your SaaS journey every step of the way.</span>
            <button className='p-2 rounded-xl text-base text-white bg-black hover:bg-black/85 dark:text-black dark:bg-white dark:hover:bg-white/85 transition-colors tracking-tighter'>Get started</button>
            <div className='flex flex-row items-center justify-center gap-x-4 mt-20'>
                {features.map((item, index) => (
                    <div key={index} className='flex flex-col items-center justify-start gap-y-2'>
                        <div className='text-xl'>{item.icon}</div>
                        <span className={`${tasaOrbiter.className} text-xs font-semibold tracking-tight text-neutral-600 dark:text-neutral-400 break-words`}>{item.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};