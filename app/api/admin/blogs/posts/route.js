
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import slugify from 'slugify';

// GET: List all blog posts
export async function GET() {
    try {
        const posts = await prisma.blog.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                category: true,
                author: {
                    select: {
                        id: true,
                        fullname: true,
                        image: true
                    }
                }
            }
        });
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Create a new blog post
export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { title, content, image, categoryId } = await req.json();

        if (!title || !content || !categoryId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Create unique slug
        let slug = slugify(title, { lower: true, strict: true });
        let counter = 1;
        while (await prisma.blog.findUnique({ where: { slug } })) {
            slug = `${slugify(title, { lower: true, strict: true })}-${counter}`;
            counter++;
        }

        const post = await prisma.blog.create({
            data: {
                title,
                content,
                image,
                slug,
                categoryId,
                authorId: session.user.id // Assuming session user id exists and is the author
            }
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error('Blog creation error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
