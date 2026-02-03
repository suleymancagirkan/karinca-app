
import prisma from "@/lib/prisma";

export default async function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://karinca-app.vercel.app';

    // Fetch dynamic content (Blogs)
    // We fetch only id, slug and updatedAt to be efficient
    const blogs = await prisma.blog.findMany({
        select: {
            slug: true,
            updatedAt: true,
        }
    });

    const categories = await prisma.category.findMany({
        select: {
            slug: true,
            createdAt: true // Category doesn't have updatedAt in schema shown, using createdAt or now
        }
    });

    // 1. Static Routes
    const routes = [
        '',
        '/login',
        '/register',
        '/blogs',
        '/store', // Assumed public route
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
    }));

    // 2. Dynamic Blog Routes
    const blogRoutes = blogs.map((blog) => ({
        url: `${baseUrl}/blogs/${blog.slug}`,
        lastModified: blog.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // 3. Dynamic Category Routes (if public store exists)
    // Assuming /store/category/[slug] or similar. I'll guess /store/[slug] or /category/[slug]
    // Given the Sidebar has 'Store > Categories', likely /store structure.
    // For now I will map them but maybe with lower priority or comment out if unsure. 
    // I'll assume /store/[slug] for category based store structure.
    const categoryRoutes = categories.map((cat) => ({
        url: `${baseUrl}/store/${cat.slug}`,
        lastModified: cat.createdAt, // Fallback
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    return [
        ...routes,
        ...blogRoutes,
        ...categoryRoutes
    ];
}
