
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        const ticket = await prisma.ticket.findUnique({
            where: { id },
            include: {
                category: {
                    select: { name: true }
                },
                messages: {
                    orderBy: { createdAt: 'asc' },
                    include: {
                        sender: {
                            select: {
                                id: true,
                                fullname: true,
                                role: true,
                                image: true
                            }
                        }
                    }
                }
            }
        });

        if (!ticket) {
            return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
        }

        // Security check: Ensure the ticket belongs to the user
        if (ticket.userId !== session.user.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        return NextResponse.json(ticket);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Reply to ticket (User)
export async function POST(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        // Verify ownership/existence first
        const ticket = await prisma.ticket.findUnique({
            where: { id },
            select: { userId: true, status: true }
        });

        if (!ticket) {
            return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
        }

        if (ticket.userId !== session.user.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const newMessage = await prisma.ticketMessage.create({
            data: {
                ticketId: id,
                senderId: session.user.id,
                content: message
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        fullname: true,
                        role: true,
                        image: true
                    }
                }
            }
        });

        // Optionally update status if it was closed or needs attention? 
        // Usually if user replies, it might stay open or go to 'open' if it was 'pending'.
        // For now, if it was closed, maybe reopen it? Or just leave it.
        // Let's set it to 'open' if user replies, assuming they need more help.
        if (ticket.status === 'closed') {
            await prisma.ticket.update({
                where: { id },
                data: { status: 'open' }
            });
        }

        return NextResponse.json(newMessage);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
