
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Validated/Public list of blogs
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category'); // Filter by category slug

        const where = {};

        if (category) {
            where.category = {
                slug: category
            };
        }

        const blogs = await prisma.blog.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {
                category: true,
                author: {
                    select: {
                        fullname: true,
                        image: true
                    }
                }
            }
        });

        return NextResponse.json(blogs);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
