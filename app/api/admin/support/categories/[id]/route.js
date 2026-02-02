
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// PUT: Update ticket category
export async function PUT(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { id } = await params;
        const { name } = await req.json();

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const category = await prisma.ticketCategory.update({
            where: { id },
            data: { name }
        });

        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE: Delete ticket category
export async function DELETE(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const { id } = await params;

        // Check if there are tickets using this category?
        // Actually, prisma will complain if restrict, or set null if set null, or cascade if cascade.
        // In schema: category TicketCategory? @relation(...)
        // Usually we might want to check for existing tickets or safe delete.
        // Schema definition: NO onDelete: Cascade on the Ticket side for category relation.
        // So this might fail if tickets exist. 
        // Ideally we should warn or prevent deletion, or move tickets to general.
        // For now, let's just try delete. If it fails, error is returned.

        await prisma.ticketCategory.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
