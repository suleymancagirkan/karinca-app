
import prisma from "@/lib/prisma";

export default async function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://karinca.app';

    // Fetch dynamic content (Blogs)
    // We fetch only id, slug and updatedAt to be efficient
    const blogs = await prisma.blog.findMany({
        select: {
            slug: true,
            updatedAt: true,
        }
    });

    // 1. Static Routes
    const routes = [
        '',
        '/login',
        '/register',
        '/blogs',
        '/store',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
    }));

    // 2. Dynamic Blog Routes
    const blogRoutes = blogs.map((blog) => ({
        url: `${baseUrl}/blogs/${blog.slug}`,
        // lastModified: blog.updatedAt, // Use updatedAt if available or create if not
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    return [
        ...routes,
        ...blogRoutes
    ];
}
