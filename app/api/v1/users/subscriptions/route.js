
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const subscriptions = await prisma.subscription.findMany({
            where: {
                user: { email: session.user.email },
                status: 'ACTIVE',
                endDate: { gt: new Date() } // Only active and not expired
            },
            include: {
                tier: {
                    select: {
                        id: true,
                        name: true,
                        priceMonthly: true,
                        priceYearly: true,
                        priceLifetime: true
                    }
                },
                theme: {
                    select: {
                        name: true,
                        url: true,
                        icon: true
                    }
                }
            }
        });

        return Response.json(subscriptions);
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}
