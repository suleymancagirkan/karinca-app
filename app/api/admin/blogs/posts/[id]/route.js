
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import slugify from 'slugify';

// GET: Single blog post
export async function GET(req, { params }) {
    try {
        const { id } = await params;
        const post = await prisma.blog.findUnique({
            where: { id },
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

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT: Update blog post
export async function PUT(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { id } = await params;
        const { title, content, image, categoryId } = await req.json();

        // If title changes, should we update slug? 
        // Typically yes if early, no if established. Let's update it for now but handle uniqueness.
        const dataToUpdate = {
            title, content, image, categoryId
        };

        if (title) {
            // Logic to update slug if needed could go here, omitting for simplicity/SEO stability unless requested
            // dataToUpdate.slug = slugify(title, ...);
        }

        const post = await prisma.blog.update({
            where: { id },
            data: dataToUpdate
        });

        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE: Delete blog post
export async function DELETE(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { id } = await params;

        await prisma.blog.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
