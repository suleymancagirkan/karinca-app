import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { createLog } from '@/lib/logger';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const tickets = await prisma.ticket.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                messages: true,
                category: true
            }
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

        await createLog('TICKET_CREATE', `Created ticket #${ticket.id}: ${subject}`, session.user.id);

        return NextResponse.json(ticket);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
