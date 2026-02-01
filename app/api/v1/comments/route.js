
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET: Fetch comments for a specific blog (via query param)
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const blogId = searchParams.get('blogId');

        if (!blogId) {
            return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
        }

        const comments = await prisma.comment.findMany({
            where: { blogId },
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        fullname: true,
                        image: true,
                        username: true
                    }
                }
            }
        });

        return NextResponse.json(comments);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Add a new comment
export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            console.log("Unauthorized: No session found");
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        console.log("Received body:", body);
        const { content, blogId } = body;

        if (!blogId) {
            console.error("Missing blogId");
            return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
        }
        if (!content || !content.trim()) {
            console.error("Missing content");
            return NextResponse.json({ error: 'Comment content is required' }, { status: 400 });
        }

        console.log(`Creating comment for blog ${blogId} by user ${session.user.id}`);

        const comment = await prisma.comment.create({
            data: {
                content,
                blogId,
                userId: session.user.id
            },
            include: {
                user: {
                    select: {
                        fullname: true,
                        image: true
                    }
                }
            }
        });

        console.log("Comment created:", comment.id);
        return NextResponse.json(comment);
    } catch (error) {
        console.error("Error creating comment:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
