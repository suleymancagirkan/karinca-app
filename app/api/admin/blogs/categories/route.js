
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import slugify from 'slugify';

// GET: List all blog categories
export async function GET() {
    try {
        const categories = await prisma.blogCategory.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { blogs: true }
                }
            }
        });
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Create a new blog category
export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { name } = await req.json();

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const slug = slugify(name, { lower: true, strict: true });

        const category = await prisma.blogCategory.create({
            data: {
                name,
                slug
            }
        });

        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
