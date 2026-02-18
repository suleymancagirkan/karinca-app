
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TbCalendar, TbArrowRight, TbSearch, TbCategory } from 'react-icons/tb';

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch('/api/v1/blogs');
                const data = await res.json();
                setBlogs(Array.isArray(data) ? data : []);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase());
        return matchesSearch;
    });

    const featuredPost = filteredBlogs[0];
    const otherPosts = filteredBlogs.slice(1);

    return (
        <div className="min-h-screen bg-white dark:bg-black font-sans">

            <div className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-unbounded font-black tracking-tighter mb-6 text-black dark:text-white">
                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Insights.</span>
                </h1>
                <p className="text-xl text-neutral-500 max-w-2xl mx-auto font-light">
                    Thoughts on development, design, and the future of SaaS.
                </p>
            </div>

            <div className="sticky top-20 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-y border-neutral-100 dark:border-neutral-900 py-4 mb-12">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="relative w-full md:w-64">
                        <TbSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-neutral-100 dark:bg-neutral-900 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 pb-32">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="animate-pulse bg-neutral-100 dark:bg-neutral-900 aspect-[4/3] rounded-2xl"></div>
                        ))}
                    </div>
                ) : filteredBlogs.length > 0 ? (
                    <>
                        {!loading && featuredPost && (
                            <Link href={`/blogs/${featuredPost.slug}`} className="group block mb-20">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                    <div className="relative aspect-[16/10] bg-neutral-100 dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/5 group-hover:shadow-blue-500/20 transition-all duration-500">
                                        {featuredPost.image ? (
                                            <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
                                                <TbCategory className="text-4xl opacity-20" />
                                            </div>
                                        )}
                                        <div className="absolute top-6 left-6 bg-white/90 dark:bg-black/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                                            Featured
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4 text-sm font-mono text-neutral-500">
                                            <span className="flex items-center gap-2"><TbCalendar /> {new Date(featuredPost.createdAt).toLocaleDateString()}</span>
                                            <span className="w-1 h-1 bg-neutral-300 rounded-full"></span>
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-bold leading-tight group-hover:text-blue-600 transition-colors">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="text-lg text-neutral-500 line-clamp-3 leading-relaxed">
                                            {featuredPost.content?.replace(/<[^>]+>/g, '')}
                                        </p>
                                        <div className="flex items-center gap-3 pt-4">
                                            {featuredPost.author?.image ? (
                                                <img src={featuredPost.author.image} className="w-10 h-10 rounded-full object-cover" />
                                            ) : (
                                                <div className="w-10 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center font-bold">
                                                    {featuredPost.author?.fullname?.[0] || 'A'}
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-bold text-sm">{featuredPost.author?.fullname}</p>
                                                <p className="text-xs text-neutral-500">Author</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                            {otherPosts.map(blog => (
                                <Link href={`/blogs/${blog.slug}`} key={blog.id} className="group flex flex-col gap-6">
                                    <div className="relative aspect-[4/3] bg-neutral-100 dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-100 dark:border-neutral-800">
                                        {blog.image ? (
                                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <TbCategory className="text-4xl opacity-20" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                                            <TbCalendar className="text-sm" /> {new Date(blog.createdAt).toLocaleDateString()}
                                        </div>
                                        <h3 className="text-xl font-bold leading-tight group-hover:text-blue-600 transition-colors">
                                            {blog.title}
                                        </h3>
                                        <p className="text-neutral-500 text-sm line-clamp-2 leading-relaxed">
                                            {blog.content?.replace(/<[^>]+>/g, '')}
                                        </p>
                                        <div className="flex items-center gap-2 text-sm font-bold text-black dark:text-white pt-2 group-hover:translate-x-1 transition-transform">
                                            Read Article <TbArrowRight />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20 text-neutral-500">
                        <TbSearch className="text-4xl mx-auto mb-4 opacity-20" />
                        <h3 className="text-xl font-bold">No results found</h3>
                        <p>Try adjusting your search or category.</p>
                    </div>
                )}
            </div>

        </div>
    );
}