
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        // Pagination and Sorting
        const logs = await prisma.systemLog.findMany({
            orderBy: { createdAt: 'desc' },
            take: 50, // Limit to last 50 logs for performance
            include: {
                user: {
                    select: {
                        fullname: true,
                        email: true,
                        image: true,
                        role: true
                    }
                }
            }
        });

        return NextResponse.json(logs);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
