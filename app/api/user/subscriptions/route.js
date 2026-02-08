
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const subscriptions = await prisma.subscription.findMany({
            where: {
                userId: session.user.id,
                status: 'ACTIVE',
                endDate: { gt: new Date() }
            },
            include: {
                tier: true,
                category: true,
                theme: true
            }
        });

        return NextResponse.json(subscriptions);
    } catch (error) {
        console.error('Failed to fetch user subscriptions:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
