
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

        const tickets = await prisma.ticket.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        fullname: true,
                        email: true,
                        image: true
                    }
                },
                category: {
                    select: {
                        name: true
                    }
                }
            }
        });

        // Map tickets to flatten structure slightly if needed, or just return as is.
        // The frontend expects ticket.category to be a string in the mock, but here it's an object. 
        // I will adjust the frontend to handle the object, or map it here.
        // Let's return the full object, it's cleaner.

        return NextResponse.json(tickets);
    } catch (error) {
        console.error("ADMIN TICKETS API ERROR:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
