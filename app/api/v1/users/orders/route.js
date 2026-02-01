
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const orders = await prisma.order.findMany({
            where: {
                user: { email: session.user.email },
                status: 'PAID' // Only fetch successful orders
            },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                createdAt: true,
                price: true,
                currency: true,
                status: true,
                tierName: true,
                categoryName: true
            }
        });

        return Response.json(orders);
    } catch (error) {
        console.error('Failed to fetch user orders:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
