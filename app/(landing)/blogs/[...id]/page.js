/**
 * @page BlogSlugPage
 * @description A highly stylized, typographic blog post page.
 * Features a massive title, metadata grid, and a custom markdown renderer aligned with the Unbounded system.
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Markdown from 'react-markdown';
import { notFound } from 'next/navigation';
import { TbArrowLeft, TbCalendar, TbClock, TbShare, TbBrandTwitter, TbBrandLinkedin, TbBrandFacebook, TbSend } from 'react-icons/tb';

const blogPosts = [
    {
        id: 1,
        title: "The Future of Digital Interfaces",
        excerpt: "How spatial computing and AI are reshaping the way we interact with technology.",
        category: "Design",
        date: "Oct 24, 2025",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        slug: "future-of-digital-interfaces",
        featured: true,
        content: `# The Dawn of Spatial Computing

The way we interact with technology is undergoing a fundamental shift. For decades, we've been confined to 2D screens—abstract windows into a digital world that exists "over there." But spatial computing is breaking that barrier, merging the digital and physical in ways we've only dreamed of.

## Beyond the Screen

Imagine a workspace that isn't limited by the bezels of your monitor. Spatial interfaces allow us to place digital objects in our real environment, persistent and aware. This isn't just about VR headsets; it's about a new layer of reality that overlay information when and where we need it.

> "The interface is no longer a window; it is the world itself."

### Key Principles
1.  **Immersion:** Content that surrounds you.
2.  **Interaction:** Natural gestures like looking and pinching.
3.  **Context:** Interfaces that understand the room you are in.

## The Role of AI

Artificial Intelligence acts as the brain behind these spatial experiences. It's not enough to just project an image; the system must understand _what_ it's looking at. Before we know it, our walls will become canvases, and our tables interactive surfaces.

**Are we ready for this shift?** The technology is here. The design language is being written right now. It is up to us creators to define how this new reality feels.
`
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

const genericContent = `# The Complexity of Simplicity

Building digital products is easy. Building _great_ digital products is incredibly hard. It requires a relentless focus on removing the non-essential, until only the pure, functional core remains.

## The Design Process

Great design isn't just about aesthetics; it's about problem-solving.
*   **Empathy:** Understanding the user's needs.
*   **Iteration:** Failing fast and improving.
*   **Precision:** Attention to every pixel.

> "Simplicity is the ultimate sophistication."

As we continue to push the boundaries of web technology, let's not forget that the most powerful tool we have is clear, concise communication.
`;

export default async function BlogSlugPage({ params }) {
    const resolvedParams = await params;
    const slug = resolvedParams.id?.[0];

    let post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return notFound();
    }

    // Fallback content for posts that don't have explicit markdown defined
    if (!post.content) {
        post = { ...post, content: genericContent };
    }


    return (
        <main className="min-h-screen bg-white dark:bg-[#050505] text-neutral-900 dark:text-white pt-32 pb-20">

            {/* Nav Back */}
            <div className="max-w-[1000px] mx-auto px-6 mb-12">
                <Link href="/blogs" className="inline-flex items-center gap-2 font-unbounded text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-black dark:hover:text-white transition-colors">
                    <TbArrowLeft className="text-lg" /> Back to Journal
                </Link>
            </div>

            {/* Header */}
            <article className="max-w-[1000px] mx-auto px-6">
                <header className="mb-16">
                    <div className="flex flex-wrap items-center gap-4 mb-6 text-xs font-unbounded text-neutral-500">
                        <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-900 rounded-full font-bold text-black dark:text-white uppercase tracking-wider">
                            {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                            <TbCalendar className="text-base" /> {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                            <TbClock className="text-base" /> {post.readTime}
                        </span>
                    </div>

                    <h1 className="font-unbounded font-black text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter mb-12 text-balance">
                        {post.title}
                    </h1>

                    <div className="relative w-full aspect-[21/9] rounded-[2rem] overflow-hidden mb-16">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="object-cover"
                        />
                    </div>
                </header>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12 lg:gap-24 relative">

                    {/* Markdown Body */}
                    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-unbounded prose-headings:font-bold prose-p:font-sans prose-p:text-neutral-600 dark:prose-p:text-neutral-400 prose-blockquote:border-l-black dark:prose-blockquote:border-l-white prose-blockquote:not-italic prose-blockquote:pl-6 prose-blockquote:font-unbounded prose-img:rounded-3xl">
                        <Markdown>{post.content}</Markdown>
                    </div>

                    {/* Sidebar / Share / Author */}
                    <aside className="lg:sticky lg:top-32 h-fit space-y-12">
                        <div>
                            <h3 className="font-unbounded font-bold text-sm uppercase tracking-widest mb-6">Author</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                                    C
                                </div>
                                <div>
                                    <h4 className="font-unbounded font-bold text-sm">cgrkn</h4>
                                    <p className="text-xs text-neutral-500">Lead Editor</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-unbounded font-bold text-sm uppercase tracking-widest mb-6">Share</h3>
                            <div className="flex gap-2">
                                <button className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                                    <TbBrandTwitter />
                                </button>
                                <button className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                                    <TbBrandLinkedin />
                                </button>
                                <button className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                                    <TbBrandFacebook />
                                </button>
                                <button className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                                    <TbShare />
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Footer / Comments Area */}
                <div className="mt-32 pt-16 border-t border-neutral-200 dark:border-neutral-800">
                    <h3 className="font-unbounded font-black text-3xl mb-12">Discussion</h3>

                    {/* Add Comment */}
                    <div className="bg-neutral-50 dark:bg-neutral-900/50 p-8 rounded-3xl mb-12">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 shrink-0" />
                            <div className="w-full">
                                <textarea
                                    className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-700 min-h-[100px] focus:outline-none focus:border-black dark:focus:border-white p-2 text-sm font-sans resize-none transition-colors"
                                    placeholder="Add to the discussion..."
                                />
                                <div className="flex justify-end mt-4">
                                    <button className="flex items-center gap-2 px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full font-unbounded font-bold text-xs hover:scale-105 transition-transform">
                                        <TbSend /> Post Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comment List */}
                    <div className="space-y-8">
                        {[1, 2].map((i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 shrink-0" />
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-unbounded font-bold text-sm">Anonymous User</h4>
                                        <span className="text-xs text-neutral-400">• 2h ago</span>
                                    </div>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
                                        This article really opened my eyes to the possibilities of spatial computing. I wonder how long until this becomes mainstream adoption?
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </article>
        </main>
    );
};
