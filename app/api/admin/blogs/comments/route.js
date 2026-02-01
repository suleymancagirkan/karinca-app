
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET: Fetch all comments (with filtering if needed)
export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const comments = await prisma.comment.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        fullname: true,
                        username: true,
                        id: true,
                    }
                },
                blog: {
                    select: {
                        id: true,
                        title: true,
                        slug: true
                    }
                }
            }
        });

        return NextResponse.json(comments);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
