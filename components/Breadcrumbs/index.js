'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { TbChevronRight, TbHomeFilled } from 'react-icons/tb';

export default function Breadcrumbs() {
    const path = usePathname()
    const segments = path.split('/').filter(Boolean)

    return (
        <nav className="flex items-center gap-2 text-gray-600 text-sm">
            <Link href="/" className="flex items-center gap-1 text-neutral-600">
                <TbHomeFilled size={20} />
            </Link>

            {segments.map((segment, index) => {
                const href = "/" + segments.slice(0, index + 1).join("/");
                const isLast = index === segments.length - 1;

                return (
                    <div key={href} className="flex items-center gap-2">
                        <TbChevronRight className='text-xl text-neutral-600'/>
                        {isLast ? (
                            <span className="text-neutral-300 capitalize">{segment}</span>
                        ) : (
                            <Link href={href} className="capitalize ">
                                {segment}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
};