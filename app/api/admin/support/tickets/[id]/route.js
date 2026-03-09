import { createLog } from '@/lib/logger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { id } = await params;
        const ticket = await prisma.ticket.findUnique({
            where: { id },
            include: {
                category: true,
                user: {
                    select: {
                        id: true,
                        fullname: true,
                        email: true,
                        image: true
                    }
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

        return NextResponse.json(ticket);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Add a message to the ticket (Reply)
export async function POST(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { id } = await params;
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
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

        // Optionally update ticket status to 'in_progress' or 'answered'
        const ticket = await prisma.ticket.findUnique({ where: { id } });
        if (ticket.status === 'open') {
            await prisma.ticket.update({
                where: { id },
                data: { status: 'in_progress' }
            });
        }

        // Log the action
        await createLog('TICKET_REPLY_ADMIN', `Replied to ticket #${id}`, session.user.id);

        return NextResponse.json(newMessage);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE: Delete a ticket (Admin only)
export async function DELETE(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { id } = await params;

        await prisma.ticket.delete({
            where: { id }
        });

        // Log the action
        await createLog('TICKET_DELETE', `Deleted ticket #${id}`, session.user.id);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PATCH: Update ticket status
export async function PATCH(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { id } = await params;
        const { status } = await req.json();

        const ticket = await prisma.ticket.update({
            where: { id },
            data: { status }
        });

        // Log the action
        await createLog('TICKET_STATUS_UPDATE', `Updated ticket #${id} status to ${status}`, session.user.id);

        return NextResponse.json(ticket);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
