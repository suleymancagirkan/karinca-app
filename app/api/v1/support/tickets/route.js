
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const tickets = await prisma.ticket.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: 'desc' },
            include: { category: true }
        });

        return NextResponse.json(tickets);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { subject, message, priority, categoryId } = await req.json();

        if (!subject || !message || !priority || !categoryId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const ticket = await prisma.ticket.create({
            data: {
                subject,
                priority,
                status: 'open',
                userId: session.user.id,
                categoryId: categoryId,
                messages: {
                    create: {
                        content: message,
                        senderId: session.user.id
                    }
                }
            }
        });

        return NextResponse.json(ticket);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
