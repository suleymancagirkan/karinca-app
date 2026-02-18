
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Single public blog by slug
export async function GET(req, { params }) {
    try {
        const { slug } = params;

        const blog = await prisma.blog.findUnique({
            where: { slug },
            include: {
                author: {
                    select: {
                        fullname: true,
                        image: true
                    }
                }
            }
        });

        if (!blog) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json(blog);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
