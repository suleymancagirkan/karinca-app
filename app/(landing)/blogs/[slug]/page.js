
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TbArrowLeft, TbCalendar } from 'react-icons/tb';
import prisma from '@/lib/prisma';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import TurndownService from 'turndown';
import CommentSection from '@/components/Blog/CommentSection';
import { UserBadge } from '@/lib/functions';

export const dynamic = 'force-dynamic';

async function getBlog(slug) {
    const blog = await prisma.blog.findUnique({
        where: { slug },
        include: {
            category: true,
            author: {
                select: {
                    username: true,
                    image: true,
                    role: true
                }
            }
        }
    });

    return blog;
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const blog = await getBlog(slug);
    if (!blog) return { title: 'Not Found' };

    return {
        title: `${blog.title} - Karinca Blog`,
        description: blog.content.substring(0, 160).replace(/<[^>]+>/g, ''),
    };
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) {
        notFound();
    }

    // Convert HTML content from database back to Markdown for proper rendering with react-markdown
    const turndownService = new TurndownService();
    const markdownContent = turndownService.turndown(blog.content);

    return (
        <div className="min-h-screen bg-white dark:bg-black font-sans">

            <article className="max-w-4xl mx-auto px-6 md:px-12 py-32">

                <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-black dark:hover:text-white mb-12 transition-colors">
                    <TbArrowLeft /> Back to Insights
                </Link>

                <header className="mb-16 space-y-8">
                    <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-neutral-500">
                        <span className="px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 text-blue-600 font-bold bg-blue-50 dark:bg-blue-900/10">
                            {blog.category?.name}
                        </span>
                        <span className="flex items-center gap-2">
                            <TbCalendar /> {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span>•</span>
                        <span>5 min read</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black font-unbounded leading-[1.1] tracking-tight text-black dark:text-white">
                        {blog.title}
                    </h1>

                    <div className="flex items-center gap-4 py-6 border-y border-neutral-100 dark:border-neutral-900">
                        {blog.author?.image ? (
                            <img src={blog.author.image} alt={blog.author.fullname} className="w-12 h-12 rounded-full object-cover" />
                        ) : (
                            <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center font-bold text-lg">
                                {blog.author?.fullname?.[0] || 'A'}
                            </div>
                        )}
                        <div>
                            <p className="font-bold text-black dark:text-white text-lg leading-none mb-1">{blog.author?.username}</p>
                            <UserBadge role={blog.author?.role} />
                        </div>
                    </div>
                </header>

                {blog.image && (
                    <div className="w-full aspect-video rounded-3xl overflow-hidden mb-16 shadow-2xl shadow-blue-900/5">
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                    </div>
                )}

                <div className="prose dark:prose-invert prose-lg md:prose-xl max-w-none 
                    prose-headings:font-unbounded prose-headings:font-bold prose-headings:tracking-tight
                    prose-a:text-blue-600 prose-img:rounded-2xl prose-strong:text-black dark:prose-strong:text-white
                 ">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{blog.content}</ReactMarkdown>
                </div>

            </article>

            {/* Comments Section */}
            <CommentSection blogId={blog.id} />

        </div>
    );
}
