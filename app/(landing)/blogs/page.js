'use client';

/**
 * @page Blogs
 * @description A modern, grid-based blog listing page.
 * Features a high-impact featured post, category filtering, and a clean masonry-style layout.
 * consistent with the "Unbounded" design language.
 */

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { TbArrowUpRight, TbCalendar, TbClock, TbSearch, TbFilter } from 'react-icons/tb';

// Mock Data
const categories = ["All", "Design", "Development", "Business", "Tutorials"];

const blogPosts = [
    {
        id: 1,
        title: "The Future of Digital Interfaces",
        excerpt: "How spatial computing and AI are reshaping the way we interact with technology.",
        category: "Design",
        date: "Oct 24, 2025",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        featured: true,
        slug: "future-of-digital-interfaces"
    },
    {
        id: 2,
        title: "Mastering Next.js 15",
        excerpt: "A deep dive into the latest features, server actions, and performance optimizations.",
        category: "Development",
        date: "Oct 20, 2025",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2670&auto=format&fit=crop",
        featured: false,
        slug: "mastering-nextjs-15"
    },
    {
        id: 3,
        title: "Scaling Your Agency",
        excerpt: "Strategies for growth, client retention, and building a world-class team.",
        category: "Business",
        date: "Oct 15, 2025",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2632&auto=format&fit=crop",
        featured: false,
        slug: "scaling-your-agency"
    },
    {
        id: 4,
        title: "Typography in 2026",
        excerpt: "Why maximalist typography is taking over the web.",
        category: "Design",
        date: "Oct 10, 2025",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
        featured: false,
        slug: "typography-in-2026"
    },
    {
        id: 5,
        title: "Building Accessible Apps",
        excerpt: "Ensuring your digital products are usable by everyone, everywhere.",
        category: "Development",
        date: "Oct 05, 2025",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        featured: false,
        slug: "building-accessible-apps"
    },
    {
        id: 6,
        title: "The Art of Storytelling",
        excerpt: "How to craft compelling narratives for your brand.",
        category: "Business",
        date: "Sep 28, 2025",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2670&auto=format&fit=crop",
        featured: false,
        slug: "art-of-storytelling"
    }
];

export default function Blogs() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredPost = filteredPosts.find(p => p.featured) || filteredPosts[0];
    const regularPosts = filteredPosts.filter(p => p.id !== featuredPost?.id);

    return (
        <main className="min-h-screen bg-white dark:bg-[#050505] text-neutral-900 dark:text-white pt-32 pb-20">

            {/* Header Section */}
            <div className="max-w-[1400px] mx-auto px-6 mb-16 md:mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-8"
                >
                    <div>
                        <span className="font-unbounded font-bold text-blue-600 tracking-widest uppercase text-sm mb-4 block">
                            Our Journal
                        </span>
                        <h1 className="font-unbounded font-black text-5xl md:text-8xl tracking-tighter leading-none">
                            INSIGHTS
                        </h1>
                    </div>

                    <p className="font-unbounded text-neutral-500 dark:text-neutral-400 max-w-md text-sm md:text-base leading-relaxed">
                        Thoughts, ideas, and stories from our team of designers, developers, and strategists.
                    </p>
                </motion.div>

                {/* Filters & Search */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full font-unbounded text-xs font-bold transition-all border ${selectedCategory === cat
                                    ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-black dark:border-white'
                                    : 'bg-transparent text-neutral-500 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-auto">
                        <TbSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full md:w-64 pl-10 pr-4 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full font-unbounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>
                </motion.div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6">

                {/* Featured Post (Only show if matches query/category and exists) */}
                {featuredPost && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-16 group cursor-pointer"
                    >
                        <Link href={`/blogs/${featuredPost.slug}`} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                            <div className="relative aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden rounded-[2rem]">
                                <img
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/90 backdrop-blur px-3 py-1 rounded-full text-xs font-unbounded font-bold">
                                    {featuredPost.category}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="flex items-center gap-4 text-xs font-unbounded text-neutral-500 mb-4">
                                    <span className="flex items-center gap-1"><TbCalendar /> {featuredPost.date}</span>
                                    <span className="flex items-center gap-1"><TbClock /> {featuredPost.readTime}</span>
                                </div>
                                <h2 className="font-unbounded font-black text-3xl md:text-5xl lg:text-6xl leading-tight mb-6 group-hover:text-blue-600 transition-colors">
                                    {featuredPost.title}
                                </h2>
                                <p className="font-unbounded text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8 max-w-lg">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="flex items-center gap-2 font-unbounded font-bold text-sm uppercase tracking-wide group-hover:gap-4 transition-all duration-300">
                                    Read Article <TbArrowUpRight className="text-lg" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )}

                {/* Regular Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    <AnimatePresence>
                        {regularPosts.map((post) => (
                            <motion.div
                                key={post.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="group cursor-pointer"
                            >
                                <Link href={`/blogs/${post.slug}`}>
                                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl mb-6">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-unbounded font-bold">
                                            {post.category}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] font-unbounded text-neutral-500 mb-3">
                                        <span className="flex items-center gap-1"><TbCalendar /> {post.date}</span>
                                        <span className="flex items-center gap-1"><TbClock /> {post.readTime}</span>
                                    </div>
                                    <h3 className="font-unbounded font-bold text-xl md:text-2xl leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="font-unbounded text-neutral-500 dark:text-neutral-400 text-xs md:text-sm leading-relaxed mb-4 line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-1 font-unbounded font-bold text-xs uppercase tracking-wide text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                        Read Now <TbArrowUpRight />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredPosts.length === 0 && (
                    <div className="text-center py-24">
                        <h3 className="font-unbounded font-bold text-2xl mb-2">No articles found</h3>
                        <p className="text-neutral-500">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </main>
    );
};