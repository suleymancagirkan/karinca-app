
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        // if (user?.role !== 'admin') { return Response.json({ error: 'Forbidden' }, { status: 403 }); }

        const subscriptions = await prisma.subscription.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        fullname: true,
                        email: true
                    }
                },
                tier: {
                    select: {
                        name: true,
                        priceMonthly: true,
                        priceYearly: true
                    }
                }
            }
        });

        return Response.json(subscriptions);
    } catch (error) {
        console.error('Failed to fetch subscriptions:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await req.json();
        const { id, status, endDate, period } = data;

        if (!id) {
            return Response.json({ error: 'ID is required' }, { status: 400 });
        }

        const updatedSubscription = await prisma.subscription.update({
            where: { id },
            data: {
                status,
                period,
                endDate: endDate ? new Date(endDate) : undefined
            },
            include: {
                user: { select: { fullname: true, email: true } },
                tier: { select: { name: true, priceMonthly: true, priceYearly: true } }
            }
        });

        return Response.json(updatedSubscription);
    } catch (error) {
        console.error('Update Subscription Error:', error);
        return Response.json({ error: 'Failed to update subscription' }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return Response.json({ error: 'ID is required' }, { status: 400 });
        }

        await prisma.subscription.delete({
            where: { id }
        });

        return Response.json({ message: 'Subscription deleted' });
    } catch (error) {
        console.error('Delete Subscription Error:', error);
        return Response.json({ error: 'Failed to delete subscription' }, { status: 500 });
    }
}
